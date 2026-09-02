<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <RechargeWithdrawRankingSearch ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="uid" :columns="columns" :datasource="datasource" :pagination="{ pageSize: 30 }"  :max-height="650"  :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" cache-key="rechargeWithdrawRankingTable" size="small" :tools="['reload', 'columns', 'maximized']">
        <template #toolbar>
          <el-popconfirm :title="t('common.sureExport')" @confirm="openExport()">
            <template #reference>
              <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">{{ t('action.export') }}</el-button>
            </template>
          </el-popconfirm>
        </template>
        <template #rechargeAmount="{ row }">
          {{ row.rechargeAmount?.toLocaleString() ?? '-' }}
        </template>
        <template #rechargeCount="{ row }">
          {{ row.rechargeCount?.toLocaleString() ?? '-' }}
        </template>
        <template #withdrawAmount="{ row }">
          {{ row.withdrawAmount?.toLocaleString() ?? '-' }}
        </template>
        <template #withdrawCount="{ row }">
          {{ row.withdrawCount?.toLocaleString() ?? '-' }}
        </template>
        <template #netRecharge="{ row }">
          <span :style="{ color: numberColor(row.netRecharge) }">
            {{ row.netRecharge?.toLocaleString() ?? '-' }}
          </span>
        </template>
        <template #surplusRate="{ row }">
          <span :style="{ color: rateColor(row.surplusRate) }">{{ row.surplusRate ?? '-' }}</span>
        </template>
      </ele-pro-table>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import RechargeWithdrawRankingSearch from './components/rechargeWithdrawRanking-search.vue';
  import { pageRechargeWithdrawRankings, exportRechargeWithdrawRankings } from '@/api/operateAnalysis/rechargeWithdrawRankingApi';
  import type { RechargeWithdrawRanking, RechargeWithdrawRankingQuery } from '@/api/operateAnalysis/model/rechargeWithdrawRanking';
  import { UploadOutlined } from '@/components/icons';
  import { ElMessage } from 'element-plus';
  import { addSecret } from '@/utils/common';

  const { t } = useI18n();

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof RechargeWithdrawRankingSearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'rank',
      label: t('monitoringReport.rechargeWithdrawRanking.table.rank'),
      width: 80,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'uid',
      label: t('monitoringReport.rechargeWithdrawRanking.table.uid'),
      align: 'center'
    },
    // {
    //   prop: 'countryCode',
    //   label: t('monitoringReport.rechargeWithdrawRanking.table.countryCode'),
    //   align: 'center'
    // },
    {
      prop: 'phone',
      label: t('monitoringReport.rechargeWithdrawRanking.table.phone'),

      align: 'center',
      formatter: (row) => addSecret(row.phone)
    },
    {
      prop: 'rechargeAmount',
      label: t('monitoringReport.rechargeWithdrawRanking.table.rechargeAmount'),
      sortable: true,
      align: 'center'
    },
    {
      prop: 'rechargeCount',
      label: t('monitoringReport.rechargeWithdrawRanking.table.rechargeCount'),
      width: 130,
      sortable: true,
      align: 'center'
    },
    {
      prop: 'withdrawAmount',
      label: t('monitoringReport.rechargeWithdrawRanking.table.withdrawAmount'),
      sortable: true,

      align: 'center'
    },
    {
      prop: 'withdrawCount',
      label: t('monitoringReport.rechargeWithdrawRanking.table.withdrawCount'),
      sortable: true,
      align: 'center'
    },
    {
      prop: 'netRecharge',
      label: t('monitoringReport.rechargeWithdrawRanking.table.netRecharge'),
      align: 'center',
      sortable: true,
      slot: 'netRecharge'
    },
    {
      prop: 'surplusRate',
      label: t('monitoringReport.rechargeWithdrawRanking.table.surplusRate'),
      align: 'center',
      sortable: true,
      slot: 'surplusRate'
    }
  ]);

  /** 表格选中数据 */
  const selections = ref<RechargeWithdrawRanking[]>([]);

  /** 默认搜索条件 */
  const defaultWhere = {
    periodType: 1
  };

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageRechargeWithdrawRankings({
      ...defaultWhere,
      ...(pages as any),
      ...(orders as any),
      ...(where as RechargeWithdrawRankingQuery)
    });
  };

  /** 搜索 */
  const reload = (where?: Partial<RechargeWithdrawRankingQuery>) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 导出 */
  const openExport = () => {
    exportRechargeWithdrawRankings(searchRef.value!.searchParams() as RechargeWithdrawRankingQuery, 'Payment-Withdraw-rank').then((res) => {
      ElMessage.success(res as string);
    });
  };

  /** 数字文字颜色：正数绿，负数红 */
  const numberColor = (val: any) => {
    const num = Number(val);
    if (isNaN(num)) return '';
    if (num > 0) return '#60c92e';
    if (num < 0) return '#da3837';
    return '';
  };

  /** 比率文字颜色：<85% 红，85-100% 绿，>100% 橙 */
  const rateColor = (val: any) => {
    const num = typeof val === 'string' ? parseFloat(val.replace('%', '')) : Number(val);
    if (isNaN(num)) return '';
    if (num < 85) return '#da3837';
    if (num <= 100) return '#60c92e';
    return '#faad14';
  };
</script>
<script lang="ts">
  export default {
    name: 'RechargeWithdrawRanking'
  };
</script>
