<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <PaymentWithdrawSearch ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :headerEllipsis="false"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
        :export-config="{ fileName: '充提分析表', datasource: exportSource }" :print-config="{ datasource: exportSource }"
        :footer-style="{ paddingBottom: '16px' }" cache-key="appGameCountTable" size="small">
        <!-- :summary-method="getSummaries" -->
        <template #toolbar>
          <el-popconfirm title="确认导出表格数据吗？" @confirm="openExport()">
            <template #reference>
              <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">导出</el-button>
            </template>
          </el-popconfirm>
        </template>
      </ele-pro-table>
    </ele-card>
  </ele-page>

</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useI18n } from 'vue-i18n';
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import PaymentWithdrawSearch from "./components/paymentWithdraw-search.vue";
import { pagePaymentWithdraw, exportPaymentWithdraw } from "@/api/operateAnalysis/economicAnalysis/paymentWithdrawApi";
import type { PaymentWithdraw, PaymentWithdrawParam } from "@/api/operateAnalysis/economicAnalysis/model/paymentWithdraw";
import dayjs from "dayjs";
import { UploadOutlined } from '@/components/icons';
import { useConfigStore } from "@/store/modules/config";
import { ElMessage } from "element-plus";
import { withTooltipHeader } from "@/utils/table";

const { t } = useI18n();

/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof PaymentWithdrawSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  {
    prop: "statDate",
    renderHeader: withTooltipHeader(t('economicAnalysis.paymentWithdraw.table.statDate'), t('monitoringReport.paymentWithdraw.tooltips.statDate')),
    // width: 60,
    align: 'center',
    fixed: 'left',
  },
  {
    prop: "paymentInitiateUserCount",
    renderHeader: withTooltipHeader(t('economicAnalysis.paymentWithdraw.table.paymentInitiateUserCount'), t('monitoringReport.paymentWithdraw.tooltips.paymentInitiateUserCount')),
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "paymentSuccessUserCount",
    renderHeader: withTooltipHeader(t('economicAnalysis.paymentWithdraw.table.paymentSuccessUserCount'), t('monitoringReport.paymentWithdraw.tooltips.paymentSuccessUserCount')),
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "paymentInitiateOrderCount",
    renderHeader: withTooltipHeader(t('economicAnalysis.paymentWithdraw.table.paymentInitiateOrderCount'), t('monitoringReport.paymentWithdraw.tooltips.paymentInitiateOrderCount')),
    // minWidth: 110,
    align: 'center',
  },

  {
    prop: "paymentSuccessOrderCount",
    renderHeader: withTooltipHeader(t('economicAnalysis.paymentWithdraw.table.paymentSuccessOrderCount'), t('monitoringReport.paymentWithdraw.tooltips.paymentSuccessOrderCount')),
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "paymentSuccessRate",
    renderHeader: withTooltipHeader(t('economicAnalysis.paymentWithdraw.table.paymentSuccessRate'), t('monitoringReport.paymentWithdraw.tooltips.paymentSuccessRate')),
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "paymentSuccessAmount",
    renderHeader: withTooltipHeader(t('economicAnalysis.paymentWithdraw.table.paymentSuccessAmount'), t('monitoringReport.paymentWithdraw.tooltips.paymentSuccessAmount')),
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "paymentSuccessAverageAmount",
    renderHeader: withTooltipHeader(t('economicAnalysis.paymentWithdraw.table.paymentSuccessAverageAmount'), t('monitoringReport.paymentWithdraw.tooltips.paymentSuccessAverageAmount')),
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "withdrawInitiateUserCount",
    renderHeader: withTooltipHeader(t('economicAnalysis.paymentWithdraw.table.withdrawInitiateUserCount'), t('monitoringReport.paymentWithdraw.tooltips.withdrawInitiateUserCount')),
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "withdrawSuccessUserCount",
    renderHeader: withTooltipHeader(t('economicAnalysis.paymentWithdraw.table.withdrawSuccessUserCount'), t('monitoringReport.paymentWithdraw.tooltips.withdrawSuccessUserCount')),
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "withdrawInitiateOrderCount",
    renderHeader: withTooltipHeader(t('economicAnalysis.paymentWithdraw.table.withdrawInitiateOrderCount'), t('monitoringReport.paymentWithdraw.tooltips.withdrawInitiateOrderCount')),
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "withdrawSuccessOrderCount",
    renderHeader: withTooltipHeader(t('economicAnalysis.paymentWithdraw.table.withdrawSuccessOrderCount'), t('monitoringReport.paymentWithdraw.tooltips.withdrawSuccessOrderCount')),
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "withdrawSuccessRate",
    renderHeader: withTooltipHeader(t('economicAnalysis.paymentWithdraw.table.withdrawSuccessRate'), t('monitoringReport.paymentWithdraw.tooltips.withdrawSuccessRate')),
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "withdrawSuccessAmount",
    renderHeader: withTooltipHeader(t('economicAnalysis.paymentWithdraw.table.withdrawSuccessAmount'), t('monitoringReport.paymentWithdraw.tooltips.withdrawSuccessAmount')),
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "withdrawSuccessAverageAmount",
    renderHeader: withTooltipHeader(t('economicAnalysis.paymentWithdraw.table.withdrawSuccessAverageAmount'), t('monitoringReport.paymentWithdraw.tooltips.withdrawSuccessAverageAmount')),
    // minWidth: 110,
    align: 'center',
  },
]);

/** 表格选中数据 */
const selections = ref<PaymentWithdraw[]>([]);

const configStore = useConfigStore();
// 默认搜索条件
const defaultWhere = reactive({
  startDate: dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
  endDate: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
  countryCode: configStore.countryArr?.[0]?.code || '',
  userType: 1,
});

/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pagePaymentWithdraw({
    ...defaultWhere,
    ...where,
    ...orders,
    ...pages
  });
};

/** 搜索 */
const reload = (where?: PaymentWithdrawParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};
const openExport = () => {
  exportPaymentWithdraw({ ...searchRef.value!.searchParams() }, 'CTFX').then((res) => {
     ElMessage.success(res);
  });
};
/** 导出和打印全部数据的数据源 */
const exportSource: DatasourceFunction = ({ where, orders }) => {
  return pagePaymentWithdraw({
    ...where,
    ...orders
  });
};
</script>
<style scoped>
.red {
  color: red;
}
</style>
