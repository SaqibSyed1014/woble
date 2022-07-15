<template>
  <div class="comment-card">
    <div class="flex">
      <div class="wobler-profile-pic">
        <img @click="showLightBox(comment.commentBy.user.avatar)" :src="comment.commentBy.user.avatar" alt="Avatar"/>
      </div>
      <div class="comment-container pl-3">
        <div class="card-text shadow-lg mb-5">
          <div class="comment-header">
            <h5 class="text-gray-900">{{ comment.commentBy.user.name }}</h5>
            <h6 class="text-gray-400 text-sm">{{ convertStringDateTimeToDate(comment.dateTime) }}</h6>
          </div>
          <div class="comment-body">
            <p class="text-gray-700 text-base mb-1">
              {{ comment.comment }}
            </p>
            <img v-if="comment.imageFile" :src="comment.imageFile" @click="showLightBox(comment.imageFile)" />
          </div>
          <div class="comment-footer text-right">
            <hr class="h-0 my-3 border border-solid border-t-0 border-gray-700 opacity-25"/>
            <span class="font-black text-right cursor-pointer" @click="mainComment? $emit('message-to-reply', mainComment) : $emit('message-to-reply', comment)">Reply</span>
          </div>
        </div>
        <slot name="replies"></slot>
        <div v-if="comment.seeMore" class="text-right"><span class="cursor-pointer" @click="$emit('get-more-replies', comment._id)">See More Replies...</span></div>
      </div>
    </div>
    <vue-easy-lightbox
        scrollDisabled
        moveDisabled
        :visible="visible"
        :imgs="imgToView"
        @hide="visible = false"
    ></vue-easy-lightbox>
  </div>
</template>

<script setup>
import { convertStringDateTimeToDate } from "../componentData";
import VueEasyLightbox from 'vue-easy-lightbox';
import { ref } from "vue";

defineProps({
  comment: Object,
  mainComment: Object,
})

let imgToView = ref(null)
let visible = ref(false)

const showLightBox = image => {
  imgToView.value = image
  visible.value = true
}
</script>

<style scoped lang="scss">
.comment-card{
  & .wobler-profile-pic{
    width: 50px;
    height: 50px;
    border-radius: 9999px;
    overflow: hidden;
    @media(min-width: 768px) {
      width: 70px;
      height: 70px;
    }
    & img{
      cursor: pointer;
      height: 100%;
      width: 100%;
    }
  }
  & .comment-container {
    width: 100%;
    .comment-body img{
      width: 10rem;
      height: auto;
      cursor: pointer;
    }
    & .card-text{
      display: block;
      background: white;
      padding: 1rem;
      border-radius: 0.5rem;
    }
  }
  & .comment-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    & h5{
      line-height: 1.25;
      font-weight: 500;
      margin-bottom: 0;
      font-size: 1rem;
      @media (min-width: 620px) {
        font-size: 1.25rem;
      }
    }
    & h6{
      font-size: .7rem;
      @media (min-width: 620px) {
        font-size: .9rem;
      }
    }
  }
}
</style>
