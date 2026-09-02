<template>
  <ele-page>
    <operation-record-search ref="searchRef" @search="reload" />
    <ele-card :body-style="{ paddingTop: '8px' }">
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :headerEllipsis="false"
        :show-overflow-tooltip="true" :highlight-current-row="true" :export-config="{ fileName: '操作日志数据' }"
        cache-key="proOperationRecord">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="DownloadOutlined" @click="exportData">
            导出
          </el-button>
        </template>
        <template #status="{ row }">
          <el-tag v-if="row.status === 0" size="small" type="success" :disable-transitions="true">
            正常
          </el-tag>
          <el-tag v-else-if="row.status === 1" size="small" type="danger" :disable-transitions="true">
            异常
          </el-tag>
        </template>
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openDetail(row)">
            详情
          </el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <!-- 详情弹窗 -->
    <operation-record-detail v-model="showInfo" :data="current" />
  </ele-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { EleProTable } from 'ele-admin-plus';
import type {
  DatasourceFunction,
  Columns
} from 'ele-admin-plus/es/ele-pro-table/types';
import { DownloadOutlined } from '@/components/icons';
import OperationRecordSearch from './components/operation-record-search.vue';
import OperationRecordDetail from './components/operation-record-detail.vue';
import {
  pageOperationRecords,
  exportExcel
} from '@/api/system/operation-record';
import type {
  OperationRecord,
  OperationRecordParam
} from '@/api/system/operation-record/model';
import { handleDownload } from '@/utils/file-util';

defineOptions({ name: 'SystemOperationRecord' });
/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof OperationRecordSearch> | null>(null);
/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  {
    type: 'index',
    label: '序号',
    width: 70,
    align: 'center',
    fixed: 'left'
  },
  {
    prop: 'username',
    label: '账号',
    sortable: 'custom',
    minWidth: 110
  },
  // {
  //   prop: 'nickname',
  //   label: '用户名',
  //   sortable: 'custom',
  //   minWidth: 110
  // },
  {
    prop: 'module',
    label: '操作模块',
    sortable: 'custom',
    minWidth: 110
  },
  {
    prop: 'operation',
    label: '操作功能',
    sortable: 'custom',
    minWidth: 110
  },
  {
    prop: 'url',
    label: '请求地址',
    sortable: 'custom',
    minWidth: 110
  },
  {
    prop: 'reqMethod',
    label: '请求方式',
    sortable: 'custom',
    width: 110,
    align: 'center'
  },
  {
    prop: 'status',
    label: '状态',
    sortable: 'custom',
    width: 110,
    align: 'center',
    slot: 'status',
    filters: [
      {
        text: '正常',
        value: '0'
      },
      {
        text: '异常',
        value: '1'
      }
    ],
    filterMultiple: false,
    formatter: (row) => (row.status == 0 ? '正常' : '异常')
  },
  {
    prop: 'spendTime',
    label: '耗时',
    sortable: 'custom',
    width: 100,
    formatter: (row) => `${row.spendTime / 1000}s`,
    align: 'center'
  },
  {
    prop: 'createTime',
    label: '操作时间',
    sortable: 'custom',
    align: 'center',
    width: 180
  },
  {
    columnKey: 'action',
    label: '操作',
    width: 90,
    align: 'center',
    slot: 'action',
    fixed: 'right',
    hideInPrint: true,
    hideInExport: true
  }
]);

/** 当前选中数据 */
const current = ref<OperationRecord>({
  module: '',
  description: '',
  url: '',
  requestMethod: '',
  method: '',
  params: '',
  result: '',
  error: '',
  spendTime: 0,
  os: '',
  device: '',
  browser: '',
  ip: '',
  status: 0,
  createTime: '',
  nickname: '',
  username: ''
});

/** 是否显示查看弹窗 */
const showInfo = ref(false);

/** 表格数据源 */
const datasource: DatasourceFunction = ({
  pages,
  where,
  orders,
  filters
}) => {
  return pageOperationRecords({
    ...where,
    ...orders,
    ...filters,
    ...pages
  });
};

/** 刷新表格 */
const reload = (where?: OperationRecordParam) => {
  tableRef.value?.reload?.({ page: 1, where });
};

/** 详情 */
const openDetail = (row: OperationRecord) => {
  current.value = row;
  showInfo.value = true;
};
/** 导出和打印全部数据的数据源 */
const exportSource: DatasourceFunction = ({ where, orders }) => {
  where = { ...where, limit: 146990, page: 1, }
  return pageOperationRecords({
    ...where,
    ...orders
  });
};
/** 导出数据 */
const exportData = () => {
  exportExcel(searchRef.value!.searchParams()).then((res) => {
    handleDownload('操作日志', res as any);
  });
};
</script>
<script lang="ts">
  export default {
    name: 'OperationRecord'
  };
</script>
