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
          <el-form-item :label="t('user.smsRecord.timeArr')">
            <el-date-picker type="datetimerange" v-model="dateRange" :range-separator="t('common.time.to')" value-format="YYYY-MM-DD HH:mm:ss" :default-time="defaultTime" :start-placeholder="t('common.time.start')" :end-placeholder="t('common.time.end')" class="ele-fluid" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.smsRecord.table.fullPhone')">
            <el-input clearable v-model.trim="form.phone" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.smsRecord.table.type')">
            <el-input clearable v-model.trim="form.type" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.smsRecord.table.status')">
            <el-select v-model="form.status" :placeholder="t('common.placeholder.select')" clearable style="width: 100%">
              <el-option :label="t('user.smsRecord.statusSuccess')" :value="1" />
              <el-option :label="t('user.smsRecord.statusFail')" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="5" :md="12" :sm="12" :xs="24">
          <el-form-item label-width="16px">
            <el-button type="primary" @click="search">{{ t('action.search') }}</el-button>
            <el-button @click="reset">{{ t('action.reset') }}</el-button>
            <el-link type="primary" :underline="false" @click="toggleExpand" style="margin-left: 12px"> </el-link>
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
  import { useFormData } from '@/utils/use-form-data';
  import type { SmsRecordParam } from '@/api/model/smsRecord';
  import dayjs from 'dayjs';
  import { useConfigStore } from '@/store/modules/config';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const configStore = useConfigStore();
  const emit = defineEmits<{
    (e: 'search', where?: SmsRecordParam): void;
  }>();

  /** 表单数据 */
  const [form, resetFields] = useFormData<SmsRecordParam>({
    phone: '',
    countryCode: 254,
    status: undefined as number | undefined,
    startDate: undefined,
    type: undefined,
    endDate: undefined
  });

  /** 搜索表单是否展开 */
  const searchExpand = ref(false);
  /** 日期时间选择器默认时间 */
  const defaultTime: [Date, Date] = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)];
  /** 日期范围 */
  const dateRange = ref<[string, string] | undefined>([dayjs().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'), dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')]);
  /** 搜索 */
  const search = () => {
    const [startDate, endDate] = dateRange.value || [];
    emit('search', { ...form, startDate, endDate });
  };
  const searchParams = () => {
    const [startDate, endDate] = dateRange.value || [];
    return { ...form, startDate, endDate };
  };

  /**  重置 */
  const reset = () => {
    resetFields();
    dateRange.value = [dayjs().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'), dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')];
    search();
  };
  defineExpose({
    searchParams,
    search
  });
  /** 搜索展开/收起 */
  const toggleExpand = () => {
    searchExpand.value = !searchExpand.value;
  };
</script>
