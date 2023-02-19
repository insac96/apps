<template>
  <UiDialog :active="signDialog.active" @close="CloseSign">
    <UiText size="1.3rem" weight="700" color="primary">Xác Thực</UiText>
    <UiText size="0.8rem" class="mb-1" color="gray">{{ message || 'Đăng nhập hoặc đăng ký tài khoản' }}</UiText>

    <UiInput type="text" class="mb-1" placeholder="Tài khoản" v-model="username" icon-left="bx-user"></UiInput>
    <UiInput type="password" class="mb-1" placeholder="Mật khẩu" v-model="password" icon-left="bx-lock"></UiInput>
    
    <UiFlex justify="flex-end" width="100%" group>
      <UiButton @click="SignIn">Đăng Nhập</UiButton>
      <UiButton @click="SignUp" b-color="content-1" t-color="primary">Đăng Ký</UiButton>
    </UiFlex>
  </UiDialog>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  data () {
    return {
      username: 'insac96',
      password: '',
      message: null,
    }
  },

  computed: {
    ...mapGetters({
      'signDialog': 'dialog/getSign'
    })
  },

  methods: {
    ...mapMutations ({
      'CloseSign': 'dialog/closeSign',
      'SetAuth': 'auth/set',
    }),

    async SignIn () {
      const signin = await this.$axios.$post('/auth/signin', {
        username: this.username,
        password: this.password
      })

      if(!!signin.error) return this.message = signin.message
      this.Auth()
    },

    async SignUp () {
      const signup = await this.$axios.$post('/auth/signup', {
        username: this.username,
        password: this.password
      })

      if(!!signup.error) return this.message = signup.message
      this.Auth()
    },

    async Auth () {
      const auth = await this.$axios.$get('/auth')
      if(!!auth.error) return this.message = auth.message

      this.SetAuth(auth.result)
      this.CloseSign()
      this.message = null
    }
  }
}
</script>