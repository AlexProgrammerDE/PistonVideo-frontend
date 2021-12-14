<template>
  <span
    class="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide rounded-full"
  >{{ text }}
  </span>
</template>

<script>
export default {
  props: ["color", "text"]
};
</script>
