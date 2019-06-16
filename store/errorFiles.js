// eslint-disable-next-line
import Vue from 'vue';

export default {
    state() {
        return {
            isLoading: false,
            files: [],
            selected: null,
        };
    },

    getters: {
    },

    mutations: {
        setSelected(state, selected) {
            state.selected = selected;
        },

        setFiles(state, files) {
            state.files = files.sort().reverse();
        },

        setIsLoading(state, isLoading) {
            state.isLoading = isLoading;
        },
    },

    actions: {
        async initialize({ dispatch, commit, state }) {
            if (!process.client) {
                await dispatch('fetch');
                commit('setSelected', state.files[0]);
            }
        },

        async fetch({ dispatch, commit }) {
            commit('setIsLoading', true);
            try {
                const { data } = await this.$apiRequest.get('/logs/errors');
                commit('setFiles', data.errors);
            } catch (error) {
                dispatch('setError', error, { root: true });
            } finally {
                commit('setIsLoading', false);
            }
        },
    },
};
