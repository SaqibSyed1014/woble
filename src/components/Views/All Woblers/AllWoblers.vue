<template>
  <div>
    <div class="flex px-4 py-5 sm:px-10 sm:pt-8">
      <img class="back-nav" @click="$router.go(-1)" :src="`${publicPath}src/assets/imgs/SVG/next.svg`" alt="edit">
      <h3 class="font-black text-2xl ml-3">Woblers</h3>
    </div>
    <theme-spinner v-if="loading" large />
    <woblers-carousel v-else :woblers="woblers" />
  </div>
</template>

<script setup>
import WoblersCarousel from "./WoblersCarousel.vue";
import { computed, ref } from "vue";
import { store } from "../../../store";

const publicPath = import.meta.env.BASE_URL

const loading = ref(false)
const fetchingAllWoblers = async() => {
  loading.value = true
  await store.dispatch('woblers/fetchAllWoblers')
  loading.value = false
}
fetchingAllWoblers()

const woblers = computed(() => store.getters["woblers/getWoblers"])
</script>
