<template>
  <div class="ele-body">
    <el-card :bordered="false">
      <!-- 搜索表单 -->
      <pay-complex-count-search :where="defaultWhere" @search="reload" />
      <!-- 表格 -->
      <ele-pro-table ref="tableRef" :striped="true" :bordered="true" row-key="id" :columns="columns" size="small"
        :headerEllipsis="false" :datasource="datasource" :scroll="{ x: 1000 }" :where="defaultWhere" :pagination="{
          pageSize: 50,
          pageSizes: [50, 100, 200],
          layout: 'total, prev, pager, next, sizes, jumper',
          style: { margin: 'auto' },
          autoAmend: false
        }" :show-summary="true" :summary-method="getSummaries" cache-key="proPayComplexCount">
        <template #type="{ row }">
          <div v-if="row.type == 0">all</div>
          <div v-else-if="row.type == 1">银行</div>
          <div v-else-if="row.type == 10">转帐</div>
          <div v-else-if="row.type == 100">USDT</div>
        </template>
        <template #action="{ row }" v-permission="'count:payComplexCount:info'">
          <el-link type="primary" :underline="false" @click="openInfo(row)">
            详情
          </el-link>
        </template>
      </ele-pro-table>
    </el-card>
    <!-- 详情弹窗 -->
    <pay-complex-count-info v-model="showInfo" :data="current" @done="reload" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { EleProTable } from "ele-admin-plus/es";
import type { Columns, Column, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import PayComplexCountSearch from './components/payComplexCount-search.vue';
import PayComplexCountInfo from './components/payComplexCount-info.vue';
import {pagePayComplexCount, pagePayDiamondComplexCount} from '@/api/count/payComplexCount';
import type { PayComplexCount } from '@/api/count/model';
import dayjs from 'dayjs';

// 表格实例
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

// 表格列配置
const columns = ref<Columns>([
  {
    label: 'ID',
    prop: 'id',
    width: 60,
    align: 'center',
    fixed: 'center',
  },

  {
    label: '日期',
    prop: 'daykey',
    //   width: 110,
    align: 'center',
  },
  {
    label: '客户端',
    prop: 'clientType',
    //   width: 110,
    align: 'center',
  },
  {
    label: '充值类型',
    prop: 'type',
    slot: 'type',
    //   width: 110,
    align: 'center',
  },
  {
    label: '总充值',
    prop: 'totalGold',
    //   width: 110,
    align: 'center',
  },
  {
    label: '总充值人数',
    prop: 'totalNum',
    //   width: 110,
    align: 'center',
  },
  {
    label: '总充值次数',
    prop: 'totalTimes',
    //   width: 110,
    align: 'center',
  },
  {
    label: '平均每笔充值金额',
    prop: 'averageTotalGold',
    width: 115,
    formatter: (row) => {
      if (row.totalTimes === 0) {
        return '0.00';
      }
      const result = row.totalGold / row.totalTimes;
      return result.toFixed(2);
    },
    align: 'center',
  },
  {
    label: '首充金额',
    prop: 'firstGold',
    //   width: 110,
    align: 'center',
  },
  {
    label: '首充次数',
    prop: 'firstTimes',
    //   width: 110,
    align: 'center',
  },
  {
    label: '平均每笔首充金额',
    prop: 'averageFirstGold',
    width: 115,
    formatter: (row) => {
      if (row.firstTimes === 0) {
        return '0.00';
      }
      const result = row.firstGold / row.firstTimes;
      return result.toFixed(2);
    },
    align: 'center',
  },
  {
    label: '老用户金额',
    prop: 'oldGold',
    //   width: 110,
    align: 'center',
  },
  {
    label: '老用户数量',
    prop: 'oldNum',
    //   width: 110,
    align: 'center',
  },
  {
    label: '老用户次数',
    prop: 'oldTimes',
    //   width: 110,
    align: 'center',
  },
  {
    label: '老用户平均每笔充值金额',
    prop: 'averageOldGold',
    width: 115,
    formatter: (row) => {
      if (row.oldTimes === 0) {
        return '0.00';
      }
      const result = row.oldGold / row.oldTimes;
      return result.toFixed(2);
    },
    align: 'center',
  },

]);

// 表格选中数据
const selection = ref([]);

// 当前编辑数据
const current = ref<PayComplexCount | null>(null);

// 是否显示编辑弹窗
const showInfo = ref(false);
// 默认搜索条件
const defaultWhere = reactive({
  sortName: "totalResult",
  // type:1,
  clientType: 0,
  payType: 0,
  startDay: dayjs().subtract(7, 'day').format('YYYYMMDD'),
  endDay: dayjs().format('YYYYMMDD'),
});

// 表格数据源
const datasource: DatasourceFunction = ({ pages, limit, where, orders }) => {
  where = { ...defaultWhere, ...where, orderName: orders.order, sortName: orders.sort }
  return pagePayDiamondComplexCount({ ...where, ...pages, limit });
};
/** 表格合计行,  */
const getSummaries = ({ columns, data }) => {
  const sums: string[] = [];
  // const labelIndex = columns[0]?.type === 'selection' ? 2 : 1;
  const labelIndex = 0

  // 初始化总和和次数
  const totalGoldSum = data.reduce((acc, item) => acc + (Number(item.totalGold) || 0), 0);
  const totalTimesSum = data.reduce((acc, item) => acc + (Number(item.totalTimes) || 0), 0);
  const firstGoldSum = data.reduce((acc, item) => acc + (Number(item.firstGold) || 0), 0);
  const firstTimesSum = data.reduce((acc, item) => acc + (Number(item.firstTimes) || 0), 0);
  const oldGoldSum = data.reduce((acc, item) => acc + (Number(item.oldGold) || 0), 0);
  const oldTimesSum = data.reduce((acc, item) => acc + (Number(item.oldTimes) || 0), 0);

  columns.forEach((column: Column, index: number) => {
    if (index === labelIndex) {
      sums[index] = '合计';
    } else if (column.property === 'averageTotalGold') {
      sums[index] = totalTimesSum === 0 ? '0.00' : (totalGoldSum / totalTimesSum).toFixed(2);
    } else if (column.property === 'averageFirstGold') {
      sums[index] = firstTimesSum === 0 ? '0.00' : (firstGoldSum / firstTimesSum).toFixed(2);
    } else if (column.property === 'averageOldGold') {
      sums[index] = oldTimesSum === 0 ? '0.00' : (oldGoldSum / oldTimesSum).toFixed(2);
    } else if (!['id', 'daykey', 'clientType', 'type'].includes(column.property as string)) {
      sums[index] = data
        .map((item: PayComplexCount) => Number(item[column.property as string]))
        .reduce((prev: number, curr: number) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0)
        .toString();
    } else {
      sums[index] = '';
    }
  });
  return sums;
};
/* 搜索 */
const reload = (where?: PayComplexCount) => {
  selection.value = [];
  tableRef?.value?.reload({ page: 1, where });
};

const openInfo = (row?: PayComplexCount) => {
  current.value = row ?? null;
  showInfo.value = true;
};
</script>

<script lang="ts">
export default {
  name: 'pagePayDiamondComplexCount'
};
</script>
