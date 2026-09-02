<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <OperationSearch ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :max-height="650"
        :export-config="{ fileName: t('user.operation.exportFileName'), datasource: exportSource }" :print-config="{ datasource: exportSource }" :headerEllipsis="false"
        :header-cell-class-name="headerCellClassName"
        :cell-class-name="cellClassName"
        :footer-style="{ paddingBottom: '16px' }" cache-key="appGameCountTable" size="small" :tools="['reload', 'columns', 'maximized']">
        <!-- :summary-method="getSummaries" -->
        <template #channelType="{ row }">
          <dict-data code="channelNewType" valueType="number" type="tag" v-model="row.channelType"  />
        </template>
        <template #toolbar>
          <el-popconfirm :title="t('user.operation.exportTitle')" @confirm="openExport()">
            <template #reference>
              <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">{{ t('user.operation.exportButtonText') }}</el-button>
            </template>
          </el-popconfirm>
        </template>
      </ele-pro-table>
    </ele-card>
  </ele-page>

</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

// 扩展 Column 类型以支持 groupColor
declare module "ele-admin-plus/es/ele-data-table/types" {
  interface Column {
    groupColor?: string;
  }
}
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import OperationSearch from "./components/operation-search.vue";
import { pageOperations, exportOperations } from "@/api/operateAnalysis/monitoringReport/operationApi";
import type { Operation, OperationParam } from "@/api/operateAnalysis/monitoringReport/model/operation";
import dayjs from "dayjs";
import { UploadOutlined } from "@/components/icons";
import { useConfigStore } from "@/store/modules/config";
import { ElMessage } from "element-plus";
import { useI18n } from 'vue-i18n';
import { withTooltipHeader } from "@/utils/table";

const { t } = useI18n();

