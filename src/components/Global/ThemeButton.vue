<template>
  <button :disabled="loading" :class="{'block': block}" class="theme_btn light_hover flex items-center justify-center" type="button">
    <div v-if="loading" class="spinner-border animate-spin inline-block border-4 rounded-full w-6 h-6" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <slot v-else></slot>
  </button>
</template>

<script setup>
defineProps({
  block: Boolean,
  loading: Boolean
})
</script>
