<template>
  <div>
    <VideoJS v-if="ready" :options="playerOptions"></VideoJS>
  </div>
</template>

<script>
export default {
  props: ['videoId'],
  data() {
    return { ready: false, playerOptions: undefined };
  },
  async fetch() {
    var response = await this.$axios.get('/api/videodata', { params: { videoId: this.videoId } });

    this.playerOptions = {
      muted: true,
      language: 'en',
      autoplay: true,
      controls: true,
      playbackRates: [0.7, 1.0, 1.5, 2.0],
      sources: [
        {
          type: 'video/mp4',
          src: response.data.videoUrl,
        },
      ],
      poster: response.data.thumbnailUrl,
    };
    this.ready = true;
  },
};
</script>
