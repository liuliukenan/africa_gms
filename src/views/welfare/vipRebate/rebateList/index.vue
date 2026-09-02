<template>
  <ele-page>
    <!-- <ele-card :body-style="{ paddingTop: '8px' }"> -->
    <rebateList-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
    <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true"
      :border="true" v-model:selections="selections" :highlight-current-row="true"
      :export-config="{ fileName: '返利记录', datasource: exportSource }" :print-config="{ datasource: exportSource }"
      :footer-style="{ paddingBottom: '16px' }" cache-key="rebateTable" :show-summary="showSummary"
      :summary-method="getSummaries" :where="defaultWhere">
      <!-- <template #toolbar>
                    <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()">
                        新建
                    </el-button>
                </template>
<template #action="{ row }">
                    <el-link type="primary" :underline="false" @click="openEdit(row)">
                        修改
                    </el-link>
                    <el-divider direction="vertical"/>
                    <el-link type="danger" :underline="false" @click="remove(row)">
                        删除
                    </el-link>
                </template> -->
    </ele-pro-table>
    <!-- </ele-card> -->
    <rebateList-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>

</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Column, dayjs, ElMessageBox } from "element-plus/es";
import { EleMessage } from "ele-admin-plus/es";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
// import { PlusOutlined } from "@/components/icons";
import RebateListSearch from "./components/rebateList-search.vue";
import RebateListEdit from "./components/rebateList-edit.vue";
import { pageRebateLists, removeRebateList } from "@/api/welfare/rebateListApi";
import type { RebateList, RebateListParam } from "@/api/welfare/model/rebateList";
import { formatNumber } from '@/utils/common';


/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof RebateListSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  {
    prop: "uid",
    label: "用户Id",
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "totalBet",
    label: "总下注",
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "slotsBet",
    label: "slots下注",
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "cardsBet",
    label: "cards下注",
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "fishBet",
    label: "捕鱼下注",
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "liveBet",
    label: "真人下注",
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "sportsBet",
    label: "体育下注",
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "lotteryBet",
    label: "彩票下注",
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "otherBet",
    label: "其它下注",
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "rebateAmount",
    label: "返利金额",
    minWidth: 90,
    align: 'center',
  },
  {
    label: '时间',
    prop: 'createTime',
    align: 'center',
    minWidth: 110
  },
  // {
  //   columnKey: "action",
  //   label: "操作",
  //   width: 200,
  //   align: "center",
  //   slot: "action",
  //   hideInPrint: true,
  //   hideInExport: true
  // }
]);

/** 表格选中数据 */
const selections = ref<RebateList[]>([]);

/** 当前编辑数据 */
const current = ref<RebateList | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);
  // 默认搜索条件
  const defaultWhere = reactive({
    startDay: Number(dayjs().subtract(1, 'day').format('YYYYMMDD')),
    endDay: Number(dayjs().format('YYYYMMDD')),
  });
  const showSummary = ref(false);

/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageRebateLists({
    ...defaultWhere,
    ...where,
    ...orders,
    ...pages
  });
};

/** 搜索 */
const reload = (where?: RebateListParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row?: RebateList) => {
  current.value = row ?? null;
  showEdit.value = true;
};

/** 删除单个 */
const remove = (row: RebateList) => {
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
      removeRebateList(row.id)
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
  return pageRebateLists({
    ...where,
    ...orders
  });
};
/** 表格合计行,  */
const getSummaries = ({ columns, data }) => {
  const sums: string[] = [];
  const labelIndex = 0;

  columns.forEach((column: Column, index: number) => {
    if (index === labelIndex) {
      sums[index] = '合计';
    } else if (!['uid', 'createTime'].includes(column.property as string)) {
      const total = data.reduce((prev: number, curr: RebateList) => {
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
