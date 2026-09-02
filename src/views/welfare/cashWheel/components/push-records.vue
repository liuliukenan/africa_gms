<template>
  <ele-page>
    <ele-card :body-style="{ padding: '0px' }">
      <push-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :header-ellipsis="false" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" :tools="['reload', 'columns', 'maximized']" cache-key="cashWheelPushRecords">
        <template #toolbar>
          <el-popconfirm :title="t('common.sureExport')" @confirm="openExport" width="250px">
            <template #reference>
              <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">
                {{ t('action.export') }}
              </el-button>
            </template>
          </el-popconfirm>
        </template>
        <!-- 活动子类型 -->
        <template #subType="{ row }">
          <dict-data code="act_sub_type" v-model="row.subType" type="tag" value-type="string" />
        </template>
        <!-- 推送渠道 -->
        <template #pushChannel="{ row }">
          <el-tag v-if="row.pushChannel === 'SMS'" type="success">SMS</el-tag>
          <el-tag v-else-if="row.pushChannel === 'APP_PUSH'" type="primary">APP_PUSH</el-tag>
          <el-tag v-else-if="row.pushChannel === 'IN_APP'" type="warning">IN_APP</el-tag>
          <el-tag v-else>{{ row.pushChannel }}</el-tag>
        </template>
        <!-- 是否派发奖励 -->
        <template #needReward="{ row }">
          <el-tag v-if="row.needReward === 1" type="success">{{ t('welfare.cashWheel.statusYes') }}</el-tag>
          <el-tag v-else type="danger">{{ t('welfare.cashWheel.statusNo') }}</el-tag>
        </template>
        <!-- 任务状态 -->
        <template #status="{ row }">
          <el-tag v-if="row.status === 0">PENDING</el-tag>
          <el-tag v-else-if="row.status === 1" type="success">EXECUTED</el-tag>
          <el-tag v-else-if="row.status === 2" type="warning">SKIPPED</el-tag>
          <el-tag v-else-if="row.status === 3" type="info">CANCELLED</el-tag>
          <el-tag v-else-if="row.status === 4" type="danger">IP_BLOCKED</el-tag>
          <el-tag v-else-if="row.status === 5" type="danger">DEVICE_BLOCKED</el-tag>
          <el-tag v-else-if="row.status === 9" type="primary">PROCESSING</el-tag>
        </template>
        <!-- 触发时间 -->
        <template #triggerTime="{ row }">
          <!-- {{ toDateZone(row.triggerTime, row.countryCode) }} -->
          <div> {{ row.triggerTime ? toDateZone(row.triggerTime, row.countryCode) : '--' }}</div>
          <div> {{ row.executeTime ? toDateZone(row.executeTime, row.countryCode) : '--' }}</div>
        </template>
        <!-- 预计执行时间 -->
        <!-- <template #executeTime="{ row }">
          {{ toDateZone(row.executeTime, row.countryCode) }}
        </template> -->
        <!-- 创建时间 -->
        <template #createTime="{ row }">
          <div> {{ row.createTime ? toDateZone(row.createTime, row.countryCode) : '--' }}</div>
          <div> {{ row.updateTime ? toDateZone(row.updateTime, row.countryCode) : '--' }}</div>
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
  import PushSearch from './push-search.vue';
  import { pageCashWheelPushTask, exportCashWheelPushTask } from '@/api/welfare/cashWheelApi';
  import type { ActPushTaskVO, ActPushTaskParam } from '@/api/welfare/model/cashWheel';
  import { useI18n } from 'vue-i18n';
  import { toDateZone } from '@/utils/utils';
  import { useConfigStore } from '@/store/modules/config';

  const { t } = useI18n();
  const configStore = useConfigStore();

  const searchRef = ref<{ searchParams: () => ActPushTaskParam } | null>(null);
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  const columns = ref<Columns>([
    { prop: 'id', label: t('welfare.cashWheel.pushTable.id'), width: 70, fixed: 'left' },
    { prop: 'uid', label: t('welfare.cashWheel.pushTable.uid'), minWidth: 100 },
    { prop: 'pushName', label: t('welfare.cashWheel.pushTable.pushName'), minWidth: 120 },
    { prop: 'subType', label: t('welfare.cashWheel.pushTable.subType'), minWidth: 110, slot: 'subType' },
    { prop: 'countryCode', label: t('welfare.cashWheel.pushTable.countryCode'), minWidth: 80 },
    { prop: 'strategyId', label: t('welfare.cashWheel.pushTable.strategyId'), minWidth: 110 },
    { prop: 'pushId', label: t('welfare.cashWheel.pushTable.pushId'), minWidth: 110 },
    { prop: 'actItemId', label: t('welfare.cashWheel.pushTable.actItemId'), minWidth: 100 },
    { prop: 'pushChannel', label: t('welfare.cashWheel.pushTable.pushChannel'), minWidth: 100, slot: 'pushChannel' },
    { prop: 'needReward', label: t('welfare.cashWheel.pushTable.needReward'), minWidth: 80, slot: 'needReward' },
   
    // { prop: 'executeTime', label: t('welfare.cashWheel.pushTable.executeTime'), minWidth: 160, slot: 'executeTime' },
    { prop: 'status', label: t('welfare.cashWheel.pushTable.status'), minWidth: 130, slot: 'status' },
    { prop: 'skipReason', label: t('welfare.cashWheel.pushTable.skipReason'), minWidth: 140 },
    { prop: 'ip', label: t('welfare.cashWheel.pushTable.ip'), minWidth: 130 },
    { prop: 'deviceId', label: t('welfare.cashWheel.pushTable.deviceId'), minWidth: 160 },
     { prop: 'triggerTime', label: t('welfare.cashWheel.pushTable.triggerTime'), minWidth: 160, slot: 'triggerTime' },
    { prop: 'createTime', label: t('welfare.cashWheel.pushTable.createTime'), minWidth: 160, slot: 'createTime' }
    // { prop: 'updateTime', label: t('welfare.cashWheel.pushTable.updateTime'), minWidth: 130, slot: 'updateTime' }
  ]);

  const selections = ref<ActPushTaskVO[]>([]);

  const defaultWhere = reactive({
    countryCode: configStore.countryArr?.[0]?.code || ''
    // startDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
    // endDate: dayjs().format('YYYY-MM-DD')
  });

  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageCashWheelPushTask({ ...defaultWhere, ...where, ...orders, ...pages });
  };

  const reload = (where?: ActPushTaskParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  const openExport = () => {
    exportCashWheelPushTask({ ...searchRef.value!.searchParams() }, 'cashWheelPushRecords').then((res) => {
      ElMessage.success(res);
    });
  };
</script>

<script lang="ts">
  export default { name: 'cashWheelPushRecords' };
</script>
