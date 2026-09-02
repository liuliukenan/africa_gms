<template>
  <ele-card :body-style="{ padding: '0px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <!-- 常驻字段 -->
        <el-col :lg="7" :md="7" :sm="12" :xs="24">
          <el-form-item :label="t('welfare.userRecall.timeArr')">
            <el-date-picker v-model="timeArr" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :default-time="defaultTime" :range-separator="t('common.time.to')" :start-placeholder="t('common.time.start')" :end-placeholder="t('common.time.end')" clearable style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col  :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('welfare.userRecall.table.uid')">
            <el-input-number v-model="form.uid" :placeholder="t('common.placeholder.input')" clearable style="width: 100%" :controls="false" />
          </el-form-item>
        </el-col>
        <el-col  :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('welfare.userRecall.table.strategyType')">
            <el-select v-model="form.strategyType" :placeholder="t('common.placeholder.select')" clearable style="width: 100%">
              <el-option :label="t('welfare.userRecall.strategyRegister')" value="register" />
              <el-option :label="t('welfare.userRecall.strategyDeposit')" value="deposit" />
              <el-option :label="t('welfare.userRecall.strategyLoginInactive')" value="login_inactive" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('welfare.userRecall.table.pushChannel')">
            <el-select v-model="form.pushChannel" :placeholder="t('common.placeholder.select')" clearable style="width: 100%">
              <el-option :label="t('welfare.userRecall.channelSms')" value="SMS" />
              <el-option :label="t('welfare.userRecall.channelAppPush')" value="APP_PUSH" />
              <el-option :label="t('welfare.userRecall.channelInApp')" value="IN_APP" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('welfare.userRecall.table.status')">
            <el-select v-model="form.status" :placeholder="t('common.placeholder.select')" clearable style="width: 100%">
              <el-option :label="t('welfare.userRecall.statusPending')" :value="0" />
              <el-option :label="t('welfare.userRecall.statusExecuted')" :value="1" />
              <el-option :label="t('welfare.userRecall.statusSkipped')" :value="2" />
              <el-option :label="t('welfare.userRecall.statusCancelled')" :value="3" />
              <el-option :label="t('welfare.userRecall.statusIpRisk')" :value="4" />
              <el-option :label="t('welfare.userRecall.statusDeviceRisk')" :value="5" />
              <el-option :label="t('welfare.userRecall.statusProcessing')" :value="9" />
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 操作按钮列 -->
        <el-col :lg="5" :md="12" :sm="12" :xs="24">
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
import type { RecallTaskQuery } from '@/api/welfare/model/userRecall';
import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';

const { t } = useI18n();

const emit = defineEmits<{
  (e: 'search', where?: RecallTaskQuery): void;
}>();

const [form, resetFields] = useFormData<RecallTaskQuery>({
  uid: undefined,
  strategyType: undefined,
  pushChannel: undefined,
  status: undefined
});

const searchExpand = ref(false);

/** 日期时间选择器默认时间 */
const defaultTime: [Date, Date] = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)];

const timeArr = ref<[string, string] | undefined>([
  dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
  dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
]);

const search = () => {
  const [startDate, endDate] = timeArr.value || [];
  if (startDate && endDate) {
    const diffDays = dayjs(endDate).diff(dayjs(startDate), 'day');
    if (diffDays > 90) {
      ElMessage.warning(t('common.timeRangeExceed'));
      timeArr.value = undefined;
      return;
    }
  }
  emit('search', { ...form, startDate, endDate });
};

const reset = () => {
  resetFields();
  // timeArr.value = [
  //   dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
  //   dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  // ];
  timeArr.value = undefined;
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
