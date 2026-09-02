<template>
  <ele-page>
    <!-- 表格 -->
    <ele-pro-table ref="tableRef" row-key="id" :tools="['reload', 'columns', 'maximized']" :columns="columns"
      :datasource="datasource" :show-overflow-tooltip="true" :border="true" :highlight-current-row="true"
      :footer-style="{ paddingBottom: '16px' }">
      <template #toolbar>
        <el-popconfirm :title="t('common.sureExport')" @confirm="openExport()" width="250px">
          <template #reference>
            <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">{{ t('action.export') }}</el-button>
          </template>
        </el-popconfirm>
      </template>
    </ele-pro-table>
  </ele-page>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { EleProTable } from 'ele-admin-plus';
import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
import { pageAgentStatDetail,exportAgentStatDetail } from '@/api/agent/agentStatApi';
import type { AgentStatDetailVO, AgentStatDetailParam } from '@/api/agent/model/agentStat';
import { toDateZone } from '@/utils/utils';
import { useConfigStore } from '@/store/modules/config';
import { addSecret } from '@/utils/common';
import { UploadOutlined } from '@/components/icons';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const props = defineProps<{
  /** 代理ID */
  agentId: number;
}>();
const configStore = useConfigStore();

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

const defaultWhere = reactive<AgentStatDetailParam>({
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
    prop: 'agentId',
    label: '代理ID',
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
    prop: 'agentLevel',
    label: '代理等级',
    minWidth: 90,
    align: 'left'
  },
  {
    prop: 'commissionModel',
    label: '佣金模式',
    minWidth: 120,
    align: 'left',
    formatter: (row: AgentStatDetailVO) => {
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
    prop: 'balance',
    label: '佣金账户余额',
    minWidth: 110,
    align: 'right'
  },
  {
    prop: 'totalContribution',
    label: '贡献返利',
    minWidth: 110,
    align: 'right'
  },
  {
    prop: 'totalProfit',
    label: '获得返利',
    minWidth: 110,
    align: 'right'
  },
  {
    prop: 'teamUserCount',
    label: '团队成员数',
    minWidth: 110,
    align: 'right'
  },
  {
    prop: 'teamRechargeUserCount',
    label: '团队充値人数',
    minWidth: 110,
    align: 'right'
  },
  {
    prop: 'teamPayRate',
    label: '团队付费率',
    minWidth: 110,
    align: 'right'
  },
  {
    prop: 'teamRechargeAmount',
    label: '团队充値金额',
    minWidth: 120,
    align: 'right'
  },
  {
    prop: 'teamWithdrawAmount',
    label: '团队提现金额',
    minWidth: 120,
    align: 'right'
  },
  {
    prop: 'teamNetRechargeAmount',
    label: '团队净充値额',
    minWidth: 120,
    align: 'right'
  },
  {
    prop: 'teamTotalBet',
    label: '团队投注额',
    minWidth: 110,
    align: 'right'
  },
  {
    prop: 'teamTotalReward',
    label: '团队赔付额',
    minWidth: 110,
    align: 'right'
  },
  {
    prop: 'teamProfitLoss',
    label: '团队盈亏额',
    minWidth: 110,
    align: 'right'
  },
  {
    prop: 'createTime',
    label: '注册代理时间',
    minWidth: 160,
    align: 'left',
    formatter: (row: AgentStatDetailVO) => toDateZone(row.createTime, undefined)
  },
  {
    prop: 'lastActiveTime',
    label: '最后活跃时间',
    minWidth: 160,
    align: 'left',
    formatter: (row: AgentStatDetailVO) => toDateZone(row.lastActiveTime, undefined)
  }
]);

/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where }) => {
  return pageAgentStatDetail({
    ...defaultWhere,
    ...where,
    ...pages,
    inviterAgentId: props.agentId || undefined
  });
};

// 导出
const openExport = () => {
  exportAgentStatDetail({}, 'XJDL').then((res) => {
    ElMessage.success(res);
  });
}
</script>
<style lang="scss" scoped>
.ele-page.is-multi-card {
  padding: 0;
}
</style>