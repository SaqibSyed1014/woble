import WoblerServices from "../../services/WoblerServices";

const getDefaultState = () =>  ({
    woblers: [],
    savedWoblers: [],
    limit: 10,
    saveLimit: 5,
})

const state = getDefaultState()

const actions = {
    fetchAllWoblers({ commit, state }) {
        if (state.woblers?.length) state.limit += 10
        return WoblerServices.getWoblers(state.limit)
            .then(({ data }) => commit('setWoblers', data?.data?.docs))
            .catch((e) => console.log('err ', e))
    },
    fetchSavedWoblers({ commit, state }) {
        if (state.savedWoblers?.length) state.saveLimit += 5
        return WoblerServices.getSavedWoblers(state.saveLimit)
            .then(({ data }) => commit('setSavedWoblers', data?.data))
            .catch((e) => console.log('err ', e))
    },
    dislikingWobler({}, payload) {
        return WoblerServices.disLikeWobler(payload)
            .then()
            .catch((e) => console.log('err ', e))
    },
    savingWobler({ commit }, payload) {
        return WoblerServices.saveWobler(payload)
            .then()
            .catch((e) => console.log('err ', e))
    },
    removingSavedWobler({}, payload) {
        return WoblerServices.removeSavedWobler(payload)
            .then()
            .catch((e) => console.log('err ', e))
    },
    likingWobler({}, payload) {
        return WoblerServices.likeWobler(payload)
            .then()
            .catch((e) => console.log('err ', e))
    },
    reportingWobler({ dispatch }, payload) {
        return WoblerServices.reportWobler(payload)
            .then(() => dispatch('fetchAllWoblers'))
            .catch((e) => console.log('err ', e))
    },
}

const mutations = {
    setWoblers(state, payload) {
        state.woblers = payload
    },
    setSavedWoblers(state, payload) {
        payload[payload.length - 1].moreWoblers = state.savedWoblers.length !== payload.length;
        state.savedWoblers = payload
    },
}

const getters = {
    getWoblers: state => state.woblers,
    getSavedWoblers: state => state.savedWoblers
}

export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true,
}
