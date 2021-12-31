<template>
  <div class="chat">
    <div class="chat-room">
      <h3 v-if="auth">Welcome back {{ auth.displayName }}</h3>
      <button v-else class="btn" @click="loginWithGoogle">
        Login with google
      </button>

      <button
        v-for="item of rooms"
        :key="item.id"
        :class="[item.id === roomActive ? 'active' : '', 'r']"
        @click="chooseRoom(item.id)"
      >
        {{ item.id }}
      </button>
    </div>
    <div class="chat-detail">
      <div class="chat-history" id="chat-histories">
        <div
          v-for="item of histories"
          :key="item.id"
          :class="[item.userId === auth.uid ? 'rtl' : 'ltr', 'mes-box']"
        >
          <div class="mes">{{ item.content }}</div>
        </div>
      </div>
      <form class="chat-form" @submit.prevent="sentMessage">
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
</template>

<script>
import db from "@/plugins/firebase.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

// import dayjs from '@/plugins/dayjs';
import {
  collection,
  query,
  // getDocs,
  addDoc,
  orderBy,
  onSnapshot,
  setDoc,
  doc,
} from "firebase/firestore";

const provider = new GoogleAuthProvider();
export default {
  name: "Chat",
  data() {
    return {
      messageInput: "",
      histories: [],
      auth: null,
      token: "",
      rooms: [],
      roomActive: "",
    };
  },

  async created() {
    // get auth info
    this.getAuthStatus();
  },

  updated() {
    this.scrollToBottom();
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
  },

  methods: {
    async sentMessage() {
      let msg = this.messageInput;
      this.messageInput = "";
      if (msg.length > 0) {
        await addDoc(collection(db, "chat"), {
          name: this.auth?.displayName,
          content: msg,
          timestamp: new Date(),
          userId: this.auth?.uid,
        });
      }
    },

    scrollToBottom() {
      const chatBox = document.getElementById("chat-histories");
      chatBox.scrollTop = chatBox.scrollHeight;
    },

    loginWithGoogle() {
      signInWithPopup(getAuth(), provider)
        .then(async (result) => {
          this.auth = result.user;

          await setDoc(doc(db, "user", this.auth.uid), {
            nickname: this.auth?.displayName,
            avatar: this.auth?.photoURL,
          });
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
      await onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          this.auth = user;
        }
      });
    },

    chooseRoom(roomId) {
      this.roomActive = roomId;
    },
  },
};
</script>

<style lang="scss" scoped>
.chat {
  border: 1px solid #cdcdcc;
  border-radius: 10px;
  padding: 10px;
  display: flex;

  &-room {
    display: flex;
    flex-direction: column;
    width: calc(100% - 350px);
    padding-right: 20px;
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

  &-history {
    width: 350px;
    height: 350px;
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
      &.rtl {
        justify-content: flex-end;

        .mes {
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
}
</style>
