<!-- 搜索表单 -->
<template>
  <el-form :label-col="{ xl: 7, lg: 5, md: 7, sm: 4 }" :wrapper-col="{ xl: 17, lg: 19, md: 17, sm: 20 }">
    <el-row :gutter="20">
      <el-col :xl="4" :lg="4" :md="4" :sm="12" :xs="24">
        <el-form-item label="类型">
          <el-select v-model="form.type" placeholder="请选择" clearable>
            <el-option label="不分类" :value="0" />
            <el-option label="分渠道" :value="1" />
            <el-option label="分游戏" :value="2" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col v-if="form.type == 1" :xl="4" :lg="4" :md="4" :sm="12" :xs="24">
        <el-form-item label="渠道">
          <dict-data code="serverType" v-model="form.sid" valueType="number" />
        </el-form-item>
      </el-col>
      <el-col v-if="form.type == 2" :xl="4" :lg="4" :md="4" :sm="12" :xs="24">
        <el-form-item label="游戏ID">
          <el-input v-model.trim="form.gameId" placeholder="请输入" clearable />
        </el-form-item>
      </el-col>

      <el-col :xl="5" :lg="12" :md="12" :sm="12" :xs="24">
        <el-form-item label="时间">
          <el-date-picker v-model="timeArr" type="monthrange" range-separator="至" start-placeholder="开始" :value-format="'YYYY-MM'" end-placeholder="结束" />
        </el-form-item>
      </el-col>
      <el-col :xl="5" :lg="5" :md="6" :sm="24" :xs="24">
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
  import { ref } from 'vue';
  import { useFormData } from '@/utils/use-form-data';
  import dayjs from 'dayjs';
  import type { GameGoldDayReportsParams } from '@/api/count/model/index';

  const emit = defineEmits(['search']);

  // 表单数据
  const { form, resetFields } = useFormData<GameGoldDayReportsParams>({
    type: 0,
    sid: undefined,
    gameId: undefined,
    startDay: '',
    endDay: ''
  });
  let timeArr = ref<[string, string]>([dayjs().subtract(3, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]);
  /* 搜索 */
  const search = () => {
    let params = JSON.parse(JSON.stringify(form));
    if (timeArr.value&&timeArr.value[0] && timeArr.value[1]) {
      params.startDay = dayjs(timeArr.value[0]).format('YYYYMM');
      params.endDay = dayjs(timeArr.value[1]).format('YYYYMM');
    }
    emit('search', params);
  };
  /*  重置 */
  const reset = () => {
    resetFields();
    form.type = 0;
    timeArr.value = ['', ''];
    search();
  };
</script>
