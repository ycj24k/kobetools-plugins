import axios from 'axios';

export function storageDel(data) {
  return axios.post('/api/tool/storage/delete', data);
}

export function storageList(params) {
  return axios.get('/api/tool/storage/list', {params});
}

export function storageEdit(data) {
  return axios.post('/api/tool/storage/edit', data);
}

export function storageDetailList(params) {
  return axios.get('/api/tool/storage/detail', {params});
}

export function storageDetailDelete(data) {
  return axios.post('/api/tool/storage/detailDelete', data);
}

export function storageSts() {
  return axios.get('/api/tool/storage/sts', {});
}

export function storageUpload(data) {
  return axios.post('/api/tool/storage/upload', data);
}


export function innerlinkDel(data) {
  return axios.post('/api/tool/innerlink/delete', data);
}

export function innerlinkList(params) {
  return axios.get('/api/tool/innerlink/list', {params});
}

export function innerlinkEdit(data) {
  return axios.post('/api/tool/innerlink/edit', data);
}

export function innerlinkDetailList(params) {
  return axios.get('/api/tool/innerlinkDetail/list', {params});
}

export function innerlinkDetailSave(data) {
  return axios.post('/api/tool/innerlinkDetail/save', data);
}

export function innerlinkDetailDelete(data) {
  return axios.post('/api/tool/innerlinkDetail/delete', data);
}

export function innerlinkDetailEdit(data) {
  return axios.post('/api/tool/innerlinkDetail/edit', data);
}

export function innerlinkDetailUpload(data) {
  return axios.post('/api/tool/innerlinkDetail/upload', data);
}


export function AIAdd(data) {
  return axios.post('/api/tool/AI/adds', data);
}

export function AIDel(data) {
  return axios.post('/api/tool/AI/delete', data);
}

export function AIList(params) {
  return axios.get('/api/tool/AI/list', {params});
}