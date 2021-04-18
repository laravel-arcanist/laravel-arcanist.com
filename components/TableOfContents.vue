<template>
  <div class="sticky top-0">
    <h3
      class="font-semibold text-gray-400 text-xs uppercase tracking-widest font-sans"
    >
      Contents
    </h3>

    <nav class="mt-3 space-y-2">
      <SidebarLink
        v-for="heading in page.toc"
        :to="`#${heading.id}`"
        :key="heading.id"
        :class="{ 'pl-4': heading.depth === 3 }"
      >
        {{ heading.text }}
      </SidebarLink>
    </nav>
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
