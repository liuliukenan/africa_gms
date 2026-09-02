<!-- 搜索表单 -->
<template>
  <el-form @keyup.enter.prevent="search" @submit.prevent="">
    <el-row :gutter="8">
      <el-col :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
        <el-form-item label="类型">
          <el-input placeholder="类型" v-model.trim="form.type" clearable />
        </el-form-item>
      </el-col>
      <el-col :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
        <el-form-item label="code">
          <el-input v-model.trim="form.msgCode" placeholder="请输入" clearable />
        </el-form-item>
      </el-col>
      <el-col :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
        <el-form-item class="ele-text-right" :wrapper-col="{ span: 24 }">
          <el-space>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-space>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { useFormData } from '@/utils/use-form-data';
import type { MutiLangParam } from '@/api/mutiLang/model/index';
import { defineExpose } from 'vue';

const props = defineProps({
  // 默认搜索条件
  where: Object
});

const emit = defineEmits(['search']);

// 表单数据
const [form, resetFields] = useFormData<MutiLangParam>({
  type: '',
  msgCode: ''
});

/* 搜索 */
const search = () => {
  emit('search', form);
};

const searchParams = () => {
  return { ...form };
};

defineExpose({
  searchParams,
  search
});

/*  重置 */
const reset = () => {
  resetFields();
  search();
};
</script>
