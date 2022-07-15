<script setup>
import Header from '../Global/ThemeHeader.vue'
import Banner from '../Views/Woble Site/Banner.vue'
import Icons from '../Views/Woble Site/Icons.vue'
import Contact from '../Views/Woble Site/Contact.vue'
import Footer from '../Views/Woble Site/Footer.vue'
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

      <section class="bg-white mt-10 shadow-xl mx-auto rounded-2xl mx-auto" id="login">
        <div class="login_box py-16">
          <h1 class="text-center text-4xl md:text-5xl font-black">Sign up</h1>

          <div class="icon_input w-5/6 md:w-2/3 mx-auto mt-16">
            <input type="email" placeholder="Your email">
            <span class="shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 41.315 32.21">
                <g id="Group_325" data-name="Group 325" transform="translate(-240.906 -2559.396)">
                  <rect id="Rectangle_103" data-name="Rectangle 103" width="38.368" height="29.263" rx="4.041" transform="translate(242.38 2560.869)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.947"/>
                  <path id="Path_82" data-name="Path 82" d="M244.25,2562.485l17.315,14.995,17.315-14.995" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.947"/>
                </g>
              </svg>
            </span>
          </div>

          <div class="w-5/6 md:w-2/3 mx-auto mt-8">
            <button class="theme_btn block light_hover">
              Register
            </button>
          </div>

          <div class="w-4/5 md:w-2/3 mx-auto mt-8 text-center">
            <a href="#!" class="underline text-gray-500 text-1/2xl">
              Already Registered? Login here
            </a>
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
