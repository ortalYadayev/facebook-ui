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
  },
});

export default store;
