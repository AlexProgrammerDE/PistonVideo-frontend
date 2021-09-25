<template>
  <VideoJS :options="playerOptions"></VideoJS>
</template>

<script>
export default {
  props: ['video'],
  data() {
    return {
      playerOptions: {
        //fill: true,
        responsive: true,
        muted: false,
        language: 'en',
        autoplay: true,
        controls: true,
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: 'video/mp4',
            src: this.video.videoUrl,
          },
        ],
        poster: this.video.thumbnailUrl,
      },
    };
  },
};
</script>
