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