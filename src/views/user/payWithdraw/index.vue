<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <PayWithdrawSearch ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :headerEllipsis="false"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :max-height="650" 
        :export-config="{ fileName: t('user.payWithdraw.title') }" :footer-style="{ paddingBottom: '16px' }" cache-key="PayWithdraw"
        size="small">
        <template #toolbar>
          <el-popconfirm :title="t('user.payWithdraw.exportConfirm')" @confirm="doExcelExport()" width="250px">
            <template #reference>
              <el-button type="warning" :icon="UploadOutlined">{{ t('action.export') }}</el-button>
            </template>
          </el-popconfirm>
        </template>
        <template #status="{ row }">
          <!-- <dict-data code="orderStatus" valueType="number" type="tag" v-model="row.status" /> -->
          <dict-data code="withdrawStatus" v-model="row.status" valueType="number" type="tag" />
          <!--  :typeColor="setOrderStatus(row.status)"  -->
        </template>
        <template #payChannelId="{ row }">
          <dict-data code="channelType" valueType="number" type="tag" v-model="row.payChannelId" />
        </template>
        <template #kycStatus="{ row }">
         <dict-data code="kycAuthStatus" valueType="number" type="tag" v-model="row.kycStatus" :typeColor="row.kycStatus == 0 ? 'danger' : row.kycStatus == 2 ? 'danger' : 'success'" />
        </template>
        <template #channelType="{ row }">
          <dict-data code="channelNewType" valueType="number" type="tag" v-model="row.channelType"  />
        </template>
        <template #refund="{ row }">
          <div v-if="row.refund" style="color: #52c41a;">{{ t('user.payWithdraw.table.refundYes') }}</div>
          <div v-else style="color: red;">{{ t('user.payWithdraw.table.refundNo') }}</div>
        </template>
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openInfo(row)" v-permission="'user:payWithdraw:info'">
            {{ t('user.payWithdraw.table.detail') }}
          </el-link>
          <el-divider direction="vertical" v-if="row.status === 0" v-permission="'user:payWithdraw:audit'" />
          <el-link type="primary" :underline="false" @click="openAudit(row, false)" v-if="row.status === 0"
            v-permission="'user:payWithdraw:audit'">
            {{ t('user.payWithdraw.table.audit') }}
          </el-link>
          <!-- <el-divider direction="vertical" v-if="!row.status"  />
          <el-popconfirm title="确认模拟到账吗？" @confirm="doSimulate(row, 'simulate')">
            <template #reference>
              <el-button type="danger" class="ele-btn-icon" link 
                v-if="row.status === 2">
                <span>模拟到账</span>
              </el-button>
            </template>
</el-popconfirm> -->
          <!-- <el-popconfirm title="确认发起提现转账吗？" @confirm="doSimulate(row, 'transfer')">
            <template #reference>
              <el-button type="danger" class="ele-btn-icon" link >
                <span>发起提现转账</span>
              </el-button>
            </template>
          </el-popconfirm> -->
          <el-popconfirm :title="t('user.payWithdraw.simulateSuccessConfirm')" @confirm="doSimulate(row, 'success')">
            <template #reference>
              <el-button type="success" class="ele-btn-icon" link v-if="[0, 6, 7].includes(row.status)" v-permission="'user:payWithdraw:simulateSuccess'">
                <span>{{ t('user.payWithdraw.table.simulateSuccess') }}</span>
              </el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm :title="t('user.payWithdraw.simulateFailConfirm')" @confirm="doSimulate(row, 'fail')">
            <template #reference>
              <el-button type="danger" class="ele-btn-icon" link v-if="[0, 6, 7].includes(row.status)" v-permission="'user:payWithdraw:simulateFail'">
                <span>{{ t('user.payWithdraw.table.simulateFail') }}</span>
              </el-button>
            </template>
          </el-popconfirm>
          <div v-if="[7, 8, 10, 11].includes(row.status) && !row.replayOrderNo && !row.refund">
            <!-- <el-divider direction="vertical" /> -->
            <el-popconfirm :title="t('user.payWithdraw.replayConfirm')" @confirm="handleReplay(row)">
              <template #reference>
                <el-button type="warning" class="ele-btn-icon" link v-permission="'user:payWithdraw:replay'">
                  <span>{{ t('user.payWithdraw.table.replay') }}</span>
                </el-button>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </ele-pro-table>
    </ele-card>
    <PayWithdrawInfo :data="current" v-model="showInfo" @done="reload" />
    <PayWithdrawAudit :data="current" v-model="showAudit" @done="reload" />
  </ele-page>

