<template>
  <div class="flex flex-1 overflow-hidden px-16 py-20">
    <article class="prose xl:prose-lg prose-purple w-full">
      <h1>{{ page.title }}</h1>

      <Epigraph
        v-if="page.epigraph"
        :author="page.epigraph.author"
        :text="page.epigraph.text"
      />

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
  head() {
    return {
      title:
        this.page.slug === "index"
          ? "Arcanist - Magical multi-step forms"
          : `${this.page.title} - Arcanist`,
    };
  },

  async asyncData({ $content, params }) {
    const slug = params.slug || "index";
    const page = await $content(slug).fetch();

    return { page };
  },

  mounted() {
    setTimeout(() => Prism.highlightAll(), 150); // Hello darkness my old friend...
  },
};
</script>
