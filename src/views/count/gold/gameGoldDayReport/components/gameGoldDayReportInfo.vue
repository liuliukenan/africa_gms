<template>
  <ele-modal width="100%" v-model="visible" title="详情" :body-style="{ paddingBottom: '5px' }" @open="handleOpen"
    position="center">
    <!-- 表格 -->
    <ele-pro-table ref="tableRef" :striped="true" :bordered="true" row-key="id" :columns="columns"  :pagination="{
            pageSize: 50,
            pageSizes: [50, 100, 200],
            layout: 'total, prev, pager, next, sizes, jumper',
            style: { margin: 'auto' },
            autoAmend: false
        }"
      :header-ellipsis="false" size="small" :datasource="datasource" :scroll="{ x: 1000 }" :where="defaultWhere"
      cache-key="prouserGoldTotalReport">
      <template #gameId="{ row }">
        <div>{{ row.gameId }}<br />{{ row.gameName }}</div>
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
    </ele-pro-table>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { EleProTable } from "ele-admin-plus/es";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import { pageGameGoldDayReportsInfo } from '@/api/count/gameGoldDayReport';
import type { GameGoldDayReports } from '@/api/count/model'
const props = defineProps<{
  // 修改回显的数据
  data?: GameGoldDayReports | null
}>();
// 表格实例
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);
/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });
// 表格列配置
const columns = ref<Columns>([
  {
    label: 'ID',
    fixed: 'left',
    prop: 'id',
    align: 'center',
  },
  {
    label: '游戏ID|名称',
    prop: 'gameId',
    slot: 'gameId',
    align: 'center',
  },
  {
    label: '渠道码',
    prop: 'channelCode',
    slot: 'channelCode',
    align: 'center',
  },
  {
    label: '日期',
    prop: 'daykey',
    align: 'center',
  },
  {
    label: '初级场',
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
      },
      {
        label: '下注次数|赢取次数',
        prop: 'betNum',
        slot: 'betNum',
        align: 'center',
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
        align: 'center',
      },
      {
        label: 'jackpot次数|赢取',
        prop: 'jackpotNum',
        slot: 'jackpotNum',
        align: 'center',
      },
      {
        label: '购买次数|购买花费',
        prop: 'buyFreespinNum',
        slot: 'buyFreespinNum',
        align: 'center',
      },
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
      },
      {
        label: '下注次数|赢取次数',
        prop: 'betNum0',
        slot: 'betNum0',
        align: 'center',
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
        align: 'center',
      },
      {
        label: 'jackpot次数|赢取',
        prop: 'jackpotNum0',
        slot: 'jackpotNum0',
        align: 'center',
      },
      {
        label: '购买次数|购买花费',
        prop: 'buyFreespinNum0',
        slot: 'buyFreespinNum0',
        align: 'center',
      },
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
      },
      {
        label: '下注次数|赢取次数',
        prop: 'betNum1',
        slot: 'betNum1',
        align: 'center',
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
        align: 'center',
      },
      {
        label: 'jackpot次数|赢取',
        prop: 'jackpotNum1',
        slot: 'jackpotNum1',
        align: 'center',
      },
      {
        label: '购买次数|购买花费',
        prop: 'buyFreespinNum1',
        slot: 'buyFreespinNum1',
        align: 'center',
      },
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
      },
      {
        label: '下注次数|赢取次数',
        prop: 'betNum2',
        slot: 'betNum2',
        align: 'center',
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
        align: 'center',
      },
      {
        label: 'jackpot次数|赢取',
        prop: 'jackpotNum2',
        slot: 'jackpotNum2',
        align: 'center',
      },
      {
        label: '购买次数|购买花费',
        prop: 'buyFreespinNum2',
        slot: 'buyFreespinNum2',
        align: 'center',
      },
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
      },
      {
        label: '下注次数|赢取次数',
        prop: 'betNum3',
        slot: 'betNum3',
        align: 'center',
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
        align: 'center',
      },
      {
        label: 'jackpot次数|赢取',
        prop: 'jackpotNum3',
        slot: 'jackpotNum3',
        align: 'center',
      },
      {
        label: '购买次数|购买花费',
        prop: 'buyFreespinNum3',
        slot: 'buyFreespinNum3',
        align: 'center',
      },
    ]
  },
]);

// 默认搜索条件
const defaultWhere = reactive({
  gameId: 0,
  daykey: 0,
});

// 表格数据源
const datasource: DatasourceFunction = ({ pages, limit, where, orders }) => {
  where = { ...where, ...defaultWhere, orderName: orders.order, sortName: orders.sort }
  return pageGameGoldDayReportsInfo({ ...where, ...pages, limit });
};

/* 搜索 */
const reload = (where?: any) => {
  if (where == null || where == undefined) {
    where = defaultWhere;
  }
  if (!where.uid) {
    where.gameId = props.data?.gameId;
    where.daykey = props.data?.daykey;
  }
  tableRef?.value?.reload({ page: 1, where });
};

/** 关闭弹窗 */
const handleCancel = () => {
  visible.value = false;
};
/** 弹窗打开事件 */
const handleOpen = () => {

  defaultWhere.gameId = props.data?.gameId || 0;
  defaultWhere.daykey = Number(props.data?.daykey) || 0;
  reload();
};
</script>

<script lang="ts">
export default {
  name: 'UserGoldDayReport'
};
</script>
