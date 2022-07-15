<template>
  <div class="menu-bar" v-if="isMenuShown">
    <div :class="{'menu-overlay' : showMenu}" @click="showMenu = !showMenu" tabindex="0"></div>
    <div class="navbar-icon">
      <div v-if="showMenu" class="menu-wrapper bg-white shadow-xl rounded-2xl">
        <theme-input class="search mb-3" type="search" placeholder="Search" />
        <div @click="navigateMenu(link.path)" class="menu-link" v-for="link in menuLinks">
          <span class="flex items-center">
            <span class="menu-icon-wrapper rounded-full">
              <img :src="`${publicPath}src/assets/imgs/SVG/${link.svg}`" :alt="link.svg">
            </span>
            <span>{{ link.name }}</span>
          </span>
        </div>
      </div>
      <div @click="showMenu = !showMenu" class="icon-wrapper rounded-full">
        <img v-if="showMenu" style="transform: rotate(45deg)" :src="`${publicPath}src/assets/imgs/SVG/plus.svg`" alt="plus">
        <img v-else :src="`${publicPath}src/assets/imgs/SVG/hamburger.svg`" alt="hamburger">
      </div>
    </div>
  </div>
</template>

<script setup>
import { menuLinks, subViews } from "../componentData";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const showMenu = ref(false)
const route = useRoute()
const router = useRouter()
const publicPath = import.meta.env.BASE_URL

const navigateMenu = path => {
  router.push(path)
  showMenu.value = false
}

const isMenuShown = computed(() => !subViews.includes(route.name))
</script>

<style lang="scss" scoped>
.navbar-icon .icon-wrapper{
  position: fixed;
  bottom: 2rem;
  right: 3rem;
  width: 5rem;
  height: 5rem;
  background-color: #3a028b;
  display: grid;
  place-items: center;
  z-index: 11111;
  @media (max-width: 640px) {
    bottom: 0;
    left: 50%;
    width: 3.5rem;
    height: 3.5rem;
    transform: translate(-50%, -20%);
  }
  & img {
    width: 50%;
    height: 50%;
    cursor: pointer;
    z-index: 11111111;
  }
}
.menu-overlay{
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 50%;
  left: 50%;
  z-index: 11;
  transform: translate(-50%, -50%);
  background-color: rgba(165, 82, 225, .5);
}
.menu-wrapper{
  padding: 1.3rem;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 11111;
  transform: translate(-50%, -50%);
  width: 90%;
  & .search{
    max-width: 100% !important;
  }
  @media (min-width: 640px) {
    width: 80%;
    padding: 2rem;
  }
  @media (min-width: 768px) { width: 70% }
  @media (min-width: 1024px) { width: 40% }
}
.menu-link{
  display: block;
  padding: .5rem 0;
  font-weight: 900;
  cursor: pointer;
  &:hover{
    color: #A552E1;
  }
  & .menu-icon-wrapper{
    background: #3a028b;
    height: 2rem;
    width: 2rem;
    display: grid;
    place-items: center;
    margin-right: 1rem;
    & img{
      width: 1rem;
    }
  }
}
</style>
