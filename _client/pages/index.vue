<template>
  <div class="Home">
    <div class="Sign">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Skype_logo_%282019%E2%80%93present%29.svg/991px-Skype_logo_%282019%E2%80%93present%29.svg.png">
      <div class="Sign__Message" v-if="!!message">{{ message }}</div>
      <input type="text" placeholder="Tài khoản" v-model="username" />
      <input type="password" placeholder="Mật khẩu" v-model="password"/>
      <div>
        <button class="Sign__In" @click="SignIn">Đăng Nhập</button>
        <button class="Sign__Up" @click="SignUp">Đăng Ký</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data () {
    return {
      username: 'insac96',
      password: 'cf1996',
      message: ''
    }
  },

  methods: {
    async SignIn () {
      const signin = await this.$axios.$post('/auth/signin', {
        username: this.username,
        password: this.password
      })

      this.message = signin.message

      if(!!signin.error) return
      this.$router.push('/skype/chat')
    },

    async SignUp () {
      const signup = await this.$axios.$post('/auth/signup', {
        username: this.username,
        password: this.password
      })

      this.message = signup.message

      if(!!signup.error) return
      this.$router.push('/skype/chat')
    }
  }
}
</script>

<style lang="sass">
@import '@/assets/home.sass'
</style>
