import axiosInstance from '../../helpers/axios';

export default {
  getUser({ getters }, payload) {
    return axiosInstance.get(`/users/${payload}`);
  },

  post({ getters }, payload) {
    return axiosInstance.post(`/posts`, payload);
  },

  search({ getters }, payload) {
    return axiosInstance.get(`/users/search`, {
      params: { searchQuery: payload },
    });
  },

  friendRequest({ getters }, payload) {
    return axiosInstance.post(`/users/${payload.id}/friend-requests`);
  },

  deleteFriend({ getters }, payload) {
    return axiosInstance.delete(`/friend-requests/${payload.idRequest}`);
  },

  rejectFriend({ getters }, payload) {
    return axiosInstance.delete(`/friend-requests/${payload.idRequest}/reject`);
  },

  approveFriend({ getters }, payload) {
    return axiosInstance.post(`/friend-requests/${payload.idRequest}/approve`);
  },

  removeFriend({ getters }, payload) {
    return axiosInstance.delete(`/friend-requests/${payload.idRequest}/remove`);
  },
};
