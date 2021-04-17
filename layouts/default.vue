<template>
  <div class="pb-20">
    <Header />

    <div class="max-w-6xl mx-auto pt-8 flex px-6 xl:px-0 mt-12">
      <Sidebar />

      <div class="flex-1 pl-16">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<style>
h1,
h2,
h3,
h4,
h5,
h6 {
  @apply font-sans;
}
</style>
