import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
import { alteringCursor } from "../components/componentData";

const toaster = createToaster({ position: 'top-right'})

const restrictedRespMsgs = ['User Profile Fetched successfully..!', 'Bubbles Data..!', 'FAQ\'s List.', 'Saved Users.']

const HTTP = axios.create({
    baseURL: `https://wobleapi.weiswiseapps.com/`,
    headers: {
        'Content-Type': 'application/json',
    },
})

HTTP.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    alteringCursor('wait')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

HTTP.interceptors.response.use(
    (response) => {
        if (response?.data?.status === 200) {
            alteringCursor('default')
            if (!restrictedRespMsgs.includes(response?.data?.message))toaster.success(response?.data?.message);
            return response
        }
    },
    (error) => {
        alteringCursor('default')
        toaster.error(error?.message);
        return Promise.reject(error)
    },
)

export default HTTP

