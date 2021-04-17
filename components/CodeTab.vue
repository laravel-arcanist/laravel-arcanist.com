<template>
  <div v-show="isActive">
    <slot />
  </div>
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
      isActive: false,
    };
  },
};
</script>
