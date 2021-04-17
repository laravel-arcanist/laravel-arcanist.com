<template>
  <div class="header">
    <div class="max-w-6xl mx-auto px-6 xl:px-0">
      <div class="py-12 flex items-center">
        <NuxtLink to="/" class="text-4xl font-serif text-indigo-700">
          Arcanist
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  @apply bg-no-repeat bg-center bg-cover;

  background-color: "#f5f6f7";
  background-image: url(~assets/img/header.png);
}
</style>
