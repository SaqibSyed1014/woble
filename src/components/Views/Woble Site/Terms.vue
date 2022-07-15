<script setup>
import Header from '../../Global/ThemeHeader.vue'
import Banner from './Banner.vue'
import Icons from './Icons.vue'
import Contact from './Contact.vue'
import Footer from './Footer.vue'
</script>

<script>
export default {
  data(){
    return{
      publicPath: import.meta.env.BASE_URL
    }
  },
}
</script>

<template>
  <div :style="{background: `url(${publicPath}imgs/banner@2x.jpg) no-repeat center`, backgroundSize: 'cover', minHeight: '100vh'}">
    <div class="relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto pb-44">
      <Header />

      <section class="bg-white mt-10 shadow-xl mx-auto rounded-2xl mx-auto">
        <div class="py-8">
          <div class="flex justify-between items-center px-10">
            <h1 class="text-center text-3xl md:text-4xl font-black">
              Terms of Service
            </h1>
          </div>

          <div class="p-10">
            <p class="text-1/2xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid animi architecto asperiores beatae, cum eligendi enim error esse, ex facilis fugiat fugit iure officia pariatur, quidem quisquam saepe tempora voluptates!</p>
            <p class="mt-3 text-1/2xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid animi architecto asperiores beatae, cum eligendi enim error esse, ex facilis fugiat fugit iure officia pariatur, quidem quisquam saepe tempora voluptates Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid animi architecto asperiores beatae, cum eligendi enim error esse, ex facilis fugiat fugit iure officia pariatur, quidem quisquam saepe tempora voluptates!</p>
            <p class="mt-3 text-1/2xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid animi architecto asperiores beatae, cum eligendi enim error esse, ex facilis fugiat fugit iure officia pariatur, quidem quisquam saepe tempora voluptates!</p>
            <p class="mt-3 text-1/2xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid animi architecto asperiores beatae, cum eligendi enim error esse, ex facilis fugiat fugit iure officia pariatur, quidem quisquam saepe tempora voluptates!</p>
            <p class="mt-3 text-1/2xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid animi architecto asperiores beatae, cum eligendi enim error esse, ex facilis fugiat fugit iure officia pariatur, quidem quisquam saepe tempora voluptates!</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#login{
  width: 100%;
  max-width: 600px;

  @media (max-width: 600px) {
    width: 95%;
  }
}
</style>
