<template>
  <ele-card :body-style="{ padding: '0px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <!-- 常驻字段 -->
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('activityConfig.baseConfig.country')">
            <el-select v-model="form.countryCode" :placeholder="t('common.placeholder.select')" style="width: 100%" @change="search">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code || ''" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="7" :md="7" :sm="12" :xs="24">
          <el-form-item :label="t('welfare.repay.timeArr')">
            <el-date-picker v-model="timeArr" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :default-time="defaultTime" @change="search" :range-separator="t('common.time.to')" :start-placeholder="t('common.time.start')" :end-placeholder="t('common.time.end')" clearable style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24" v-show="searchExpand">
          <el-form-item :label="t('welfare.repay.table.uid')">
            <el-input-number v-model="form.uid" :placeholder="t('common.placeholder.input')" clearable style="width: 100%" :controls="false"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24" v-show="searchExpand">
          <el-form-item :label="t('welfare.repay.table.invitedPhone')">
            <el-input v-model="form.invitedPhone" :placeholder="t('common.placeholder.input')" clearable />
          </el-form-item>
        </el-col>
        <!-- <el-col :lg="6" :md="6" :sm="12" :xs="24" v-show="searchExpand">
                    <el-form-item label="邀请类型">
                        <dict-data code="act_sub_type" v-model="form.subType" type="select" value-type="string" />
                    </el-form-item>
                </el-col> -->
        <!-- <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="状态">
                        <el-select v-model="form.status" placeholder="请选择" clearable style="width: 100%;">
                            <el-option label="正常" :value="0" />
                            <el-option label="IP风控" :value="1" />
                            <el-option label="设备风控" :value="2" />
                        </el-select>
                    </el-form-item>
                </el-col> -->
        <!-- <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="代理ID">
                        <el-input v-model="form.agentId" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col> -->

        <!-- 操作按钮列 -->
        <el-col :lg="5" :md="12" :sm="12" :xs="24">
          <el-form-item label-width="16px">
            <el-button type="primary" @click="search">{{ t('action.search') }}</el-button>
            <el-button @click="reset">{{ t('action.reset') }}</el-button>
            <el-link type="primary" :underline="false"
                            @click="toggleExpand" style="margin-left: 12px">
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
  import type { RepayRecordVO, RepayRecordParam } from '@/api/welfare/model/repay';
  import dayjs from 'dayjs';
  import { ElMessage } from 'element-plus';
  import { useConfigStore } from '@/store/modules/config';

  const { t } = useI18n();

  const emit = defineEmits<{
    (e: 'search', where?: RepayRecordParam): void;
  }>();

  const configStore = useConfigStore();

  const [form, resetFields] = useFormData<RepayRecordParam>({
    countryCode: configStore.countryArr?.[0]?.code || undefined,
    startDate: undefined,
    endDate: undefined,
    uid: undefined,
    subType: undefined,
    status: undefined,
    invitedPhone: undefined,
    round: undefined,
    agentId: undefined
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
