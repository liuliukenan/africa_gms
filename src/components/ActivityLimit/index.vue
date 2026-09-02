<template>
  <el-row :gutter="16">
    <!-- IP 限制次数 -->
    <el-col :md="8" :sm="24" :xs="24">
      <el-form-item :label="t('activityConfig.limitConfig.ipLimit')" prop="ipLimit">
        <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="model.ipLimit" style="width: 100%" />
      </el-form-item>
    </el-col>
    <!-- IP 限制周期 -->
    <el-col :md="8" :sm="24" :xs="24">
      <el-form-item :label="t('activityConfig.limitConfig.ipPeriod')" prop="ipPeriod">
        <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="model.ipPeriod" style="width: 100%" />
      </el-form-item>
    </el-col>
    <!-- 设备限制次数 -->
    <el-col :md="8" :sm="24" :xs="24">
      <el-form-item :label="t('activityConfig.limitConfig.deviceLimit')" prop="deviceLimit">
        <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="model.deviceLimit" style="width: 100%" />
      </el-form-item>
    </el-col>
    <!-- 设备限制周期 -->
    <el-col :md="8" :sm="24" :xs="24">
      <el-form-item :label="t('activityConfig.limitConfig.devicePeriod')" prop="devicePeriod">
        <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="model.devicePeriod" style="width: 100%" />
      </el-form-item>
    </el-col>
    <!-- 奖励次数限制 -->
    <el-col :md="8" :sm="24" :xs="24">
      <el-form-item :label="t('activityConfig.limitConfig.rewardLimit')" prop="rewardLimit">
        <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="model.rewardLimit" style="width: 100%" />
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  const props = defineProps<{
    /** 子配置对象（v-model），包含 ipLimit/ipPeriod/deviceLimit/devicePeriod/rewardLimit */
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
