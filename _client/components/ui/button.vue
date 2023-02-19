<template>
  <button
    :class="{
      'Btn': true,
      'Btn--Disabled': !!disabled,
      'Btn--Loading': !!loading,
      'Shadow': !!shadow
    }"
    :style="{
      '--ui-btn-width': width,
      '--ui-btn-height': height,
      '--ui-btn-bg': $color.get(bColor),
      '--ui-btn-text': $color.get(tColor),
      '--ui-btn-alpha': alpha,
      '--ui-btn-space': space,
      '--ui-btn-radius': radius
    }"
    v-on="$listeners"
    v-bind="$attrs"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props : {
    'width': { type: String },
    'height': { type: String },
    'bColor': { type: String },
    'tColor': { type: String },
    'alpha': { type: String || Number },
    'space': { type: String || Number },
    'radius': { type: String },
    'shadow': { type: Boolean },

    'disabled': { type: Boolean },
    'loading': { type: Boolean },
  }
}
</script>

<style lang="sass">
.Btn
  --ui-btn-width: auto
  --ui-btn-height: 40px
  --ui-btn-bg: var(--primary)
  --ui-btn-text: var(--light)
  --ui-btn-alpha: 1
  --ui-btn-space: var(--space)
  --ui-btn-radius: var(--radius)

.Btn
  position: relative
  display: inline-flex
  justify-content: center
  align-items: center
  width: var(--ui-btn-width)
  height: var(--ui-btn-height)
  max-height: var(--ui-btn-height)
  background: rgba(var(--ui-btn-bg), var(--ui-btn-alpha))
  color: rgb(var(--ui-btn-text))
  padding: 0 var(--ui-btn-space)
  border-radius: var(--ui-btn-radius)
  font-size: 0.8rem
  font-weight: 700
  transition: all 0.25s ease
  overflow: hidden

  &--Disabled, &--Loading
    pointer-events: none
</style>