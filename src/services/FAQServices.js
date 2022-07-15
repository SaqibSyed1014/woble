import HTTP from "./AxiosConfig";

export default {
    getFAQs(limit) {
        return HTTP.get(`api/faqs/list-all?page=1&limit=${limit}`)
    },
}
