<template>
  <ele-modal width="100%" v-model="visible" title="详情" :body-style="{ paddingBottom: '5px' }" @open="handleOpen"
    position="center">
    <!-- 表格 -->
    <ele-pro-table ref="tableRef" :striped="true" :bordered="true" row-key="id" :columns="columns" :pagination="{
            pageSize: 50,
            pageSizes: [50, 100, 200],
            layout: 'total, prev, pager, next, sizes, jumper',
            style: { margin: 'auto' },
            autoAmend: false
        }"
      :header-ellipsis="false" size="small" :datasource="datasource" :scroll="{ x: 1000 }" :where="defaultWhere"
      cache-key="prouserGoldTotalReport">
      <!-- <template #gameId="{ row }">
        <div>{{ row.gameId }}<br />{{ row.gameName }}</div>
      </template> -->
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
import { pagePayComplexCountInfo } from '@/api/count/payComplexCount';
import type { PayComplexCount } from '@/api/count/model'
const props = defineProps<{
  // 修改回显的数据
  data?: PayComplexCount | null
}>();
// 表格实例
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);
/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });
// 表格列配置
const columns = ref<Columns>([
{
    label: 'ID',
    fixed: 'left',
    prop: 'id',
    width:60,
    align: 'center',
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
    label: '首充',
    align: 'center',
    children: [
      {
        label: '金额',
        prop: 'firstPayGold',
        slot: 'firstPayGold',
        align: 'center',
        sortable: 'custom'
      },
      {
        label: '数量',
        prop: 'firstPayNum',
        slot: 'firstPayNum',
        align: 'center',
      },
      {
        label: '次数',
        prop: 'firstPayTimes',
        slot: 'firstPayTimes',
        align: 'center',
      },
    ]
  },
  {
    label: '充值',
    align: 'center',
    children: [
      {
        label: '金币',
        prop: 'payGold',
        align: 'center',
        sortable: 'custom'
      },
      {
        label: '人数',
        prop: 'payNum',
        align: 'center',
      },
      {
        label: '次数',
        prop: 'payTimes',
        align: 'center',
      },
    ]
  },
  {
    label: '首次转帐',
    align: 'center',
    children: [
      {
        label: '金额',
        prop: 'firstTransGold',
        slot: 'firstTransGold',
        align: 'center',
        sortable: 'custom'
      },
      {
        label: '数量',
        prop: 'firstTransNum',
        slot: 'firstTransNum',
        align: 'center',
      },
      {
        label: '次数',
        prop: 'firstTransTimes',
        slot: 'firstTransTimes',
        align: 'center',
      },
    ]
  },
  {
    label: '转帐',
    align: 'center',
    children: [
      {
        label: '金额',
        prop: 'transGold',
        align: 'center',
        sortable: 'custom'
      },
      {
        label: '人数',
        prop: 'transNum',
        align: 'center',
      },
      {
        label: '人次',
        prop: 'transTimes',
        align: 'center',
      },
    ]
  },
  {
    label: '首充银行',
    align: 'center',
    children: [
      {
        label: '金额',
        prop: 'firstBankGold',
        slot: 'firstBankGold',
        align: 'center',
        sortable: 'custom'
      },
      {
        label: '数量',
        prop: 'firstBankNum',
        slot: 'firstBankNum',
        align: 'center',
      },
      {
        label: '次数',
        prop: 'firstBankTimes',
        slot: 'firstBankTimes',
        align: 'center',
      },
    ]
  },
  {
    label: '银行',
    align: 'center',
    children: [
      {
        label: '金额',
        prop: 'bankGold',
        slot: 'bankGold',
        align: 'center',
        sortable: 'custom'
      },
      {
        label: '数量',
        prop: 'bankNum',
        slot: 'bankNum',
        align: 'center',
      },
      {
        label: '次数',
        prop: 'bankTimes',
        slot: 'bankTimes',
        align: 'center',
      },
    ]
  },
  {
    label: '首充USDT',
    align: 'center',
    children: [
      {
        label: '金额',
        prop: 'firstUsdtGold',
        slot: 'firstUsdtGold',
        align: 'center',
        sortable: 'custom'
      },
      {
        label: '数量',
        prop: 'firstUsdtNum',
        slot: 'firstUsdtNum',
        align: 'center',
      },
      {
        label: '次数',
        prop: 'firstUsdtTimes',
        slot: 'firstUsdtTimes',
        align: 'center',
      },
    ]
  },
  {
    label: 'USTD',
    align: 'center',
    children: [
      {
        label: '金额',
        prop: 'usdtGold',
        slot: 'usdtGold',
        align: 'center',
        sortable: 'custom'
      },
      {
        label: '数量',
        prop: 'usdtNum',
        slot: 'usdtNum',
        align: 'center',
      },
      {
        label: '次数',
        prop: 'usdtTimes',
        slot: 'usdtTimes',
        align: 'center',
      },
    ]
  },
]);

// 默认搜索条件
const defaultWhere = reactive({
  id: 0,
  daykey: 0,
});

// 表格数据源
const datasource: DatasourceFunction = ({ pages, limit, where, orders }) => {
  where = { ...defaultWhere, ...where, orderName: orders.order, sortName: orders.sort }
  return pagePayComplexCountInfo({ ...where, ...pages, limit });
};

/* 搜索 */
const reload = (where?: any) => {
  if (where == null || where == undefined) {
    where = defaultWhere;
  }


  if (!where.id) {
    // where.id = props.data?.id;
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
  // defaultWhere.id = props.data?.id||0;
  defaultWhere.daykey = Number(props.data?.daykey) || 0;
  reload();
};
</script>

<script lang="ts">
export default {
  name: 'UserGoldTotalReport'
};
</script>
