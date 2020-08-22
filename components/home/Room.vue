<template>
    <div :style="roomStyle" />
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapState } from 'vuex';

export default {
    props: {
        room: { type: String, required: true },
    },

    computed: {
        ...mapState('home', ['state']),

        roomStyle() {
            if (!this.state.presence) {
                return '';
            }
            const presence = this.state.presence.rooms[this.room];
            if (presence === 'yes') {
                return 'background-color: lightgreen;';
            }
            if (presence === 'maybe') {
                return 'background-color: lightblue;';
            }
            return '';
        },
    },

    methods: {
    },
};
</script>
