<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <BalanceRankingSearch ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="uid" :columns="columns" :datasource="datasource" :pagination="{ pageSize: 30 }"  :max-height="650"  :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :header-ellipsis="false" :footer-style="{ paddingBottom: '16px' }" cache-key="balanceRankingTable" size="small" :tools="['reload', 'columns', 'maximized']">
        <template #toolbar>
          <el-popconfirm :title="t('common.sureExport')" @confirm="openExport()">
            <template #reference>
              <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">{{ t('action.export') }}</el-button>
            </template>
          </el-popconfirm>
        </template>
        <template #cashBalance="{ row }">
          {{ row.cashBalance?.toLocaleString() ?? '-' }}
        </template>
        <template #bonusBalance="{ row }">
          {{ row.bonusBalance?.toLocaleString() ?? '-' }}
        </template>
        <template #totalBalance="{ row }">
          {{ row.totalBalance?.toLocaleString() ?? '-' }}
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
  import BalanceRankingSearch from './components/balanceRanking-search.vue';
  import { pageBalanceRankings, exportBalanceRankings } from '@/api/operateAnalysis/balanceRankingApi';
  import type { BalanceRanking, BalanceRankingQuery } from '@/api/operateAnalysis/model/balanceRanking';
  import { UploadOutlined } from '@/components/icons';
  import { ElMessage } from 'element-plus';
  import { addSecret } from '@/utils/common';

  const { t } = useI18n();

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof BalanceRankingSearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'rank',
      label: t('monitoringReport.balanceRanking.table.rank'),
      width: 80,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'uid',
      label: t('monitoringReport.balanceRanking.table.uid'),
      align: 'center'
    },
    //   {
    //     prop: "countryCode",
    //     label: t('monitoringReport.balanceRanking.table.countryCode'),
    //     align: "center",
    //   },
    {
      prop: 'phone',
      label: t('monitoringReport.balanceRanking.table.phone'),

      align: 'center',
      formatter: (row) => addSecret(row.phone)
    },
    {
      prop: 'cashBalance',
      label: t('monitoringReport.balanceRanking.table.cashBalance'),
      sortable: true,
      align: 'center'
    },
    {
      prop: 'bonusBalance',
      label: t('monitoringReport.balanceRanking.table.bonusBalance'),
      sortable: true,
      align: 'center'
    },
    {
      prop: 'totalBalance',
      label: t('monitoringReport.balanceRanking.table.totalBalance'),
      sortable: true,
      align: 'center',
    }
  ]);

  /** 表格选中数据 */
  const selections = ref<BalanceRanking[]>([]);
  /** 默认搜索条件 */
  const defaultWhere = {
    periodType: 1
  };
  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageBalanceRankings({
      ...defaultWhere,
      ...(pages as any),
      ...(orders as any),
      ...(where as BalanceRankingQuery)
    });
  };

  /** 搜索 */
  const reload = (where?: Partial<BalanceRankingQuery>) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 导出 */
  const openExport = () => {
    const params = searchRef.value!.searchParams();
    exportBalanceRankings(params as BalanceRankingQuery, 'Balance-rank').then((res) => {
      ElMessage.success(res as string);
    });
  };
</script>
<script lang="ts">
  export default {
    name: 'BalanceRanking'
  };
</script>
