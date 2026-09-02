<!-- 搜索表单 -->
<template>
  <el-form :label-col="{ xl: 7, lg: 5, md: 7, sm: 4 }" :wrapper-col="{ xl: 17, lg: 19, md: 17, sm: 20 }">
    <el-row :gutter="8">
      <el-col :xl="4" :lg="6" :md="6" :sm="12" :xs="24">
        <el-form-item label="日期">
          <el-date-picker v-model="form.daykey" type="date" placeholder="选择日期" style="width: 100%"  @keyup.enter.native="search" value-format="YYYYMMDD"/>
        </el-form-item>
      </el-col>
      <el-col  :xl="4" :lg="6" :md="6" :sm="12" :xs="24">
        <el-form-item label="充值渠道">
          <el-input v-model.trim="form.channelType" placeholder="请输入" clearable @keyup.enter.native="search" />
        </el-form-item>
      </el-col>
      <el-col :xl="4" :lg="6" :md="6" :sm="12" :xs="24">
        <el-form-item class="ele-text-right" :wrapper-col="{ span: 24 }">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { useFormData } from '@/utils/use-form-data';
import type { SysPayCountParams } from '@/api/count/model';
const emit = defineEmits(['search']);

// 表单数据
const { form, resetFields } = useFormData<SysPayCountParams>({
  daykey: undefined,
  channelType: undefined,
});

/* 搜索 */
const search = () => {
  emit('search', form);
};

/*  重置 */
const reset = () => {
  resetFields();
  search();
};
</script>
