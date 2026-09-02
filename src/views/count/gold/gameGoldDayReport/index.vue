<template>
  <ele-card :bordered="false" style="margin: 20px">
    <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="每日" name="first">
        <el-card :bordered="false">
          <!-- 搜索表单 -->
          <game-gold-day-report-search :where="defaultWhere" @search="reload" />
          <!-- 表格 -->
          <ele-pro-table ref="tableRef" :striped="true" :bordered="true" row-key="id" :columns="columns"
            :show-summary="true" :summary-method="getSummaries" size="small" :pagination="{
              pageSize: 50,
              pageSizes: [50, 100, 200],
              layout: 'total, prev, pager, next, sizes, jumper',
              style: { margin: 'auto' },
              autoAmend: false
            }" :headerEllipsis="false" :datasource="datasource" :scroll="{ x: 1000 }" :where="defaultWhere"
            cache-key="progameGoldDayReport">
            <!-- <template #toolbar>
              <el-popconfirm title="确定导出所有数据？" @confirm="doExcelExport()" width="250px">
                <template #reference>
                  <el-button type="warning" :icon="UploadOutlined">导出</el-button>
                </template>
</el-popconfirm>
</template> -->
            <template #gameId="{ row }">
              <span>{{ row.gameId }}<br />{{ row.gameName }}</span>
            </template>
            <template #sid="{ row }">
              <div v-if="row.sid == -1">所有</div>
              <dict-data v-else code="serverType" v-model="row.sid" valueType="number" type="tag" />
            </template>
            <!-- 初级场 -->
            <template #betNum="{ row }">
              <div>{{ row.betNum }}<br />{{ row.winNum }}</div>
            </template>
            <template #totalBet="{ row }">
              <div>{{ row.totalBet }}<br />{{ row.totalWin }}</div>
            </template>
            <template #freespinNum="{ row }">
              <div>{{ row.freespinNum }}<br />{{ row.freespinWin }}</div>
            </template>
            <template #jackpotNum="{ row }">
              <div>{{ row.jackpotNum }}<br />{{ row.jackpotWin }}</div>
            </template>
            <template #buyFreespinNum="{ row }">
              <div>{{ row.buyFreespinNum }}<br />{{ row.buyFreespinWin }}</div>
            </template>

            <!-- 低级场 -->
            <template #betNum0="{ row }">
              <div>{{ row.betNum0 }}<br />{{ row.winNum0 }}</div>
            </template>
            <template #totalBet0="{ row }">
              <div>{{ row.totalBet0 }}<br />{{ row.totalWin0 }}</div>
            </template>
            <template #freespinNum0="{ row }">
              <div>{{ row.freespinNum0 }}<br />{{ row.freespinWin0 }}</div>
            </template>
            <template #jackpotNum0="{ row }">
              <div>{{ row.jackpotNum0 }}<br />{{ row.jackpotWin0 }}</div>
            </template>
            <template #buyFreespinNum0="{ row }">
              <div>{{ row.buyFreespinNum0 }}<br />{{ row.buyFreespinWin0 }}</div>
            </template>

            <!-- 中级场 -->
            <template #betNum1="{ row }">
              <div>{{ row.betNum1 }}<br />{{ row.winNum1 }}</div>
            </template>
            <template #totalBet1="{ row }">
              <div>{{ row.totalBet1 }}<br />{{ row.totalWin1 }}</div>
            </template>
            <template #freespinNum1="{ row }">
              <div>{{ row.freespinNum1 }}<br />{{ row.freespinWin1 }}</div>
            </template>
            <template #jackpotNum1="{ row }">
              <div>{{ row.jackpotNum1 }}<br />{{ row.jackpotWin1 }}</div>
            </template>
            <template #buyFreespinNum1="{ row }">
              <div>{{ row.buyFreespinNum1 }}<br />{{ row.buyFreespinWin1 }}</div>
            </template>

            <!-- 高级场 -->
            <template #betNum2="{ row }">
              <div>{{ row.betNum2 }}<br />{{ row.winNum2 }}</div>
            </template>
            <template #totalBet2="{ row }">
              <div>{{ row.totalBet2 }}<br />{{ row.totalWin2 }}</div>
            </template>
            <template #freespinNum2="{ row }">
              <div>{{ row.freespinNum2 }}<br />{{ row.freespinWin2 }}</div>
            </template>
            <template #jackpotNum2="{ row }">
              <div>{{ row.jackpotNum2 }}<br />{{ row.jackpotWin2 }}</div>
            </template>
            <template #buyFreespinNum2="{ row }">
              <div>{{ row.buyFreespinNum2 }}<br />{{ row.buyFreespinWin2 }}</div>
            </template>
            <!-- 黑名单 -->
            <template #betNum3="{ row }">
              <div>{{ row.betNum3 }}<br />{{ row.winNum3 }}</div>
            </template>
            <template #totalBet3="{ row }">
              <div>{{ row.totalBet3 }}<br />{{ row.totalWin3 }}</div>
            </template>
            <template #freespinNum3="{ row }">
              <div>{{ row.freespinNum3 }}<br />{{ row.freespinWin3 }}</div>
            </template>
            <template #jackpotNum3="{ row }">
              <div>{{ row.jackpotNum3 }}<br />{{ row.jackpotWin3 }}</div>
            </template>
            <template #buyFreespinNum3="{ row }">
              <div>{{ row.buyFreespinNum3 }}<br />{{ row.buyFreespinWin3 }}</div>
            </template>
            <template #action="{ row }">
