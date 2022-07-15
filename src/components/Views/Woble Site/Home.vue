<script setup>
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
  <Banner />

  <div class="relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto">
    <theme-header />

    <section id="welcome">
      <div class="flex items-center justify-between px-4 sm:px-10 gap-16 lg:gap-36 xl:gap-48 mt-0 md:mt-5 lg:mt-10">
        <div class="text-white w-full lg:w-4/5 py-10 lg:p-0">
          <h1 class="font-black text-3xl md:text-5xl lg:text-6xl xl:text-8xl">Welcome to Woble</h1>
          <p class="font-medium text-base md:text-2xl mt-5">
            We are super excited to share this new platform!<br>
            Through Woble you will be able to create connections, share niches and build communities with the whole World as your Bubble.<br>
            Download the Woble app, become a Wobler and start exploring!
          </p>

          <div class="flex items-center gap-10 md:gap-16 mt-5 md:mt-7 lg:mt-10">
            <a href="#">
              <img :src="`${publicPath}imgs/SVG/appStore.svg`" class="h-12 md:h-14" alt="Appstore">
            </a>

            <a href="#" class="text-white text-base md:text-2xl font-bold">See how it works ></a>
          </div>
        </div>

        <div class="hidden lg:block">
          <picture class="home_banner">
            <source media="(min-width:650px)" :srcset="`${publicPath}imgs/app_screen_1@2x.png`">
            <source media="(min-width:465px)" :srcset="`${publicPath}imgs/app_screen_1.png`">
            <img class="home_banner" :src="`${publicPath}imgs/app_screen_1@2x.png`" alt="">
          </picture>
        </div>
      </div>
    </section>

    <section class="bg-white mt-10 shadow-xl rounded-2xl mx-4 sm:mx-10" id="content">
      <div class="grid grid-cols-1 md:grid-cols-3 justify-items-center">
        <div class="py-5 px-16 md:p-16 text-center">
          <div>
            <picture>
              <source media="(min-width:650px)" :srcset="`${publicPath}imgs/welcome@2x.png`">
              <source media="(min-width:465px)" :srcset="`${publicPath}imgs/welcome.png`">
              <img :src="`${publicPath}imgs/welcome@2x.png`" alt="">
            </picture>
          </div>

          <div class="font-semibold text-base sm:text-2xl mt-10">
            Welcome to <br>
            Bubblemaking
          </div>
        </div>

        <div class="py-5 px-16 md:p-16 text-center">
          <div>
            <picture>
              <source media="(min-width:650px)" :srcset="`${publicPath}imgs/connect@2x.png`">
              <source media="(min-width:465px)" :srcset="`${publicPath}imgs/connect.png`">
              <img :src="`${publicPath}imgs/connect@2x.png`" alt="">
            </picture>
          </div>

          <div class="font-semibold text-base sm:text-2xl mt-10">
            Connect by interest and share niches
          </div>
        </div>

        <div class="py-5 px-16 md:p-16 text-center">
          <div>
            <picture>
              <source media="(min-width:650px)" :srcset="`${publicPath}imgs/create@2x.png`">
              <source media="(min-width:465px)" :srcset="`${publicPath}imgs/create.png`">
              <img :src="`${publicPath}imgs/create@2x.png`" alt="">
            </picture>
          </div>

          <div class="font-semibold text-base sm:text-2xl mt-10">
            Create your own World Bubble
          </div>
        </div>
      </div>

      <div class="flex items-center light_gray p-10 md:p-12 lg:p-16 gap-16 choose_woble">
        <div class="hidden md:block w-full md:w-1/3">
          <picture class="side_img">
            <source media="(min-width:650px)" :srcset="`${publicPath}imgs/app_screen@2x.png`">
            <source media="(min-width:465px)" :srcset="`${publicPath}imgs/app_screen.png`">
            <img :src="`${publicPath}imgs/app_screen@2x.png`" class="side_img" alt="">
          </picture>
        </div>

        <div class="w-full md:w-2/3">
          <div class="text-3xl md:text-4xl xl:text-5xl font-bold">Choose your woble</div>
          <div class="mt-3 text-base md:text-2xl font-medium">With Bubblemaking you are able to create or join communities.</div>
          <div class="mt-3 text-base md:text-2xl font-medium">Look up the Bubbles that match your interests, explore the communities through your selected Bubbles or create your own!</div>

          <div class="mt-10 grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-start">
            <div>
              <div class="woble">
                <span class="text-3xl lg:text-4xl xl:text-5xl font-bold" style="background: #BC37DD">
                  DE
                </span>
              </div>

              <div class="text-center mt-3">
                #design
              </div>
            </div>

            <div>
              <div class="woble">
                <span class="text-3xl lg:text-4xl xl:text-5xl font-bold" style="background: #49BCF3">
                  SC
                </span>
              </div>

              <div class="text-center mt-3">
                #soccer
              </div>
            </div>

            <div>
              <div class="woble">
                <span class="text-3xl lg:text-4xl xl:text-5xl font-bold" style="background: #EA02D4">
                  SN
                </span>
              </div>

              <div class="text-center mt-3">
                #snorkel
              </div>
            </div>

            <div>
              <div class="woble">
                <span class="text-3xl lg:text-4xl xl:text-5xl font-bold" style="background: #A552E1">
                  CA
                </span>
              </div>

              <div class="text-center mt-3">
                #cats
              </div>
            </div>

            <div>
              <div class="woble">
                <span class="text-3xl lg:text-4xl xl:text-5xl font-bold" style="background: #7787EA">
                  DG
                </span>
              </div>

              <div class="text-center mt-3">
                #dogs
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Icons />
      </div>

      <div class="flex items-center px-4 sm:px-10 py-10 md:p-12 lg:p-16 gap-16 flex-row-reverse choose_woble">
        <div class="hidden md:block">
          <picture class="side_img">
            <source media="(min-width:650px)" :srcset="`${publicPath}imgs/app_screen_2@2x.png`">
            <source media="(min-width:465px)" :srcset="`${publicPath}imgs/app_screen_2.png`">
            <img :src="`${publicPath}imgs/app_screen_2@2x.png`" class="side_img" alt="">
          </picture>
        </div>

        <div class="text-left lg:text-right">
          <div class="text-3xl md:text-4xl xl:text-5xl font-bold">Find Woblers</div>
          <div class="mt-3 text-base md:text-2xl font-medium">Browse through the Woblers in your chosen Bubbles and connect, save or send a personal message!</div>
          <div class="mt-3 text-base md:text-2xl font-medium">Our Bubbleboard allows you to connect with the whole community inside the Bubble.</div>

          <div class="mt-7 text-center">
            <picture class="chat_img">
              <source media="(min-width:650px)" :srcset="`${publicPath}imgs/messages@2x.png`">
              <source media="(min-width:465px)" :srcset="`${publicPath}imgs/messages.png`">
              <img :src="`${publicPath}imgs/messages@2x.png`" class="chat_img" alt="">
            </picture>
          </div>
        </div>
      </div>
    </section>
  </div>

  <section class="mt-20 theme-bg">
    <div class="relative text-white z-10 max-w-screen-lg xl:max-w-screen-xl py-14 mx-auto">
      <Contact />
    </div>
  </section>

  <Footer></Footer>
</template>

<style scoped>

</style>
