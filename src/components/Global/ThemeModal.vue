<template>
  <div tabindex="-1" aria-hidden="true" class="modal modal-backdrop overflow-y-auto overflow-x-hidden w-full md:inset-0 h-modal md:h-full">
    <div class="relative p-4 w-full max-w-2xl h-auto">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <header class="modal-header dark:border-gray-600">
          <h2 class="font-black text-2xl" :class="{'text-red-500': danger}">
            {{ title }}
          </h2>
          <img class="cursor-pointer" @click="$emit('close')" :src="`${publicPath}src/assets/imgs/SVG/cross.svg`">
        </header>

        <section class="modal-body p-6">
          <slot name="body"></slot>
        </section>

        <footer class="modal-footer-btns space-x-2 dark:border-gray-600">
          <button
              type="button"
              class="focus:ring-4 bg-indigo-900 focus:outline-none focus:ring-blue-300  dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              @click="$emit('close')"
          >
            Close
          </button>
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  danger: Boolean
})
const publicPath = import.meta.env.BASE_URL
</script>

<style lang="scss" scoped>
.modal{
  .modal-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    border-bottom-width: 1px;
  }
  .modal-footer-btns{
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 1rem 1.5rem;
    border-top-width: 1px;
    button{
      color: white;
      font-weight: 500;
      text-align: center;
      border-radius: 0.5rem;
      padding: 0.625rem 1rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
  }
}
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(165, 82, 225, .5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
