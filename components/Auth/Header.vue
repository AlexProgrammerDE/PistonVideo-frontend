<template>
  <div>
    <div class="text-center w-full font-bold text-3xl text-gray-600 p-4">
      {{ title }}
    </div>
    <div class="w-full bg-gray-200 my-3" style="height: 1px"></div>
  </div>
</template>

<script>
export default {
  props: ["title"]
};
</script>
