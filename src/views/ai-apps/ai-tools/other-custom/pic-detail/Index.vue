<template>
  <div class="container">
    <div class="container_box">
      <a-form class="form_box" ref="queryFormRef" layout="vertical" hide-label :model="queryForm">
        <a-grid :col-gap="24" :row-gap="24">
          <a-grid-item :span="24">
            <div class="flex_box form_btns">
              <a-button class="form_btn2" type="primary" @click="handleAdd">批量添加图片</a-button>
              <a-button class="form_btn7" type="outline" @click="handleRefresh">刷新</a-button>
              <a-button type="outline" @click="handleBack">返回</a-button>
            </div>
          </a-grid-item>
        </a-grid>
      </a-form>
      <div class="photo_box">
        <div class="photo_all">
          <a-checkbox :model-value="checkedAll" :indeterminate="indeterminate" @change="handleChangeAll">全选</a-checkbox>
        </div>
        <div class="photo_scroll">
          <div class="flex_box flex_wrap photo_list">
            <div class="photo_item" v-for="(item, index) in tableData" :key="index"">
              <a-image width="200" src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp" />
              <div class="flex_box flex_row_between photo_content">
                <div class="photo_name u-line-1">bbg-sasjadada</div>
                <a-tooltip content="删除">
                  <div @click="handleDelete(index)" class="photo_del">
                    <icon-delete />
                  </div>
                </a-tooltip>
              </div>
            </div>
          </div>
        </div>
        <div class="flex_box flex_row_end photo_page">
          <a-pagination @change="handlePageChange" @page-size-change="handlePageSizeChange" :current="queryForm.page" :page-size="queryForm.limit" :page-size-options="[24, 48]" :total="pagination.total" show-page-size/>
        </div>
      </div>
      <!-- 上传图片 -->
      <a-modal :mask-closable="false" l :esc-to-close="false" class="modal_box" v-model:visible="addVisible" width="500px">
        <template #title>
          <div class="flex_box modal_title">
            <div class="modal_title_icon">
              <icon-info-circle-fill />
            </div>
            <div class="modal_title_text">上传图片</div>
          </div>
        </template>
        <div class="upload_box">
          <a-upload ref="uploadRef" @change="uploadChange" draggable :auto-upload="false" action="/" />
        </div>
        <template #footer>
          <div class="flex_box flex_row_center modal_footer">
            <a-button style="margin: 0;" class="form_btn3" @click="addSubmit">确定上传</a-button>
          </div>
        </template>
      </a-modal>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { useRoute, useRouter } from 'vue-router';
  import { storageUpload, storageDetailList, storageDetailDelete, storageSts } from '@/api/apps/tools/other';
  import localeConfig from './zh-CN.js';
  // 多语言
  const localeData = ref({});
  localeData.value = localeConfig;
  const localeGet = (key) => {
    return localeData.value[key];
  };

  // 监听函数
  function dataListener(data) {
    console.log('来自主应用的数据', data);
    if (data&&data.locales) localeData.value = data.locales;
  }
  // 监听数据变化，初始化时如果有数据则主动触发一次
  //@ts-ignore
  if (window.microApp) window.microApp.addDataListener(dataListener, true);

  const router = useRouter();
  const pagination = ref({ pageSize: 24, total: 0, showPageSize: true, pageSizeOptions: [24, 48] });
  const queryFormRef = ref(null);
  const queryForm = ref({
    tid: '',
    page: 1,
    limit: 24,
  });
  if (router.currentRoute.value.query.tid) {
    queryForm.value.tid = +router.currentRoute.value.query.tid;
  }
  const tableLoading = ref(false);
  const tableData = ref([]);
  // 获取列表
  const getList = async () => {
    pagination.value.pageSize = 24;
    tableLoading.value = true;
    try  {
      const res = await storageDetailList(queryForm.value);
      tableData.value = res.data.list;
      pagination.value.total = res.data.total;
    } catch (error) {
      console.log(error);
    }
    tableLoading.value = false;
  };
  getList();

  // 获取阿里上传参数
  const getSts = async () => {
    const res = await storageSts();
    console.log(res);
  };

  // 分页发生改变
  const handlePageSizeChange = (pageSize) => {
    queryForm.value.page = 1;
    queryForm.value.limit = pageSize;
    pagination.value.pageSize = pageSize;
    getList();
  };
  const handlePageChange = (page) => {
    queryForm.value.page = page;
    getList();
  };
  // 返回
  const handleBack = () => {
    router.back()
  };
  // 刷新
  const handleRefresh = async () => {
    await getList();
  };
  // 选择
  const indeterminate = ref(false);
  const checkedAll = ref(true);
  const selectKeys = ref([]);
  
  const handleChangeAll = (value) => {
    indeterminate.value = false;
    if (value) {
      checkedAll.value = true;
      selectKeys.value = tableData.value.map((item) => item.id);
    } else {
      checkedAll.value = false;
      selectKeys.value = [];
    }
  };

  const handleChange = (values) => {
    console.log(values);
    if (values.length === tableData.value.length) {
      checkedAll.value = true;
      indeterminate.value = false;
    } else if (values.length === 0) {
      checkedAll.value = false;
      indeterminate.value = false;
    } else {
      checkedAll.value = false;
      indeterminate.value = true;
    }
  };

  // 删除
  const handleDelete = (rowIndex) => {
    storageDetailDelete({
      id: [tableData.value[rowIndex].id]
    })
      .then((res) => {
        Message.success('删除成功');
        getList();
      })
      .catch(() => {});
  };
  // 添加图片
  const addVisible = ref(false);
  const addLoading = ref(false);
  const handleAdd = () => {
    addVisible.value = true;
  };
  const uploadChange = (res) => {
    console.log(res);
  };
  const addSubmit = () => {
    addLoading.value = true
    let data = []
    storageUpload({data: data})
      .then((res) => {
        Message.success('添加成功');
        addVisible.value = false;
        getList();
        addLoading.value = false
      })
      .catch(() => {
        addLoading.value = false
      });
  };
</script>

<script>
  export default {
    name: 'OtherInnerDetail', // If you want the include property of keep-alive to take effect, you must name the component
  };
</script>

<style lang="less" scoped>
  @import '@/assets/style/table.less';
  .container {
    height: 100%;
    .container_box {
      height: 100%;
    }
  }
  .photo_box {
    height: 100%;
    .photo_all {
      padding: 20px 0;
    }
    .photo_scroll {
      height: 400px;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    }
    .photo_list {
      padding: 10px 0;
      .photo_item {
        position: relative;
        width: 180px;
        height: 130px;
        overflow: hidden;
        .photo_content {
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 10;
          width: 100%;
          height: 32px;
          background: linear-gradient(360deg,rgba(0,0,0,.3) 50%,rgba(0,0,0,0) 100%);
          color: #fff;
          font-size: 12px;
          padding: 0 5px;
          .photo_name {
            width: 130px;
            height: 24px;
            line-height: 24px;
          }
          .photo_del {
            font-size: 14px;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