<!--              <el-link type="primary" v-if="row.gameId > 0" :underline="false" @click="openInfo(row)"> 详情</el-link>
              <el-divider direction="vertical" v-if="row.gameId > 0" />-->
              <el-link type="success" :underline="false" @click="openCharts(row)"> 实时RTP</el-link>
            </template>
          </ele-pro-table>

          <game-gold-chart v-model="showCharts" :data="current"></game-gold-chart>

          <game-gold-day-report-info v-model="showInfo" :data="current" @done="reload" />
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="每月" name="second">
        <GameGoldMonthReport />
      </el-tab-pane>
      <el-tab-pane label="总计" name="third">
        <GameGoldReport />
      </el-tab-pane>
    </el-tabs>
  </ele-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { EleProTable } from 'ele-admin-plus/es';
import type { Columns, DatasourceFunction, Column } from 'ele-admin-plus/es/ele-pro-table/types';
import GameGoldDayReportSearch from './components/gameGoldDayReportSearch.vue';
import GameGoldChart from './components/gameGoldChart.vue';
import GameGoldDayReportInfo from './components/gameGoldDayReportInfo.vue';
import { pageGameGoldDayReports } from '@/api/count/gameGoldDayReport';
import type { GameGoldDayReports } from '@/api/count/model';
import type { TabsPaneContext } from 'element-plus'
// 总计
import GameGoldReport from '../gameGoldReport/index.vue';
import GameGoldMonthReport from '../gameGoldMonthReport/index.vue';
import dayjs from 'dayjs';
import { formatNumber } from '@/utils/common';
const activeName = ref('first')
// 表格实例
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

