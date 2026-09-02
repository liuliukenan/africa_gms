<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <app-game-count-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
        :export-config="{ fileName: '冲提利润表', datasource: exportSource }" :print-config="{ datasource: exportSource }"
        :footer-style="{ paddingBottom: '16px' }" cache-key="appGameCountTable" :show-summary="true"
        :summary-method="getSummaries">
        <template #totalResult="{ row }">
          <span :class="row.totalResult >= 0 ? '' : 'red'">{{ row.totalResult }}</span>
        </template>
        <template #slotsResult="{ row }">
          <span :class="row.slotsResult >= 0 ? '' : 'red'">{{ row.slotsResult }}</span>
        </template>
        <template #fishResult="{ row }">
          <span :class="row.fishResult >= 0 ? '' : 'red'">{{ row.fishResult }}</span>
        </template>
        <template #liveResult="{ row }">
          <span :class="row.liveResult >= 0 ? '' : 'red'">{{ row.liveResult }}</span>
        </template>
        <template #cardResult="{ row }">
          <span :class="row.cardResult >= 0 ? '' : 'red'">{{ row.cardResult }}</span>
        </template>
        <template #sportsResult="{ row }">
          <span :class="row.sportsResult >= 0 ? '' : 'red'">{{ row.sportsResult }}</span>
        </template>
        <template #lotteryResult="{ row }">
          <span :class="row.lotteryResult >= 0 ? '' : 'red'">{{ row.lotteryResult }}</span>
        </template>
        <template #otherResult="{ row }">
          <span :class="row.otherResult >= 0 ? '' : 'red'">{{ row.otherResult }}</span>
        </template>
        <template #cha="{ row }">
          <span :class="(row.payAmount - row.withdrawAmount >= 0) ? '' : 'red'">{{ row.payAmount-row.withdrawAmount }}</span>
        </template>
      </ele-pro-table>
    </ele-card>
    <!-- <app-game-count-edit :data="current" v-model="showEdit" @done="reload" /> -->
  </ele-page>

</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { EleProTable } from "ele-admin-plus";
import type { Column, Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import AppGameCountSearch from "./components/app-game-count-search.vue";
// import AppGameCountEdit from "./components/app-game-count-edit.vue";
import { pageAppGameCounts } from "@/api/count/appGameCountApi";
import type { AppGameCount, AppGameCountParam } from "@/api/count/model/appGameCount";
import { formatNumber } from '@/utils/common';
import dayjs from "dayjs";


/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof AppGameCountSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  {
    prop: "daykey",
    label: "时间",
    width: 60,
    align: 'center',
    fixed: 'left',
  },
  {
    prop: "totalResult",
    slot: "totalResult",
    label: "平台毛利",
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "duty",
    label: "手续费",
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "cha",
    slot: "cha",
    label: "充提差",
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "payAmount",
    label: "充值",
    // minWidth: 110,
    align: 'center',
    children: [
      {
        prop: "payAmount",
        label: "金额",
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "payNum",
        label: "人数",
        // minWidth: 110,
        align: 'center',
      },
    ]
  },
  {
    prop: "withdrawAmount",
    label: "提现",
    // minWidth: 110,
    align: 'center',
    children: [
      {
        prop: "withdrawAmount",
        label: "金额",
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "withdrawNum",
        label: "人数",
        // minWidth: 110,
        align: 'center',
      },
    ]
  },
  {
    prop: "giftAmount",
    label: "赠礼",
    // minWidth: 110,
    align: 'center',
    children: [
      {
        prop: "giftAmount",
        label: "金额",
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "giftNum",
        label: "数量",
        // minWidth: 110,
        align: 'center',
      },
    ]
  },

  {
    prop: "slotsResult",
    label: "盈亏",
    // minWidth: 110,
    align: 'center',
    children: [
      {
        prop: "slotsResult",
        slot: "slotsResult",
        label: "电子",
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "fishResult",
        slot: "fishResult",
        label: "捕鱼",
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "liveResult",
        slot: "liveResult",
        label: "真人",
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "cardResult",
        slot: "cardResult",
        label: "棋牌",
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "sportsResult",
        slot: "sportsResult",
        label: "运动",
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "lotteryResult",
        slot: "lotteryResult",
        label: "彩票",
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "otherResult",
        slot: "otherResult",
        label: "其它",
        // minWidth: 110,
        align: 'center',
      },
    ]
  },

  {
    prop: "startAmount",
    label: "开始余额",
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "overAmount",
    label: "结算余额",
    // minWidth: 110,
    align: 'center',
  },
  // {
  //   label: '时间',
  //   prop: 'createTime',
  //   align: 'center',
  //  // minWidth: 110
  // },
]);

/** 表格选中数据 */
const selections = ref<AppGameCount[]>([]);


// 默认搜索条件
const defaultWhere = reactive({
  startDay: dayjs().subtract(1, 'month').format('YYYYMMDD'),
  endDay: dayjs().format('YYYYMMDD'),
});

/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageAppGameCounts({
    ...defaultWhere,
    ...where,
    ...orders,
    ...pages
  });
};

/** 搜索 */
const reload = (where?: AppGameCountParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

/** 表格合计行,  */
const getSummaries = ({ columns, data }) => {
  const sums: string[] = [];
  const labelIndex = 0;
  // const retention2Sum = data.reduce((acc, item) => acc + (getNum(item.retention2) || 0), 0);
  // const retention3Sum = data.reduce((acc, item) => acc + (getNum(item.retention3) || 0), 0);
  // const retention7Sum = data.reduce((acc, item) => acc + (getNum(item.retention7) || 0), 0);
  // const retention30Sum = data.reduce((acc, item) => acc + (getNum(item.retention30) || 0), 0);
  columns.forEach((column: Column, index: number) => {
    if (index === labelIndex) {
      sums[index] = '合计';
    }
    // else if (column.property === 'retention2') {
    //   sums[index] = retention2Sum + '%';
    // } else if (column.property === 'retention3') {
    //   sums[index] = retention3Sum + '%';
    // } else if (column.property === 'retention7') {
    //   sums[index] = retention7Sum + '%';
    // } else if (column.property === 'retention30') {
    //   sums[index] = retention30Sum + '%';
    // } 
    else if (!['uid', 'daykey'].includes(column.property as string)) {
      const total = data
        .map((item: AppGameCount) => Number(item[column.property as string]))
        .reduce((prev: number, curr: number) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0);
      sums[index] = formatNumber(total);
    } else {
      sums[index] = '';
    }
  });
  return sums;
};

/** 导出和打印全部数据的数据源 */
const exportSource: DatasourceFunction = ({ where, orders }) => {
  return pageAppGameCounts({
    ...where,
    ...orders
  });
};
</script>
<style scoped>
.red {
  color: red;
}
</style>
