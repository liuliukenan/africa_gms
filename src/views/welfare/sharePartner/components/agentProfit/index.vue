<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <agent-profit-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
        :export-config="{ fileName: '合伙人利润表', datasource: exportSource }" :print-config="{ datasource: exportSource }"
        :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable" :show-summary="showSummary"
        :summary-method="getSummaries">
        <!-- <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()">
            新建
          </el-button>
        </template> -->
        <template #status="{ row }">
          <div>{{ resultFn(row) > 0 ? (row.status ? '已发放' : '待发放') : '负利润' }}</div>
        </template>
        <template #result="{ row }">
          <div>{{ resultFn(row) }}</div>
        </template>
        <template #action="{ row }">
          <!-- 正利润并且待发放时显示 -->
          <el-link type="primary" :underline="false" v-if="resultFn(row) > 0 && row.status == 0" @click="openEdit(row)">
            发放
          </el-link>
          <!-- <el-divider direction="vertical" /> -->
          <!-- <el-link type="danger" :underline="false" @click="remove(row)">
            删除
          </el-link> -->
        </template>
      </ele-pro-table>
    </ele-card>
    <agent-profit-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>

</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Column, dayjs, ElMessageBox } from "element-plus/es";
import { EleMessage } from "ele-admin-plus/es";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
// import { PlusOutlined } from "@/components/icons";
import AgentProfitSearch from "./components/agent-profit-search.vue";
import AgentProfitEdit from "./components/agent-profit-edit.vue";
import { pageAgentProfits, admitAgentProfit } from "@/api/welfare/agentProfitApi";
import type { AgentProfit, AgentProfitParam } from "@/api/welfare/model/agentProfit";
import { formatNumber } from '@/utils/common';


/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof AgentProfitSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  {
    prop: "daykey",
    label: "日期",
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "uid",
    label: "用户ID",
    minWidth: 110,
    align: 'left',
  },
  // {
  //   prop: "payTimes",
  //   label: "充值次数",
  //   minWidth: 110,
  //   align: 'left',
  // },
  {
    prop: "payNums",
    label: "充值人数",
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "payAmount",
    label: "总充值金额",
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "withdrawNums",
    label: "提现人数",
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "withdrawAmount",
    label: "总提现金额",
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "lastDayProfit",
    label: "上一日净利",
    minWidth: 110,
    align: 'left',
  },

  {
    label: '返利比例',
    prop: 'rate',
    align: 'left',
  },
  {
    prop: "result",
    slot: "result",
    label: "当日净利润",//总利润：所有正数相加，已发放利润：所有已发放正数相加
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "status",
    slot: "status",
    label: "发放状态",
    minWidth: 110,
    align: 'left',
  },
  {
    label: '时间',
    prop: 'createTime',
    align: 'left',
    minWidth: 110
  },
  {
    prop: "action",
    columnKey: "action",
    label: "操作",
    // width: 200,
    align: "center",
    slot: "action",
    hideInPrint: true,
    hideInExport: true
  }
]);

const resultFn = (row) => {
  return (row.payAmount + row.lastDayProfit - row.withdrawAmount) * row.rate || 0
}
/** 表格选中数据 */
const selections = ref<AgentProfit[]>([]);

/** 当前编辑数据 */
const current = ref<AgentProfit | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);
const showSummary = ref(true);

/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageAgentProfits({
    startDay: dayjs().subtract(7, 'day').format('YYYYMMDD'),
    endDay: dayjs().format('YYYYMMDD'),
    ...where,
    ...orders,
    ...pages
  });
};

/** 搜索 */
const reload = (where?: AgentProfitParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row: AgentProfit) => {
  // current.value = row ?? null;
  // showEdit.value = true;
  ElMessageBox.confirm(
    '确定要发放“' + row.uid + '”吗?',
    '系统提示',
    { type: 'success', draggable: true }
  )
    .then(() => {
      const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
      });
      admitAgentProfit(row.id)
        .then((msg) => {
          loading.close();
          EleMessage.success(msg);
          reload();
        })
        .catch((e) => {
          loading.close();
          EleMessage.error(e.message);
        });
    })
    .catch(() => {
    });
};
/** 表格合计行,  */
const getSummaries = ({ columns, data }) => {
  const sums: string[] = [];
  const labelIndex = 0;
  // 定义需要排除的字段
  const excludeFields = ['uid', 'daykey', 'action', 'lastDayProfit', 'status', 'createTime', 'rate'];

  columns.forEach((column: Column, index: number) => {
    if (index === labelIndex) {
      sums[index] = '合计';
    } else if (column.property === 'result') {
      // 特殊处理 result 利润列
      // 总利润：所有正数相加
      const totalProfit = data
        .map((item: AgentProfit) => resultFn(item))
        .filter(value => value > 0)
        .reduce((prev, curr) => prev + curr, 0);

      // 已发放利润：状态为"已发放"(status=1)且利润为正的项相加
      const issuedProfit = data
        .filter((item: AgentProfit) => item.status === 1 && resultFn(item) > 0)
        .reduce((prev, curr: AgentProfit) => prev + resultFn(curr), 0);

      sums[index] = `总利润：${formatNumber(totalProfit)} |  已发放利润：${formatNumber(issuedProfit)}`;
    } else if (!excludeFields.includes(column.property as string)) {
      // 原有逻辑处理其他数值列
      const total = data.reduce((prev: number, curr: AgentProfit) => {
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
/** 删除单个 */
const remove = (row: AgentProfit) => {
  ElMessageBox.confirm(
    '确定要删除“' + row.id + '”吗?',
    '系统提示',
    { type: 'warning', draggable: true }
  )
    .then(() => {
      const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
      });
      admitAgentProfit(row.id)
        .then((msg) => {
          loading.close();
          EleMessage.success(msg);
          reload();
        })
        .catch((e) => {
          loading.close();
          EleMessage.error(e.message);
        });
    })
    .catch(() => {
    });
};


/** 导出和打印全部数据的数据源 */
const exportSource: DatasourceFunction = ({ where, orders }) => {
  return pageAgentProfits({
    ...where,
    ...orders
  });
};
</script>
