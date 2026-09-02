<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <link-record-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :export-config="{ fileName: '客服链接', datasource: exportSource }" :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()"> 新建 </el-button>
        </template>
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)"> 修改 </el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)"> 删除 </el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <link-record-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { PlusOutlined } from '@/components/icons';
  import LinkRecordSearch from './components/link-record-search.vue';
  import LinkRecordEdit from './components/link-record-edit.vue';
  import { pageLinkRecords, removeLinkRecord } from '@/api/platform/linkRecordApi';
  import type { LinkRecord, LinkRecordParam } from '@/api/platform/model/linkRecord';
  import { toDateString } from '@/utils/utils';

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof LinkRecordSearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'id',
      label: 'Id',
      width: 60,
      align: 'left',
      fixed: 'left'
    },
    {
      prop: 'type',
      label: '类型',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'name',
      label: 'name',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'address',
      label: 'address',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'totalCount',
      label: 'totalCount',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: 110,
      align: 'left',
      formatter: (row) => {
        return toDateString(row.createAt);
      }
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: 110,
      align: 'left',
      formatter: (row) => {
        return toDateString(row.updateAt);
      }
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 200,
      align: 'center',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    }
  ]);

  /** 表格选中数据 */
  const selections = ref<LinkRecord[]>([]);

  /** 当前编辑数据 */
  const current = ref<LinkRecord | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageLinkRecords({
      ...where,
      ...orders,
      ...pages
    });
  };

  /** 搜索 */
  const reload = (where?: LinkRecordParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: LinkRecord) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  /** 删除单个 */
  const remove = (row: LinkRecord) => {
    ElMessageBox.confirm('确定要删除“' + row.id + '”吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeLinkRecord(row.id)
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
      .catch(() => {});
  };

  /** 导出和打印全部数据的数据源 */
  const exportSource: DatasourceFunction = ({ where, orders }) => {
    return pageLinkRecords({
      ...where,
      ...orders
    });
  };
</script>
