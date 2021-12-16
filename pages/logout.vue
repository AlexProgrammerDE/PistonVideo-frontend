<template>
  <div class="bg-white sm:bg-gray-200 min-h-screen w-screen flex flex-col justify-center items-center">
    <div class="bg-white shadow-none sm:shadow-lg px-8 sm:px-12 w-full xs:w-full sm:w-8/12 md:w-7/12 lg:w-7/12 xl:w-2/6 h-screen sm:h-auto py-8">
      <AuthHeader :title="'Successfully logged out!'" />
      <a href="/">Click this to get back to the home page.</a>
    </div>
    <div class="p-4">© PistonVideo 2021</div>
  </div>
</template>

<script>
export default {};
</script>
