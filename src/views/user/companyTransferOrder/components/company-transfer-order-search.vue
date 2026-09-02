<!-- 搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('platform.countryCode.name')">
            <el-select v-model="form.countryCode" :placeholder="t('common.placeholder.select')" style="width: 100%" @change="search">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code || ''" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="7" :md="7" :sm="12" :xs="24">
          <el-form-item :label="t('user.companyTransferOrder.timeArr')">
            <el-date-picker v-model="timeArr" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :default-time="defaultTime" @change="search" :range-separator="t('common.time.to')" :start-placeholder="t('common.time.start')" :end-placeholder="t('common.time.end')" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.companyTransferOrder.table.uid')">
            <el-input clearable v-model.trim="form.uid" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24" v-show="searchExpand">
          <el-form-item :label="t('user.companyTransferOrder.table.phone')">
            <el-input clearable v-model.trim="form.phone" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.companyTransferOrder.table.gameId')">
            <el-input clearable v-model.trim="form.gameId" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.companyTransferOrder.table.transferType')">
            <el-select v-model="form.transferType" :placeholder="t('common.placeholder.select')" clearable>
              <el-option :label="t('user.companyTransferOrder.transferTypeIn')" :value="1"></el-option>
              <el-option :label="t('user.companyTransferOrder.transferTypeOut')" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.companyTransferOrder.table.status')">
            <dict-data code="company_transfer_status" v-model="form.status" valueType="number" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.companyTransferOrder.table.gameName')">
            <el-input clearable v-model.trim="form.gameName" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>

        <el-col :lg="5" :md="5" :sm="12" :xs="24">
          <el-form-item label-width="16px">
            <el-button type="primary" @click="search">{{ t('action.search') }}</el-button>
            <el-button @click="reset">{{ t('action.reset') }}</el-button>
            <el-link type="primary" :underline="false" @click="toggleExpand" style="margin-left: 12px">
              <template v-if="searchExpand">
                <span>{{ t('action.collapse') }}</span>
                <el-icon style="vertical-align: -1px">
                  <ArrowUp />
                </el-icon>
              </template>
              <template v-else>
                <span>{{ t('action.expand') }}</span>
                <el-icon style="vertical-align: -2px">
                  <ArrowDown />
                </el-icon>
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
  import { ArrowDown, ArrowUp } from '@/components/icons';
  import { useFormData } from '@/utils/use-form-data';
  import type { CompanyTransferOrderParam } from '@/api/user/model/companyTransferOrder';
  import dayjs from 'dayjs';
  import { ElMessage } from 'element-plus';
  import { useConfigStore } from '@/store/modules/config';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const emit = defineEmits<{
    (e: 'search', where?: CompanyTransferOrderParam): void;
  }>();
  const configStore = useConfigStore();
  /** 表单数据 */
  const [form, resetFields] = useFormData<CompanyTransferOrderParam>({
    id: undefined,
    uid: undefined,
    companyId: undefined,
    gameId: undefined,
    gameName: '',
    transferType: undefined,
    transferId: '',
    status: undefined,
    remark: '',
    gameUid: '',
    creditAmount: undefined,
    phone: undefined,
    currencyCode: '',
    language: '',
    beforeAmount: undefined,
    afterAmount: undefined,
    cashAmount: undefined,
    categoryAmount: undefined,
    gameAmount: undefined,
    categoryWalletId: undefined,
    gameWalletId: undefined,
    beforeCashAmount: undefined,
    beforeCategoryAmount: undefined,
    beforeGameAmount: undefined,
    afterCashAmount: undefined,
    afterCategoryAmount: undefined,
    afterGameAmount: undefined,
    startDate: undefined,
    endDate: undefined,
    countryCode: 254
  });

  /** 搜索表单是否展开 */
  const searchExpand = ref(false);

  /** 日期时间选择器默认时间 */
  const defaultTime: [Date, Date] = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)];

  let timeArr = ref<[string, string] | undefined>([
    dayjs().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  ]);
  /* 搜索 */
  const search = () => {
    const [startDay, endDay] = timeArr.value || [];
    if (startDay && endDay) {
      const start = dayjs(startDay);
      const end = dayjs(endDay);
      const diffDays = end.diff(start, 'day');
      if (diffDays > 30) {
        ElMessage.warning(t('user.companyTransferOrder.maxTimeSpanWarning'));
        timeArr.value = undefined;
        return;
      }
    }
    emit('search', { ...form, startDate: startDay, endDate: endDay });
  };

  /**  重置 */
  const reset = () => {
    resetFields();
    timeArr.value = [
      dayjs().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
    ];
    search();
  };

  /** 搜索展开/收起 */
  const toggleExpand = () => {
    searchExpand.value = !searchExpand.value;
  };
  const searchParams = () => {
    const [startDate, endDate] = timeArr.value || [];
    return { ...form, startDate, endDate };
  };

  defineExpose({
    searchParams
  });
</script>
