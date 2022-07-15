<template>
  <div>
    <Carousel ref="myCarousel" :breakpoints="breakpoints">
      <Slide class="visible mb-5" :id="`slideIndex-${index}`" v-for="(wobler, index) in woblers" :key="wobler._id">
        <div class="carousel__item">
          <wobler-card :wobler="wobler" @view-image-gallery="openLightBox" />
        </div>
      </Slide>
      <template #addons="{ currentSlide }">
        <button v-if="currentSlide > 0" class="carousel__prev" @click="moveBack()">
          <img :src="`${publicPath}src/assets/imgs/SVG/next.svg`" alt="prev">
        </button>
        <button :disabled="woblersLoading" class="carousel__next" @click="moveNext()">
          <img v-if="!woblersLoading" :src="`${publicPath}src/assets/imgs/SVG/next.svg`" alt="next">
          <theme-spinner v-else small color="white"/>
        </button>
      </template>
    </Carousel>

    <div>
      <div class="wobler-options-wrapper">
        <div class="wobler-options" @click="dislikingTheWobler">
          <svg v-if="disLikeLoading" class="inline w-6 h-6 text-transparent animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#3a028b"/>
          </svg>
          <img v-else :src="`${publicPath}src/assets/imgs/SVG/cardCross.svg`" alt="prev">
        </div>
        <div class="wobler-options"><img :src="`${publicPath}src/assets/imgs/SVG/cardMessage.svg`" alt="prev"></div>
        <div class="wobler-options" @click="isWoblerSaved ? savingTheWobler() : removingTheSavedWobler()">
          <svg v-if="saveLoading" class="inline w-6 h-6 text-transparent animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#3a028b"/>
          </svg>
          <img v-else-if="isWoblerSaved" :src="`${publicPath}src/assets/imgs/SVG/cardW.svg`" alt="unselected">
          <img v-else :src="`${publicPath}src/assets/imgs/SVG/cardWSelected.svg`" alt="selected">
        </div>
        <div class="wobler-options" @click="likingTheWobler">
          <svg v-if="likeLoading" class="inline w-6 h-6 text-transparent animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#3a028b"/>
          </svg>
          <img v-else :src="`${publicPath}src/assets/imgs/SVG/cardHeart.svg`" alt="prev">
        </div></div>
    </div>

    <vue-easy-lightbox
        scrollDisabled
        moveDisabled
        :visible="visible"
        :imgs="imgsToView"
        @hide="visible = false"
    ></vue-easy-lightbox>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex"
import WoblerCard from "./WoblerCard.vue"
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import VueEasyLightbox from 'vue-easy-lightbox'


