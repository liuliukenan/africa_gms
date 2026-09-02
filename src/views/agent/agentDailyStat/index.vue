<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <agent-daily-stat-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="statDate" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" :highlight-current-row="true" :export-config="{ fileName: '代理日报表', datasource: exportSource }" :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }" cache-key="agentDailyStatTable" />
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import AgentDailyStatSearch from './components/agent-daily-stat-search.vue';
  import { pageAgentDailyStat } from '@/api/agent/agentDailyStatApi';
  import type { AgentDailyStatVO, AgentDailyStatParam } from '@/api/agent/model/agentDailyStat';
  import { useConfigStore } from '@/store/modules/config';

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof AgentDailyStatSearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  const configStore = useConfigStore();

  const defaultWhere = reactive<AgentDailyStatParam>({
    countryCode: configStore.countryArr?.[0]?.code || undefined
  });

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      type: 'index',
      label: '序号',
      width: 60,
      align: 'center'
    },
    {
      prop: 'statDate',
      label: '统计日期',
      minWidth: 120,
      align: 'left'
    },
    {
      prop: 'newAgentCount',
      label: '新增代理数',
      minWidth: 110,
      align: 'right'
    },
    {
      prop: 'activeAgentCount',
      label: '活跃代理数',
      minWidth: 110,
      align: 'right'
    },
    {
      prop: 'totalProfit',
      label: '返利金额',
      minWidth: 110,
      align: 'right'
    },
    {
      prop: 'profit0',
      label: 'CPA模式',
      minWidth: 110,
      align: 'right'
    },
    {
      prop: 'profit1',
      label: 'RS模式',
      minWidth: 110,
      align: 'right'
    },
    {
      prop: 'agentWithdrawCount',
      label: '代理提现人数',
      minWidth: 120,
      align: 'right'
    },
    {
      prop: 'agentWithdrawAmount',
      label: '代理提现金额',
      minWidth: 120,
      align: 'right'
    },
    {
      prop: 'newUserCount',
      label: '新增玩家数',
      minWidth: 110,
      align: 'right'
    },
    {
      prop: 'activeUserCount',
      label: '活跃玩家数',
      minWidth: 110,
      align: 'right'
    },
    {
      prop: 'firstPayUserCount',
      label: '首充人数',
      minWidth: 100,
      align: 'right'
    },
    {
      prop: 'firstPayAmount',
      label: '首充金额',
      minWidth: 110,
      align: 'right'
    },
    {
      prop: 'avgFirstPayAmount',
      label: '人均首充金额',
      minWidth: 120,
      align: 'right'
    },
    {
      prop: 'rechargeUserCount',
      label: '充值人数',
      minWidth: 100,
      align: 'right'
    },
    {
      prop: 'rechargeAmount',
      label: '充值金额',
      minWidth: 110,
      align: 'right'
    },
    {
      prop: 'avgRechargeAmount',
      label: '人均充值金额',
      minWidth: 120,
      align: 'right'
    },
    {
      prop: 'userWithdrawCount',
      label: '玩家提现人数',
      minWidth: 120,
      align: 'right'
    },
    {
      prop: 'userWithdrawAmount',
      label: '玩家提现金额',
      minWidth: 120,
      align: 'right'
    },
    {
      prop: 'avgWithdrawAmount',
      label: '人均提现金额',
      minWidth: 120,
      align: 'right'
    },
    {
      prop: 'netRechargeAmount',
      label: '净充值额',
      minWidth: 110,
      align: 'right'
    },
    {
      prop: 'totalBet',
      label: '投注金额',
      minWidth: 110,
      align: 'right'
    },
    {
      prop: 'profitLoss',
      label: '盈亏额',
      minWidth: 110,
      align: 'right'
    }
  ]);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageAgentDailyStat({
      ...defaultWhere,
      ...where,
      ...orders,
      ...pages
    });
  };

  /** 搜索 */
  const reload = (where?: AgentDailyStatParam) => {
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 导出和打印全部数据的数据源 */
  const exportSource: DatasourceFunction = ({ where, orders }) => {
    return pageAgentDailyStat({
      ...where,
      ...orders
    });
  };
</script>
