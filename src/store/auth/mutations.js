export default {
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
}