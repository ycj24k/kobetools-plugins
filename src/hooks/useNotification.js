import {Notification} from "@arco-design/web-vue";

function showInfoNotification(content){
    Notification.info({
        title: '系统提示',
        content: content,
        position: 'bottomRight'
    })
}

function showErrorNotification(content){
    Notification.error({
        title: '系统提示',
        content: content,
        position: 'bottomRight'
    })
}

export {
    showInfoNotification, showErrorNotification
}