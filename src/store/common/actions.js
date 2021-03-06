import axiosInstance from '../../helpers/axios';

export default {
  getUser({ getters }, payload) {
    return axiosInstance.get(`/users/${payload}`);
  },

  post({ getters }, payload) {
    return axiosInstance.post('/posts', payload);
  },

  getPosts({ getters }, payload) {
    return axiosInstance.post(`/users/${payload.userId}/posts`, {
      page: payload.page,
      skip: payload.skip,
    });
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
    return axiosInstance.delete(`/friend-requests/${payload.requestId}`);
  },

  rejectFriend({ getters }, payload) {
    return axiosInstance.delete(`/friend-requests/${payload.requestId}/reject`);
  },

  approveFriend({ getters }, payload) {
    return axiosInstance.post(`/friend-requests/${payload.requestId}/approve`);
  },

  removeFriend({ getters }, payload) {
    return axiosInstance.delete(`/friend-requests/${payload.requestId}/remove`);
  },

  like({ getters }, payload) {
    return axiosInstance.post(`/posts/${payload.postId}/likes`);
  },

  unlike({ getters }, payload) {
    return axiosInstance.delete(`/posts/${payload.postId}/likes`);
  },

  comment({ getters }, payload) {
    return axiosInstance.post(
      `/posts/${payload.postId}/comments`,
      payload.content
    );
  },

  commentLike({ getters }, payload) {
    return axiosInstance.post(`/comments/${payload.commentId}/likes`);
  },

  commentUnlike({ getters }, payload) {
    return axiosInstance.delete(`/comments/${payload.commentId}/likes`);
  },

  commentOnComment({ getters }, payload) {
    return axiosInstance.post(
      `/comments/${payload.commentId}/comments`,
      payload.content
    );
  },

  getCommentsOnComment({ getters }, payload) {
    return axiosInstance.post(`/comments/${payload.commentId}/comments/5`, {
      page: payload.page,
      skip: payload.skip,
    });
  },

  getComments({ getters }, payload) {
    return axiosInstance.post(`/posts/${payload.postId}/comments/5`, {
      page: payload.page,
      skip: payload.skip,
    });
  },

  getLastComment({ getters }, payload) {
    return axiosInstance.get(`/posts/${payload.postId}/comments/1`);
  },
};