</template>

<script lang="ts" setup>
import { ref } from "vue";
import { UploadOutlined } from '@/components/icons';
import { EleMessage, type EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import PayWithdrawSearch from "./components/pay_wihdraw-search.vue";
import PayWithdrawInfo from "./components/pay_wihdraw-info.vue";
import PayWithdrawAudit from "./components/pay_wihdraw-audit.vue";
import { pagePayWithdraws, exportPayWithdraw, simulateSuccess, executeWithdraw, simulateFail, replayApi } from "@/api/user/payWithdrawApi";
import type { PayWithdraw, PayWithdrawParam } from "@/api/model/payWithdraw";
import { handleDownload } from "@/utils/file-util";
import { toDateZone } from "@/utils/utils";
import { ElMessage } from "element-plus";
import { useI18n } from 'vue-i18n';
import { addSecret } from '@/utils/common';
const { t } = useI18n();
const setOrderStatus = (status: number) => {
  switch (status) {
    case 0://待审核
      return 'primary'
    case 1://审核中
      return 'warning'
    case 2://审核通过
      return 'success'
    case 3://审核未通过
      return 'danger'
    case 4://转账成功
      return 'success'
    case 5://转账失败
      return 'danger'
    default:
      return 'info'
  }
}

/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof PayWithdrawSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  {
    prop: "id",
    label: t('user.payWithdraw.table.id'),
    width: 50,
    align: 'center',
    fixed: 'left',
  },
  {
    prop: "uid",
    label: t('user.payWithdraw.table.uid'),
    minWidth: 110,
    align: 'center',
    fixed: 'left',
  },
  {
    prop: "orderNo",
    label: t('user.payWithdraw.table.orderNo'),
    minWidth: 110,
    align: 'center',
  },
  {
    prop: "transactionId",
    label: t('user.payWithdraw.table.transactionId'),
    minWidth: 110,
    align: 'center',
  },
  // {
  //   prop: 'channelType',
  //   slot: 'channelType',
  //   label: t('user.payWithdraw.table.channelType'),
  //   // minWidth: 90,
  //   align: 'center'
  //   },
  {
    label: t('user.payWithdraw.table.currency'),
    prop: 'currency',
    align: 'center',
    // formatter: (row) => {
    //   return row.currency == 0 ? t('user.payWithdraw.table.currency0') : t('user.payWithdraw.table.currency1');
    // }
  },
  {
    prop: "amount",
    label: t('user.payWithdraw.table.amount'),
    minWidth: 110,
    align: 'center',
  },
  {
    prop: "fee",
    label: t('user.payWithdraw.table.fee'),
    minWidth: 110,
    align: 'center',
  },
  {
    prop: "payChannelId",
    slot: "payChannelId",
    label: t('user.payWithdraw.table.payChannelId'),
    minWidth: 110,
    align: 'center',
  },
  {
    prop: "phone",
    label: t('user.payWithdraw.table.phone'),
    width: 110,
    align: 'center',
    formatter: (row) => addSecret(row.phone)
  },
  {
    prop: "status",
    slot: "status",
    label: t('user.payWithdraw.table.status'),
    minWidth: 110,
    align: 'center',
  },
  {
    prop: "refund",
    slot: "refund",
    label: t('user.payWithdraw.table.refund'),
    minWidth: 110,
    align: 'center',
  },
  {
    prop: "replayOrderNo",
    label: t('user.payWithdraw.table.replayOrderNo'),
    minWidth: 110,
    align: 'center',
  },
  {
    prop: "autoAuditHitIndicator",
    label: t('user.payWithdraw.table.autoAuditHitIndicator'),
    minWidth: 110,
    align: 'center',
  },
  {
    prop: "createTime",
    formatter: (row) => {
      return toDateZone(row.createTime, row.countryCode);
    },
    label: t('user.payWithdraw.table.createTime'),
    minWidth: 110,
    align: 'center',
  },
  {
    prop: "auditor",
    label: t('user.payWithdraw.table.auditor'),
    minWidth: 110,
    align: 'center',
  },
  {
    prop: "auditTime",
    formatter: (row) => {
      return toDateZone(row.auditTime, row.countryCode);
    },
    label: t('user.payWithdraw.table.auditTime'),
    minWidth: 110,
    align: 'center',
  },
  {
    prop: "updateTime",
    formatter: (row) => {
      return toDateZone(row.updateTime, row.countryCode);
    },
    label: t('user.payWithdraw.table.updateTime'),
    minWidth: 110,
    align: 'center',
  },
  {
    prop: "kycStatus",
    slot: "kycStatus",
    label: t('user.payWithdraw.table.kycStatus'),
    minWidth: 110,
    align: 'center',
  },
  {
    prop: "remark",
    label: t('user.payWithdraw.table.remark'),
    minWidth: 110,
    align: 'center',
  },
  {
    prop: "action",
    label: t('action.action'),
    width: 200,
    align: "center",
    slot: "action",
    fixed: 'right',
  }
]);

