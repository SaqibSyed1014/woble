import HTTP from "./AxiosConfig";

export default {
    getWoblers(limit) {
        return HTTP.post('api/users/get-all', { page: 1, limit: limit })
    },
    getSavedWoblers(limit) {
        return HTTP.get(`api/user/saved-users?page=1&limit=${limit}`)
    },
    disLikeWobler(payload) {
        return HTTP.post('api/user/dislike', payload)
    },
    saveWobler(payload) {
        return HTTP.post('api/user/save-wobler', payload)
    },
    removeSavedWobler(payload) {
        return HTTP.post('api/user/remove-save-wobler', payload)
    },
    likeWobler(payload) {
        return HTTP.post('api/user/like', payload)
    },
    reportWobler(payload) {
        return HTTP.post('api/report/wobler', payload)
    },
}
