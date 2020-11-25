<template>
    <div>
        <div :style="style" class="light" @click="showModal = !showModal" />
    </div>
</template>

<script>
import { stateProperty } from '~/store/home';

export default {
    props: {
        name: { type: String, required: true },
    },

    data() {
        return {
            showModal: false,
            effects: [
                'Color Burst',
                'Flames',
                'Forest',
                'Inner Peace',
                'Northern Lights',
                'Snowfall',
                'Sunset',
            ],
        };
    },

    computed: {
        // on: stateProperty('on'),
        // brightness: stateProperty('brightness'),
        // effect: {
        //     get() {
        //         const state = this.$store.state.home.state[this.name];
        //         if (!state || state.type !== 'effect') {
        //             return '';
        //         }
        //         return state.options.name;
        //     },
        //     async set(name) {
        //         await this.$store.dispatch('home/update', {
        //             component: this.name,
        //             path: 'type',
        //             value: 'effect',
        //         });
        //         await this.$store.dispatch('home/update', {
        //             component: this.name,
        //             path: 'options',
        //             value: { name },
        //         });
        //     },
        // },

        style() {
            const state = this.$store.state.home.state[this.name];
            if (!state) {
                return '';
            }
            let color = 'lightgray';
            if (state.effect) {
                color = 'orange';
            }
            let result = `background-color: ${color};`;

            if (state.effect) {
                result += `box-shadow: 10px 00px 20px 2px ${color};`;
            }
            return result;
        },
    },

    methods: {
        async onClick() {
            // const { lightState } = this.$store.state.home.state[this.name];

            // this.$store.dispatch('home/update', {
            //     component: this.name,
            //     path: 'lightState.on',
            //     value: !lightState.on,
            // });
        },
    },

}
</script>

<style lang="scss" scoped>
.light {
    cursor: pointer;
    height: 100%;
    width: 100%;
    border: 2px solid black;
}
</style>
