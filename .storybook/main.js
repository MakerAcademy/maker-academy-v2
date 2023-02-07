const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.modules = [path.resolve(__dirname, ".."), "node_modules"];

    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.resolve(__dirname, "../src/components"),
      "@utils": path.resolve(__dirname, "../src/utils"),
      "@hooks": path.resolve(__dirname, "../src/hooks"),
      "@assets": path.resolve(__dirname, "../src/assets"),
      "@constants": path.resolve(__dirname, "../src/constants"),
      "@lib": path.resolve(__dirname, "../src/lib"),
      "@page-components": path.resolve(__dirname, "../src/page-components"),
    };

    return config;
  },
};
