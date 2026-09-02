<!-- 盈亏排行榜搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('monitoringReport.profitLossRanking.countryCode')">
            <el-select v-model="form.countryCode" :placeholder="t('common.placeholder.select')" style="width: 100%" @change="search">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code || ''" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="渠道类型">
            <dict-data code="channelNewType" valueType="number" v-model="form.channelTypes" multiple  @change="search"/>
          </el-form-item>
        </el-col>
        <el-col :lg="7" :md="7" :sm="12" :xs="24">
          <el-form-item label="自定义周期">
            <el-date-picker v-model="timeArr" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :default-time="defaultTime" @change="onDateChange"
              :range-separator="t('common.time.to')" :start-placeholder="t('common.time.start')" :end-placeholder="t('common.time.end')" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('monitoringReport.profitLossRanking.periodType')">
            <el-radio-group v-model="form.periodType" @change="onPeriodChange">
              <el-radio-button :value="1">{{ t('monitoringReport.profitLossRanking.today') }}</el-radio-button>
              <el-radio-button :value="7">{{ t('monitoringReport.profitLossRanking.last7Days') }}</el-radio-button>
              <el-radio-button :value="30">{{ t('monitoringReport.profitLossRanking.last30Days') }}</el-radio-button>
              <el-radio-button :value="0">{{ t('monitoringReport.profitLossRanking.totalRank') }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :lg="5" :md="5" :sm="12" :xs="24">
          <el-form-item>
            <!-- <el-button type="primary" @click="search">{{ t('action.search') }}</el-button> -->
            <el-button @click="reset">{{ t('action.reset') }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </ele-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useFormData } from '@/utils/use-form-data';
  import { useI18n } from 'vue-i18n';
  import type { ProfitLossRankingQuery } from '@/api/operateAnalysis/model/profitLossRanking';
  import { useConfigStore } from '@/store/modules/config';

  const { t } = useI18n();
  const configStore = useConfigStore();
  const emit = defineEmits<{
    (e: 'search', where?: Partial<ProfitLossRankingQuery>): void;
  }>();

  /** 表单数据 */
  const [form, resetFields] = useFormData<Partial<ProfitLossRankingQuery>>({
    periodType: 1,
    countryCode: configStore.countryArr?.[0]?.code || '',
    channelTypes: undefined,
    startDate: undefined,
    endDate: undefined
  });

  /** 日期时间选择器默认时间 */
  const defaultTime: [Date, Date] = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)];

  const timeArr = ref<[string, string] | undefined>(undefined);

  /* 日期变更（同时清空排行周期） */
  const onDateChange = () => {
    form.periodType = undefined;
    search();
  };

  /* 排行周期变更（同时清空时间） */
  const onPeriodChange = () => {
    timeArr.value = undefined;
    search();
  };

  /* 搜索 */
  const search = () => {
    const [startDate, endDate] = timeArr.value || [];
    emit('search', { ...form, startDate, endDate });
  };

  /* 重置 */
  const reset = () => {
    resetFields();
    timeArr.value = undefined;
    search();
  };

  /* 暴露搜索参数供导出使用 */
  const searchParams = () => {
    return { ...form };
  };

  defineExpose({
    searchParams
  });
</script>
