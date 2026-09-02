<!-- 搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="用户ID">
            <el-input clearable v-model.trim="form.uid" placeholder="请输入用户ID" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="期数">
            <el-input-number clearable :controls="false" v-model.trim="form.periods" placeholder="请输入期数"  style="width:100%"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="排名">
            <el-input-number clearable :controls="false" v-model.trim="form.ranking" placeholder="请输入排名" style="width:100%"/>
          </el-form-item>
        </el-col>
        <!-- <el-col :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
          <el-form-item label="时间">
            <el-date-picker v-model="timeArr" type="daterange" range-separator="至" start-placeholder="开始"
              :value-format="'YYYY-MM-DD'" end-placeholder="结束" />
          </el-form-item>
        </el-col> -->
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
import type { RankRecordsParam } from "@/api/welfare/model/index";
import dayjs from 'dayjs';
import { ref } from 'vue';
const emit = defineEmits<{
  (e: 'search', where?: RankRecordsParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<RankRecordsParam>({
  periods: undefined,
  uid: undefined,
  ranking: undefined,
});


let timeArr = ref<[string, string]>([dayjs().startOf('month').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]);
/* 搜索 */
const search = () => {
  // if (timeArr.value && timeArr.value[0] && timeArr.value[1]) {
  //   form.startDay = Number(dayjs(timeArr.value[0]).format("YYYYMMDD"));
  //   form.endDay = Number(dayjs(timeArr.value[1]).format("YYYYMMDD"));
  // }
  emit('search', form);
};
const searchParams = () => {
  // if (timeArr.value && timeArr.value[0] && timeArr.value[1]) {
  //   form.startDay = Number(dayjs(timeArr.value[0]).format("YYYYMMDD"));
  //   form.endDay = Number(dayjs(timeArr.value[1]).format("YYYYMMDD"));
  // }
  return { ...form };
};

/**  重置 */
const reset = () => {
  resetFields();
  // timeArr.value = ['', ''];
  search();
};
defineExpose({
  searchParams,
  search
});
</script>
