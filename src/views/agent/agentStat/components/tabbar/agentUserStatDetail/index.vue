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
import { type EleProTable } from 'ele-admin-plus';
import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
import { pageAgentUserStatDetail, exportAgentUserStatDetail } from '@/api/agent/agentStatApi';
import type { AgentUserStatDetailVO, AgentUserStatDetailParam } from '@/api/agent/model/agentStat';
import { toDateZone } from '@/utils/utils';
import { UploadOutlined } from '@/components/icons';
import { useConfigStore } from '@/store/modules/config';
import { addSecret } from '@/utils/common';
import { useUserStore } from '@/store/modules/user';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const props = defineProps<{
  /** 代理ID */
  agentId: number;
}>();
/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  {
    type: 'index',
    label: '序号',
    width: 60,
    align: 'center'
  },
  {
    prop: 'uid',
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
    prop: 'totalContribution',
    label: '贡献返利',
    minWidth: 110,
    align: 'right'
  },
  {
    prop: 'totalAmount',
    label: '账户余额',
    minWidth: 110,
    align: 'right'
  },
  {
    prop: 'rechargeAmount',
    label: '充值金额',
    minWidth: 110,
    align: 'right'
  },
  {
    prop: 'withdrawAmount',
    label: '提现金额',
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
    prop: 'totalBet',
    label: '投注金额',
    minWidth: 110,
    align: 'right'
  },
  {
    prop: 'totalReward',
    label: '赔付金额',
    minWidth: 110,
    align: 'right'
  },
  {
    prop: 'profitLoss',
    label: '盈亏额',
    minWidth: 110,
    align: 'right'
  },
  {
    prop: 'bindTime',
    label: '被邀请时间',
    minWidth: 160,
    align: 'left',
    formatter: (row: AgentUserStatDetailVO) => toDateZone(row.bindTime, undefined)
  },
  {
    prop: 'lastGameTime',
    label: '最后游戏时间',
    minWidth: 160,
    align: 'left',
    formatter: (row: AgentUserStatDetailVO) => toDateZone(row.lastGameTime, undefined)
  }
]);
const configStore = useConfigStore();

const defaultWhere = reactive<AgentUserStatDetailParam>({
  countryCode: configStore.countryArr?.[0]?.code || undefined
});
/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where }) => {
  console.log('----下级玩家-----', props.agentId, where);
  return pageAgentUserStatDetail({
    ...defaultWhere,
    ...where,
    ...pages,
    inviterAgentId: props.agentId || undefined
  } as AgentUserStatDetailParam);
};
// 导出
const openExport = () => {
  exportAgentUserStatDetail({}, 'XJWJ').then((res) => {
    ElMessage.success(res);
  });
}
</script>
<style lang="scss" scoped>
.ele-page.is-multi-card {
  padding: 0;
}
</style>
