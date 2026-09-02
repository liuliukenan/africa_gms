<template>
  <MultiActivityConfig :title="t('welfare.repay.configTitle')" :get-api="() => getActInfo({ countryCode: 254, actTypeEnum: 'REPAY' })" :save-api="saveActInfo" :send-api="sendActInfoServer" :config-keys="configKeys" :config-labels="configLabels" act-type-enum="REPAY" />
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import MultiActivityConfig from '@/components/MultiActivityConfig/index.vue';
  import { getActInfo, saveActInfo, sendActInfoServer } from '@/api/welfare/activitysApi';

  const { t } = useI18n();

  // 配置键名数组
  const configKeys = [
    'repayFirst', // 第1天奖励
    'repaySecond', // 第2天奖励
    'repayThird', // 第3天奖励
    'repayUltimate' // 最终奖励
  ];

  // 配置标签映射
  const configLabels = computed<Record<string, string>>(() => ({
    repayFirst: t('welfare.repay.day1Reward'),
    repaySecond: t('welfare.repay.day2Reward'),
    repayThird: t('welfare.repay.day3Reward'),
    repayUltimate: t('welfare.repay.day4Reward')
  }));
</script>

<style lang="scss" scoped>
  ::v-deep .el-divider__text {
    font-weight: bold;
    font-size: 20px;
  }

  .title {
    padding-left: 30px;
    font-weight: bold;
    font-size: 20px;
    margin: 20px 0;
  }

  .form-table .el-form-item {
    margin-bottom: 0 !important;
  }

  .tips {
    color: red;
  }

  :deep(.el-input.is-disabled .el-input__wrapper) {
    background: rgb(253, 247, 247);
    color: black !important;
  }

  :deep(.el-input.is-disabled .el-input__inner) {
    color: black !important;
  }
</style>
