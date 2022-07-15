<script>
import {mapActions} from "vuex";
import { store } from "../../store";
import { router } from "../../router";

export default {
  data(){
    return{
      publicPath: import.meta.env.BASE_URL
    }
  },
  computed: {
    isAuthenticated: () => store.getters["auth/isAuthenticated"],
    currentRoute: () => router.currentRoute.value.name
  },
  methods: {
    ...mapActions('auth', ['logout']),
  },
}
</script>

<template>
  <header class="header">
    <div class="flex items-center justify-between py-4 px-4 sm:px-10">
      <router-link :to="isAuthenticated ? '/home' : '/'" class="logo">
        <img class="h-16 bubble" :src="`${publicPath}imgs/SVG/bubble.svg`" alt="bubble">
        <img class="icon" :src="`${publicPath}imgs/SVG/icon.svg`" alt="bubble">
      </router-link>
      <div class="actions text-white font-semibold  flex items-center gap-5 md:gap-16">
        <span class="cursor-pointer" v-if="isAuthenticated" @click="logout">Logout</span>
        <router-link v-else to="/auth/login">{{ currentRoute === 'Login' ? '' : 'Login' }}</router-link>
        <router-link to="/auth/register" v-if="$route.name !== 'Register' && !isAuthenticated" href="#" class="shadow-md gradient-bg py-2 px-7 md:px-14 rounded-3xl">Get Started</router-link>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header{
  background: var(--theme-color);
  .logo {
    padding: 0;
  }
}
</style>
