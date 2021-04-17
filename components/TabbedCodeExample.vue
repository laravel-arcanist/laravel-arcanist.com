<template>
  <div class="tabbed-code-example">
    <div class="rounded-t bg-gray-700 pt-2 px-2">
      <button
        v-for="(file, i) in files"
        :key="i"
        class="text-white text-xs px-4 py-2 font-mono border-b-2 rounded-none hover:bg-gray-800 outline-none active:outline-none transition duration-300"
        :class="{
          'bg-gray-800 border-indigo-500 text-white': file.isActive,
          'border-transparent': !file.isActive,
        }"
        @click="selectFile(file)"
      >
        {{ file.name }}
      </button>
    </div>

    <slot />
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: [],
    };
  },

  created() {
    this.files = this.$children;
  },

  mounted() {
    this.files[0].isActive = true;
  },

  methods: {
    selectFile(file) {
      this.files.forEach((f) => (f.isActive = f.name === file.name));
    },
  },
};
</script>

<style>
.tabbed-code-example pre[class*="language-"] {
  @apply m-0 text-sm;
}
</style>
