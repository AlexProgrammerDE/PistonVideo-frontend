<template>
  <div class="bg-white sm:bg-gray-50 min-h-screen w-screen flex flex-col justify-center items-center text-gray-800">
    <div class="bg-gray-100 shadow-none sm:shadow-lg px-8 sm:px-12 w-full xs:w-full sm:w-8/12 md:w-7/12 lg:w-7/12 xl:w-2/6 h-screen sm:h-auto py-8">
      <AuthHeader :title="'Reset Password'" />
      <form @submit.prevent="userLogin">
        <div class="flex flex-col gap-4 px-0 py-4">
          <div>
            <label class="text-gray-700">Email address</label>
            <svg class="font-medium text-2xl text-gray-600 absolute p-2.5 px-3 w-11" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
            </svg>
            <input v-model="login.email" class="py-2 pl-10 border border-gray-200 w-full bg-gray-200 text-gray-700 focus:border-gray-100" placeholder="Email address" type="email" />
          </div>
          <div class="w-full flex flex-row gap-2">
            <button
              class="p-2 border border-indigo-500 hover:bg-indigo-500 hover:text-white duration-100 ease-in-out w-6/12 text-indigo-500 p-0 flex flex-row justify-center items-center gap-1"
              type="submit"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
              </svg>
              Reset Password
            </button>
            <button
              class="border border-indigo-500 hover:bg-indigo-500 hover:text-white duration-100 ease-in-out w-6/12 text-indigo-500 p-0 flex flex-row justify-center items-center gap-1"
              onclick="location.href='/login'"
              type="button"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
              </svg>
              Back to Login
            </button>
          </div>
        </div>
      </form>
    </div>
    <div class="p-4">© PistonVideo 2021</div>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      login: {
        email: '',
      },
    };
  },
  methods: {
    async userLogin() {
      try {
        var email = this.email;

        await this.$axios.get('/api/user/forgotpassword', {
          params: {
            email: email,
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
