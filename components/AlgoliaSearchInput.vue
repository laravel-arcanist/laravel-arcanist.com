<template>
  <input
    type="text"
    id="docsearch"
    class="rounded-full bg-gray-100 border py-2 px-6 border-gray-300 hidden md:block"
    placeholder="Search"
  />
</template>

<script>
export default {
  mounted() {
    // Avoid loading the script twice
    if (!document.getElementById("_algolia_doc_search_")) {
      const script = document.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.setAttribute(
        "src",
        "//cdn.jsdelivr.net/docsearch.js/2/docsearch.min.js"
      );
      script.setAttribute("id", "_algolia_doc_search_");
      script.onload = () => {
        this.initDocsearch();
      };
      document.body.appendChild(script);
    } else {
      this.initDocsearch();
    }

    document.addEventListener("keypress", (e) => {
      if (e.code === 47) {
        e.preventDefault();
        document.getElementById("docsearch").focus();
      }
    });
  },

  methods: {
    initDocsearch() {
      window.docsearch({
        apiKey: "6c1a88f225815290e167ef2dbc2a2924",
        indexName: "laravel-arcanist",
        inputSelector: "#docsearch",
        debug: false,
        autocompleteOptions: {
          openOnFocus: true,
          ariaLabel: true,
        },
      });
    },
  },
};
</script>
