import axios from 'axios';

export function titleTaskAdd(data) {
  return axios.post('/api/tool/title/adds', data);
}

export function titleTaskDel(data) {
  return axios.post('/api/tool/titleTask/delete', data);
}

export function titleTaskList(params) {
  return axios.get('/api/tool/titleTask/list', {params});
}

export function titleTaskClean(data) {
  return axios.post('/api/tool/titleTask/clean', data);
}

export function titleTaskOut(data) {
  return axios.post('/api/tool/titleTask/out', data);
}

export function titleTaskSave(data) {
  return axios.post('/api/tool/titleTask/save', data);
}

export function titleMyList(params) {
  return axios.get('/api/tool/titleMy/list', {params});
}

export function titleMyListAll(params) {
  return axios.get('/api/tool/titleMy/all', {params});
}

export function titleMySave(data) {
  return axios.post('/api/tool/titleMy/save', data);
}

export function titleMyDel(data) {
  return axios.post('/api/tool/titleMy/delete', data);
}

export function titleMyAdd(data) {
  return axios.post('/api/tool/titleMy/adds', data);
}
