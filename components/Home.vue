<template>
    <div>
        <div id="living-room" :style="getRoomStyle('livingRoom')" />
        <div id="corridor" :style="getRoomStyle('corridor')" />
        <div id="bedroom" :style="getRoomStyle('bedroom')" />
        <div id="bathroom" :style="getRoomStyle('bathroom')" />

        <hue-light id="living-room-light" name="living-room-light" />
        <hue-light id="corridor-light" name="corridor-light" />
        <hue-light id="bathroom-light" name="bathroom1-light" />
        <hue-light id="bedroom-light" name="bedroom-light" />


        <hue-light id="living-room-strip" name="living-room-strip" strip />
        <nanoleaf id="nanoleaf" name="living-room-nanoleaf" />

        <hue-sensor id="living-room-sensor" name="living-room-sensor" vertical />
        <hue-sensor id="bedroom-sensor" name="bedroom-sensor" vertical />
        <hue-sensor id="corridor-sensor" name="corridor-sensor" />

        <lg-tv id="lg-tv" name="living-room-tv" />
        <media-center id="media-center" name="nuc-media-center" />
    </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapState } from 'vuex';

import HueLight from '~/components/home/HueLight.vue';
import HueSensor from '~/components/home/HueSensor.vue';
import Nanoleaf from '~/components/home/Nanoleaf.vue';
import LgTv from '~/components/home/LgTv.vue';
import MediaCenter from '~/components/home/MediaCenter.vue';


export default {
    components: {
        LgTv,
        HueLight,
        HueSensor,
        MediaCenter,
        Nanoleaf,
    },

    computed: {
        ...mapState('home', ['state']),
    },

    methods: {
        getRoomStyle(room) {
            const presence = this.state.presence.rooms[room];
            if (presence === 'yes') {
                return 'background-color: lightgreen;';
            }
            if (presence === 'maybe') {
                return 'background-color: lightblue;';
            }
            return '';
        },
    },

}
</script>

<style scoped lang="scss">
@import 'assets/globals.scss';

.room {
    position: absolute;
    background-color: lightgray;
    border: solid;
}

.light {
    position: absolute;
    background-color: white;
    width: 2 * $light-radius * $meters;
    height: 2 * $light-radius * $meters;
    border-radius: 50%;
}

.strip {
    position: absolute;
    background-color: white;
}

#living-room {
    @extend .room;
    top: $living-room-top * $meters;
    left: $living-room-left * $meters;
    width: $living-room-width * $meters;
    height: $living-room-height * $meters;
}
#corridor {
    @extend .room;
    top: $corridor-top * $meters;
    left: $corridor-left * $meters;
    width: $corridor-width * $meters;
    height: $corridor-height * $meters;
}
#bedroom {
    @extend .room;
    top: $bedroom-top * $meters;
    left: $bedroom-left * $meters;
    width: $bedroom-width * $meters;
    height: $bedroom-height * $meters;
}
#bathroom {
    @extend .room;
    top: $bathroom-top * $meters;
    left: $bathroom-left * $meters;
    width: $bathroom-width * $meters;
    height: $bathroom-height * $meters;
}

#living-room-light {
    position: absolute;
    top: ($living-room-top + ($living-room-height / 2) - $light-radius) * $meters;
    left: ($living-room-left + ($living-room-width / 2) - $light-radius) * $meters;
}

#corridor-light {
    position: absolute;
    top: ($corridor-top + ($corridor-height / 2) - $light-radius) * $meters;
    left: ($corridor-left + ($corridor-width / 2) - $light-radius) * $meters;
}

#bedroom-light {
    position: absolute;
    top: ($bedroom-top + ($bedroom-height / 2) - $light-radius) * $meters;
    left: ($bedroom-left + ($bedroom-width / 2) - $light-radius) * $meters;
}

#bathroom-light {
    position: absolute;
    top: ($bathroom-top + 0.1) * $meters;
    left: ($bathroom-left + ($bathroom-width / 2) - $light-radius) * $meters;
}

#living-room-strip {
    position: absolute;
    width: 4 * $meters;
    top: ($living-room-top + 0.1) * $meters;
    left: ($living-room-left + 0.1) * $meters;
}

#nanoleaf /deep/ .light {
    @extend .strip;
    height: 1.5 * $meters;
    width: 0.1 * $meters;
    top: ($living-room-height + $living-room-top - 1.5 - 1) * $meters;
    left: $living-room-left * $meters;
}

#living-room-sensor {
    position: absolute;
    left: ($living-room-left + $living-room-width - $hue-sensor-height) * $meters;
    top: ($living-room-top + $living-room-height - 1) * $meters;
}

#bedroom-sensor {
    position: absolute;
    left: ($bedroom-left) * $meters;
    top: ($living-room-top + $living-room-height - 1) * $meters;
}

#corridor-sensor {
    position: absolute;
    left: ($corridor-left + 1) * $meters;
    top: ($corridor-top) * $meters;
}

#lg-tv {
    position: absolute;
    left: ($living-room-left + 1) * $meters;
    top: ($living-room-top + 4) * $meters;
}

#media-center {
    position: absolute;
    left: ($living-room-left + $lg-tv-width + 1.5) * $meters;
    top: ($living-room-top + 4) * $meters;
}
</style>
