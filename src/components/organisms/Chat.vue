<template>
  <div class="chat">
    <div class="chat-room">
      <h3 v-if="auth">Chats</h3>
      <button v-else class="btn" @click="loginWithGoogle">
        Login with google
      </button>

      <button
        v-for="(item, key) of users"
        :key="key"
        :class="[checkActiveMsg(item.id) ? 'active' : '', 'list-user__item']"
        @click="openChatHistories(item.email)"
      >
        <div class="_avatar">
          <img :src="item.avatar" :alt="item.nickname" />
          <span :class="[item.online === true ? 'active' : '', 'dot']"></span>
        </div>
        {{ item.nickname }}
      </button>
    </div>
    <div v-if="auth" class="chat-detail">
      <template v-if="targetInfo">
        <ChatDetailHeader :userData="targetInfo" />
      </template>
      <div class="chat-detail__body">
        <div class="chat-history" id="chat-histories">
          <div
            v-for="(item, key) of messages"
            :key="key"
            :class="[item.userId.includes(auth.uid) ? 'rtl' : 'ltr', 'mes-box']"
          >
            <div class="mes">{{ item.content }}</div>
            <span class="time">{{ getTime(item.createdAt) }}</span>
          </div>
        </div>
        <form v-if="targetInfo" class="chat-form" @submit.prevent="sentMessage">
          <input
            type="text"
            v-model="messageInput"
            placeholder="Send a message"
          />
          <button
            :class="{ active: messageInput }"
            :disabled="messageInput.length === 0"
          >
            <span class="material-icons-round">
              send
            </span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/plugins/firebase.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

import {
  collection,
  query,
  addDoc,
  orderBy,
  onSnapshot,
  setDoc,
  doc,
  updateDoc,
  where,
  getDocs,
} from "firebase/firestore";

import ChatDetailHeader from "./ChatDetailHeader.vue";

const provider = new GoogleAuthProvider();
export default {
  name: "Chat",
  components: { ChatDetailHeader },
  data() {
    return {
      messageInput: "",
      histories: {
        uid: "",
        messages: [],
      },
      auth: null,
      token: "",
      rooms: [],
      roomActive: "",
      userFB: null,
      users: [],
      targetInfo: null,
    };
  },

  async created() {
    // get auth info
    await this.getAuthStatus();
  },

  mounted() {
    // get chat
    const q = query(collection(db, "chat"), orderBy("timestamp", "asc"));
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let checkExistDocument = this.histories.find(
          (item) => item.id === doc.id
        );
        if (!checkExistDocument) {
          this.histories = [...this.histories, { id: doc.id, ...doc.data() }];
        }
      });
    });

    // get rooms
    const queryRoom = query(
      collection(db, "room"),
      orderBy("createdAt", "asc")
    );
    onSnapshot(queryRoom, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let checkExistDocument = this.rooms.find((item) => item.id === doc.id);
        if (!checkExistDocument) {
          this.rooms = [...this.rooms, { id: doc.id, ...doc.data() }];
        }
      });
    });

    // get users
    let emailSignIn = localStorage.getItem("emailForSignIn");
    const queryUser = query(
      collection(db, "user"),
      where("email", "!=", emailSignIn)
    );
    onSnapshot(queryUser, (querySnapshot) => {
      querySnapshot.forEach((docRef) => {
        let checkExistDocument = this.users.find(
          (item) => item.id === docRef.id
        );
        if (!checkExistDocument) {
          let emailAuth = localStorage.getItem("emailForSignIn");
          if (emailAuth != docRef.data().email) {
            this.users.push({
              ...docRef.data(),
              id: docRef.id,
            });
          }
        }
      });
    });

    // before browser or tab close
    window.addEventListener("beforeunload", async function() {
      let authToken = localStorage.getItem("firebase-auth-token");

      await updateDoc(doc(db, "user", authToken), {
        online: false,
      });
    });
  },

  updated() {
    this.scrollToBottom();
  },

  async beforeDestroy() {
    let authToken = localStorage.getItem("firebase-auth-token");

    await updateDoc(doc(db, "user", authToken), {
      online: false,
    });
  },

  computed: {
    messages() {
      return this.histories?.messages;
    },
  },

  methods: {
    async sentMessage() {
      let msg = this.messageInput;
      this.messageInput = "";
      if (msg.length > 0) {
        if (!this.histories.uid) {
          const docRef = await addDoc(collection(db, "room"), {
            createdAt: new Date(),
            userIds: [this.auth.uid, this.targetInfo.id],
          });
          this.histories.uid = docRef.id;
        }

        await addDoc(collection(db, "room", this.histories.uid, "messages"), {
          content: msg,
          createdAt: new Date(),
          userId: "user/" + this.auth?.uid,
        });

        this.getMessages();
      }
    },

    scrollToBottom() {
      const chatBox = document.getElementById("chat-histories");
      if (chatBox) {
        chatBox.scrollTop = chatBox.scrollHeight;
      }
    },

    loginWithGoogle() {
      signInWithPopup(getAuth(), provider)
        .then(async (result) => {
          this.auth = result.user;
          await setDoc(doc(db, "user", this.auth.uid), {
            nickname: this.auth?.displayName,
            avatar: this.auth?.photoURL,
            email: this.auth?.email,
            online: true,
          });

          localStorage.setItem("firebase-auth-token", this.auth.uid);
          localStorage.setItem("emailForSignIn", this.auth.email);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.log({
            errorCode,
            errorMessage,
            email,
            credential,
          });
        });
    },

    async getAuthStatus() {
      await onAuthStateChanged(getAuth(), async (user) => {
        if (user) {
          this.auth = user;
          let authToken = localStorage.getItem("firebase-auth-token");

          await updateDoc(doc(db, "user", authToken), {
            online: true,
          });
        }
      });
    },

    chooseRoom(roomId) {
      this.roomActive = roomId;
    },

    async openChatHistories(email) {
      const q = query(collection(db, "user"), where("email", "==", email));
      this.histories = { uid: "", messages: [] };
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((docRef) => {
        this.targetInfo = { id: docRef.id, ...docRef.data() };
      });

      if (this.targetInfo) {
        const qHistories = query(
          collection(db, "room"),
          where("userIds", "in", [
            [this.auth?.uid, this.targetInfo.id],
            [this.targetInfo.id, this.auth.uid],
          ])
        );

        const historySnapshot = await getDocs(qHistories);
        historySnapshot.forEach((docRef) => {
          this.histories.uid = docRef.id;
        });
      }

      if (this.histories.uid) {
        this.getMessages();
      }
    },

    async getMessages() {
      const qMessages = query(
        collection(db, "room", this.histories.uid, "messages"),
        orderBy("createdAt", "asc")
      );

      await onSnapshot(qMessages, (messageSnapshot) => {
        messageSnapshot.forEach((docRef) => {
          let checkExistDocument = this.histories.messages.find(
            (item) => item.id === docRef.id
          );
          if (!checkExistDocument) {
            this.histories.messages.push({ id: docRef.id, ...docRef.data() });
          }
        });
      });
    },

    async findRoom() {
      if (this.targetInfo) {
        const qHistories = query(
          collection(db, "room"),
          where("userIds", "in", [
            [this.auth?.uid, this.targetInfo.id],
            [this.targetInfo.id, this.auth.uid],
          ])
        );

        const historySnapshot = await getDocs(qHistories);
        historySnapshot.forEach((docRef) => {
          this.histories.uid = docRef.id;
        });
      }
    },

    checkActiveMsg(uid) {
      if (this.targetInfo) {
        if (this.targetInfo.id === uid) {
          return true;
        }
      }

      return false;
    },

    getTime(createdAt) {
      let time = new Date(
        createdAt.seconds * 1000 + createdAt.nanoseconds / 1e6
      );
      return this.$dayjs(time).format("HH:mm");
    },
  },
};
</script>

