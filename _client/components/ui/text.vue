<template>
  <p 
    class="Text"
    :style="{
      'color': `rgb(${GetColor(color)})`,
      'font-size': size,
      'font-weight': weight,
      'text-align': align
    }
  ">
    <slot></slot>
  </p>
</template>

<script>
export default {
  props: {
    'weight': { type: String },
    'size': { type: String },
    'color': { type: String },
    'align': { type: String }
  },
  methods: {
    GetColor (color) {
      return this.$color.get(color)
    }
  }
}
</script>