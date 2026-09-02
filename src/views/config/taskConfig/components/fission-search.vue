<!-- 搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="前置任务ID">
            <el-input clearable v-model.trim="form.preTask" placeholder="请输入前置任务ID" />
          </el-form-item>
        </el-col>
        <!-- <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="游戏名称">
            <el-input clearable v-model.trim="form.name" placeholder="请输入游戏名称" />
          </el-form-item>
        </el-col> -->
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="任务类型">
            <dict-data code="qustType" valueType="number" v-model="form.taskType" placeholder="请选择任务类型" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="奖励类型">
            <dict-data code="rewardType" valueType="number" v-model="form.rewardType" placeholder="请选择奖励类型" />
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
import { ref } from 'vue';
import { useFormData } from '@/utils/use-form-data';
import type { FissionParam,Fission } from '@/api/taskConfig/model';
const emit = defineEmits<{
  (e: 'search', where?: FissionParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<FissionParam>({
  taskType: undefined,
  preTask: undefined,
  rewardType: undefined,
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
const searchParams = () => {
  return { ...form };
};
defineExpose({
  searchParams,
  search
});
</script>