export default {
  name: "WoblersCarousel",
  components: {
    WoblerCard,
    Carousel,
    Slide,
    Navigation,
    VueEasyLightbox
  },
  props: {
    woblers: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      imgsToView: [],
      visible: false,
      publicPath: import.meta.env.BASE_URL,
      woblersLoading: false,
      breakpoints: {
        700: { // 700px and up
          itemsToShow: 1,
          snapAlign: 'center',
        },
        1024: { // 1024 and up
          itemsToShow: 1,
          snapAlign: 'center',
        },
      },
      slideIndex: 0,
      savedWoblerIndex: [],
      saveLoading: false,
      likeLoading: false,
      disLikeLoading: false
    }
  },
  computed: {
    ...mapState('woblers', ['limit', 'saveLimit']),
    isWoblerSaved() {
      if (this.$route.name === 'SavedWoblers' && this.slideIndex === 0) {
        for (let i = 0; i < this.woblers.length; i++) {
          this.savedWoblerIndex.push(i)
        }
      }
      return !this.savedWoblerIndex.includes(this.slideIndex)
    }
  },
  methods:{
    ...mapActions('woblers', ['fetchAllWoblers', 'fetchSavedWoblers', 'savingWobler', 'removingSavedWobler', 'likingWobler', 'dislikingWobler']),
    async moveNext() {
      switch (this.$route.name) {
        case 'AllWoblers':
          if (this.slideIndex + 1 === this.limit) {
            this.woblersLoading = true
            await this.fetchAllWoblers()
            this.woblersLoading = false
          }
          break;
        case 'SavedWoblers':
          if (this.slideIndex + 1 === this.saveLimit) {
            this.woblersLoading = true
            await this.fetchSavedWoblers()
            this.woblersLoading = false
          }
          break;
      }
      this.$refs.myCarousel.next();
      this.slideIndex++
    },
    moveBack() {
      this.$refs.myCarousel.prev()
      this.slideIndex--
    },
    async dislikingTheWobler() {
      const activeSlide = this.$el.querySelector(`#slideIndex-${this.slideIndex}`)
      const activeWobler = this.$el.querySelector(`#slideIndex-${this.slideIndex} .carousel__item .wobler-card`)
      activeSlide.classList.add("disliked")
      this.dislikeLoading = true
      await this.dislikingWobler({ _id: activeWobler.id })
      this.disLikeLoading = false
      setTimeout(() => {
        activeSlide.remove();
        this.slideIndex++
      },700)
    },
    async savingTheWobler() {
      const activeWobler = this.$el.querySelector(`#slideIndex-${this.slideIndex} .carousel__item .wobler-card`)
      this.saveLoading = true
      await this.savingWobler({ _id: activeWobler.id })
      this.saveLoading = false
      this.savedWoblerIndex.push(this.slideIndex)
    },
    async removingTheSavedWobler() {
      const activeWobler = this.$el.querySelector(`#slideIndex-${this.slideIndex} .carousel__item .wobler-card`)
      this.saveLoading = true
      await this.removingSavedWobler({ _id: activeWobler.id })
      this.saveLoading = false
      this.savedWoblerIndex = this.savedWoblerIndex.filter(item =>item !== this.slideIndex )
    },
    async likingTheWobler() {
      const activeSlide = this.$el.querySelector(`#slideIndex-${this.slideIndex}`)
      const activeWobler = this.$el.querySelector(`#slideIndex-${this.slideIndex} .carousel__item .wobler-card`)
      activeSlide.classList.add("liked")
      this.likeLoading = true
      await this.likingWobler({ _id: activeWobler.id })
      this.likeLoading = false
      setTimeout(() => {
        activeSlide.remove();
        this.slideIndex++
      },700)
    },
    openLightBox(gallery) {
      this.visible = true
      this.imgsToView = gallery
    },
  }
}
</script>

<style scoped lang="scss">
.visible {
  transition: transform .7s ease-out;
}
.liked {
  animation: like-wobler-animation .7s cubic-bezier(0.55, -0.04, 0.91, 0.94) forwards;
}
.disliked{
  animation: dislike-wobler-animation .7s cubic-bezier(0.55, -0.04, 0.91, 0.94) forwards;
}
@keyframes like-wobler-animation {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-600px);
  }
}
@keyframes dislike-wobler-animation {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(600px);
  }
}
.wobler-options-wrapper{
  padding-bottom: 2.5rem;
  display: flex;
  justify-content: center;
  column-gap: 2rem;
  & .wobler-options{
    height: 60px;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: rgba(50, 50, 93, 0.25) 0 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  }
  @media (max-width: 540px) {
    column-gap: 1rem;
    & .wobler-options {
      height: 50px;
      width: 50px;
    }
  }
}
.carousel:deep(.carousel__viewport) {
  padding-bottom: 3rem;
}
.carousel:deep(.carousel__slide .carousel__slide--visible) {
  margin: 0 8rem;
}
.carousel:deep(.carousel__prev), .carousel:deep(.carousel__next){
  display: none;
  @media (min-width: 540px) {
    display: flex;
  }
  & img{
    filter: brightness(0) invert(1);
    width: 1.2rem;
    height: 1.2rem;
  }
}
.carousel:deep(.carousel__prev) img{
  transform: rotate(180deg);
}
.carousel:deep(.carousel__prev){ left: 3rem; }
.carousel:deep(.carousel__next){ right: 3rem; }
.carousel__slide > .carousel__item {
  transform: scale(1);
  opacity: 1.1;
  transition: 0.5s;
  @media (max-width: 540px) {
    width: 90%;
  }
}
.carousel__slide--visible > .carousel__item {
  opacity: 1;
  transform: rotateY(0);
}
.carousel__slide--next > .carousel__item {
  transform: scale(1.1) translate(-10px);
}
.carousel__slide--prev > .carousel__item {
  transform: scale(1.1) translate(10px);
}
.carousel__slide--active > .carousel__item {
  transform: scale(1.1);
}
.carousel:deep(.carousel__prev), .carousel:deep(.carousel__next){
  background: #3A018A;
  height: 2.5rem;
  width: 2.5rem;
}
.carousel:deep(.carousel__icon){
  width: 3rem;
  height: 3rem;
}
</style>
