<script>
import {mapActions} from "vuex";
export default {
  data(){
    return{
      publicPath: import.meta.env.BASE_URL,
      email: '',
      loading: false,
    }
  },
  methods: {
    ...mapActions('auth', ['forgotPassword']),
    sendMail() {
      this.loading = true
      this.forgotPassword({ email: this.email })
      this.loading = false
    }
  },
}
</script>

<template>
  <div class="login_box py-16">
    <h1 class="text-center text-4xl md:text-5xl font-black">Forgot Password</h1>

    <div class="auth-form-fields">
      <theme-input v-model="email" svg-name="mail_append.svg" placeholder="Your Email" type="email"/>
    </div>

    <div class="w-5/6 md:w-2/3 mx-auto mt-8">
      <theme-button block @click="sendMail">Submit</theme-button>
    </div>

    <div class="w-4/5 md:w-2/3 mx-auto mt-8 text-center">
      <router-link to="/auth/login" class="underline text-gray-500 text-1/2xl">Log in here</router-link>
    </div>
  </div>
</template>