/** 表格选中数据 */
const selections = ref<PayWithdraw[]>([]);

/** 当前编辑数据 */
const current = ref<PayWithdraw | null>(null);

/** 是否显示编辑弹窗 */
const showInfo = ref(false);



/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  where = { ...where, orderName: orders.order, sortName: orders.sort };
  return pagePayWithdraws({
    ...where,
    ...orders,
    ...pages
  });
};

/** 搜索 */
const reload = (where?: PayWithdrawParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

/** 打开详情弹窗 */
const openInfo = (row?: PayWithdraw) => {
  current.value = row ?? null;
  showInfo.value = true;
};
const showAudit = ref(false);
/** 打开审核弹窗 */
const openAudit = (row: PayWithdraw, simulate: boolean) => {
  current.value = row ?? null;
  if (current.value) {
    current.value.simulate = simulate;
    showAudit.value = true;
  }
};
/* 模拟到账 */
const doSimulate = (row: PayWithdraw, type: string) => {
  const loading = EleMessage.loading({
    message: '请求中..',
    plain: true
  });

  let params = {
    orderNo: row.orderNo || '',
  }
  let apiType: any;
  switch (type) {
    case 'success':
      apiType = simulateSuccess;
      break;
    case 'fail':
      apiType = simulateFail;
      break;
    case 'transfer':
      apiType = executeWithdraw;
      break;
    default:
      break;
  }
  apiType(params)
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
// 人工补单
const handleReplay = (row: PayWithdraw) => {
  const loading = EleMessage.loading({
    message: '请求中..',
    plain: true
  });

  let params = {
    orderNo: row.orderNo || '',
  }
  replayApi(params)
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
// 导出
const doExcelExport = () => {
  // exportPayWithdraw(searchRef.value!.searchParams()).then((res) => {
  //   handleDownload('提现记录', res.data as any);
  // });
    exportPayWithdraw({ ...searchRef.value!.searchParams() }, 'TXJL').then((res) => {
    ElMessage.success(res);
  });
};
</script>
<!-- 是否缓存当前页面 -->
<script lang="ts">
export default {
  name: 'PayWithdraw'
};
</script>
