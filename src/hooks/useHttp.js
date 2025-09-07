import axios from 'axios';
import { Message, Modal } from '@arco-design/web-vue';
import { showErrorNotification } from '@/hooks/useNotification';

let host = 'http://hw.izbw.net';

// 处理429状态码的弹窗
function handle429Error(response) {
    const message = response.msg || response.message || '您当前日查询额度上限为100个，当前已使用98，更多查询额度可通过升级VIP权限获取。';
    
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
}

function post(url, data, callback = () => { }, errCallback = () => { }) {
    if (url.indexOf('/api/front/') != -1) {
        host = 'http://39.108.112.20:20001';
    }
    axios
        .post(host + url, data)
        .then((res) => {
            if (res.code === 200 && res.hasOwnProperty('data')) {
                callback(res);
            } else if (res.code === 429) {
                // 处理429状态码
                handle429Error(res);
                errCallback();
            } else {
                showErrorNotification(res.msg || res.message);
                errCallback();
            }
        })
        .catch((error) => {
            console.log(error)
            Message.error(error.msg || error.message);
            errCallback();
        });
}

function download(url, data, fileName, callback = () => { }) {
    if (url.indexOf('/api/front/') != -1) {
        host = 'http://39.108.112.20:20001';
    }
    let config = {
        method: 'post',
        url: host + url,
        data: data,
        responseType: 'blob',
    };
    axios(config)
        .then((response) => downloadFile(response, fileName, callback))
        .catch((error) => downloadFile(error, fileName, callback));
}

function downloadFile(response, fileName = `KB-results-${Date.now()}.xlsx`, callback) {
    callback();
    const blob = new Blob([response.data]);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(link.href);
}

export { post, download };
