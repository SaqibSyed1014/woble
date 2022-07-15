import HTTP from "./AxiosConfig";

export default {
    register(payload) {
        return HTTP.post('/api/register', payload)
    },
    login(payload) {
        return HTTP.post('/api/login', payload)
    },
    forgotPassword(payload) {
        return HTTP.post('/api/forgot-password', payload)
    },
    fetchUserProfile(userID) {
        return HTTP.get(`api/get-user-profile?id=${userID}`)
    },
    updateUserProfile(payload) {
        return HTTP.post('api/update-profile', payload)
    },
    deleteProfileImage(payload) {
        return HTTP.post('api/remove-user-image', payload)
    },
}
