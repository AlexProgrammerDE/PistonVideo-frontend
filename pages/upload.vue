<template>
  <div class="flex h-screen bg-gray-50 text-gray-800">
    <SideBarComponent />
    <form class="relative p-5">
      <h1 class="text-3xl">Upload Video</h1>
      <br />
      <label for="upload">Select your video here:</label>
      <br />
      <label
        class="
          w-64
          flex flex-col
          items-center
          px-4
          py-6
          bg-white
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"
          />
          <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
        </svg>
        <span class="mt-2 text-base leading-normal">Select a file</span>
        <input type="file" accept=".mp4" class="hidden" required/>
      </label>
      <br />
      <br />
      <input
        class="
          bg-blue-500
          hover:bg-blue-400
          text-white
          font-bold
          py-2
          px-4
          border-b-4 border-blue-700
          hover:border-blue-500
          rounded
        "
        type="submit"
        value="Upload"
      />
    </form>
  </div>
</template>
