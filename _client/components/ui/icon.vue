<template>
  <i 
    :class="['Icon', 'bx', `${src}`]"
    :style="{
      'color': `rgb(${GetColor(color)})`,
      'font-size': size 
    }"
  ></i>
</template>

<script>
export default {
  props: {
    'src': { type: String },
    'color': { type: String },
    'size': { type: String },
  },
  methods: {
    GetColor (color) {
      return this.$color.get(color)
    }
  }
}
</script>