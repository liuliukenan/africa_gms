<!-- 余额排行榜搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('monitoringReport.balanceRanking.countryCode')">
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
        <!-- <el-col :lg="8" :md="8" :sm="12" :xs="24">
          <el-form-item :label="t('monitoringReport.balanceRanking.periodType')">
            <el-radio-group v-model="form.periodType" @change="search">
              <el-radio-button :value="1">{{ t('monitoringReport.balanceRanking.today') }}</el-radio-button>
              <el-radio-button :value="7">{{ t('monitoringReport.balanceRanking.last7Days') }}</el-radio-button>
              <el-radio-button :value="30">{{ t('monitoringReport.balanceRanking.last30Days') }}</el-radio-button>
              <el-radio-button :value="0">{{ t('monitoringReport.balanceRanking.totalRank') }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col> -->

        <el-col :lg="6" :md="6" :sm="12" :xs="24">
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
  import { useFormData } from '@/utils/use-form-data';
  import { useI18n } from 'vue-i18n';
  import type { BalanceRankingQuery } from '@/api/operateAnalysis/model/balanceRanking';
  import { useConfigStore } from '@/store/modules/config';

  const { t } = useI18n();
  const configStore = useConfigStore();
  const emit = defineEmits<{
    (e: 'search', where?: Partial<BalanceRankingQuery>): void;
  }>();

  /** 表单数据 */
  const [form, resetFields] = useFormData<Partial<BalanceRankingQuery>>({
    periodType: 1,
    countryCode: configStore.countryArr?.[0]?.code || '',
    channelTypes: undefined
  });

  /* 搜索 */
  const search = () => {
    emit('search', { ...form });
  };

  /* 重置 */
  const reset = () => {
    resetFields();
    form.periodType= 1
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
