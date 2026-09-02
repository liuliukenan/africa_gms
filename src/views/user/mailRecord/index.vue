<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <mail-record-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :max-height="650"  :headerEllipsis="false" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :export-config="{ fileName: '赠送记录', datasource: exportSource }" :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }" cache-key="proMailRecord"> </ele-pro-table>
    </ele-card>
    <!-- <mail-record-edit :data="current" v-model="showEdit" @done="reload" /> -->
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import MailRecordSearch from './components/mail-record-search.vue';
  import { pageMailRecords } from '@/api/user/mailRecordApi';
  import type { MailRecord, MailRecordParam } from '@/api/model/mailRecord';
import { toDateString } from '@/utils/utils';

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof MailRecordSearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'id',
      label: 'ID',
      width: 60,
      align: 'left',
      fixed: 'left'
    },
    {
      prop: 'fromUid',
      label: '发件人',
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'toUid',
      label: '收件人',
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'title',
      label: '主题 ',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'content',
      label: '内容',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'gold',
      label: '金币',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'duty',
      label: '税收',
      minWidth: 110,
      align: 'left'
    },
    {
      label: '时间',
      prop: 'createTime',
      align: 'left',
      formatter: (row) => toDateString(row.createTime),
      minWidth: 110
    }
  ]);

  /** 表格选中数据 */
  const selections = ref<MailRecord[]>([]);

  /** 当前编辑数据 */
  const current = ref<MailRecord | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageMailRecords({
      ...where,
      ...orders,
      ...pages
    });
  };

  /** 搜索 */
  const reload = (where?: MailRecordParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 导出和打印全部数据的数据源 */
  const exportSource: DatasourceFunction = ({ where, orders }) => {
    return pageMailRecords({
      ...where,
      ...orders
    });
  };
</script>
<script lang="ts">
export default {
  name: 'MailRecord'
};
</script>
