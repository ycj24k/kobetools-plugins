const { defineConfig } = require("@vue/cli-service");
process.env.VUE_APP_ABC = process.env.npm_config_abc
    ? process.env.npm_config_abc
    : "";
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    externals: {},
    plugins: [],
  },
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  outputDir:
      process.env.NODE_ENV === "development"
          ? "dist"
          : `plugins${process.env.VUE_APP_ABC}`,
  publicPath:
      process.env.NODE_ENV === "development" ? "/" : process.env.VUE_APP_ABC,
  productionSourceMap: process.env.NODE_ENV === "development" ? true : false,
  chainWebpack: (config) => {
    config.plugins.delete("prefetch");
    config.plugins.delete("preload");
  },
});
