<template>
  <div class="ele-body">
    <el-card :bordered="false">
      <!-- 搜索表单 -->
      <complex-count-search :where="defaultWhere" @search="reload" />
      <!-- 表格 -->
      <ele-pro-table ref="tableRef" :striped="true" :bordered="true" row-key="id" :columns="columns" size="small"
        :headerEllipsis="false" :datasource="datasource" :scroll="{ x: 1000 }" :where="defaultWhere" :pagination="false"
        cache-key="procomplexCount" :show-summary="true" :summary-method="getSummaries">
        <template #dau="{ row }">
          <span style="color:#00a3ff;">{{ row.dau }}</span>
        </template>
        <template #dnu="{ row }">
          <span style="color:#00a3ff;">{{ row.dnu }}</span>
        </template>
        <template #withdrawNum="{ row }">
          <span style="color:#00a3ff;">{{ row.withdrawNum }}</span>
        </template>
        <template #payNum="{ row }">
          <span style="color:#00a3ff;">{{ row.payNum }}</span>
        </template>
        <template #betNum="{ row }">
          <span style="color:#00a3ff;">{{ row.betNum }}</span>
        </template>
        <template #num3="{ row }">
          <span style="color:#00a3ff;">{{ row.num3 }}</span>
        </template>
        <template #num2="{ row }">
          <span style="color:#00a3ff;">{{ row.num2 }}</span>
        </template>
        <template #num7="{ row }">
          <span style="color:#00a3ff;">{{ row.num7 }}</span>
        </template>

        <template #num30="{ row }">
          <span style="color:#00a3ff;">{{ row.num30 }}</span>
        </template>
        <template #arpu="{ row }">
          <span>{{ row.dau ? (row.payAmount / row.dau).toFixed(2) : 0 }}
          </span>
        </template>
        <template #arppu="{ row }">
          <span>
            {{ (row.betNum + row.payNum) ? (row.payAmount / (row.betNum + row.payNum)).toFixed(2) : 0 }}
          </span>
        </template>
      </ele-pro-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { EleProTable } from 'ele-admin-plus/es';
