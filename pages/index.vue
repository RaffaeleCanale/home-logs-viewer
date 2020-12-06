<template>
    <splide
        ref="splide"
        :options="{
            width: '100vw',
            height: '100vh',
            arrows: false,
            pagination: false,
        }"
    >
        <splide-slide>
            <home />
            <!-- <media /> -->
        </splide-slide>
        <splide-slide>
            <media ref="media" />
        </splide-slide>
    </splide>
</template>

<script>
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

import { Splide, SplideSlide } from '@splidejs/vue-splide';

import Home from '~/templates/Home.vue';
import Media from '~/templates/Media.vue';

export default {
    components: {
        Home,
        Media,
        Splide,
        SplideSlide,
    },

    computed: {
        splitOptions() {
            return {
                width: '100%',
                height: '100%',
            };
        },
    },

    watch: {
        // '$refs.media.hasMedia': (value) => {
        //     console.log('value', value);
        // },
    },

    mounted() {
        // console.log('this.$refs.splid', this.$refs.media.hasMedia);
        this.$watch(
            '$refs.media.hasMedia',
            (hasMedia) => {
                if (hasMedia) {
                    this.$refs.splide.go(1);
                } else {
                    this.$refs.splide.go(0);
                }
            },
        );
    },
};
</script>

<style>
/* .splide__track {
    height: 100%;
}
.fullscreen {
    height: 100%;
    width: 100%;
    background: black;
} */

/* .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
} */

.title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
}
</style>
