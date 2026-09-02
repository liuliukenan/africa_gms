<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <agent-stat-search ref="searchRef" @search="reload" />
      <ele-pro-table  ref="tableRef" row-key="profileId" :columns="columns" :datasource="datasource"
        :show-overflow-tooltip="true" :border="true" :highlight-current-row="true"
        :footer-style="{ paddingBottom: '16px' }" cache-key="agentStatTable">
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openInfo(row)"> 详情 </el-link>
        </template>
      </ele-pro-table>
      <Tabbar  v-model="isShowTabbar" :agentId="currentUid" :agentType="currentAgentType"></Tabbar>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { EleProTable } from 'ele-admin-plus';
import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
import AgentStatSearch from './components/agent-stat-search.vue';
import { pageAgentStat } from '@/api/agent/agentStatApi';
import type { AgentStatVO, AgentStatParam } from '@/api/agent/model/agentStat';
import { toDateZone } from '@/utils/utils';
import { useConfigStore } from '@/store/modules/config';
import { addSecret } from '@/utils/common';
import Tabbar from './components/tabbar/index.vue';

/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof AgentStatSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  // {
  //   type: 'index',
  //   label: '序号',
  //   width: 60,
  //   align: 'center'
  // },
  {
    prop: 'agentId',
    fixed: 'left',
    label: '用户ID',
    minWidth: 110,
    align: 'left'
  },
  {
    prop: 'phone',
    label: '手机号',
    minWidth: 130,
    align: 'left',
    formatter: (row) => addSecret(row.phone)
  },
  {
    prop: 'countryCode',
    label: '国家代码',
    minWidth: 90,
    align: 'left'
  },
  {
    prop: 'channel',
    label: '渠道ID',
    minWidth: 80,
    align: 'left'
  },
  {
    prop: 'agentType',
    label: '身份类型',
    minWidth: 100,
    align: 'left',
    formatter: (row: AgentStatVO) => {
      return row.agentType === 1 ? '总代理' : row.agentType === 2 ? '普通代理' : '无';
    }
  },
  {
    prop: 'agentLevel',
    label: '等级',
    minWidth: 90,
    align: 'left'
  },
  {
    prop: 'commissionModel',
    label: '返利模式',
    minWidth: 120,
    align: 'left',
    formatter: (row: AgentStatVO) => {
      const modelMap: Record<string, string> = {
        '0': 'CPA',
        '1': 'Revenue Share',
        '2': 'Hybrid',
        '3': 'Turnover'
      };
      return row.commissionModel != null ? (modelMap[String(row.commissionModel)] ?? '-') : '-';
    }
  },
  {
    prop: 'inviterAgentId',
    label: '上级ID',
    minWidth: 110,
    align: 'left'
  },
  {
    prop: 'totalProfit',
    label: '获得返利',
    minWidth: 110,
    align: 'right'
  },
  {
    prop: 'totalContribution',
    label: '贡献返利',
    minWidth: 110,
    align: 'right'
  },
  // {
  //   prop: 'rebateRate',
  //   label: '返利比例',
  //   minWidth: 100,
  //   align: 'right'
  // },
  {
    prop: 'balance',
    label: '佣金账户余额',
    minWidth: 110,
    align: 'right'
  },
  {
    prop: 'teamProfit',
    label: '团队返利',
    minWidth: 110,
    align: 'right'
  },
  {
    prop: 'teamAgentCount',
    label: '团队代理数',
    minWidth: 110,
    align: 'right'
  },
  {
    prop: 'teamUserCount',
    label: '团队玩家数',
    minWidth: 110,
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
    prop: 'payRate',
    label: '付费率',
    minWidth: 90,
    align: 'right'
  },
  {
    prop: 'avgRechargeAmount',
    label: '人均充值',
    minWidth: 110,
    align: 'right'
  },
  {
    prop: 'withdrawUserCount',
    label: '提现人数',
    minWidth: 100,
    align: 'right'
  },
  {
    prop: 'withdrawAmount',
    label: '提现金额',
    minWidth: 110,
    align: 'right'
  },
  {
    prop: 'withdrawRate',
    label: '提现率',
    minWidth: 90,
    align: 'right'
  },
  {
    prop: 'avgWithdrawAmount',
    label: '人均提现',
    minWidth: 110,
    align: 'right'
  },
  {
    prop: 'netRechargeAmount',
    label: '净充值额',
    minWidth: 110,
    align: 'right'
  },
  {
    prop: 'teamGgr',
    label: '团队GGR',
    minWidth: 110,
    align: 'right'
  },
  {
    prop: 'roas',
    label: 'ROAS',
    minWidth: 90,
    align: 'right'
  },
  {
    prop: 'createTime',
    label: '注册代理时间',
    minWidth: 160,
    align: 'left',
    formatter: (row: AgentStatVO) => toDateZone(row.createTime, row.countryCode)
  },
  {
    prop: 'lastActiveTime',
    label: '最后活跃时间',
    minWidth: 160,
    align: 'left',
    formatter: (row: AgentStatVO) => toDateZone(row.lastActiveTime, row.countryCode)
  },
  {
    columnKey: 'action',
    fixed: 'right',
    label: '操作',
    width: 100,
    align: 'center',
    slot: 'action',
    hideInPrint: true,
    hideInExport: true
  }
]);
const configStore = useConfigStore();
const defaultWhere = reactive<AgentStatParam>({
  countryCode: configStore.countryArr?.[0]?.code || ''
});
/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageAgentStat({
    ...defaultWhere,
    ...where,
    ...orders,
    ...pages
  });
};

const isShowTabbar = ref(false);

const currentUid = ref(0);
/** 当前代理类型，用于控制 Tabbar 中显示的标签页 */
const currentAgentType = ref<number | undefined>(undefined);

const openInfo = (row: AgentStatVO) => {
  currentUid.value = row.agentId || 0;
  currentAgentType.value = row.agentType;
  isShowTabbar.value = true;
};


/** 搜索 */
const reload = (where?: AgentStatParam) => {
  // 清空并重新赋内部属性，确保 reactive 对象属性变化能被深度 watch 捕获
  // Object.keys(currentWhere).forEach((k) => delete (currentWhere as any)[k]);
  // Object.assign(currentWhere, where ?? {});
  // if (isShowTabbar.value) {
  //   // Tabbar 模式：通过 where prop 触发子表格刷新，无需操作 tableRef
  //   return;
  // }
  tableRef.value?.reload?.({ page: 1, where });
};
</script>
