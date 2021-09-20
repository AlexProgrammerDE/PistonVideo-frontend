<template>
  <div
    class="
      fixed
      z-30
      inset-y-0
      left-0
      w-64
      transition
      duration-300
      transform
      overflow-y-auto
      lg:translate-x-0 lg:static lg:inset-0
      -translate-x-full
      ease-in
    "
  >
    <SideBarTop />
    <SideBarList
      v-for="menu in menus"
      :key="menu.id"
      :title="menu.title"
      :entries="menu.entries"
    ></SideBarList>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          title: 'Menu',
          entries: [
            {
              title: 'Title',
            },
          ],
        },
      ],
    };
  },
};
</script>
