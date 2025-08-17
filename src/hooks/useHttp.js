import axios from 'axios';
import { Message } from '@arco-design/web-vue';
import { showErrorNotification } from '@/hooks/useNotification';

let host = 'http://hw.izbw.net';

function post(url, data, callback = () => { }, errCallback = () => { }) {
    if (url.indexOf('/api/front/') != -1) {
        host = 'http://39.108.112.20:20001';
    }
    axios
        .post(host + url, data)
        .then((res) => {
            if (res.code === 200 && res.hasOwnProperty('data')) {
                callback(res);
            } else {
                showErrorNotification(res.msg || res.message);
                errCallback();
            }
        })
        .catch((error) => {
            console.log(error)
            Message.error(error.response.data.msg || error.response.data.message);
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
        .catch((error) => downloadFile(error.response, fileName, callback));
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
