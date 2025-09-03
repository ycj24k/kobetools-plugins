import { ref } from 'vue';
import { useAppStore } from '@/store';
import { storagets } from '@/api/workspace/workspace';
import { removeTrailingSlash, getFileExtension } from '@/utils';

export default function useTxy() {
  const appStore = useAppStore();

  const config = ref({
    Bucket: 'kobetools-shenzhen',
    Region: 'oss-cn-shenzhen',
  });

  const sts = async () => {
    const { data } = await storagets();
    if (!data.SecurityToken) {
      return;
    }
    await appStore.setSts({
      region: config.value.Region,
      bucket: config.value.Bucket,
      stsToken: data.SecurityToken,
      accessKeyId: data.AccessKeyId,
      accessKeySecret: data.AccessKeySecret,
    });
    // 同步后端返回的prefix到store，避免使用空前缀触发权限拒绝
    if (data.prefix && !appStore.prefix) {
      try {
        await appStore.setPrefix(data.prefix);
      } catch (e) {
        // noop
      }
    }
    return data.prefix;
  };

  // 创建带有自动刷新 STS 的 OSS 客户端
  const getOssClient = () => {
    const creds = appStore.sts || {};
    return new OSS({
      region: creds.region,
      bucket: creds.bucket,
      accessKeyId: creds.accessKeyId,
      accessKeySecret: creds.accessKeySecret,
      stsToken: creds.stsToken,
      // STS 过期自动刷新
      refreshSTSToken: async () => {
        const { data } = await storagets();
        if (!data || !data.SecurityToken) {
          throw new Error('无法刷新STS令牌');
        }
        await appStore.setSts({
          region: config.value.Region,
          bucket: config.value.Bucket,
          stsToken: data.SecurityToken,
          accessKeyId: data.AccessKeyId,
          accessKeySecret: data.AccessKeySecret,
        });
        return {
          accessKeyId: data.AccessKeyId,
          accessKeySecret: data.AccessKeySecret,
          stsToken: data.SecurityToken,
        };
      },
      // 默认每5分钟刷新一次（根据业务可调整）
      refreshSTSTokenInterval: 5 * 60 * 1000,
    });
  };

  // 检查OSS是否已初始化
  const isOssInitialized = () => {
    return appStore.sts && 
           appStore.sts.stsToken && 
           appStore.sts.accessKeyId && 
           appStore.sts.accessKeySecret;
  };

  // 检查权限是否有效
  const checkStsTokenValidity = async () => {
    if (!isOssInitialized()) {
      return false;
    }
    
    try {
      // 尝试一个简单的操作来验证token是否有效
      const client = getOssClient();
      // 使用受限范围内的安全前缀进行最小化查询，避免空前缀导致的策略拒绝
      const testPrefix = appStore.prefix || undefined;
      if (!testPrefix) {
        // 没有前缀时，不做强校验，认为当前sts可用，后续真实调用会通过refresh机制自动纠正
        return true;
      }
      await client.list({
        'prefix': testPrefix,
        'delimiter': '/',
        'max-keys': 1,
      });
      return true;
    } catch (error) {
      console.warn('STS Token 验证失败:', error);
      return false;
    }
  };

  // 等待OSS初始化完成
  const waitForOssInitialization = async (maxRetries = 10, retryInterval = 500) => {
    for (let i = 0; i < maxRetries; i++) {
      if (isOssInitialized()) {
        // 如果已初始化，检查token是否有效
        const isValid = await checkStsTokenValidity();
        if (isValid) {
          return true;
        } else {
          // Token无效，重新获取
          console.log('STS Token 已过期，重新获取...');
          await appStore.setSts(null); // 清空无效的sts
        }
      }
      
      // 执行初始化或重新初始化
      try {
        const prefix = await sts();
        if (prefix && isOssInitialized()) {
          // 再次验证新获取的token
          const isValid = await checkStsTokenValidity();
          if (isValid) {
            return true;
          }
        }
      } catch (error) {
        console.warn(`OSS初始化尝试失败 (第${i + 1}次):`, error);
        
        // 如果是权限问题，直接抛出错误
        if (error.name === 'AccessDeniedError' || error.message?.includes('Access denied')) {
          throw new Error('访问权限不足，请检查账号权限配置');
        }
      }
      
      // 等待指定时间后重试
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, retryInterval));
      }
    }
    
    throw new Error('OSS初始化超时，请检查网络连接或稍后重试');
  };

  // 纯数据获取函数 - 只负责从OSS获取原始数据
  const fetchFileList = async (prefix = '', marker = '') => {
    try {
      // 确保OSS已初始化
      await waitForOssInitialization();
      
      const client = getOssClient();
      const data = await client.list({
        'prefix': prefix || appStore.prefix,
        'delimiter': '/',
        'max-keys': appStore.maxKeys,
        'marker': marker || appStore.nextMarker,
      });
      
      return data;
    } catch (error) {
      console.error('获取文件列表失败:', error);
      
      // 处理特定的错误类型
      if (error.name === 'AccessDeniedError' || error.message?.includes('Access denied')) {
        throw new Error('访问权限不足，请检查账号权限配置或联系管理员');
      } else if (error.name === 'SecurityTokenExpiredError' || error.message?.includes('SecurityToken')) {
        // Token过期，清空后重试一次
        console.log('SecurityToken已过期，尝试重新获取...');
        await appStore.setSts(null);
        await waitForOssInitialization();
        
        const client = getOssClient();
        const data = await client.list({
          'prefix': prefix || appStore.prefix,
          'delimiter': '/',
          'max-keys': appStore.maxKeys,
          'marker': marker || appStore.nextMarker,
        });
        
        return data;
      } else {
        // 其他错误
        throw new Error(`获取文件列表失败: ${error.message || '未知错误'}`);
      }
    }
  };

  // 数据转换函数 - 将OSS数据转换为应用数据格式
  const transformFileData = (ossData, basePrefix = '') => {
    const list = [];
    const prefix = basePrefix || appStore.prefix;
    
    // 处理文件夹
    if (ossData.prefixes) {
      for (let i = 0; i < ossData.prefixes.length; i++) {
        const name = ossData.prefixes[i].replace(prefix, '');
        if (name) {
          list.push({
            name: removeTrailingSlash(name),
            type: 'd',
            key: ossData.prefixes[i],
            size: 0,
            fileExtension: 'folder',
            url: '',
          });
        }
      }
    }

    // 处理文件
    if (ossData.objects) {
      for (let i = 0; i < ossData.objects.length; i++) {
        const name = ossData.objects[i].name.replace(prefix, '');
        if (name) {
          const fileExtension = getFileExtension(ossData.objects[i].name);
          // 原始后缀名（用于类型精确过滤，如 png/jpg）
          let extension = '';
          const dotIndex = ossData.objects[i].name.lastIndexOf('.');
          if (dotIndex !== -1 && dotIndex < ossData.objects[i].name.length - 1) {
            extension = ossData.objects[i].name.substring(dotIndex + 1).toLowerCase();
          }
          list.push({
            name,
            type: 'f',
            key: ossData.objects[i].name,
            storageType: ossData.objects[i].storageClass,
            size: ossData.objects[i].size,
            uptime: ossData.objects[i].lastModified,
            sha: ossData.objects[i].etag.replace(/"/g, ''),
            fileExtension, // 分类（image/code/js/...）
            extension,     // 原始后缀（png/jpg/...）
            url: ossData.objects[i].url,
          });
        }
      }
    }

    return list;
  };

  // 兼容老的 list 函数 - 但不推荐使用
  const list = async () => {
    console.log('⚠️ 警告: list() 函数已过时，请使用 fetchFileList() 和 transformFileData()');
    
    await appStore.setList([]);
    const data = await fetchFileList();
    
    // 更新分页状态
    await appStore.setPaginationState({
      isTruncated: data.isTruncated,
      nextMarker: data.nextMarker
    });
    
    // 更新 markers
    if (data.isTruncated && data.nextMarker) {
      await appStore.addMarker(data.nextMarker);
    } else {
      await appStore.addMarker('');
    }
    
    // 转换数据
    let transformedList = transformFileData(data);
    
    // 如果有搜索条件，进行过滤（这部分逻辑应该移到业务层）
    if (appStore.search) {
      const arr = appStore.search.split(',');
      if (arr.length >= 2 && arr[0] === '1') {
        transformedList = transformedList.filter((item) => item.name.toLowerCase().includes(arr[1].toLowerCase()));
      }
      if (arr.length >= 2 && arr[0] === '2') {
        transformedList = transformedList.filter((item) => item.name.toLowerCase().startsWith(arr[1].toLowerCase()));
      }
      if (arr.length >= 2 && arr[0] === '3') {
        transformedList = transformedList.filter((item) => /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(item.name));
      }
      if (arr.length >= 2 && arr[0] === '4') {
        transformedList = transformedList.filter((item) => /\.(doc|docx|pdf|txt|xls|xlsx|ppt|pptx|md)$/i.test(item.name));
      }
      if (arr.length >= 2 && arr[0] === '5') {
        transformedList = transformedList.filter((item) => /\.(mp4|mov|avi|mkv|flv|wmv|webm)$/i.test(item.name));
      }
      if (arr.length >= 2 && arr[0] === '6') {
        transformedList = transformedList.filter((item) => /\.(mp3|wav|ogg|aac|flac)$/i.test(item.name));
      }
      if (arr.length >= 2 && arr[0] === '7') {
        transformedList = transformedList.filter((item) => /\.(js|html|css|json)$/i.test(item.name));
      }
    }
    
    await appStore.setList(transformedList);
    console.log('转换后的文件列表:', transformedList);
  };

  const upload = async () => {
    // 确保OSS已初始化
    await waitForOssInitialization();
    
    let sizes = 0;
    const fileList = appStore.fileList;
    await appStore.setTip('');
    await appStore.setPercent(0);
    const start = new Date();
    const client = getOssClient();
    const status = [];
    for (let i = 0; i < fileList.length; i++) {
      const Key = appStore.prefix + (fileList[i].file.webkitRelativePath ? fileList[i].file.webkitRelativePath : fileList[i].file.name);
      fileList[i].Key = Key;
      sizes += fileList[i].file.size;
      const res = await client.multipartUpload(fileList[i].Key, fileList[i].file, {
        progress: (p, cpt, res) => {
          fileList[i].percent = parseFloat(p.toFixed(1));
        },
        parallel: 4,
        partSize: 1024 * 1024 * 10,
      });
      status.push(res.res.status);
    }
    const end = new Date();
    const timeTaken = end - start;
    appStore.percent = 1;
    await appStore.setTip(`上传大小：${sizes / 1000} KB，共耗时：${timeTaken / 1000} 秒，上传成功：${status.filter((v) => v === 200).length} 个，上传失败：${status.filter((v) => v !== 200).length} 个`);
    return true;
  };

  const del = async (keys) => {
    try {
      await waitForOssInitialization();
      const client = getOssClient();
      await client.deleteMulti(keys);
      return true;
    } catch (error) {
      if (error.name === 'AccessDeniedError' || error.message?.includes('Access denied')) {
        throw new Error('删除权限不足，请检查账号权限配置');
      }
      throw error;
    }
  };

  const add = async (name, data = [], type = 'text/plain') => {
    try {
      await waitForOssInitialization();
      const client = getOssClient();
      await client.put(appStore.prefix + name, new Blob(data, { type }));
      return true;
    } catch (error) {
      if (error.name === 'AccessDeniedError' || error.message?.includes('Access denied')) {
        throw new Error('上传权限不足，请检查账号权限配置');
      }
      throw error;
    }
  };

  const rename = async (name, rName) => {
    try {
      await waitForOssInitialization();
      const client = getOssClient();
      await client.copy(appStore.prefix + name, appStore.prefix + rName);
      await client.delete(appStore.prefix + rName);
      return true;
    } catch (error) {
      if (error.name === 'AccessDeniedError' || error.message?.includes('Access denied')) {
        throw new Error('重命名权限不足，请检查账号权限配置');
      }
      throw error;
    }
  };

  const url = async (key) => {
    try {
      await waitForOssInitialization();
      const client = getOssClient();
      const url = await client.signatureUrl(key);
      return url;
    } catch (error) {
      if (error.name === 'AccessDeniedError' || error.message?.includes('Access denied')) {
        throw new Error('获取URL权限不足，请检查账号权限配置');
      }
      throw error;
    }
  };

  const contents = async (key) => {
    try {
      await waitForOssInitialization();
      const client = getOssClient();
      const res = await client.list({
        prefix: key,
      });
      return res.objects;
    } catch (error) {
      if (error.name === 'AccessDeniedError' || error.message?.includes('Access denied')) {
        throw new Error('列表权限不足，请检查账号权限配置');
      }
      throw error;
    }
  };

  return { sts, list, fetchFileList, transformFileData, upload, del, add, rename, url, contents };
}
