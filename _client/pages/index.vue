<template>
  <div class="Home">
    <UiBox b-color="content-2" shadow @click="$router.push('/message')" class="mb-1">
      <UiText size="1.2rem" weight="700" color="primary">Trò chuyện</UiText>
      <UiText size="0.8rem" color="gray">Kết nối với bạn bè và trò chuyện cùng họ</UiText>
    </UiBox>

    <UiBox b-color="content-2" shadow @click="$router.push('/transfer')" class="mb-1">
      <UiText size="1.2rem" weight="700" color="primary">Chuyển khoản</UiText>
      <UiText size="0.8rem" color="gray">Thực hiện giao dịch chuyển tiền</UiText>
    </UiBox>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

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
</style>
