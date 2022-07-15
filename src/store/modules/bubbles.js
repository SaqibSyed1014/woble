import BubbleServices from "../../services/BubbleServices";
import {router} from "../../router";

const getDefaultState = () =>  ({
    userBubbles: [],
    specificBubble: {},
    allBubbles: [],
    page: 1,
    limit: 3,
    replyPage: 1,
    replyLimit: 3,
})

const state = getDefaultState()

const actions = {
    fetchSpecificBubble({ commit, state }, payload) {
        if (state.specificBubble?.comments?.length) state.limit+=3
        return BubbleServices.getSpecificBubble(payload, state.page, state.limit)
            .then(({ data }) => commit('setSpecificBubble', data?.data))
            .catch((err) => console.log('e ', err))
    },
    pickSpecificBubble({ commit }, payload) {
        return BubbleServices.pickBubble(payload)
            .then(({ data }) => commit('setBubbles', data?.data))
            .catch((err) => console.log('e ', err))
    },
    removingPickedBubble({ commit }, payload) {
        return BubbleServices.removePickedBubble(payload)
            .then(({ data }) => commit('setBubbles', data?.data))
            .catch((err) => console.log('e ', err))
    },
    fetchAllBubbles({ commit }) {
        return BubbleServices.getAllBubbles()
            .then(({ data }) => commit('setAllBubbles', data?.data))
            .catch((err) => console.log('e ', err))
    },
    addBubbles({ commit }, payload) {
        return BubbleServices.createBubble(payload)
            .then(({ data }) => commit('setBubbles', data?.data))
            .catch((err) => console.log('e ', err))
    },
    updateBubble({ dispatch }, payload) {
        return BubbleServices.updateSpecificBubble(payload)
            .then(() => dispatch('fetchSpecificBubble', payload.id))
            .catch((err) => console.log('e ', err))
    },
    deleteBubble({ dispatch }, payload) {
        return BubbleServices.deleteSpecificBubble(payload)
            .then(() => router.push('/choose-bubble'))
            .catch((err) => console.log('e ', err))
    },
    addCommentToBubble({ dispatch }, payload) {
        return BubbleServices.addComment(payload)
            .then(({ data }) => dispatch('fetchSpecificBubble', data?.data?._id))
            .catch((err) => console.log('e ', err))
    },
    addReplyToComment({ dispatch }, payload) {
        return BubbleServices.addReply(payload)
            .then(({ data }) => dispatch('fetchSpecificBubble', data?.data?._id))
            .catch((err) => console.log('e ', err))
    },
    fetchingMoreReplies({ commit }, payload) {
        state.replyLimit+=3
        return BubbleServices.getMoreReplies(payload, state.replyPage, state.replyLimit)
            .then(({ data }) => commit('setBubbleSpecificReplies', data?.data))
            .catch((err) => console.log('e ', err))
    },
    resetBubblesState({ commit }) {
        commit('setDefaultState')
    },
}

const mutations = {
    setBubbles(state, payload) {
        state.userBubbles = payload.bubbles
        localStorage.setItem('userData', JSON.stringify(payload))
    },
    setSpecificBubble(state, payload) {
        let receivedComments = payload.comments
        let savedComments = state.specificBubble.comments
        if (receivedComments?.length) {
            if (receivedComments?.length === savedComments?.length) savedComments[savedComments?.length - 1].moreComments = false
            else receivedComments[receivedComments?.length - 1].moreComments = true
        }
        state.specificBubble = payload
    },
    setBubbleSpecificReplies(state, payload) {
        state.specificBubble?.comments.forEach((comment, index) => {
            if (comment._id === payload._id) state.specificBubble.comments[index] = payload.comments
        })
    },
    setAllBubbles(state, payload) {
        state.allBubbles = payload
    },
    setDefaultState(state) {
        Object.assign(state, getDefaultState());
    },
}

const getters = {
    getUserBubbles (state) {
        return state.userBubbles
    },
    getAllBubbles (state) {
        return state.allBubbles
    },
    getSpecificBubble(state) {
        return state.specificBubble
    }
}

export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true,
}
