<template>
  <div class="Home">
    <UiDialog v-model="dialog">
      <UiFlex type="column">
        <UiText size="1.3rem" weight="700" color="primary">Xác Thực</UiText>
        <UiText size="0.8rem" class="mb-1" color="gray">{{ message }}</UiText>

        <UiInput type="text" class="mb-1" placeholder="Tài khoản" v-model="username" width="100%" icon-left="bx-user"></UiInput>
        <UiInput type="password" class="mb-1" placeholder="Mật khẩu" v-model="password" width="100%" icon-left="bx-lock"></UiInput>
        
        <UiFlex justify="flex-end" width="100%">
          <UiButton @click="SignIn" radius="var(--radius) 0 0 var(--radius)">Đăng Nhập</UiButton>
          <UiButton @click="SignUp" radius="0 var(--radius) var(--radius) 0" b-color="content-1" t-color="primary">Đăng Ký</UiButton>
        </UiFlex>
      </UiFlex>
    </UiDialog>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data () {
    return {
      username: 'insac96',
      password: '',
      message: 'Vui lòng xác thực để sử dụng dịch vụ',
      dialog: true
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
      this.$router.push('/chat')
    },

    async SignUp () {
      const signup = await this.$axios.$post('/auth/signup', {
        username: this.username,
        password: this.password
      })

      this.message = signup.message

      if(!!signup.error) return
      this.$router.push('/chat')
    }
  }
}
</script>

<style lang="sass">
.Home
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  height: 100vh
  max-height: 100vh
  overflow: hidden
  .Sign
    width: 100%
    max-width: 300px
</style>
