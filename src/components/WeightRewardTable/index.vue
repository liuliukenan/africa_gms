<template>
  <div class="weight-reward-table">
    <div class="weight-reward-header">
      <div class="weight-reward-title">
        <span>{{ t('activityConfig.rewardConfig.weightRewardConfigTitle') }}</span>
        <el-tag size="small" type="success">
          {{ t('activityConfig.rewardConfig.weightRewardGearCount', { count: list.length }) }}
        </el-tag>
        <!-- <el-tag size="small" type="info">
          {{ t('activityConfig.rewardConfig.weightRewardValidCount', { count: validCount }) }}
        </el-tag> -->
        <el-tag size="small" type="warning">
          {{ t('activityConfig.rewardConfig.weightRewardTotalWeight', { weight: totalWeight }) }}
        </el-tag>
      </div>
      <el-button type="primary" size="small" @click="handleAddRow">
        {{ t('activityConfig.rewardConfig.weightRewardAddGear') }}
      </el-button>
    </div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column
        :label="t('activityConfig.rewardConfig.weightRewardGear')"
        prop="id"
        align="center"
        width="80"
      >
        <template #default="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column
        :label="t('activityConfig.rewardConfig.weightRewardAmount')"
        prop="amount"
        align="center"
      >
        <template #default="scope">
          <el-input-number
            :controls="false"
            v-model="scope.row.amount"
            :min="0"
            :placeholder="t('common.placeholder.input')"
            style="width: 100%"
            size="small"
          />
        </template>
      </el-table-column>
      <el-table-column
        :label="t('activityConfig.rewardConfig.weightRewardWeight')"
        prop="weight"
        align="center"
      >
        <template #default="scope">
          <el-input-number
            :controls="false"
            v-model="scope.row.weight"
            :min="0"
            :placeholder="t('common.placeholder.input')"
            style="width: 100%"
            size="small"
            @change="handleWeightChange(scope.row, scope.$index)"
          />
        </template>
      </el-table-column>
      <el-table-column :label="t('action.action')" width="80" align="center" fixed="right">
        <template #default="scope">
          <el-button type="danger" link @click="handleDeleteRow(scope.$index)" size="small">
            {{ t('action.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { ElMessage } from 'element-plus';
  import type { WeightList } from '@/api/welfare/model/registerGive';

  const props = defineProps<{
    /** 权重奖励档位列表 */
    modelValue: WeightList[];
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: WeightList[]): void;
  }>();

  const { t } = useI18n();

  const list = computed<WeightList[]>({
    get: () => props.modelValue || [],
    set: (val) => emit('update:modelValue', val)
  });

  /** 有效档位数量（金额与权重均填写且大于0） */
  const validCount = computed(
    () => list.value.filter((item) => item.weight && item.weight > 0 && item.amount && item.amount > 0).length
  );

  /** 总权重 */
  const totalWeight = computed(() => list.value.reduce((sum, item) => sum + (Number(item.weight) || 0), 0));

  /** 添加档位 */
  const handleAddRow = () => {
    list.value = [...list.value, { id: undefined, weight: undefined, amount: undefined }];
  };

  /** 删除档位 */
  const handleDeleteRow = (index: number) => {
    const next = [...list.value];
    next.splice(index, 1);
    list.value = next;
  };

  /** 最大权重 */
  const MAX_WEIGHT = 100;

  /**
   * 权重变更：总权重超过最大值时提示并强制改为剩余权重
   */
  const handleWeightChange = (row: WeightList, index: number) => {
    const total = list.value.reduce((sum, item) => sum + (Number(item.weight) || 0), 0);
    if (total > MAX_WEIGHT) {
      const others = list.value.reduce(
        (sum, item, i) => sum + (i === index ? 0 : Number(item.weight) || 0),
        0
      );
      const remaining = Math.max(0, MAX_WEIGHT - others);
      row.weight = remaining;
      ElMessage.warning(t('activityConfig.validation.weightRewardTotalExceed', { remaining }));
    }
  };

  /**
   * 校验权重奖励表格
   * @returns 校验是否通过
   */
  const validate = (): { valid: boolean; message?: string } => {
    if (list.value.length === 0) {
      return { valid: false, message: t('activityConfig.validation.weightRewardListRequired') };
    }
    for (let i = 0; i < list.value.length; i++) {
      const item = list.value[i];
      if (!item.amount || item.amount <= 0) {
        return {
          valid: false,
          message: `第${i + 1}行：${t('activityConfig.validation.weightRewardAmountRequired')}`
        };
      }
      if (item.weight == null || item.weight <= 0) {
        return {
          valid: false,
          message: `第${i + 1}行：${t('activityConfig.validation.weightRewardWeightRequired')}`
        };
      }
    }
    return { valid: true };
  };

  defineExpose({
    validate
  });
</script>

<style scoped>
  .weight-reward-table {
    margin-top: 16px;
  }
  .weight-reward-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }
  .weight-reward-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: bold;
  }
</style>
