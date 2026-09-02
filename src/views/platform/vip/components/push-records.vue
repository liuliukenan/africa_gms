<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <push-records-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :headerEllipsis="false" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" cache-key="pushRecords">
        <template #toolbar>
          <el-popconfirm :title="t('common.sureExport')" @confirm="openExport" width="250px">
            <template #reference>
              <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">
                {{ t('action.export') }}
              </el-button>
            </template>
          </el-popconfirm>
        </template>

        <!-- 业务类型 -->
        <template #businessType="{ row }">
          <span>{{ getBusinessTypeLabel(row.businessType) }}</span>
        </template>
        <template #createTime="{ row }">
          <div>{{ toDateZone(row.createTime, row.countryCode) || '--' }}</div>
          <div>{{ toDateZone(row.updateTime, row.countryCode) || '--' }}</div>
        </template>

        <!-- 推送渠道 -->
        <template #pushChannel="{ row }">
          <el-tag size="small">{{ getPushChannelLabel(row.pushChannel) }}</el-tag>
        </template>

        <!-- 任务状态 -->
        <template #status="{ row }">
          <el-tag :type="getStatusType(row.status)" size="small">
            {{ getStatusLabel(row.status) }}
          </el-tag>
        </template>
      </ele-pro-table>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { dayjs, ElMessage } from 'element-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { UploadOutlined } from '@/components/icons';
  import PushRecordsSearch from './push-records-search.vue';
  import { pageVipPushTasks, exportVipPushTasks } from '@/api/platform/pushRecordsApi';
  import type { VipPushTaskVO, VipPushTaskParam } from '@/api/platform/model/pushRecords';
  import { toDateZone } from '@/utils/utils';
  import { useConfigStore } from '@/store/modules/config';

  const { t } = useI18n();
  const configStore = useConfigStore();

  const searchRef = ref<InstanceType<typeof PushRecordsSearch> | null>(null);
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  const getBusinessTypeLabel = (type?: string) => {
    const map: Record<string, string> = {
      vipUpgrade: t('platform.vip.configEdit.vipUpgrade'),
      vipWeekly: t('platform.vip.configEdit.vipWeekly'),
      vipMonthly: t('platform.vip.configEdit.vipMonthly'),
      vipDailyRebate: t('platform.vip.configEdit.vipDailyRebate'),
      vipWeeklyLossRebate: t('platform.vip.configEdit.vipWeeklyLossRebate')
    };
    return map[type || ''] || type || '-';
  };

  const getPushChannelLabel = (channel?: string) => {
    const map: Record<string, string> = {
      SMS: t('platform.vip.pushRecords.pushChannelSMS'),
      APP_PUSH: t('platform.vip.pushRecords.pushChannelAppPush'),
      IN_APP: t('platform.vip.pushRecords.pushChannelInApp')
    };
    return map[channel || ''] || channel || '-';
  };

  const getStatusLabel = (status?: number) => {
    const map: Record<number, string> = {
      0: t('platform.vip.pushRecords.status0'),
      1: t('platform.vip.pushRecords.status1'),
      2: t('platform.vip.pushRecords.status2'),
      3: t('platform.vip.pushRecords.status3'),
      9: t('platform.vip.pushRecords.status9')
    };
    return map[status ?? -1] || '-';
  };

  const getStatusType = (status?: number) => {
    const map: Record<number, any> = {
      0: 'info',
      1: 'success',
      2: 'warning',
      3: 'danger',
      9: 'warning'
    };
    return map[status ?? -1] || 'info';
  };

  const columns = ref<Columns>([
    // {
    //   prop: 'id',
    //   label: t('platform.vip.pushRecords.id'),
    //   width: 80,
    //   fixed: 'left',
    //   align: 'center'
    // },
    {
      prop: 'uid',
      label: t('platform.vip.pushRecords.uid'),
      minWidth: 90,
      align: 'center'
    },
    {
      prop: 'countryCode',
      label: t('platform.vip.pushRecords.countryCode'),
      minWidth: 90,
      align: 'center'
    },
    {
      prop: 'strategyId',
      label: t('platform.vip.pushRecords.strategyId'),
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'strategyName',
      label: t('platform.vip.pushRecords.strategyName'),
      minWidth: 110,
      align: 'center'
    },
    // {
    //   prop: 'pushId',
    //   label: t('platform.vip.pushRecords.pushId'),
    //   minWidth: 120,
    //   align: 'center'
    // },
    {
      prop: 'pushName',
      label: t('platform.vip.pushRecords.pushName'),
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'bizId',
      label: t('platform.vip.pushRecords.bizId'),
      minWidth: 100,
      align: 'center'
    },
    {
      prop: 'periodKey',
      label: t('platform.vip.pushRecords.periodKey'),
      minWidth: 120,
      align: 'center'
    },
    {
      prop: 'businessType',
      label: t('platform.vip.pushRecords.businessType'),
      minWidth: 130,
      align: 'center',
      slot: 'businessType'
    },
    {
      prop: 'pushChannel',
      label: t('platform.vip.pushRecords.pushChannel'),
      minWidth: 120,
      align: 'center',
      slot: 'pushChannel'
    },
    {
      prop: 'baseAmount',
      label: t('platform.vip.pushRecords.baseAmount'),
      minWidth: 140,
      align: 'left'
    },
    {
      prop: 'triggerTime',
      label: t('platform.vip.pushRecords.triggerTime'),
      minWidth: 160,
      align: 'center',
      formatter: (row) => toDateZone(row.triggerTime, row.countryCode)
    },
    {
      prop: 'executeTime',
      label: t('platform.vip.pushRecords.executeTime'),
      minWidth: 160,
      align: 'center',
      formatter: (row) => toDateZone(row.executeTime, row.countryCode)
    },
    // {
    //   prop: 'originalExecuteTime',
    //   label: t('platform.vip.pushRecords.originalExecuteTime'),
    //   minWidth: 170,
    //   align: 'center',
    //   formatter: (row) => toDateZone(row.originalExecuteTime, row.countryCode)
    // },
    {
      prop: 'status',
      label: t('platform.vip.pushRecords.status'),
      minWidth: 100,
      align: 'center',
      slot: 'status'
    },
    {
      prop: 'skipReason',
      label: t('platform.vip.pushRecords.skipReason'),
      minWidth: 140,
      align: 'center'
    },
    {
      prop: 'createTime',
      slot: 'createTime',
      label: t('platform.vip.pushRecords.createTime'),
      minWidth: 160,
      align: 'center'

    }
  ]);

  const selections = ref<VipPushTaskVO[]>([]);

  const defaultWhere = reactive({
    countryCode: configStore.countryArr?.[0]?.code || ''
    // startDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
    // endDate: dayjs().format('YYYY-MM-DD')
  });

  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageVipPushTasks({ ...defaultWhere, ...where, ...orders, ...pages });
  };

  const reload = (where?: VipPushTaskParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  const openExport = () => {
    exportVipPushTasks({ ...searchRef.value!.searchParams() }, 'VIP-push-records').then((res) => {
      ElMessage.success(res);
    });
  };
</script>

<!-- <script lang="ts">
export default { name: 'pushRecords' };
</script> -->
