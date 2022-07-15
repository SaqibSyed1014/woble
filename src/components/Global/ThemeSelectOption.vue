<template>
  <div class="theme-select-option border resp-field">
      <div class="w-100 pl-3">
        <select required :value="modelValue" class="form-select focus:outline-none focus:shadow-none text-gray-700 transition ease-in-out"
                @change="selectOption">
          <option value="" default selected>{{ placeholder }}</option>
          <option v-for="option in options">
            {{ option }}
          </option>
        </select>
      </div>
  </div>
</template>

<script>
export default {
  name: "ThemeSelectOption",
  props: {
    options: [Array, Number],
    modelValue: {
      type: [String, Number],
      default: "",
    },
    placeholder: String
  },
  data() {
    return{
      showOptions: false,
    }
  },
  methods: {
    selectOption(event) {
      this.$emit("update:modelValue", event.target.value)
    }
  },
}
</script>

<style lang="scss">
.theme-select-option{
  background: #F7F7F7;
  border-radius: 1000px;
  padding: 7px;
  gap: 10px;
  & select{
    appearance: none;
    display: block;
    width: 100%;
    text-transform: capitalize;
    font-size: 1rem;
    line-height: 1.5rem;
    padding: 0.375rem 0.75rem;
    background-repeat: no-repeat;
    background-color: transparent;
    background-clip: padding-box;
    margin: 0;
    border-radius: 0.25rem;
    font-weight: 400;
    &:invalid {
      color: #919090;
    }
    option[default] {
      display: none;
    }
  }
}
</style>
