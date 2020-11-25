<template>
    <div class="env-data">
        <div>
            Is sleeping: {{ userData.isSleeping }}
        </div>
        <div>
            Is night walking: {{ userData.isNightWalking }}
        </div>
        <div @click="toggleDaylight">
            Is daylight: {{ isDayLight }}
        </div>
        <div @click="toggleGuestMode">
            Guest mode: {{ userData.isGuestMode }}
        </div>
    </div>
</template>

<script>
const sensors = [
    'living-room-sensor',
    'bedroom-sensor',
    'corridor-sensor',
];

export default {
    props: {
        // name: { type: String, required: true },
        // vertical: { type: Boolean, default: false },
    },

    computed: {
        userData() {
            return this.$store.state.home.state['user-data'] || {};
        },

        isDayLight() {
            const luxes = sensors.map(
                sensor => this.$store.state.home.state[sensor].light.lux,
            );
            return luxes.some(lux => lux > 6);
        },
    },

    methods: {
        async toggleDaylight() {
            const value = this.isDayLight ? 0 : 10;

            const promises = sensors.map(sensor => this.$store.dispatch(
                'home/update',
                {
                    component: sensor,
                    path: 'light.lux',
                    value,
                },
            ));
            await Promise.all(promises);
        },

        async toggleGuestMode() {
            const value = !this.userData.isGuestMode;

            await this.$store.dispatch(
                'home/update',
                {
                    component: 'user-data',
                    path: 'isGuestMode',
                    value,
                },
            );
        },
    },

}
</script>

<style lang="scss" scoped>
@import 'assets/globals.scss';

.env-data {
    cursor: pointer;
    // width: 2 * $meters;
    // height: 2 * $meters;
    background-color: red;
}
</style>
