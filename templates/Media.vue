<template>
    <div class="wrapper">
        <!-- Hello world! -->
        <!-- {{ $store.state.home.state['nuc-media-center'].media }} -->
        <!-- {{ playingMedia }} -->
        <div v-if="hasMedia" class="media-info">
            <div class="poster">
                <!-- {{ `? ${poster} ?` }} -->
                <!-- {{ playingMedia }} -->
                <img v-if="poster" :src="poster" height="100%">
            </div>
            <div class="title">
                {{ title }}
            </div>
            <div class="subtitle">
                {{ subtitle }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        playingMedia() {
            const mediaCenter = this.$store.state.home.state['nuc-media-center'];

            if (!mediaCenter) {
                return null;
            }
            const { playback, mediaInfo } = mediaCenter;
            if (!playback || playback === 'OFF') {
                return null;
            }

            return mediaInfo || null;
        },

        playingMediaType() {
            return this.$store.state.home.state['nuc-media-center'].media.type;
        },

        playingMusic() {
            const { sonos } = this.$store.state.home.state;
            if (!sonos) {
                return null;
            }
            const { rooms, groups } = sonos;
            const playingRoom = Object.values(rooms).find(room => room.state === 'playing');
            if (!playingRoom) {
                return null;
            }
            const groupName = playingRoom.group;
            const group = groups[groupName];
            if (!group.artist) {
                return null;
            }
            return group;
        },

        hasMedia() {
            return !!this.playingMedia || !!this.playingMusic;
        },

        poster() {
            if (this.playingMedia) {
                const isAnime = this.playingMediaType === 'anime';
                return `http://localhost:51010${this.playingMedia.poster}?anime=${isAnime}`;
            }
            if (this.playingMusic) {
                return this.playingMusic.albumArtURI;
            }
            return null;
        },

        title() {
            if (this.playingMedia) {
                if (this.playingMediaType === 'movie') {
                    return this.playingMedia.title;
                }
                return this.playingMedia.show;
            }
            if (this.playingMusic) {
                return this.playingMusic.title;
            }
            return null;
        },

        subtitle() {
            if (this.playingMedia) {
                if (this.playingMediaType !== 'movie') {
                    const { season, number, title } = this.playingMedia;
                    return `S${season}E${number} - ${title}`;
                }
            }
            if (this.playingMusic) {
                const { artist, album } = this.playingMusic;
                return `${artist} - ${album}`;
            }
            return null;
        },
    },
};
</script>

<style scoped>
.wrapper {
    display: flex;
    background: black;
    /* margin: 0 auto; */
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
}

.poster {
    height: 50vh;
}
</style>