const { defineConfig } = require("@vue/cli-service");
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
  outputDir: process.env.NODE_ENV === "development" ? "dist" : "plugins/webmaster_tools/",
  publicPath: process.env.NODE_ENV === "development" ? "/plugins" : "/plugins/webmaster_tools/",
  productionSourceMap: process.env.NODE_ENV === "development" ? true : false,
  chainWebpack: (config) => {
    config.plugins.delete("prefetch");
    config.plugins.delete("preload");
  },
});
