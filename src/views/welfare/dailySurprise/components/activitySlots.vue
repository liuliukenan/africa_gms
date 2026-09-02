<template>
  <div>
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px">
      <div class="sub-title">奖励档位配置 <span style="font-size: 15px; color: #ffa82f">(-1表示每日投放不限量)</span></div>
      <el-button type="primary" size="small" @click="handleAddSlot">新增档位</el-button>
    </div>
    <el-table :data="model" border style="width: 100%">
      <el-table-column label="档位" prop="slotNo" align="center">
        <template #default="scope">
          <span>第{{ scope.row.slotNo }}档</span>
        </template>
      </el-table-column>
      <el-table-column label="加成比例(%)" prop="rewardRatio" align="center">
        <template #default="scope">
          <el-input-number :controls="false" :min="0" :precision="3" v-model="scope.row.rewardRatio" placeholder="请输入奖励比例" style="width: 100%" size="small" />
        </template>
      </el-table-column>
      <el-table-column label="权重" prop="weight" align="center">
        <template #default="scope">
          <el-input-number :controls="false" :min="0" v-model="scope.row.weight" placeholder="请输入权重" style="width: 100%" size="small" />
        </template>
      </el-table-column>
      <el-table-column label="每日最大投放次数" prop="dailyStock" align="center">
        <template #default="scope">
          <el-input-number :controls="false" v-model="scope.row.dailyStock" placeholder="请输入每日最大投放次数" style="width: 100%" size="small" />
        </template>
      </el-table-column>
      <el-table-column :label="t('action.action')" width="80" align="center" fixed="right">
        <template #default="scope">
          <el-button type="danger" link size="small" @click="handleDeleteSlot(scope.$index)">{{ t('action.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import type { DailyRechargeSurpriseSlot } from '@/api/welfare/model/dailySurprise';

  const props = defineProps<{
    /** 奖励档位列表（v-model） */
    modelValue?: DailyRechargeSurpriseSlot[];
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', val: DailyRechargeSurpriseSlot[]): void;
  }>();

  const { t } = useI18n();

  const model = computed({
    get: () => props.modelValue || [],
    set: (val) => emit('update:modelValue', val)
  });

  // 新增档位
  const handleAddSlot = () => {
    const newSlot: DailyRechargeSurpriseSlot = {
      slotNo: model.value.length + 1,
      rewardRatio: undefined,
      weight: undefined,
      dailyStock: undefined
    };
    model.value.push(newSlot);
  };

  // 删除档位
  const handleDeleteSlot = (index: number) => {
    model.value.splice(index, 1);
    // 重新整理档位编号
    model.value.forEach((item, i) => {
      item.slotNo = i + 1;
    });
  };
</script>

<style lang="scss" scoped>
  .sub-title {
    font-size: 20px;
    font-weight: bold;
    margin: 8px 0;
    &::before {
      content: '';
      display: inline-block;
      width: 6px;
      min-height: 30px;
      height: 100%;
      background-color: #1677ff;
      vertical-align: -8px;
      margin-right: 5px;
    }
  }
</style>
