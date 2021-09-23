<template>
  <div class="flex h-screen bg-gray-50 text-gray-800">
    <SideBarComponent />
    <div v-if="videoId != undefined" class="m-5 w-full shadow-lg bg-gray-100"><VideoPlayerComponent :videoId="videoId" /></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoId: this.$route.query.id
    }
  }
};
</script>
