import { createApp } from 'vue'
import App from  './App.vue'
import './index.css'
import './assets/scss/style.scss'
import 'tw-elements'
import { router } from "./router"
import { store } from "./store"
import '/src/components/Global'
import { registerComponents } from "./components/Global";
import VueSocialSharing from 'vue-social-sharing'

const app = createApp(App)
    .use(router)
    .use(store)
    .use(VueSocialSharing)
registerComponents(app)

app.mount('#app')
