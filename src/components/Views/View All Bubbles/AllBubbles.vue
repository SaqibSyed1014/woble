<template>
  <div>
    <div class="grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2 justify-between items-center">
      <div class="flex items-center">
        <img class="back-nav" @click="$router.go(-1)" :src="`${publicPath}src/assets/imgs/SVG/next.svg`" alt="edit">
        <h3 class="font-black text-2xl ml-3">Choose Bubbles</h3>
      </div>
      <theme-input v-model="searchBubble" full-width class="ml-auto search" type="search" placeholder="Search" />
    </div>

    <theme-spinner v-if="loading" large />

    <div v-else class="py-10">
      <div v-if="!allBubbles.length">
        <div class="flex justify-center items-center h-screen text-2xl md:text-3xl font-black">
          <h3>No Bubbles Found</h3>
        </div>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-12 items-center">
        <div v-for="bubble in allBubbles" :key="bubble._id" class="block text-center">
          <div class="bubble-container">
            <div class="woble" @click="pickingBubble(bubble)">
              <img v-if="filterUserChosenBubbles(bubble._id)" class="user-bubble"
                   :src="`${publicPath}src/assets/imgs/SVG/state.svg`" alt="trending">
              <img v-if="bubble.trending" class="trending-bubble" :src="`${publicPath}src/assets/imgs/SVG/trending.svg`"
                   alt="trending">
              <span :style="{ background: bubble.circleColor }">
                {{ bubble.name }}
              </span>
            </div>

            <div class="woble-title">
              {{ bubble.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { store } from "../../../store";

const publicPath = import.meta.env.BASE_URL
let loading = ref(false)
const searchBubble = ref(null)

const props = defineProps({
  userData: {
    type: Object,
    required: true
  },
})

const fetchingAllBubbles = async() => {
  loading.value = true
  await store.dispatch('bubbles/fetchAllBubbles')
  loading.value = false
}
fetchingAllBubbles()

const allBubbles = computed(() => {
  const bubbles = store.getters["bubbles/getAllBubbles"]
  if (searchBubble.value) return bubbles?.filter((bubble) => bubble.title.toLowerCase().includes(searchBubble.value.toLowerCase()))
  return bubbles
})

const pickingBubble = async(bubble) => {
  if (filterUserChosenBubbles(bubble._id)) {
    await store.dispatch('bubbles/removingPickedBubble', { bubble: bubble._id})
    return
  }
  await store.dispatch('bubbles/pickSpecificBubble', { bubbles: [bubble._id] })
}
const filterUserChosenBubbles = bubbleID => store.getters["bubbles/getUserBubbles"].filter(bubble => (bubble._id === bubbleID)).length > 0
</script>
