<template>
  <span 
    class="Text"
    :style="{
      'color': `rgb(${$color.get(color)})`,
      'font-size': size,
      'font-weight': weight
    }
  ">
    <slot></slot>
  </span>
</template>

<script>
export default {
  props: {
    'weight': { type: String },
    'size': { type: String },
    'color': { type: String }
  }
}
</script>