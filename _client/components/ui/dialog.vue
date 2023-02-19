<template>
  <transition name="show">
    <div 
      v-show="!!isShow"
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

  data () {
    return {
      isShow: false
    }
  },

  mounted () {
    if(!!this.active) {
      this.open()
    }
  },

  beforeDestroy () {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },

  watch: {
    active (newVal) {
      if(!!newVal){
        this.open()
      }
      else {
        this.close()
      }
    }
  },

  methods: {
    open () {
      this.isShow = true
      this.$emit('change', true)
      this.$emit('open')

      this.$nextTick(() => {
        document.body.insertBefore(this.$el, document.body.lastChild)
        document.body.style.overflow = 'hidden'
      })
    },

    close () {
      this.isShow = false
      this.$emit('change', false)
      this.$emit('close')

      this.$nextTick(() => {
        document.body.style.overflow = ''
      })
    }
  }
}
</script>

<style lang="sass">
.Dialog
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
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
    --ui-dialog-animation: zoom-effect .25s ease forwards
  &.Dialog--Bottom
    --ui-dialog-animation: up-effect .25s ease forwards
  &.Dialog--Top
    --ui-dialog-animation: down-effect .25s ease forwards

.show-leave-active 
  &.Dialog--Center
    --ui-dialog-animation: zoom-effect .25s reverse ease forwards
  &.Dialog--Bottom
    --ui-dialog-animation: up-effect .25s reverse ease forwards
  &.Dialog--Top
    --ui-dialog-animation: down-effect .25s reverse ease forwards
</style>