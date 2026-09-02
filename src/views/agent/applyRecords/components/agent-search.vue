<!-- 搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <!-- <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="国家代码">
            <el-select v-model="form.countryCode" placeholder="请选择" style="width: 100%">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('agentApplyRecords.table.agentId')">
            <el-input clearable v-model.trim="form.agentId" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
        <el-col  :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('agentApplyRecords.table.channel')">
            <el-select v-model="form.channel" :placeholder="t('common.placeholder.select')" style="width: 100%" clearable filterable>
              <el-option v-for="item in configStore.ShareChannelArr" :key="item.id" :label="item.channelName" :value="item.channel|| 0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('agentApplyRecords.table.status')">
            <el-select v-model="form.status" :placeholder="t('common.placeholder.select')">
              <el-option :label="t('agentApplyRecords.status0')" :value="0" />
              <el-option :label="t('agentApplyRecords.status1')" :value="1" />
              <el-option :label="t('agentApplyRecords.status2')" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="7" :md="7" :sm="12" :xs="24">
          <el-form-item :label="t('agentApplyRecords.timeArr')">
            <el-date-picker v-model="timeArr" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :default-time="defaultTime" :range-separator="t('common.time.to')" :start-placeholder="t('common.time.start')" :end-placeholder="t('common.time.end')" style="width: 100%" />
          </el-form-item>
        </el-col>
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
  import { ArrowDown, ArrowUp } from '@/components/icons';
  import { useFormData } from '@/utils/use-form-data';
  import type { AgentStatParam } from '@/api/agent/model/agentStat';
  import { useConfigStore } from '@/store/modules/config';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const configStore = useConfigStore();

  const emit = defineEmits<{
    (e: 'search', where?: AgentStatParam): void;
  }>();

  /** 表单数据 */
  const [form, resetFields] = useFormData<AgentStatParam>({
    countryCode: 254,
    agentId: undefined,
    inviterAgentId: undefined,
    channel: undefined,
    agentLevel: undefined,
    agentType: undefined,
    commissionModel: undefined,
    startDate: undefined,
    status: undefined,
    endDate: undefined
  });

  /** 日期时间选择器默认时间 */
  const defaultTime: [Date, Date] = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)];

  const timeArr = ref<[string, string] | undefined>(undefined);

  /** 搜索表单是否展开 */
  const searchExpand = ref(false);

  /** 搜索 */
  const search = () => {
    const [startDate, endDate] = timeArr.value || [];
    emit('search', { ...form, startDate, endDate });
  };

  /** 重置 */
  const reset = () => {
    resetFields();
    timeArr.value = undefined;
    search();
  };

  /** 搜索展开/收起 */
  const toggleExpand = () => {
    searchExpand.value = !searchExpand.value;
  };
  
  /** 获取当前搜索参数 */
  const searchParams = () => {
    const [startDate, endDate] = timeArr.value || [];
    return { ...form, startDate, endDate };
  };
  
  defineExpose({
    searchParams,
  });
</script>
