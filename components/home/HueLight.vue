<template>
    <div>
        <modal :show.sync="showModal">
            <template slot="header">
                {{ name }}
            </template>

            <form-item label="Powered">
                <b-form-checkbox v-model="on" switch size="lg">
                    {{ on ? 'On' : 'Off' }}
                </b-form-checkbox>
            </form-item>

            <form-item label="Brightness">
                <b-form-input
                    v-model="brightness"
                    type="range"
                    min="0"
                    max="1" step="0.1"
                />
            </form-item>

            <template v-if="isRGB">
                <form-item label="Hue">
                    <b-form-input
                        v-model="hue"
                        type="range"
                        min="0"
                        max="1" step="0.1"
                    />
                </form-item>
                <form-item label="Saturation">
                    <b-form-input
                        v-model="sat"
                        type="range"
                        min="0"
                        max="1" step="0.1"
                    />
                </form-item>
            </template>
            <template v-else>
                <form-item label="Color Temperature">
                    <b-form-input
                        v-model="colorTemperature"
                        type="range"
                        min="0"
                        max="1" step="0.1"
                    />
                </form-item>
            </template>
        </modal>
        <div
            :style="style"
            :class="{ strip }"
            class="light"
            @click="showModal = !showModal"
        >
            <div id="support" />
        </div>
    </div>
</template>

<script>
import * as Colors from '~/lib/colors';

import { stateProperty } from '~/store/home';
import Modal from '~/components/Modal.vue';
import FormItem from '~/components/FormItem.vue';

export default {
    components: { Modal, FormItem },

    props: {
        name: { type: String, required: true },
        strip: { type: Boolean, default: false },
    },

    data() {
        return {
            showModal: false,
        };
    },

    computed: {
        on: stateProperty('lightState.on'),
        brightness: stateProperty('lightState.brightness'),
        colorTemperature: stateProperty('lightState.colorTemperature'),
        hue: stateProperty('lightState.hue'),
        sat: stateProperty('lightState.sat'),

        isRGB() {
            const state = this.$store.state.home.state[this.name];
            return state && state.lightState.hue !== undefined;
        },

        style() {
            const state = this.$store.state.home.state[this.name];
            if (!state || !state.lightState) {
                return '';
            }
            const light = state.lightState;
            let color = 'darkgrey';
            let result = '';
            if (light.on) {
                if (this.isRGB) {
                    const hue = light.hue * 360;
                    const sat = Math.round(light.sat * 100);
                    color = `hsl(${hue}, ${sat}%, 50%, ${light.brightness})`;
                } else {
                    const tp = light.colorTemperature * 347 + 153;
                    const { r, g, b } = Colors.ctToRgb(tp);
                    color = `rgba(${r}, ${g}, ${b}, ${light.brightness})`;
                }
                result += `box-shadow: 0px 0px 20px 10px ${color};`;
                color = 'white';
            }
            // color = 'black';
            result += `background-color: ${color};`;
            if (state.mode === 'manual') {
                result += 'border: 3px solid orange';
            }
            return result;
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

}
</script>

<style lang="scss" scoped>
@import 'assets/globals.scss';

.light {
    cursor: pointer;
    background-color: white;
    height: 2 * $light-radius * $meters;
    width: 2 * $light-radius * $meters;
    border-radius: 50%;
    border: 2px solid gray;
}

.strip {
    border-radius: 5px;
    height: 0.1 * $meters;
    width: 100%;
}
.strip #support {
    visibility: hidden;
}

#support {
    $support-radius: 0.2 * $light-radius;

    position: absolute;
    background-color: gray;
    height: (2 * $support-radius) * $meters;
    width: (2 * $support-radius) * $meters;
    border-radius: 50%;
    left: ($light-radius - $support-radius) * $meters;
    top: ($light-radius - $support-radius) * $meters;
}
</style>
