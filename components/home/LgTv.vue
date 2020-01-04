<template>
    <div>
        <modal :show.sync="showModal">
            <template slot="header">
                {{ name }}
            </template>
            <b-form-checkbox v-model="on" switch>
                On
            </b-form-checkbox>

            App
            <b-form-select v-model="app" :options="apps" />
        </modal>
        <div
            class="sensor"
            @click="showModal = !showModal"
        >
            <div id="tv" :class="{ active: state.on }" />
            <div id="stand" />
        </div>
    </div>
</template>

<script>
import Modal from '~/components/Modal.vue';
import { stateProperty } from '~/store/home';

export default {
    components: { Modal },

    props: {
        name: { type: String, required: true },
    },

    data() {
        return {
            showModal: false,
            apps: [
                { text: 'PC', value: 'com.webos.app.hdmi2' },
                { text: 'NUC', value: 'com.webos.app.hdmi1' },
            ],
        };
    },

    computed: {
        on: stateProperty('on'),
        app: stateProperty('app'),

        state() {
            return this.$store.state.home.state[this.name];
        },

        style() {
            if (this.state.on) {
                return 'background-color: white';
            }
            return '';
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
    width: $lg-tv-width * $meters;
    height: $lg-tv-height * $meters;
    // background-color: red;
}

#tv.active {
    box-shadow: 0px 10px 20px 2px #fff;
    background-color: white;
}

#tv {
    position: absolute;
    width: $lg-tv-width * $meters;
    height: ($lg-tv-height - 0.1) * $meters;
    top: 0.1 * $meters;
    border-radius: 10px 10px 2px 2px;
    border: 5px solid gray;
    border-bottom: none;
    background-color: black;
}

#stand {
    position: absolute;
    width: ($lg-tv-width - 0.4) * $meters;
    height: ($lg-tv-height - 0.1) * $meters;
    background-color: gray;
    left: 0.2 * $meters;
    border-radius: 5px 5px 0px 0px;
}
</style>
