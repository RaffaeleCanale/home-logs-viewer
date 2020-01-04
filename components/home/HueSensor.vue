<template>
    <div>
        <modal :show.sync="showModal">
            <template slot="header">
                {{ name }}
            </template>

            Presence: {{ state.presence }}<br>
            Light: {{ state.light }}<br>
            Temperature: {{ state.temperature }}
        </modal>
        <div
            :style="style"
            class="sensor"
            :class="{ vertical }"
            @click="showModal = !showModal"
        />
    </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapState } from 'vuex';

import Modal from '~/components/Modal.vue';
import { stateProperty } from '~/store/home';

export default {
    components: { Modal },

    props: {
        name: { type: String, required: true },
        vertical: { type: Boolean, default: false },
    },

    data() {
        return {
            showModal: false,
        };
    },

    computed: {
        state() {
            return this.$store.state.home.state[this.name] || {};
        },



        style() {
            if (!this.state.light) {
                return '';
            }
            const { lux } = this.state.light;
            const brightness = Math.min(255, (lux / 30) * 255);

            let style = `background-color: rgb(${brightness}, ${brightness}, ${brightness});`;
            if (this.state.presence) {
                style += 'border: 3px solid yellow;';
            }
            return style;
        },
    },

    methods: {
    },

}
</script>

<style lang="scss" scoped>
@import 'assets/globals.scss';

.sensor {
    cursor: pointer;
    height: 100px;
    width: $hue-sensor-width * $meters;
    height: $hue-sensor-height * $meters;
    background-color: red;
}

.vertical {
    width: $hue-sensor-height * $meters;
    height: $hue-sensor-width * $meters;
}
</style>
