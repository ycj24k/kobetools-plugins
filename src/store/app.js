import { defineStore } from 'pinia';
import { removeTrailingSlash } from '@/utils';

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      userToken: localStorage.getItem('kobetoolsToken'),
      sts: {},
      list: [],
      keys: [],
      mode: 1,
      breadcrumb: [],
      prefix: '',
      fileList: [],
      percent: 0,
      slider: 100,
      tip: '',
      imagePreview: '',
      isTruncated: false,
      delimiter: '/',
      search: '',
      maxKeys: 60,
      markers: [''],
      prevMarker: '',
      nextMarker: '',
      fileType: 'all', // 新增：当前页面的文件类型
      typeLabels: {
        'document': '我的文档',
        'image': '我的图片', 
        'video': '我的视频',
        'audio': '我的音频',
        'all': '在线文件'
      }
    };
  },
  getters: {},
  actions: {
    async setSts(data) {
      this.sts = data;
      return data;
    },

    async setTip(data) {
      this.tip = data;
      return data;
    },

    async setPercent(data) {
      this.percent = data;
      return data;
    },

    async setFileList(data) {
      this.fileList = data;
      return data;
    },

    async setPrefix(data) {
      this.prefix = data;
      return data;
    },

    async setSearch(data) {
      this.search = data;
      return data;
    },

    async setList(data) {
      this.list = data;
      return data;
    },

    // 新增：设置文件类型
    async setFileType(fileType) {
      this.fileType = fileType;
      return fileType;
    },

    async setBreadcrumb(fileType = null) {
      // 如果没有传入fileType，使用store中的fileType
      const currentFileType = fileType || this.fileType;
      
      const typeLabels = {
        'document': '我的文档',
        'image': '我的图片', 
        'video': '我的视频',
        'audio': '我的音频',
        'all': '在线文件'
      };
      
      let breadcrumb = [
        {
          prefix: '',
          label: typeLabels[currentFileType] || '我的空间',
        },
      ];
      
      if (this.prefix) {
        let arr = removeTrailingSlash(this.prefix).split('/');
        for (let i = 0; i < arr.length; i++) {
          breadcrumb.push({
            prefix: breadcrumb[i].prefix + arr[i] + '/',
            label: arr[i],
          });
        }
      }
      
      if (breadcrumb.length >= 3) {
        breadcrumb[0].prefix = breadcrumb[2].prefix;
        breadcrumb.splice(1, 2);
      }
      
      this.breadcrumb = breadcrumb;
    },

    // 设置分页相关状态
    async setPaginationState(data) {
      this.isTruncated = data.isTruncated || false;
      this.nextMarker = data.nextMarker || '';
      this.prevMarker = data.prevMarker || '';
      return data;
    },

    // 设置 markers
    async setMarkers(markers) {
      this.markers = markers || [''];
      return this.markers;
    },

    // 重置 markers
    async resetMarkers() {
      this.markers = [''];
      this.prevMarker = '';
      this.nextMarker = '';
      return this.markers;
    },

    // 添加 marker
    async addMarker(marker) {
      if (marker) {
        this.markers.push(marker);
      } else {
        this.markers.push('');
      }
      return this.markers;
    },

    async logout() {
      localStorage.removeItem('kobetoolsToken');
      this.userToken = null;
    },
  },
});
