<template>
    <div class="home">
        <room
            id="living-room"
            room="livingRoom"
            light="living-room-light"
            sensor="living-room-sensor"
        />
        <room
            id="corridor"
            room="corridor"
            light="corridor-light"
            sensor="corridor-sensor"
        />
        <room
            id="bedroom"
            room="bedroom"
            light="bedroom-light"
            sensor="bedroom-sensor"
        />
        <room
            id="bathroom"
            room="bathroom"
            light="bathroom-light-1"
            sensor="corridor-sensor"
        />
        <room
            id="kitchen"
            room="kitchen"
            light="living-room-light"
            sensor="living-room-sensor"
        />

        <hue-light id="living-room-light" name="living-room-light" />
        <hue-light id="corridor-light" name="corridor-light" />
        <hue-light id="bathroom-light" name="bathroom-light-1" />
        <hue-light id="bedroom-light" name="bedroom-light" />


        <hue-light id="living-room-strip" name="living-room-strip" strip />
        <nanoleaf id="nanoleaf" name="living-room-nanoleaf" />

        <hue-sensor id="living-room-sensor" name="living-room-sensor" vertical />
        <hue-sensor id="bedroom-sensor" name="bedroom-sensor" vertical />
        <hue-sensor id="corridor-sensor" name="corridor-sensor" />

        <hue-remote id="living-room-remote" name="living-room-remote" vertical />
        <hue-remote id="bedroom-remote" name="bedroom-remote" vertical />

        <lg-tv id="lg-tv" name="living-room-tv" />
        <media-center id="media-center" name="nuc-media-center" />

        <sonos id="living-room-sonos" name="sonos" room="livingRoom" />
        <sonos id="kitchen-sonos" name="sonos" room="kitchen" />
        <sonos id="bathroom-sonos" name="sonos" room="bathroom" />
        <sonos id="bedroom-sonos" name="sonos" room="bedroom" />

        <env-data id="env-data" />
    </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapState } from 'vuex';

import HueLight from '~/components/home/HueLight.vue';
import HueRemote from '~/components/home/HueRemote.vue';
import HueSensor from '~/components/home/HueSensor.vue';
import Nanoleaf from '~/components/home/Nanoleaf.vue';
import LgTv from '~/components/home/LgTv.vue';
import MediaCenter from '~/components/home/MediaCenter.vue';
import Sonos from '~/components/home/Sonos.vue';
import EnvData from '~/components/home/EnvData.vue';
import Room from '~/components/home/Room.vue';


export default {
    components: {
        LgTv,
        EnvData,
        HueLight,
        HueRemote,
        HueSensor,
        MediaCenter,
        Nanoleaf,
        Sonos,
        Room,
    },

    computed: {
        ...mapState('home', ['state']),
    },

    methods: {
        getRoomStyle(room) {
            if (!this.state.presence) {
                return '';
            }
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

.home {
    width: 100%;
    height: 100%;
    background-color: black;
}

.room {
    position: absolute;
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

#env-data {
    position: absolute;
    left: ($bedroom-left + $bedroom-width + 0.2) * $meters;
    top: 0.2 * $meters;
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
#kitchen {
    @extend .room;
    top: $kitchen-top * $meters;
    left: $kitchen-left * $meters;
    width: $kitchen-width * $meters;
    height: $kitchen-height * $meters;
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

#living-room-remote {
    position: absolute;
    left: ($living-room-left + $living-room-width - $hue-remote-height) * $meters;
    top: ($living-room-top + $living-room-height - 2) * $meters;
}

#bedroom-remote {
    position: absolute;
    left: ($bedroom-left + $bedroom-width - $hue-remote-height) * $meters;
    top: ($bedroom-top + $bedroom-height - 2) * $meters;
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

#living-room-sonos {
    position: absolute;
    left: ($living-room-left + 1) * $meters;
    top: ($living-room-top + $living-room-height - $sonos-height) * $meters;
}
#kitchen-sonos {
    position: absolute;
    left: ($kitchen-left + 0.3) * $meters;
    top: ($kitchen-top) * $meters;
}
#bathroom-sonos {
    position: absolute;
    left: ($bathroom-left + $bathroom-width - $sonos-width - 0.1) * $meters;
    top: ($bathroom-top) * $meters;
}
#bedroom-sonos {
    position: absolute;
    left: ($bedroom-left + (($bedroom-width - $sonos-width) / 2)) * $meters;
    top: ($bedroom-top) * $meters;
}
</style>
