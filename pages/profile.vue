<template>
  <div class="flex flex-row min-h-screen bg-gray-50 text-gray-800">
    <SideBarComponent />
    <div class="m-7 shadow-xl w-full bg-gray-100 flex flex-col">
      <form class="m-5 w-4/12" @submit.prevent="updateData">
        <div class="flex flex-col gap-4 px-0 py-2">
          <h2 class="font-bold text-2xl text-gray-600">Update bio:</h2>
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Avatar:</label>
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
              <path
                d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"
              />
              <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
            </svg>
            <span class="mt-2 text-base leading-normal">Select a file</span>
            <span class="mt-2 text-base leading-normal" v-if="bio.avatar">{{ bio.avatar.name }} </span>
            <input type="file" accept=".png" class="hidden" ref="avatarInput" @change="previewFiles" required />
          </label>
          <div>
            <label class="text-gray-700">Small bio</label>
            <input class="py-2 pl-2 border border-gray-200 w-full bg-gray-200 text-gray-700 focus:border-gray-100"
                   placeholder="Full time toast enjoyer" type="text" v-model="bio.bioSmall" />
          </div>
          <div>
            <label class="text-gray-700">Big bio</label>
            <textarea
              class="py-2 pl-2 border border-gray-200 w-full bg-gray-200 text-gray-700 focus:border-gray-100"
              placeholder="I enjoy eating toast and I also love rick astleys songs they are so good!!!"
              type="text"
              v-model="bio.bioBig"
            />
          </div>
          <div class="w-full flex flex-row gap-2">
            <button
              v-if="!uploading"
              class="p-2 border border-indigo-500 hover:bg-indigo-500 hover:text-white duration-100 ease-in-out w-2/12 text-indigo-500 p-0 flex flex-row justify-center items-center gap-1"
              type="submit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Send
            </button>
            <div v-if="uploading">
              <button
                class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded inline-flex items-center"
                value="Uploading">
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
          </div>
        </div>
      </form>
      <form class="m-5 w-4/12" @submit.prevent="updateInfo">
        <div class="flex flex-col gap-4 px-0 py-2">
          <h2 class="font-bold text-2xl text-gray-600">Update info:</h2>
          <div v-if="invalid2" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
               role="alert">
            <strong class="font-bold">{{ message2 }}</strong>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg @click="invalid2 = false" class="fill-current h-6 w-6 text-red-500" role="button"
                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>Close</title>
                <path
                  d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                />
              </svg>
            </span>
          </div>
          <div>
            <label class="text-gray-700">Username</label>
            <svg xmlns="http://www.w3.org/2000/svg" class="font-medium text-2xl text-gray-600 absolute p-2.5 px-3 w-11"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <input class="py-2 pl-10 border border-gray-200 w-full bg-gray-200 text-gray-700 focus:border-gray-100"
                   placeholder="Username" type="text" v-model="info.username" />
          </div>
          <div>
            <label class="text-gray-700">Email address</label>
            <svg xmlns="http://www.w3.org/2000/svg" class="font-medium text-2xl text-gray-600 absolute p-2.5 px-3 w-11"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            <input class="py-2 pl-10 border border-gray-200 w-full bg-gray-200 text-gray-700 focus:border-gray-100"
                   placeholder="Email address" type="email" v-model="info.email" />
          </div>
          <div>
            <label class="text-gray-700">Old Password</label>
            <svg xmlns="http://www.w3.org/2000/svg" class="font-medium text-2xl text-gray-600 absolute p-2.5 px-3 w-11"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <input class="py-2 pl-10 border border-gray-200 w-full bg-gray-200 text-gray-700 focus:border-gray-100"
                   placeholder="Password" type="password" v-model="info.password_old" />
          </div>
          <div>
            <label class="text-gray-700">New Password</label>
            <svg xmlns="http://www.w3.org/2000/svg" class="font-medium text-2xl text-gray-600 absolute p-2.5 px-3 w-11"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <input class="py-2 pl-10 border border-gray-200 w-full bg-gray-200 text-gray-700 focus:border-gray-100"
                   placeholder="Password" type="password" v-model="info.password_new" />
          </div>
          <div class="w-full flex flex-row gap-2">
            <button
              class="p-2 border border-indigo-500 hover:bg-indigo-500 hover:text-white duration-100 ease-in-out w-2/12 text-indigo-500 p-0 flex flex-row justify-center items-center gap-1"
              type="submit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import crypto from "crypto";

const hash = crypto.createHash("sha256");

export default {
  data() {
    return {
      bio: {
        avatar: undefined,
        bioSmall: undefined,
        bioBig: undefined
      },
      info: {
        username: undefined,
        email: undefined,
        password_old: undefined,
        password_new: undefined
      },
      invalid2: false,
      message2: undefined,
      uploading: false
    };
  },
  methods: {
    previewFiles() {
      const avatarFile = this.$refs.avatarInput.files[0];

      if (avatarFile) this.bio.avatar = avatarFile;
    },
    async updateData() {
      const bodyFormData = new FormData();

      if (this.bio.avatar !== undefined) bodyFormData.append("avatar", this.bio.avatar, this.bio.avatar.name);
      if (this.bio.bioSmall !== undefined) bodyFormData.append("bioSmall", this.bio.bioSmall);
      if (this.bio.bioBig !== undefined) bodyFormData.append("bioBig", this.bio.bioBig);

      let i = 0;
      bodyFormData.forEach(() => i++);
      if (i <= 0) return;

      console.log(this.bio);

      this.uploading = true;
      try {
        const resp = await this.$axios.post("/api/user/updatedata", bodyFormData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        await this.$router.push({
          path: "/user",
          query: {
            id: resp.data.id
          }
        });
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
      this.uploading = false;
    },
    async updateInfo() {
      try {
        let response = await this.$axios.post("/api/user/updateinfo", {
          username: this.info.username,
          email: this.info.email,
          oldPassword: this.info.password_old ? hash.update(this.info.password_old).digest("hex") : undefined,
          newPassword: this.info.password_old ? hash.update(this.info.password_new).digest("hex") : undefined
        });

        if (response.data.success) {
          await this.$router.push("/");
        } else {
          this.message = response.data.errorMessage;
          this.invalid = true;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
