<template>
  <div>
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px">
      <strong>{{ title || '推送配置' }}</strong>
      <el-button type="primary" size="small" @click="handleAdd">+ 新增推送</el-button>
    </div>
    <div v-for="(strategy, sIdx) in modelValue" :key="strategy.id ?? sIdx" class="strategy-block">
      <!-- <el-input v-model="strategy.strategyName" :placeholder="t('common.placeholder.input')" size="small" class="strategy-name-input" /> -->
      <ActivityPush v-model="strategy.pushes" :country-code="countryCode" :strategy-id="strategy.id" :show-add-button="false" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import ActivityPush from '@/components/ActivityPush/index.vue';
  import type { PushStrategy, Push } from '@/api/welfare/model/registerGive';

  const props = defineProps<{
    /** 推送策略数组（v-model），每个元素含 pushes 数组 */
    modelValue?: PushStrategy[];
    /** 策略标题 */
    title?: string;
    /** 国家代码（用于加载短信/App推送模板列表） */
    countryCode?: number;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', val: PushStrategy[]): void;
  }>();

  const { t } = useI18n();

  // 新增推送（默认添加到第一个策略，如果没有则创建）
  const handleAdd = () => {
    const list = [...(props.modelValue || [])];
    if (list.length === 0) {
      list.push({ id: 0, strategyName: '', pushes: [] });
    }
    const strategy = list[0];
    const newPush: Push = {
      id: undefined,
      strategyId: strategy.id,
      pushName: '',
      delayValue: 0,
      delayUnit: 'MINUTES',
      needReward: 0,
      smsTemplateId: undefined,
      appPushTemplateId: undefined,
      inAppTemplateId: undefined,
      sortOrder: (strategy.pushes?.length || 0) + 1,
      status: 1
    };
    strategy.pushes = strategy.pushes || [];
    strategy.pushes.push(newPush);
    emit('update:modelValue', list);
  };
</script>

<style lang="scss" scoped>
  .strategy-block {
    margin-bottom: 16px;
  }
  .strategy-name-input {
    width: 200px;
    margin-bottom: 8px;
  }
</style>
