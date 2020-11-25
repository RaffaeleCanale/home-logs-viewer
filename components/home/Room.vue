<template>
    <div>
        <div
            class="room"
            :style="{
                'background-color': roomColor,
            }"
        />
        <div
            class="light-overlay"
            :style="{
                'background-color': overlayColor,
                transition: `background-color ${overlayTransitionTime}ms ease 300ms`,
            }"
        />
        <div
            class="presence-indicator"
            :style="{
                'background-color': presenceIndicatorColor,
            }"
        />
    </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapState } from 'vuex';
import * as Colors from '~/lib/colors';

export default {
    props: {
        room: { type: String, required: true },
        light: { type: String, required: true },
        sensor: { type: String, required: true },
    },

    computed: {
        ...mapState('home', ['state']),

        presenceIndicatorColor() {
            if (!this.state.presence) {
                return '';
            }
            const presence = this.state.presence.rooms[this.room];
            if (presence === 'yes') {
                return 'lightgreen';
            }
            if (presence === 'maybe') {
                return 'lightblue';
            }
            return 'black';
        },

        roomColor() {
            // const light = this.state[this.light];
            // if (light.on) {
            //     return Colors.getLightCssColor(light, 1);
            // }
            return 'rgb(189, 167, 109)';
        },

        overlayColor() {
            const sensor = this.state[this.sensor];
            const light = this.state[this.light];
            if (sensor.light.lux > 5) {
                return 'rgba(20, 20, 20, 0)';
            }

            const brightness = light.on ? light.brightness : 0;
            return `rgba(20, 20, 20, ${0.1 + ((1 - brightness) * 0.8)})`;
            // if (light.on) {
            //     return Colors.getLightCssColor(light, 0.5);
            // }

            // return 'rgba(20, 20, 20, 0.9)';
        },

        overlayTransitionTime() {
            const light = this.state[this.light];
            return light.transitionTime;
        },
    },

    methods: {
    },
};
</script>

<style lang="scss" scoped>
@import 'assets/globals.scss';

.room {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgb(189, 167, 109);
    border: solid;
}
.light-overlay {
    pointer-events:none;

    position: absolute;
    width: 100%;
    height: 100%;
    // background-color: rgba(20, 20, 20, 0.9);
    border: solid;
    z-index: 10;
    // transition: background-color 2000ms linear;
}

.presence-indicator {
    position: absolute;
    z-index: 100;
    width: 0.1 * $meters;
    height: 0.1 * $meters;
    right: 0.1 * $meters;
    bottom: 0.1 * $meters;
    border-radius: 50%;
}
</style>
