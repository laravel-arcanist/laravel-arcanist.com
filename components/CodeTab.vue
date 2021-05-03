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
    },
  },

  data() {
    return {
      isActive: false,
    };
  },
};
</script>
