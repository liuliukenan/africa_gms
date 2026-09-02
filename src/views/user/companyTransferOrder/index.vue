<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <company-transfer-order-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :header-ellipsis="false"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :max-height="650" 
        :footer-style="{ paddingBottom: '16px' }" cache-key="companyTransferOrder"  :tools="['reload', 'columns', 'maximized']">
        <!-- <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()">
            新建
          </el-button>
        </template> -->
         <template #toolbar>
          <el-popconfirm :title="t('common.sureExport')" @confirm="openExport()" width="250px">
            <template #reference>
              <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">{{ t('action.export') }}</el-button>
            </template>
          </el-popconfirm>
        </template>
        <template #status="{ row }">
          <dict-data code="company_transfer_status" v-model="row.status" valueType="number" type="tag" />
        </template>
        <template #action="{ row }">
          <!-- 退款 -->
          <el-link v-if="row.status === 2||row.status === 500" type="primary" :underline="false" @click="openRefund(row)">
            {{ t('user.companyTransferOrder.refund') }}
          </el-link>
        </template>
      </ele-pro-table>
    </ele-card>
  </ele-page>

</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { dayjs, ElMessage, ElMessageBox } from "element-plus/es";
import { EleMessage } from "ele-admin-plus/es";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import CompanyTransferOrderSearch from "./components/company-transfer-order-search.vue";
import { pageCompanyTransferOrders, removeCompanyTransferOrder, exportCompanyTransferOrder, refundCompanyTransferOrder } from "@/api/user/companyTransferOrderApi";
import type { CompanyTransferOrder, CompanyTransferOrderParam } from "@/api/user/model/companyTransferOrder";
import { toDateZone } from "@/utils/utils";
import { useI18n } from "vue-i18n";
import { UploadOutlined } from '@/components/icons';
import { useConfigStore } from '@/store/modules/config';
import { addSecret } from '@/utils/common';
const { t } = useI18n();

/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof CompanyTransferOrderSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  {
    prop: "id",
    label: t('user.companyTransferOrder.table.id'),
    width: 80,
    align: 'center',
    fixed: 'left',
  },
  {
    prop: "uid",
    label: t('user.companyTransferOrder.table.uid'),
    minWidth: 90,
    align: 'left',
  },
  {
    prop: "companyId",
    label: t('user.companyTransferOrder.table.companyId'),
    minWidth: 100,
    align: 'left',
  },
  {
    prop: "gameId",
    label: t('user.companyTransferOrder.table.gameId'),
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "phone",
    label: t('user.companyTransferOrder.table.phone'),
    minWidth: 110,
    align: 'left',
    formatter: (row) => addSecret(row.phone)
  },
  {
    prop: "gameName",
    label: t('user.companyTransferOrder.table.gameName'),
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "transferType",
    label: t('user.companyTransferOrder.table.transferType'),
    formatter: (row) => row.transferType === 1 ? t('user.companyTransferOrder.transferTypeIn') : t('user.companyTransferOrder.transferTypeOut'),
    minWidth: 100,
    align: 'left',
  },
  // {
  //   prop: "transferId",
  //   label: "转账ID",
  //   minWidth: 170,
  //   align: 'left',
  // },
  {
    prop: "creditAmount",
    label: t('user.companyTransferOrder.table.creditAmount'),
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "status",
    slot: "status",
    label: t('user.companyTransferOrder.table.status'),
    // formatter: (row) => row.status === 0 ? '创建' : row.status === 1 ? '成功' : row.status === 2 ? '失败' : row.status === 3 ? '手动成功' : '未知异常',
    minWidth: 110,
    align: 'left',
  },
  // {
  //   prop: "gameUid",
  //   label: "三方游戏ID",
  //   minWidth: 170,
  //   align: 'left',
  // },
  // {
  //   label: '主钱包金额',
  //   prop: 'cashAmount',
  //   minWidth: 110,
  //   align: 'center',
  // },
  // {
  //   label: '分类钱包金额',
  //   prop: 'categoryAmount',
  //   minWidth: 110,
  //   align: 'center',
  // },
  // {
  //   label: '游戏钱包金额',
  //   prop: 'gameAmount',
  //   minWidth: 110,
  //   align: 'center',
  // },
  // {
  //   label: '分类钱包ID',
  //   prop: 'categoryWalletId',
  //   minWidth: 110,
  //   align: 'center',
  // },
  // {
  //   label: '游戏钱包ID',
  //   prop: 'gameWalletId',
  //   minWidth: 110,
  //   align: 'center',
  // },
  // {
  //   label: '转账前钱包余额',
  //   align: 'center',
  //   prop: 'beforeWalletAmount',
  //   children: [
  //     {
  //       prop: "beforeCashAmount",
  //       label: "主钱包",
  //       minWidth: 90,
  //       align: 'center',
  //     },
  //     {
  //       prop: "beforeCategoryAmount",
  //       label: "分类钱包",
  //       minWidth: 90,
  //       align: 'center',
  //     },
  //     {
  //       prop: "beforeGameAmount",
  //       label: "游戏钱包",
  //       minWidth: 90,
  //       align: 'center',
  //     },
  //   ]
  // },
  // {
  //   label: '转账后钱包余额',
  //   align: 'center',
  //   prop: 'afterWalletAmount',
  //   children: [
  //     {
  //       prop: "afterCashAmount",
  //       label: "主钱包",
  //       minWidth: 90,
  //       align: 'center',
  //     },
  //     {
  //       prop: "afterCategoryAmount",
  //       label: "分类钱包",
  //       minWidth: 90,
  //       align: 'center',
  //     },
  //     {
  //       prop: "afterGameAmount",
  //       label: "游戏钱包",
  //       minWidth: 90,
  //       align: 'center',
  //     },
  //   ]
  // },

  {
    prop: "currencyCode",
    label: t('user.companyTransferOrder.table.currencyCode'),
    minWidth: 110,
    align: 'left',
  },
  // {
  //   prop: "language",
  //   label: "语言",
  //   minWidth: 110,
  //   align: 'left',
  // },
  {
    prop: "thirdAmount",
    label: t('user.companyTransferOrder.table.thirdAmount'),
    align: 'center',
    children: [
      {
        prop: "beforeAmount",
        label: t('user.companyTransferOrder.table.beforeAmount'),
        minWidth: 90,
        align: 'center',
      },
      {
        prop: "afterAmount",
        label: t('user.companyTransferOrder.table.afterAmount'),
        minWidth: 90,
        align: 'center',
      },
    ]
  },

  {
    label: t('user.companyTransferOrder.table.createTime'),
    prop: 'createTime',
    formatter: (row) => toDateZone(row.createTime,row.countryCode),
    align: 'center',
    minWidth: 140
  },
  {
    prop: "remark",
    label: t('user.companyTransferOrder.table.remark'),
    minWidth: 110,
    align: 'left',
  },
  {
    columnKey: "action",
    label: t('user.companyTransferOrder.table.action'),
    width: 120,
    fixed: 'right',
    align: "center",
    slot: "action",
    hideInPrint: true,
    hideInExport: true
  }
]);

