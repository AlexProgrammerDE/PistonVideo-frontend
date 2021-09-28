<template>
  <video
    controls
    crossorigin
    playsinline
    data-poster="poster.jpg"
  >
    <source
      size="720"
      src="/path/to/video-720p.mp4"
      type="video/mp4"
    />
    <source
      size="1080"
      src="/path/to/video-1080p.mp4"
      type="video/mp4"
    />
    <track
      default
      kind="captions"
      label="English captions"
      src="/path/to/english.vtt"
      srclang="en"
    />
  </video>
</template>

<script>
import Plyr from 'plyr';

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
    return { player: undefined };
  },
  mounted() {
    this.player = new Plyr('#player', this.options);
  },
  beforeUnmount() {
    try {
      this.player.destroy();
    } catch (e) {
      if (!(this.opts.hideYouTubeDOMError && e.message === 'The YouTube player is not attached to the DOM.')) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }
  },
};
</script>
