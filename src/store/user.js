import axios from 'axios';

const state = {
    todos: [],
};

const getters = {
    allTasks: state => state.todos,
};

const mutations = {

    setTaskData(state, tasks) {
        state.todos = tasks;
    },

    updateTaskStatus(state, data) {
        const index = Object.values(state.todos);
        for(let i = 0; i< index.length; i++)
        {
            if (index[i].id === data.id)
                index.splice(1,i,data)
        }
    }
};

const actions = {
    fetchTaskData({commit}) {
        axios
            .get(process.env.VUE_APP_API_URL + "tasks")
            .then(response => {
                commit("setTaskData", response.data);
            })
            .catch(() => {
                localStorage.clear();
            });
    },

    updateTaskStatus({ commit }, task) {
        axios
            .post(process.env.VUE_APP_API_URL + 'update/'+task.id,task)
            .then(response => {
                commit("updateTaskStatus", response.data);
            })
            .catch(() => {
                localStorage.clear();
             });
    },

};

export default {
    state,
    getters,
    actions,
    mutations
}