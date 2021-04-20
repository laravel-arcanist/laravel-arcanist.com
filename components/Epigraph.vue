<template>
  <figure class="px-10 w-full">
    <blockquote
      class="italic text-2xl font-light font-serif text-gray-500 border-none"
    >
      <slot />
    </blockquote>

    <figcaption class="block text-right">&mdash; {{ author }}</figcaption>
  </figure>
</template>

<script>
export default {
  props: {
    author: { required: true },
  },
};
</script>
