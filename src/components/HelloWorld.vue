<template>
  <div class="container">
    <div class="col-4 mx-auto" v-if="!authentication">
      <form @submit.prevent="login" class="form">
        <div class="form-group">
          <label for="">Email</label>
          <input
            type="text"
            class="form-control"
            name="email"
            v-model="user.email"
          />
        </div>

        <div class="form-group">
          <label for="">Password</label>
          <input
            type="password"
            class="form-control"
            name="password"
            v-model="user.password"
          />
        </div>

        <button class="btn btn-primary">Submit</button>
      </form>
    </div>

    <div v-else>
      <p>{{ user.email }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      authentication: false,
      user: {
        email: 'admin981@gmail.com',
        password: '123456'
      }
    }
  },

  async created() {
    let token = localStorage.getItem('local')
    if (token) {
      let { data } = await axios
        .get(
          `${process.env.VUE_APP_API_URL}/get-user-info`,
          { token },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Beaver ' + token
            }
          }
        )
        .then(() => {
          this.authentication = true
        })
      console.log(data)
    }
  },

  methods: {
    async login() {
      let { data } = await axios.post(
        'http://localhost:8000/api/customer-login',
        {
          ...this.user
        }
      )
      if (data.token) {
        localStorage.setItem('local', data.token)
      }
    },
    logout() {
      localStorage.removeItem('local')
    }
  }
}
</script>
