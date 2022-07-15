<template>
  <div>
    <theme-spinner v-if="loading" large />
    <div v-else>
      <div class="grid grid-rows-1 grid-cols-2 view-header">
        <div class="flex">
          <img class="back-nav" @click="$router.go(-1)" :src="`${publicPath}src/assets/imgs/SVG/next.svg`" alt="edit">
          <p class="font-black text-2xl ml-3">{{ bubble.title }}</p>
        </div>
        <div class="header-options">
          <img v-if="bubble.edit" class="mr-8" @click="openUpdateModal"
               :src="`${publicPath}src/assets/imgs/SVG/edit.svg`" alt="edit">
          <img v-if="bubble.delete" @click="showDeleteModal = true"
                :src="`${publicPath}src/assets/imgs/SVG/delete.svg`" alt="delete">
        </div>
      </div>
      <div class="text-center">
        <div class="bubble-container">
          <div class="woble cursor-pointer mx-auto">
            <img v-if="!bubble.createdBy" class="user-bubble"
                 :src="`${publicPath}src/assets/imgs/SVG/state.svg`" alt="trending">
            <img v-if="bubble.trending" class="trending-bubble" :src="`${publicPath}src/assets/imgs/SVG/trending.svg`"
                 alt="trending">
            <span class="text-3xl uppercase lg:text-4xl xl:text-5xl font-bold"
                  :style="{ background: bubble.circleColor }">
              {{ bubble.name }}
            </span>
          </div>
        </div>
      </div>
        <bubble-comments :bubble-id="bubble._id" :comments="bubble.comments" />
    </div>

    <theme-modal v-show="showModal" @close="showModal = false" title="Update Bubble">
      <template #body>
        <theme-input v-model="updatePayload.title" full-width svg-name="plus.svg" type="text" placeholder="Add Bubble Title" />
      </template>
      <template #footer>
        <theme-footer-button
            :loading="updateModalLoading"
            @click="updatingBubble"
        >
          Update
        </theme-footer-button>
      </template>
    </theme-modal>


    <theme-modal v-show="showDeleteModal" @close="showDeleteModal = false" title="Delete Bubble" danger>
      <template #body>
        <p>Do you really want to delete <b class="capitalize">{{ bubble.title }}</b> Bubble?</p>
      </template>
      <template #footer>
        <theme-footer-button
            :loading="deleteModalLoading"
            color="bg-red-500"
            @click="deletingBubble"
        >
          Delete
        </theme-footer-button>
      </template>
    </theme-modal>
  </div>
</template>

<script setup>
import BubbleComments from "./BubbleComments.vue";
import { computed, ref, onBeforeUnmount } from "vue";
import { store } from "../../../store";

const publicPath = import.meta.env.BASE_URL
const loading = ref(false)

const bubble = computed(() => store.getters['bubbles/getSpecificBubble'])

const fetchingSpecificBubble = async() => {
  loading.value = true
  const bubble = JSON.parse(localStorage.getItem('selectedBubble'))
  await store.dispatch('bubbles/fetchSpecificBubble', bubble.id)
  loading.value = false
}
fetchingSpecificBubble()

onBeforeUnmount(() => store.dispatch('bubbles/resetBubblesState'))

const updatePayload = ref({})
const showModal = ref(false)
const openUpdateModal = () => {
  updatePayload.value = {
    id: bubble.value._id,
    title: bubble.value?.title?.replace('#', '')
  }
  showModal.value = true
}

const updateModalLoading = ref(false)
const updatingBubble = async() => {
  updateModalLoading.value = true
  await store.dispatch('bubbles/updateBubble', updatePayload.value)
  updateModalLoading.value = false
  showModal.value = false
}

const showDeleteModal = ref(false)
const deleteModalLoading = ref(false)
const deletingBubble = async() => {
  deleteModalLoading.value = true
  await store.dispatch('bubbles/deleteBubble', { id: bubble.value._id })
  deleteModalLoading.value = false
  showDeleteModal.value = false
}
</script>

<style scoped lang="scss">
.view-header{
  .header-options{
    display: flex;
    align-items: center;
    margin-left: auto;
    img {
      cursor: pointer;
    }

  }
}
</style>
