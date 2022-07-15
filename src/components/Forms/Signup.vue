<template>
  <div class="login_box py-16">
    <h1 class="text-center text-4xl md:text-5xl font-black">Sign up</h1>

    <div>
      <div class="auth-form-fields" v-if="step === 1">

        <h1>Step One</h1>
        <!-- Name field -->
        <theme-input v-model="signupData.name" svg-name="user_append.svg" placeholder="Your Name" type="text" />
        <div class="errMsg" v-if="v$.signupData.name.$error">{{ v$.signupData.name.$errors[0].$message }}</div>

        <!-- email field -->
        <theme-input v-model="signupData.email" svg-name="mail_append.svg" placeholder="Your Email" type="email" />
        <div class="errMsg" v-if="v$.signupData.email.$error">{{ v$.signupData.email.$errors[0].$message }}</div>

        <!-- password field -->
        <theme-input v-model="signupData.password" svg-name="lock_append.svg" placeholder="Your Password" type="password" />
        <span class="errMsg" v-if="v$.signupData.password.$error">{{ v$.signupData.password.$errors[0].$message }}</span>
      </div>

      <div class="auth-form-fields" v-if="step === 2">
        <h1>Step Two</h1>
        <!-- Age field -->
        <theme-input v-model="dob" svg-name="calendar.svg" placeholder="Date of Birth" type="date" />
        <div class="errMsg" v-if="v$.dob.$error">{{ v$.dob.$errors[0].$message }}</div>
        <!-- Gender field -->
        <theme-select-option v-model="signupData.gender" :options="genderOptions" placeholder="Select Gender" />
        <div class="errMsg" v-if="v$.signupData.gender.$error">{{ v$.signupData.gender.$errors[0].$message }}</div>
        <!-- Phone No field -->
        <theme-input v-model="signupData.phone" svg-name="phone.svg" placeholder="Your Phone No" type="tel" />
        <div class="errMsg" v-if="v$.signupData.phone.$error">{{ v$.signupData.phone.$errors[0].$message }}</div>

        <!-- Image field -->
        <div class="resp-field">
          <button type="button" style="overflow: hidden;"  @click="$refs.imageInput.click()" class="w-36 h-36 image-upload-btn rounded-full border-2 border-black flex mx-auto">
            <img v-if="viewImage" :src="viewImage" class="uploaded-image" alt="user-img" />
            <img v-if="!viewImage" class="image-upload-svg" :src="`${publicPath}src/assets/imgs/icons/plus.svg`" alt="plus-svg"/>
            <input type="file" ref="imageInput" @input="displayPicture" style="display:none"/>
          </button>
        </div>
        <div class="errMsg text-center" v-if="v$.viewImage.$error">{{ v$.viewImage.$errors[0].$message }}</div>
      </div>

      <div class="auth-form-fields" v-if="step === 3">
        <h1>Step Three</h1>
        <!-- Country field -->
        <theme-input v-model="signupData.country" svg-name="country.svg" placeholder="Your Country" type="text" />
        <div class="errMsg" v-if="v$.signupData.country.$error">{{ v$.signupData.country.$errors[0].$message }}</div>

        <!-- City field -->
        <theme-input v-model="signupData.city" svg-name="city.svg" placeholder="Your City" type="text" />
        <div class="errMsg" v-if="v$.signupData.city.$error">{{ v$.signupData.city.$errors[0].$message }}</div>

        <!-- Address field -->
        <theme-input v-model="signupData.address" svg-name="location.svg" placeholder="Your Address" type="text" />
        <div class="errMsg" v-if="v$.signupData.address.$error">{{ v$.signupData.address.$errors[0].$message }}</div>

        <!-- Zip Code field -->
        <theme-input v-model="signupData.zipcode" svg-name="zip.svg" placeholder="Your Zip Code" type="text" />
        <div class="errMsg" v-if="v$.signupData.zipcode.$error">{{ v$.signupData.zipcode.$errors[0].$message }}</div>
      </div>

      <div class="auth-form-fields mt-5">
        <div class="flex justify-between w-5/6 md:w-2/3">
          <theme-button v-if="step !== 1" @click.prevent="step--">Back</theme-button>
          <theme-button :class="{'ml-auto': step === 1}" :loading="loading" @click.prevent="validateFields">{{ step === 3 ? 'Register' : 'Next' }}</theme-button>
        </div>
      </div>

      <div class="w-4/5 md:w-2/3 mt-8 text-center mx-auto">
        <router-link to="/auth/login" class="underline text-gray-500 text-1/2xl">
          Already Registered? Login here
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { genderOptions, signUpFormValidations, getAge } from "../componentData"
import useValidate  from '@vuelidate/core'

export default {
  data(){
    return{
      v$: useValidate(),
      publicPath: import.meta.env.BASE_URL,
      step: 1,
      signupData: {
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        city: '',
        zipcode: '',
        country: '',
        gender: '',
        image: '',
        location: {
          latitude: 0,
          longitude: 0,
        },
        imageIndex: [0],
      },
      viewImage: '',
      loading: false,
      genderOptions,
      getAge,
      dob: '',
    }
  },
  validations () {
    return signUpFormValidations
  },
  watch: {
    step(val) {
      if ([2, 3].includes(val)) this.v$.$reset()
      if (val === 3) {
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(this.getLocationCoordinates)
        else alert("Geolocation is not supported by this browser.")
      }
    },
  },
  methods:{
    validateFields() {
      this.v$.$validate()
      switch (this.step) {
        case 1:
          if (!this.v$.signupData.name.$invalid && !this.v$.signupData.email.$invalid) this.step++
          break;
        case 2:
          if (!this.v$.dob.$invalid && !this.v$.signupData.gender.$invalid && !this.v$.signupData.phone.$invalid && !this.v$.viewImage.$invalid) this.step++
          break;
        case 3:
          if (!this.v$.signupData.country.$invalid && !this.v$.signupData.city.$invalid && !this.v$.signupData.address.$invalid && !this.v$.signupData.zipcode.$invalid) this.registeringUser()
          break;
      }
    },
    ...mapActions('auth', ['registerUser']),
    getLocationCoordinates(position) {
      this.signupData.location.latitude = position.coords.latitude
      this.signupData.location.longitude = position.coords.longitude
    },
    displayPicture(e) {
      this.signupData.image = e.target.files[0]
      this.viewImage = URL.createObjectURL(this.signupData.image)
    },
    async registeringUser() {
      this.signupData.username = this.signupData.email
      this.signupData.age = getAge(this.dob)
      let form_data = new FormData()
      for ( let key in this.signupData ) {
        if (key === 'location'){
          for (let locationKey in this.signupData[key]) {
            form_data.append(`location[${locationKey}]`, this.signupData[key][locationKey]);
          }
        } else {
          form_data.append(key, this.signupData[key])
        }
      }
      this.loading = true
      await this.registerUser(form_data)
      this.loading = false
    },
  }
}
</script>

<style lang="scss" scoped>
.auth-form-fields h1 {
  font-weight: 900;
  font-size: 1.5rem;
  line-height: 2rem;
  margin-bottom: 1.5rem;
  @media (min-width: 768px) {
    font-size: 1.875rem;
    line-height: 2.25rem;
  }
}
.image-upload-btn{
  position: relative;
  & .image-upload-svg{
    opacity: 1;
    z-index: 111;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    filter: invert(9%) sepia(79%) saturate(4438%) hue-rotate(265deg) brightness(102%) contrast(118%);
  }
  & .uploaded-image{
    height: 100%;
    width: 100%;
    object-fit: cover;
    z-index: 1;
  }
}
</style>
