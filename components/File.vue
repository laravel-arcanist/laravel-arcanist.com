<template>
  <pre
    v-if="isActive"
    v-highlightjs="code"
  ><code class="php rounded-b px-6 py-4 text-sm"><slot/></code></pre>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      code: null,
      isActive: false,
    };
  },

  created() {
    this.code = this.$slots.default;
  },
};
</script>
