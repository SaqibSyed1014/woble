import { createStore } from 'vuex'
import auth from './modules/auth'
import bubbles from './modules/bubbles'
import FAQ from "./modules/FAQ";
import woblers from "./modules/woblers"

export const store = createStore({
    modules: {
        auth,
        bubbles,
        FAQ,
        woblers
    },
})
