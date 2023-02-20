<template>
  <div class="Chats">
    <UiFlex
      class="Chat pa-1"
      align="center"
      justify="space-between"
      v-for="chat in sortList" 
      :key="chat._id" 
      @click="$router.push(`/chat/${chat._id}`)"
    >
      <UiButton width="45px" height="45px" radius="50%" disabled>
        <UiText size="1.3rem" weight="700" color="light">{{ chat.friend.profile.name.charAt(0) }}</UiText>
      </UiButton>

      <div class="Chat__Content ml-1">
        <UiText size="1rem" weight="600">{{ chat.friend.profile.name }}</UiText>
        <UiText size="0.85rem">{{ chat.content ? chat.content.text : 'Không có tin nhắn mới' }}</UiText>
      </div>

      <UiText size="0.7rem" weight="600" color="gray">{{ $day(chat.update).fromNow(true) }}</UiText>
    </UiFlex>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      list: []
    }
  },

  computed: {
    sortList () {
      return this.list
      .map(item => {
        const friend = (item.person_1._id == this.AuthID) ? item.person_2 : item.person_1
        const content = item.contents[0]

        delete item['person_1']
        delete item['person_2']
        delete item['contents']
        
        return {
          friend: friend,
          content: content,
          ...item
        }
      })
      .sort((a, b) => {
        return a.update > b.update ? -1 : 1
      })
    },

    ...mapGetters({
      'AuthID': 'auth/getID'
    })
  },
  
  async fetch() {
    const chats = await this.$axios.$get('/chat/get/all')
    if(!!chats.error) return

    this.list = chats.result
  }
}
</script>

<style lang="sass">
.Chat
  &__Content
    flex-grow: 1
    p:first-child 
      text-transform: capitalize
    p:last-child
      max-width: 80%
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
</style>