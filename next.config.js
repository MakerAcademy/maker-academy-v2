const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const nextTranslate = require("next-translate");

const nextConfig = {
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
  },
  webpack: (config, options) => {
    // config.module.rules.push({
    //   test: /\.tex|\.pdf/,
    //   type: "asset/resource",
    //   generator: {
    //     filename: "static/[hash][ext]",
    //   },
    // });
    // config.resolve.fallback = { fs: false };

    return config;
  },
};

module.exports = withPlugins([withImages, nextTranslate], nextConfig);
