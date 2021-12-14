import axios from 'axios';

const state = {
    users: [],
    todos: [],
};

const getters = {
    allUsers: state => state.users,
    userTodos: state => state.todos
};

const mutations = {
    setUsersData(state, users) {
        state.users = users;
    },
    setUsersTodos(state, todos) {
        state.todos = todos
    },
    deleteUsersData(state, id){
        const index = state.users.findIndex(users => users.id == id.id)
        state.users.splice(index, 1)
    },
    addUsersData(state, user) {
        state.users.push(user)
    },
};

const actions = {
    fetchAdminData({commit}) {
        axios
            .get(process.env.VUE_APP_API_URL + "admin/users")
            .then(response => {
                commit("setUsersData", response.data);
            })
            .catch(() => {
                localStorage.clear();
            });
    },
    postRegisterRequest({ commit }, data) {
        commit("setErrors", {}, { root: true });
        return axios
            .put(process.env.VUE_APP_API_URL + "admin/store", data)
            .then(response => {
                commit("addUsersData", response.data);
            })
            .catch(function (error) {
                commit("setErrors", error.response.data.errors);
            });
    },

    deleteUser({commit}, data) {
        return axios
            .delete(process.env.VUE_APP_API_URL + "admin/delete/"+data.id)
            .then(() => {
            commit("deleteUsersData", data);
        })
    },

    editUserData({commit}, data) {
        commit("setErrors", {}, { root: true });
        return axios
            .post(process.env.VUE_APP_API_URL + "admin/update/"+data.id, data)
            .catch(function (error) {
                commit("setErrors", error.response.data.errors);
            });
    },

    fetchUserTodo({commit}, data) {
        return axios
            .get(process.env.VUE_APP_API_URL + "admin/user/"+data)
            .then(response => {
                commit("setUsersTodos", response.data);
            })
            .catch(() => {
                localStorage.clear();
            });
    },

    postTodo({commit}, data) {
        commit("setErrors", {}, { root: true });
        return axios
            .post(process.env.VUE_APP_API_URL + "admin/create/"+data.id, data)
            .catch(function (error) {
                commit("setErrors", error.response.data.errors);
            });
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}