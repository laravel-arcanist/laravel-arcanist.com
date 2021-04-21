<template>
  <div class="flex flex-1 px-16">
    <article class="prose xl:prose-lg prose-purple w-full">
      <h1>{{ page.title }}</h1>

      <NuxtContent :document="page" />
    </article>

    <Portal to="toc">
      <TableOfContents :headings="page.toc" />
    </Portal>
  </div>
</template>

<script>
import Prism from "~/plugins/prism";

export default {
  async asyncData({ $content, params }) {
    const slug = params.slug || "index";
    const page = await $content(slug).fetch();

    return { page };
  },

  mounted() {
    setTimeout(() => Prism.highlightAll(), 150);
  },
};
</script>
