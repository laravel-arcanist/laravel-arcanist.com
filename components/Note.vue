<template>
  <div
    class="mt-6 border-l-4 border-indigo-700 bg-indigo-100 bg-opacity-30 text-gray-700 px-6 py-6 rounded note"
  >
    <h4 v-if="title" class="font-bold tracking-wide font-sans m-0 mb-2">
      {{ title }}
    </h4>

    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: { default: null },
  },
};
</script>

<style>
.note > *:last-child {
  @apply mb-0;
}

.note p {
  @apply leading-relaxed;
}
</style>
