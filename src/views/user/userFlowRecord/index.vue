<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <FlowRecordSearch ref="searchRef" style="margin-bottom: -14px" @search="reload" :flow-type="activeTab" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"  :header-ellipsis="false"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
        :footer-style="{ paddingBottom: '16px' }" cache-key="userFlowRecord" size="small" :max-height="600"
        :tools="['reload', 'columns', 'maximized']" :pagination="{ pageSize: 30 }">
        <template #toolbar>
          <el-space>
            <el-tabs v-model="activeTab" @tab-click="handleTabClick" type="card">
              <el-tab-pane :label="t('user.userFlowRecord.tab.common')" name="common" />
              <el-tab-pane :label="t('user.userFlowRecord.tab.game')" name="game" />
              <el-tab-pane :label="t('user.userFlowRecord.tab.group')" name="group" />
            </el-tabs>
          </el-space>
          <el-popconfirm :title="exportTitle" @confirm="openExport" width="250px">
            <template #reference>
              <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined"
                style="margin-left: 20px;margin-top: 5px;">
                {{ t('action.export') }}
              </el-button>
            </template>
          </el-popconfirm>
        </template>
        <template #flowType="{ row }">
          <dict-data :code="flowTypeDictCode" v-model="row.flowType" valueType="string" type="tag" />
        </template>
        <template #createTime="{ row }">
          <div>{{toDateZone(row.createTime, row.countryCode)||'--'}}</div>
          <div>{{toDateZone(row.updateTime, row.countryCode)||'--'}}</div>
        </template>
        <template #status="{ row }">
          <el-tag :type="row.status === 0 ? 'warning' : row.status === 1 ? 'success' : 'info'">
            {{ row.status === 0 ? t('user.userFlowRecord.status.inProgress') : row.status === 1 ? t('user.userFlowRecord.status.completed') : t('user.userFlowRecord.status.closed') }}
          </el-tag>
        </template>
        <template #withdrawDeducted="{ row }">
          <el-tag :type="row.withdrawDeducted ? 'danger' : 'success'">
            {{ row.withdrawDeducted ? t('user.userFlowRecord.withdrawStatus.deducted') : t('user.userFlowRecord.withdrawStatus.normal') }}
          </el-tag>
        </template>
      </ele-pro-table>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import FlowRecordSearch from "./components/flow-record-search.vue";
import { pageCommonFlowList, exportCommonFlowList } from "@/api/user/commonFlowListApi";
import { pageGameFlowList, exportGameFlowList } from "@/api/user/gameFlowListApi";
import { pageGroupFlowList, exportGroupFlowList } from "@/api/user/groupFlowListApi";
import type { CommonFlowRecordVO, CommonFlowRecordParam } from "@/api/user/model/commonFlowList";
import type { GameFlowRecordVO, GameFlowRecordParam } from "@/api/user/model/gameFlowList";
import type { GroupFlowRecordVO, GroupFlowRecordParam } from "@/api/user/model/groupFlowList";
import dayjs from "dayjs";
import { UploadOutlined } from "@/components/icons";
import { useConfigStore } from "@/store/modules/config";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import { toDateZone } from "@/utils/utils";
import { addSecret } from "@/utils/common.js";
const { t } = useI18n();

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);
/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof FlowRecordSearch> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  {
    prop: "id",
    label: t('user.userFlowRecord.table.id'),
    width: 80,
    align: "left",
    fixed: "left",
  },
  {
    prop: "uid",
    label: t('user.userFlowRecord.table.uid'),
    minWidth: 100,
    align: "left",
  },
  {
    prop: "nickname",
    label: t('user.userFlowRecord.table.nickname'),
    minWidth: 110,
    align: "left",
  },
  {
    prop: "phone",
    label: t('user.userFlowRecord.table.phone'),
    formatter: (row) => addSecret(row.phone),
    minWidth: 110,
    align: "left",
  },
  {
    prop: "companyId",
    label: t('user.userFlowRecord.table.companyId'),
    minWidth: 100,
    align: "left",
  },
  {
    prop: "gameGroupId",
    label: t('user.userFlowRecord.table.gameGroupId'),
    minWidth: 110,
    align: "left",
  },
  {
    prop: "gameId",
    label: t('user.userFlowRecord.table.gameId'),
    minWidth: 100,
    align: "left",
  },
  {
    prop: "initAmount",
    label: t('user.userFlowRecord.table.initAmount'),
    minWidth: 110,
    align: "left",
  },
  {
    prop: "flowMultiple",
    label: t('user.userFlowRecord.table.flowMultiple'),
    minWidth: 100,
    align: "left",
  },
  {
    prop: "requiredFlow",
    label: t('user.userFlowRecord.table.requiredFlow'),
    minWidth: 110,
    align: "left",
  },
  {
    prop: "remainingFlow",
    label: t('user.userFlowRecord.table.remainingFlow'),
    minWidth: 110,
    align: "left",
  },
  {
    prop: "lockAmount",
    label: t('user.userFlowRecord.table.lockAmount'),
    minWidth: 110,
    align: "left",
  },
  {
    prop: "flowType",
    slot: "flowType",
    label: t('user.userFlowRecord.table.flowType'),
    minWidth: 130,
    align: "left",
  },
  {
    prop: "status",
    slot: "status",
    label: t('user.userFlowRecord.table.status'),
    minWidth: 90,
    align: "center",
  },
  {
    prop: "businessId",
    label: t('user.userFlowRecord.table.businessId'),
    minWidth: 140,
    align: "left",
  },
  {
    prop: "withdrawDeducted",
    slot: "withdrawDeducted",
    label: t('user.userFlowRecord.table.withdrawDeducted'),
    minWidth: 100,
    align: "center",
  },
  {
    prop: "remark",
    label: t('user.userFlowRecord.table.remark'),
    minWidth: 120,
    align: "left",
  },
  {
    prop: "createTime",
    slot: "createTime",
    label: t('user.userFlowRecord.table.createTime'),
    // formatter: (row) => toDateZone(row.createTime, row.countryCode),
    minWidth: 160,
    align: "center",
  },
]);