/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof OperationSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  {
    prop: "statDate",
    renderHeader: withTooltipHeader(t('user.operation.table.statDate'), t('monitoringReport.operation.tooltips.statDate')),
    // width: 60,
    align: 'center',
    fixed: 'left',
  },
  {
    prop: 'channelType',
    slot: 'channelType',
    label: t('user.operation.table.channelType'),
    // minWidth: 90,
    align: 'center'
  },
  {
    prop: "newUsers",
    label: t('user.operation.table.newUsers'),
    // minWidth: 110,
    align: 'center',
    groupColor: 'green',
    children: [
      {
        prop: "newUsers",
        renderHeader: withTooltipHeader(t('user.operation.table.newUsers'), t('monitoringReport.operation.tooltips.newUsers')),
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "newDevices",
        renderHeader: withTooltipHeader(t('user.operation.table.newDevices'), t('monitoringReport.operation.tooltips.newDevices')),
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "newValidUsers",
        renderHeader: withTooltipHeader(t('user.operation.table.newValidUsers'), t('monitoringReport.operation.tooltips.newValidUsers')),
        // minWidth: 110,
        align: 'center',
      },
    ]
  },
  {
    prop: "activeUsers",
    label: t('user.operation.table.activeUsers'),
    // minWidth: 110,
    align: 'center',
    groupColor: 'blue',
    children: [
      {
        prop: "activeUsers",
        renderHeader: withTooltipHeader(t('user.operation.table.activeUsers'), t('monitoringReport.operation.tooltips.activeUsers')),
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "validActiveUsers",
        renderHeader: withTooltipHeader(t('user.operation.table.validActiveUsers'), t('monitoringReport.operation.tooltips.validActiveUsers')),
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "payingActiveUsers",
        renderHeader: withTooltipHeader(t('user.operation.table.payingActiveUsers'), t('monitoringReport.operation.tooltips.payingActiveUsers')),
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "oldActiveUsers",
        renderHeader: withTooltipHeader(t('user.operation.table.oldActiveUsers'), t('monitoringReport.operation.tooltips.oldActiveUsers')),
        // minWidth: 110,
        align: 'center',
      },
    ]
  },
  {
    prop: "newUserPaymentCount",
    label: t('user.operation.table.newUserPaymentCount'),
    // minWidth: 110,
    align: 'center',
    groupColor: 'red',
    children: [
      {
        prop: "newUserPaymentCount",
        renderHeader: withTooltipHeader(t('user.operation.table.rechargeCount'), t('monitoringReport.operation.tooltips.newUserPaymentCount')),
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "newUserPaymentAmount",
        renderHeader: withTooltipHeader(t('user.operation.table.rechargeAmount'), t('monitoringReport.operation.tooltips.newUserPaymentAmount')),
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "newUserPaymentRate",
        renderHeader: withTooltipHeader(t('user.operation.table.paymentRate'), t('monitoringReport.operation.tooltips.newUserPaymentRate')),
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "newUserArpu",
        renderHeader: withTooltipHeader(t('user.operation.table.arpu'), t('monitoringReport.operation.tooltips.newUserArpu')),
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "newUserArppu",
        renderHeader: withTooltipHeader(t('user.operation.table.arppu'), t('monitoringReport.operation.tooltips.newUserArppu')),
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "newUserRepurchaseCount",
        renderHeader: withTooltipHeader(t('user.operation.table.repurchaseCount'), t('monitoringReport.operation.tooltips.newUserRepurchaseCount')),
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "newUserRepurchaseRate",
        renderHeader: withTooltipHeader(t('user.operation.table.repurchaseRate'), t('monitoringReport.operation.tooltips.newUserRepurchaseRate')),
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "firstPaymentUserCount",
        renderHeader: withTooltipHeader(t('user.operation.table.firstPaymentUserCount'), t('monitoringReport.operation.tooltips.firstPaymentUserCount')),
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "firstPaymentAmount",
        renderHeader: withTooltipHeader(t('user.operation.table.firstPaymentAmount'), t('monitoringReport.operation.tooltips.firstPaymentAmount')),
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "firstPaymentArppu",
        renderHeader: withTooltipHeader(t('user.operation.table.firstPaymentArppu'), t('monitoringReport.operation.tooltips.firstPaymentArppu')),
        // minWidth: 110,
        align: 'center',
      },
    ]
  },

  {
    prop: "activeUserPaymentCount",
    label: t('user.operation.table.activeUserPaymentCount'),
    // minWidth: 110,
    align: 'center',
    groupColor: 'purple',
    children: [
      {
        prop: "activeUserPaymentCount",

        renderHeader: withTooltipHeader(t('user.operation.table.rechargeCount'), t('monitoringReport.operation.tooltips.activeUserPaymentCount')),
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "activeUserPaymentAmount",
        renderHeader: withTooltipHeader(t('user.operation.table.rechargeAmount'), t('monitoringReport.operation.tooltips.activeUserPaymentAmount')),
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "activeUserPaymentRate",
        renderHeader: withTooltipHeader(t('user.operation.table.paymentRate'), t('monitoringReport.operation.tooltips.activeUserPaymentRate')),
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "activeUserArpu",
        renderHeader: withTooltipHeader(t('user.operation.table.arpu'), t('monitoringReport.operation.tooltips.activeUserArpu')),
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "activeUserArppu",
        renderHeader: withTooltipHeader(t('user.operation.table.arppu'), t('monitoringReport.operation.tooltips.activeUserArppu')),
        // minWidth: 110,
        align: 'center',
      },
    ]
  },
  {
    prop: "oldUserPaymentCount",
    label: t('user.operation.table.oldUserPaymentCount'),
    // minWidth: 110,
    align: 'center',
    groupColor: 'orange',
    children: [
      {
        prop: "oldUserPaymentCount",
        label: t('user.operation.table.rechargeCount'),
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "oldUserPaymentAmount",
        label: t('user.operation.table.rechargeAmount'),
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "oldUserPaymentRate",
        label: t('user.operation.table.paymentRate'),
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "oldUserArpu",
        label: t('user.operation.table.arpu'),
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "oldUserArppu",
        label: t('user.operation.table.arppu'),
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "oldUserRepurchaseCount",
        label: t('user.operation.table.repurchaseCount'),
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "oldUserRepurchaseRate",
        label: t('user.operation.table.repurchaseRate'),
        // minWidth: 110,
        align: 'center',
      },
    ]
  },
  {
    prop: "withdrawCount",
    label: t('user.operation.table.withdrawCount'),
    // minWidth: 110,
    align: 'center',
    groupColor: 'teal',
    children: [
      {
        prop: "withdrawCount",
        label: t('user.operation.table.withdrawUserCount'),
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "withdrawAmount",
        label: t('user.operation.table.withdrawAmount'),
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "withdrawAverageAmount",
        label: t('user.operation.table.withdrawAverageAmount'),
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "paymentWithdrawDiff",
        label: t('user.operation.table.paymentWithdrawDiff'),
        // minWidth: 110,
        align: 'center',
      },
      {
        prop: "surplusRate",
        label: t('user.operation.table.surplusRate'),
        // minWidth: 110,
        align: 'center',
      },
    ]
  },
]);

