<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <link-stat-daily-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :export-config="{ fileName: '客服链接统计', datasource: exportSource }" :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable"> </ele-pro-table>
    </ele-card>
    <link-stat-daily-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import LinkStatDailySearch from './components/link-stat-daily-search.vue';
  import { pageLinkStatDailys } from '@/api/platform/linkStatDailyApi';
  import type { LinkStatDaily, LinkStatDailyParam } from '@/api/platform/model/linkStatDaily';
  import { toDateString } from '@/utils/utils';

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof LinkStatDailySearch> | null>(null);

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
      prop: 'address',
      label: 'address',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'refType',
      label: '类型',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'clickDate',
      label: '日期',
      minWidth: 110,
      align: 'left',
      formatter: (row) => {
        return toDateString(row.clickDate, 'yyyy-MM-dd');
      }
    },
    {
      prop: 'count',
      label: '次数',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'createdAt',
      label: '创建时间',
      minWidth: 110,
      align: 'left',
      formatter: (row) => {
        return toDateString(row.createdAt);
      }
    },
    {
      prop: 'updatedAt',
      label: '更新时间',
      minWidth: 110,
      align: 'left',
      formatter: (row) => {
        return toDateString(row.updatedAt);
      }
    }
  ]);

  /** 表格选中数据 */
  const selections = ref<LinkStatDaily[]>([]);

  /** 当前编辑数据 */
  const current = ref<LinkStatDaily | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageLinkStatDailys({
      ...where,
      ...orders,
      ...pages
    });
  };

  /** 搜索 */
  const reload = (where?: LinkStatDailyParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 导出和打印全部数据的数据源 */
  const exportSource: DatasourceFunction = ({ where, orders }) => {
    return pageLinkStatDailys({
      ...where,
      ...orders
    });
  };
</script>
