import axios from 'axios';

export function cmsAdd(data) {
  return axios.post('/api/tool/cms/adds', data);
}

export function cmsDel(data) {
  return axios.post('/api/tool/cms/delete', data);
}

export function cmsList(params) {
  return axios.get('/api/tool/cms/list', {params});
}

