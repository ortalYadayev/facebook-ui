import axiosInstance from "../../helpers/axios";

export default {
    getUser({ getters }, payload) {
        return axiosInstance.get(`/users/${payload}`);
    },

    post({ getters }, payload) {
        return axiosInstance.post(`/posts`, payload);
    },

    search({ getters }, payload) {
        return axiosInstance.get('/users/search', {
            params: { searchQuery: payload },
        });
    },
}