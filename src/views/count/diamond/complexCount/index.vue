<template>
  <div class="ele-body">
    <el-card :bordered="false">
      <!-- 搜索表单 -->
      <complex-count-search :where="defaultWhere" @search="reload" />
      <!-- 表格 -->
      <ele-pro-table
        ref="tableRef"
        :striped="true"
        :bordered="true"
        row-key="id"
        :columns="columns"
        size="small"
        :headerEllipsis="false"
        :datasource="datasource"
        :scroll="{ x: 1000 }"
        :where="defaultWhere"
        :pagination="{
          pageSize: 50,
          pageSizes: [50, 100, 200],
          layout: 'total, prev, pager, next, sizes, jumper',
          style: { margin: 'auto' },
          autoAmend: false
        }"
        cache-key="procomplexCount"
      >
        <template #org2="{ row }">
          <span>{{ row.org2 }}<br />{{ row.retention2 }} </span>
        </template>
        <template #org3="{ row }">
          <span>{{ row.org3 }}<br />{{ row.retention3 }} </span>
        </template>
        <template #org7="{ row }">
          <span>{{ row.org7 }}<br />{{ row.retention7 }}</span>
        </template>
        <template #org30="{ row }">
          <span>{{ row.org30 }}<br />{{ row.retention30 }} </span>
        </template>
        <template #action="{ row }" v-permission="'count:complexCount:info'">
          <el-link type="primary" :underline="false" @click="openInfo(row)"> 详情</el-link>
        </template>
      </ele-pro-table>
    </el-card>
    <!-- 编辑弹窗 -->
    <complex-count-info v-model="showInfo" :data="current" @done="reload" />
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { EleProTable } from 'ele-admin-plus/es';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import ComplexCountSearch from './components/complexCount-search.vue';
  import ComplexCountInfo from './components/complexCount-info.vue';
  import { pageComplexCount } from '@/api/count/complexCount';
  import type { ComplexCount } from '@/api/count/model';
  import dayjs from 'dayjs';

  // 表格实例
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  // 表格列配置
  const columns = ref<Columns>([
    {
      label: 'ID',
      prop: 'id',
      width: 60,
      align: 'center',
      fixed: 'left'
    },
    {
      label: '日期',
      prop: 'daykey',
      align: 'center'
    },
    {
      label: 'client',
      prop: 'clientType',
      align: 'center'
    },
    {
      label: 'DNU',
      prop: 'dnu',
      align: 'center'
    },
    {
      label: 'DAU',
      prop: 'dau',
      align: 'center'
    },
    {
      label: 'WAU',
      prop: 'wau',
      align: 'center'
    },
    {
      label: 'MAU',
      prop: 'mau',
      align: 'center'
    },
    {
      label: '登陆次数',
      prop: 'loginTimes',
      align: 'center'
    },
    {
      label: '总在线时长(秒)',
      prop: 'totalLineTimeLen',
      align: 'center'
    },
    {
      label: '平均在线时长(秒)',
      prop: 'avgLineTimeLen',
      align: 'center'
    },
    {
      label: '次日数据|留存',
      prop: 'org2',
      slot: 'org2',
      align: 'center'
    },
    {
      label: '三日数据|留存',
      prop: 'org3',
      slot: 'org3',
      align: 'center',
      width: 130
    },
    {
      label: '七日数据|留存',
      prop: 'org7',
      slot: 'org7',
      align: 'center'
    },
    {
      label: '30日数据|留存',
      prop: 'org30',
      slot: 'org30',
      align: 'center'
    },
    {
      label: '操作',
      prop: 'action',
      slot: 'action',
      fixed: 'right',
      width: 120,
      align: 'center'
    }
  ]);

  // 表格选中数据
  const selection = ref([]);

  // 当前编辑数据
  const current = ref<ComplexCount | null>(null);

  // 是否显示编辑弹窗
  // const showEdit = ref(false);
  const showInfo = ref(false);
  // 默认搜索条件
  const defaultWhere = reactive({
    type: 0,
    sortName: 'totalResult',
    startDay: dayjs().subtract(1, 'month').format('YYYYMMDD'),
    endDay: dayjs().format('YYYYMMDD')
  });

  // 表格数据源
  const datasource: DatasourceFunction = ({ where, orders, pages }) => {
    where = { ...defaultWhere, ...where, orderName: orders.order, sortName: orders.sort, ...pages };
    return pageComplexCount({ ...where });
  };

  /* 搜索 */
  const reload = (where?: ComplexCount) => {
    selection.value = [];
    tableRef?.value?.reload({ page: 1, where });
  };

  /* 打开编辑弹窗 */
  // const openEdit = (row?: ComplexCount) => {
  //   current.value = row ?? null;
  //   showEdit.value = true;
  // };
  const openInfo = (row?: ComplexCount) => {
    current.value = row ?? null;
    showInfo.value = true;
  };

  /* 删除单个 */
  // const remove = (row: ComplexCount) => {
  //   const loading = EleMessage.loading({
  //     message: '请求中..',
  //     plain: true
  //   });
  //   if (!row.id) return
  //   removeComplexCount(row.id)
  //     .then((msg) => {
  //       loading.close();
  //       EleMessage.success(msg);
  //       reload();
  //     })
  //     .catch((e) => {
  //       loading.close();
  //       EleMessage.error(e.message);
  //     });
  // };
</script>

<script lang="ts">
  export default {
    name: 'ComplexCount'
  };
</script>
