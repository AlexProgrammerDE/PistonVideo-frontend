<template>
  <div v-if="rows" class="flex flex-wrap justify-between gap-2 overflow-hidden">
    <div v-for="rowVideos in rows" :key="rowVideos">
      <VideoCard v-for="video in rowVideos" :key="video.title" :video="video" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rows: undefined,
      videos: undefined
    };
  },
  async fetch() {
    const response = await this.$axios.get("/api/suggestions", { params: { amount: 50 } });

    this.videos = response.data;
    const rows = [];

    let rowIndex = 0;
    for (const video in this.videos) {
      if (rows[rowIndex] === undefined) rows[rowIndex] = [];

      rows[rowIndex][rows[rowIndex].length] = this.videos[video];

      rowIndex++;

      if (rowIndex >= 7) {
        rowIndex = 0;
      }
    }

    this.rows = rows;
  }
};
</script>
