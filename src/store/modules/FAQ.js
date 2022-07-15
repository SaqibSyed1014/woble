import FAQServices from "../../services/FAQServices";

const getDefaultState = () =>  ({
    FAQs: {},
    limit: 5
})

const state = getDefaultState()

const actions = {
    fetchFAQs({ commit, state }) {
        if (state.FAQs?.docs?.length) state.limit +=5
        return FAQServices.getFAQs(state.limit)
            .then(({ data }) => commit('setFAQs', data?.data))
            .catch((err) => console.log('e ', err))
    },
}

const mutations = {
    setFAQs(state, payload) {
        state.FAQs = payload
    },
}

const getters = {
    getAllFAQs (state) {
        return state.FAQs?.docs
    },
}

export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true,
}
