<template>
  <div class="ele-body">
    <el-card :bordered="false">
      <!-- 搜索表单 -->
      <user-gold-record-search @search="reload" @blurWhere='blurWhere' />
      <!-- 表格 -->
      <ele-pro-table ref="tableRef" :border="true" :striped="true" :bordered="true" row-key="id" :columns="columns"
        size="small" :headerEllipsis="false" :datasource="datasource" :scroll="{ x: 1000 }" :where="defaultWhere"
        cache-key="proUserGoldRecord" :pagination="{
          pageSize: 100,
          pageSizes: [50, 100, 200],
          layout: 'total, prev, pager, next, sizes, jumper',
          style: { margin: 'auto' },
          autoAmend: false
        }">
        <template #toolbar>
          <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined" @click="openExport()"
            :disabled="Boolean(!total)" v-permission="'user:userGoldRecord:export'">
            导出
          </el-button>
        </template>
        <template #type="{ row }">
          <dict-data code="moneySourceType" valueType="number" type="tag" v-model="row.type" />
        </template>
        <template #sid="{ row }">
          <dict-data code="serverType" valueType="number" type="tag" v-model="row.sid" />
        </template>
        <template #gameName="{ row }">
          <span>{{ row.gameId }}<br />{{ row.gameName }}</span>
        </template>
        <template #coins="{ row }">
          <span>{{ numTo100s(row.oldCoins) }}<br />{{numTo100s( row.currCoins) }}</span>
        </template>
        <template #remark="{ row }">
          <!-- <el-tooltip :content="JSON.stringify(row.remark)" placement="top" popper-class="custom-tooltip"
            effect="light">
            <div class="ellipsis">{{ JSON.stringify(row.remark)?JSON.stringify(row.remark):'无' }}</div>
          </el-tooltip> -->
          {{ row.remark }}
        </template>
        <template #note="{ row }">
          <!-- <el-tooltip :content="JSON.stringify(row.note)" placement="top" popper-class="custom-tooltip"
            effect="light">
            <div class="ellipsis">{{ JSON.stringify(row.note)?JSON.stringify(row.note):'无' }}</div>
          </el-tooltip> -->
          {{ row.note }}
        </template>
        <template #createTime="{ row }">
          <div style="font-size: 12px">{{ toDateString(row.createTime) }}</div>
        </template>
      </ele-pro-table>
    </el-card>
    <!-- 编辑弹窗 -->
    <!-- <user-gold-record-edit v-model="showEdit" :data="current" @done="reload" /> -->
    <user-gold-record-export v-model="showExport" :data="searchData" :total="total" @done="reload" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { EleProTable } from 'ele-admin-plus/es';
import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
import UserGoldRecordSearch from './components/userGoldRecordSearch.vue';
import UserGoldRecordExport from './components/userGoldRecordExport.vue';
import { pageUserGoldRecords } from '@/api/user/userGoldRecord';
import dayjs from 'dayjs';
import { toDateString } from '@/utils/utils';
import { UploadOutlined } from "@/components/icons";
import { numTo100s } from '@/utils/common';
// 表格实例
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

// 表格列配置
const columns = ref<Columns>([
  {
    label: '序号',
    type: 'index',
    width: 50,
    align: 'center',
    fixed: 'left'
  },
  {
    label: 'ID',
    prop: 'id',
    width: 60,
    align: 'center',
    fixed: 'left'
  },
  {
    label: 'uid',
    prop: 'uid',
    align: 'center'
  },
  {
    label: '金币变化类型',
    prop: 'type',
    slot: 'type',
    align: 'center'
  },
  {
    label: '游戏ID |名称',
    prop: 'gameName',
    slot: 'gameName',
    align: 'center'
  },
  {
    label: '游戏类型',
    prop: 'sid',
    slot: 'sid',
    align: 'center'
  },
  {
    label: '场次',
    prop: 'limitTag',
    align: 'center'
  },
  {
    label: 'Rtp',
    prop: 'rtp',
    align: 'center',
    formatter: (row) => row.rtp ? row.rtp.toFixed(2) : row.rtp
  },
  {
    label: '下注',
    prop: 'betAmount',
    formatter: (row) => numTo100s(row.betAmount),
    align: 'center'
  },
  {
    label: '赢取',
    prop: 'winAmount',
    formatter: (row) => numTo100s(row.winAmount),
    align: 'center'
  },
  {
    label: '旧金额|新金额',
    prop: 'coins',
    slot: 'coins',
    align: 'center'
  },
  {
    label: '结算',
    prop: 'resultAmount',
    formatter: (row) => numTo100s(row.resultAmount),
    align: 'center'
  },
  {
    label: '关联ID',
    prop: 'refer',
    align: 'center'
  },
  {
    label: '时间',
    prop: 'createTime',
    align: 'center',
    slot: 'createTime'
  },
  {
    label: '附加信息',
    prop: 'note',
    slot: 'note',
    align: 'center',
    minWidth: 150
  },
  {
    label: '备注',
    prop: 'remark',
    slot: 'remark',
    align: 'left',
    minWidth: 260,

  },
]);

// 表格选中数据
const selection = ref([]);

// 当前编辑数据
const current = ref(null);

// 是否显示编辑弹窗
const showEdit = ref(false);

const blurWhere = (where?: any) => {
  console.log('失焦搜索参数', where)
  searchData.value = where
}
// 默认搜索条件
const defaultWhere = reactive({
  tableName: dayjs().format('YYYYMM'),
  startDay: dayjs().startOf('month').format('YYYYMMDD'),
  endDay: dayjs().endOf('month').format('YYYYMMDD'),
});
let searchData = ref()
const total = ref<number>(0)
// 表格数据源
const datasource: DatasourceFunction = ({ pages, limit, where, orders }) => {
  where = { ...defaultWhere, ...where, orderName: orders.order }
  const data = pageUserGoldRecords({ ...where, ...pages, limit });
  searchData.value = where
  data.then(res => {
    if (res && res?.totalRow) {
      total.value = res?.totalRow
    } else {
      total.value = 0
    }
    console.log('total', total.value);

  });
  return data
};
/* 搜索 */
const reload = (where?: any) => {
  selection.value = [];
  searchData.value = where
  tableRef?.value?.reload({ page: 1, where: searchData.value });
};

/* 打开编辑弹窗 */
const openEdit = (row) => {
  current.value = row ?? null;
  showEdit.value = true;
};
const showExport = ref(false)
const openExport = () => {
  showExport.value = true;
}
</script>

<script lang="ts">
export default {
  name: 'UserGoldRecord'
};
</script>
<style lang="scss">
.ellipsis {
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

.custom-tooltip {
  max-width: 300px;
}
</style>
