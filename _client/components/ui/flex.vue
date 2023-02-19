<template>
  <div 
    :class="{
      'Flex': true,
      'Flex--GroupRow': !!group && (!type || type == 'row'),
      'Flex--GroupColumn': !!group && (type == 'column'),
    }"
    :style="{
      'display': !!inline ? 'inline-flex' : 'flex',
      'align-items': align,
      'justify-content': justify,
      'flex-direction': type,
      'flex-wrap': wrap,
      'width': width,
      'height': height,
      'background': `rgb(${$color.get(bColor)})`
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    'inline': { type: Boolean },
    'align': { type: String },
    'justify': { type: String },
    'type': { type: String },
    'wrap': { type: String },
    'width': { type: String },
    'height': { type: String },
    'group': { type: Boolean },
    'bColor': { type: String }
  }
}
</script>

<style lang="sass">
.Flex
  &--GroupRow
    > :first-child
      border-top-right-radius: 0
      border-bottom-right-radius: 0    
    > :last-child
      border-top-left-radius: 0
      border-bottom-left-radius: 0

  &--GroupColumn
    > :first-child
      border-bottom-left-radius: 0
      border-bottom-right-radius: 0 
    > :last-child
      border-top-right-radius: 0
      border-top-left-radius: 0
</style>