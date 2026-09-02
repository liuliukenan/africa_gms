<!-- 搜索表单 -->
<template>
  <el-form :label-col="{ xl: 7, lg: 5, md: 7, sm: 4 }" :wrapper-col="{ xl: 17, lg: 19, md: 17, sm: 20 }">
    <el-row :gutter="8">


      <el-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
        <el-form-item label="时间">
          <el-date-picker v-model="timeArr" type="daterange" range-separator="至" start-placeholder="开始"
            :value-format="'YYYY-MM-DD'" end-placeholder="结束" />
        </el-form-item>
      </el-col>
      <el-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
        <el-form-item label="uid">
          <el-input-number  v-model.trim="form.uid" placeholder="请输入uid" clearable style="width: 100%" :controls="false"
            @keyup.enter.native="search" />
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
import { useFormData } from '@/utils/use-form-data';
import type { UserGoldDayReportParams } from '@/api/count/model';
import dayjs from 'dayjs';
const emit = defineEmits(['search']);

// 表单数据
const { form, resetFields } = useFormData<UserGoldDayReportParams>({
  uid: undefined,
  startDay: '',
  endDay: '',
});
let timeArr = ref<[string, string]>([dayjs().format('YYYY-MM-DD'),dayjs().format('YYYY-MM-DD')]);
/* 搜索 */
const search = () => {
  if (timeArr.value[0] && timeArr.value[1]) {
    form.startDay = dayjs(timeArr.value[0]).format("YYYYMMDD");
    form.endDay = dayjs(timeArr.value[1]).format("YYYYMMDD");
  }
  emit('search', form);
};

/*  重置 */
const reset = () => {
  resetFields();
  timeArr.value = ['', ''];
  search();
};
</script>
