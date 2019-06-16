<template>
    <b-form-select v-model="selected" :options="files" class="selector" />
</template>

<script>
// eslint-disable-next-line
import { mapState } from 'vuex';
import moment from 'moment';

function formatLogFile(file) {
    const date = file.substring('state.'.length, file.length - '.log'.length);
    return moment(date).format('DD/MM/YYYY HH:MM');
}

export default {
    computed: {
        ...mapState('logFiles', {
            files({ files }) {
                return files.map(file => ({
                    value: file,
                    text: formatLogFile(file),
                }));
            },
        }),

        selected: {
            get() {
                return this.$store.state.logFiles.selected;
            },
            set(value) {
                this.$store.commit('logFiles/setSelected', value);
            },
        },
    },
};
</script>

<style scoped>
.selector {
    max-width: 300px;
}

</style>
