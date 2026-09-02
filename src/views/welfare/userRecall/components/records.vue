<template>
  <ele-page>
    <ele-card :body-style="{ padding: '0px' }">
      <records-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true"   :header-ellipsis="false" v-model:selections="selections" :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" :tools="['reload', 'columns', 'maximized']" cache-key="userRecallRecords">
        <template #toolbar>
          <el-popconfirm :title="t('common.sureExport')" @confirm="openExport" width="250px">
            <template #reference>
              <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">
                {{ t('action.export') }}
              </el-button>
            </template>
          </el-popconfirm>
        </template>
        <!-- 策略类型 -->
        <template #strategyType="{ row }">
          <el-tag v-if="row.strategyType === 'register'" type="primary">{{ t('welfare.userRecall.strategyRegister') }}</el-tag>
          <el-tag v-else-if="row.strategyType === 'deposit'" type="success">{{ t('welfare.userRecall.strategyDeposit') }}</el-tag>
          <el-tag v-else-if="row.strategyType === 'login_inactive'" type="warning">{{ t('welfare.userRecall.strategyLoginInactive') }}</el-tag>
        </template>
        <!-- 推送渠道 -->
        <template #pushChannel="{ row }">
          <el-tag v-if="row.pushChannel === 'SMS'" type="info">{{ t('welfare.userRecall.channelSms') }}</el-tag>
          <el-tag v-else-if="row.pushChannel === 'APP_PUSH'" type="primary">{{ t('welfare.userRecall.channelAppPush') }}</el-tag>
          <el-tag v-else-if="row.pushChannel === 'IN_APP'" type="success">{{ t('welfare.userRecall.channelInApp') }}</el-tag>
        </template>
        <!-- 是否需要奖励 -->
        <template #needReward="{ row }">
          <el-tag v-if="row.needReward === 1" type="success">{{ t('action.yes') }}</el-tag>
          <el-tag v-else type="info">{{ t('action.no') }}</el-tag>
        </template>
        <!-- 任务状态 -->
        <template #status="{ row }">
          <el-tag v-if="row.status === 0" type="info">{{ t('welfare.userRecall.statusPending') }}</el-tag>
          <el-tag v-else-if="row.status === 1" type="success">{{ t('welfare.userRecall.statusExecuted') }}</el-tag>
          <el-tag v-else-if="row.status === 2" type="warning">{{ t('welfare.userRecall.statusSkipped') }}</el-tag>
          <el-tag v-else-if="row.status === 3" type="danger">{{ t('welfare.userRecall.statusCancelled') }}</el-tag>
          <el-tag v-else-if="row.status === 4" type="danger">{{ t('welfare.userRecall.statusIpRisk') }}</el-tag>
          <el-tag v-else-if="row.status === 5" type="danger">{{ t('welfare.userRecall.statusDeviceRisk') }}</el-tag>
          <el-tag v-else-if="row.status === 9" type="warning">{{ t('welfare.userRecall.statusProcessing') }}</el-tag>
        </template>
      </ele-pro-table>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { dayjs, ElMessage } from 'element-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { UploadOutlined } from '@/components/icons';
  import RecordsSearch from './records-search.vue';
  import { pageRecallRecord, exportRecallRecord } from '@/api/welfare/userRecallApi';
  import type { RecallTaskVO, RecallTaskQuery } from '@/api/welfare/model/userRecall';
  import { useI18n } from 'vue-i18n';
  import { toDateZone } from '@/utils/utils.js';

  const { t } = useI18n();

  const searchRef = ref<InstanceType<typeof RecordsSearch> | null>(null);
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  const columns = ref<Columns>([
    { prop: 'id', label: t('welfare.userRecall.table.id'), width: 80, fixed: 'left' },
    { prop: 'uid', label: t('welfare.userRecall.table.uid'), minWidth: 110 },
    { prop: 'countryCode', label: t('welfare.userRecall.table.countryCode'), minWidth: 100 },
    { prop: 'strategyType', label: t('welfare.userRecall.table.strategyType'), minWidth: 120, slot: 'strategyType' },
    { prop: 'pushChannel', label: t('welfare.userRecall.table.pushChannel'), minWidth: 110, slot: 'pushChannel' },
    { prop: 'needReward', label: t('welfare.userRecall.table.needReward'), minWidth: 90, slot: 'needReward' },
    { prop: 'triggerTime', label: t('welfare.userRecall.table.triggerTime'), minWidth: 160, formatter: (row) => toDateZone(row.triggerTime, row.countryCode) || '-' },
    { prop: 'executeTime', label: t('welfare.userRecall.table.executeTime'), minWidth: 160 , formatter: (row) => toDateZone(row.executeTime, row.countryCode) || '-'},
    { prop: 'status', label: t('welfare.userRecall.table.status'), minWidth: 110, slot: 'status' },
    { prop: 'skipReason', label: t('welfare.userRecall.table.skipReason'), minWidth: 150 },
    { prop: 'ip', label: t('welfare.userRecall.table.ip'), minWidth: 140 },
    { prop: 'deviceId', label: t('welfare.userRecall.table.deviceId'), minWidth: 140 },
    { prop: 'createTime', label: t('welfare.userRecall.table.createTime'), minWidth: 160 , formatter: (row) => toDateZone(row.createTime, row.countryCode) || '-'},
    { prop: 'updateTime', label: t('welfare.userRecall.table.updateTime'), minWidth: 160, formatter: (row) => toDateZone(row.updateTime, row.countryCode) || '-' }
  ]);

  const selections = ref<RecallTaskVO[]>([]);

  const defaultWhere = reactive({
    startDate: dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    endDate: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  });

  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageRecallRecord({ ...defaultWhere, ...where, ...orders, ...pages });
  };

  const reload = (where?: RecallTaskQuery) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  const openExport = () => {
    exportRecallRecord({ ...searchRef.value!.searchParams() }, 'UserRecallRecords').then((res) => {
      ElMessage.success(res);
    });
  };
</script>

<script lang="ts">
  export default { name: 'userRecallRecords' };
</script>
