<template>
  <div class="text-area resp-field">
    <textarea :value="modelValue" @input="updateInput" rows="5" :placeholder="placeholder" />
  </div>
</template>

<script>
export default {
  name: "ThemeTextArea",
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    placeholder: String,
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value)
    }
  }
}
</script>

<style scoped lang="scss">
.text-area{
  background: #F7F7F7;
  border-radius: 20px;
  padding: 7px;
  textarea{
    background: transparent;
    width: 100%;
    text-indent: 25px;
    outline: none !important;
  }
}
</style>
