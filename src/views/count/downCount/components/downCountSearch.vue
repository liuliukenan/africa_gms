<!-- 搜索表单 -->
<template>
  <el-form :label-col="{ xl: 7, lg: 5, md: 7, sm: 4 }" :wrapper-col="{ xl: 17, lg: 19, md: 17, sm: 20 }">
    <el-row :gutter="8">
      <el-col   :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
        <el-form-item label="代理ID">
         <el-input-number v-model.trim="form.uid"  placeholder="请输入" clearable style="width: 100%" @keyup.enter.native="search" :controls="false"/>
        </el-form-item>
      </el-col>
      <el-col   :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
        <el-form-item label="时间">
          <!-- <el-input-number v-model.trim="form.daykey"  placeholder="请输入" clearable style="width: 100%" @keyup.enter.native="search"/> -->
          <el-date-picker v-model="timeArr" type="daterange" range-separator="至" start-placeholder="开始" :value-format="'YYYY-MM-DD'" end-placeholder="结束" />
        </el-form-item>
      </el-col>
      <!-- <el-col   :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
        <el-form-item label="web">
          <el-input-number v-model.trim="form.webNum"  placeholder="请输入" clearable style="width: 100%" @keyup.enter.native="search"/>
        </el-form-item>
      </el-col>
      <el-col  v-show="searchExpand" :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
        <el-form-item label="下载">
          <el-input-number v-model.trim="form.downNum"  placeholder="请输入" clearable style="width: 100%" @keyup.enter.native="search"/>
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
  import { ref} from 'vue';
  import { useFormData } from '@/utils/use-form-data';
  import type { DownCount, DownCountParams } from '@/api/count/model';
import dayjs from 'dayjs';
  // const props = defineProps({
  //   // 默认搜索条件
  //   where: Object
  // });
  // 搜索表单是否展开
  const emit = defineEmits(['search']);

  // 表单数据
  const { form, resetFields } = useFormData<DownCountParams>({
          // id:null,
          // daykey:null,
          // webNum:null,
          // downNum:null
          uid:undefined,
          startDay:undefined,
          endDay:undefined
  });

  let timeArr = ref<[string, string]>([dayjs().subtract(3, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]);
  /* 搜索 */
  const search = () => {
    let params = JSON.parse(JSON.stringify(form));
    if (timeArr.value[0] && timeArr.value[1]) {
      params.startDay = dayjs(timeArr.value[0]).format('YYYYMMDD');
      params.endDay = dayjs(timeArr.value[1]).format('YYYYMMDD');
    }
    emit('search', params);
  };

  /*  重置 */
  const reset = () => {
    resetFields();
    timeArr.value = ['', ''];
    search();
  };

</script>
