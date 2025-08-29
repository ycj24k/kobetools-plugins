import { utils, writeFile, read } from 'xlsx';
import { h } from 'vue';
import { Modal } from '@arco-design/web-vue';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import {showErrorNotification} from "@/hooks/useNotification";

import router from '../router';

export const openWindow = (url, opts) => {
  const { target = '_blank', ...others } = opts || {};
  window.open(
    url,
    target,
    Object.entries(others)
      .reduce((preValue, curValue) => {
        const [key, value] = curValue;
        return [...preValue, `${key}=${value}`];
      }, [])
      .join(',')
  );
};

export const regexUrl = new RegExp('^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$', 'i');
// 导出excel
export const cdnStorage = (data) => {
  let pattern = /<img.*?src="\/calfaiStorage\/.*?".*?>/gi;
  let matches = data.match(pattern);
  if (matches) {
    matches.forEach((match) => {
      let replacement = match.replace('/calfaiStorage/', 'https://cdn.calfai.com/calfaiStorage/');
      data = data.replace(match, replacement);
    });
  }
  return data;
};
export const handleExport = (dataList, selectList, columns, name, type) => {
  let list = [];
  list[0] = columns.map((column) => column.title);
  const selects = dataList.filter((item) => selectList.includes(item.serialNumber));
  let datas = selects.length > 0 ? selects : dataList;
  datas.forEach((item) => {
    let row = [];
    columns.forEach((column) => {
      row.push(item[column.dataIndex]);
    });
    list.push(row);
  });
  // const widths = columns.map(column => column.colWidth);
  exportModal(list, [], '', type);
};
export const exportModal = async (list, widths, name, type) => {
  if (!list || !list.length) {
    showErrorNotification('暂无数据可导出')
    return
  }
  list = list ? list : [];
  let title = type === 'txt' ? '导出.txt文本压缩包' : '导出Excel表格';
  Modal.info({
    title: title,
    width: '600px',
    hideCancel: false,
    cancelText: '取消',
    okText: '确定',
    content: () =>
      h({
        setup() {
          return () => h('div', { class: 'info-modal-content' }, [h('div', { style: { marginBottom: '15px' } }, '是否导出当前页共计：' + (list.length - 1) + '条？'), h('div', {}, name ? '提示：需要操作当前所有内容，请先点击“加载全部”后再进行操作！' : '')]);
        },
      }),
    onOk: async () => {
      if (type && type === 'txt') {
        exportTxt(list);
      } else {
        exportExcel(list, name, widths);
      }
    },
  });
};
export const exportExcel = (data, title, widths) => {
  let arr = [];
  let name = 'KB-results-';
  if (title === 'KeywordMine') {
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].weight === 0) {
        arr.push([data[i].title, '']);
      } else {
        arr.push(['', data[i].title]);
      }
    }
  } else if (title === 'TitleMine') {
    for (let i = 0; i < data.length; i += 1) {
      arr.push([data[i].title, data[i].tags, data[i].keywords.join(',')]);
    }
    const model = [
      {
        field: 'title',
        label: '标题',
      },
      {
        field: 'tags',
        label: '相关tags',
      },
      {
        field: 'keywords',
        label: '关键词',
      },
    ];
    arr.unshift(model.map((item) => item.label));
    arr.unshift(model.map((item) => item.field));
  } else if (title === 'ArticleMine') {
    for (let i = 0; i < data.length; i += 1) {
      const content = cdnStorage(data[i].content);
      arr.push([data[i].title, content, data[i].json_extend?.keywords ? data[i].json_extend.keywords.join(',') : '', data[i].json_extend?.description ? data[i].json_extend.description : '']);
    }
  } else if (title === 'OtherInnerDetail') {
    for (let i = 0; i < data.length; i += 1) {
      arr.push([data[i].name, data[i].link, data[i].strong]);
    }
    const model = [
      {
        field: 'name',
        label: '名称',
      },
      {
        field: 'link',
        label: '链接',
      },
      {
        field: 'strong',
        label: '是否加粗（1为是，0为否）',
      },
    ];
    arr.unshift(model.map((item) => item.label));
    arr.unshift(model.map((item) => item.field));
  } else {
    arr = data;
  }
  let ws = utils.aoa_to_sheet(arr);
  let wb = utils.book_new();
  // 设置列宽
  if (ws['!cols'] === undefined) ws['!cols'] = [];
  if (widths.length > 0) {
    widths.forEach((width, index) => {
      ws['!cols'][index] = { wch: Math.max(width, 5) }; // 最小宽度为5
    });
  }
  utils.book_append_sheet(wb, ws, name + new Date().getTime());
  writeFile(wb, name + new Date().getTime() + '.csv');
};

