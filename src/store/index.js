import auth from './auth';
import user from './user';
import admin from './admin';
import { createStore } from 'vuex'

const store = createStore({
    state: {
        errors: []
    },

    getters: {
        errors: state => state.errors
    },

    mutations: {
        setErrors(state, errors) {
            state.errors = errors;
        }
    },

    actions: {},

    modules: {
        auth,
        user,
        admin
    }
})

export default store;