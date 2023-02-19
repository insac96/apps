<template>
  <div class="Home">
    <!--Header-->
    <UiFlex 
      class="Home__Header px-1" 
      width="100%" height="50px"
      align="center"
      justify="space-between"
    > 
      <!--Header Left-->
      <UiFlex align="center">
        <UiButton alpha="0" space="0" t-color="text" class="mr-1">
          <UiIcon src="bx-menu" size="1.5rem"></UiIcon>
        </UiButton>

        <form>
          <UiInput placeholder="Tìm kiếm" height="35px" icon-right="bx-search" inline></UiInput>
        </form>
      </UiFlex>

      <!--Header Right-->
      <UiFlex align="center" group>
        <UiButton alpha="0" t-color="text">
          <UiIcon src="bx-cog" size="1.5rem"></UiIcon>
        </UiButton>
        <UiButton alpha="0" space="0" t-color="text" @click="OpenSign">
          <UiIcon src="bx-user" size="1.5rem"></UiIcon>
        </UiButton>
      </UiFlex>
    </UiFlex>

    <!--Body-->
    <div class="Home__Body">
      <UiBox b-color="content-1" shadow @click="$router.push('/chat')" class="mb-1">
        <UiText size="1.2rem" weight="700" color="primary">Trò chuyện</UiText>
        <UiText size="0.8rem" color="gray">Kết nối với bạn bè và trò chuyện cùng họ</UiText>
      </UiBox>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'Home',

  methods: {
    ...mapMutations ({
      'OpenSign': 'dialog/openSign'
    }),
  }
}
</script>

<style lang="sass">
.Home
  position: relative
  padding: var(--space)
  padding-top: calc( 50px + var(--space) )

  &__Header
    position: fixed
    left: 0
    top: 0
</style>
