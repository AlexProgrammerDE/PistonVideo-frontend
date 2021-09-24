<template>
  <div class="flex-1 flex flex-row overflow-hidden">
    <VideoCard
      v-for="video in videos"
      :key="video.title"
      :video="video"
    ></VideoCard>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videos: [],
    };
  },
  async fetch() {
    this.videos = await (await this.$axios.get('/api/suggestions')).data;
  }
};
</script>
