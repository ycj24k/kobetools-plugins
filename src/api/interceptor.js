import axios from 'axios';
import { Message, Modal } from '@arco-design/web-vue';

axios.defaults.baseURL = 'http://39.108.83.171';

axios.interceptors.request.use(
  (config) => {
    // let each request carry token
    // this example using the JWT token
    // Authorization is a custom headers key
    // please modify it according to the actual situation
    const token = localStorage.getItem('kobetoolsToken');
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers['access-token'] = `${token}`;
      config.headers['Authori-zation'] = `${token}`;
    }
    if (config.url.indexOf('/api/front/') != -1) {
      config.baseURL = 'http://39.108.112.20:20001';
    }
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);
// add response interceptors
axios.interceptors.response.use(
  (response) => {
    const res = response.data;
    console.log(res);
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200 && res.data !== 200) {
      // 处理429状态码
      if (res.code === 429) {
        const message = res.msg || res.message || '您当前日查询额度上限为100个，当前已使用98，更多查询额度可通过升级VIP权限获取。';
        
        Modal.confirm({
          title: '温馨提示',
          content: message,
          okText: '升级VIP权限',
          cancelText: '返回查询页面',
          onOk: () => {
            // 后期会跳转到对应页面
            console.log('跳转到VIP升级页面');
            // TODO: 跳转到VIP升级页面
          },
          onCancel: () => {
            // 关闭当前弹窗
            console.log('返回查询页面');
          }
        });
      } else if (res.code === 401) {
        Modal.error({
          title: 'reminder',
          content:
            'Your login has expired, would you like to log in again?',
          okText: 'Login again',
          async onOk() {
            window.microApp.dispatch({ type: 'logout' });
          },
        });
      } else {
        Message.error({
          content: res.msg || res.message || 'Error',
          duration: 3 * 1000,
        });
      }
      return Promise.reject(new Error(res.msg || res.message || 'Error'));
    }
    return res;
  },
  (error) => {
    Message.error({
      content: error.message || 'Request Error',
      duration: 3 * 1000,
    });
    return Promise.reject(error);
  }
);
