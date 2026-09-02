<template>
  <ele-card :body-style="{ padding: '0px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <!-- 国家 -->
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('activityConfig.baseConfig.country')">
            <el-select v-model="form.countryCode" :placeholder="t('common.placeholder.select')" style="width: 100%" @change="search">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code || ''" />
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 时间 -->
        <!-- <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('welfare.cashWheel.timeRange')">
            <el-date-picker v-model="timeArr" type="daterange" :value-format="'YYYY-MM-DD'" @change="search" :range-separator="t('common.time.to')" :start-placeholder="t('common.time.start')" :end-placeholder="t('common.time.end')" clearable style="width: 100%" />
          </el-form-item>
        </el-col> -->
        <!-- 活动ID -->
        <el-col :lg="6" :md="6" :sm="12" :xs="24" >
          <el-form-item :label="t('welfare.cashWheel.robotTable.actItemId')">
            <el-input-number v-model="form.actItemId" :placeholder="t('common.placeholder.input')" clearable style="width: 100%" :controls="false" />
          </el-form-item>
        </el-col>
        <!-- 状态 -->
        <el-col :lg="6" :md="6" :sm="12" :xs="24" >
          <el-form-item :label="t('welfare.cashWheel.robotTable.status')">
            <el-select v-model="form.status" :placeholder="t('common.placeholder.select')" clearable style="width: 100%">
              <el-option :label="t('welfare.cashWheel.robotTable.statusDisabled')" :value="0" />
              <el-option :label="t('welfare.cashWheel.robotTable.statusEnabled')" :value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 文本关键词 -->
        <el-col :lg="6" :md="6" :sm="12" :xs="24" v-show="searchExpand">
          <el-form-item :label="t('welfare.cashWheel.robotTable.keyword')">
            <el-input v-model="form.keyword" :placeholder="t('common.placeholder.input')" clearable style="width: 100%" />
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
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { ArrowDown, ArrowUp } from '@/components/icons';
import { useFormData } from '@/utils/use-form-data';
import type { CashWheelRobotTextQuery } from '@/api/welfare/model/cashWheel';
import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';
import { useConfigStore } from '@/store/modules/config';

const { t } = useI18n();

const emit = defineEmits<{
  (e: 'search', where?: CashWheelRobotTextQuery): void;
}>();

const configStore = useConfigStore();

const [form, resetFields] = useFormData<CashWheelRobotTextQuery>({
  countryCode: configStore.countryArr?.[0]?.code || undefined,
  startDate: undefined,
  endDate: undefined,
  actItemId: undefined,
  status: undefined,
  keyword: undefined
});

const searchExpand = ref(false);

const timeArr = ref<[string, string]>([dayjs().subtract(7, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]);

const search = () => {
  const [startDate, endDate] = timeArr.value || [];
  if (startDate && endDate) {
    const diffDays = dayjs(endDate).diff(dayjs(startDate), 'day');
    if (diffDays > 90) {
      ElMessage.warning(t('common.timeRangeExceed'));
      timeArr.value = ['', ''];
      return;
    }
  }
  emit('search', { ...form, startDate, endDate });
};

const reset = () => {
  resetFields();
  timeArr.value = ['', ''];
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
