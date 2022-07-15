<template>
  <div>
    <div class="flex">
      <img class="back-nav" @click="$router.go(-1)" :src="`${publicPath}src/assets/imgs/SVG/next.svg`" alt="edit">
      <h3 class="font-black text-2xl ml-3">Settings</h3>
    </div>

    <!-- Privacy -->
    <div class="private-settings">
      <h4 class="text-gray-500 mt-5 mb-3">Privacy</h4>
      <div class="bg-gray-100 rounded-1xl">
        <div class="grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 switch-grid">
          <div class="toggle-switch">
            <label class="form-check-label">Show Location</label>
            <div class="form-check form-switch">
              <input v-model="settings.showLocation"
                     class="form-check-input bg-white bg-gray-300 focus:outline-none shadow-sm"
                     type="checkbox" role="switch">
            </div>
          </div>
          <div class="toggle-switch">
            <label class="form-check-label inline-block">Show Gender</label>
            <div class="form-check form-switch">
              <input v-model="settings.showGender"
                     class="form-check-input bg-white bg-gray-300 focus:outline-none shadow-sm"
                     type="checkbox" role="switch">
            </div>
          </div>
          <div class="toggle-switch">
            <label class="form-check-label inline-block">Let People Message Me</label>
            <div class="form-check form-switch">
              <input v-model="settings.enableChat"
                     class="form-check-input bg-white bg-gray-300 focus:outline-none shadow-sm"
                     type="checkbox" role="switch">
            </div>
          </div>
          <div class="toggle-switch">
            <label class="form-check-label inline-block">Show My Images To All</label>
            <div class="form-check form-switch">
              <input v-model="settings.showImages"
                     class="form-check-input bg-white bg-gray-300 focus:outline-none shadow-sm"
                     type="checkbox" role="switch">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Age Restriction -->
    <div class="age-settings">
      <h4 class="text-gray-500 mt-5 mb-3">Only Show my profile to ages</h4>
      <div class="grid grid-rows-3 grid-cols-1 md:grid-rows-1 md:grid-cols-3 items-center text-center">
        <theme-select-option :options="99" v-model="settings.showProfileTo.from" />
        <span>To</span>
        <theme-select-option :options="99" v-model="settings.showProfileTo.to" />
      </div>
    </div>

    <!-- Functions -->
    <div class="function-settings">
      <h4 class="text-gray-500 mt-5 mb-3">Functions</h4>
      <div class="bg-gray-100 rounded-1xl">
        <div class="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 switch-grid">
          <div class="toggle-switch">
            <label class="form-check-label inline-block">Receive Notifications</label>
            <div class="form-check form-switch">
              <input v-model="settings.allowNotifications"
                     class="form-check-input bg-white bg-gray-300 focus:outline-none shadow-sm"
                     type="checkbox" role="switch">
            </div>
          </div>
          <div class="toggle-switch">
            <label class="form-check-label inline-block">Receive Marketing Emails</label>
            <div class="form-check form-switch">
              <input v-model="settings.allowMarketingEmail"
                     class="form-check-input bg-white bg-gray-300 focus:outline-none shadow-sm"
                     type="checkbox" role="switch">
            </div>
          </div>
        </div>
      </div>
      </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { store } from "../../../store";

const props = defineProps({
  userData: {
    type: Object,
    required: true
  },
})

const publicPath = import.meta.env.BASE_URL
let settings = ref(props.userData.settings)

watch(settings, async(updatedSettings) => {
  await store.dispatch('auth/updateUserDetails', { settings: updatedSettings })
}, { deep: true })
</script>

<style scoped lang="scss">
.private-settings .switch-grid .toggle-switch,
.function-settings .switch-grid .toggle-switch{
  @media (max-width: 768px) {
    padding: .5rem;
  }
  padding: .5rem 2.5rem;
  display: flex;
  justify-content: space-between;
  & .form-check-label{
    display: inline-block;
  }
  & .form-switch .form-check-input{
    appearance: none;
    vertical-align: top;
    background-repeat: no-repeat;
    background-size: contain;
    border-radius: 9999px;
    cursor: pointer;
    width: 2.25rem;
    height: 1.25rem;
    margin-left: -2.5rem;
    float: left;
    &:checked{
      border-color: #3a028b;
      background-color: #3a028b;
    }
  }
}
</style>
