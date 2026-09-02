<!-- 搜索表单 -->
<template>
  <el-form :label-col="{ xl: 7, lg: 5, md: 7, sm: 4 }" :wrapper-col="{ xl: 17, lg: 19, md: 17, sm: 20 }">
    <el-row :gutter="8">
      <el-col :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
        <el-form-item label="uid">
          <el-input v-model.number="form.uid" placeholder="请输入uid" clearable style="width: 100%"
            @keyup.enter.native="search" />
        </el-form-item>
      </el-col>
      <!-- <el-col :lg="6" :md="6" :sm="12" :xs="24">
        <el-form-item label="操作时间">
          <el-date-picker type="daterange" v-model="dateRange" range-separator="-" value-format="YYYYMMDD"
            start-placeholder="开始时间" end-placeholder="结束时间" class="ele-fluid" />
        </el-form-item>
      </el-col> -->
      <!-- <el-col   :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
        <el-form-item label="总下注">
          <el-input-number  :controls="false" v-model.trim="form.totalBet"  placeholder="请输入" clearable style="width: 100%" @keyup.enter.native="search"/>
        </el-form-item>
      </el-col>
      <el-col   :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
        <el-form-item label="总赢取">
          <el-input-number  :controls="false" v-model.trim="form.totalWin"  placeholder="请输入" clearable style="width: 100%" @keyup.enter.native="search"/>
        </el-form-item>
      </el-col>
      <el-col  v-show="searchExpand" :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
        <el-form-item label="净利">
          <el-input-number  :controls="false" v-model.trim="form.totalResult"  placeholder="请输入" clearable style="width: 100%" @keyup.enter.native="search"/>
        </el-form-item>
      </el-col>
      <el-col  v-show="searchExpand" :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
        <el-form-item label="下注次数">
          <el-input-number  :controls="false" v-model.trim="form.betNum"  placeholder="请输入" clearable style="width: 100%" @keyup.enter.native="search"/>
        </el-form-item>
      </el-col>
      <el-col  v-show="searchExpand" :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
        <el-form-item label="赢取次数">
          <el-input-number  :controls="false" v-model.trim="form.winNum"  placeholder="请输入" clearable style="width: 100%" @keyup.enter.native="search"/>
        </el-form-item>
      </el-col>
      <el-col  v-show="searchExpand" :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
        <el-form-item label="">
          <el-input-number  :controls="false" v-model.trim="form.rollNum"  placeholder="请输入" clearable style="width: 100%" @keyup.enter.native="search"/>
        </el-form-item>
      </el-col> -->
      <el-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
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
import type { UserGoldTotalReportParams } from '@/api/count/model'
import { ref } from 'vue';
const emit = defineEmits(['search']);

// 表单数据
const { form, resetFields } = useFormData<UserGoldTotalReportParams>({
  uid: undefined,
  // totalBet: undefined,
  // totalWin: undefined,
  // totalResult: undefined,
  // betNum: undefined,
  // winNum: undefined,
  // rollNum: undefined
});
const dateRange = ref<[string, string]>(['', '']);
/* 搜索 */
const search = () => {
  const [startDay, endDay] = dateRange.value || [];
  emit('search', { ...form, startDay, endDay });
};

/*  重置 */
const reset = () => {
  resetFields();
  dateRange.value = ['', ''];
  search();
};
</script>
