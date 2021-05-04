<template>
  <nav>
    <NavigationSection
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
            {
              to: "/getting-started",
              label: "Getting started",
            },
            {
              to: "/concepts",
              label: "Core concepts",
              disabled: true,
            },
          ],
        },
        {
          label: "The basics",
          items: [
            {
              to: "/wizards",
              label: "Wizards",
              disabled: true,
            },
            {
              to: "/steps",
              label: "Steps",
              disabled: true,
            },
            {
              to: "/actions",
              label: "Actions",
              disabled: true,
            },
            {
              to: "/configuration",
              label: "Configuration",
              disabled: true,
            },
          ],
        },
        {
          label: "Advanced",
          items: [
            {
              to: "/events",
              label: "Events",
              disabled: true,
            },
            {
              to: "/hooks",
              label: "Hooks",
              disabled: true,
            },
            {
              to: "/business-logic-in-steps",
              label: "Business logic in steps",
              disabled: true,
            },
            {
              to: "/dependencies-between-steps",
              label: "Dependencies between steps",
              disabled: true,
            },
            {
              to: "/dealing-with-expired-wizards",
              label: "Dealing with expired wizards",
              disabled: true,
            },
          ],
        },
        {
          label: "Extending Arcanist",
          items: [
            {
              to: "/writing-repositories",
              label: "Custom Wizard repositories",
              disabled: true,
            },
            {
              to: "/writing-response-renderers",
              label: "Response renderers",
              disabled: true,
            },
          ],
        },
      ],
    };
  },
};
</script>
