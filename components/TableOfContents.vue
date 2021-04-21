<template>
  <div class="sticky top-0 w-48 pt-20">
    <h3
      class="font-semibold text-gray-400 text-xs uppercase tracking-widest font-sans"
    >
      Contents
    </h3>

    <nav class="mt-3 space-y-2">
      <SidebarLink
        v-for="heading in headings"
        :to="`#${heading.id}`"
        :key="heading.id"
        :class="{ 'pl-6': heading.depth === 3 }"
      >
        {{ heading.text }}
      </SidebarLink>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    headings: { default: () => [] },
  },
};
</script>
