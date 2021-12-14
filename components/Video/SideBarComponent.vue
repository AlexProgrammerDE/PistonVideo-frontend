<template>
  <div class="max-w-md flex grid-cols-3 gap-2 overflow-hidden">
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
      videos: []
    };
  },
  async fetch() {
    const response = await this.$axios.get("/api/suggestions");

    this.videos = response.data;
  }
};
</script>
