<template>
  <div :style="{background: `url(${publicPath}imgs/banner@2x.jpg) no-repeat center`, backgroundSize: 'cover', minHeight: '100vh'}">
    <div class="relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto pb-44">
      <theme-header />

      <form class="auth-form bg-white mt-10 shadow-xl mx-auto rounded-2xl mx-auto">
        <router-view />
      </form>
    </div>
  </div>
</template>

<script setup>
const publicPath = import.meta.env.BASE_URL
</script>

<style lang="scss">
.auth-form{
  width: 100%;
  max-width: 600px;

  @media (max-width: 600px) {
    width: 95%;
  }
}
.auth-form-fields{
  display: grid;
  place-items: center;
  margin-top: 2.5rem;
}
.resp-field{
  width: 83.333%;
  margin-top: 1.25rem;
  @media (min-width: 768px) {
    width: 66.666667%;
  }
}
</style>
