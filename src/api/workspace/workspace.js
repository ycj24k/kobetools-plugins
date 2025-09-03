import axios from 'axios';

export function storagets() {
  return axios.get('/api/storage/sts');
}

export function storageUpload() {
  return axios.get('/api/storage/upload');
}