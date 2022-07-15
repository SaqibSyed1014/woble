<template>
  <div class="user-profile">
    <div class="flex">
      <img class="back-nav" @click="$router.go(-1)" :src="`${publicPath}src/assets/imgs/SVG/next.svg`" alt="edit">
      <h3 class="font-black text-2xl ml-3">Edit my profile</h3>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 md:grid-rows-1 mt-5">
      <!-- User Profile Pictures-->
      <div class="profile-images-wrapper">
        <div class="image-wrapper zoom-in" :class="{'profile-image-wrapper': index === 0}" v-for="(image, index) in userData.imageGallery" :key="image._id">
          <div v-if="image.image" class="cross-icon" @click="deleteProfilePic(index)">
            <img :src="`${publicPath}src/assets/imgs/SVG/cross.svg`" alt="cross"/>
          </div>
          <span class="image-container" :class="[ index === 0 ? 'w-32 h-32 sm:w-44 sm:h-44' : 'w-16 h-16 sm:w-24 sm:h-24']">
            <!-- Loaders -->
            <svg v-if="imageLoaders[index]" class="image-loader animate-spin" :class="[ index === 0 ? 'profile-loader' : 'other-loader' ]" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"/>
              <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#fff"/>
            </svg>

            <!-- Images -->
            <img
                v-else :src="image.image ? image.image : `${publicPath}src/assets/imgs/SVG/user.svg`"
                :class="[ image.image ? 'user-image' : 'user-icon' ]"
                @click="$refs[`imageInput_${index}`].click()"
                :alt="index === 0 ? 'profile image' : 'other-image'">
          </span>
          <input type="file" :ref="`imageInput_${index}`" @input="displayPicture($event, index)" style="display:none"/>
        </div>
      </div>

      <!-- User Data -->
      <div class="profile-data-wrapper">
        <theme-input v-model="userData.name" svg-name="user.svg" />
        <theme-input v-model="userData.birthDate" type="date" svg-name="calendar.svg" />
        <theme-select-option v-model="userData.gender" :options="genderOptions" />
        <theme-input v-model="userData.email" svg-name="mail_append.svg" />
        <theme-input v-model="userData.country" svg-name="location.svg" />
        <theme-text-area v-model="userData.about" placeholder="About Yourself" />
        <theme-button class="mt-5" :loading="loading" block @click="updatingUserDetails">Save</theme-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getAge, genderOptions } from "../../componentData";
import { ref } from "vue";
import { store } from "../../../store";

const props = defineProps({
  userData: {
    type: Object,
    required: true
  }
})

const publicPath = import.meta.env.BASE_URL

let imageLoaders = ref([false, false, false, false, false])
const displayPicture = async(e, index) => {
  const image = e.target.files[0]
  let formData = new FormData()
  formData.append('imageIndex[]', [index])
  formData.append('image', image)
  imageLoaders.value[index] = true
  await store.dispatch('auth/updateUserDetails', formData)
  imageLoaders.value[index] = false
}

let loading = ref(false)
const updatingUserDetails = async() => {
  let formData = new FormData()
  formData.append('name', props.userData.name)
  formData.append('birthDate', props.userData?.birthDate)
  formData.append('age', getAge(props.userData?.birthDate))
  formData.append('gender', props.userData.gender)
  formData.append('email', props.userData.email)
  formData.append('country', props.userData.country)
  formData.append('about', props.userData.about)
  loading.value = true
  await store.dispatch('auth/updateUserDetails', formData)
  loading.value = false
}

const deleteProfilePic = async(imageIndex) => {
  imageLoaders.value[imageIndex] = true
  await store.dispatch('auth/deleteUserImage', { imageIndex: imageIndex })
  imageLoaders.value[imageIndex] = false
}
</script>

<style scoped lang="scss">
.profile-images-wrapper {
  position: relative;
  height: 400px;
  width: 100%;
  padding: 2rem;
  @media (min-width: 768px) {
    height: 100vh;
  }
  & .image-wrapper{
    border-radius: 9999px;
    position: absolute;
    background-image: linear-gradient(to right, #8952D4 0%, #EA02D4 100%);
    padding: .8rem;
    z-index: 11;
    animation: zoom-in 1s ease;
    & .cross-icon{
      position: absolute;
      top: 0;
      left: 10px;
      z-index: 11111;
      cursor: pointer;
      background: red;
      height: 25px;
      width: 25px;
      border-radius: 50%;
      transition: transform .2s ease-out;
      img {
        filter: brightness(0) invert(1);
      }
      &:hover{
        transform: scale(1.2);
      }
    }
    & .image-container{
      border-radius: 9999px;
      box-shadow: 0 0 0 10px white;
      cursor: pointer;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      & .other-loader{
        width: 2rem;
        @media (min-width: 640px) {
          width: 3rem;
        }
      }
    }
    .image-loader{
      display: block;
      margin: 0 auto;
      color: transparent;
    }
    & .user-image{
      background-size: cover;
    }
    & .user-icon{
      padding: 1rem;
      width: 4rem;
      @media (min-width: 640px) {
        width: 5rem;
      }
    }
  }
  & .profile-image-wrapper{
    & .cross-icon{
      left: 20px;
      width: 35px;
      height: 35px;
    }
    .profile-loader{
      width: 4rem;
      @media (min-width: 640px) {
        width: 6rem;
      }
    }
    & .user-icon{
      width: 7rem;
      @media (min-width: 640px) {
        width: 8rem;
      }
    }
  }
  & div:nth-child(2) {
    top: 1rem;
    left: 14.5rem;
  }
  & div:nth-child(3) {
    top: 9rem;
    left: 14.5rem;
  }
  & div:nth-child(4) {
    top: 14.5rem;
    left: 9rem;
  }
  & div:nth-child(5) {
    top: 14.5rem;
    left: 1rem;
  }
  @media (min-width: 640px) {
    & div:nth-child(2) {
      top: 1rem;
      left: 17.5rem;
    }
    & div:nth-child(3) {
      top: 11rem;
      left: 17.5rem;
    }
    & div:nth-child(4) {
      top: 17.5rem;
      left: 11rem;
    }
    & div:nth-child(5) {
      top: 17.5rem;
      left: 1rem;
    }
    & div:nth-child(6) {
      background: red;
    }
  }
}
.profile-data-wrapper :deep(.resp-field){
  width: 100%;
  margin-top: 1.25rem;
}
</style>
