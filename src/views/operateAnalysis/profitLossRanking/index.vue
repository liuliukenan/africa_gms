<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <ProfitLossRankingSearch ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="uid" :columns="columns" :datasource="datasource"  :pagination="{ pageSize: 30 }"  :max-height="650" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :header-ellipsis="false" :footer-style="{ paddingBottom: '16px' }" cache-key="profitLossRankingTable" size="small" :tools="['reload', 'columns', 'maximized']">
        <template #toolbar>
          <el-popconfirm :title="t('common.sureExport')" @confirm="openExport()">
            <template #reference>
              <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">{{ t('action.export') }}</el-button>
            </template>
          </el-popconfirm>
        </template>
        <template #profitLoss="{ row }">
          <span :style="{ color: profitLossColor(row.profitLoss) }">
            {{ row.profitLoss?.toLocaleString() ?? '-' }}
          </span>
        </template>
        <template #rtp="{ row }">
          <span :style="{ color: rtpColor(row.rtp) }">{{ row.rtp ?? '-' }}</span>
        </template>
        <template #cashBet="{ row }">
          {{ row.cashBet?.toLocaleString() ?? '-' }}
        </template>
        <template #cashReward="{ row }">
          {{ row.cashReward?.toLocaleString() ?? '-' }}
        </template>
        <template #bonusBet="{ row }">
          {{ row.bonusBet?.toLocaleString() ?? '-' }}
        </template>
        <template #bonusReward="{ row }">
          {{ row.bonusReward?.toLocaleString() ?? '-' }}
        </template>
        <template #betCount="{ row }">
          {{ row.betCount?.toLocaleString() ?? '-' }}
        </template>
        <template #totalBet="{ row }">
          {{ row.totalBet?.toLocaleString() ?? '-' }}
        </template>
        <template #totalReward="{ row }">
          {{ row.totalReward?.toLocaleString() ?? '-' }}
        </template>
        <template #cashProfitLoss="{ row }">
          <span :style="{ color: profitLossColor(row.cashProfitLoss) }">
            {{ row.cashProfitLoss?.toLocaleString() ?? '-' }}
          </span>
        </template>
        <template #cashRtp="{ row }">
          <span :style="{ color: rtpColor(row.cashRtp) }">{{ row.cashRtp ?? '-' }}</span>
        </template>
        <template #bonusProfitLoss="{ row }">
          <span :style="{ color: profitLossColor(row.bonusProfitLoss) }">
            {{ row.bonusProfitLoss?.toLocaleString() ?? '-' }}
          </span>
        </template>
        <template #bonusRtp="{ row }">
          <span :style="{ color: rtpColor(row.bonusRtp) }">{{ row.bonusRtp ?? '-' }}</span>
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
  import ProfitLossRankingSearch from './components/profitLossRanking-search.vue';
  import { pageProfitLossRankings, exportProfitLossRankings } from '@/api/operateAnalysis/profitLossRankingApi';
  import type { ProfitLossRanking, ProfitLossRankingQuery } from '@/api/operateAnalysis/model/profitLossRanking';
  import { UploadOutlined } from '@/components/icons';
  import { ElMessage } from 'element-plus';
  import { addSecret } from '@/utils/common';
  import { toDateZone } from '@/utils/utils.js';

  const { t } = useI18n();

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof ProfitLossRankingSearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'rank',
      label: t('monitoringReport.profitLossRanking.table.rank'),
      width: 80,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'uid',
      label: t('monitoringReport.profitLossRanking.table.uid'),
      width: 120,
      align: 'center'
    },
    {
      prop: 'phone',
      label: t('monitoringReport.profitLossRanking.table.phone'),
      width: 150,
      align: 'center',
      formatter: (row) => addSecret(row.phone)
    },
    //   {
    //     prop: "countryCode",
    //     label: "国家代码",
    //     width: 100,
    //     align: "center",
    //   },
    {
      prop: 'profitLoss',
      sortable: true,
      label: t('monitoringReport.profitLossRanking.table.profitLoss'),
      slot: 'profitLoss',
      align: 'center'
    },

    {
      prop: 'totalBet',
      label: t('monitoringReport.profitLossRanking.table.totalBet'),
      sortable: true,
      slot: 'totalBet',
      align: 'center'
    },
    {
      prop: 'totalReward',
      label: t('monitoringReport.profitLossRanking.table.totalReward'),
      sortable: true,
      slot: 'totalReward',
      align: 'center'
    },
    {
      prop: 'rtp',
      label: 'RTP',
      width: 100,
      align: 'center',
    //   sortable: true,
      slot: 'rtp'
    },
    {
      prop: 'betCount',
      label: t('monitoringReport.profitLossRanking.table.betCount'),
      width: 110,
      sortable: true,
      align: 'center'
    },
    {
      prop: 'cash',
      label: t('monitoringReport.profitLossRanking.table.cash'),
      align: 'center',
      children: [
        {
          prop: 'cashBet',
          label: t('monitoringReport.profitLossRanking.table.cashBet'),
          sortable: true,
          align: 'center'
        },
        {
          prop: 'cashReward',
          label: t('monitoringReport.profitLossRanking.table.cashReward'),
          sortable: true,
          align: 'center'
        },
        {
          prop: 'cashProfitLoss',
          label: t('monitoringReport.profitLossRanking.table.cashProfitLoss'),
          sortable: true,
          slot: 'cashProfitLoss',
          align: 'center'
        },
        {
          prop: 'cashRtp',
          label: t('monitoringReport.profitLossRanking.table.cashRtp'),
          width: 120,
        //   sortable: true,
          slot: 'cashRtp',
          align: 'center'
        }
      ]
    },

    {
      prop: 'bonus',
      label: t('monitoringReport.profitLossRanking.table.bonus'),
      align: 'center',
      children: [
        {
          prop: 'bonusBet',
          label: t('monitoringReport.profitLossRanking.table.bonusBet'),
          sortable: true,
          align: 'center'
        },
        {
          prop: 'bonusReward',
          label: t('monitoringReport.profitLossRanking.table.bonusReward'),
          sortable: true,
          align: 'center'
        },
        {
          prop: 'bonusProfitLoss',
          label: t('monitoringReport.profitLossRanking.table.bonusProfitLoss'),
          sortable: true,
          slot: 'bonusProfitLoss',
          align: 'center'
        },
        {
          prop: 'bonusRtp',
          label: t('monitoringReport.profitLossRanking.table.bonusRtp'),
          width: 120,
        //   sortable: true,
          slot: 'bonusRtp',
          align: 'center'
        }
      ]
    },
    // {
    //   prop: 'registerTime',
    //   formatter: (row) => toDateZone(row.registerTime, row.countryCode),
    //   label: t('monitoringReport.profitLossRanking.table.registerTime'),
    //   width: 170,
    //   align: 'center'
    // }
  ]);

  /** 表格选中数据 */
  const selections = ref<ProfitLossRanking[]>([]);

  /** 默认搜索条件 */
  const defaultWhere = {
    periodType: 1
  };

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageProfitLossRankings({
      ...defaultWhere,
      ...(pages as any),
      ...(orders as any),
      ...(where as ProfitLossRankingQuery)
    });
  };

  /** 搜索 */
  const reload = (where?: Partial<ProfitLossRankingQuery>) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 导出 */
  const openExport = () => {
    const params = searchRef.value!.searchParams();
    exportProfitLossRankings(params as ProfitLossRankingQuery, 'ProfitLoss-rank').then((res) => {
      ElMessage.success(res as string);
    });
  };

  /** 盈亏文字颜色：正数绿，负数红 */
  const profitLossColor = (val: any) => {
    const num = Number(val);
    if (isNaN(num)) return '';
    if (num > 0) return '#60c92e';
    if (num < 0) return '#da3837';
    return '';
  };

  /** RTP 文字颜色：<85% 红，85-100% 绿，>100% 橙 */
  const rtpColor = (val: any) => {
    const num = typeof val === 'string' ? parseFloat(val.replace('%', '')) : Number(val);
    if (isNaN(num)) return '';
    if (num < 85) return '#da3837';
    if (num <= 100) return '#60c92e';
    return '#E6A23C';
  };
</script>
<script lang="ts">
  export default {
    name: 'ProfitLossRanking'
  };
</script>

