<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <!-- <export-task-search ref="searchRef" style="margin-bottom: -14px" @search="reload" /> -->
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
        :export-config="{ fileName: '导出任务', datasource: exportSource }" :print-config="{ datasource: exportSource }"
        :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
        <!-- <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()">
            新建
          </el-button>
        </template> -->
        <template #status="{ row }">
          <el-tag v-if="row.status == '0'" type="info">PROCESSING</el-tag>
          <el-tag v-else-if="row.status == '1'" type="success">SUCCESS</el-tag>
          <el-tag v-else type="danger">FAILED</el-tag>
        </template>
        <template #action="{ row }">
          <!-- <el-link type="primary" :underline="false" @click="openEdit(row)">
            修改
          </el-link>
          <el-divider direction="vertical" /> -->
          <el-popconfirm title="确认导出表格数据吗？" @confirm="openExport(row)">
            <template #reference>
              <el-link type="primary" class="ele-btn-icon">下载</el-link>
            </template>
          </el-popconfirm>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)">
            删除
          </el-link>

        </template>
      </ele-pro-table>
    </ele-card>
    <export-task-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>

</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessageBox } from "element-plus/es";
import { EleMessage } from "ele-admin-plus/es";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import ExportTaskSearch from "./components/export-task-search.vue";
import ExportTaskEdit from "./components/export-task-edit.vue";
import { pageExportTasks, removeExportTask, exportTask } from "@/api/platform/exportTaskApi";
import type { ExportTask, ExportTaskParam } from "@/api/platform/model/exportTask";
import { toDateString } from "@/utils/utils";
import { handleDownload } from "@/utils/file-util";


/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof ExportTaskSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  {
    prop: "taskId",
    label: "任务ID",
    // width: 60,
    align: 'left',
    fixed: 'left',
  },
  {
    prop: "status",
    label: "任务状态",
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "message",
    label: "错误消息",
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "downloadUrl",
    label: "下载地址",
    minWidth: 110,
    align: 'left',
  },
  {
    label: '时间',
    prop: 'createTime',
    formatter: (row) => toDateString(row.createTime),
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
const selections = ref<ExportTask[]>([]);

/** 当前编辑数据 */
const current = ref<ExportTask | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);

/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageExportTasks({
    ...where,
    ...orders,
    ...pages
  });
};

/** 搜索 */
const reload = (where?: ExportTaskParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
// const openEdit = (row?: ExportTask) => {
//   current.value = row ?? null;
//   showEdit.value = true;
// };

/** 导出 */
const openExport = (row: ExportTask) => {
  if (!row.taskId) {
    EleMessage.error("任务ID不能为空");
    return;
  }
  exportTask(row.taskId)
    .then((res) => {
      handleDownload(row.taskId || '', res.data as any);
    })
    .catch((e) => {
      EleMessage.error(e.message);
    });
};

/** 删除单个 */
const remove = (row: ExportTask) => {
  if (!row.taskId) {
    EleMessage.error("任务ID不能为空");
    return;
  }
  ElMessageBox.confirm(
    '确定要删除“' + row.taskId + '”吗?',
    '系统提示',
    { type: 'warning', draggable: true }
  )
    .then(() => {
      const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
      });
      removeExportTask(row.taskId)
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
  return pageExportTasks({
    ...where,
    ...orders
  });
};
</script>
