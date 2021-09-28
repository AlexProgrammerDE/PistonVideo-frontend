<template>
  <div class="flex flex-row min-h-screen bg-gray-50 text-gray-800">
    <SideBarComponent />

    <div class="m-5 w-full">
      <div class="flex flex-col">
        <div class="bg-blue-100 shadow-lg rounded-2xl">
          <div class="flex flex-row items-center mt-40 mb-10 mx-10 bg-gray-100 rounded-1xl shadow-lg w-42 h-40">
            <img class="w-40 h-40 mr-5 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l rounded-1xl text-center overflow-hidden" :src="user.avatarUrl" :alt="'Avatar of ' + user.username" />
            <div>
              <h2 class="text-2xl font-bold mb-2 text-gray-800">{{ user.username }}</h2>
              <p class="text-gray-700">{{ user.bioSmall }}</p>
            </div>
          </div>
        </div>
        <VideoUserListComponent :id="user.id"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  async asyncData({ query, $axios }) {
    var response = await $axios.get('/api/userdata', { params: { id: query.id } });

    return { user: response.data };
  },
};
</script>
