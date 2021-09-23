<template>
  <div class="flex h-screen bg-gray-50 text-gray-800">
    <SideBarComponent />
    <form class="relative p-5" autocomplete="off" @submit.prevent="submit">
      <h1 class="text-3xl">Upload Video</h1>
      <br />
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Select your video here:</label>
      <label
        class="
          w-64
          flex flex-col
          items-center
          px-4
          py-6
          bg-gray-100
          rounded-md
          shadow-md
          tracking-wide
          uppercase
          border border-blue
          cursor-pointer
          hover:bg-purple-600 hover:text-white
          text-purple-600
          ease-linear
          transition-all
          duration-150
        "
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
          <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
        </svg>
        <span class="mt-2 text-base leading-normal">Select a file</span>
        <span class="mt-2 text-base leading-normal" v-if="video">{{ video.name }} </span>
        <input type="file" accept=".mp4" class="hidden" ref="videoInput" @change="previewFiles" required />
      </label>
      <br />
      <br />
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Select your thumbnail here:</label>
      <label
        class="
          w-64
          flex flex-col
          items-center
          px-4
          py-6
          bg-gray-100
          rounded-md
          shadow-md
          tracking-wide
          uppercase
          border border-blue
          cursor-pointer
          hover:bg-purple-600 hover:text-white
          text-purple-600
          ease-linear
          transition-all
          duration-150
        "
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
          <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
        </svg>
        <span class="mt-2 text-base leading-normal">Select a file</span>
        <span class="mt-2 text-base leading-normal" v-if="thumbnail">{{ thumbnail.name }}</span>
        <input type="file" accept=".png" class="hidden" ref="thumbnailInput" @change="previewFiles" required />
      </label>
      <br />
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="title"> Title </label>
      <input
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-100 focus:border-gray-500"
        id="title"
        type="text"
        placeholder="Watching toasters toast Ep. 2"
        required
        v-model="title"
      />
      <br />
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="description"> Description </label>
      <textarea
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-100 focus:border-gray-500"
        id="description"
        rows="4"
        placeholder="Toast makes me happy. owo"
        v-model="description"
      ></textarea>
      <br />
      <input v-if="!uploading" class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" type="submit" value="Upload" />
      <div v-if="uploading">
        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded inline-flex items-center" value="Uploading">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="animate-spin fill-current w-5 h-5 mr-3"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="#FFFFFF"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" />
            <path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" />
            <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" />
            <path d="M8.56 20.31a9 9 0 0 0 3.44 .69" />
            <path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" />
            <path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" />
            <path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" />
            <path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" />
          </svg>
          <span>Uploading...</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      video: undefined,
      thumbnail: undefined,
      title: undefined,
      description: '',
      uploading: false,
    };
  },
  methods: {
    previewFiles() {
      const videoFile = this.$refs.videoInput.files[0];

      if (videoFile) this.video = videoFile;

      const thumbnailFile = this.$refs.thumbnailInput.files[0];

      if (thumbnailFile) this.thumbnail = thumbnailFile;
    },
    async submit() {
      if (this.title !== undefined && this.video !== undefined && this.thumbnail !== undefined) {
        const form = new FormData();

        form.append('title', this.title);
        form.append('description', this.description);
        form.append('video', this.video, this.video.name);
        form.append('thumbnail', this.thumbnail, this.thumbnail.name);

        this.uploading = true;
        try {
          const resp = await this.$axios.post('/api/restricted/video/create', form, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          this.$router.push({
            path: '/watch',
            query: {
              id: resp.data.id,
            },
          });
        } catch (err) {
          // Handle Error Here
          console.error(err);
        }
        this.uploading = false;
      }
    },
  },
};
</script>
