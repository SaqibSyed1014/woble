<template>
  <div class="icon_input border" :class="[fullWidth ? 'w-100' : 'resp-field']">
    <input :type="type" :value="modelValue" @input="updateInput" :placeholder="placeholder" >
      <span class="shadow-sm" :style="[ type === 'search' ? { background: 'transparent' } : {}]">
        <img v-if="type === 'search'" :src="`${publicPath}src/assets/imgs/SVG/search.svg`" alt="search">
        <img v-else :src="`${publicPath}src/assets/imgs/SVG/${svgName}`" :alt="svgName">
      </span>
  </div>
</template>

<script>
export default {
  name: "ThemeInput",
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    type: String,
    placeholder: String,
    svgName: String,
    fullWidth: Boolean,
  },
  data(){
    return{
      publicPath: import.meta.env.BASE_URL,
    }
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value)
    }
  }
}
</script>

<style>
::-webkit-calendar-picker-indicator {
  display: none;
}
input[type="date"]{
  text-indent: 11px;
}
</style>
