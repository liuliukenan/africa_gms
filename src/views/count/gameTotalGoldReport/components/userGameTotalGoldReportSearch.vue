<!-- 搜索表单 -->
<template>
  <el-form :label-col="{ xl: 7, lg: 5, md: 7, sm: 4 }" :wrapper-col="{ xl: 17, lg: 19, md: 17, sm: 20 }">
    <el-row :gutter="8">
      <el-col :xl="4" :lg="4" :md="4" :sm="4" :xs="4">
        <el-form-item label="区分客户端">
          <el-radio-group v-model="form.type" @change="search">
            <el-radio :value="0">不区分</el-radio>
            <el-radio :value="1">区分</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :xl="4" :lg="4" :md="4" :sm="4" :xs="4">
        <el-form-item label="区分渠道">
          <el-radio-group v-model="form.channelType">
            <el-radio :value="0">不区分</el-radio>
            <el-radio :value="1">区分</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col v-show="form.channelType === 1" :lg="4" :md="4" :sm="24" :xs="24">
          <el-form-item class="my-form-item" label="渠道代码">
            <el-input clearable placeholder="请输入渠道代码" v-model="form.channelCode" />
          </el-form-item>
        </el-col>
      <el-col :xl="5" :lg="12" :md="12" :sm="24" :xs="24">
        <el-form-item label="时间">
          <el-date-picker v-model="timeArr" type="daterange" range-separator="至" start-placeholder="开始"
            :value-format="'YYYY-MM-DD'" end-placeholder="结束" />
        </el-form-item>
      </el-col>
      <el-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
        <el-form-item class="ele-text-right" :wrapper-col="{ span: 24 }">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { GameTotalGoldReportParams } from '@/api/count/model';
import { useFormData } from '@/utils/use-form-data';
import dayjs from 'dayjs';

const emit = defineEmits(['search']);
let timeArr = ref<[string, string]>(['', '']);
// 表单数据
const { form, resetFields } = useFormData<GameTotalGoldReportParams>({
  type: 0,
  channelType: 0,
  startTime:'',
  endTime:'',
  channelCode:'',

});


/* 搜索 */
const search = () => {
  if (timeArr.value[0] && timeArr.value[1]) {
    form.startTime =  dayjs(timeArr.value[0]).format("YYYYMMDD");
    form.endTime =  dayjs(timeArr.value[1]).format("YYYYMMDD");
  }
  emit('search', form);
};

/*  重置 */
const reset = () => {
  resetFields();
  search();
};
</script>
