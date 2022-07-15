<template>
  <div class="wobler-card bg-white max-w-sm" :id="wobler._id">
    <div class="wobler-header">
      <img class="wobler-image relative rounded-lg" @click="$emit('view-image-gallery', imageGallery)" :src="wobler.profile_image" :alt="wobler.name"/>
      <img :src="`${publicPath}src/assets/imgs/SVG/message_bordered.svg`" alt="message"/>
      <img @click="reportTheWobler" :src="`${publicPath}src/assets/imgs/SVG/report.svg`" alt="report"/>
      <div v-if="imageGallery.length" class="total-likes rounded-full" style="z-index: 111">
        {{ `+${imageGallery.length}` }}
      </div>
    </div>
    <div class="wobler-detail">
      <h5 class="wobler-name text-gray-900">{{ wobler.name }}</h5>
      <p class="wobler-age text-gray-700">{{ `${wobler.age}` }} years old</p>
    </div>
    <div class="wobler-location">
      <img :src="`${publicPath}src/assets/imgs/SVG/locationCircle.svg`" alt="location">
      <span>{{ wobler.country }}</span>
    </div>
    <div v-if="!!wobler.about" class="about-wobler bg-gray-100">
      <h5>About</h5>
      <p>{{ wobler.about }}</p>
    </div>
    <div class="matched-bubbles-container">
      <div class="matched-bubbles">
        <img :src="`${publicPath}src/assets/imgs/SVG/rings.svg`" alt="rings">
        <span>Matched Bubbles</span>
      </div>
      <div v-if="wobler.matchedBubble.length" class="bubbles">
        <div v-for="bubble in wobler.matchedBubble" :key="bubble._id" class="block text-center" style="height: min-content;">
          <div class="bubble-container">
            <div class="small-woble cursor-pointer" @click="viewBubbleDetails(bubble)">
              <img :src="`${publicPath}src/assets/imgs/SVG/ringsCircle.svg`" alt="mutual">
              <span class="text-1/2xl uppercase font-bold"
                    :style="{ background: bubble.circleColor }">
              {{ bubble.name }}
            </span>
            </div>
            <div class="bubble-title">
              {{ bubble.title }}
            </div>
          </div>
        </div>
      </div>
      <div v-else class="no-matched-bubbles">No Bubbles Matched</div>
    </div>
  </div>
</template>

<script setup>
import {mapActions} from "vuex";
import {computed, ref} from "vue";
import { useRouter } from 'vue-router'
import {store} from "../../../store";

const props = defineProps({
  wobler: {
    type: Object,
    required: true,
  }
})
const router = useRouter()
const publicPath = import.meta.env.BASE_URL

const imageGallery = computed(() => props.wobler.imageGallery.reduce((a, {image}) => {
  if (!!image) a.push(image)
  return a
}, []))

const viewBubbleDetails = (bubble) => {
  const bubbleInfo = {id: bubble?._id, name: bubble?.title?.replace('#', '').toLowerCase()}
  localStorage.setItem('selectedBubble', JSON.stringify(bubbleInfo))
  router.push({ name: 'ViewBubble', params: { name: bubbleInfo.name } })
}

const reportTheWobler = async() => await store.dispatch('woblers/reportingWobler', { wobler: props.wobler._id })
</script>

<style scoped lang="scss">
.wobler-card{
  display: block;
  width: 90%;
  overflow: auto;
  max-height: 1000px; //min-height: 525px;
  padding: 0.6rem;
  border-radius: 0.5rem;
  margin: 1.5rem auto 1.25rem auto;
  box-shadow: rgba(50, 50, 93, 0.25) 0 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  @media (min-width: 540px) {
    width: 400px;
  }
  .wobler-header{
    width: 100%;
    height: 250px;
    overflow: hidden;
    position: relative;
    & .wobler-image{
      display: block;
      width: 100%;
      height: 100%;
      cursor: pointer;
      object-fit: cover;
    }
    & img{
      position: absolute;
    }
    & img:nth-child(2) {
      top: .5rem;
      right: .5rem;
      cursor: pointer;
    }
    & img:nth-child(3) {
      bottom: .5rem;
      left: .5rem;
      cursor: pointer;
    }
    & .total-likes{
      bottom: .5rem;
      right: .5rem;
      position: absolute;
      background: #6723f6;
      color: white;
      padding: .2rem .7rem;
      font-weight: bold;
    }
  }
  .wobler-detail{
    text-align: center;
    & .wobler-name{
      line-height: 1.25;
      font-weight: 900;
      font-size: 1.25rem;
      margin: 0.5rem 0 0;
    }
    & .wobler-age{
      font-size: .8rem;
    }
  }
  .wobler-location {
    display: flex;
    column-gap: 0.25rem;
    justify-content: center;
    align-items: center;
    margin: 0.5rem 0;
    & span{
      font-size: .8rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    & img{
      width: 1.2rem;
      height: 1.2rem;
    }
  }
  .about-wobler{
    padding: 0.5rem;
    text-align: center;
    h5 { font-size: .8rem; font-weight: 700 }
    p {
      font-size: .7rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .matched-bubbles-container{
    .matched-bubbles{
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 0.7rem;
      margin: 0.5rem 0;
      & img{
        filter: brightness(0);
        width: 1.3rem;
        height: 1.3rem;
      }
    }
    .bubbles{
      display: flex;
      width: 100%;
      overflow: auto;
      column-gap: 0.8rem;
      .bubble-title{
        font-size: .8rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        margin-top: 0.25rem;
        text-transform: lowercase;
      }
    }
    .no-matched-bubbles{
      color: #3A018A;
      text-align: center;
      font-weight: bolder;
      margin-bottom: 0.75rem;
    }
  }
  .small-woble img{
    position: absolute;
    top: 33%;
    right: -8px;
    width: 22px;
  }
}
</style>
