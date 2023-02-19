<template>
  <div
    :class="{
      'Input': true,
      'Input--Disabled': !!disabled,
      'Input--Loading': !!loading,
      'Shadow': !!shadow
    }"
    :style="{
      'display': !!inline ? 'inline-flex' : 'flex',
      '--ui-input-width': width,
      '--ui-input-height': height,
      '--ui-input-bg': $color.get(bColor),
      '--ui-input-text': $color.get(tColor),
      '--ui-input-alpha': alpha,
      '--ui-input-space': space,
      '--ui-input-radius': radius
    }"
  >
    <UiIcon 
      class="mr-1" 
      v-if="iconLeft" 
      :src="iconLeft"
      @click="$emit('icon-left')"
    ></UiIcon>

    <input
      :value="value"
      :type="type"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      @input="onInput"
    >

    <UiIcon 
      class="ml-1" 
      v-if="iconRight" 
      :src="iconRight"
      @click="$emit('icon-right')"
    ></UiIcon>
  </div>
</template>

<script>
export default {
  props : {
    'value': { type: String || Number },
    'type': { type: String, default: 'text' },
    'placeholder': { type: String },
    'readOnly': { type: Boolean },

    'inline': { type: Boolean },
    'width': { type: String },
    'height': { type: String },
    'bColor': { type: String },
    'tColor': { type: String },
    'alpha': { type: String || Number },
    'space': { type: String || Number },
    'radius': { type: String || Number },
    'shadow': { type: Boolean },

    'disabled': { type: Boolean },
    'loading': { type: Boolean },

    'iconLeft': { type: String },
    'iconRight': { type: String },
  },

  model: {
    prop: 'value',
    event: 'change'
  },

  methods: {
    onInput (e) {
      this.$emit('change', e.target.value)
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style lang="sass">
.Input
  --ui-input-width: auto
  --ui-input-height: 45px
  --ui-input-bg: var(--content-1)
  --ui-input-text: var(--text)
  --ui-input-alpha: 1
  --ui-input-space: var(--space)
  --ui-input-radius: var(--radius)

.Input
  position: relative
  justify-content: center
  align-items: center
  width: var(--ui-input-width)
  height: var(--ui-input-height)
  max-height: var(--ui-input-height)
  background: rgba(var(--ui-input-bg), var(--ui-input-alpha))
  color: rgb(var(--ui-input-text))
  padding: 0 var(--ui-input-space)
  border-radius: var(--ui-input-radius)
  transition: all 0.25s ease
  overflow: hidden

  &--Disabled, &--Loading
    pointer-events: none

  input
    width: 100%
    height: 100%
    color: inherit
</style>