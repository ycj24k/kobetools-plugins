import axios from 'axios';
//关键词过滤--文字版
export function keywordfiltertext(data) {
  return axios.post('/api/front/keyword/filter/text', data);
}

//关键词过滤--文件上传
export function keywordfiltertextfile(data) {
  return axios.post('/api/front/keyword/filter/file/stream', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

//关键词分组--文字版
export function keywordfiltergroup(data) {
  return axios.post('/api/front/keyword/filter/group', data);
}

//关键词分组--文件上传
export function keywordfiltergroupfile(data) {
  return axios.post('/api/front/keyword/filter/group/file', data);
}

//关键词对比--文字版
export function keywordcomparetext(data) {
  return axios.post('/front/keyword-compare/compare', data);
}

//关键词对比--文件上传
export function keywordcomparefile(data) {
  return axios.post('/front/keyword-compare/compare-files', data);
}

