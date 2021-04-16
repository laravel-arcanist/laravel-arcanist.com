<template>
  <article class="prose prose-purple">
    <h1>{{ page.title }}</h1>
    <NuxtContent :document="page" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const slug = params.slug || "index";
    const page = await $content(slug).fetch();

    return { page };
  },
};
</script>

<style>
.nuxt-content-highlight {
  @apply relative;
}

pre[class*="language-"] {
  @apply font-mono text-sm;
}

.filename {
  @apply absolute bottom-0 left-0 w-full bg-white bg-opacity-10 text-gray-300 text-sm px-6 py-3 border-t border-gray-600 tracking-wide;
}

.filename + pre[class*="language-"] {
  @apply pb-16;
}
</style>
