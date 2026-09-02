<!-- 搜索表单 -->
<template>
  <el-form >
    <el-row :gutter="20">
      <el-col :xl="4" :lg="4" :md="4" :sm="24" :xs="24">
        <el-form-item label="区分客户端">
          <el-radio-group v-model="form.disClient" @change="search">
            <el-radio :value="0">不区分</el-radio>
            <el-radio :value="1">区分</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :xl="5" :lg="5" :md="5" :sm="24" :xs="24">
        <el-form-item label="时间">
          <el-date-picker v-model="timeArr" type="daterange" range-separator="至" start-placeholder="开始"
            :value-format="'YYYY-MM-DD'" end-placeholder="结束" />
        </el-form-item>
      </el-col>
      <el-col :xl="4" :lg="4" :md="4" :sm="12" :xs="24">
        <el-form-item label="用户类型">
          <el-select v-model="form.type" placeholder="请选择用户类型">
            <el-option label="所有" :value="0" />
            <el-option label="有效用户" :value="1" />
            <el-option label="充值用户" :value="2" />
          </el-select>
        </el-form-item>
      </el-col>
      <!-- <el-col :xl="5" :lg="5" :md="5" :sm="24" :xs="24">
        <el-form-item label="id">
          <el-input-number v-model.trim="form.id" placeholder="请输入id" clearable style="width: 100%" :controls="false"
            @keyup.enter.native="search" />
        </el-form-item>
      </el-col> -->
      <el-col :xl="4" :lg="4" :md="12" :sm="24" :xs="24">
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
import type { ComplexCountParams } from '@/api/count/model';
import dayjs from 'dayjs';
const emit = defineEmits(['search']);

// 表单数据
const { form, resetFields } = useFormData<ComplexCountParams>({
  // id: undefined,
  startDay: '',
  endDay: '',
  type: 0,
  disClient: 0,
});
let timeArr = ref<[string, string]>([dayjs().subtract(1, 'month').format('YYYY-MM-DD'),dayjs().format('YYYY-MM-DD')]);
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
