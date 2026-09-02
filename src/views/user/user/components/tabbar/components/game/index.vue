<template>
  <ele-page>
    <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable" :tools="['reload', 'columns', 'maximized']" :show-summary="true" :summary-method="getSummaries">
      <template #gameGroupId="{ row }">
        <div v-if="row.gameGroupId !== null">
          <dict-data v-model="row.gameGroupId" code="gameGroup" value-type="number" type="tag" />
        </div>
        <span v-else>{{ t('user.userList.userTabbar.total') }}</span>
      </template>
      <template #action="{ row }">
        <el-button v-if="row.gameGroupId !== null" link size="small" type="primary" @click="openInfo(row)">{{ t('action.info') }}</el-button>
      </template>
    </ele-pro-table>
    <GameInfo ref="gameInfoRef" v-model="showInfo" :uid="uid" :data="current" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Column, Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  // import { PlusOutlined } from "@/components/icons";
  import Search from './search.vue';
  import GameInfo from './components/game-info.vue';
  import { getUserGameWinLossPage } from '@/api/user/userApi';
  import type { UserGameWinLossVO } from '@/api/model/user';
  import { useI18n } from 'vue-i18n';
  import { formatNumber } from '@/utils/common';
  const { t } = useI18n();
  const props = defineProps<{
    /** 修改回显的数据 */
    uid: number;
  }>();
  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof Search> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);
  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'factoryCode',
      label: t('user.userList.game.factoryCode'),
      // width: 60,
      align: 'center'
    },
    {
      prop: 'gameId',
      label: t('user.userList.game.gameId'),
      // width: 60,
      align: 'center'
    },
    {
      prop: 'gameName',
      label: t('user.userList.game.gameName'),
      // width: 60,
      align: 'center'
    },
    // {
    //   prop: 'gameGroupId',
    //   slot: 'gameGroupId',
    //   label: t('user.userList.game.gameGroupId'),
    //   // width: 60,
    //   align: 'center'
    // },
    {
      prop: 'cashBet',
      label: 'Cash',
      align: 'center',
      children: [
        {
          prop: 'cashBet',
          label: t('user.userList.game.cashBet'),
          align: 'center'
        },
        {
          prop: 'cashReward',
          label: t('user.userList.game.cashReward'),
          align: 'center'
        },
        {
          prop: 'cashRtp',
          label: t('user.userList.game.cashRtp'),
          align: 'center'
        },
        {
          prop: 'cashNetWin',
          label: t('user.userList.game.cashNetWin'),
          align: 'center'
        }
      ]
    },
    {
      prop: 'bonusBet',
      label: 'Bonus',
      align: 'center',
      children: [
        {
          prop: 'bonusBet',
          label: t('user.userList.game.bonusBet'),
          align: 'center'
        },
        {
          prop: 'bonusReward',
          label: t('user.userList.game.bonusReward'),
          align: 'center'
        },
        {
          prop: 'bonusRtp',
          label: t('user.userList.game.bonusRtp'),
          align: 'center'
        },
        {
          prop: 'bonusNetWin',
          label: t('user.userList.game.bonusNetWin'),
          align: 'center'
        }
      ]
    },
    {
      prop: 'totalBet',
      label: t('user.userList.game.totalBet'),
      align: 'center'
    },
    {
      prop: 'totalReward',
      label: t('user.userList.game.totalReward'),
      align: 'center'
    },
    {
      prop: 'totalRtp',
      label: t('user.userList.game.totalRtp'),
      align: 'center'
    },
    {
      prop: 'totalBetCnt',
      label: t('user.userList.game.totalBetCnt'),
      align: 'center'
    },
    // {
    //   label: t('action.action'),
    //   width: 100,
    //   align: 'center',
    //   slot: 'action',
    //   prop: 'action',
    //   fixed: 'right',
    //   hideInPrint: true,
    //   hideInExport: true
    // }
  ]);
  /** 表格选中数据 */
  const selections = ref<UserGameWinLossVO[]>([]);

  /** 当前编辑数据 */
  const current = ref<UserGameWinLossVO | null>(null);

  /** 是否显示编辑弹窗 */
  const showInfo = ref(false);
  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    where = {
      ...where,
      sortName: orders.sort,
      orderName: orders.order,
      ...pages,
      uid: props!.uid
    };
    return getUserGameWinLossPage(where);
  };
  /** 表格合计行 */
  const getSummaries = ({ columns, data }) => {
    const sums: string[] = [];
    const labelIndex = 0;
    // 各投注/返奖合计（用于计算 RTP = 返奖 ÷ 下注）
    const sum = (prop: string) => data.reduce((prev: number, curr: UserGameWinLossVO) => prev + (Number(curr[prop]) || 0), 0);
    const cashBetSum = sum('cashBet');
    const cashRewardSum = sum('cashReward');
    const bonusBetSum = sum('bonusBet');
    const bonusRewardSum = sum('bonusReward');
    const totalBetSum = sum('totalBet');
    const totalRewardSum = sum('totalReward');

    columns.forEach((column: Column, index: number) => {
      if (index === labelIndex) {
        sums[index] = t('user.userList.userTabbar.total');
      } else if (column.property === 'cashRtp') {
        sums[index] = cashBetSum ? `${((cashRewardSum / cashBetSum) * 100).toFixed(2)}%` : '0.00%';
      } else if (column.property === 'bonusRtp') {
        sums[index] = bonusBetSum ? `${((bonusRewardSum / bonusBetSum) * 100).toFixed(2)}%` : '0.00%';
      } else if (column.property === 'totalRtp') {
        sums[index] = totalBetSum ? `${((totalRewardSum / totalBetSum) * 100).toFixed(2)}%` : '0.00%';
      } else if (!['factoryCode', 'gameId', 'gameName', 'gameGroupId'].includes(column.property as string)) {
        sums[index] = formatNumber(sum(column.property as string));
      } else {
        sums[index] = '';
      }
    });
    return sums;
  };
  /** 搜索 */
  const reload = (where?: UserGameWinLossVO) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 打开详情弹窗 */
  const openInfo = (row?: UserGameWinLossVO) => {
    current.value = row ?? null;
    showInfo.value = true;
  };
</script>
