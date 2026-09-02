<!-- 搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form label-width="72px" @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="">
            <el-input clearable v-model.trim="form.type" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="">
            <el-input clearable v-model.trim="form.name" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="">
            <el-input clearable v-model.trim="form.address" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :lg="8" :md="12" :sm="12" :xs="24">
          <el-form-item label-width="16px">
            <el-button type="primary" @click="search">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </ele-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useFormData } from '@/utils/use-form-data';
  import type { LinkRecordParam } from '@/api/platform/model/linkRecord';

  const emit = defineEmits<{
    (e: 'search', where?: LinkRecordParam): void;
  }>();
  /** 表单数据 */
  const [form, resetFields] = useFormData<LinkRecordParam>({
    type: '',
    name: '',
    address: ''
  });

  /** 搜索表单是否展开 */
  const searchExpand = ref(false);

  /** 搜索 */
  const search = () => {
    emit('search', { ...form });
  };

  /**  重置 */
  const reset = () => {
    resetFields();
    search();
  };
</script>
