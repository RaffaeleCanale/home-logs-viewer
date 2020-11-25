<template>
    <div
        :style="{
            'background-color': lightColor,
            'box-shadow': shadow,
            transition: `${shadowAnimation}, background-color ${state.transitionTime}ms ease`,
        }"
        :class="{ strip }"
        class="light"
    >
        <div class="support" />
    </div>
</template>

<script>
import * as Colors from '~/lib/colors';

export default {
    props: {
        name: { type: String, required: true },
        strip: { type: Boolean, default: false },
    },

    computed: {
        // on: stateProperty('on'),
        // brightness: stateProperty('brightness'),
        // colorTemperature: stateProperty('colorTemperature'),
        // hue: stateProperty('hue'),
        // sat: stateProperty('sat'),
        state() {
            return this.$store.state.home.state[this.name] || {};
        },

        shadowAnimation() {
            if (this.state.on) {
                return `box-shadow ${this.state.transitionTime}ms ease 500ms`;
            }
            return `box-shadow ${this.state.transitionTime}ms ease 0ms`;
        },

        isRGB() {
            return this.state.hue !== undefined;
        },

        // style() {
        //     const state = this.$store.state.home.state[this.name];
        //     if (!state) {
        //         return '';
        //     }
        //     let color = 'darkgrey';
        //     let result = '';
        //     if (state.on) {
        //         if (this.isRGB) {
        //             const hue = state.hue * 360;
        //             const sat = Math.round(state.sat * 100);
        //             color = `hsl(${hue}, ${sat}%, 50%, ${state.brightness})`;
        //         } else {
        //             const tp = state.colorTemperature * 347 + 153;
        //             const { r, g, b } = Colors.ctToRgb(tp);
        //             color = `rgba(${r}, ${g}, ${b}, ${state.brightness})`;
        //         }
        //         result += `box-shadow: 0px 0px 120px 20px ${color};`;
        //         // color = 'white';
        //     }
        //     // color = 'black';
        //     result += `background-color: ${color};`;
        //     return result;
        // },

        lightColor() {
            if (this.state.on) {
                return Colors.getLightCssColor(this.state, 1);
            }

            return 'darkgrey';
        },

        shadow() {
            const color = Colors.getLightCssColor(this.state, 0.4);
            if (this.state.on) {
                return `0px 0px 100px 200px ${color}`;
            }
            return `0px 0px 20px 0px ${color}`;
        },
    },

    methods: {
        async onClick() {
            const state = this.$store.state.home.state[this.name];

            this.$store.dispatch('home/update', {
                component: this.name,
                path: 'on',
                value: !state.on,
            });
        },
    },

}
</script>

<style lang="scss" scoped>
@import 'assets/globals.scss';
.light {
    background-color: white;
    height: 2 * $light-radius * $meters;
    width: 2 * $light-radius * $meters;
    border-radius: 50%;
    border: 2px solid gray;
}

.light.strip {
    border-radius: 5px;
    height: 0.1 * $meters;
    width: 100%;
}

.strip .support {
    visibility: hidden;
}

.support {
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