export const exportTxt = (data) => {
  const zip = new JSZip();
  for (let i = 0; i < data.length; i += 1) {
    let file = '';
    let text = '';
    let content = '';
    file = data[i].title + '.txt';
    content = data[i].content || data[i].title;
    if (data[i].tags) {
      let keywords = data[i].keywords.join(',');
      content = `title：${data[i].title}\n\ntags：${data[i].tags}\n\nkeywords：${keywords}`;
    }
    text = cdnStorage(content);
    zip.file(file, text);
  }
  console.log(zip);
  zip.generateAsync({ type: 'blob' }).then(function (blob) {
    saveAs(blob, 'KB-results-' + new Date().getTime() + '.zip');
  });
};
export const getListFromExcel = (file) => {
  if (!file) return [];
  const reader = new FileReader();
  return new Promise((resolve, rejected) => {
    try {
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = read(data, { type: 'binary' }); // 读取Excel文件
        const sheetName = workbook.SheetNames[0]; // 获取第一个工作表的名称
        const worksheet = workbook.Sheets[sheetName]; // 获取工作表对象
        const excelData = utils.sheet_to_json(worksheet); // 将工作表转换为JSON数组
        // 处理excelData，如存入Vue的响应式数据中
        resolve(excelData);
      };
      reader.readAsBinaryString(file); // 读取文件内容
    } catch (error) {
      rejected([]);
    }
  });
};

export const getListFromZip = async (file) => {
  if (!file) return [];
  const zip = new JSZip();
  const content = await zip.loadAsync(file);
  let list = [];
  // 假设所有.txt文件有相同的结构
  for (const [fileName, fileData] of Object.entries(content.files)) {
    if (fileName.endsWith('.txt')) {
      const textContent = await fileData.async('string');
      list.push({
        title: fileName.replace('.txt', ''),
        content: textContent,
      });
    }
  }
  return list;
};
export const parseTxtContent = (content) => {
  // 这里假设.txt文件是以换行符分隔的行，以逗号分隔的列
  const lines = content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '');
  const parsedData = lines.map((line) => line.split(','));
  console.log(parsedData);
};

export const getExportName = (name) => {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, '0');

  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  return `${year}${month}${day}${hours}${minutes}${seconds}-${name}`;
};

// 跳转页面
export const jumpPage = (path, query = {}) => {
  if (window.microApp) {
    window.microApp.dispatch({ type: 'route', path, query });
  } else {
    router.push({
      path,
      query,
    });
  }
};

// 校验域名
export const validateDomains = (data) => {
  if (!data || typeof data !== 'string' || !data.trim()) return [];
  const lines = data.split('\n');

  // 正则表达式：验证标准域名格式
  const domainPattern = /^(?!-)[a-z0-9-]{1,63}(?<!-)(\.[a-z0-9-]{1,63}(?<!-))*\.[a-z]{2,}$/i;
  let output = [];
  lines.forEach((line, index) => {
    const domain = line.trim();
    if (domain === '') return; // 跳过空行

    // 验证域名长度（总长度<=253字符）和正则匹配
    const isValid = domain.length <= 253 && domainPattern.test(domain);
    if (isValid) {
      output.push(domain);
    }
  });

  return output || '无有效输入';
};
// 处理textarea
export const  processTextArea = (inputText, isDeep = true) => {
  if (!inputText.trim()) {
    return []
  }
  // 1. 按 \n 分割成数组
  const lines = inputText.split('\n');

  // 处理每一行（保留原始大小写）
  const processedLines = lines.map(line => {
    // 2. 去掉开头和结尾的空格
    let processedLine = line.trim();

    // 3. 把中间的多个空格替换成单个空格
    processedLine = processedLine.replace(/\s+/g, ' ');

    // 4. 去掉结尾的标点符号（.,!?;:）
    processedLine = processedLine.replace(/[.,!?;:]+$/, '');

    return processedLine;
  });
  let newList = processedLines.filter(line => line !== '');
  if (isDeep) {
    // 5. 去重（不区分大小写，但保留原始大小写）
    let uniqueLines = [];
    let seenLines = new Set();

    for (const line of newList) {
      const lowerCaseLine = line.toLowerCase();
      if (!seenLines.has(lowerCaseLine)) {
        seenLines.add(lowerCaseLine);
        uniqueLines.push(line); // 保留原始大小写
      }
    }
    newList = uniqueLines;
  }

  return newList;
}
// 处理字符长度过滤
export const filterByLength = (inputList, minLength = 0, maxLength = 0) => {
  if (!Array.isArray(inputList)) {
    return [];
  }
  return inputList.filter((item) => (min === 0 && max > 0 && item.length <= max) || (min > 0 && max === 0 && item.length >= min) || (min > 0 && max > 0 && item.length >= min && item.length <= max));
};
// 处理包含关键词
export const filterByInclude = (inputList, includeKeywords = [], isAll = false) => {
  if (!Array.isArray(inputList) || !Array.isArray(includeKeywords) || includeKeywords.length === 0) {
    return inputList;
  }
  if (isAll) {
    return inputList.filter((item) => includeKeywords.some((char) => item.includes(char)));
  } else {
    return inputList.filter((item) => includeKeywords.every((char) => item.includes(char)));
  }
};
// 处理不包含关键词
export const filterByExclude = (inputList, excludeKeywords = [], isAll = false) => {
  if (!Array.isArray(inputList) || !Array.isArray(excludeKeywords) || excludeKeywords.length === 0) {
    return inputList;
  }
  if (isAll) {
    return inputList.filter((item) => !excludeKeywords.some((char) => item.includes(char)));
  } else {
    return inputList.filter((item) => !excludeKeywords.every((char) => item.includes(char)));
  }
};
