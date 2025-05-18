import axios from 'axios';

export function wordAdd(data) {
  return axios.post('/api/tool/word/adds', data);
}

export function wordDel(data) {
  return axios.post('/api/tool/word/delete', data);
}

export function wordList(params) {
  return axios.get('/api/tool/word/list', {params});
}

export function wordSave(params) {
  return axios.get('/api/tool/word/save', {params});
}

export function wordGroupList(params) {
  return axios.get('/api/tool/wordGroup/list', {params});
}

export function wordGroupSave(params) {
  return axios.get('/api/tool/wordGroup/save', {params});
}