import type { Column, Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
import ComplexCountSearch from './components/complexCount-search.vue';
import { pageComplexCount } from '@/api/count/complexCount';
import type { ComplexCount } from '@/api/count/model';
import dayjs from 'dayjs';
/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof ComplexCountSearch> | null>(null);
// 表格实例
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

// 表格列配置
const columns = ref<Columns>([
  {
    label: '日期',
    prop: 'daykey',
    align: 'center'
  },
  {
    label: '新增人数',
    prop: 'dnu',
    slot: 'dnu',
    align: 'center'
  },
  {
    label: '充值人数',
    prop: 'firstPay',
    align: 'center',
    children: [
      {
        label: '新',
        prop: 'firstPay',
        align: 'center',
        width: 70
      },
      {
        label: '旧',
        prop: 'mutiPay',
        align: 'center',
        width: 70
      },
    ]
  },
  {
    label: '活跃用户',
    prop: 'dau',
    slot: 'dau',
    align: 'center',
  },
  {
    label: '下注人数',
    prop: 'betNum',
    slot: 'betNum',
    align: 'center'
  },
  {
    label: '登陆次数',
    prop: 'loginTimes',
    align: 'center',
    width: 70
  },
  {
    label: '充值',
    prop: 'payNum',
    align: 'center',
    children: [
      {
        label: '人数',
        prop: 'payNum',
        slot: 'payNum',
        align: 'center',
        width: 80
      },
      {
        label: '金额',
        prop: 'payAmount',
        align: 'center'
      },
    ]
  },
  {
    label: '提现',
    prop: 'withdrawNum',
    align: 'center',
    children: [
      {
        label: '人数',
        prop: 'withdrawNum',
        slot: 'withdrawNum',
        align: 'center',
        width: 80
      },
      {
        label: '金额',
        prop: 'withdrawAmount',
        align: 'center',
      },
    ]
  },

  {
    label: '总在线时长(秒)',
    prop: 'totalLineTimeLen',
    align: 'center',
    children: [
      {
        label: '总',
        prop: 'totalLineTimeLen',
        align: 'center',
        width: 70
      },
      {
        label: '平均',
        prop: 'avgLineTimeLen',
        align: 'center',
        width: 70
      },
    ]
  },

  {
    label: '次日',
    prop: 'num2',
    // slot: 'num2',
    align: 'center',
    children: [
      {
        label: '数据',
        prop: 'num2',
        slot: 'num2',
        align: 'center',
        width: 70
      },
      {
        label: '留存',
        prop: 'retention2',
        slot: 'retention2',
        align: 'center',
        width: 70
      },
    ]
  },
  {
    label: '三日',
    prop: 'num3',
    // slot: 'num3',
    align: 'center',
    children: [
      {
        label: '数据',
        prop: 'num3',
        slot: 'num3',
        align: 'center',
        width: 70
      },
      {
        label: '留存',
        prop: 'retention3',
        slot: 'retention3',
        align: 'center',
        width: 70
      },
    ]
  },
  {
    label: '七日',
    prop: 'num7',
    align: 'center',
    children: [
      {
        label: '数据',
        prop: 'num7',
        slot: 'num7',
        align: 'center',
        width: 70
      },
      {
        label: '留存',
        prop: 'retention7',
        slot: 'retention7',
        align: 'center',
        width: 70
      },
    ]
  },
  {
    label: '30日',
    prop: 'num30',
    slot: 'num30',
    align: 'center',
    children: [
      {
        label: '数据',
        prop: 'num30',
        slot: 'num30',
        align: 'center',
        width: 70
      },
      {
        label: '留存',
        prop: 'retention30',
        slot: 'retention30',
        align: 'center',
        width: 70
      },
    ]
  },
  {
    label: '新增',
    prop: 'arpu',
    align: 'center',
    children: [
      {
        label: 'arpu',
        prop: 'arpu',
        slot: 'arpu',
        align: 'center',
        width: 70
      },
      {
        label: 'arppu',
        prop: 'arppu',
        slot: 'arppu',
        align: 'center',
        width: 70
      },
    ]
  },
]);
// 表格选中数据
const selection = ref([]);

// 默认搜索条件
const defaultWhere = reactive({
  type: 0,
  sortName: 'totalResult',
  startDay: dayjs().subtract(1, 'month').format('YYYYMMDD'),
  endDay: dayjs().format('YYYYMMDD')
});

// 表格数据源
const datasource: DatasourceFunction = ({ where, orders, pages }) => {
  where = { ...defaultWhere, ...where, orderName: orders.order, sortName: orders.sort, };
  return pageComplexCount({ ...where });
};

/* 搜索 */
const reload = (where?: ComplexCount) => {
  selection.value = [];
  tableRef?.value?.reload({ page: 1, where });
};
const getNum = (str: string) => parseFloat(str.replace('%', ''));
/** 表格合计行,  */
const getSummaries = ({ columns, data }) => {
  const sums: string[] = [];
  const labelIndex = 0;
  const retention2Sum = data.reduce((acc, item) => acc + (getNum(item.retention2) || 0), 0);
  const retention3Sum = data.reduce((acc, item) => acc + (getNum(item.retention3) || 0), 0);
  const retention7Sum = data.reduce((acc, item) => acc + (getNum(item.retention7) || 0), 0);
  const retention30Sum = data.reduce((acc, item) => acc + (getNum(item.retention30) || 0), 0);
  columns.forEach((column: Column, index: number) => {
    if (index === labelIndex) {
      sums[index] = '合计';
    } else if (column.property === 'retention2') {
      sums[index] = retention2Sum + '%';
    } else if (column.property === 'retention3') {
      sums[index] = retention3Sum + '%';
    } else if (column.property === 'retention7') {
      sums[index] = retention7Sum + '%';
    } else if (column.property === 'retention30') {
      sums[index] = retention30Sum + '%';
    } else if (!['uid', 'daykey'].includes(column.property as string)) {
      sums[index] = data
        .map((item: ComplexCount) => Number(item[column.property as string]))
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
</script>

<script lang="ts">
export default {
  name: 'ComplexCount'
};
</script>
<style lang="css">
.summary-retention-blue {
  color: #00a3ff !important;
  font-weight: normal;
}
</style>
