<template>
  <ele-page>
    <ele-card :bordered="false">
      <!-- 搜索表单 -->
      <down-count-search :where="defaultWhere" @search="reload" />
      <!-- 表格 -->
      <ele-pro-table ref="tableRef" :striped="true" :bordered="true" row-key="id" :columns="columns" :datasource="datasource" :scroll="{ x: 1000 }" :where="defaultWhere" cache-key="prodownCount">

      </ele-pro-table>
    </ele-card>
    <!-- 编辑弹窗 -->
    <!-- <down-count-edit v-model:visible="showEdit" :data="current" @done="reload" /> -->
  </ele-page>
</template>

<script setup lang='ts'>
  import { ref, reactive } from 'vue';
  // import { message } from 'ant-design-vue/es';
  //   import { PlusOutlined } from '@/components/icons';
  // import { toDateString, messageLoading } from 'ele-admin-pro/es';
  import DownCountSearch from './components/downCountSearch.vue';
  // import DownCountEdit from './components/downCountEdit.vue';
  import { pageDownCounts } from '@/api/count/downCount';
  import { EleProTable } from 'ele-admin-plus/es';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import type { DownCount, DownCountParams } from '@/api/count/model';
import dayjs from 'dayjs';
  // 表格实例
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  // 表格列配置
  const columns = ref<Columns>([
    {
      label: 'id',
      prop: 'id',
      width: 90,
      align: 'left',
      fixed: 'left',
    },
    {
      label: '代理ID',
      prop: 'uid',
      // width: 110,
      align: 'left',
    },
    {
      label: '时间',
      prop: 'daykey',
      // width: 110,
      align: 'left',
    },
    {
      label: 'web',
      prop: 'webNum',
      // width: 110,
      align: 'left',
    },
    {
      label: '下载',
      prop: 'downNum',
      // width: 110,
      align: 'left',
    },
    // {
    //   label: '操作',
    //   prop: 'action',
    //   slot: 'action',
    //   width: 200,
    //   align: 'center'
    // }
  ]);

  // 表格选中数据
  const selection = ref([]);

  // 当前编辑数据
  const current = ref<DownCount | null>(null);

  // 是否显示编辑弹窗
  const showEdit = ref(false);

  // 默认搜索条件
  const defaultWhere = reactive({
      // id:null,
      // daykey:null,
      // webNum:null,
      // downNum:null,
      startDay:dayjs().subtract(3, 'day').format('YYYYMMDD'),
      endDay: dayjs().format('YYYYMMDD')
  });

  // 表格数据源
  const datasource: DatasourceFunction =({ page, limit, where, orders }) => {
    return pageDownCounts({ ...where, ...orders, page, limit });
  };

  /* 搜索 */
  const reload = (where?: DownCountParams) => {
    selection.value = [];
    tableRef?.value?.reload({ page: 1, where });
  };

  /* 打开编辑弹窗 */
  // const openEdit = (row:DownCount) => {
  //   current.value = row ?? null;
  //   showEdit.value = true;
  // };

  // /* 删除单个 */
  // const remove = (row) => {
  //   const hide = messageLoading('请求中..', 0);
  //   removeDownCount(row.id)
  //     .then((msg) => {
  //       hide();
  //       message.success(msg);
  //       reload();
  //     })
  //     .catch((e) => {
  //       hide();
  //       Elmessage.error(e.message);
  //     });
  // };
</script>
<script lang="ts">
  export default {
    name: 'DownCount'
  };
</script>