/** 表格选中数据 */
const selections = ref<Operation[]>([]);

const configStore = useConfigStore();

// 默认搜索条件
const defaultWhere = reactive({
  startDate: dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
  endDate: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
  countryCode: configStore.countryArr?.[0]?.code || '',
});

/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageOperations({
    ...defaultWhere,
    ...where,
    ...orders,
    ...pages
  });
};

/** 分组列的颜色映射 */
const columnGroupColors = new Map<string, string>();
columns.value.forEach((col: any) => {
  if (col.groupColor && col.children) {
    col.children.forEach((child: any) => {
      columnGroupColors.set(child.prop, col.groupColor);
    });
  }
});

/** 带 children 的列头添加分组背景色 */
const headerCellClassName = ({ column }: { column: any }) => {
  const prop = column.property || column.prop;
  if (prop) {
    const color = columnGroupColors.get(prop);
    if (color) {
      return `group-header-${color}`;
    }
  }
  return '';
};

/** 带 children 的列单元格添加分组背景色 */
const cellClassName = ({ column }: { column: any }) => {
  const prop = column.property || column.prop;
  if (prop) {
    const color = columnGroupColors.get(prop);
    if (color) {
      return `group-cell-${color}`;
    }
  }
  return '';
};

/** 搜索 */
const reload = (where?: OperationParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

const openExport = () => {
  exportOperations({ ...searchRef.value!.searchParams() }, 'YYSJBB').then((res) => {
    ElMessage.success(res);
  });
};
/** 导出和打印全部数据的数据源 */
const exportSource: DatasourceFunction = ({ where, orders }) => {
  return pageOperations({
    ...where,
    ...orders
  });
};
</script>
<style scoped>
.red {
  color: red;
}
/* 新增用户 - 绿色 */
::v-deep .group-header-green {
  background-color: #d8ffdb !important;
}
::v-deep .group-cell-green {
  background-color: #eafdec !important;
}

/* 活跃用户 - 蓝色 */
::v-deep .group-header-blue {
  background-color: #e0f1fd !important;
}
::v-deep .group-cell-blue {
  background-color: #eef3fc !important;
}

/* 新用户付费 - 红色 */
::v-deep .group-header-red {
  /* background-color: #fff8e1 !important; */
  background-color: #fcdddd !important;
}
::v-deep .group-cell-red {
  /* background-color: #fdfcef !important; */
  background-color: #fdefef !important;
}

/* 老用户付费 - 橙色 */
::v-deep .group-header-orange {
  background-color: #fce9cc !important;
}
::v-deep .group-cell-orange {
  background-color: #fff5e9 !important;
}

/* 活跃用户付费 - 紫色橙色 */
::v-deep .group-header-purple {
  background-color: #f3e5f5 !important;
}
::v-deep .group-cell-purple {
  background-color: #f9f3ff !important;
}

/* 提现 - 青色 */
::v-deep .group-header-teal {
  background-color: #d9faf8 !important;
}
::v-deep .group-cell-teal {
  background-color: #ebfffe !important;
}
::v-deep .ele-data-table > .el-table__inner-wrapper .ele-table-tr.current-row > td.el-table__cell {
  background-color: #dae8fd !important;
}
</style>
