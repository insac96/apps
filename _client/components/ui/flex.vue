<template>
  <div 
    class="Flex"
    :style="{
      'display': !!inline ? 'inline-flex' : 'flex',
      'align-items': align,
      'justify-content': justify,
      'flex-direction': type,
      'flex-wrap': wrap,
      'width': width
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
  }
}
</script>