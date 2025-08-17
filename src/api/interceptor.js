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
    if (res.code !== 200) {
      Message.error({
        content: res.msg || 'Error',
        duration: 5 * 1000,
      });
      if (
        ['token error', '401'].includes(res.msg) &&
        response.config.url !== '/api/user/info'
      ) {
        Modal.error({
          title: 'reminder',
          content:
            'Your login has expired, would you like to log in again?',
          okText: 'Login again',
          async onOk() {
            
          },
        });
      }
      return Promise.reject(new Error(res.msg || 'Error'));
    }
    return res;
  },
  (error) => {
    Message.error({
      content: error.message || 'Request Error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);
