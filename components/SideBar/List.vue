<template>
  <div class="overflow-y-auto overflow-x-hidden flex-grow">
    <ul class="flex flex-col py-2 space-y-1">
      <SideBarHead :title="'Menu'"></SideBarHead>
      <li>
        <a
          href="/"
          class="
            relative
            flex flex-row
            items-center
            h-11
            focus:outline-none
            hover:bg-gray-50
            text-gray-600
            hover:text-gray-800
            border-l-4 border-transparent
            hover:border-indigo-500
            pr-6
          "
        >
          <span class="inline-flex justify-center items-center ml-4">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
          </span>
          <span class="ml-2 text-sm tracking-wide truncate">Home</span>
        </a>
      </li>
      <li>
        <a
          href="/inbox"
          class="
            relative
            flex flex-row
            items-center
            h-11
            focus:outline-none
            hover:bg-gray-50
            text-gray-600
            hover:text-gray-800
            border-l-4 border-transparent
            hover:border-indigo-500
            pr-6
          "
        >
          <span class="inline-flex justify-center items-center ml-4">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              ></path>
            </svg>
          </span>
          <span class="ml-2 text-sm tracking-wide truncate">Inbox</span>
          <SideBarNotification
            :class="['text-indigo-500', 'bg-indigo-50']"
            :text="'New'"
          ></SideBarNotification>
        </a>
      </li>
      <li>
        <a
          href="/notifications"
          class="
            relative
            flex flex-row
            items-center
            h-11
            focus:outline-none
            hover:bg-gray-50
            text-gray-600
            hover:text-gray-800
            border-l-4 border-transparent
            hover:border-indigo-500
            pr-6
          "
        >
          <span class="inline-flex justify-center items-center ml-4">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              ></path>
            </svg>
          </span>
          <span class="ml-2 text-sm tracking-wide truncate">Notifications</span>
          <SideBarNotification
            :class="['text-red-500', 'bg-red-50']"
            :text="'1.2k'"
          ></SideBarNotification>
        </a>
      </li>
      <SideBarHead :title="'Content'" v-if="this.$auth.loggedIn"></SideBarHead>
      <li v-if="this.$auth.loggedIn">
        <a
          href="/upload"
          class="
            relative
            flex flex-row
            items-center
            h-11
            focus:outline-none
            hover:bg-gray-50
            text-gray-600
            hover:text-gray-800
            border-l-4 border-transparent
            hover:border-indigo-500
            pr-6
          "
        >
          <span class="inline-flex justify-center items-center ml-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </span>
          <span class="ml-2 text-sm tracking-wide truncate">Upload</span>
        </a>
      </li>
      <SideBarHead :title="'User'"></SideBarHead>
      <li v-if="this.$auth.loggedIn">
        <a
          href="/profile"
          class="
            relative
            flex flex-row
            items-center
            h-11
            focus:outline-none
            hover:bg-gray-50
            text-gray-600
            hover:text-gray-800
            border-l-4 border-transparent
            hover:border-indigo-500
            pr-6
          "
        >
          <span class="inline-flex justify-center items-center ml-4">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
          </span>
          <span class="ml-2 text-sm tracking-wide truncate">Profile</span>
        </a>
      </li>
      <li v-if="this.$auth.loggedIn">
        <a
          href="/settings"
          class="
            relative
            flex flex-row
            items-center
            h-11
            focus:outline-none
            hover:bg-gray-50
            text-gray-600
            hover:text-gray-800
            border-l-4 border-transparent
            hover:border-indigo-500
            pr-6
          "
        >
          <span class="inline-flex justify-center items-center ml-4">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
          </span>
          <span class="ml-2 text-sm tracking-wide truncate">Settings</span>
        </a>
      </li>
      <li v-if="this.$auth.loggedIn">
        <a
          href="#"
          class="
            relative
            flex flex-row
            items-center
            h-11
            focus:outline-none
            hover:bg-gray-50
            text-gray-600
            hover:text-gray-800
            border-l-4 border-transparent
            hover:border-indigo-500
            pr-6
          "
        >
          <span class="inline-flex justify-center items-center ml-4">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
          </span>
          <span class="ml-2 text-sm tracking-wide truncate" @click="userLogout"
          >Logout</span
          >
        </a>
      </li>
      <li v-if="!this.$auth.loggedIn">
        <a
          href="/login"
          class="
            relative
            flex flex-row
            items-center
            h-11
            focus:outline-none
            hover:bg-gray-50
            text-gray-600
            hover:text-gray-800
            border-l-4 border-transparent
            hover:border-indigo-500
            pr-6
          "
        >
          <span class="inline-flex justify-center items-center ml-4">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
          </span>
          <span class="ml-2 text-sm tracking-wide truncate">Login</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  auth: false,
  methods: {
    async userLogout() {
      try {
        let response = await this.$auth.logout();
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
