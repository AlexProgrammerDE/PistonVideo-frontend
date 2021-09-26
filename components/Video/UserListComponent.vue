<template>
  <div class="flex flex-wrap gap-2 overflow-hidden">
    <VideoCard v-for="video in videos" :key="video.title" :video="video"></VideoCard>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      videos: [],
    };
  },
  async fetch() {
    var response = await this.$axios.get('/api/uservideos', { params: { id: this.id } });

    this.videos = response.data;
  },
};
</script>
