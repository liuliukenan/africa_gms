<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <parter-apply-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
        :export-config="{ fileName: '合伙人申请', datasource: exportSource }" :print-config="{ datasource: exportSource }"
        :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
        <!-- <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()">
            新建
          </el-button>
        </template> -->
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)" v-if="!row.status">
            审核
          </el-link>
          <!-- <el-divider direction="vertical"/>
                    <el-link type="danger" :underline="false" @click="remove(row)">
                        删除
                    </el-link> -->
        </template>
      </ele-pro-table>
    </ele-card>
    <parter-apply-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>

</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessageBox } from "element-plus/es";
import { EleMessage } from "ele-admin-plus/es";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import { PlusOutlined } from "@/components/icons";
import ParterApplySearch from "./components/parter-apply-search.vue";
import ParterApplyEdit from "./components/parter-apply-edit.vue";
import { pageParterApplys } from "@/api/welfare/parterApplyApi";
import type { ParterApply, ParterApplyParam } from "@/api/welfare/model/parterApply";


/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof ParterApplySearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  // {
  //   prop: "id",
  //   label: "id",
  //   width: 60,
  //   align: 'left',
  //   fixed: 'left',
  // },
  {
    prop: "uid",
    label: "UID",
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "whatapp",
    label: "WhatApp",
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "phone",
    label: "电话",
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "status",
    label: "状态",
    minWidth: 110,
    formatter: (row) => {
      return row.status == 2 ? '同意' : (row.status == 1 ? "拒绝" : '待处理');
    },
    align: 'left',
  },
  {
    label: '时间',
    prop: 'createTime',
    align: 'left',
    minWidth: 110
  },
  {
    columnKey: "action",
    label: "操作",
    width: 200,
    align: "center",
    slot: "action",
    hideInPrint: true,
    hideInExport: true
  }
]);

/** 表格选中数据 */
const selections = ref<ParterApply[]>([]);

/** 当前编辑数据 */
const current = ref<ParterApply | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);


/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageParterApplys({
    ...where,
    ...orders,
    ...pages
  });
};

/** 搜索 */
const reload = (where?: ParterApplyParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row?: ParterApply) => {
  current.value = row ?? null;
  showEdit.value = true;
};

/** 删除单个 */
// const remove = (row: ParterApply) => {
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
//       removeParterApply(row.id)
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
  return pageParterApplys({
    ...where,
    ...orders
  });
};
</script>