// 表格列配置
const columns = ref<Columns>([
  {
    label: 'ID',
    prop: 'id',
    width: 70,
    align: 'center',
    fixed: 'left'
  },
  {
    label: 'sid',
    prop: 'sid',
    slot: 'sid',
    align: 'center'
  },
  {
    label: '游戏Id|名称',
    prop: 'gameId',
    slot: 'gameId',
    align: 'center'
  },
  {
    label: '时间',
    prop: 'daykey',
    align: 'center',
    sortable: 'custom'
  },
  {
    label: '所有',
    align: 'center',
    children: [
      {
        label: '净利',
        prop: 'totalResult',
        align: 'center',
        sortable: 'custom'
      },
      {
        label: 'RTP',
        prop: 'rtp',
        align: 'center',
        sortable: 'custom'
      },
      {
        label: '人数',
        prop: 'personNum',
        align: 'center',
        sortable: 'custom'
      },
      {
        label: '下注次数|赢取次数',
        prop: 'betNum',
        slot: 'betNum',
        align: 'center'
      },
      {
        label: '总下注|总赢取',
        prop: 'totalBet',
        slot: 'totalBet',
        align: 'center',
        sortable: 'custom'
      },
      {
        label: 'freespin次数|赢取',
        prop: 'freespinNum',
        slot: 'freespinNum',
        align: 'center'
      },
      {
        label: 'jackpot次数|赢取',
        prop: 'jackpotNum',
        slot: 'jackpotNum',
        align: 'center'
      },
      {
        label: '购买次数|购买花费',
        prop: 'buyFreespinNum',
        slot: 'buyFreespinNum',
        align: 'center'
      }
    ]
  },
  {
    label: '低级场',
    align: 'center',
    children: [
      {
        label: '净利',
        prop: 'totalResult0',
        align: 'center',
        sortable: 'custom'
      },
      {
        label: 'RTP',
        prop: 'rtp0',
        align: 'center',
        sortable: 'custom'
      },
      {
        label: '人数',
        prop: 'personNum0',
        align: 'center',
        sortable: 'custom'
      },
      {
        label: '下注次数|赢取次数',
        prop: 'betNum0',
        slot: 'betNum0',
        align: 'center'
      },
      {
        label: '总下注|总赢取',
        prop: 'totalBet0',
        slot: 'totalBet0',
        align: 'center',
        sortable: 'custom'
      },
      {
        label: 'freespin次数|赢取',
        prop: 'freespinNum0',
        slot: 'freespinNum0',
        align: 'center'
      },
      {
        label: 'jackpot次数|赢取',
        prop: 'jackpotNum0',
        slot: 'jackpotNum0',
        align: 'center'
      },
      {
        label: '购买次数|购买花费',
        prop: 'buyFreespinNum0',
        slot: 'buyFreespinNum0',
        align: 'center'
      }
    ]
  },
  {
    label: '中级场',
    align: 'center',
    children: [
      {
        label: '净利',
        prop: 'totalResult1',
        align: 'center',
        sortable: 'custom'
      },
      {
        label: 'RTP',
        prop: 'rtp1',
        align: 'center',
        sortable: 'custom'
      },
      {
        label: '人数',
        prop: 'personNum1',
        align: 'center',
        sortable: 'custom'
      },
      {
        label: '下注次数|赢取次数',
        prop: 'betNum1',
        slot: 'betNum1',
        align: 'center'
      },
      {
        label: '总下注|总赢取',
        prop: 'totalBet1',
        slot: 'totalBet1',
        align: 'center',
        sortable: 'custom'
      },
      {
        label: 'freespin次数|赢取',
        prop: 'freespinNum1',
        slot: 'freespinNum1',
        align: 'center'
      },
      {
        label: 'jackpot次数|赢取',
        prop: 'jackpotNum1',
        slot: 'jackpotNum1',
        align: 'center'
      },
      {
        label: '购买次数|购买花费',
        prop: 'buyFreespinNum1',
        slot: 'buyFreespinNum1',
        align: 'center'
      }
    ]
  },
  {
    label: '高级场',
    align: 'center',
    children: [
      {
        label: '净利',
        prop: 'totalResult2',
        align: 'center',
        sortable: 'custom'
      },
      {
        label: 'RTP',
        prop: 'rtp2',
        align: 'center',
        sortable: 'custom'
      },
      {
        label: '人数',
        prop: 'personNum2',
        align: 'center',
        sortable: 'custom'
      },
      {
        label: '下注次数|赢取次数',
        prop: 'betNum2',
        slot: 'betNum2',
        align: 'center'
      },
      {
        label: '总下注|总赢取',
        prop: 'totalBet2',
        slot: 'totalBet2',
        align: 'center',
        sortable: 'custom'
      },
      {
        label: 'freespin次数|赢取',
        prop: 'freespinNum2',
        slot: 'freespinNum2',
        align: 'center'
      },
      {
        label: 'jackpot次数|赢取',
        prop: 'jackpotNum2',
        slot: 'jackpotNum2',
        align: 'center'
      },
      {
        label: '购买次数|购买花费',
        prop: 'buyFreespinNum2',
        slot: 'buyFreespinNum2',
        align: 'center'
      }
    ]
  },
  {
    label: '黑名单',
    align: 'center',
    children: [
      {
        label: '净利',
        prop: 'totalResult3',
        align: 'center',
        sortable: 'custom'
      },
      {
        label: 'RTP',
        prop: 'rtp3',
        align: 'center',
        sortable: 'custom'
      },
      {
        label: '人数',
        prop: 'personNum3',
        align: 'center',
        sortable: 'custom'
      },
      {
        label: '下注次数|赢取次数',
        prop: 'betNum3',
        slot: 'betNum3',
        align: 'center'
      },
      {
        label: '总下注|总赢取',
        prop: 'totalBet3',
        slot: 'totalBet3',
        align: 'center',
        sortable: 'custom'
      },
      {
        label: 'freespin次数|赢取',
        prop: 'freespinNum3',
        slot: 'freespinNum3',
        align: 'center'
      },
      {
        label: 'jackpot次数|赢取',
        prop: 'jackpotNum3',
        slot: 'jackpotNum3',
        align: 'center'
      },
      {
        label: '购买次数|购买花费',
        prop: 'buyFreespinNum3',
        slot: 'buyFreespinNum3',
        align: 'center'
      }
    ]
  },
  {
    label: '操作',
    // key: 'action',
    prop: 'action',
    slot: 'action',
    fixed: 'right',
    width: 120,
    align: 'center'
  }
]);

