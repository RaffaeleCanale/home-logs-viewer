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

            logs: [],
            components: [],

            selectedComponents: [],
            logIndex: 0,
            dateRange: {
                startDate: moment().subtract(3, 'hours'),
                endDate: moment().add(1, 'days'),
            },
        };
    },

    getters: {
        selectedLogs(state) {
            const components = state.selectedComponents;
            const cumulatedData = [];
            let fullState = {};
            const { startDate, endDate } = state.dateRange;

            state.logs.forEach(({ state, timestamp, reason }) => {
                const component = getComponentOf(state);
                if (!components.includes(component)) {
                    return;
                }

                const date = moment(timestamp);
                if (startDate && date.isBefore(startDate)) {
                    return;
                }
                if (endDate && date.isAfter(endDate)) {
                    return;
                }

                fullState = Object.assign({}, fullState, state);
                cumulatedData.push({
                    component,
                    state: fullState,
                    timestamp,
                    reason,
                });
            });

            return cumulatedData;
        },

        previousLog(state, getters) {
            return getters.selectedLogs[state.logIndex - 1];
        },

        currentLog(state, getters) {
            return getters.selectedLogs[state.logIndex];
        },
    },

    mutations: {
        setLogs(state, logs) {
            state.logs = logs;

            const newComponents = new Set();
            logs.forEach(({ state }) => {
                newComponents.add(getComponentOf(state));
            });
            state.components = Array.from(newComponents);
            state.selectedComponents = [state.components[0]];
        },

        setIsLoading(state, isLoading) {
            state.isLoading = isLoading;
        },

        setSelectedComponents(state, values) {
            state.selectedComponents = values;
        },

        setRange(state, { startDate, endDate }) {
            state.dateRange = {
                startDate: moment(startDate),
                endDate: moment(endDate),
            };
        },

        setSelectedLog(state, value) {
            state.logIndex = value;
        },

        appendLog(state, log) {
            state.logs.push(log);
        },
    },

    actions: {
        async initialize({ dispatch, rootState }) {
            if (process.client) {
                this.watch(state => state.logFiles.selected, (val) => {
                    dispatch('fetch', val);
                });
            } else {
                await dispatch('fetch', rootState.logFiles.selected);
            }
        },

        async fetch({ dispatch, commit }, logFile) {
            commit('setIsLoading', true);
            try {
                const { data } = await this.$apiRequest.get(`logs/state/${logFile}`);
                commit('setLogs', data);
            } catch (error) {
                dispatch('setError', error, { root: true });
            } finally {
                commit('setIsLoading', false);
            }
        },
    },
};
