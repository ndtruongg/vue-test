<template>
  <div id="login" class="container pt-5">
    <div class="row">
      <div class="col-12 col-lg-3">
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
    <!-- <a :href="authUrl">Login with google</a> -->
  </div>
</template>

<script>
// import authUrl from '../plugins/oauth2Client'

export default {
  data() {
    return {
      user: {
        email: '',
        password: ''
        // authUrl
      }
    }
  },
  created() {
    console.log('hello')
  },
  mounted() {},
  methods: {
    login() {
      this.$callApi
        .post('/customer-login', this.user)
        .then((response) => {
          localStorage.setItem('local', response.data.token)
          this.$router.push({ name: 'dashboard' })
        })
        .catch((er) => {
          console.log(er)
        })
    }
  }
}
</script>

<style></style>
