<!-- 搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('platform.countryCode.name')">
            <el-select v-model="form.countryCode" :placeholder="t('common.placeholder.select')" style="width: 100%;" @change="search">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name"
                :value="item.code || ''" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="7" :md="7" :sm="12" :xs="24">
          <el-form-item :label="t('user.mail.timeArr')">
            <el-date-picker type="datetimerange" v-model="dateRange" :range-separator="t('common.time.to')" value-format="YYYY-MM-DD HH:mm:ss"
              :default-time="defaultTime" :start-placeholder="t('common.time.start')" :end-placeholder="t('common.time.end')" class="ele-fluid" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.mail.table.fromUid')">
            <el-input clearable v-model.trim="form.fromUid" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.mail.table.toUid')">
            <el-input clearable v-model.trim="form.toUid" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
        <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.mail.table.status')">
            <dict-data code="mailState" valueType="number" v-model="form.status" :placeholder="t('common.placeholder.select')" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.mail.table.type')">
            <dict-data code="mailType" valueType="number" v-model="form.type" :placeholder="t('common.placeholder.select')" />
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
import { useFormData } from '@/utils/use-form-data';
import type { MailParam } from '@/api/model/mail';
import { useConfigStore } from '@/store/modules/config';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';
import { ArrowDown, ArrowUp } from '@/components/icons';
const { t } = useI18n();
const configStore = useConfigStore();
const emit = defineEmits<{
  (e: 'search', where?: MailParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<MailParam>({
  fromUid: undefined,
  toUid: undefined,
  status: undefined,
  type: undefined,
  startDate: undefined,
  countryCode: 254,
  endDate: undefined
});

/** 搜索表单是否展开 */
const searchExpand = ref(false);
/** 切换搜索表单展开状态 */
const toggleExpand = () => {
    searchExpand.value = !searchExpand.value;
};

/** 日期时间选择器默认时间 */
const defaultTime: [Date, Date] = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)];
/** 日期范围 */
const dateRange = ref<[string, string] | undefined>([
  dayjs().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
  dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
]);
/** 搜索 */
const search = () => {
  const [startDate, endDate] = dateRange.value || [];
  emit('search', { ...form, startDate, endDate });
};
const searchParams = () => {
  const [startDate, endDate] = dateRange.value || [];
  return { ...form, startDate, endDate };
};

defineExpose({
  searchParams,
  search
});
/**  重置 */
const reset = () => {
  resetFields();
  dateRange.value = [
    dayjs().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  ];
  search();
};
</script>
