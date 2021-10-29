import { createStore } from 'vuex';
import axiosInstance from '../helpers/axios';
const store = createStore({
  state: {
    token: localStorage.getItem('token') ?? null,
    user: {},
  },

  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
  },

  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },

    removeToken(state) {
      state.token = null;
      localStorage.removeItem('token');
    },

    setUser(state, user) {
      state.user = user;
    },

    removeUser(state) {
      state.user = {};
    },
  },

  actions: {
    register({ getters }, payload) {
      if (getters.isLoggedIn) {
        return;
      }

      return axiosInstance.post('/register', payload);
    },

    async login({ getters, commit }, payload) {
      if (getters.isLoggedIn) {
        return;
      }

      const request = await axiosInstance.post('/login', payload);

      commit('setToken', request.data.token);
      commit('setUser', request.data.user);
    },

    async getAuthUser({ getters, commit }) {
      if (!getters.isLoggedIn) {
        return;
      }

      try {
        const request = await axiosInstance.post('/me');

        commit('setUser', request.data);
      } catch (error) {
        commit('removeToken');
      }
    },

    getUser({ getters }, payload) {
      return axiosInstance.get(`/users/${payload}`);
    },

    post({ getters }, payload) {
      return axiosInstance.post(`/posts`, payload);
    },

    search({ getters }, payload) {
      return axiosInstance.get(`/users/search?searchQuery=${payload}`);
    },

    friend({ getters }, payload) {
      return axiosInstance.get(`/users/friend`);
    },
  },
});

export default store;
