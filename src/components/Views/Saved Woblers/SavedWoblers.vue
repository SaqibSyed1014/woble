<template>
  <div>
    <div class="flex px-4 py-5 sm:px-10 sm:pt-8">
      <img class="back-nav" @click="$router.go(-1)" :src="`${publicPath}src/assets/imgs/SVG/next.svg`" alt="edit">
      <h3 class="font-black text-2xl ml-3">Saved Woblers</h3>
    </div>
    <theme-spinner v-if="loading" large />
    <div v-else-if="!savedWoblers.length" class="text-center flex justify-center text-2xl md:text-3xl font-black items-center items-center h-screen">
      <h3>No Saved Woblers Found</h3>
    </div>
    <woblers-carousel v-else :woblers="savedWoblers" />
  </div>
</template>

<script setup>
import WoblersCarousel from "../All Woblers/WoblersCarousel.vue";
import { store } from "../../../store";
import { ref, computed } from "vue";

const publicPath = import.meta.env.BASE_URL
let loading = ref(false)

const fetchingSavedwoblers = async() => {
  loading.value = true
  await store.dispatch('woblers/fetchSavedWoblers')
  loading.value = false
}
fetchingSavedwoblers()

const savedWoblers = computed(() => store.getters["woblers/getSavedWoblers"])
</script>
