<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <user-parter-record-search ref="searchRef" style="margin-bottom: -14px" @search="reload" :where="defaultWhere" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
        :export-config="{ fileName: '合伙人奖励详情' }" :footer-style="{ paddingBottom: '16px' }" cache-key="parterRecordTable"
        :where="defaultWhere">
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
    </ele-card>
    <user-parter-record-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>

</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { dayjs, ElMessageBox } from "element-plus/es";
import { EleMessage } from "ele-admin-plus/es";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import { PlusOutlined } from "@/components/icons";
import UserParterRecordSearch from "./components/parter-record-search.vue";
import UserParterRecordEdit from "./components/parter-record-edit.vue";
import { pageUserParterRecords, removeUserParterRecord } from "@/api/welfare/parterRecordApi";
import type { UserParterRecord, UserParterRecordParam } from "@/api/welfare/model/parterRecord";


/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof UserParterRecordSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  // {
  //   prop: "id",
  //   label: "id",
  //   width: 60,
  //   align: 'center',
  //   fixed: 'left',
  // },
  {
    prop: "uid",
    label: "用户UID",
    // minWidth: 110,
    fixed: 'left',
    align: 'center',
  },
  // {
  //   prop: "daykey",
  //   label: "时间",
  //  // minWidth: 110,
  //   align: 'center',
  // },
  {
    prop: "totalBet",
    label: "总下注",
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "totalWin",
    label: "总赢取",
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "totalResult",
    label: "净利",
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "layer1",
    label: "一级",
    // minWidth: 110,
    align: 'center',
    children: [
      {
        prop: "layer1",
        label: "UID",
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "layer1Result",
        label: "净利",
        // minWidth: 110,
        align: 'center',
      },
      // {
      //   prop: "layer1Bet",
      //   label: "下注",
      //   // minWidth: 110,
      //   align: 'center',
      // },
    ]
  },
  {
    prop: "layer2",
    label: "二级",
    // minWidth: 110,
    align: 'center',
    children: [
      {
        prop: "layer2",
        label: "UID",
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "layer2Result",
        label: "净利",
        // minWidth: 110,
        align: 'center',
      },
      // {
      //   prop: "layer2Bet",
      //   label: "下注",
      //   // minWidth: 110,
      //   align: 'center',
      // },
    ]
  },
  {
    prop: "layer3",
    label: "三级",
    // minWidth: 110,
    align: 'center',
    children: [
      {
        prop: "layer3",
        label: "UID",
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "layer3Result",
        label: "净利",
        // minWidth: 110,
        align: 'center',
      },
      // {
      //   prop: "layer3Bet",
      //   label: "下注",
      //   // minWidth: 110,
      //   align: 'center',
      // },
    ]
  },
  {
    prop: "daykey",
    label: "记录时间",
    // minWidth: 110,
    align: 'center',
  },
  // {
  //   label: '时间',
  //   prop: 'createTime',
  //   align: 'center',
  //   minWidth: 110
  // },
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
const selections = ref<UserParterRecord[]>([]);

/** 当前编辑数据 */
const current = ref<UserParterRecord | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);

// 默认搜索条件
const defaultWhere = reactive({
  startDay: Number(dayjs().subtract(1, 'day').format('YYYYMMDD')),
  endDay: Number(dayjs().format('YYYYMMDD')),
});
/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageUserParterRecords({
    ...defaultWhere,
    ...where,
    ...orders,
    ...pages
  });
};

/** 搜索 */
const reload = (where?: UserParterRecordParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row?: UserParterRecord) => {
  current.value = row ?? null;
  showEdit.value = true;
};

/** 删除单个 */
const remove = (row: UserParterRecord) => {
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
      removeUserParterRecord(row.id)
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
  return pageUserParterRecords({
    ...where,
    ...orders
  });
};
</script>
