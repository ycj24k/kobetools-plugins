export default {
  install(Vue) {
    let components = require.context('@/components/', true, /\.vue$/);
    components.keys().forEach((key) => {
      let name = key.slice(2, key.lastIndexOf('.')).replace('/', '-');
      Vue.component('kb-plugins-' + name, components(key).default);
    });
  },
};
