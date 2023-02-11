<template>
  <div class="Skype__Contents">
    <!--Body-->
    <div class="Skype__Contents__Body">
      <div v-for="content in list" :key="content._id">
        <!--Content Friend-->
        <div class="Content-1" v-if="content.person != AuthID">
          <div class="Content-1__Avatar">{{person.friend.profile.name.charAt(0)}}</div>
          <div class="Content-1__Main">
            <div class="Content-1__Main__Name">{{person.friend.profile.name}}</div>
            <div class="Content-1__Main__Text" @click="RemoveContent(content._id)">{{content.text}}</div>
          </div>
        </div>

        <!--Content Me-->
        <div class="Content-2" v-if="content.person == AuthID">
          <div class="Content-2__Main">
            <div class="Content-2__Main__Time">{{$day(content.time).format('hh:mm A')}}</div>
            <div class="Content-2__Main__Text" @click="RemoveContent(content._id)">{{content.text}}</div>
          </div>
        </div>
      </div>
    </div>

    <!--Footer-->
    <div class="Skype__Contents__Footer">
      <button @click="ChangePerson">
        <i class='bx bx-plus' v-if="!personContent"></i>
        <i class='bx bx-minus' v-else></i>
      </button>
      <form @submit.prevent="CreateContent"><input placeholder="Nhập tin nhắn" v-model="text"></form>
      <button @click="RemoveChat"><i class='bx bx-smile'></i></button>
      <button><i class='bx bx-microphone'></i></button>
      <button><i class='bx bx-camera'></i></button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      list: [],
      text: '',
      person: {
        me: null,
        friend: null
      },
      personContent: null
    }
  },

  computed: {
    ...mapGetters({
      'AuthID': 'auth/getID'
    })
  },

  async fetch() {
    const chat = await this.$axios.$get(`/chat/get/${this.$route.params.id}`)
    if(!!chat.error) return

    this.person.me = chat.result.person_1._id == this.AuthID ? chat.result.person_1 : chat.result.person_2
    this.person.friend = chat.result.person_1._id == this.AuthID ? chat.result.person_2 : chat.result.person_1
    this.list = chat.result.contents
  },

  methods: {
    async CreateContent () {
      const create = await this.$axios.$post(`/chat/content/create`, {
        chatID: this.$route.params.id,
        person: this.personContent,
        text: this.text
      })

      if(!!create.error) return 

      this.list.push(create.result)
      this.text = ''
    },

    async RemoveContent (id) {
      const remove = await this.$axios.$post(`/chat/content/remove`, {
        chatID: this.$route.params.id,
        contentID: id
      })

      if(!!remove.error) return

      const index = this.list.findIndex((i => i._id == id))
      this.$delete(this.list, index)
    },

    async RemoveChat () {
      const remove = await this.$axios.$post(`/chat/remove`, {
        chatID: this.$route.params.id,
      })

      if(!!remove.error) return 
      this.$router.push('/skype/chat')
    },

    ChangePerson () {
      if(!!this.personContent) return this.personContent = null
      this.personContent = this.person.friend._id
    }
  }
}
</script>

<style lang="sass">
.Skype__Contents
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  &__Body
    flex-grow: 1
    overflow: auto
    padding: 12px

    .Content-1
      display: flex
      justify-content: flex-start
      margin-bottom: 12px
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
      &__Main
        &__Name
          font-size: 0.85rem
          font-weight: 600
          color: gray
          margin-bottom: 5px
        &__Text
          display: inline-block
          background: #f7f7f7
          padding: 12px
          max-width: 200px
          border-radius: 0 12px 12px 12px
          box-shadow: 0 5px 15px -10px rgba(0,0,0,0.5)
          cursor: pointer

    .Content-2
      display: flex
      justify-content: flex-end
      margin-bottom: 12px
      &__Main
        text-align: right
        &__Time
          font-size: 0.7rem
          font-weight: 600
          color: gray
          margin-bottom: 5px
        &__Text
          display: inline-block
          background: #e0faff
          padding: 12px
          max-width: 200px
          border-radius: 12px 0 12px 12px
          box-shadow: 0 5px 15px -10px rgba(0,0,0,0.5)
          text-align: left
          cursor: pointer

  &__Footer
    display: flex
    align-items: center
    padding: 12px
    form
      flex-grow: 1
      input
        width: 100%
        height: 40px
        background: #eeeeee
        padding: 0 0 0 16px
        border-radius: 20px 0 0 20px
    button
      display: flex
      align-items: center
      justify-content: center
      background: #eeeeee
      min-width: 40px
      min-height: 40px
      max-width: 40px
      max-height: 40px
      font-size: 1.2rem
      &:last-child
        border-radius: 0 16px 16px 0
      &:first-child
        border-radius: 50%
        margin-right: 10px
        background: #0089cb
        color: #ffffff
        min-width: 35px
        min-height: 35px
</style>