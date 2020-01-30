// eslint-disable-next-line
import axios from 'axios';
import ProtocolSocket from '~/lib/ProtocolSocket';

async function initializeCommon(dispatch, homeApi) {
    this.$apiRequest = axios.create({
        baseURL: homeApi,
        timeout: 5000,
    });

    await dispatch('logFiles/initialize');
    await dispatch('logs/initialize');
    await dispatch('errorFiles/initialize');
    await dispatch('errors/initialize');
    await dispatch('home/initialize');
}

async function initSocket(commit) {
    this.$apiSocket = new ProtocolSocket({
        host: process.env.HOME_API_WS,
    });
    this.$apiSocket.setHandler({
        onMessage(message) {
            const { type, target, newState, reason } = message;
            if (type === 'state_update') {
                commit('logs/appendLog', {
                    state: {
                        [target]: newState,
                    },
                    reason,
                    timestamp: new Date().toISOString(),
                });
                commit('home/handleEvent', message);
            }
        },
    });
    await this.$apiSocket.connect('HomeLogsViewer');
    await new Promise(resolve => setTimeout(resolve, 2000));
    await this.$apiSocket.sendRequest({
        type: 'subscribe_request',
        target: '',
    });
}

export default {
    state() {
        return {
            error: null,
        };
    },

    mutations: {
        setError(state, error) {
            console.error(error);
            state.error = error;
        },

        clear(state) {
            state.error = null;
        },
    },

    actions: {
        async nuxtServerInit({ dispatch }) {
            try {
                await initializeCommon.apply(this, [dispatch, process.env.HOME_API_SERVER]);
            } catch (error) {
                console.error(error);
                throw new Error('Failed to init server');
            }
        },

        async initialize({ dispatch, commit }) {
            try {
                await initializeCommon.apply(this, [dispatch, process.env.HOME_API]);
                await initSocket.apply(this, [commit]);
            } catch (error) {
                console.error(error);
                throw new Error('Failed to init');
            }
        },

        setError({ commit }, error) {
            commit('setError', error);
        },
    },
};
