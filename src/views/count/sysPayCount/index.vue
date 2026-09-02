<template>
  <div class="ele-body">
    <el-card :bordered="false">
      <!-- 搜索表单 -->
      <sys-pay-count-search :where="defaultWhere" @search="reload" />
      <!-- 表格 -->
      <ele-pro-table ref="tableRef" :striped="true" :bordered="true" row-key="id" :columns="columns" :pagination="{
            pageSize: 50,
            pageSizes: [50, 100, 200],
            layout: 'total, prev, pager, next, sizes, jumper',
            style: { margin: 'auto' },
            autoAmend: false
        }"
        :datasource="datasource" :scroll="{ x: 1000 }" :where="defaultWhere" cache-key="prosysPayCount">
        <template #createTime="{ row }">
          <div style="font-size: 12px">{{ row.createTime }}</div>
          <div style="font-size: 12px">{{ row.updateTime }}</div>
        </template>
        <template #action="{ row }">
          <!-- <el-link type="primary" :underline="false" @click="openEdit(row)">修改</el-link>
          <el-divider direction="vertical" /> -->
          <el-link type="primary" :underline="false" class="ele-text-danger" @click="openInfo(row)">详情</el-link>
          <!-- <el-link type="danger" :underline="false" class="ele-text-danger" @click="remove(row)">删除</el-link> -->
        </template>
      </ele-pro-table>
    </el-card>
    <!-- 编辑弹窗 -->
    <sys-pay-count-info v-model="showInfo" :data="current" @done="reload" />
    <!-- <sys-pay-count-edit v-model="showEdit" :data="current" @done="reload" /> -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
// import { PlusOutlined } from "@/components/icons";
import SysPayCountSearch from './components/sysPayCountSearch.vue';
import SysPayCountInfo from './components/sysPayCountInfo.vue';
import { pageSysPayCounts, removeSysPayCount } from '@/api/count/sysPayCount';
import { EleMessage, EleProTable } from 'ele-admin-plus';
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import type{ SysPayCount } from '@/api/count/model';

// 表格实例
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

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
    label: 'ukey',
    prop: 'ukey',

    align: 'center',
  },
  {
    label: '充值渠道',
    prop: 'channelType',

    align: 'center',
  },
  {
    label: 'unit',
    prop: 'unit',

    align: 'center',
  },
  {
    label: '充值金额',
    prop: 'payAmount',

    align: 'center',
  },
  {
    label: '提现金额',
    prop: 'withdrawAmount',

    align: 'center',
  },
  {
    label: '充值次数',
    prop: 'payTimes',

    align: 'center',
  },
  {
    label: '提现次数',
    prop: 'withdrawTimes',

    align: 'center',
  },
  {
    label: '创建|更新',
    prop: 'createTime',
    align: 'center',
    width: 130,
    slot: 'createTime'
  },
  {
    label: '操作',
    prop: 'action',
    slot: 'action',
    width: 200,
    align: 'center'
  }
]);

// 表格选中数据
const selection = ref([]);

// 当前编辑数据
const current = ref<SysPayCount | null>(null);

// 是否显示编辑弹窗
const showEdit = ref(false);
const showInfo = ref(false);

// 默认搜索条件
const defaultWhere = reactive<SysPayCount>({
  daykey: undefined,
  channelType: undefined,
  unit: undefined,
  payTimes: undefined,
  withdrawTimes: undefined
});

// 表格数据源
const datasource: DatasourceFunction = ({ pages,limit, where }) => {
  return pageSysPayCounts({ ...where, ...pages, limit });
};

/* 搜索 */
const reload = (where?: any) => {
  selection.value = [];
  tableRef?.value?.reload({ page: 1, where });
};

/* 打开编辑弹窗 */
const openEdit = (row: SysPayCount) => {
  current.value = row ?? null;
  showEdit.value = true;
};
const openInfo = (row: SysPayCount) => {
  current.value = row ?? null;
  showInfo.value = true;
};

/* 删除单个 */
const remove = (row: SysPayCount) => {
  const loading = EleMessage.loading({
    message: '请求中..',
    plain: true
  });
  if (!row.id) return
  removeSysPayCount(row.id)
    .then((msg) => {
      loading.close();
      EleMessage.success(msg);
      reload();
    })
    .catch((e) => {
      loading.close();
      EleMessage.error(e.message);
    });
};
</script>

<script lang="ts">
export default {
  name: 'SysPayCount'
};
</script>
