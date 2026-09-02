<template>
  <ele-page>
    <ele-modal form :width="880" v-model="visible" title="全局邮件指定的用户" @open="handleOpen">
      <!-- <global-mail-assign-user-search ref="searchRef" style="margin-bottom: -14px" @search="reload" /> -->
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :export-config="{ fileName: '全局邮件指定的用户', datasource: exportSource }" :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
        <template #toolbar>
          <el-button type="success" :icon="DownloadOutlined" @click="doExcelImport()">导入</el-button>
          <el-button type="warning" @click="doExcelExport()">导出模板</el-button>
        </template>
      </ele-pro-table>
      <GlobalMailImport v-model="showImport" @done="reload" :data="current" />
    </ele-modal>
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { DownloadOutlined } from '@/components/icons';
  import GlobalMailImport from './global-mail-import.vue';
  import { exportExcelGlobalMails, pageGlobalMailAssignUsers } from '@/api/platform/globalMailAssignUserApi';
  import type { GlobalMailAssignUser, GlobalMailAssignUserParam } from '@/api/platform/model/globalMailAssignUser';

  import { handleDownload } from '@/utils/file-util';
  import { toDateString } from '@/utils/utils';
  const props = defineProps<{
    /** 修改回显的数据 */
    data?: any | null;
  }>();

  const emit = defineEmits<{
    (e: 'done'): void;
  }>();

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean });
  /** 弹窗打开事件 */
  const handleOpen = () => {
    if (props.data) {
      console.log(props.data);
      // 传递mid参数给where并调用接口
      const where = { mid: props.data.id };
      reload(where);
    } else {
      // 无参数时重新加载
      reload();
    }
  };
  /* 打开导入弹窗 */
  const doExcelImport = () => {
    if (props.data) {
      current.value = props.data;
    }
    showImport.value = true;
  };
  /** 搜索栏实例 */
  // const searchRef = ref<InstanceType<typeof GlobalMailAssignUserSearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'id',
      label: 'id',
      width: 60,
      align: 'left',
      fixed: 'left'
    },
    {
      prop: 'mid',
      label: '全局邮件ID',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'uid',
      label: '用户ID',
      minWidth: 110,
      align: 'left'
    },
    {
      label: '时间',
      prop: 'createTime',
      formatter: (row) => toDateString(row.createTime),
      align: 'left',
      minWidth: 110
    }
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
  const selections = ref<GlobalMailAssignUser[]>([]);

  /** 当前编辑数据 */
  const current = ref<GlobalMailAssignUser | null>(null);

  const showImport = ref(false);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageGlobalMailAssignUsers({
      ...where,
      ...orders,
      ...pages
    });
  };

  /** 搜索 */
  const reload = (where?: GlobalMailAssignUserParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  // /** 打开编辑弹窗 */
  // const openEdit = (row?: GlobalMailAssignUser) => {
  //   current.value = row ?? null;
  //   showEdit.value = true;
  // };

  // 导出Excel
  const doExcelExport = () => {
    exportExcelGlobalMails().then((res) => {
      handleDownload('exportAssignUser', res.data as any);
    });
  };
</script>
