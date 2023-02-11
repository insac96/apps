<template>
  <div class="Skype">
    <!--Header-->
    <div class="Header">
      <!--Info-->
      <div class="Header__Info">
        <div class="Header__Info__Avatar">{{ AuthProfile.name.charAt(0) }}</div>
        <div class="Header__Info__Content">
          <p>{{ AuthProfile.name }}</p>
          <p>Chia sẻ những việc bạn đang làm</p>
        </div>
      </div>

      <!--Search-->
      <div class="Header__Search">
        <button><i class='bx bx-search'></i></button>
        <input placeholder="Tìm kiếm">
        <button><i class='bx bx-collection'></i></button>
      </div>
    </div>

    <!--Body-->
    <div class="Body">
      <NuxtChild></NuxtChild>
    </div>

    <!--Footer-->
    <div class="Footer">
      <button @click="$router.push('/skype/chat')" :disabled="$route.path == '/skype/chat'">
        <i class='bx bxs-message-rounded-detail'></i>
        <p>Trò chuyện</p>
      </button>

      <button @click="$router.push('/skype/call')" :disabled="$route.path == '/skype/call'">
        <i class='bx bxs-phone' ></i>
        <p>Cuộc gọi</p>
      </button>

      <button @click="$router.push('/skype/contact')" :disabled="$route.path == '/skype/contact'">
        <i class='bx bxs-contact' ></i>
        <p>Danh bạ</p>
      </button>
    </div>
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
@import '@/assets/skype.sass'
</style>