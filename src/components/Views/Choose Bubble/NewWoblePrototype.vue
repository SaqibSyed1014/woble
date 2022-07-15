<template>
  <div>
    <div class="bubble-container">
      <div class="woble add-woble cursor-pointer" @click="showModal= true">
        <span class="text-3xl uppercase lg:text-4xl xl:text-5xl font-bold">
          <img class="font-black" :src="`${publicPath}src/assets/imgs/SVG/plus.svg`" alt="trending">
        </span>
      </div>
      <div class="text-center lowercase mt-8"></div>
    </div>

    <theme-modal v-show="showModal" @close="showModal = false" title="Add Bubble">
      <template #body>
        <theme-input v-model="bubbleName" @keyup.enter="addingBubble" full-width svg-name="plus.svg" type="text" placeholder="Add Bubble Title" />
      </template>
      <template #footer>
        <theme-footer-button @click="addingBubble" :loading="loading">
          Add
        </theme-footer-button>
      </template>
    </theme-modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { store } from "../../../store";

let showModal = ref(false)
let bubbleName = ref(null)
let loading = ref(false)
const publicPath = import.meta.env.BASE_URL

const addingBubble = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let coords
      coords = position.coords
      const payload = {
        title: bubbleName.value,
        longitude: coords.longitude,
        latitude: coords.longitude
      }
      loading.value = true
      await store.dispatch('bubbles/addBubbles', payload)
      loading.value = false
      showModal.value = false
      bubbleName.value = null
    })
  } else {
    alert("Geolocation is not supported by this browser.")
  }
}
</script>

<style scoped lang="scss">
.add-woble{
  background: none;
  border: 3px dashed grey;
  box-shadow: none;
& span img{
    filter: brightness(0.5);
  }
}
</style>
