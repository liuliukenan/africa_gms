<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <BetSearch ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :max-height="650"  :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :tools="['reload', 'columns', 'maximized']" :footer-style="{ paddingBottom: '16px' }" cache-key="rebateTable" :show-summary="true" size="small" :summary-method="getSummaries" :headerEllipsis="false">
        <!-- -->
        <template #profitLoss="{ row }">
          <span :style="{ color: profitLossColor(row.profitLoss) }">{{ row.profitLoss }}</span>
        </template>
        <template #rtp="{ row }">
          <span :style="{ color: rtpColor(row.rtp) }">{{ row.rtp }}</span>
        </template>
        <template #cashProfitLoss="{ row }">
          <span :style="{ color: profitLossColor(row.cashProfitLoss) }">{{ row.cashProfitLoss }}</span>
        </template>
        <template #cashRtp="{ row }">
          <span :style="{ color: rtpColor(row.cashRtp) }">{{ row.cashRtp }}</span>
        </template>
        <template #bonusProfitLoss="{ row }">
          <span :style="{ color: profitLossColor(row.bonusProfitLoss) }">{{ row.bonusProfitLoss }}</span>
        </template>
        <template #bonusRtp="{ row }">
          <span :style="{ color: rtpColor(row.bonusRtp) }">{{ row.bonusRtp }}</span>
        </template>
        <template #toolbar>
          <el-row :gutter="8">
            <el-col :lg="3" :md="3" :sm="6" :xs="6">
              <el-select v-model="searchType" placeholder="请选择" style="width: 100%" @change="changeType">
                <el-option v-for="item in searchArr" :key="item.id" :label="item.label" :value="item.id" />
              </el-select>
            </el-col>
            <el-col :lg="3" :md="3" :sm="6" :xs="6">
              <el-popconfirm title="确认导出表格数据吗？" @confirm="openExport()">
                <template #reference>
                  <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">导出</el-button>
                </template>
              </el-popconfirm>
            </el-col>
          </el-row>
        </template>
      </ele-pro-table>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup>
  import { computed, h, reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Column, Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import BetSearch from './components/bet-search.vue';
  // import SearchForm from "@/components/SearchForm/index.vue";
  import { pageGameBet, exportGameBet } from '@/api/operateAnalysis/monitoringReport/betApi';
  import type { Bet, BetParam } from '@/api/operateAnalysis/monitoringReport/model/bet';
  import dayjs from 'dayjs';
  import { UploadOutlined } from '@/components/icons';
  import { useConfigStore } from '@/store/modules/config';
  import { ElMessage } from 'element-plus';
  import { formatNumber } from '@/utils/common';
  import { withTooltipHeader } from '@/utils/table';
  // import { ElMessage } from "element-plus";
  const { t } = useI18n();
  const searchType = ref(0);
  const searchArr = ref([
    { id: 0, label: '按天' },
    { id: 1, label: '按类型' },
    { id: 2, label: '按游戏' }
    // { id: 4, label: '按厂商' },
  ]);
  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof BetSearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** RTP 文字颜色：<85% 红，85-100% 绿，>100% 橙 */
  const rtpColor = (val: any) => {
    const num = typeof val === 'string' ? parseFloat(val.replace('%', '')) : Number(val);
    if (isNaN(num)) return '';
    if (num < 85) return '#da3837';
    if (num <= 100) return '#60c92e';
    return '#faad14';
  };

  /** 盈亏文字颜色：正数绿，负数红 */
  const profitLossColor = (val: any) => {
    const num = Number(val);
    if (isNaN(num)) return '';
    if (num > 0) return '#60c92e';
    if (num < 0) return '#da3837' ;
    return '';
  };

  /** 表格列配置 */
  const columns = computed<Columns>(() => {
    const baseColumns: Columns = [];
    // 按游戏时，在统计类型前增加游戏列
    if (searchType.value === 2) {
      baseColumns.push({
        prop: 'gameId',
        label: t('monitoringReport.bet.columns.gameId'),
        align: 'center',
        fixed: 'left'
      });
    }
    baseColumns.push(
      {
        prop: 'statType',
        align: 'center',
        renderHeader: withTooltipHeader(t('monitoringReport.bet.columns.statType'), t('monitoringReport.bet.tooltips.statType')),
        fixed: 'left'
      },
      {
        prop: 'bet',
        label: t('monitoringReport.bet.columns.bet'),
        align: 'center',
        children: [
          {
            prop: 'betUserCount',
            renderHeader: withTooltipHeader(t('monitoringReport.bet.columns.betUserCount'), t('monitoringReport.bet.tooltips.betUserCount')),
            align: 'center',
            sortable: 'custom'
          },
          {
            prop: 'betCount',
            renderHeader: withTooltipHeader(t('monitoringReport.bet.columns.betCount'), t('monitoringReport.bet.tooltips.betCount')),
            align: 'center',
            sortable: 'custom'
          },
          {
            prop: 'betAmount',
            renderHeader: withTooltipHeader(t('monitoringReport.bet.columns.betAmount'), t('monitoringReport.bet.tooltips.betAmount')),
            align: 'center',
            sortable: 'custom'
          }
        ]
      },
      {
        prop: 'avg',
        label: t('monitoringReport.bet.columns.avg'),
        align: 'center',
        children: [
          {
            prop: 'avgBetAmountPerUser',
            renderHeader: withTooltipHeader(t('monitoringReport.bet.columns.avgBetAmountPerUser'), t('monitoringReport.bet.tooltips.avgBetAmountPerUser')),
            align: 'center'
          },
          {
            prop: 'avgBetCountPerUser',
            renderHeader: withTooltipHeader(t('monitoringReport.bet.columns.avgBetCountPerUser'), t('monitoringReport.bet.tooltips.avgBetCountPerUser')),
            align: 'center'
          }
        ]
      },

      {
        prop: 'prizeAmount',
        renderHeader: withTooltipHeader(t('monitoringReport.bet.columns.prizeAmount'), t('monitoringReport.bet.tooltips.prizeAmount')),
        align: 'center',
        sortable: 'custom'
      },
      {
        prop: 'prizeCount',
        renderHeader: withTooltipHeader(t('monitoringReport.bet.columns.prizeCount'), t('monitoringReport.bet.tooltips.prizeCount')),
        align: 'center'
      },
      {
        prop: 'winRate',
        renderHeader: withTooltipHeader(t('monitoringReport.bet.columns.winRate'), t('monitoringReport.bet.tooltips.winRate')),
        align: 'center'
      },
      {
        prop: 'profitLoss',
        renderHeader: withTooltipHeader(t('monitoringReport.bet.columns.profitLoss'), t('monitoringReport.bet.tooltips.profitLoss')),
        align: 'center',
        sortable: 'custom',
        slot: 'profitLoss'
      },
      {
        prop: 'rtp',
        renderHeader: withTooltipHeader(t('monitoringReport.bet.columns.rtp'), t('monitoringReport.bet.tooltips.rtp')),
        align: 'center',
        sortable: 'custom',
        slot: 'rtp'
      },
      {
        prop: 'avgBetAmountPerBet',
        renderHeader: withTooltipHeader(t('monitoringReport.bet.columns.avgBetAmountPerBet'), t('monitoringReport.bet.tooltips.avgBetAmountPerBet')),
        align: 'center'
      },
      {
        prop: 'cash',
        label: t('monitoringReport.bet.columns.cash'),
        align: 'center',
        children: [
          {
            prop: 'cashBet',
            renderHeader: withTooltipHeader(t('monitoringReport.bet.columns.cashBet'), t('monitoringReport.bet.tooltips.cashBet')),
            align: 'center',
            // sortable: 'custom'
          },
          {
            prop: 'cashReward',
            renderHeader: withTooltipHeader(t('monitoringReport.bet.columns.cashReward'), t('monitoringReport.bet.tooltips.cashReward')),
            align: 'center',
            // sortable: 'custom'
          },
          {
            prop: 'cashProfitLoss',
            renderHeader: withTooltipHeader(t('monitoringReport.bet.columns.cashProfitLoss'), t('monitoringReport.bet.tooltips.cashProfitLoss')),
            align: 'center',
            slot: 'cashProfitLoss'
            // sortable: 'custom'
          },
          {
            prop: 'cashRtp',
            renderHeader: withTooltipHeader(t('monitoringReport.bet.columns.cashRtp'), t('monitoringReport.bet.tooltips.cashRtp')),
            align: 'center',
            slot: 'cashRtp'
            // sortable: 'custom'
          }
        ]
      },
      {
        prop: 'bonus',
        label: t('monitoringReport.bet.columns.bonus'),
        align: 'center',
        children: [
          {
            prop: 'bonusBet',
            renderHeader: withTooltipHeader(t('monitoringReport.bet.columns.bonusBet'), t('monitoringReport.bet.tooltips.bonusBet')),
            align: 'center',
            // sortable: 'custom'
          },
          {
            prop: 'bonusReward',
            renderHeader: withTooltipHeader(t('monitoringReport.bet.columns.bonusReward'), t('monitoringReport.bet.tooltips.bonusReward')),
            align: 'center',
            // sortable: 'custom'
          },
          {
            prop: 'bonusProfitLoss',
            renderHeader: withTooltipHeader(t('monitoringReport.bet.columns.bonusProfitLoss'), t('monitoringReport.bet.tooltips.bonusProfitLoss')),
            align: 'center',
            slot: 'bonusProfitLoss'
            // sortable: 'custom'
          },
          {
            prop: 'bonusRtp',
            renderHeader: withTooltipHeader(t('monitoringReport.bet.columns.bonusRtp'), t('monitoringReport.bet.tooltips.bonusRtp')),
            align: 'center',
            slot: 'bonusRtp'
            // sortable: 'custom'
          }
        ]
      }
    );
    return baseColumns;
  });

  /** 表格选中数据 */
  const selections = ref<Bet[]>([]);

  const configStore = useConfigStore();

  // 默认搜索条件
  const defaultWhere = reactive({
    startDate: dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    endDate: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
    countryCode: configStore.countryArr?.[0]?.code || '',
    statType: searchType.value,
    userType: 10
  });

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    where = { ...where, statType: searchType.value };
    return pageGameBet({
      ...defaultWhere,
      ...where,
      ...orders,
      ...pages
    });
  };
  const changeType = (val) => {
    searchType.value = val;
    reload();
  };
  /** 搜索 */
  const reload = (where?: BetParam) => {
    selections.value = [];
    if (!where && searchRef.value) {
      const searchParams = searchRef.value.searchParams();
      where = {
        ...searchParams,
        startDate: (searchRef.value as any).timeArr?.[0],
        endDate: (searchRef.value as any).timeArr?.[1]
      };
    }
    where = { statType: searchType.value, ...where };
    tableRef.value?.reload?.({ page: 1, where });
  };

  const openExport = () => {
    exportGameBet({ ...searchRef.value!.searchParams(), statType: searchType.value }, 'YXSJBB').then((res) => {
      ElMessage.success(res);
    });
  };
  const splitStr = (winRate: string) => {
    return Number(winRate.replace('%', ''));
  };
  /** 表格合计行,  */
  const getSummaries = ({ columns, data }) => {
    const sums: any[] = [];
    // 按游戏时，gameId在index 0，statType在index 1，合计显示在statType列
    const labelIndex = searchType.value === 2 ? 1 : 0;

    // 赔付金额合计
    const prizeAmountSum = data.reduce((acc, item) => acc + (Number(item.prizeAmount) || 0), 0);
    // 投注金额合计
    const betAmountSum = data.reduce((acc, item) => acc + (Number(item.betAmount) || 0), 0);

    // 中奖次数合计
    const prizeCountSum = data.reduce((acc, item) => acc + (Number(item.prizeCount) || 0), 0);
    // 投注次数合计
    const betCountSum = data.reduce((acc, item) => acc + (Number(item.betCount) || 0), 0);
    // 投注人数合计
    const betUserCountSum = data.reduce((acc, item) => acc + (Number(item.betUserCount) || 0), 0);

    // 现金下注金额合计
    const cashBetSum = data.reduce((acc, item) => acc + (Number(item.cashBet) || 0), 0);
    // 现金返奖金额合计
    const cashRewardSum = data.reduce((acc, item) => acc + (Number(item.cashReward) || 0), 0);
    // 奖金下注金额合计
    const bonusBetSum = data.reduce((acc, item) => acc + (Number(item.bonusBet) || 0), 0);
    // 奖金返奖金额合计
    const bonusRewardSum = data.reduce((acc, item) => acc + (Number(item.bonusReward) || 0), 0);

    columns.forEach((column: Column, index: number) => {
      if (index === labelIndex) {
        sums[index] = '合计';
      }
      // 中奖率=中奖次数/投注次数*100%
      else if (column.property === 'winRate') {
        sums[index] = ((prizeCountSum / betCountSum) * 100).toFixed(2) + '%' || '0.00%';
      }
      // RTP=赔付金额/投注金额*100%
      else if (column.property === 'rtp') {
        const val = ((prizeAmountSum / betAmountSum) * 100).toFixed(2) + '%' || '0.00%';
        sums[index] = h('span', { style: { color: rtpColor(val) } }, val);
      }
      // 人均投注=投注金额/投注人数
      else if (column.property === 'avgBetAmountPerUser') {
        sums[index] = (betAmountSum / betUserCountSum).toFixed(2) || '0';
      }
      // 次均投注金额=投注金额/投注次数
      else if (column.property === 'avgBetAmountPerBet') {
        sums[index] = (betAmountSum / betCountSum).toFixed(2) || '0';
      }
      // 人均投注次数=投注次数/投注人数
      else if (column.property === 'avgBetCountPerUser') {
        sums[index] = (betCountSum / betUserCountSum).toFixed(2) || '0';
      }
      // 现金RTP=现金返奖金额/现金下注金额*100%
      else if (column.property === 'cashRtp') {
        const val = ((cashRewardSum / cashBetSum) * 100).toFixed(2) + '%' || '0.00%';
        sums[index] = h('span', { style: { color: rtpColor(val) } }, val);
      }
      // 奖金RTP=奖金返奖金额/奖金下注金额*100%
      else if (column.property === 'bonusRtp') {
        const val = ((bonusRewardSum / bonusBetSum) * 100).toFixed(2) + '%' || '0.00%';
        sums[index] = h('span', { style: { color: rtpColor(val) } }, val);
      // 盈亏合计（正数红，负数绿）
      } else if (column.property === 'profitLoss' || column.property === 'cashProfitLoss' || column.property === 'bonusProfitLoss') {
        const total = data.reduce((prev: number, curr: Bet) => {
          const value = Number(curr[column.property as string]);
          if (!isNaN(value)) { return prev + value; }
          return prev;
        }, 0);
        const val = formatNumber(total);
        sums[index] = h('span', { style: { color: profitLossColor(total) } }, val);
      } else if (!['uid', 'createTime', 'gameId', 'cashRtp', 'bonusRtp'].includes(column.property as string)) {
        const total = data.reduce((prev: number, curr: Bet) => {
          const value = Number(curr[column.property as string]);
          if (!isNaN(value)) {
            return prev + value;
          }
          return prev;
        }, 0);
        sums[index] = formatNumber(total);
      } else {
        sums[index] = '';
      }
    });
    return sums;
  };
</script>
