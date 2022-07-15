<script>
export default {
  data(){
    return{
      publicPath: import.meta.env.BASE_URL,
      socialLinks: [
        { svgURL: 'facebook', alt: 'Facebook', },
        { svgURL: 'twitter', alt: 'Twitter', },
        { svgURL: 'youtube', alt: 'Youtube', },
        { svgURL: 'instagram', alt: 'Instagram', },
        { svgURL: 'linkedin', alt: 'Linkedin', },
      ],
    }
  },
}
</script>

<template>
  <footer>
    <section>
      <div class="relative text-white z-10 max-w-screen-lg xl:max-w-screen-xl py-14 px-4 sm:px-10 mx-auto">
        <div class="flex-row md:flex items-center justify-center md:justify-between">
          <div class="flex-row md:flex gap-10">
            <div>
              <img class="sm:ml-auto mx-auto" :src="`${publicPath}imgs/SVG/footer_logo.svg`" alt="Logo">
            </div>

            <div v-if="false" class="text-1/2xl font-medium max-w-sm mt-7 md:mt-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam doloremque nisi illo iste modi numquam
            </div>
          </div>

          <div>
            <div class="text-2xl px-2 pb-4 font-medium max-w-sm mt-7 md:mt-0">
              Find us on social media
            </div>

            <div class="flex items-center social_media gap-3 md:gap-7 mt-7 md:mt-0">
              <a href="#" v-for="social in socialLinks" :key="social">
                <img class="h-14" :src="`${publicPath}imgs/SVG/${social.svgURL}.svg`" :alt="social.alt">
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="theme-bg text-white text-1/2xl p-5 text-center font-medium">
      Copyright © 2021 woble.
    </div>
  </footer>
</template>

<style lang="scss" scoped>
  footer{
    &>section:first-child{
      background: #2C0168;
    }

    .social_media{
      a{
        display: flex;
        border-radius: 1000px;
        transition: 0.2s ease all;

         &:hover{
            box-shadow: 0 0 0 7px rgba(255,255,255,0.2);
         }
      }
    }
  }
</style>
