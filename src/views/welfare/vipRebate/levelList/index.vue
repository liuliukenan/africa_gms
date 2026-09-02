<template>
  <ele-page>
    <!-- <ele-card :body-style="{ paddingTop: '8px' }"> -->
    <!-- <vip-rebate-search ref="searchRef" style="margin-bottom: -14px" @search="reload" /> -->
    <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true"
      :border="true" v-model:selections="selections" :highlight-current-row="true"
      :export-config="{ fileName: 'VIP返利配置', datasource: exportSource }" :print-config="{ datasource: exportSource }"
      :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable" :pagination="false">
      <template #toolbar>
        <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()">
          新建
        </el-button>
        <el-popconfirm title="确定导出Excel数据？" @confirm="doExcelExport()">
          <template #reference>
            <el-button type="warning">导出Excel</el-button>
          </template>
        </el-popconfirm>
        <el-button type="success" class="ele-btn-icon" @click="openImport">
          <span>导入Excel</span>
        </el-button>
        <el-popconfirm title="确定要发送到服务器吗？" @confirm="sendServer()">
          <template #reference>
            <el-button type="danger">发送服务器</el-button>
          </template>
        </el-popconfirm>
      </template>
      <template #action="{ row }">
        <el-link type="primary" :underline="false" @click="openEdit(row)">
          修改
        </el-link>
        <el-divider direction="vertical" />
        <el-link type="danger" :underline="false" @click="remove(row)">
          删除
        </el-link>
      </template>
    </ele-pro-table>
    <!-- </ele-card> -->
    <vip-rebate-edit :data="current" v-model="showEdit" @done="reload" />
    <vip-rebate-import v-model="showImport" @done="reload" />
  </ele-page>

</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessageBox } from "element-plus/es";
import { EleMessage } from "ele-admin-plus/es";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import { PlusOutlined } from "@/components/icons";
// import VipRebateSearch from "./components/vip-rebate-search.vue";
import VipRebateEdit from "./components/vip-rebate-edit.vue";
import VipRebateImport from "./components/vip-rebate-import.vue";
import { exportExcel, pageVipRebates, removeVipRebate } from "@/api/welfare/vipRebateApi";
import type { VipRebate, VipRebateParam } from "@/api/welfare/model/vipRebate";
import { handleDownload } from "@/utils/file-util";
import { sendConfServer } from "@/api/conf";


/** 搜索栏实例 */
// const searchRef = ref<InstanceType<typeof VipRebateSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  {
    prop: "level",
    label: "level",
    width: 60,
    align: 'left',
    fixed: 'left',
  },
  {
    prop: "slots",
    label: "电子",
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "cards",
    label: "桌面",
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "fish",
    label: "捕鱼",
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "live",
    label: "真人",
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "sports",
    label: "体育",
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "lottery",
    label: "彩票",
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "other",
    label: "其它",
    minWidth: 110,
    align: 'left',
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
const selections = ref<VipRebate[]>([]);

/** 当前编辑数据 */
const current = ref<VipRebate | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);
const showImport = ref(false);

const openImport = () => {
  showImport.value = true;
};
/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageVipRebates({
    ...where,
    ...orders,
    ...pages
  });
};

/** 搜索 */
const reload = (where?: VipRebateParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row?: VipRebate) => {
  current.value = row ?? null;
  showEdit.value = true;
};
// 导出Excel
const doExcelExport = () => {
  exportExcel().then((res) => {
    handleDownload('流水返利', res.data as any);
  });
};
/** 删除单个 */
const remove = (row: VipRebate) => {
  ElMessageBox.confirm(
    '确定要删除“' + row.level + '”吗?',
    '系统提示',
    { type: 'warning', draggable: true }
  )
    .then(() => {
      const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
      });
      removeVipRebate(row.level)
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

// 发送到服务器
const sendServer = () => {
  const loading = EleMessage.loading({
    message: '请求中..',
    plain: true
  });
  sendConfServer(27)
    .then((msg) => {
      loading.close();
      EleMessage.success(msg);
    })
    .catch((e) => {
      loading.close();
      EleMessage.error(e.message);
    });
};
/** 导出和打印全部数据的数据源 */
const exportSource: DatasourceFunction = ({ where, orders }) => {
  return pageVipRebates({
    ...where,
    ...orders
  });
};
</script>
