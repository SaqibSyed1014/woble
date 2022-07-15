import HTTP from "./AxiosConfig";

export default {
    createBubble(payload) {
        return HTTP.post('api/bubble/create', payload)
    },
    updateSpecificBubble(payload) {
        return HTTP.post('api/bubble/edit', payload)
    },
    deleteSpecificBubble(payload) {
        return HTTP.post('api/bubble/delete', payload)
    },
    getSpecificBubble(bubbleID, page, limit) {
        return HTTP.get(`api/bubble/get-bubble?id=${bubbleID}&page=${page}&limit=${limit}`)
    },
    pickBubble(payload) {
        return HTTP.post('api/bubble/pick', payload)
    },
    removePickedBubble(payload) {
        return HTTP.post('api/bubble/remove', payload)
    },
    getAllBubbles() {
        return HTTP.get('api/bubble/get')
    },
    addComment(payload) {
        return HTTP.post('api/bubble/add-comment', payload)
    },
    addReply(payload) {
        return HTTP.post('api/bubble/add-reply', payload)
    },
    getMoreReplies(commentID, page, limit) {
        return HTTP.get(`api/bubbles/get-replies?id=${commentID}&page=${page}&limit=${limit}`)
    },
}
