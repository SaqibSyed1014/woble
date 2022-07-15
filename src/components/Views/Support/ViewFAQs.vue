<template>
  <div>
    <div class="grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2 justify-between items-center mb-5">
      <div class="flex items-center">
          <img class="back-nav" @click="$router.go(-1)" :src="`${publicPath}src/assets/imgs/SVG/next.svg`" alt="edit">
          <h3 class="font-black text-2xl ml-3">Support</h3>
      </div>
      <theme-input v-model="searchFAQ" full-width class="ml-auto search" type="search" placeholder="Search" />
    </div>

    <theme-spinner v-if="loading" large />

    <!-- All FAQ -->
    <div>
      <div class="faq-card" v-for="faq in allFAQs" :key="faq._id">
        <h2 class="font-extrabold">{{ faq.title }}</h2>
        <p>{{ faq.description }}</p>
      </div>
    </div>

    <!-- More FAQ Loader -->
    <div v-if="moreFAQLoading" class="mb-32 text-center">
      <div class="spinner-border animate-spin inline-block border-4 rounded-full w-12 h-12" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from "vue";
import { store } from "../../../store";

const searchFAQ = ref(null)
const publicPath = import.meta.env.BASE_URL

const allFAQs = computed(() => {
  const faqs = store.getters["FAQ/getAllFAQs"]
  if (searchFAQ.value) return faqs?.filter((faq) => faq.title.toLowerCase().includes(searchFAQ.value.toLowerCase()))
  return faqs
})

const moreFAQLoading = ref(false)
const onScrollToBottom = async() => {
  const scrollHeight = (window.scrollY + window.innerHeight).toFixed()
  const totalWindowHeight = document.body.scrollHeight
  if (scrollHeight >= totalWindowHeight  && store.state.FAQ.FAQs?.totalDocs >= store.state.FAQ.limit) {
    moreFAQLoading.value = true
    await store.dispatch('FAQ/fetchFAQs')
    moreFAQLoading.value = false
  }
}

const loading = ref(false)
const fetchingFAQs = async() => {
  loading.value = true
  await store.dispatch('FAQ/fetchFAQs')
  loading.value = false
  window.addEventListener('scroll', onScrollToBottom)
}
fetchingFAQs()

onBeforeUnmount(() => window.removeEventListener('scroll', onScrollToBottom))
</script>

<style scoped>
.faq-card{
  background: linear-gradient(to right, #8937D4 0%, #3425CD 100%);
  width: 100%;
  padding: 1rem;
  color: white;
  border-radius: 10px;
  margin-bottom: 1.7rem;
}
</style>
