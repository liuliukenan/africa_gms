<!-- 搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="id">
            <dict-data v-model="form.id" code="serverType" value-type="number" placeholder="请选择" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
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
  import { useFormData } from '@/utils/use-form-data';
  import type { CompanyParam } from '@/api/platform/model/company';

  const emit = defineEmits<{
    (e: 'search', where?: CompanyParam): void;
  }>();
  /** 表单数据 */
  const [form, resetFields] = useFormData<CompanyParam>({
    id: undefined
  });

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
