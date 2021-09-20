<template>
  <div class="flex-1 flex flex-col overflow-hidden">
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
      videos: [
        {
          title: 'Cool Video',
          description: 'owo description',
          image:
            'https://i.pinimg.com/564x/25/b0/6e/25b06e78d3e6389e91e39a16f3eb36f4.jpg',
          url: 'https://www.pinterest.de/pin/651544271081475834/',
          tags: ['meow', 'nyan', 'cat'],
        },
      ],
    };
  },
};
</script>
