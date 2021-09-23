<template>
  <div class="p-5">
    <div class="w-44 h-auto rounded overflow-hidden shadow-lg bg-gray-100">
      <img v-bind:src="video.thumbnailUrl" alt="Thumbnail" />
      <div class="px-6 py-3">
        <a v-bind:href="'/watch?id=' + video.id">
          <div class="font-bold text-base mb-2">{{ video.title }}</div>
        </a>
        <p class="text-gray-700 text-sm">
          {{ video.description }}
        </p>
      </div>
      <div class="px-6 pt-1 pb-2">
        <span
          v-for="tag in video.tags"
          :key="tag"
          class="
            inline-block
            bg-gray-200
            rounded-full
            px-2
            py-1
            text-xs
            font-semibold
            text-gray-700
            mr-1
            mb-1
          "
          >#{{ tag }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['video'],
};
</script>
