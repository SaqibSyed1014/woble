import {createRouter, createWebHistory} from 'vue-router'
import {store} from "../store";

const routes = [
    {
        path: '/', name: "WobleHome", component: () => import('../components/Views/Woble Site/Home.vue')
    },
    {
        path: '/', name: 'Auth', redirect: '/auth/login', component: () => import('../components/Layout/AuthLayout.vue'),
        children: [
            {
                path: '/auth/login', name: "Login", component: () => import('../components/Forms/Login.vue')
            },
            {
                path: '/auth/register', name: "Register", component: () => import('../components/Forms/Signup.vue')
            },
            {
                path: '/forgot-password', name: "ForgotPassword", component: () => import('../components/Forms/ForgotPassword.vue')
            },
        ],
    },
    {
        path: '/home', name: "UserHome", redirect: '/choose-bubble', component: () => import('../components/Layout/HomeLayout.vue'),
        children: [
            {
                path: '/choose-bubble', name: "ChooseBubble", component: () => import('../components/Views/Choose Bubble/ChooseBubble.vue'),
            },
            {
                path: '/all-bubbles', name: "AllBubbles", component: () => import('../components/Views/View All Bubbles/AllBubbles.vue'),
            },
            {
                path: '/view-bubble/:name', name: "ViewBubble", component: () => import('../components/Views/View Bubble/ViewBubble.vue'),
            },
            {
                path: '/all-woblers', name: "AllWoblers", component: () => import('../components/Views/All Woblers/AllWoblers.vue'),
            },
            {
                path: '/saved-woblers', name: "SavedWoblers", component: () => import('../components/Views/Saved Woblers/SavedWoblers.vue'),
            },
            {
                path: '/profile', name: "UserProfile", component: () => import('../components/Views/Profile/UserProfile.vue'),
            },
            {
                path: '/FAQs', name: "FAQs", component: () => import('../components/Views/Support/ViewFAQs.vue'),
            },
            {
                path: '/share', name: "Share", component: () => import('../components/Views/Share/SocialShare.vue'),
            },
            {
                path: '/settings', name: "UserSettings", component: () => import('../components/Views/Settings/UserSettings.vue'),
            },
        ],
    },
    {
        path: '/home/terms', name: "Terms", component: () => import('../components/Views/Woble Site/Terms.vue')
    },
    {
        path: '/privacy-policy', name: "PrivacyPolicy", component: () => import('../components/Views/Woble Site/PrivacyPolicy.vue')
    },
    {
        path: '/admin/login', name: "AdminLogin", component: () => import('../components/admin/AdminLogin.vue')
    },
    {
        path: '/:pathMatch(.*)', name: 'error-404', component: () => import('../components/PageNotFound.vue'),
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

const unProtectedRoutes = ['WobleHome', 'Login', 'Register', 'ForgotPassword', 'Terms', 'PrivacyPolicy', 'AdminLogin', 'error-404']

router.beforeEach((to, from, next) => {
    if (!store.getters["auth/isAuthenticated"]) {
        if (unProtectedRoutes.includes(to.name)) {
            next()
            return
        } else {
            next({ name: 'Login' })
            return
        }
    }
    if (store.getters["auth/isAuthenticated"]) {
        if (!unProtectedRoutes.includes(to.name)) {
            next()
            return
        } else {
            next({ name: 'UserHome' })
            return
        }
    }
})
