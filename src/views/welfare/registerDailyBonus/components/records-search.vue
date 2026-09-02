<template>
  <ele-card :body-style="{ padding: '0px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <!-- 国家代码 -->
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="国家代码">
            <el-select v-model="form.countryCode" :placeholder="t('common.placeholder.select')" style="width: 100%" @change="search">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code || ''" />
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 用户ID -->
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="用户ID">
            <el-input v-model="form.uid" :placeholder="t('common.placeholder.input')" clearable style="width: 100%" />
          </el-form-item>
        </el-col>
        <!-- 状态 -->
        <el-col :lg="6" :md="6" :sm="12" :xs="24" v-show="searchExpand">
          <el-form-item label="状态">
            <el-select v-model="form.status" :placeholder="t('common.placeholder.select')" clearable style="width: 100%">
              <el-option label="正常" :value="0" />
              <el-option label="IP风控" :value="1" />
              <el-option label="设备风控" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 日期范围 -->
        <el-col :lg="6" :md="6" :sm="12" :xs="24" v-show="searchExpand">
          <el-form-item label="日期范围">
            <el-date-picker v-model="timeArr" type="daterange" :range-separator="t('common.time.to')" :start-placeholder="t('common.time.start')" :end-placeholder="t('common.time.end')" clearable style="width: 100%" />
          </el-form-item>
        </el-col>
        <!-- 操作按钮列 -->
        <el-col :lg="6" :md="12" :sm="12" :xs="24">
          <el-form-item label-width="16px">
            <el-button type="primary" @click="search">{{ t('action.search') }}</el-button>
            <el-button @click="reset">{{ t('action.reset') }}</el-button>
            <el-link type="primary" :underline="false" @click="toggleExpand" style="margin-left: 12px">
              <template v-if="searchExpand">
                <span>{{ t('action.collapse') }}</span>
                <el-icon style="vertical-align: -1px"><ArrowUp /></el-icon>
              </template>
              <template v-else>
                <span>{{ t('action.expand') }}</span>
                <el-icon style="vertical-align: -2px"><ArrowDown /></el-icon>
              </template>
            </el-link>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </ele-card>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useFormData } from '@/utils/use-form-data';
  import type { ActRecordQuery } from '@/api/welfare/model/registerDailyBonus';
  import { useConfigStore } from '@/store/modules/config';

  const { t } = useI18n();

  const emit = defineEmits<{
    (e: 'search', where?: ActRecordQuery): void;
  }>();
  const searchExpand = ref(false);
  // 国家列表
  const configStore = useConfigStore();
  const [form, resetFields] = useFormData<ActRecordQuery>({
    countryCode: configStore.countryArr?.[0]?.code || undefined,
    uid: undefined,
    status: undefined,
    startDate: undefined,
    endDate: undefined
  });

  const timeArr = ref<any>(null);

  const search = () => {
    const [startDate, endDate] = timeArr.value || [];
    emit('search', { ...form, startDate, endDate });
  };

  const reset = () => {
    resetFields();
    timeArr.value = null;
    search();
  };

  const toggleExpand = () => {
    searchExpand.value = !searchExpand.value;
  };

  const searchParams = () => {
    const [startDate, endDate] = timeArr.value || [];
    return { ...form, startDate, endDate };
  };

  defineExpose({ searchParams });
</script>
