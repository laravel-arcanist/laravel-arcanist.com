<template>
  <nav class="w-64 space-y-10 border-r border-gray-200 h-full">
    <SidebarSection
      v-for="(section, i) in sections"
      :key="i"
      :title="section.label"
      :items="section.items"
    />
  </nav>
</template>

<script>
export default {
  data() {
    return {
      sections: [
        {
          label: "Package",
          items: [
            {
              to: "/",
              label: "Introduction",
            },
            {
              to: "/installation",
              label: "Installation",
            },
          ],
        },
        {
          label: "The basics",
          items: [
            {
              to: "/concepts",
              label: "Core concepts",
            },
            {
              to: "/wizards",
              label: "Wizards",
            },
            {
              to: "/steps",
              label: "Steps",
            },
            {
              to: "/configuration",
              label: "Configuration",
            },
          ],
        },
        {
          label: "Advanced",
          items: [
            {
              to: "/events",
              label: "Events",
            },
            {
              to: "/hooks",
              label: "Hooks",
            },
            {
              to: "/business-logic-in-steps",
              label: "Business logic in steps",
            },
            {
              to: "/dependencies-between-steps",
              label: "Dependencies between steps",
            },
          ],
        },
        {
          label: "Extending Arcanist",
          items: [
            {
              to: "/writing-repositories",
              label: "Custom Wizard repositories",
            },
            {
              to: "/writing-response-renderers",
              label: "Response renderers",
            },
          ],
        },
      ],
    };
  },
};
</script>
