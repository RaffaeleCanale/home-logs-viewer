<template>
    <div class="page">
        <b-container class="top">
            <b-row class="menu">
                <b-col cols="2"><error-file-selector /></b-col>
            </b-row>
        </b-container>

        <pre>
            {{ errorsText }}
        </pre>
    </div>
</template>

<script>
import ErrorFileSelector from '~/components/ErrorFileSelector';

export default {
    components: {
        ErrorFileSelector,
    },

    computed: {
        errorsText() {
            return this.$store.state.errors.errors;
        },
    },

};
</script>

<style scoped>
.page {
    height: 100%;
}

.menu {
    margin: 10px;
}

.top {
    max-width: 100%;
}
</style>

