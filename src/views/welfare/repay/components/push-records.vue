<template>
  <ele-page>
    <ele-card :body-style="{ padding: '0px' }">
      <push-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :header-ellipsis="false" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" :tools="['reload', 'columns', 'maximized']" cache-key="pushRecords">
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
          <el-tag v-if="row.needReward === 1" type="success">{{ t('welfare.repay.statusYes') }}</el-tag>
          <el-tag v-else type="info">{{ t('welfare.repay.statusNo') }}</el-tag>
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
          {{ toDateZone(row.triggerTime, row.countryCode) }}
        </template>
        <!-- 预计执行时间 -->
        <template #executeTime="{ row }">
          {{ toDateZone(row.executeTime, row.countryCode) }}
        </template>
        <!-- 创建时间 -->
        <template #createTime="{ row }">
          {{ toDateZone(row.createTime, row.countryCode) }}
        </template>
        <!-- 更新时间 -->
        <template #updateTime="{ row }">
          {{ toDateZone(row.updateTime, row.countryCode) }}
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
  import { pagePushTask, exportPushTask } from '@/api/welfare/repayApi';
  import type { ActPushTaskVO, ActPushTaskParam } from '@/api/welfare/model/repay';
  import { useI18n } from 'vue-i18n';
  import { toDateZone } from '@/utils/utils';
  import { useConfigStore } from '@/store/modules/config';

  const { t } = useI18n();
  const configStore = useConfigStore();

  const searchRef = ref<InstanceType<typeof PushSearch> | null>(null);
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  const columns = ref<Columns>([
    { prop: 'id', label: t('welfare.repay.pushTable.id'), width: 80, fixed: 'left' },
    { prop: 'uid', label: t('welfare.repay.pushTable.uid'), minWidth: 100 },
    { prop: 'pushName', label: t('welfare.repay.pushTable.pushName'), minWidth: 100 },
    { prop: 'subType', label: t('welfare.repay.pushTable.subType'), minWidth: 140, slot: 'subType' },
    { prop: 'countryCode', label: t('welfare.repay.pushTable.countryCode'), minWidth: 80 },
    { prop: 'strategyId', label: t('welfare.repay.pushTable.strategyId'), minWidth: 110 },
    { prop: 'pushId', label: t('welfare.repay.pushTable.pushId'), minWidth: 130 },
    { prop: 'actItemId', label: t('welfare.repay.pushTable.actItemId'), minWidth: 110 },
    { prop: 'subType', label: t('welfare.repay.pushTable.subType'), minWidth: 110, slot: 'subType' },
    { prop: 'pushChannel', label: t('welfare.repay.pushTable.pushChannel'), minWidth: 110, slot: 'pushChannel' },
    { prop: 'needReward', label: t('welfare.repay.pushTable.needReward'), minWidth: 110, slot: 'needReward' },
    { prop: 'triggerTime', label: t('welfare.repay.pushTable.triggerTime'), minWidth: 160, slot: 'triggerTime' },
    { prop: 'executeTime', label: t('welfare.repay.pushTable.executeTime'), minWidth: 160, slot: 'executeTime' },
    { prop: 'status', label: t('welfare.repay.pushTable.status'), minWidth: 130, slot: 'status' },
    { prop: 'skipReason', label: t('welfare.repay.pushTable.skipReason'), minWidth: 140 },
    { prop: 'ip', label: t('welfare.repay.pushTable.ip'), minWidth: 130 },
    { prop: 'deviceId', label: t('welfare.repay.pushTable.deviceId'), minWidth: 130 },
    { prop: 'createTime', label: t('welfare.repay.pushTable.createTime'), minWidth: 130, slot: 'createTime' },
    { prop: 'updateTime', label: t('welfare.repay.pushTable.updateTime'), minWidth: 130, slot: 'updateTime' }
  ]);

  const selections = ref<ActPushTaskVO[]>([]);

  const defaultWhere = reactive({
    countryCode: configStore.countryArr?.[0]?.code || '',
    startDate: dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    endDate: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  });

  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pagePushTask({ ...defaultWhere, ...where, ...orders, ...pages });
  };

  const reload = (where?: ActPushTaskParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  const openExport = () => {
    exportPushTask({ ...searchRef.value!.searchParams() }, 'pushRecords').then((res) => {
      ElMessage.success(res);
    });
  };
</script>
