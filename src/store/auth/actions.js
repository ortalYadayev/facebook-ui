import axiosInstance from '../../helpers/axios';

export default {
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

  async logout({ getters, commit }, payload) {
    if (!getters.isLoggedIn) {
      return;
    }

    commit('removeToken');
    commit('removeUser');
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
};
