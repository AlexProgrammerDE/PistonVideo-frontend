<template>
  <video ref="videoPlayer" class="video-js w-full h-lg vjs-layout-small"></video>
</template>

<script>
import videojs from 'video.js';

export default {
  ssr: false,
  name: 'VideoPlayer',
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      player: null,
    };
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>
