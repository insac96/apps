<template>
  <div 
    :class="{
      'Box': true,
      'Shadow': !!shadow
    }"
    :style="{
      '--ui-box-width': width,
      '--ui-box-height': height,
      '--ui-box-bg': $color.get(bColor),
    }"
    v-on="$listeners"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    'width': { type: String },
    'height': { type: String },
    'bColor': { type: String },
    'shadow': { type: Boolean },
  }
}
</script>

<style lang="sass">
.Box
  --ui-box-width: auto
  --ui-box-height: auto
  --ui-box-bg: var(--content-1)

.Box
  position: relative
  width: var(--ui-box-width)
  height: var(--ui-box-height)
  background: rgb(var(--ui-box-bg))
  padding: var(--space)
  border-radius: var(--radius)
  transition: all 0.25s ease
</style>