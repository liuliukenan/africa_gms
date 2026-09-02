<!-- 搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.payRecord.search.orderNo')">
            <el-input clearable v-model.trim="form.orderNo" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.payRecord.search.uid')">
            <el-input clearable v-model.trim="form.uid" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
        <el-col :lg="7" :md="7" :sm="12" :xs="24">
          <el-form-item :label="t('user.payRecord.search.operateTime')">
            <el-date-picker type="datetimerange" v-model="dateRange" range-separator="-" value-format="YYYY-MM-DD HH:mm:ss" :default-time="defaultTime" :start-placeholder="t('common.time.start')" :end-placeholder="t('common.time.end')" class="ele-fluid" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.payRecord.table.phone')">
            <el-input clearable v-model.trim="form.phone" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
        <!-- <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.payRecord.search.moneyType')">
            <dict-data code="moneyType" valueType="number" v-model="form.moneyType" />
          </el-form-item>
        </el-col> -->
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.payRecord.search.payChannel')">
            <StringSelect v-model="form.payChannelId" :dict-code="'payType'" :placeholder="t('common.placeholder.select')" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="渠道类型">
            <dict-data code="channelNewType" valueType="number" v-model="form.channelType" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.payRecord.search.transactionId')">
            <el-input clearable v-model.trim="form.transactionId" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.payRecord.search.payStatus')">
            <StringSelect v-model="form.payStatus" :dict-code="'payStatus'" :placeholder="t('common.placeholder.select')" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.payRecord.search.orderStatus')">
            <StringSelect v-model="form.status" :dict-code="'pay_order_status'" :placeholder="t('common.placeholder.select')" />
          </el-form-item>
        </el-col>
        <el-col :lg="5" :md="12" :sm="12" :xs="24">
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
  import type { PayRecordParam } from '@/api/model/payRecord';
  import StringSelect from '@/components/StringSelect/index.vue';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  const emit = defineEmits<{
    (e: 'search', where?: PayRecordParam): void;
  }>();
  /** 表单数据 */
  const [form, resetFields] = useFormData<PayRecordParam>({
    orderNo: '',
    uid: undefined,
    moneyType: undefined,
    payChannelId: undefined,
    channelType: undefined,
    transactionId: '',
    payStatus: undefined,
    phone: undefined,
    status: undefined
  });

  /** 搜索表单是否展开 */
  const searchExpand = ref(false);
  /** 日期时间选择器默认时间 */
  const defaultTime: [Date, Date] = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)];
  /** 日期范围 */
  const dateRange = ref<[string, string] | undefined>(undefined);
  /** 搜索 */
  const search = () => {
    const [startDate, endDate] = dateRange.value || [];
    emit('search', { ...form, startDate, endDate });
  };

  /**  重置 */
  const reset = () => {
    resetFields();
    dateRange.value = undefined;
    search();
  };

  /** 搜索展开/收起 */
  const toggleExpand = () => {
    searchExpand.value = !searchExpand.value;
  };
  const searchParams = () => {
    const [startDate, endDate] = dateRange.value || [];
    return { ...form, startDate, endDate };
  };
  defineExpose({
    searchParams,
    search
  });
</script>
