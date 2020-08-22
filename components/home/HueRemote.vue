<template>
    <div
        :class="['remote', { vertical }]"
    >
        <div class="button-0" @click="onClick(0)" />
        <div class="button-1" @click="onClick(1)" />
        <div class="button-2" @click="onClick(2)" />
        <div class="button-3" @click="onClick(3)" />
    </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapState } from 'vuex';

const REMOTE_BUTTONS = [
    'on',
    'dimUp',
    'dimDown',
    'off',
];

export default {
    props: {
        name: { type: String, required: true },
        vertical: { type: Boolean, default: false },
    },

    methods: {
        onClick(buttonIndex) {
            this.$store.dispatch('home/update', {
                component: this.name,
                path: REMOTE_BUTTONS[buttonIndex],
                value: Date.now(),
            });
        },
    },

};
</script>

<style lang="scss" scoped>
@import 'assets/globals.scss';

.remote {
    cursor: pointer;
    width: $hue-remote-width * $meters;
    height: $hue-remote-height * $meters;
    background-color: red;

    &.vertical {
        height: $hue-remote-width * $meters;
        width: $hue-remote-height * $meters;

        .button-0 {
            top: 0;
            height: ($hue-remote-width / 4) * $meters;
            width: $hue-remote-height * $meters;
        }
        .button-1 {
            top: ($hue-remote-width / 4);
            height: ($hue-remote-width / 4) * $meters;
            width: $hue-remote-height * $meters;
            background-color: yellow;
        }
        .button-2 {
            top: ($hue-remote-width / 4);
            height: ($hue-remote-width / 4) * $meters;
            width: $hue-remote-height * $meters;
            background-color: green;
        }
        .button-3 {
            top: ($hue-remote-width / 4);
            height: ($hue-remote-width / 4) * $meters;
            width: $hue-remote-height * $meters;
            background-color: aquamarine;
        }
    }
}

// .button-1 {
//     width: $hue-remote-width * $meters;
//     height: ($hue-remote-height / 4) * $meters;
//     background-color: blue;
// }
</style>
