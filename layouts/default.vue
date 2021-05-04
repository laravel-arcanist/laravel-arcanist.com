<template>
  <div>
    <Header />

    <div class="max-w-6xl mx-auto flex flex-col md:flex-row px-6 xl:px-0">
      <Navigation
        class="hidden md:block w-56 flex-shrink-0 space-y-10 border-r border-gray-200 pt-20"
      />

      <Nuxt />

      <PortalTarget
        name="toc"
        class="hidden lg:block w-44 flex-shrink-0 pt-20"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
    };
  },
};
</script>

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
