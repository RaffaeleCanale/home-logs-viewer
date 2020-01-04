import set from 'lodash/set';
import get from 'lodash/get';

import cloneDeep from 'lodash/cloneDeep';
import isNumber from 'lodash/isNumber';

export function stateProperty(path) {
    return {
        get() {
            const res = get(this.$store.state.home.state[this.name], path);
            return res;
        },
        set(value) {
            const oldValue = get(this.$store.state.home.state[this.name], path);
            if (isNumber(oldValue)) {
                value = Number(value);
            }
            this.$store.dispatch('home/update', {
                component: this.name,
                path,
                value,
            });
        },
    };
}

export default {
    state() {
        return {
            state: {},
            isLoading: false,
        };
    },

    getters: {
    },

    mutations: {
        setState(state, newState) {
            state.state = newState;
        },

        setIsLoading(state, isLoading) {
            state.isLoading = isLoading;
        },

        handleEvent(state, event) {
            const { target, newState } = event;
            state.state[target] = newState;
        },
    },

    actions: {
        async initialize({ dispatch }) {
            await dispatch('fetch');
        },

        async fetch({ dispatch, commit }) {
            commit('setIsLoading', true);
            try {
                const { data } = await this.$apiRequest.get('/state');
                commit('setState', data);
            } catch (error) {
                dispatch('setError', error, { root: true });
            } finally {
                commit('setIsLoading', false);
            }
        },

        async update({ commit, state }, { component, path, value }) {
            const copy = cloneDeep(state.state[component]);
            set(copy, path, value);

            const { data } = await this.$apiRequest.post('/state', {
                path: component,
                value: copy,
            });
            commit('handleEvent', {
                target: component,
                newState: data.state,
            });
        }
    },
};
