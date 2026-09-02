<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <user-parter-count-search ref="searchRef" style="margin-bottom: -14px" @search="reload" :where="defaultWhere" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
        :export-config="{ fileName: '合伙人奖励报告' }" :footer-style="{ paddingBottom: '16px' }" cache-key="parterCountTable"
        :where="defaultWhere" size="small">
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
    <user-parter-count-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>

</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { dayjs, ElMessageBox } from "element-plus/es";
import { EleMessage } from "ele-admin-plus/es";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
// import { PlusOutlined } from "@/components/icons";
import UserParterCountSearch from "./components/parter-count-search.vue";
import UserParterCountEdit from "./components/parter-count-edit.vue";
import { pageUserParterCounts, removeUserParterCount } from "@/api/welfare/parterCountApi";
import type { UserParterCount, UserParterCountParam } from "@/api/welfare/model/parterCount";


/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof UserParterCountSearch> | null>(null);

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
    label: "UID",
    minWidth: 80,
    align: 'center',
    fixed: 'left',
  },
  {
    prop: "level",
    label: "合伙人等级",
    //minWidth: 110,
    align: 'center',
  },
  {
    prop: "awardAmount",
    label: "奖励金额",
    //minWidth: 110,
    align: 'center',
  },
  {
    prop: "status",
    label: "状态",
    //minWidth: 110,
    formatter: (row) => {
      return row.status === 0 ? '待发放' : (row.status === 1 ? "冲正" : "已发放");
    },
    align: 'center',
  },
  {
    prop: "layer1Num",
    label: "一级",
    //minWidth: 110,
    align: 'center',
    children: [
      {
        prop: "layer1Num",
        label: "人数",
        //minWidth: 110,
        align: 'center',
      },
      {
        prop: "layer1Result",
        label: "净利",
        //minWidth: 110,
        align: 'center',
      },
      {
        prop: "layer1Bet",
        label: "下注",
        //minWidth: 110,
        align: 'center',
      },
    ]
  },

  {
    prop: "layer2Num",
    label: "二级",
    //minWidth: 110,
    align: 'center',
    children: [
      {
        prop: "layer2Num",
        label: "人数",
        //minWidth: 110,
        align: 'center',
      },
      {
        prop: "layer2Result",
        label: "净利",
        //minWidth: 110,
        align: 'center',
      },
      {
        prop: "layer2Bet",
        label: "下注",
        //minWidth: 110,
        align: 'center',
      },
    ]
  },
  {
    prop: "layer3Num",
    label: "三级",
    //minWidth: 110,
    align: 'center',
    children: [
      {
        prop: "layer3Num",
        label: "人数",
        //minWidth: 110,
        align: 'center',
      },
      {
        prop: "layer3Result",
        label: "净利",
        //minWidth: 110,
        align: 'center',
      },
      {
        prop: "layer3Bet",
        label: "下注",
        //minWidth: 110,
        align: 'center',
      },
    ]
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
const selections = ref<UserParterCount[]>([]);

/** 当前编辑数据 */
const current = ref<UserParterCount | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);
// 默认搜索条件
const defaultWhere = reactive({
  startDay: Number(dayjs().subtract(1, 'day').format('YYYYMMDD')),
  endDay: Number(dayjs().format('YYYYMMDD')),
});

/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageUserParterCounts({
    ...defaultWhere,
    ...where,
    ...orders,
    ...pages
  });
};

/** 搜索 */
const reload = (where?: UserParterCountParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row?: UserParterCount) => {
  current.value = row ?? null;
  showEdit.value = true;
};

/** 删除单个 */
const remove = (row: UserParterCount) => {
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
      removeUserParterCount(row.id)
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
  return pageUserParterCounts({
    ...where,
    ...orders
  });
};
</script>