/** 表格选中数据 */
type FlowRecordVO = CommonFlowRecordVO | GameFlowRecordVO | GroupFlowRecordVO;
const selections = ref<FlowRecordVO[]>([]);

const configStore = useConfigStore();

/** 默认搜索条件 */
const defaultWhere = reactive({
  countryCode: configStore.countryArr?.[0]?.code || "",
  startDate: dayjs().subtract(7, "day").startOf("day").format("YYYY-MM-DD HH:mm:ss"),
  endDate: dayjs().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
});

/** 通用流水数据源 */
const datasourceCommon: DatasourceFunction = ({ pages, where, orders }) => {
  return pageCommonFlowList({ ...defaultWhere, ...where, ...orders, ...pages });
};

/** 游戏流水数据源 */
const datasourceGame: DatasourceFunction = ({ pages, where, orders }) => {
  return pageGameFlowList({ ...defaultWhere, ...where, ...orders, ...pages });
};

/** 分组流水数据源 */
const datasourceGroup: DatasourceFunction = ({ pages, where, orders }) => {
  return pageGroupFlowList({ ...defaultWhere, ...where, ...orders, ...pages });
};

/** 表格数据源 */
const datasource = ref<DatasourceFunction>(datasourceCommon);
/** 当前激活的Tab */
const activeTab = ref<string>("common");
/** 流水类型字典编码 */
const flowTypeDictCode = ref<string>("flow_type_common");

const exportTitle = ref(t('user.userFlowRecord.exportConfirmCommon'));
/** Tab切换 */
const handleTabClick = (tab: any) => {
  selections.value = [];
  switch (tab.paneName) {
    case "common":
      datasource.value = datasourceCommon;
      // flowTypeDictCode.value = "flow_type_common";
      exportTitle.value = t('user.userFlowRecord.exportConfirmCommon');
      break;
    case "game":
      datasource.value = datasourceGame;
      // flowTypeDictCode.value = "flow_type_game";
      exportTitle.value = t('user.userFlowRecord.exportConfirmGame');
      break;
    case "group":
      datasource.value = datasourceGroup;
      // flowTypeDictCode.value = "flow_type_group";
      exportTitle.value = t('user.userFlowRecord.exportConfirmGroup');
      break;
  }
};
/** 导出 */
const openExport = () => {
  const params = { ...searchRef.value!.searchParams() };
  switch (activeTab.value) {
    case "common":
      exportCommonFlowList(params, "TYLSJL").then((res) => { ElMessage.success(res); });
      break;
    case "game":
      exportGameFlowList(params, "YXLSJL").then((res) => { ElMessage.success(res); });
      break;
    case "group":
      exportGroupFlowList(params, "FZLSJL").then((res) => { ElMessage.success(res); });
      break;
  }
};

/** 搜索 */
const reload = (where?: CommonFlowRecordParam | GameFlowRecordParam | GroupFlowRecordParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};
</script>

<script lang="ts">
export default {
  name: 'userFlowRecord'
};
</script>
<style scoped lang="scss">
::v-deep .el-tabs__item.is-active {
  background: #1677ff;
  color: #ffffff;
}
</style>
