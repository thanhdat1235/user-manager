const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify", "<rootDir>/node_modules/(?!lodash-es)"],
});
