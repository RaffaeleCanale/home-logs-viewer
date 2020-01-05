<template>
    <div class="form-item">
        <span class="form-label">{{ label }}</span>
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        label: { type: String, default: '' },
    },
};
</script>

<style lang="scss" scoped>
.form-label {
    min-width: 200px;
}

.form-item {
    display: flex;
    padding-bottom: 20px;
    font-size: 1.5em;
}
</style>
