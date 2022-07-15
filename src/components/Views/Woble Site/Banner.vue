<script setup>

defineProps({

})

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
  <div class="banner_bg">
    <picture class="background">
      <source media="(min-width:650px)" :srcset="`${publicPath}imgs/banner@2x.jpg`">
      <source media="(min-width:465px)" :srcset="`${publicPath}imgs/banner.jpg`">
      <img class="background" :src="`${publicPath}imgs/banner@2x.jpg`" alt="Flowers">
    </picture>
  </div>
</template>

<style lang="scss" scoped>

</style>