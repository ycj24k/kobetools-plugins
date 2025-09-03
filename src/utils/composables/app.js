import { ref, onMounted, h, computed } from 'vue';
import { useAppStore } from '@/store';
import useTxy from './ali';
import { Message, Modal, Form, FormItem, Input } from '@arco-design/web-vue';
import { getDateTime } from '@/utils';
import { storageUpload } from '@/api/workspace/workspace';
import axios from 'axios';

export default function useApp() {
  const appStore = useAppStore();
  const { fetchFileList, transformFileData, sts: ossService, del, add, rename, contents } = useTxy();
  const list = computed(() => appStore.list);
  const breadcrumb = computed(() => appStore.breadcrumb);
  const percent = computed(() => appStore.percent);
  const tip = computed(() => appStore.tip);
  const fileList = computed(() => appStore.fileList);
  const prefix = computed(() => appStore.prefix);
  const formData = ref({
    title: '',
    label: '',
    name: '',
    type: '',
    rName: '',
  });
  const modalInfo = ref(null);
  let monacoEditor = null;
  const content = ref(null);
  const contentType = ref(null);
  const formDataCancel = async () => {
    formData.value.title = '';
    formData.value.label = '';
    formData.value.name = '';
    formData.value.type = '';
    formData.value.rName = '';
    await onRefresh();
  };
  const modal1 = async (data = null) => {
    modalInfo.value = Modal.info({
      title: formData.value.title,
      width: '450px',
      closable: false,
      hideCancel: false,
      content: () =>
        h({
          setup() {
            return () =>
              h('div', { class: 't-modal-content' }, [
                h(
                  Form,
                  { model: formData.value, layout: 'vertical', style: { overflow: 'hidden' } },
                  {
                    default: () =>
                      h(
                        FormItem,
                        { field: 'name', label: formData.value.label },
                        {
                          default: () =>
                            h(Input, {
                              'modelValue': formData.value.name,
                              'onUpdate:modelValue': (value) => {
                                formData.value.name = value;
                              },
                              'placeholder': '',
                            }),
                        }
                      ),
                  }
                ),
              ]);
          },
        }),
      onBeforeOk: async () => {
        if (formData.value.name === '') {
          Message.error(formData.value.label + '不能为空');
          return false;
        }
        if (formData.value.type === 'd' || formData.value.type === 'f') {
          const type = formData.value.type === 'd' ? '/' : '';
          await add(formData.value.name + type);
        }
        if (formData.value.type === 'r') {
          await rename(formData.value.name, formData.value.rName);
          const result = appStore.list.find((item) => item.key === data.key);
          result.name = formData.value.name;
        }
        await formDataCancel();
        return true;
      },
      onCancel: async () => {
        await formDataCancel();
      },
    });
  };

  const onDetail = (data) => {
    modalInfo.value = Modal.info({
      title: '文件详情',
      width: '600px',
      footer: false,
      content: () =>
        h({
          setup() {
            return () =>
              h('div', { class: 't-detail' }, [
                data.name &&
                  h('div', [
                    h('div', { class: 't-detail-tit' }, '文件名'),
                    h('div', { class: 't-detail-txt' }, [
                      data.name,
                      h('icon-copy', {
                        style: { cursor: 'pointer' },
                        onClick: () => onCopy(data.name),
                      }),
                    ]),
                  ]),
                data.size && h('div', [h('div', { class: 't-detail-tit' }, '大小'), h('div', { class: 't-detail-txt' }, `${data.size / 1000} KB`)]),
                data.uptime && h('div', [h('div', { class: 't-detail-tit' }, '修改时间'), h('div', { class: 't-detail-txt' }, getDateTime(data.uptime))]),
                data.sha && h('div', [h('div', { class: 't-detail-tit' }, 'ETag'), h('div', { class: 't-detail-txt' }, data.sha)]),
                data.url &&
                  h('div', [
                    h('div', { class: 't-detail-tit' }, '地址'),
                    h('div', { class: 't-detail-txt' }, [
                      data.url,
                      h('icon-copy', {
                        style: { cursor: 'pointer' },
                        onClick: () => onCopy(data.url),
                      }),
                    ]),
                  ]),
              ]);
          },
        }),
      onBeforeOk: async () => {},
      onCancel: async () => {},
    });
  };
  const EditContent = {
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const editor = ref(null);
      onMounted(async () => {
        const res = await axios.get(props.data.url);
        contentType.value = res.headers['content-type'];
        content.value = res.data.toString();
        await onChange();
      });
      const onSuffix = (key) => {
        const parts = key.split('.');
        const suffix = parts.pop();
        const languageMap = {
          ts: 'typescript',
          js: 'javascript',
          html: 'html',
          css: 'css',
          json: 'json',
          py: 'python',
          java: 'java',
          cpp: 'cpp',
          c: 'c',
          cs: 'csharp',
          php: 'php',
          go: 'go',
          rb: 'ruby',
          rs: 'rust',
          sh: 'shell',
          sql: 'sql',
          xml: 'xml',
          yaml: 'yaml',
          yml: 'yaml',
          md: 'markdown',
          txt: 'plaintext',
        };
        return languageMap[suffix] || 'plaintext';
      };
      const onChange = async () => {
        const language = onSuffix(props.data.key);
        console.log(language);
        console.log(contentType.value);
        console.log(content.value);
        monacoEditor = monaco.editor.create(editor.value, {
          value: '',
          language,
          automaticLayout: true,
          tabSize: 2,
          overviewRulerBorder: false,
          scrollBeyondLastLine: false,
          minimap: {
            enabled: false, // 不要小地图
          },
          theme: 'vs',
          fontSize: '14px',
          autoIndent: true, //自动布局
        });
        monacoEditor.onDidChangeModelContent(() => {
          content.value = monacoEditor.getValue();
        });
        monacoEditor.setValue(content.value);
      };
      return () =>
        h('div', {
          ref: editor,
          class: 't-editor',
        });
    },
  };
  const onEditCancel = () => {
    if (monacoEditor) {
      monacoEditor.dispose();
      monacoEditor = null;
    }
    content.value = '';
    contentType.value = '';
    // modalInfo.value.close();
  };
  const onEdit = async (data) => {
    modalInfo.value = Modal.info({
      title: data.key,
      width: '1200px',
      okText: '确认编辑',
      closable: false,
      hideCancel: false,
      content: () => h(EditContent, { data }),
      onOk: async () => {
        await add(data.name, [content.value], contentType.value);
        onEditCancel();
      },
      onCancel: async () => {
        onEditCancel();
      },
    });
  };

  const onAdd = async (data) => {
    formData.value.title = data;
    formData.value.label = data === '新建文件夹' ? '文件夹名' : '文件名';
    formData.value.name = '';
    formData.value.type = data === '新建文件夹' ? 'd' : 'f';
    formData.value.rName = '';
    await modal1();
  };

  const onRename = async (data) => {
    const value = JSON.parse(JSON.stringify(data));
    formData.value.title = '重命名';
    formData.value.label = '名称';
    formData.value.name = value.name;
    formData.value.type = 'r';
    formData.value.rName = value.name;
    await modal1(value);
  };

  const onDelete = async (data) => {
    if (data.fileExtension === 'folder') {
      const fileList = await contents(data.key);
      if (fileList.length > 1) {
        return Message.warning('文件目录下有文件');
      }
    }
    await del([data.key]);
    const index = appStore.list.findIndex((item) => item.key === data.key);
    appStore.list.splice(index, 1);
    Message.success('删除成功');
  };

  const onOpen = async (data) => {
    if (data === '删除') {
      const keys = appStore.keys;
      console.log(keys);
      if (keys.length === 0) {
        return Message.warning('请先选择文件');
      }
      for (let i = 0; i < keys.length; i++) {
        const result = appStore.list.find((item) => item.key === keys[i]);
        if (!result) {
          appStore.keys = [];
          return Message.warning('请先选择文件');
        }
        if (result.fileExtension === 'folder') {
          const fileList = await contents(keys[i]);
          if (fileList.length > 1) {
            appStore.keys = [];
            return Message.warning(result.name + ' 目录下有文件');
          }
        }
      }
      await del(keys);
      appStore.keys = [];
      for (let i = 0; i < keys.length; i++) {
        const index = appStore.list.findIndex((item) => item.key === keys[i]);
        appStore.list.splice(index, 1);
      }
      Message.success('删除成功');
    }
  };

  const onCopy = (data) => {
    if (window.isSecureContext) {
      navigator.clipboard.writeText(data).then((res) => {
        return Message.success('复制成功');
      });
    } else {
      const el = document.createElement('input');
      el.setAttribute('value', data);
      document.body.appendChild(el);
      el.select();
      document.execCommand && document.execCommand('copy');
      document.body.removeChild(el);
      return Message.success('复制成功');
    }
  };

  const onDownload = (data) => {
    // 创建一个链接并触发点击事件
    const a = document.createElement('a');
    a.href = data;
    // a.download = 'example.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // 释放 URL 对象
    URL.revokeObjectURL(url);
  };

  // 重构后的纯数据获取函数
  const getList = async (prefix = '', search = '', fileType = '') => {
    // 更新store状态
    await appStore.setPrefix(prefix);
    await appStore.setSearch(search);
    await appStore.setBreadcrumb(fileType);
    
    // 清空现有列表
    await appStore.setList([]);
    
    // 获取原始数据
    const ossData = await fetchFileList(prefix);
    
    // 更新分页状态
    await appStore.setPaginationState({
      isTruncated: ossData.isTruncated,
      nextMarker: ossData.nextMarker
    });
    
    // 更新 markers
    if (ossData.isTruncated && ossData.nextMarker) {
      await appStore.addMarker(ossData.nextMarker);
    } else {
      await appStore.addMarker('');
    }
    
    // 转换数据格式
    const transformedList = transformFileData(ossData, prefix);
    
    // 应用搜索过滤（如果有）
    let filteredList = transformedList;
    if (search) {
      filteredList = applySearchFilter(transformedList, search);
    }
    
    // 更新列表
    await appStore.setList(filteredList);
    
    return filteredList;
  };

  // 搜索过滤函数
  const applySearchFilter = (list, searchQuery) => {
    if (!searchQuery) return list;
    
    const arr = searchQuery.split(',');
    let filteredList = [...list];
    
    if (arr.length >= 2 && arr[0] === '1') {
      filteredList = filteredList.filter((item) => item.name.toLowerCase().includes(arr[1].toLowerCase()));
    }
    if (arr.length >= 2 && arr[0] === '2') {
      filteredList = filteredList.filter((item) => item.name.toLowerCase().startsWith(arr[1].toLowerCase()));
    }
    if (arr.length >= 2 && arr[0] === '3') {
      filteredList = filteredList.filter((item) => /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(item.name));
    }
    if (arr.length >= 2 && arr[0] === '4') {
      filteredList = filteredList.filter((item) => /\.(doc|docx|pdf|txt|xls|xlsx|ppt|pptx|md)$/i.test(item.name));
    }
    if (arr.length >= 2 && arr[0] === '5') {
      filteredList = filteredList.filter((item) => /\.(mp4|mov|avi|mkv|flv|wmv|webm)$/i.test(item.name));
    }
    if (arr.length >= 2 && arr[0] === '6') {
      filteredList = filteredList.filter((item) => /\.(mp3|wav|ogg|aac|flac)$/i.test(item.name));
    }
    if (arr.length >= 2 && arr[0] === '7') {
      filteredList = filteredList.filter((item) => /\.(js|html|css|json)$/i.test(item.name));
    }
    
    return filteredList;
  };

  const onInfo = async (data) => {
    if (data.fileExtension === 'folder') {
      await onMarker();
      await getList(data.key);
    }
    if (data.fileExtension === 'image') {
      appStore.imagePreview = data.url;
    }
    if (data.fileExtension === 'prev') {
      await onMarker();
      await getList(appStore.breadcrumb[appStore.breadcrumb.length - 2].prefix);
    }
    if (['code', 'txt'].includes(data.fileExtension)) {
      await onEdit(data);
    }
    if (data.fileExtension === '') {
      await onEdit(data);
    }
  };

  const get = async () => {
    try {
      const prefix = await ossService();
      await onMarker();
      await getList(prefix);
    } catch (error) {
      console.error('初始化获取文件列表失败:', error);
      throw error; // 重新抛出错误，让调用者处理
    }
  };

  const onBreadcrumb = async (prefix) => {
    await onMarker();
    await getList(prefix);
  };

  const onRefresh = async () => {
    await onMarker();
    await getList(appStore.prefix);
  };

  const isUpload = async () => {
    const { data } = await storageUpload();
    console.log(data);
    return data;
  };

  const onMarker = async () => {
    await appStore.resetMarkers();
  };

  return { get, getList, onMarker, onBreadcrumb, onRefresh, onDelete, onOpen, onCopy, onDownload, onRename, onAdd, onInfo, onDetail, onEdit, isUpload };
}
