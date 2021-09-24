<template>
  <div class="flex h-screen bg-gray-50 text-gray-800">
    <SideBarComponent />
    <div v-if="video != undefined" class="m-5 w-full shadow-lg bg-gray-100">
      <VideoPlayerComponent :video="video" />
      <div class="px-6 py-3">
        <div class="font-bold text-2xl mb-2">{{ video.title }}</div>
        <p class="text-gray-700 text-lg py-1">
          {{ video.description }}
        </p>
        <div class="py-1 pt-1 pb-2">
          <span v-for="tag in video.tags" :key="tag" class="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-1 mb-1">#{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoId: this.$route.query.id,
      video: undefined,
    };
  },
  async fetch() {
    var response = await this.$axios.get('/api/videodata', { params: { id: this.videoId } });

    this.video = response.data;
  },
};
</script>
