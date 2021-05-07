<template>
  <figure class="w-full">
    <blockquote
      class="italic text-xl md:text-2xl font-light font-serif text-gray-500 border-none md:px-12"
      v-html="displayText"
    ></blockquote>

    <figcaption class="block text-right text-gray-500 md:px-12 italic">
      &mdash; {{ author }}
    </figcaption>
  </figure>
</template>

<script>
export default {
  props: {
    author: { required: true },
    text: { required: true },
  },

  computed: {
    displayText() {
      return this.text.replace(/\n/g, "<br />");
    },
  },
};
</script>
