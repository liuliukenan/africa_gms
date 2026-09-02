<template>
  <ele-modal width="100%" v-model="visible" title="详情" :body-style="{ paddingBottom: '5px' }" @open="handleOpen"
    position="center">
    <ele-pro-table ref="tableRef" :striped="true" :bordered="true" row-key="id" :columns="columns" :pagination="false"
      :header-ellipsis="false" size="small" :datasource="datasource" :scroll="{ x: 1000 }" :where="defaultWhere"
      cache-key="prouserGoldTotalReport">
      <template #gameId="{ row }">
        <div>{{ row.gameId }}<br />{{ row.gameName }}</div>
      </template>
      <template #org2="{ row }">
          <span>{{row.org2}}<br />{{row.retention2}} </span>
        </template>
        <template #org3="{ row }">
          <span>{{row.org3}}<br />{{row.retention3}} </span>
        </template>
        <template #org7="{ row }">
          <span>{{row.org7}}<br />{{row.retention7}}</span>
        </template>
        <template #org30="{ row }">
          <span>{{row.org30}}<br />{{row.retention30}} </span>
        </template>
    </ele-pro-table>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { EleProTable } from "ele-admin-plus/es";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import { pageComplexCountInfo } from '@/api/count/complexCount';
import type { ComplexCount } from '@/api/count/model'
const props = defineProps<{
  // 修改回显的数据
  data?: ComplexCount | null
}>();
// 表格实例
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);
/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });
// 表格列配置
const columns = ref<Columns>([
  {
    label: 'ID',
    prop: 'id',
    width: 60,
    align: 'center',
    fixed: 'left',
  },
  {
    label: '日期',
    prop: 'daykey',
    align: 'center',
  },
  {
    label: '客户端类型',
    prop: 'clientType',
    align: 'center',
  },
  {
    label: '渠道码',
    prop: 'channelCode',
    align: 'center',
  },
  {
    label: 'DNU',
    prop: 'dnu',
    align: 'center',
  },
  {
    label: 'DAU',
    prop: 'dau',
    align: 'center',
  },
  {
    label: 'WAU',
    prop: 'wau',
    align: 'center',
  },
  {
    label: 'MAU',
    prop: 'mau',
    align: 'center',
  },
  {
    label: '登陆次数',
    prop: 'loginTimes',
    align: 'center',
  },
  {
    label: '总在线时长(秒)',
    prop: 'totalLineTimeLen',
    align: 'center',
  },
  {
    label: '平均在线时长(秒)',
    prop: 'avgLineTimeLen',
    align: 'center',
  },
  {
    label: '次日数据|留存',
    prop: 'org2',
    slot: 'org2',
    align: 'center',
  },
  {
    label: '三日数据|留存',
    prop: 'org3',
    slot: 'org3',
    align: 'center',
    width: 130,
  },
  {
    label: '七日数据|留存',
    prop: 'org7',
    slot: 'org7',
    align: 'center',
  },
  {
    label: '30日数据|留存',
    prop: 'org30',
    slot: 'org30',
    align: 'center',
  },
]);

// 默认搜索条件
const defaultWhere = reactive({
  id: 0,
  daykey: 0,
});

// 表格数据源
const datasource: DatasourceFunction = ({ pages, limit, where, orders }) => {
  where = { ...where, ...defaultWhere, orderName: orders.order, sortName: orders.sort }
  return pageComplexCountInfo({ ...where, ...pages, limit });
};

/* 搜索 */
const reload = (where?: any) => {
  if (where == null || where == undefined) {
    where = defaultWhere;
  }


  if (!where.id) {
    where.id = props.data?.id;
    where.daykey = props.data?.daykey;
  }
  tableRef?.value?.reload({ page: 1, where });
};

/** 关闭弹窗 */
const handleCancel = () => {
  visible.value = false;
};
/** 弹窗打开事件 */
const handleOpen = () => {
  defaultWhere.id = props.data?.id || 0;
  defaultWhere.daykey = Number(props.data?.daykey) || 0;
  reload();
};
</script>

<script lang="ts">
export default {
  name: 'complexCount'
};
</script>
