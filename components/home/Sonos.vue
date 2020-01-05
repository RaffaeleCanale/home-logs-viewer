<template>
    <div>
        <modal :show.sync="showModal">
            <template slot="header">
                {{ name }} - {{ room }}
            </template>

            <form-item label="Volume">
                <b-form-input
                    v-model="volume"
                    type="range"
                    min="0"
                    max="100" step="1"
                />
            </form-item>
            <form-item label="Play">
                <b-form-select v-model="play" :options="groups" />
            </form-item>

            {{ state.rooms[room] }}
            {{ play }}
        </modal>
        <div class="sonos" @click="showModal = !showModal">
            <div v-if="!!play" class="arrow-right" />
        </div>
    </div>
</template>

<script>
import forEach from 'lodash/forEach';
import Modal from '~/components/Modal.vue';
import FormItem from '~/components/FormItem.vue';

import { stateProperty } from '~/store/home';

export default {
    components: { FormItem, Modal },

    props: {
        name: { type: String, required: true },
        room: { type: String, required: true },
    },

    data() {
        return {
            showModal: false,
        };
    },

    computed: {
        volume: stateProperty(function getPath() {
            return `rooms.${this.room}.volume`;
        }),

        play: stateProperty(function getPath() {
            return `rooms.${this.room}.play`;
        }),

        groups() {
            if (!this.state.playingGroups) {
                return [];
            }
            const groups = [{ text: 'Off', value: null }];
            forEach(this.state.playingGroups, (group, name) => {
                let text;
                if (group.type === 'line_in') {
                    text = 'Line In';
                } else {
                    text = group.station || 'Unknown station';
                }
                groups.push({
                    text,
                    value: name,
                });
            });
            return groups;
        },

        state() {
            return this.$store.state.home.state[this.name];
        },
    },

    methods: {
        async onClick() {
            const { lightState } = this.$store.state.home.state[this.name];

            this.$store.dispatch('home/update', {
                component: this.name,
                path: 'lightState.on',
                value: !lightState.on,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'assets/globals.scss';

.sonos {
    cursor: pointer;
    height: $sonos-height * $meters;
    width: $sonos-width * $meters;
    background-color: black;
    border: 2px solid black;
    border-radius: 30%;
    border: 2px solid darkgray;
}

.arrow-right {
    position: absolute;
    width: 0;
    height: 0;
    left: ($sonos-width / 3) * $meters;
    top: ($sonos-height / 4) * $meters;
    border-top: ($sonos-width / 4) * $meters solid transparent;
    border-bottom: ($sonos-width / 4) * $meters solid transparent;

    border-left: ($sonos-width / 3) * $meters solid white;

}
</style>
