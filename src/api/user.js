import axios from 'axios';
import { UserState } from '@/store/modules/user/types';

export function login(data) {
  return axios.post('/api/user/loginPassword', data);
}

export function registerEmailCode(data) {
  return axios.post('/api/user/registerEmailCode', data);
}

export function register(data) {
  return axios.post('/api/user/register', data);
}

export function logout() {
  return axios.post('/api/user/logout');
}

export function getUserInfo() {
  return axios.get('/api/user/info');
}

export function getMenuList() {
  return axios.get('/api/user/routes');
}

export function getLanguage(params) {
  return axios.get('/api/user/language', {params});
}