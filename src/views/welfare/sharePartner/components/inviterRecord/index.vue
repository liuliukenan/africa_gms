<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <user-inviter-record-search ref="searchRef" style="margin-bottom: -14px" @search="reload" :where="defaultWhere" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
        :export-config="{ fileName: '分享奖励表' }" :footer-style="{ paddingBottom: '16px' }" cache-key="inviterRecordTable"
        :where="defaultWhere">
        <!-- <template #toolbar>
                    <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()">
                        新建
                    </el-button>
                </template> -->
        <!-- <template #action="{ row }">
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
    <user-inviter-record-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>

</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { dayjs, ElMessageBox } from "element-plus/es";
// import { EleMessage } from "ele-admin-plus/es";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
// import { PlusOutlined } from "@/components/icons";
import UserInviterRecordSearch from "./components/inviter-record-search.vue";
import UserInviterRecordEdit from "./components/inviter-record-edit.vue";
import { pageUserInviterRecords, removeUserInviterRecord } from "@/api/welfare/inviterRecordApi";
import type { UserInviterRecord, UserInviterRecordParam } from "@/api/welfare/model/inviterRecord";


/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof UserInviterRecordSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([

  {
    prop: "uid",
    label: "被邀请人用户ID",
    align: 'center',
    fixed: 'left',
  },
  {
    prop: "inviteeAmount",
    label: "被邀请者奖励金额",
    //minWidth: 110,
    align: 'center',
  },
  {
    prop: "layer1",
    label: "邀请人用户ID",
    //minWidth: 110,
    align: 'center',
  },
  {
    prop: "inviterAmount",
    label: "邀请者奖励金额",
    //minWidth: 110,
    align: 'center',
  },
  // {
  //   label: '合伙人等级',
  //   prop: 'parterLevel',
  //   align: 'center',
  //   // minWidth: 110
  // },
  {
    prop: "payAmount",
    label: "充值金额",
    //minWidth: 110,
    align: 'center',
  },
  {
    label: '等级',
    prop: 'layer1Level',
    align: 'center',
    // width: 70
  },
  // {
  //   prop: "layer2",
  //   label: "二级",
  //   //minWidth: 110,
  //   align: 'center',
  //   children: [
  //     {
  //       prop: "layer2",
  //       label: "用户ID",
  //       //minWidth: 110,
  //       align: 'center',
  //     },
  //     {
  //       label: '等级',
  //       prop: 'layer2Level',
  //       align: 'center',
  //       // minWidth: 110
  //     },
  //   ]
  // },
  // {
  //   prop: "layer3",
  //   label: "三级",
  //   //minWidth: 110,
  //   align: 'center',
  //   children: [
  //     {
  //       prop: "layer3",
  //       label: "用户ID",
  //       //minWidth: 110,
  //       align: 'center',
  //     },
  //     {
  //       label: '等级',
  //       prop: 'layer3Level',
  //       align: 'center',
  //       // minWidth: 110
  //     },
  //   ]
  // },
  {
    prop: "regTime",
    label: "注册时间",
    //minWidth: 110,
    align: 'center',
  },
]);

/** 表格选中数据 */
const selections = ref<UserInviterRecord[]>([]);

/** 当前编辑数据 */
const current = ref<UserInviterRecord | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);
// 默认搜索条件
const defaultWhere = reactive({
  startDay: Number(dayjs().subtract(1, 'day').format('YYYYMMDD')),
  endDay: Number(dayjs().format('YYYYMMDD')),
});

/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageUserInviterRecords({
    ...defaultWhere,
    ...where,
    ...orders,
    ...pages
  });
};

/** 搜索 */
const reload = (where?: UserInviterRecordParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row?: UserInviterRecord) => {
  current.value = row ?? null;
  showEdit.value = true;
};

/** 删除单个 */
// const remove = (row: UserInviterRecord) => {
//   ElMessageBox.confirm(
//     '确定要删除“' + row.id + '”吗?',
//     '系统提示',
//     { type: 'warning', draggable: true }
//   )
//     .then(() => {
//       const loading = EleMessage.loading({
//         message: '请求中..',
//         plain: true
//       });
//       removeUserInviterRecord(row.id)
//         .then((msg) => {
//           loading.close();
//           EleMessage.success(msg);
//           reload();
//         })
//         .catch((e) => {
//           loading.close();
//           EleMessage.error(e.message);
//         });
//     })
//     .catch(() => {
//     });
// };


/** 导出和打印全部数据的数据源 */
const exportSource: DatasourceFunction = ({ where, orders }) => {
  return pageUserInviterRecords({
    ...where,
    ...orders
  });
};
</script>
