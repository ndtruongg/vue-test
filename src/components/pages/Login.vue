<template>
  <div id="login" class="container pt-5">
    <div class="row">
      <div class="col-12 col-lg-3 mb-3">
        <form @submit.prevent="login">
          <div class="form-group mb-2">
            <label for="email">Email</label>
            <input
              type="email"
              v-model="user.email"
              placeholder="Your email"
              class="form-control"
            />
          </div>

          <div class="form-group mb-2">
            <label for="password">Password</label>
            <input
              type="password"
              v-model="user.password"
              placeholder="Input your password"
              class="form-control"
            />
          </div>

          <button class="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
    <button @click="loginGoogle" class="btn btn-light">
      Login with Google
    </button>
    <btn-login-facebook @profile="getProfile" @token="getToken">
      Login with Facebook
    </btn-login-facebook>
    <router-link to="/login/about">About</router-link>

    <div class="d-flex">
      <label for="">Base Input</label>
      <m-search-form></m-search-form>
    </div>
  </div>
</template>

<script>
import MSearchForm from "@/components/molecules/MSearchFrom.vue";

export default {
  components: {
    MSearchForm,
  },
  data() {
    return {
      inputValue: "",
      user: {
        email: "",
        password: "",
      },
      isLogin: false,
      profile: {},
    };
  },
  mounted() {},
  methods: {
    login() {
      this.$callApi
        .post("/customer-login", this.user)
        .then((response) => {
          localStorage.setItem("local", response.data.token);
          this.$cookies.set("vue-test", response.data.token);
          this.$router.push({ name: "dashboard" });
        })
        .catch((er) => {
          console.log(er);
        });
    },
    async loginGoogle() {
      let googleUser = await this.$gAuth.signIn().catch(() => {});

      if (googleUser) {
        let response = googleUser.getAuthResponse();
        localStorage.setItem("local", response.access_token);
        this.profile = googleUser.getBasicProfile();
        // console.log('get Id', googleUser.getId())
        // console.log('get base profile', googleUser.getBasicProfile())
        // console.log('getAuthResponse', googleUser.getAuthResponse())
        this.isLogin = this.$gAuth.isAuthorized;

        this.$router.push({ name: "dashboard" });
      }
    },
    getProfile(data) {
      console.log(data);
    },
    getToken(data) {
      console.log(data);
    },
    clickBaseButton() {
      console.log("click");
    },
  },
};
</script>

<style>
.btn-login-fb {
  color: white;
  min-width: 150px;
  background-color: #0451f6;
  height: 2.5rem;
  border-radius: 2rem;
  font-weight: 400;
  font-size: 0.8rem;
  outline: none;
  border: none;
  color: #fff;
}
</style>
