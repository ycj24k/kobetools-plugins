import axios from 'axios';
export function supportList() {
  return axios.get('/api/tool/keyword/support');
}
export function keywordTaskAdd(data) {
  return axios.post('/api/tool/keyword/adds', data);
}

//AI挖词
export function keywordTaskAdddiscover(data) {
  return axios.post('/api/front/keywords/discover', data);
}

export function keywordTaskDel(data) {
  return axios.post('/api/tool/keywordTask/delete', data);
}

export function keywordTaskList(data) {
  return axios.post('/api/front/keywords/list', data);
}

export function keywordTaskClean(data) {
  return axios.post('/api/tool/keywordTask/clean', data);
}

export function keywordTaskOut(data) {
  return axios.post('/api/tool/keywordTask/out', data);
}

export function keywordTaskSave(data) {
  return axios.post('/api/front/keywords/save', data);
}

export function keywordMyList(params) {
  return axios.get(`/api/front/keywords/detail/${params.taskId}`, params);
}

export function keywordMyListAll(params) {
  return axios.get('/api/tool/keywordMy/all', {params});
}

export function keywordMySave(taskId, data) {
  return axios.post(`/api/front/keywords/${taskId}/detail/save`, data);
}

export function keywordMyDel(taskId, detailId) {
  return axios.post(`/api/front/keywords/${taskId}/delete/${detailId}`, {});
}

export function keywordMyAdd(data) {
  return axios.post('/api/tool/keywordMy/adds', data);
}
