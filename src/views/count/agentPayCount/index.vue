<template>
    <ele-page>
        <ele-card :body-style="{ paddingTop: '8px' }">
            <agent-pay-count-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
            <ele-pro-table
                    ref="tableRef"
                    row-key="id"
                    :columns="columns"
                    :datasource="datasource"
                    :show-overflow-tooltip="true"
                    :border="true"

                    v-model:selections="selections"
                    :highlight-current-row="true"
                    :footer-style="{ paddingBottom: '16px' }"
                    cache-key="systemUserTable"
            >
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
        <agent-pay-count-edit :data="current" v-model="showEdit" @done="reload" />
    </ele-page>

</template>

<script lang="ts" setup>
import { ref } from "vue";
// import { ElMessageBox } from "element-plus/es";
// import { EleMessage } from "ele-admin-plus/es";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
// import { PlusOutlined } from "@/components/icons";
import AgentPayCountSearch from "./components/agent-pay-count-search.vue";
import AgentPayCountEdit from "./components/agent-pay-count-edit.vue";
import { pageAgentPayCounts } from "@/api/count/agentPayCountApi";
import type { AgentPayCount, AgentPayCountParam } from "@/api/count/model/agentPayCount";


/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof AgentPayCountSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  {
    prop: "id",
    label: "主键",
    width: 60,
    align: 'left',
    fixed: 'left',
  },
  {
    prop: "ukey",
    label: "代理id",
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "daykey",
    label: "日期",
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "fromType",
    label: "发送类型",
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "toType",
    label: "接收类型",
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "goldAmount",
    label: "金币金额",
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "goldTimes",
    label: "金币次数",
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "diamondAmount",
    label: "钻石金额",
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "diamondTimes",
    label: "钻石次数",
    minWidth: 110,
    align: 'left',
  },
   {
      label: '时间',
      prop: 'createTime',
      align: 'left',
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
const selections = ref<AgentPayCount[]>([]);

/** 当前编辑数据 */
const current = ref<AgentPayCount | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);


/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageAgentPayCounts({
    ...where,
    ...orders,
    ...pages
  });
};

/** 搜索 */
const reload = (where?: AgentPayCountParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
// const openEdit = (row?: AgentPayCount) => {
//   current.value = row ?? null;
//   showEdit.value = true;
// };

/** 删除单个 */
// const remove = (row: AgentPayCount) => {
//   ElMessageBox.confirm(
//     '确定要删除“' + row.id + '”吗?',
//     '系统提示',
//     {type: 'warning', draggable: true}
//   )
//     .then(() => {
//       const loading = EleMessage.loading({
//         message: '请求中..',
//         plain: true
//       });
//       removeAgentPayCount(row.id)
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
const exportSource: DatasourceFunction = ({where, orders}) => {
  return pageAgentPayCounts({
    ...where,
    ...orders
  });
};
</script>
