<script>
import { mapActions } from "vuex"
import useValidate  from '@vuelidate/core'
import { loginFormValidations } from "../componentData"

export default {
  data(){
    return{
      v$: useValidate(),
      loginData: {
        username: '',
        password: ''
      },
      loading: false,
    }
  },
  validations () {
    return loginFormValidations
  },
  methods: {
    ...mapActions('auth', ['login']),
    async loggingIn() {
      this.v$.$validate()
      if (!this.v$.loginData.username.$invalid && !this.v$.loginData.password.$invalid) {
        this.loading = true
        await this.login(this.loginData)
        this.loading = false
      }
    },
  },
}
</script>

<template>
  <div class="login_box py-16">
    <h1 class="text-center text-4xl md:text-5xl font-black">Welcome to Woble</h1>

    <div class="auth-form-fields">
      <!-- email field -->
      <theme-input v-model="loginData.username" svg-name="mail_append.svg" placeholder="Your Email" type="email" />
      <div class="errMsg" v-if="v$.loginData.username.$error">{{ v$.loginData.username.$errors[0].$message }}</div>
      <!-- password field -->
      <theme-input @keyup.enter="loggingIn" v-model="loginData.password" svg-name="lock_append.svg" placeholder="Your Password" type="password" />
      <div class="errMsg" v-if="v$.loginData.password.$error">{{ v$.loginData.password.$errors[0].$message }}</div>
    </div>

    <div class="w-5/6 md:w-2/3 mx-auto mt-8">
      <theme-button block :loading="loading" @click="loggingIn">Login</theme-button>
    </div>

    <div class="w-4/5 md:w-2/3 mx-auto mt-8 text-center">
      <router-link to="/auth/register" class="underline text-gray-500 text-1/2xl">New user? Sign up here</router-link>
    </div>
    <div class="w-4/5 md:w-2/3 mx-auto mt-6 text-center">
      <router-link to="/forgot-password" class="hover:underline text-gray-500 text-1/2xl">Forgot Password?</router-link>
    </div>
  </div>
</template>
