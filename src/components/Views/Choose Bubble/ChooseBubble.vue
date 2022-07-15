<template>
  <div>
    <div class="grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2 justify-between items-center">
      <h1 class="text-center md:text-left text-3xl md:text-4xl font-black mb-3 mb:mb-0">
        Choose your Bubbleyy
      </h1>

      <div class="flex items-center">
        <theme-input v-model="searchBubble" full-width class="ml-auto search" type="search" placeholder="Search" />
      </div>
    </div>

    <theme-spinner v-if="loading" large />

    <div v-else class="py-10">
      <div v-if="!bubbles.length">
        <new-woble-prototype />
        <div class="flex justify-center items-center text-2xl md:text-3xl font-black">
          <h3>No Bubbles Found</h3>
        </div>
      </div>
      <div v-else class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-12 items-center">
        <new-woble-prototype class="text-center" />
        <div v-for="bubble in bubbles" :key="bubble._id" class="block text-center">
          <div class="bubble-container">
            <div class="woble" @click="viewBubbleDetails(bubble)">
              <img v-if="userData._id === bubble.createdBy" class="user-bubble"
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

    <theme-modal v-show="showAlertModal" @close="showAlertModal = false" title="Alert">
      <template #body>
        <h2>Waiting for Approval</h2>
      </template>
    </theme-modal>
  </div>
</template>

<script setup>
import NewWoblePrototype from "./NewWoblePrototype.vue";
import { ref, computed } from "vue";
import { store } from "../../../store";
import { useRouter } from 'vue-router'

const props = defineProps({
  userData: {
    type: Object,
    required: true
  },
})

const searchBubble = ref(null)
let showAlertModal = ref(false)
let loading = ref(false)
const router = useRouter()
const publicPath = import.meta.env.BASE_URL

const userProfile = async() => {
  loading.value = true
  await store.dispatch('auth/getUserProfile', props.userData?._id)
  loading.value = false
}
userProfile()

const bubbles = computed(() => {
  const bubbles = store.getters["bubbles/getUserBubbles"]
  if (searchBubble.value) return bubbles?.filter((bubble) => bubble.title.toLowerCase().includes(searchBubble.value.toLowerCase()))
  return bubbles
})

const viewBubbleDetails = (bubble) => {
  const bubbleInfo = {id: bubble?._id, name: bubble?.title?.replace('#', '').toLowerCase()}
  localStorage.setItem('selectedBubble', JSON.stringify(bubbleInfo))
  router.push({ name: 'ViewBubble', params: { name: bubbleInfo.name } })
}
</script>

<style lang="scss" scoped>
.notification-badge{
  position: relative;
  span{
    position: absolute;
    top: -3px;
    right: -3px;
    padding: 5px;
    height: 20px;
    width: 20px;
    font-size: 12px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
