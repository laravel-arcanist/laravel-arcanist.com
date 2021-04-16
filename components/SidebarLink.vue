<template>
  <NuxtLink
    :to="to"
    class="py-1 w-full inline-block tracking-wide"
    :class="linkClasses"
  >
    <slot></slot>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },

  computed: {
    active() {
      return this.$nuxt.$route.path === this.to;
    },

    linkClasses() {
      return this.active
        ? "bg-indigo-100 text-indigo-800 rounded-r-sm border-l-4 border-indigo-400 pl-3 pr-2 -ml-3 bg-opacity-75"
        : "text-gray-600 transition duration-150 hover:text-purple-700";
    },
  },
};
</script>
