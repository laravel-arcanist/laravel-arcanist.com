<template>
  <NuxtLink
    v-if="!disabled"
    :to="to"
    class="py-1 w-full inline-block tracking-wide"
    :class="linkClasses"
  >
    <slot></slot>
  </NuxtLink>

  <span
    v-else
    class="py-1 w-full inline-block tracking-wide font-light italic text-gray-400"
  >
    <slot></slot>
  </span>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
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
