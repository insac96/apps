<template>
  <transition name="show">
    <div 
      v-if="!!active"
      ref="dialog"
      :class="{
        'Dialog': true,
        'Dialog--Center': !bottom && !top,
        'Dialog--Bottom': !!bottom,
        'Dialog--Top': !!top
      }"
      :style="{
        '--ui-dialog-width': width
      }"
    >
      <div class="Dialog__Overlay" @click="close"></div>

      <div class="Dialog__Content">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    'active': { type: Boolean },
    'bottom': { type: Boolean },
    'top': { type: Boolean },
    'width': { type: String, default: '300px' }
  },

  model: {
    prop: 'active',
    event: 'change'
  },

  mounted(){
    this.insertBody()
  },

  beforeDestroy() {
    this.removeBody()
  },

  methods: {
    close () {
      this.$emit('change', false)
      this.$emit('close')
    },

    insertBody () {
      let dialog = this.$refs.dialog

      if(!!document && document.body){
        document.body.insertBefore(dialog, document.body.lastChild)
      }
    },

    removeBody () {
      let dialog = this.$refs.dialog

      if(!!document && document.body){
        document.body.removeChild(dialog)
      }
    }
  }
}
</script>

<style lang="sass">
.Dialog
  position: absolute
  width: 100%
  height: 100%
  top: 0
  left: 0
  display: flex
  justify-content: center
  padding: var(--space)
  backdrop-filter: saturate(180%) blur(15px)
  overflow: hidden
  z-index: 99999

  &--Center
    align-items: center
  &--Bottom
    align-items: flex-end
  &--Top
    align-items: flex-start

  &__Overlay
    position: absolute
    width: 100%
    height: 100%
    top: 0
    left: 0
    background: rgba(0, 0, 0, 0.5)

  &__Content
    position: relative
    width: 100%
    max-width: var(--ui-dialog-width)
    animation: var(--ui-dialog-animation)
    background: rgb(var(--background))
    padding: var(--space)
    border-radius: var(--radius)
        
.show-enter-active 
  &.Dialog--Center
    --ui-dialog-animation: zoom-effect .25s cubic-bezier(.3, .5 , 0 , 1.5) forwards
  &.Dialog--Bottom
    --ui-dialog-animation: up-effect .25s cubic-bezier(.3, .5 , 0 , 1.5) forwards
  &.Dialog--Top
    --ui-dialog-animation: down-effect .25s cubic-bezier(.3, .5 , 0 , 1.5) forwards

.show-leave-active 
  &.Dialog--Center
    --ui-dialog-animation: zoom-effect .25s reverse cubic-bezier(.3, .5 , 0 , 1.5) forwards
  &.Dialog--Bottom
    --ui-dialog-animation: up-effect .25s reverse cubic-bezier(.3, .5 , 0 , 1.5) forwards
  &.Dialog--Top
    --ui-dialog-animation: down-effect .25s reverse cubic-bezier(.3, .5 , 0 , 1.5) forwards
</style>