<template>
    <div>
        <b-form-group>
            <template slot="label">
                <!-- <b>Choose your flavours:</b><br> -->
                <b-form-checkbox
                    v-model="allSelected"
                    :indeterminate="indeterminate"
                    @change="toggleAll"
                >
                    {{ allSelected ? 'Un-select All' : 'Select All' }}
                </b-form-checkbox>
            </template>

            <b-form-checkbox-group
                v-model="selectedComponents"
                :options="components"
                class="ml-4"
                stacked
            />
        </b-form-group>
    </div>
</template>

<script>
// eslint-disable-next-line
import { mapState } from 'vuex';

export default {

    computed: {
        allSelected: {
            get() {
                return this.selectedComponents.length === this.components.length;
            },
            set() {
                // You're not the boss of me!
            },
        },

        indeterminate() {
            return this.selectedComponents.length > 0 && !this.allSelected;
        },

        selectedComponents: {
            get() {
                return this.$store.state.logs.selectedComponents;
            },
            set(value) {
                this.$store.commit('logs/setSelectedComponents', value);
            },
        },

        ...mapState('logs', [
            'components',
        ]),
    },

    methods: {
        toggleAll(value) {
            if (value) {
                this.selectedComponents = this.components;
            } else {
                this.selectedComponents = [];
            }
        },
    },
};
</script>
