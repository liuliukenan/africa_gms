<!-- 渠道分组搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <!-- 常驻字段：分组名称 -->
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="分组名称">
            <el-input v-model="form.groupName" clearable placeholder="请输入分组名称" @change="search" />
          </el-form-item>
        </el-col>
        <!-- <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="时间">
            <el-date-picker v-model="timeArr" type="daterange" :value-format="'YYYY-MM-DD'" @change="search"
              range-separator="至" start-placeholder="开始" end-placeholder="结束" clearable style="width: 100%;" />
          </el-form-item>
        </el-col> -->

        <!-- 展开字段 -->
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="ID">
            <el-input v-model="form.id" clearable placeholder="请输入ID" />
          </el-form-item>
        </el-col>

        <!-- 操作按钮列 -->
        <el-col :lg="6" :md="12" :sm="12" :xs="24">
          <el-form-item label-width="16px">
            <el-button type="primary" @click="search">查询</el-button>
            <el-button @click="reset">重置</el-button>
            <!-- <el-link type="primary" :underline="false" @click="toggleExpand" style="margin-left: 12px">
              <template v-if="searchExpand">
                <span>收起</span>
                <el-icon style="vertical-align: -1px"><ArrowUp /></el-icon>
              </template>
              <template v-else>
                <span>展开</span>
                <el-icon style="vertical-align: -2px"><ArrowDown /></el-icon>
              </template>
            </el-link> -->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </ele-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ArrowDown, ArrowUp } from '@/components/icons';
  import { useFormData } from '@/utils/use-form-data';
  import type { ChannelGroupParam } from '@/api/platform/model/channelGroup';
  import dayjs from 'dayjs';
  import { ElMessage } from 'element-plus';

  const emit = defineEmits<{
    (e: 'search', where?: ChannelGroupParam): void;
  }>();

  const [form, resetFields] = useFormData<ChannelGroupParam>({
    groupName: undefined,
    startDate: undefined,
    endDate: undefined,
    id: undefined
  });

  const searchExpand = ref(false);

  const timeArr = ref<[string, string]>(['', '']);

  const search = () => {
    const [startDate, endDate] = timeArr.value || [];
    if (startDate && endDate) {
      const diffDays = dayjs(endDate).diff(dayjs(startDate), 'day');
      if (diffDays > 90) {
        ElMessage.warning('最大时间跨度不能超过90天');
        timeArr.value = ['', ''];
        return;
      }
    }
    emit('search', { ...form, startDate, endDate });
  };

  const reset = () => {
    resetFields();
    // timeArr.value = ['',''];
    search();
  };

  const toggleExpand = () => {
    searchExpand.value = !searchExpand.value;
  };

  const searchParams = () => {
    const [startDate, endDate] = timeArr.value || [];
    return { ...form, startDate, endDate };
  };

  defineExpose({ searchParams });
</script>
