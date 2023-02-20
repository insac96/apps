<template>
  <div 
    :class="{
      'Box': true,
      'Shadow': !!shadow
    }"
    :style="{
      '--ui-box-width': width,
      '--ui-box-height': height,
      '--ui-box-bg': GetColor(bColor),
      '--ui-box-alpha': alpha,
      '--ui-box-radius': radius
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
    'radius': { type: String },
    'shadow': { type: Boolean },
    'alpha': { type: String },
  },

  methods: {
    GetColor (color) {
      return this.$color.get(color)
    }
  }
}
</script>

<style lang="sass">
.Box
  --ui-box-width: auto
  --ui-box-height: auto
  --ui-box-bg: var(--content-1)
  --ui-box-alpha: 1
  --ui-box-radius: var(--radius)

.Box
  position: relative
  width: var(--ui-box-width)
  height: var(--ui-box-height)
  background: rgba(var(--ui-box-bg), var(--ui-box-alpha))
  padding: var(--space)
  border-radius: var(--ui-box-radius)
  transition: all 0.25s ease
</style>