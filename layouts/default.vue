<template>
  <div>
    <Header />

    <div class="max-w-6xl mx-auto flex px-6 xl:px-0">
      <Sidebar />

      <div class="flex-grow py-20">
        <Nuxt />
      </div>

      <PortalTarget name="toc" class="hidden xl:block w-44" />
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
  @apply font-serif;
}

code {
  @apply font-mono;
}

pre[class*="language-"] {
  @apply font-mono text-sm;
}
</style>
