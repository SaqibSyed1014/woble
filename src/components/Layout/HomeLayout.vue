<template>
  <div>
    <CollapsibleNavBar />
    <div :style="{background: `url(${publicPath}imgs/banner@2x.jpg) no-repeat center`, backgroundSize: 'cover', minHeight: '100vh'}">
      <div class="relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto pb-12">
        <theme-header />

        <section class="bg-white shadow-xl rounded-2xl mx-4 sm:mx-10" :class="[['AllWoblers', 'SavedWoblers'].includes($route.name) ? 'p-0' : 'p-4 sm:p-10 min-h-screen']">
          <router-view :user-data="userData" :user-bubbles="bubbles" />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import CollapsibleNavBar from "./CollapsibleNavBar.vue";
import { computed } from "vue";
import { store } from "../../store";

const publicPath = import.meta.env.BASE_URL
const userData = computed(() => JSON.parse(JSON.stringify(store.getters["auth/getUserData"])))
const bubbles = computed(() => store.getters["bubbles/getUserBubbles"])
</script>
