<template>
  <el-card :bordered="false" style="margin: 20px;">
    <el-row style="margin-bottom: 40px;">
      <el-col class="border-css border-right-0 border-bottom-0" :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
        DNU:每日新增玩家数量 </el-col>
      <el-col class="border-css border-bottom-0" :xl="16" :lg="12" :md="12" :sm="24" :xs="24"> DAU:当日进入个游戏的玩家数量
      </el-col>
      <el-col class="border-css border-right-0 border-bottom-0" :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
        WAU:当前日期前7天内进入游戏 </el-col>
      <el-col class="border-css border-bottom-0" :xl="16" :lg="12" :md="12" :sm="24" :xs="24"> MAU:当前日期前30天内进入游戏
      </el-col>
      <el-col class="border-css border-right-0" :xl="8" :lg="12" :md="12" :sm="24" :xs="24">日人均时长=日在线总时长/DAU
        活跃度=DAU/MAU </el-col>
      <el-col class="border-css" :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
        次日留存：次日任有登录的用户，3日留存：第3日有登录的用户，7日留存：第7天有登录的用户 </el-col>
    </el-row>
    <!-- 搜索表单 -->
    <user-game-total-gold-report-search :where="defaultWhere" @search="reload" />
    <!-- 表格 -->
    <ele-pro-table ref="tableRef" :striped="true" :bordered="true" row-key="id" :columns="columns" :headerEllipsis="false"
      :datasource="datasource" :scroll="{ x: 1000 }" :where="defaultWhere" cache-key="progameTotalGoldReport">
    </ele-pro-table>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { EleProTable } from "ele-admin-plus/es";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import UserGameTotalGoldReportSearch from './components/userGameTotalGoldReportSearch.vue';
import { pageGameTotalGoldReports } from '@/api/count/gameTotalGoldReport'
import type{ GameTotalGoldReportParams } from '@/api/count/model';

// 表格实例
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

// 表格列配置
const columns = ref<Columns>([
  {
    label: 'uid',
    prop: 'uid',
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
    label: 'client',
    prop: 'clientType',

    align: 'center',
  },
  {
    label: 'Channel',
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
    label: '日线总长(分)',
    prop: 'onlineTimeLength',

    align: 'center',
  },
  {
    label: '日均时长(分)',
    prop: 'avgTime',

    align: 'center',
  },
  {
    label: '次日留存',
    prop: 'secNum',

    align: 'center',
  },
  {
    label: '三日留存',
    prop: 'threeNum',
    slot: 'threeNum',
    align: 'center',
    width: 130,
  },
  {
    label: '七日留存',
    prop: 'sevenNum',
    slot: 'sevenNum',
    width: 200,
    align: 'center'
  }
]);

// 表格选中数据
const selection = ref([]);

// 默认搜索条件
const defaultWhere = reactive<GameTotalGoldReportParams>({
  type: undefined,
  channelType: undefined,
  startTime: '',
  endTime: '',
});

// 表格数据源
const datasource: DatasourceFunction = ({ pages,  where, orders }) => {
  where = { ...defaultWhere, ...where, orderName: orders.order }
  return pageGameTotalGoldReports({ ...where, ...pages });
};

/* 搜索 */
const reload = (where: any) => {
  selection.value = [];
  tableRef?.value?.reload({ page: 1, where });
};
</script>

<script lang="ts">
export default {
  name: 'GameTotalGoldReport'
};
</script>
<style>
.border-css {
  border: 1px solid #e3e3e3;
  padding: 5px;
}

.border-right-0 {
  border-right: 0;
}

.border-bottom-0 {
  border-bottom: 0;
}
</style>
