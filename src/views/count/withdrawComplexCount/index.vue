<template>
  <div class="ele-body">
    <el-card :bordered="false">
      <!-- 搜索表单 -->
      <withdraw-complex-count-search :where="defaultWhere" @search="reload" />
      <!-- 表格 -->
      <ele-pro-table ref="tableRef" :striped="true" :bordered="true" row-key="id" :columns="columns"   :headerEllipsis="false" 
        :show-summary="true" :summary-method="getSummaries" :datasource="datasource" :scroll="{ x: 1000 }"
        :where="defaultWhere" cache-key="prowithdrawComplexCount">
        <!-- <template #toolbar>
          <el-popconfirm title="确定导出所有数据？" @confirm="doExcelExport()"  width="250px">
            <template #reference>
              <el-button type="warning"   :icon="UploadOutlined">导出</el-button>
            </template>
</el-popconfirm>
</template> -->
        <template #createTime="{ row }">
          <div style="font-size: 12px">{{ row.createTime }}</div>
          <div style="font-size: 12px">{{ row.updateTime }}</div>
        </template>
        <template #type="{ row }">
          <div v-if="row.type == 0">all</div>
          <div v-else-if="row.type == 1">银行</div>
          <div v-else-if="row.type == 10">转帐</div>
          <div v-else-if="row.type == 100">USDT</div>
        </template>
      </ele-pro-table>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, h } from 'vue';
import { EleProTable } from 'ele-admin-plus/es';
import type { Columns, Column, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
import WithdrawComplexCountSearch from './components/withdrawComplexCountSearch.vue';
import { pageWithdrawCount } from '@/api/count/withdrawComplexCount';
import type { WithdrawCount } from '@/api/count/model';
import { UploadOutlined } from '@/components/icons';
import dayjs from 'dayjs';
import { formatNumber } from '@/utils/common';
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
    label: '客户端类型',
    prop: 'clientType',
    //   width: 110,
    align: 'center',
  },
  {
    label: '提现类型',
    prop: 'type',
    slot: 'type',
    //   width: 110,
    align: 'center',
  },
  {
    label: '总提现金额',
    prop: 'totalGold',
    //   width: 110,
    align: 'center',
  },
  {
    label: '总提现人数',
    prop: 'totalNum',
    //   width: 110,
    align: 'center',
  },
  {
    label: '总提现次数',
    prop: 'totalTimes',
    //   width: 110,
    align: 'center',
  },
  {
    label: '平均每笔提现金额',
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
    label: '首提金额',
    prop: 'firstGold',
    //   width: 110,
    align: 'center',
  },
  {
    label: '首提次数',
    prop: 'firstTimes',
    //   width: 110,
    align: 'center',
  },
  {
    label: '平均每笔首提金额',
    prop: 'averageFirstGold',
    width: 115,
    formatter: (row) => {
      if (row.totalTimes === 0) {
        return '0.00'; 
      }
      const result = row.firstGold / row.totalTimes;
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
    label: '老用户平均每笔提现金额',
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
const current = ref<WithdrawCount | null>(null);

// 是否显示编辑弹窗
const showEdit = ref(false);

// 默认搜索条件
const defaultWhere = reactive({
  startDay: dayjs().subtract(30, 'day').format('YYYYMMDD'),
  endDay: dayjs().format('YYYYMMDD'),
  clientType: 0,
  payType: 0,
});

// 表格数据源
const datasource: DatasourceFunction = ({ page, limit, where, orders }) => {
  return pageWithdrawCount({ ...where, ...orders, limit, page, });
};

/* 搜索 */
const reload = (where?: any) => {
  selection.value = [];
  tableRef?.value?.reload({ page: 1, where });
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
      const total = data.reduce((prev: number, curr: WithdrawCount) => {
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
// /* 删除单个 */
// const remove = (row) => {
//   const hide = messageLoading('请求中..', 0);
//   removeWithdrawComplexCount(row.id)
//     .then((msg) => {
//       hide();
//       message.success(msg);
//       reload();
//     })
//     .catch((e) => {
//       hide();
//       message.error(e.message);
//     });
// };
// 导出
const doExcelExport = () => {
  // exportPayWithdraw(searchRef.value!.searchParams()).then((res) => {
  //   handleDownload('邮件记录', res.data as any);
  // });
};
</script>

<script lang="ts">
export default {
  name: 'WithdrawComplexCount'
};
</script>