const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    externals:
      process.env.NODE_ENV === "development"
        ? {}
        : {
            vue: "Vue",
            "vue-router": "VueRouter",
            pinia: "Pinia",
            axios: "axios",
            "@arco-design/web-vue": "ArcoVue",
            "@arco-design/web-vue/es/icon": "ArcoVueIcon",
          },
    plugins: [],
  },
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  outputDir: process.env.NODE_ENV === "development" ? "dist" : "plugins/",
  publicPath: process.env.NODE_ENV === "development" ? "/" : "/plugins/",
  productionSourceMap: process.env.NODE_ENV === "development" ? true : false,
  chainWebpack: (config) => {
    config.plugins.delete("prefetch");
    config.plugins.delete("preload");
  },
});
