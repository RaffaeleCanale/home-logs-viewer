<template>
    <b-form-select v-model="selected" :options="files" class="selector" />
</template>

<script>
// eslint-disable-next-line
import { mapState } from 'vuex';
import moment from 'moment';

function formatLogFile(file) {
    const date = file.substring('errors.'.length, file.length - '.log'.length);
    return moment(date).format('DD/MM/YYYY HH:MM');
}

export default {
    computed: {
        ...mapState('errorFiles', {
            files({ files }) {
                return files.map(file => ({
                    value: file,
                    text: formatLogFile(file),
                }));
            },
        }),

        selected: {
            get() {
                return this.$store.state.errorFiles.selected;
            },
            set(value) {
                this.$store.commit('errorFiles/setSelected', value);
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
