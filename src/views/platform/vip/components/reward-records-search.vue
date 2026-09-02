<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <!-- 常驻字段 -->
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('platform.vip.rewardRecords.countryCode')">
            <el-select v-model="form.countryCode" :placeholder="t('common.placeholder.select')" style="width: 100%" @change="search">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code || ''" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="7" :md="7" :sm="12" :xs="24">
          <el-form-item :label="t('common.timeRange')">
            <el-date-picker v-model="timeArr" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :default-time="defaultTime" @change="search" range-separator="至" start-placeholder="开始" end-placeholder="结束" clearable style="width: 100%" />
          </el-form-item>
        </el-col>

        <!-- 展开字段 -->
        <!-- <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('platform.vip.rewardRecords.uid')">
            <el-input v-model="form.uid" :placeholder="t('common.placeholder.input')" clearable @keyup.enter="search" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('platform.vip.rewardRecords.rewardConfigId')">
            <el-input v-model="form.rewardConfigId" :placeholder="t('common.placeholder.input')" clearable @keyup.enter="search" />
          </el-form-item>
        </el-col> -->
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('platform.vip.rewardRecords.vipLevel')">
            <el-input v-model="form.vipLevel" :placeholder="t('common.placeholder.input')" clearable @keyup.enter="search" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('platform.vip.rewardRecords.businessType')">
            <el-select v-model="form.businessType" :placeholder="t('common.placeholder.select')" clearable style="width: 100%" @change="search">
              <el-option :label="t('platform.vip.configEdit.vipUpgrade')" value="vipUpgrade" />
              <el-option :label="t('platform.vip.configEdit.vipWeekly')" value="vipWeekly" />
              <el-option :label="t('platform.vip.configEdit.vipMonthly')" value="vipMonthly" />
              <el-option :label="t('platform.vip.configEdit.vipDailyRebate')" value="vipDailyRebate" />
              <el-option :label="t('platform.vip.configEdit.vipWeeklyLossRebate')" value="vipWeeklyLossRebate" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('platform.vip.rewardRecords.goodsType')">
            <dict-data v-model="form.goodsType" code="goods_type" value-type="number" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('platform.vip.rewardRecords.goodsId')">
            <el-input v-model="form.goodsId" :placeholder="t('common.placeholder.input')" clearable @keyup.enter="search" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('platform.vip.rewardRecords.claimStatus')">
            <el-select v-model="form.claimStatus" :placeholder="t('common.placeholder.select')" clearable style="width: 100%" @change="search">
              <el-option :label="t('platform.vip.rewardRecords.claimStatus0')" :value="0" />
              <el-option :label="t('platform.vip.rewardRecords.claimStatus1')" :value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('platform.vip.rewardRecords.status')">
            <el-select v-model="form.status" :placeholder="t('common.placeholder.select')" clearable style="width: 100%" @change="search">
              <el-option :label="t('platform.vip.rewardRecords.status0')" :value="0" />
              <el-option :label="t('platform.vip.rewardRecords.status1')" :value="1" />
              <el-option :label="t('platform.vip.rewardRecords.status2')" :value="2" />
              <el-option :label="t('platform.vip.rewardRecords.status3')" :value="3" />
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
  import type { VipRewardRecordParam } from '@/api/platform/model/rewardRecords';
  import dayjs from 'dayjs';
  import { ElMessage } from 'element-plus';
  import { useConfigStore } from '@/store/modules/config';

  const emit = defineEmits<{
    (e: 'search', where?: VipRewardRecordParam): void;
  }>();

  const { t } = useI18n();
  const configStore = useConfigStore();

  const [form, resetFields] = useFormData<VipRewardRecordParam>({
    countryCode: configStore.countryArr?.[0]?.code || undefined,
    uid: undefined,
    rewardConfigId: undefined,
    vipLevel: undefined,
    businessType: undefined,
    goodsType: undefined,
    goodsId: undefined,
    claimStatus: undefined,
    status: undefined,
    startDate: undefined,
    endDate: undefined
  });

  const searchExpand = ref(false);

  /** 日期时间选择器默认时间 */
  const defaultTime: [Date, Date] = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)];
  const timeArr = ref<[string, string] | undefined>(undefined);

  const search = () => {
    const [startDate, endDate] = timeArr.value || [];
    // if (startDate && endDate) {
    //   const diffDays = dayjs(endDate).diff(dayjs(startDate), 'day');
    //   if (diffDays > 90) {
    //     ElMessage.warning(t('common.timeRangeExceed'));
    //     timeArr.value = undefined;
    //     return;
    //   }
    // }
    emit('search', { ...form, startDate, endDate });
  };

  const reset = () => {
    resetFields();
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
