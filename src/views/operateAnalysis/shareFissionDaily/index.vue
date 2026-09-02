<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <share-fission-daily-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="statDate" :columns="columns" :datasource="datasource"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
        :footer-style="{ paddingBottom: '16px' }" cache-key="shareFissionDailyTable"
        :tools="['reload', 'columns', 'maximized']">
        <template #toolbar>
          <el-popconfirm :title="t('common.sureExport')" @confirm="openExport" width="250px">
            <template #reference>
              <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">
                {{ t('action.export') }}
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </ele-pro-table>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { EleProTable } from 'ele-admin-plus';
import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
import { UploadOutlined } from '@/components/icons';
import shareFissionDailySearch from './components/shareFissionDaily-search.vue';
import { pageShareFissionDaily, exportShareFissionDaily } from '@/api/operateAnalysis/shareFissionDaily/shareFissionDailyApi';
import type { ShareFissionDailyVO, ShareFissionDailyParam } from '@/api/operateAnalysis/shareFissionDaily/model/shareFissionDaily';
import { useI18n } from 'vue-i18n';
import { useConfigStore } from '@/store/modules/config';
import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';

const { t } = useI18n();
const configStore = useConfigStore();

const searchRef = ref<InstanceType<typeof shareFissionDailySearch> | null>(null);
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

const columns = ref<Columns>([
  {
    prop: 'statDate',
    label: '日期',
    width: 100,
    align: 'center',
    fixed: 'left',
  },
  {
    label: '邀请',
    align: 'center',
    children: [
      {
        prop: 'activeUserCount',
        label: '活跃人数',
        minWidth: 80,
        align: 'center',
      },
      // {
      //   prop: 'newInviteParticipants',
      //   label: '新增参与邀请人数',
      //   minWidth: 80,
      //   align: 'center',
      //   formatter: () => '-',
      // },
      // {
      //   prop: 'participationRate1',
      //   label: '参与率',
      //   minWidth: 80,
      //   align: 'center',
      //   formatter: () => '-',
      // },
      // {
      //   prop: 'totalVisits',
      //   label: '总访问量',
      //   minWidth: 80,
      //   align: 'center',
      //   formatter: () => '-',
      // },
      // {
      //   prop: 'uniqueVisits',
      //   label: '唯一访问量',
      //   minWidth: 80,
      //   align: 'center',
      //   formatter: () => '-',
      // },
      {
        prop: 'inviteSuccessUserCount',
        label: '成功邀请人数',
        minWidth: 80,
        align: 'center',
      },
      {
        prop: 'participationRate',
        label: '参与率',
        minWidth: 90,
        align: 'center',
      },
      {
        prop: 'registerCount',
        label: '注册人数',
        minWidth: 80,
        align: 'center',
      },
      // {
      //   prop: 'registerConversionRate',
      //   label: '注册转化率',
      //   minWidth: 80,
      //   align: 'center',
      //   formatter: (row: ShareFissionDailyVO) => {
      //     if (!row.activeUserCount || row.activeUserCount === 0) return '-';
      //     const rate = (row.registerCount || 0) / row.activeUserCount * 100;
      //     return rate.toFixed(2) + '%';
      //   },
      // },
      {
        prop: 'fissionRate',
        label: '裂变率',
        minWidth: 80,
        align: 'center',
        formatter: (row: ShareFissionDailyVO) => {
          if (row.fissionRate == null) return '-';
          return String(row.fissionRate);
        },
      },
    ],
  },
  {
    label: '付费',
    align: 'center',
    children: [
      {
        prop: 'newRechargeUserCount',
        label: '新增充值人数',
        minWidth: 80,
        align: 'center',
      },
      {
        prop: 'newRechargeAmount',
        label: '新增充值金额',
        minWidth: 80,
        align: 'center',
      },
      {
        prop: 'newRechargePerCapita',
        label: '人均充值金额',
        minWidth: 80,
        align: 'center',
      },
      {
        prop: 'newPayRate',
        label: '新增付费率',
        minWidth: 90,
        align: 'center',
      },
      {
        prop: 'rechargeUserCount',
        label: '充值人数',
        minWidth: 80,
        align: 'center',
      },
      {
        prop: 'rechargeAmount',
        label: '充值金额',
        minWidth: 80,
        align: 'center',
      },
      {
        prop: 'rechargePerCapita',
        label: '人均充值金额',
        minWidth: 80,
        align: 'center',
      },
      {
        prop: 'withdrawUserCount',
        label: '提现人数',
        minWidth: 80,
        align: 'center',
      },
      {
        prop: 'withdrawAmount',
        label: '提现金额',
        minWidth: 80,
        align: 'center',
      },
      {
        prop: 'withdrawPerCapita',
        label: '人均提现金额',
        minWidth: 80,
        align: 'center',
      },
      {
        prop: 'netRechargeAmount',
        label: '净充值额',
        minWidth: 80,
        align: 'center',
      },
      {
        prop: 'surplusRate',
        label: '盈余率',
        minWidth: 90,
        align: 'center',
      },
    ],
  },
  // {
  //   label: '奖励',
  //   align: 'center',
  //   children: [
  //     {
  //       prop: 'totalReward',
  //       label: '奖励合计',
  //       minWidth: 80,
  //       align: 'center',
  //       formatter: () => '-',
  //     },
  //     {
  //       prop: 'inviterRegisterReward',
  //       label: '邀请人注册奖励',
  //       minWidth: 80,
  //       align: 'center',
  //       formatter: () => '-',
  //     },
  //     {
  //       prop: 'inviterFirstRechargeReward',
  //       label: '邀请人首充返利',
  //       minWidth: 80,
  //       align: 'center',
  //       formatter: () => '-',
  //     },
  //     {
  //       prop: 'inviterAccumulatedRechargeReward',
  //       label: '邀请人累充返利',
  //       minWidth: 80,
  //       align: 'center',
  //       formatter: () => '-',
  //     },
  //     {
  //       prop: 'inviterMilestoneReward',
  //       label: '邀请人里程碑奖励',
  //       minWidth: 80,
  //       align: 'center',
  //       formatter: () => '-',
  //     },
  //     {
  //       prop: 'invitedRegisterReward',
  //       label: '被邀请人注册奖励',
  //       minWidth: 80,
  //       align: 'center',
  //       formatter: () => '-',
  //     },
  //     {
  //       prop: 'invitedFirstRechargeReward',
  //       label: '被邀请人首充返利',
  //       minWidth: 80,
  //       align: 'center',
  //       formatter: () => '-',
  //     },
  //     {
  //       prop: 'roas',
  //       label: 'ROAS',
  //       minWidth: 80,
  //       align: 'center',
  //       formatter: () => '-',
  //     },
  //   ],
  // },
]);

const selections = ref<ShareFissionDailyVO[]>([]);

const defaultWhere = reactive({
  countryCode: configStore.countryArr?.[0]?.code || undefined,
  startDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
  endDate: dayjs().format('YYYY-MM-DD'),
});

const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageShareFissionDaily({ ...defaultWhere, ...where, ...orders, ...pages });
};

const reload = (where?: ShareFissionDailyParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

const openExport = () => {
  exportShareFissionDaily({ ...searchRef.value!.searchParams() }, '分享裂变日报表').then((res) => {
    ElMessage.success(res);
  });
};
</script>

<script lang="ts">
export default { name: 'shareFissionDaily' };
</script>

<style lang="scss" scoped>
:deep(.el-table__header .cell) {
  white-space: normal !important;
  word-break: keep-all;
  line-height: 1.4;
  padding-left: 4px;
  padding-right: 4px;
}
</style>
