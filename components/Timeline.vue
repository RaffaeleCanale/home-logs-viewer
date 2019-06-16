<template>
    <timeline
        :items="items"
        :groups="groups"
        :options="$options.VIS_OPTIONS"
        @select="onSelect"
        class="timeline"
    />
</template>

<script>
import { Timeline } from 'vue2vis';
import { getDiff } from '~/lib/diff';

export default {

    VIS_OPTIONS: {
        stack: false,
        orientation: {
            axis: 'top',
            item: 'top',
        },
        minHeight: '100%',
        // verticalScroll: false,
        // horizontalScroll: true,
        // zoomCtrl: true,
        // zoomable: true,
        zoomKey: 'ctrlKey',
        zoomMax: 500000000, // just one year
        // zoomMax: 315360000000000, // 10,000 years is maximum possible
        zoomMin: 10, // 10ms
    },

    components: {
        Timeline,
    },

    computed: {
        groups() {
            return this.$store.state.logs.selectedComponents.map(component => ({
                id: component,
                name: component,
            }));
        },

        items() {
            if (!process.client) {
                return [];
            }

            return this.$store.getters['logs/selectedLogs'].map((data, index, arr) => {
                const { component, timestamp, reason } = data;
                const reasonText = reason || 'Update';
                const diff = getDiff(data, arr[index - 1], true);
                return {
                    id: index,
                    content: reasonText,
                    start: new Date(timestamp),
                    // type: 'point',
                    group: component,
                    subgroup: reasonText,
                    title: `<pre>${diff}</pre>`,
                };
            });
        },
    },

    methods: {
        onSelect({ items }) {
            this.$store.commit('logs/setSelectedLog', items[0]);
        },
    },

};
</script>

<style scoped>
.timeline {
    height: 100%;
}
</style>
