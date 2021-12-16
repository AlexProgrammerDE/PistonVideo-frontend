<template>
  <div class="flex flex-row min-h-screen bg-gray-50 text-gray-800">
    <SideBarComponent />
    <div v-if="video != undefined" class="m-5 w-full shadow-lg bg-gray-100">
      <VideoPlayerComponent :video="video" />
      <div class="px-6 py-3">
        <div class="font-bold text-2xl mb-2">{{ video.title }}</div>
        <div class="text-gray-700 text-lg py-1" v-html="description"></div>
        <div class="py-1 pt-1 pb-2">
          <span v-for="tag in video.tags" :key="tag" class="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-1 mb-1">#{{ tag }}</span>
        </div>
        <div class="my-3 flex flex-row w-full bg-gray-300 items-center p-6 space-x-6 rounded-xl shadow-lg">
          <img class="rounded-full h-10 w-10 items-center justify-center" :src="video.uploader.avatarUrl" />
          <a class="inline-block text-gray-700 text-lg py-1" :href="'/user?id=' + video.uploader.id">{{ video.uploader.username }}</a>
        </div>
      </div>
    </div>
    <div class="flex-auto max-w-2xl">
      <VideoListComponent />
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it';

export default {
  auth: false,
  async asyncData({ query, $axios }) {
    const response = await $axios.get('/api/videodata', { params: { id: query.id } });

    return {
      video: response.data,
      description: new MarkdownIt().render(response.data.description),
    };
  },
  head() {
    return {
      title: 'PistonVideo | ' + this.video.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.video.description,
        },
      ],
    };
  },
};
</script>
