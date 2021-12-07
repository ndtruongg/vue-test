<template>
  <div class="container pt-5">
    <h1>VueSax Components</h1>

    <div class="mb-5">
      <h3 class="mb-2">Checkbox</h3>
      <vs-checkbox val="html" v-model="options">
        Html
      </vs-checkbox>
      <vs-checkbox val="css" v-model="options">
        Css
      </vs-checkbox>
      <vs-checkbox val="javascript" v-model="options">
        Javascript
      </vs-checkbox>
      <vs-checkbox val="vue" v-model="options">
        Vue
      </vs-checkbox>
      <vs-checkbox val="vuesax" v-model="options">
        Vuesax
      </vs-checkbox>

      <span class="data">
        Values: <b>{{ options.join(", ") }}</b>
      </span>
    </div>

    <div class="mb-5">
      <h3>Loading</h3>
      <vs-button flat @click="openLoading">Open Loading</vs-button>
    </div>

    <div class="mb-5">
      <h3 class="mb-4">Input</h3>
      <vs-input v-model="inputValue2" placeholder="User name">
        <template #icon>
          <span class="material-icons">
            person
          </span>
        </template>
      </vs-input>
    </div>

    <div class="mb-5">
      <h3 class="mb-4">Notification</h3>
      <vs-button @click="openNotification('top-right')">
        Open Notification
      </vs-button>
    </div>

    <div class="mb-5">
      <h3 class="mb-4">Tool tips</h3>
      <div class="d-flex">
        <vs-tooltip>
          <vs-button flat>
            Do hover here
          </vs-button>
          <template #tooltip>
            This is a beautiful button
          </template>
        </vs-tooltip>
      </div>
    </div>

    <div class="mb-5">
      <h3 class="mb-4">Dialog</h3>
      <div class="center">
        <vs-button @click="active = !active">
          Open Dialog
        </vs-button>
        <vs-dialog v-model="active">
          <template #header>
            <h4 class="not-margin">Welcome to <b>Vuesax</b></h4>
          </template>

          <div class="con-form">
            <vs-input v-model="email" placeholder="Email">
              <template #icon>
                <span class="material-icons-outlined">
                  mail
                </span>
              </template>
            </vs-input>
            <vs-input type="password" v-model="password" placeholder="Password">
              <template #icon>
                <span class="material-icons-outlined">
                  lock
                </span>
              </template>
            </vs-input>
            <div class="flex">
              <vs-checkbox v-model="remember">Remember me</vs-checkbox>
              <a href="#">Forgot Password?</a>
            </div>
          </div>

          <template #footer>
            <div class="footer-dialog">
              <vs-button block>
                Sign In
              </vs-button>

              <div class="new">
                New Here? <a href="#">Create New Account</a>
              </div>
            </div>
          </template>
        </vs-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VueSax",
  data() {
    return {
      options: [],
      inputValue: "",
      inputValue2: "",
      active: false,
      email: "",
      password: "",
      remember: false,
    };
  },
  methods: {
    openLoading() {
      const loading = this.$vs.loading();
      setTimeout(() => {
        loading.close();
      }, 3000);
    },
    openNotification(position = null) {
      this.$vs.notification({
        position,
        title: "Documentation Vuesax 4.0+",
        text: `These documents refer to the latest version of vuesax (4.0+),
            to see the documents of the previous versions you can do it here 👉 Vuesax3.x`,
      });
    },
  },
};
</script>

<style lang="scss">
.con-form {
  width: 100%;

  .vs-input-content {
    margin: 10px 0;
    .vs-input {
      width: 100%;
    }
  }
}

.footer-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .new {
    margin: 0;
    margin-top: 20px;
    padding: 0;
    font-size: 0.7rem;
    a {
      color: var("primary") !important;
      margin-left: 6px;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .vs-button {
    margin: 0;
  }
}
</style>
