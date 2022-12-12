const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "st3e19",
  e2e: {
    baseUrl: "https://buger-eats-qa.vercel.app",
    viewportWidth: 1440,
    viewportWidth: 900,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
