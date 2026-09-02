<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <OperationSearch ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :max-height="650" 
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
        :export-config="{ fileName: '用户登录留存分析', datasource: exportSource }" :print-config="{ datasource: exportSource }"
        :footer-style="{ paddingBottom: '16px' }" cache-key="appGameCountTable" size="small"
        :tools="['reload', 'columns', 'maximized']">
         <template #channelType="{ row }">
          <dict-data code="channelNewType" valueType="number" type="tag" v-model="row.channelType"  />
        </template>
        <template #toolbar>
          <el-space>
            <el-button-group>
              <el-button :type="type === 0 ? 'primary' : 'info'" @click="handleClick(0)"> 比率 </el-button>
              <el-button :type="type === 1 ? 'primary' : 'info'" @click="handleClick(1)">人数</el-button>
            </el-button-group>
          </el-space>
          <span style="margin-left: 10px;">
            <el-popconfirm title="确认导出表格数据吗？" @confirm="openExport()">
              <template #reference>
                <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">导出</el-button>
              </template>
            </el-popconfirm>
          </span>
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
import OperationSearch from "./components/operation-search.vue";
import { pageUserLoginRetention, pageUserLoginRetentionRate, exportLoginRetention, exportLoginRetentionRate } from "@/api/operateAnalysis/userAnalysis/loginApi";
import type { LoginRetention, LoginRetentionParam } from "@/api/operateAnalysis/userAnalysis/model/login";
import dayjs from "dayjs";
import { UploadOutlined } from "@/components/icons";
import { useConfigStore } from "@/store/modules/config";
import { ElMessage } from "element-plus";
import { withTooltipHeader } from "@/utils/table";

const { t } = useI18n();
/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);
/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof OperationSearch> | null>(null);
/** 表格列配置 */
const columns = ref<Columns>([
  {
    prop: "statDate",
    renderHeader: withTooltipHeader(t('user.login.table.statDate'), t('monitoringReport.loginRetention.tooltips.statDate')),
    align: 'center',
    fixed: 'left',
  },
  // {
  //   prop: 'channelType',
  //   slot: 'channelType',
  //   label: t('monitoringReport.loginRetention.table.channelType'),
  //   // minWidth: 90,
  //   align: 'center'
  // },
  {
    prop: "userCount",
    renderHeader: withTooltipHeader(t('user.login.table.userCount'), t('monitoringReport.loginRetention.tooltips.userCount')),
    align: 'center',
  },
  {
    prop: "retention1d",
    renderHeader: withTooltipHeader('day1', t('monitoringReport.loginRetention.tooltips.retention1d')),
    align: 'center',
  },
  {
    prop: "retention2d",
    renderHeader: withTooltipHeader('day2', t('monitoringReport.loginRetention.tooltips.retention2d')),
    align: 'center',
  },
  {
    prop: "retention3d",
    renderHeader: withTooltipHeader('day3', t('monitoringReport.loginRetention.tooltips.retention3d')),
    align: 'center',
  },
  {
    prop: "retention4d",
    renderHeader: withTooltipHeader('day4', t('monitoringReport.loginRetention.tooltips.retention4d')),
    align: 'center',
  },
  {
    prop: "retention5d",
    renderHeader: withTooltipHeader('day5', t('monitoringReport.loginRetention.tooltips.retention5d')),
    align: 'center',
  },
  {
    prop: "retention6d",
    renderHeader: withTooltipHeader('day6', t('monitoringReport.loginRetention.tooltips.retention6d')),
    align: 'center',
  },
  {
    prop: "retention7d",
    renderHeader: withTooltipHeader('day7', t('monitoringReport.loginRetention.tooltips.retention7d')),
    align: 'center',
  },
  {
    prop: "retention14d",
    renderHeader: withTooltipHeader('day14', t('monitoringReport.loginRetention.tooltips.retention14d')),
    align: 'center',
  },
  {
    prop: "retention30d",
    renderHeader: withTooltipHeader('day30', t('monitoringReport.loginRetention.tooltips.retention30d')),
    align: 'center',
  },
  {
    prop: "retention60d",
    renderHeader: withTooltipHeader('day60', t('monitoringReport.loginRetention.tooltips.retention60d')),
    align: 'center',
  },
  {
    prop: "retention90d",
    renderHeader: withTooltipHeader('day90', t('monitoringReport.loginRetention.tooltips.retention90d')),
    align: 'center',
  },
]);

/** 表格选中数据 */
const selections = ref<LoginRetention[]>([]);
const configStore = useConfigStore();
// 默认搜索条件
const defaultWhere = reactive({
  startDate: dayjs().subtract(14, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
  endDate: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
  countryCode: configStore.countryArr?.[0]?.code || '',
  userType: 6,//新增用户
});

/** 人数数据源 */
const datasourceCount: DatasourceFunction = ({ pages, where, orders }) => {
  return pageUserLoginRetention({
    ...defaultWhere,
    ...where,
    ...orders,
    ...pages
  });
};

/** 比率数据源 */
const datasourceRate: DatasourceFunction = ({ pages, where, orders }) => {
  return pageUserLoginRetentionRate({
    ...defaultWhere,
    ...where,
    ...orders,
    ...pages
  });
};

/** 表格数据源  */
const datasource = ref<DatasourceFunction>(datasourceRate);
/** 导出/打印数据源 */
const exportSource = ref<DatasourceFunction>(datasourceRate);
const type = ref<number>(0);

const handleClick = (value: number) => {
  type.value = value;

  if (!value) {
    datasource.value = datasourceRate;
    exportSource.value = datasourceRate;
  } else {
    datasource.value = datasourceCount;
    exportSource.value = datasourceCount;
  }
};
const openExport = () => {
  if (type.value === 0) {
    exportLoginRetentionRate({ ...searchRef.value!.searchParams() }, 'DLLCFX-rate').then((res) => {
      ElMessage.success(res);
    });
  } else {
    exportLoginRetention({ ...searchRef.value!.searchParams() }, 'DLLCFX-person').then((res) => {
      ElMessage.success(res);
    });
  }
};
/** 搜索 */
const reload = (where?: LoginRetentionParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};
</script>
<style scoped>
.red {
  color: red;
}
</style>