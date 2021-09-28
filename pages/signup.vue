<template>
  <div class="bg-white sm:bg-gray-50 min-h-screen w-screen flex flex-col justify-center items-center text-gray-800">
    <div class="bg-gray-100 shadow-none sm:shadow-lg px-8 sm:px-12 w-full xs:w-full sm:w-8/12 md:w-7/12 lg:w-7/12 xl:w-2/6 h-screen sm:h-auto py-8">
      <AuthHeader :title="'Sign-up'" />
      <form @submit.prevent="userLogin">
        <div v-if="invalid" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">{{ message }}</strong>
          <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg @click="invalid = false" class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path
                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
              />
            </svg>
          </span>
        </div>
        <div class="flex flex-col gap-4 px-0 py-4">
          <div>
            <label class="text-gray-700">Username</label>
            <svg xmlns="http://www.w3.org/2000/svg" class="font-medium text-2xl text-gray-600 absolute p-2.5 px-3 w-11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <input required class="py-2 pl-10 border border-gray-200 w-full bg-gray-200 text-gray-700 focus:border-gray-100" placeholder="Username" type="text" v-model="login.username" />
          </div>
          <div>
            <label class="text-gray-700">Email address</label>
            <svg xmlns="http://www.w3.org/2000/svg" class="font-medium text-2xl text-gray-600 absolute p-2.5 px-3 w-11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            <input required class="py-2 pl-10 border border-gray-200 w-full bg-gray-200 text-gray-700 focus:border-gray-100" placeholder="Email address" type="email" v-model="login.email" />
          </div>
          <div>
            <label class="text-gray-700">Password</label>
            <svg xmlns="http://www.w3.org/2000/svg" class="font-medium text-2xl text-gray-600 absolute p-2.5 px-3 w-11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <input required class="py-2 pl-10 border border-gray-200 w-full bg-gray-200 text-gray-700 focus:border-gray-100" placeholder="Password" type="password" v-model="login.password" />
          </div>
          <div>
            <label class="text-gray-700">Repeat Password</label>
            <svg xmlns="http://www.w3.org/2000/svg" class="font-medium text-2xl text-gray-600 absolute p-2.5 px-3 w-11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <input required class="py-2 pl-10 border border-gray-200 w-full bg-gray-200 text-gray-700 focus:border-gray-100" placeholder="Password" type="password" v-model="login.password_repeat" />
          </div>
          <div class="w-full flex flex-row gap-2">
            <button
              class="p-2 border border-indigo-500 hover:bg-indigo-500 hover:text-white duration-100 ease-in-out w-6/12 text-indigo-500 p-0 flex flex-row justify-center items-center gap-1"
              type="submit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Sign-up
            </button>
            <button
              class="border border-indigo-500 hover:bg-indigo-500 hover:text-white duration-100 ease-in-out w-6/12 text-indigo-500 p-0 flex flex-row justify-center items-center gap-1"
              onclick="location.href='/login'"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
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
import crypto from 'crypto';

var hash = crypto.createHash('sha256');

export default {
  auth: false,
  data() {
    return {
      login: {
        username: '',
        email: '',
        password: '',
        password_repeat: '',
      },
      invalid: false,
      message: undefined,
    };
  },
  methods: {
    async userLogin() {
      if (this.login.password !== this.login.password_repeat) {
        this.message = 'Repeated password does not match!';
        this.invalid = true;
        return;
      }

      try {
        var email = this.login.email;
        var password = hash.update(this.login.password).digest('hex');

        let response = await this.$axios.post('/api/user/register', {
          username: this.login.username,
          email: email,
          password: password,
        });

        if (response.data.success) {
          this.$auth
            .loginWith('local', {
              data: {
                email: email,
                password: password,
              },
            })
            .then(() => {
              this.$router.push('/');
            });
        } else {
          this.message = response.data.errorMessage;
          this.invalid = true;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
