<template>
  <div class="Message">
    <!--Body-->
    <div class="Message__Body">
      <NuxtChild></NuxtChild>
    </div>

    <!--Footer-->
    <UiFlex align="center" justify="space-between" class="Message__Footer px-4">
      <UiButton @click="$router.push('/message')" :disabled="$route.path == '/message'" height="65px" alpha="0" t-color="gray" d-color="primary">
        <UiFlex type="column" align="center" justify="center">
          <UiIcon size="1.8rem" src="bx-message-rounded-detail"></UiIcon>
          <UiText size="0.8rem" weight="600">Trò chuyện</UiText>
        </UiFlex>
      </UiButton>

      <UiButton @click="$router.push('/message/contact')" :disabled="$route.path == '/message/contact'" height="65px" alpha="0" t-color="gray" d-color="primary">
        <UiFlex type="column" align="center" justify="center">
          <UiIcon size="1.8rem" src="bx-phone"></UiIcon>
          <UiText size="0.8rem" weight="600">Danh bạ</UiText>
        </UiFlex>
      </UiButton>

      <UiButton height="65px" alpha="0" t-color="gray" d-color="primary">
        <UiFlex type="column" align="center" justify="center">
          <UiIcon size="1.8rem" src="bx-search"></UiIcon>
          <UiText size="0.8rem" weight="600">Tìm kiếm</UiText>
        </UiFlex>
      </UiButton>
    </UiFlex>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      'AuthID': 'auth/getID',
      'AuthProfile': 'auth/getProfile'
    })
  }
}
</script>

<style lang="sass">
.Message
  display: flex
  flex-direction: column
  width: 100%
  height: calc(100vh - 50px)
  max-height: calc(100vh - 50px)
  overflow: hidden
  margin-top: 50px

  &__Body
    position: relative
    flex-grow: 1
    overflow: auto

  &__Footer
    border-top: 1px solid #eaeaea
    button
      &:disabled
        color: rgb(var(--primary)) !important
</style>