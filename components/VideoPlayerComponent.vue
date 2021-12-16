<template>
  <vue-plyr :options="plyrOptions">
    <video controls crossorigin playsinline :data-poster="options.poster">
      <source v-for="source in options.sources" :key="source.src" :src="source.src" :type="source.type" />
    </video>
  </vue-plyr>
</template>

<script>
export default {
  props: ['video'],
  data() {
    return {
      plyrOptions: {
        ratio: '16:9',
      },
      options: {
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
