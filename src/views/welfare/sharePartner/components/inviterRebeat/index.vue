<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <user-inviter-rebeat-search ref="searchRef" style="margin-bottom: -14px" @search="reload" :where="defaultWhere" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
        :export-config="{ fileName: '分享流水奖励' }" :footer-style="{ paddingBottom: '16px' }" cache-key="inviterRebeatTable"
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
    <user-inviter-rebeat-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>

</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { dayjs, ElMessageBox } from "element-plus/es";
import { EleMessage } from "ele-admin-plus/es";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
// import { PlusOutlined } from "@/components/icons";
import UserInviterRebeatSearch from "./components/inviter-rebeat-search.vue";
import UserInviterRebeatEdit from "./components/inviter-rebeat-edit.vue";
import { pageUserInviterRebeats, removeUserInviterRebeat } from "@/api/welfare/inviterRebeatApi";
import type { UserInviterRebeat, UserInviterRebeatParam } from "@/api/welfare/model/inviterRebeat";


/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof UserInviterRebeatSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  // {
  //   prop: "id",
  //   label: "ID",
  //   // width: 60,
  //   align: 'center',
  //   fixed: 'left',
  // },
  {
    prop: "uid",
    label: "用户ID",
    minWidth: 110,
    align: 'center',
  },
  // {
  //   prop: "ukey",
  //   label: "ukey",
  //   minWidth: 110,
  //   align: 'center',
  // },
  // {
  //   prop: "daykey",
  //   label: "daykey",
  //   minWidth: 110,
  //   align: 'center',
  // },
  {
    prop: "totalBet",
    label: "总下注",
    minWidth: 110,
    align: 'center',
  },
  {
    prop: "totalNum",
    label: "返利人数",
    minWidth: 110,
    align: 'center',
  },
  {
    prop: "amount",
    label: "总金额",
    minWidth: 110,
    align: 'center',
  },
  {
    prop: "send",
    label: "是否发送",
    minWidth: 110,
    align: 'center',
    formatter: (row) => {
      return row.send ? "是" : "否";
    },
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
const selections = ref<UserInviterRebeat[]>([]);

/** 当前编辑数据 */
const current = ref<UserInviterRebeat | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);

// 默认搜索条件
const defaultWhere = reactive({
  startDay: Number(dayjs().subtract(1, 'day').format('YYYYMMDD')),
  endDay: Number(dayjs().format('YYYYMMDD')),
});

/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageUserInviterRebeats({
    ...defaultWhere,
    ...where,
    ...orders,
    ...pages
  });
};

/** 搜索 */
const reload = (where?: UserInviterRebeatParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row?: UserInviterRebeat) => {
  current.value = row ?? null;
  showEdit.value = true;
};

/** 删除单个 */
const remove = (row: UserInviterRebeat) => {
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
      removeUserInviterRebeat(row.id)
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
  return pageUserInviterRebeats({
    ...where,
    ...orders
  });
};
</script>
