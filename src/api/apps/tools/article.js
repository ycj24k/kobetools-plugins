import axios from 'axios';

export function articleTaskAdd(data) {
  return axios.post('/api/tool/article/adds', data);
}

export function articleTaskAddText(data) {
  return axios.post('/api/tool/article/add_task', data);
}

export function articleTaskAddXg(data) {
  return axios.post('/api/tool/article/xg', data);
}

export function articleTaskDel(data) {
  return axios.post('/api/tool/articleTask/delete', data);
}

export function articleTaskList(params) {
  return axios.get('/api/tool/articleTask/list', {params});
}

export function articleTaskClean(data) {
  return axios.post('/api/tool/articleTask/clean', data);
}

export function articleTaskOut(data) {
  return axios.post('/api/tool/articleTask/out', data);
}

export function articleTaskSave(data) {
  return axios.post('/api/tool/articleTask/save', data);
}

export function articleMyList(params) {
  return axios.get('/api/tool/articleMy/list', {params});
}

export function articleMyListAll(params) {
  return axios.get('/api/tool/articleMy/all', {params});
}

export function articleMySave(data) {
  return axios.post('/api/tool/articleMy/save', data);
}

export function articleMyDel(data) {
  return axios.post('/api/tool/articleMy/delete', data);
}

export function articleMyAdd(data) {
  return axios.post('/api/tool/articleMy/adds', data);
}
