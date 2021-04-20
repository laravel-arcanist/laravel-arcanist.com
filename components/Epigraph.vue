<template>
  <figure class="w-full">
    <blockquote
      class="italic text-2xl font-light font-serif text-gray-500 border-none px-20"
    >
      <slot />
    </blockquote>

    <figcaption class="block text-right text-gray-500 px-12 italic">
      &mdash; {{ author }}
    </figcaption>
  </figure>
</template>

<script>
export default {
  props: {
    author: { required: true },
  },
};
</script>
