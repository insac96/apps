<template>
  <div class="Skype__Chats">
    <div class="Chat" v-for="chat in list" :key="chat._id" @click="$router.push(`/skype/${chat._id}`)">
      <div class="Chat__Avatar">{{ chat.person.profile.name.charAt(0) }}</div>
      <div class="Chat__Content">
        <p>{{ chat.person.profile.name }}</p>
        <p>{{ chat.content ? chat.content.text : 'Không có tin nhắn mới' }}</p>
      </div>
      <div class="Chat__Time" v-if="!!chat.content">{{ $day(chat.content.time).format('hh:mm A') }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  
  async fetch() {
    const chats = await this.$axios.$get('/chat/get/list')
    if(!!chats.error) return

    this.list = chats.result
  },

  fetchOnServer: false
}
</script>

<style lang="sass">
.Chat
  display: flex
  align-items: center
  padding: 12px
  cursor: pointer
  &__Avatar
    position: relative
    display: flex
    align-items: center
    justify-content: center
    min-width: 45px
    min-height: 45px
    max-width: 45px
    max-height: 45px
    text-transform: uppercase
    font-weight: 700
    font-size: 1.3rem
    margin-right: 16px
    background: #0089cb
    color: #fff
    border-radius: 50%
    &::after
      content: ''
      position: absolute
      width: 12px
      height: 12px
      border-radius: 50%
      background: #4dd965
      bottom: 0
      right: 0
  &__Content
    flex-grow: 1
    p:first-child 
      font-size: 1rem
      font-weight: 600
      text-transform: capitalize
    p:last-child
      font-size: 0.85rem
      max-width: 200px
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
  &__Time
    font-size: 0.7rem
    font-weight: 600
    color: gray
</style>