<template>
  <div class="container">
    <a-card title="表单">
      <a-form :model="formData" layout="vertical" @submit="handleSubmit">
        <a-row :gutter="24">
          <a-col :span="8" v-for="index in 6">
            <a-form-item field="number" label="编号">
              <a-input v-model="formData.number" placeholder="请输入编号" />
            </a-form-item>
          </a-col>
          <a-col :span="24" style="display: flex; justify-content: flex-end">
            <a-space>
              <a-button type="primary" html-type="submit">提交</a-button>
              <a-button>返回</a-button>
            </a-space>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
  number: '',
});

const handleSubmit = async (data) => {
  console.log(data);
};
</script>

<style scoped></style>
