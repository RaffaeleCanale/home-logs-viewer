<template>
    <div>
        <modal :show.sync="showModal">
            <template slot="header">
                {{ name }}
            </template>
            <b-form-checkbox v-model="on" switch>
                On
            </b-form-checkbox>
            Playback: {{ state.playback }}<br>
            Media: {{ state.media.path }}<br>
            <br>
            <a href="https://media.canale.io">Media</a><br>
            <a href="https://medusa.canale.io">Medusa</a><br>
            <a href="https://radarr.canale.io">Radarr</a><br>
            <a href="https://transmission.canale.io">Transmission</a><br>
        </modal>
        <div
            class="sensor"
            @click="showModal = !showModal"
        >
            <div id="led" :class="{ active: state.on }" />
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
        };
    },

    computed: {
        on: stateProperty('on'),

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
    width: $media-center-width * $meters;
    height: $media-center-height * $meters;
    background-color: lightblue;
    border-radius: 10px;
    border: 2px solid black;
}

#led.active {
    background-color: green;
    box-shadow: 0px 0px 10px 5px lightgreen;
}

#led {
    position: absolute;
    height: 0.1 * $meters;
    width: 0.1 * $meters;
    left: ($media-center-width - 0.15) * $meters;
    top: ($media-center-height - 0.15) * $meters;
    border-radius: 50%;
    background-color: darkred;
}

</style>
