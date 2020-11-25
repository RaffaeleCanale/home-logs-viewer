// eslint-disable-next-line
import axios from 'axios';
import ReconnectWebSocket from '@canale/websocket/lib/ReconnectWebSocket';
import ProtocolSocket from '@canale/websocket/lib/protocol/ProtocolSocket';
import { DEV_OPTIONS } from '@canale/websocket/lib/WebSocketWrapper';

DEV_OPTIONS.logger = (a, b) => console.log(a, JSON.stringify(b, null, 4));

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
    class SocketHandler {
        // eslint-disable-next-line class-methods-use-this
        onMessage(message) {
            const { target, value } = message;
            commit('logs/appendLog', {
                state: {
                    [target]: value,
                },
                timestamp: new Date().toISOString(),
            });
            commit('home/handleEvent', message);
        }

        // eslint-disable-next-line class-methods-use-this
        onError(error) {
            console.error(error);
        }
    }
    const socket = new ReconnectWebSocket(
        process.env.HOME_API_WS,
        WebSocket,
    )
    this.$apiSocket = new ProtocolSocket(
        socket,
        new SocketHandler(),
    );
    await socket.connect();
    await new Promise(resolve => setTimeout(resolve, 2000));
    await this.$apiSocket.sendRequest('state', {
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
