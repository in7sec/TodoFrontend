import axios from 'axios';

const state = {
    user: [],
};

const getters = {
    user: state => state.user,
};

const mutations = {
    setUserData(state, user) {
        state.user = user;
    },
};

const actions = {

    fetchUserData({commit}) {
        axios
            .get(process.env.VUE_APP_API_URL + "user")
            .then(response => {
                commit("setUserData", response.data);
              localStorage.setItem("user",JSON.stringify(response.data));
            })
            .catch(() => {
                localStorage.clear();
            });
    },

    sendLoginRequest({ commit }, data) {
        commit("setErrors", {}, { root: true });
        return axios
            .post(process.env.VUE_APP_API_URL + "login", data)
            .then(response => {
                commit("setUserData", JSON.stringify(response.data.token));
                localStorage.setItem("token", JSON.stringify(response.data.token));
                axios.defaults.headers.common['Authorization'] = "Bearer " + response.data.token;
            })
            .catch(function (error) {
              commit("setErrors", error.response.data.errors);
            });
    },

    sendRegisterRequest({ commit }, data) {
        commit("setErrors", {}, { root: true });
        return axios
            .post(process.env.VUE_APP_API_URL + "register", data)
            .then(response => {
                commit("setUserData", JSON.stringify(response.data.token));
                localStorage.setItem("token", JSON.stringify(response.data.token));
                axios.defaults.headers.common['Authorization'] = "Bearer " + response.data.token;
            })
            .catch(function (error) {
                commit("setErrors", error.response.data.errors);
            });
    },

    sendLogoutRequest({ commit }) {
        axios.post(process.env.VUE_APP_API_URL + "logout").then(() => {
            commit("setUserData", []);
            localStorage.clear();
            delete axios.defaults.headers.common['Authorization'];
        })
            .catch(() => {
                localStorage.clear();
                delete axios.defaults.headers.common['Authorization'];
        });
    },

};

export default {
    state,
    getters,
    actions,
    mutations
}