<style lang="scss" scoped>
.chat {
  border: 1px solid #cdcdcc;
  border-radius: 10px;
  display: flex;

  &-room {
    padding: 12px;
    padding-right: 20px;
    display: flex;
    flex-direction: column;
    width: 300px;
    border-right: 1px solid #cdcdcd;
    .r {
      background: #cdcdcc;
      text-align: left;
      padding: 10px 20px;
      border-radius: 5px;
      color: #fff;
      margin-bottom: 10px;
      &.active {
        background: #3498db;
      }
    }
  }

  &-detail {
    width: calc(100% - 300px);

    &__body {
      padding: 12px;
    }
  }

  &-history {
    height: 650px;
    overflow: auto;
    padding-right: 3px;
    margin-bottom: 10px;
    &::-webkit-scrollbar {
      width: 3px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    .mes-box {
      display: flex;
      align-items: flex-start;
      .time {
        font-size: 12px;
        margin-top: 12px;
        margin-left: 12px;
        color: #888;
      }
      &.rtl {
        justify-content: flex-end;

        .time {
          order: 1;
          margin-right: 12px;
        }

        .mes {
          order: 2;
          background-color: #2980b9;
          border-radius: 20px 18px 5px 20px;
        }
      }
      &.ltr {
        .mes {
          border-radius: 20px 20px 20px 5px;
          background-color: #2c3e50;
        }
      }
      .mes {
        padding: 6px 12px;
        margin-bottom: 2px;
        color: #fff;
      }
    }
  }

  &-form {
    display: flex;
    input {
      flex: 1;
      max-width: calc(100% - 50px);
      padding: 0 15px;
      border: 1px solid #cecece;
      border-radius: 20px;
    }

    button {
      margin-left: 10px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: ease 0.3s;
      span {
        transition: ease 0.3s;
        color: #727272;
      }

      &:hover,
      &.active {
        background: #3498db;
        span {
          color: #fff;
        }
      }
    }
  }

  .list-user {
    &__item {
      display: flex;
      align-items: center;
      padding: 10px;
      margin-bottom: 10px;
      &:hover,
      &.active {
        background: #f1f1f1;
        border-radius: 10px;
      }

      ._avatar {
        width: 40px;
        height: 40px;
        position: relative;
        margin-right: 10px;

        .dot {
          position: absolute;
          z-index: 2;
          bottom: 0px;
          right: 0px;
        }

        img {
          width: 40px;
          border-radius: 50%;
          height: 40px;
        }
      }

      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #cecece;

        &.active {
          background: #18eb05;
        }
      }
    }
  }
}

.insert {
  &-enter,
  &-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }

  &-enter-active,
  &-leave-active {
    transition: ease 0.4s all;
  }

  &-enter-to,
  &-leave {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
