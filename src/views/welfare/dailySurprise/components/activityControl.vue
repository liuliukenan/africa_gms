<template>
  <el-row :gutter="16">
    <!-- 单笔充值门槛 -->
    <el-col :md="8" :sm="24" :xs="24">
      <el-form-item label="单笔充值门槛" prop="rechargeThreshold">
        <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="model.rechargeThreshold" style="width: 100%" />
      </el-form-item>
    </el-col>
    <!-- 规则付费门槛 -->
    <el-col :md="8" :sm="24" :xs="24">
      <el-form-item label="规则付费门槛" prop="rulesThreshold">
        <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="model.rulesThreshold" style="width: 100%" />
      </el-form-item>
    </el-col>
    <!-- 单次充值上限 -->
    <el-col :md="8" :sm="24" :xs="24">
      <el-form-item label="单次充值上限" prop="singleRechargeLimit">
        <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="model.singleRechargeLimit" style="width: 100%" />
      </el-form-item>
    </el-col>
    <!-- 未使用次数上限 -->
    <el-col :md="8" :sm="24" :xs="24">
      <el-form-item label="未使用次数上限" prop="remainingTimesLimit">
        <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="model.remainingTimesLimit" style="width: 100%" />
      </el-form-item>
    </el-col>
    <!-- 每日获得次数上限 -->
    <el-col :md="8" :sm="24" :xs="24">
      <el-form-item label="每日获得次数上限" prop="dailyTimesLimit">
        <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="model.dailyTimesLimit" style="width: 100%" />
      </el-form-item>
    </el-col>
    <!-- 次数兜底有效期(天) -->
    <el-col :md="8" :sm="24" :xs="24">
      <el-form-item label="次数兜底有效期(天)" prop="chanceExpireDays">
        <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="model.chanceExpireDays" style="width: 100%" />
      </el-form-item>
    </el-col>
    <!-- <el-col :md="8" :sm="24" :xs="24">
      <el-form-item label="Bonus流水倍数" prop="flowMultiple">
        <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="model.flowMultiple" style="width: 100%" />
      </el-form-item>
    </el-col> -->
  </el-row>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  const props = defineProps<{
    /** 每日充值惊喜专属配置对象（v-model） */
    modelValue: Record<string, any>;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', val: Record<string, any>): void;
  }>();

  const { t } = useI18n();

  const model = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  });
</script>
