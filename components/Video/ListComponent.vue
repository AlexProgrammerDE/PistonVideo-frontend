<template>
  <div ref="mainBox" class="flex flex-wrap justify-between gap-2 overflow-hidden w-full">
    <div v-for="rowVideos in rows" :key="rowVideos">
      <VideoCard v-for="video in rowVideos" :key="video.title" :video="video" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData() {
    const response = await this.$axios.get('/api/suggestions', { params: { amount: 100 } });

    this.videos = response.data;
    console.log(videos);
  },
  data() {
    return {
      rows: undefined,
      videos: undefined,
    };
  },
  updated() {
    let width = this.$refs.mainBox.clientWidth;

    const rowsSize = width / 256;

    const rows = [];

    let rowIndex = 0;
    for (const video in this.videos) {
      if (rows[rowIndex] === undefined) {
        rows[rowIndex] = [];
      }

      rows[rowIndex][rows[rowIndex].length] = this.videos[video];

      rowIndex++;

      if (rowIndex >= rowsSize) {
        rowIndex = 0;
      }
    }

    this.rows = rows;
    console.log(rows);
  },
};
</script>