// 表格选中数据
const selection = ref([]);

// 当前编辑数据
const current = ref<GameGoldDayReports | null>(null);
const handleClick = (tab: TabsPaneContext) => {
  console.log(tab.paneName)
}
// 默认搜索条件
const defaultWhere = reactive({
  uid: undefined,
  type: 0,
  sortName: 'totalResult',
  gameId: undefined,
  startDay: dayjs().subtract(3, 'day').format('YYYYMMDD'),
  endDay: dayjs().format('YYYYMMDD')
});
const currType = ref(0);
// 表格数据源
const datasource: DatasourceFunction = ({ pages, limit, where, orders }) => {
  currType.value = where.type;
  where = { ...defaultWhere, ...where, orderName: orders.order, sortName: orders.sort };
  return pageGameGoldDayReports({ ...where, ...pages, limit });
};

/* 搜索 */
const reload = (where?: GameGoldDayReports) => {
  selection.value = [];
  tableRef?.value?.reload({ page: 1, where });
};
const showInfo = ref(false);
/* 打开详情弹窗 */
const openInfo = (row?: GameGoldDayReports) => {
  current.value = row ?? null;
  showInfo.value = true;
};
const showCharts = ref(false);
/* 打开Charts弹窗 */
const openCharts = (row?: GameGoldDayReports) => {
  current.value = row ?? null;
  showCharts.value = true;
};
// 导出
const doExcelExport = () => {
  // exportPayWithdraw(searchRef.value!.searchParams()).then((res) => {
  //   handleDownload('邮件记录', res.data as any);
  // });
};
/** 表格合计行,  */
const getSummaries = ({ columns, data }) => {
  const sums: string[] = [];
  const labelIndex = 0;

  columns.forEach((column: Column, index: number) => {
    if (index === labelIndex) {
      sums[index] = '合计/平均';
    } else if (!['uid', 'daykey', 'sid', 'gameId', 'action'].includes(column.property as string)) {
      if (['rtp', 'rtp0', 'rtp1', 'rtp2', 'rtp3'].includes(column.property as string)) {
        // 计算平均数
        const validValues = data
          .map((item: GameGoldDayReports) => Number(item[column.property as string]))
          .filter(value => !isNaN(value));
        const average = validValues.length > 0 ? validValues.reduce((prev, curr) => prev + curr, 0) / validValues.length : 0;
        sums[index] = average.toFixed(2); // 保留两位小数
      } else {
        // 计算求和
        const total = data.reduce((prev: number, curr: GameGoldDayReports) => {
          const value = Number(curr[column.property as string]);
          if (!isNaN(value)) {
            return prev + value;
          }
          return prev;
        }, 0);
        sums[index] = formatNumber(total);
      }
    } else {
      sums[index] = '';
    }
  });
  return sums;
};
</script>

<script lang="ts">
export default {
  name: 'GameGoldDayReport'
};
</script>
<style lang="scss" scoped></style>