/** 表格选中数据 */
const selections = ref<CompanyTransferOrder[]>([]);

/** 当前编辑数据 */
const current = ref<CompanyTransferOrder | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);
  // 初始化store
const configStore = useConfigStore();
// 默认搜索条件
const defaultWhere = reactive({
  countryCode: configStore.countryArr?.[0]?.code || '',
  startDate: dayjs().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
  endDate: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
});
/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageCompanyTransferOrders({
    ...defaultWhere,
    ...where,
    ...orders,
    ...pages
  });
};

/** 搜索 */
const reload = (where?: CompanyTransferOrderParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row?: CompanyTransferOrder) => {
  current.value = row ?? null;
  showEdit.value = true;
};

/** 删除单个 */
const remove = (row: CompanyTransferOrder) => {
  ElMessageBox.confirm(
    '确定要删除“' + row.id + '”吗?',
    '系统提示',
    { type: 'warning', draggable: true }
  )
    .then(() => {
      const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
      });
      removeCompanyTransferOrder(row.id)
        .then((msg) => {
          loading.close();
          EleMessage.success(msg);
          reload();
        })
        .catch((e) => {
          loading.close();
          EleMessage.error(e.message);
        });
    })
    .catch(() => {
    });
};


/** 退款 */
const openRefund = (row: CompanyTransferOrder) => {
  ElMessageBox.prompt(t('user.companyTransferOrder.refundRemark'), t('user.companyTransferOrder.refundTitle'), {
    confirmButtonText: t('action.confirm'),
    cancelButtonText: t('action.cancel'),
    inputType: 'textarea',
    inputPlaceholder: t('user.companyTransferOrder.refundPlaceholder'),
    draggable: true,
    inputValidator: (value) => {
      if (!value || !value.trim()) {
        return t('user.companyTransferOrder.refundRemarkRequired');
      }
      return true;
    }
  })
    .then(({ value }) => {
      const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
      });
      refundCompanyTransferOrder({ id: row.id, remark: value.trim() })
        .then((msg) => {
          loading.close();
          EleMessage.success(msg);
          reload();
        })
        .catch((e) => {
          loading.close();
          EleMessage.error(e.message);
        });
    })
    .catch(() => {});
};

/** 导出和打印全部数据的数据源 */
const exportSource: DatasourceFunction = ({ where, orders }) => {
  return pageCompanyTransferOrders({
    ...where,
    ...orders
  });
};
// 导出
const openExport = () => {
  exportCompanyTransferOrder({ ...searchRef.value!.searchParams() }, 'ZZJL').then((res) => {
     ElMessage.success(res);
  });
};
</script>
<script lang="ts">
export default {
  name: 'companyTransferOrder'
};
</script>
