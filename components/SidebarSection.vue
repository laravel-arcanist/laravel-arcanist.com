<template>
  <figure>
    <figcaption
      class="font-semibold text-gray-400 text-xs uppercase tracking-widest"
    >
      {{ title }}
    </figcaption>

    <ul class="space-y-1 mt-2">
      <li v-for="item in items" :key="item.to" class="pr-3">
        <SidebarLink :to="item.to" :disabled="item.disabled">
          {{ item.label }}
        </SidebarLink>
      </li>
    </ul>
  </figure>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>
