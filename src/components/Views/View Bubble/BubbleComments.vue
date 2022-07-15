<template>
  <div class="chat-section -ml-4 -mr-4 -mb-4 sm:-ml-10 sm:-mr-10 sm:-mb-10 relative">
    <div class="comments-window" @scroll="onScroll">
      <!-- All Comments -->
      <div class="main-comment" v-if="totalComment" v-for="(comment, index) in comments" :ref="`commentRef_${index}`">
        <theme-comment
            :comment="comment"
            @get-more-replies="gettingMoreReplies"
            @message-to-reply="focusReplySection"
            class="p-3 md:py-5 md:px-7"
        >
          <template #replies>
            <theme-comment
                v-if="comment.replied"
                @get-more-replies="gettingMoreReplies"
                @message-to-reply="focusReplySection"
                v-for="replies in comment.replies"
                :comment="replies"
                :main-comment="comment"
                class="comment-replies"
            />
          </template>
        </theme-comment>
      </div>
      <div v-else class="grid place-items-center h-screen">
        <h1 class="font-black text-3xl">No comments found</h1>
      </div>

      <!-- Load More Comments -->
      <div v-if="commentsLoading && comments[comments.length-1].moreComments" class="mb-32 text-center">
        <div class="spinner-border animate-spin inline-block border-4 rounded-full w-12 h-12" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <!-- Comment Writing -->
      <div class="comment-section" ref="replyingComment">
        <div v-if="commentToReply._id || attachedImageOverlay" class="reply-comment">
          <div class="flex">
            <div class="selected-comment">
              <div v-if="commentToReply._id">
                <h5 class="font-black pb-1">{{ commentToReply.commentBy.user.name }}</h5>
                <p class="text-gray-700 text-base mb-4">
                  {{ commentToReply.comment }}
                </p>
              </div>
              <!-- Selected Image Preview -->
              <div v-if="attachedImageOverlay" class="w-full"><img :src="attachedImageOverlay" class="attached-image" alt="image"></div>
            </div>
            <img class="cursor-pointer" @click="removeReplySection()" :src="`${publicPath}src/assets/imgs/SVG/cross.svg`" alt="edit">
          </div>
        </div>

        <div class="send-chat-section">
          <div class="image-attachment">
            <img @click="$refs.imageInput.click()" :src="`${publicPath}src/assets/imgs/SVG/plus.svg`" alt="plus">
            <input type="file" accept="image/*" ref="imageInput" @input="displayAttachedImage" style="display:none"/>
          </div>
          <div class="message-input">
            <input v-model="comment" ref="commentField" @keyup.enter="addingComment" placeholder="Type your comment here"/>
          </div>
          <div class="send-btn" @click="addingComment">
              <div v-if="sendingMsg" class="spinner-border text-indigo-900 animate-spin inline-block border-4 rounded-full w-6 h-6"
                   role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <img v-else :src="`${publicPath}src/assets/imgs/SVG/send.svg`" alt="send">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    bubbleId: {
      type: String,
      required: true,
    },
    comments: {
      type: Array,
      required: true,
      default: []
    },
  },
  data() {
    return {
      publicPath: import.meta.env.BASE_URL,
      comment: '',
      commentToReply: {},
      page: 1,
      limit: 3,
      commentsLoading: false,
      sendingMsg: false,
      attachedImageOverlay: '',
      attachedImage: '',
    }
  },
  computed: {
    totalComment() {
      return this.comments?.length
    },
  },
  methods: {
    ...mapActions('bubbles', ['addCommentToBubble', 'addReplyToComment', 'fetchSpecificBubble', 'fetchingMoreReplies']),
    // getting more comments on scrolling down
    async onScroll ({ target: { scrollTop, clientHeight, scrollHeight }}) {
      if ((scrollTop+1) + clientHeight >= scrollHeight && this.comments[this.totalComment-1].moreComments) {
        this.commentsLoading = true
        await this.fetchSpecificBubble(this.bubbleId)
        this.commentsLoading = false
      }
    },

    // method for both adding & replying comments
    addingComment() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          let coords
          coords = position.coords
          const payload = new FormData()
          payload.append('bubbleID', this.bubbleId)
          if (this.commentToReply._id) payload.append('commentID', this.commentToReply._id)
          if (this.commentToReply._id) payload.append('reply', this.comment)
          else payload.append('comment', this.comment)
          payload.append('latitude', coords.longitude)
          payload.append('longitude', coords.longitude)
          payload.append('image', this.attachedImage)
          this.sendingMsg = true
          if (!this.commentToReply._id) await this.addCommentToBubble(payload)
          else await this.addReplyToComment(payload)
          this.sendingMsg = false
          const el = this.$refs.commentRef_0
          if (el && !this.commentToReply._id) el.scrollIntoView({ behavior: 'smooth' })
          this.comment = ''
          this.resetAttachedImage()
          this.commentToReply = {}
        })
      } else {
        alert("Geolocation is not supported by this browser.")
      }
    },
    async gettingMoreReplies(commentID) {
      await this.fetchingMoreReplies(commentID)
    },
    // focus reply section
    focusReplySection(comment) {
      this.commentToReply = comment
      this.$refs.commentField.focus()
      const el = this.$refs.replyingComment
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    },

    // remove focused reply section
    removeReplySection() {
      this.commentToReply = {}
      this.resetAttachedImage()
    },

    // view selected image
    displayAttachedImage(e) {
      this.attachedImage = e.target.files[0]
      this.attachedImageOverlay = URL.createObjectURL(this.attachedImage)
    },

    // reset selected image
    resetAttachedImage() {
      this.attachedImage = ''
      this.attachedImageOverlay = ''
    },
  },
}
</script>

<style scoped lang="scss">
.chat-section{
  width: auto;
  height: 100vh;
  border-radius: 20px;
  background: #f4f4f5;
  margin-top: 2rem;
  .comments-window{
    overflow-y: auto;
    height: 100%;
    & .main-comment:nth-last-child(2){
      margin-bottom: 5rem;
    }
  }
  .comment-section {
    position: absolute;
    bottom: 0;
    z-index: 1111;
    width: 100%;
    & .reply-comment{
      padding: 1rem;
      background: white;
      border-left: 7px solid #3425CD;
      .attached-image{
        background-size: cover;
        width: 80px;
        min-height: 100%;
      }
      .selected-comment{
        width: 100%;
      }
    }
    & .send-chat-section{
      display: flex;
      justify-content: center;
      align-items: center;
      background: white;
      padding: 1rem;
      & .image-attachment img{
        filter:  brightness(0%);
        cursor: pointer;
      }
      & .message-input{
        width: 100%;
        padding: 0 1rem;
        & input{
          width: 100%;
          padding: 7px;
          background: #e3e6ec;
          text-indent: 10px;
          outline: none !important;
          border-radius: 7px;
        }
      }
      & .send-btn{
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        & img{
          width: 2rem;
        }
      }
    }
  }
}
</style>
