<template>
    <div v-if="currentLog">
        {{ currentLog.timestamp }}
        <pre v-html="diff" />
    </div>
</template>

<script>
import { getDiff } from '~/lib/diff';

export default {

    computed: {
        currentLog() {
            return this.$store.getters['logs/currentLog'];
        },

        diff() {
            const previousLog = this.$store.getters['logs/previousLog'];

            return getDiff(this.currentLog, previousLog);
        },
    },
}
</script>
