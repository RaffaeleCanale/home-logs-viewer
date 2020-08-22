import set from 'lodash/set';
import get from 'lodash/get';

import cloneDeep from 'lodash/cloneDeep';
import isNumber from 'lodash/isNumber';
import isFunction from 'lodash/isFunction';

export function stateProperty(path) {
    return {
        get() {
            let realPath = path;
            if (isFunction(path)) {
                realPath = path.call(this);
            }
            return get(this.$store.state.home.state[this.name], realPath);
        },
        set(value) {
            let realPath = path;
            if (isFunction(path)) {
                realPath = path.call(this);
            }
            const oldValue = get(this.$store.state.home.state[this.name], realPath);
            if (isNumber(oldValue)) {
                value = Number(value);
            }
            this.$store.dispatch('home/update', {
                component: this.name,
                path: realPath,
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
            const { target, value } = event;
            state.state[target] = value;
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
            console.log(component);
            // console.log(JSON.stringify(state.state, null, 4));
            set(copy, path, value);

            console.log(copy);
            const { data } = await this.$apiRequest.post('/state', {
                path: component,
                value: copy,
            });
            console.log(data);
            // commit('handleEvent', {
            //     target: component,
            //     newState: data.state,
            // });
        }
    },
};
