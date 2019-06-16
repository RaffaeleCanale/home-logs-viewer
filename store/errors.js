// eslint-disable-next-line
import Vue from 'vue';
import moment from 'moment';

function getComponentOf(state) {
    return Object.keys(state)[0];
}

export default {
    state() {
        return {
            isLoading: false,

            errors: '',
        };
    },

    mutations: {
        setErrors(state, errors) {
            state.errors = errors;
        },

        setIsLoading(state, isLoading) {
            state.isLoading = isLoading;
        },
    },

    actions: {
        async initialize({ dispatch, rootState }) {
            if (process.client) {
                this.watch(state => state.errorFiles.selected, (val) => {
                    dispatch('fetch', val);
                });
            } else {
                await dispatch('fetch', rootState.errorFiles.selected);
            }
        },

        async fetch({ dispatch, commit }, errorFile) {
            commit('setIsLoading', true);
            try {
                const { data } = await this.$apiRequest.get(`logs/errors/${errorFile}`);
                commit('setErrors', data);
            } catch (error) {
                dispatch('setError', error, { root: true });
            } finally {
                commit('setIsLoading', false);
            }
        },
    },
};
