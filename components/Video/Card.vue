<template>
  <div class="p-2">
    <div class="w-64 h-auto rounded overflow-hidden shadow-lg bg-gray-100">
      <a :href="'/watch?id=' + video.id"><img alt="Thumbnail" :src="video.thumbnailUrl" /></a>
      <div class="px-6 py-3">
        <div class="flex justify-center md:justify-end -mt-12">
          <a :href="'/user?id=' + video.uploader.id">
            <img class="w-14 h-14 object-cover rounded-full border-2 border-indigo-500" :src="video.uploader.avatarUrl" />
          </a>
        </div>
        <a :href="'/watch?id=' + video.id">
          <div class="font-bold text-base mb-2">{{ video.title }}</div>
        </a>
        <div v-html="description"></div>
      </div>
      <div class="px-6 pt-1 pb-2">
        <span v-for="tag in video.tags" :key="tag" class="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1">#{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it';

var renderer = new MarkdownIt();

export default {
  props: ['video'],
  data() {
    var descSlice = this.video.description;
    return { description: renderer.render(descSlice.length > 200 ? descSlice.substring(0, 200) : descSlice) };
  },
};
</script>
