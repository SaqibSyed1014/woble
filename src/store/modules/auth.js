import AuthServices from "../../services/AuthServices";
import { router } from "../../router";

const getDefaultState = () =>  ({
    token: localStorage.getItem('token') || '',
    userData: JSON.parse(localStorage.getItem('userData')) || '',
})

const state = getDefaultState()

const actions = {
    registerUser({}, payload) {
        return AuthServices.register(payload)
            .then(() => router.push('/auth/login'))
            .catch((e) => console.log('err ', e))
    },
    login({ commit }, payload) {
        return AuthServices.login(payload)
            .then(({ data }) => {
                commit('setUser', data)
                router.push('/home')
            })
            .catch((e) => console.log('err ', e))
    },
    logout({ commit }) {
        commit('removeUser')
        router.push('/auth/login')
    },
    forgotPassword({}, payload) {
        return AuthServices.forgotPassword(payload)
            .then(() => router.push('/auth/login'))
            .catch((e) => console.log('err ', e))
    },
    getUserProfile({ commit }, payload) {
        return AuthServices.fetchUserProfile(payload)
            .then(({ data }) => {
                commit('setUser', data)
                commit('bubbles/setBubbles', data.data, { root: true })
            })
            .catch((e) => console.log('err ', e))
    },
    updateUserDetails({ commit }, payload) {
        return AuthServices.updateUserProfile(payload)
            .then(({ data }) => commit('setUser', data))
            .catch((e) => console.log('err ', e))
    },
    deleteUserImage({ commit }, payload) {
        return AuthServices.deleteProfileImage(payload)
            .then(({ data }) => commit('setUser', data))
            .catch((e) => console.log('err ', e))
    },
}

const mutations = {
    setUser(state, payload) {
        if (payload?.token) {
            state.token = payload.token
            localStorage.setItem('token', payload.token)
        }
        state.userData = payload.data
        console.log('user mut ', state.userData)
        localStorage.setItem('userData', JSON.stringify(payload.data))
    },
    removeUser(state) {
        state.token = ''
        state.userData = {}
        localStorage.clear()
    }
}

const getters = {
    isAuthenticated: state => !!state.token,
    getUserData: state => state.userData,
}

export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true,
}
