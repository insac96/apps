<template>
  <UiBox class="Header py-0 px-1" width="100%" height="50px" b-color="background" radius="0" shadow>
    <UiFlex width="100%" height="100%" align="center" justify="space-between"> 
      <!--Header Left-->
      <UiFlex align="center">
        <UiButton alpha="0" space="0" t-color="text" class="mr-1">
          <UiIcon src="bx-menu" size="1.5rem"></UiIcon>
        </UiButton>

        <form><UiInput placeholder="Tìm kiếm" height="35px" icon-right="bx-search" inline></UiInput></form>
      </UiFlex>

      <!--Header Right-->
      <UiFlex align="center" group>
        <UiButton alpha="0" space="0" t-color="text">
          <UiIcon src="bx-cog" size="1.5rem"></UiIcon>
        </UiButton>

        <UiButton alpha="0" space="0" t-color="text" class="ml-1" @click="OpenSignDialog" v-if="!authActive">
          <UiIcon src="bx-user" size="1.5rem"></UiIcon>
        </UiButton>

        <UiButton alpha="0" space="0" t-color="text" class="ml-1" v-if="!!authActive">
          <UiIcon src="bx-bell" size="1.5rem"></UiIcon>
        </UiButton>

        <UiButton alpha="0" space="0" t-color="text" class="ml-1" @click="SignOut" v-if="!!authActive">
          <UiIcon src="bx-power-off" size="1.5rem"></UiIcon>
        </UiButton>
      </UiFlex>
    </UiFlex>
  </UiBox>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'Home',

  computed: {
    ...mapGetters({
      'authActive': 'auth/getActive',
      'authProfile': 'auth/getProfile',
      'authID': 'auth/getID',
      'authRole': 'auth/getRole'
    })
  },

  methods: {
    ...mapMutations({
      'OpenSignDialog': 'dialog/openSign',
      'RemoveAuth': 'auth/remove'
    }),

    async SignOut () {
      await this.$axios.$get('/auth/signout')
      this.RemoveAuth()
    }
  }
}
</script>

<style lang="sass">
.Header
  position: fixed !important
  left: 0
  top: 0
  z-index: 999 !important
</style>