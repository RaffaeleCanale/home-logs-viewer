<template>
    <div>
        <pre>{{ state }}</pre>
    </div>
</template>

<script>
export default {
    computed: {
        state() {
            return this.$store.state.home.state;
        }
    }
};
</script>

<style scoped>

</style>

