<template>
  <div class="flex flex-1 px-16">
    <article class="prose xl:prose-lg prose-purple">
      <h1>{{ page.title }}</h1>

      <NuxtContent :document="page" />
    </article>
  </div>
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
