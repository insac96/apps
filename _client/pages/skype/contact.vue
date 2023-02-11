<template>
  <div class="Skype__Contacts">
    <div class="Contact" v-for="contact in list" :key="contact._id" @click="CreateChat(contact._id)">
      <div class="Contact__Avatar">{{ contact.profile.name.charAt(0) }}</div>
      <div class="Contact__Content">{{ contact.profile.name }}</div>
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
    const users = await this.$axios.$get('/user/list')
    if(!!users.error) return

    this.list = users.result
  },

  methods: {
    async CreateChat (personID) {
      const create = await this.$axios.$post('/chat/create', {
        person: personID
      })

      this.$router.push(`/skype/${create.result}`)

      if(!!create.error) return
    }
  }
}
</script>

<style lang="sass">
.Contact
  display: flex
  align-items: center
  padding: 12px
  cursor: pointer
  &__Avatar
    position: relative
    display: flex
    align-items: center
    justify-content: center
    width: 45px
    height: 45px
    max-width: 45px
    max-height: 45px
    text-transform: uppercase
    font-weight: 700
    font-size: 1.3rem
    margin-right: 16px
    background: #0089cb
    color: #fff
    border-radius: 50%
  &__Content
    flex-grow: 1
    font-size: 1rem
    font-weight: 500
    text-transform: capitalize
</style>