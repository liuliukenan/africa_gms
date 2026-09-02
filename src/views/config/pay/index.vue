<template>
  <ele-page flex-table :multi-card="false" hide-footer style="min-height: 420px">
    <ele-card flex-table :body-style="{ padding: '0 0 0 16px', overflow: 'hidden' }">
      <!-- <ele-split-panel ref="splitRef" flex-table size="256px" allow-collapse
        :custom-style="{ borderWidth: '0 1px 0 0', padding: '16px 0' }"
        :body-style="{ padding: '16px 16px 0 0', overflow: 'hidden' }" :style="{ height: '100%', overflow: 'visible' }"> -->

      <ele-pro-table ref="tableRef" row-key="channelId" :headerEllipsis="false" :columns="columns"
        :datasource="datasource" @done="done" v-model:current="current" :pagination="false" @update:current="rowClick"
        bordered class="dict-table" cache-key="proPay" :tools="['reload', 'columns', 'maximized']">
        <template #toolbar>
          <el-space :size="10">
            <el-button type="primary" class="ele-btn-icon" @click="openEdit()" v-permission="'config:pay:addChanel'">
              <template #icon>
                <plus-outlined />
              </template>
              <span>新建</span>
            </el-button>
          </el-space>
        </template>
        <template #channelType="{ row }">
          <dict-data code="channelType" valueType="number" type="tag" v-model="row.channelType" />
        </template>
        <template #status="{ row }">
          <el-tag :type="row.status ? 'success' : 'danger'">{{ row.status ? '启用' : '禁用' }}</el-tag>
        </template>
        <template #action="{ row }">
          <el-link type="primary" @click="openEdit(row)" :underline="false" style="margin-right: 8px">修改</el-link>
          <el-link type="warning" @click="openBalance(row)" :underline="false" style="margin-right: 8px">余额</el-link>
          <el-link type="success" @click="openReward(row)" :underline="false" style="margin-right: 8px">赠送奖励</el-link>
          <el-link type="danger" @click="removeRow(row)" :underline="false">删除</el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <pay-edit v-model="showEdit" :data="current" @done="reload" />
    <Balance v-model="showBalance" :data="current" @done="reload" />
    <Reward v-model="showReward" :channelId="current?.channelId ?? 0" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
import { onMounted, ref, } from 'vue';
import { ElMessageBox } from 'element-plus/es';
import { EleMessage } from 'ele-admin-plus/es';
import type { EleProTable, EleSplitPanel } from 'ele-admin-plus/es';
import {
  PlusOutlined,
} from '@/components/icons';
// import { useMobile } from '@/utils/use-mobile';
import PayData from './components/pay-data.vue';
import PayEdit from './components/pay-edit.vue';
import Balance from './components/balance.vue';
import Reward from './components/reward.vue';

import { payChannels, removePayChannel } from '@/api/pay/payChannel';
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import type { PayChannel } from '@/api/pay/model/index'
defineOptions({ name: 'SystemDictionary' });

/** 分割面板组件 */
const splitRef = ref<InstanceType<typeof EleSplitPanel> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 选中数据 */
const current = ref<PayChannel | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);
const showBalance = ref(false);

const showReward = ref(false);
// 表格列配置
const columns = ref<Columns>([
  {
    label: 'ID',
    prop: 'channelId',
    align: "center",
    // minWidth: 90,
    fixed: 'left'
  },
  {
    label: '渠道名称',
    align: "center",
    prop: 'name',
  },
  {
    label: '渠道类型',
    align: "center",
    prop: 'channelType',
    slot: 'channelType',
  },
  // {
  //   label: '账号',
  //   align: "center",
  //   prop: 'account'
  // },
  {
    label: '支付限制',
    align: "center",
    prop: 'maxPayLimit',
    formatter: (row: any) => (row.minPayLimit + ' ~ ' + row.maxPayLimit)
  },
  {
    label: '提现限制',
    align: "center",
    prop: 'maxWithdrawLimit',
    formatter: (row: any) => (row.minWithdrawLimit + ' ~ ' + row.maxWithdrawLimit)
  },
  {
    label: '提现手续费',
    align: "center",
    prop: 'withdrawFee',
  },
  {
    label: '充值手续费',
    align: "center",
    prop: 'rechargeFee',
  },
  {
    label: ' 每日提现次数',
    align: "center",
    prop: 'withdrawDailyLimit',
  },
  // {
  //   label: '特定充值项',
  //   align: "center",
  //   prop: 'hasAssignItem',
  //   formatter: (row: PayChannel) => row.hasAssignItem ? '特定' : '通用'
  // },
  {
    label: '提现检查游戏转账',
    align: "center",
    prop: 'withdrawCheckGameTransfers',
  }, 
  {
    label: '提现检查游戏转账',
    align: "center",
    prop: 'identityVerificationThreshold',
  },
  {
    label: '小额免审阈值',
    align: "center",
    prop: 'withdrawAutoAuditMin',
  }, 
  {
    label: '大额强制复核阈值',
    align: "center",
    prop: 'withdrawAutoAuditMax',
  },
  {
    label: '状态',
    align: "center",
    prop: 'status',
    slot: 'status',
  },
  {
    columnKey: "action",
    width: 200,
    label: "操作",
    align: "center",
    slot: "action",
    fixed: 'right',
    hideInPrint: true,
    hideInExport: true
  }
]);

// 表格数据源
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return payChannels({
    ...where,
    ...orders,
    ...pages,
  });
};
/* 刷新表格 */
const reload = () => {
  tableRef?.value?.reload();
};
/* 行点击事件 */
const rowClick = (row: PayChannel) => {
  current.value = row;
  console.log('row', row);
}
/* 表格渲染完成回调 */
const done = (res: any) => {
  if (res.data?.length) {
    current.value = res.data[0];
  }
};
/* 打开编辑弹窗 */
const openEdit = (row?: PayChannel) => {
  current.value = row ?? null;
  showEdit.value = true;
};
const openBalance = (row?: PayChannel) => {
  current.value = row ?? null;
  showBalance.value = true;
};
const openReward = (row: PayChannel) => {
  if (!row.channelId) return;
  current.value = row;
  showReward.value = true;
};
const removeRow = (row: PayChannel) => {
  current.value = row;
  ElMessageBox.confirm(`确定要删除“${row.account}”吗?`, '系统提示', {
    type: 'warning',
    draggable: true
  })
    .then(() => {
      const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
      });
      if (!row.channelId) return;

      removePayChannel(row.channelId)
        .then((msg) => {
          loading.close();
          EleMessage.success(msg);
          reload()
        })
        .catch((e) => {
          loading.close();
          EleMessage.error(e.message);
        });
    })
    .catch(() => { });
};
// 在组件挂载后设置默认选中第一条数据
onMounted(() => {

});
</script>
<script lang="ts">
export default {
  name: 'Pay'
};
</script>