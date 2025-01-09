import axios from "axios";
import {Message} from "@arco-design/web-vue";
import {showErrorNotification} from "@/hooks/useNotification";


const host = "http://hw.izbw.net";

function post(url, data, callback=()=>{}, errCallback=()=>{}){
    axios.post(host+url, data).then((res) => {
        let result = res.data;
        if (result.code === 200 && result.hasOwnProperty("data")){
            callback(result);
        }else{
            showErrorNotification(result.msg)
            errCallback();
        }
    }).catch(error => {
        Message.error(error.response.data.msg);
        errCallback();
    })
}

function download(url, data, fileName, callback=()=>{}){
    let config = {
        method: 'post',
        url: host+url,
        data: data,
        responseType: 'blob',
    };
    axios(config)
        .then((response) => downloadFile(response, fileName, callback))
        .catch((error) => downloadFile(error.response, fileName, callback));
}

function downloadFile(response, fileName="导出文件.xlsx", callback){
    callback();
    const blob = new Blob([response.data]);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(link.href);
}

export {
    post, download
}