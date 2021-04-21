<template>
  <client-only>
    <div
      class="tabbed-code-example relative"
      :class="{ single: files.length === 1 }"
    >
      <div v-if="files.length > 1" class="rounded-t bg-gray-700 pt-2 px-2">
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

      <span
        v-else-if="files.length === 1 && activeFile"
        class="absolute top-0 right-0 mr-2 mt-2 px-2 py-1 rounded-lg bg-gray-500 text-gray-100 text-xs z-10"
      >
        {{ activeFile.name }}
      </span>

      <slot />
    </div>
  </client-only>
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

  methods: {
    selectFile(file) {
      this.files.forEach((f) => (f.isActive = f.name === file.name));
    },
  },

  computed: {
    activeFile() {
      return this.files.find((f) => f.isActive);
    },
  },

  watch: {
    files() {
      if (this.files.length > 0) {
        this.files[0].isActive = true;
      }
    },
  },
};
</script>

<style>
.tabbed-code-example pre[class*="language-"],
.tabbed-code-example pre[data-line] {
  @apply py-4 px-6;
}

.tabbed-code-example pre[class*="language-"] {
  @apply m-0 text-sm rounded-t-none;
}

.tabbed-code-example.single pre[class*="language-"] {
  @apply rounded-t;
}
</style>
