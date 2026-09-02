<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <company-game-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
        :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable"
        :tools="['reload', 'density', 'columns', 'maximized']">
        <template #toolbar>
          <el-popconfirm :title="t('common.sureExport')" @confirm="doExcelExport()" width="250px">
            <template #reference>
              <el-button type="warning" :icon="UploadOutlined">{{t('action.export')}}</el-button>
            </template>
          </el-popconfirm>
        </template>
        <!-- <template #currency="{ row }">
          <el-tooltip :content="JSON.stringify(row.currency)" placement="top" popper-class="custom-tooltip"
            effect="light">
            <div class="ellipsis">{{ JSON.stringify(row.currency) }}</div>
          </el-tooltip>
        </template> -->
      </ele-pro-table>
    </ele-card>
  </ele-page>

</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import { UploadOutlined } from "@/components/icons";
import CompanyGameSearch from "./components/company-game-search.vue";
import { exportCompanyGame, pageCompanyGames } from "@/api/platform/companyGameApi";
import type { CompanyGame, CompanyGameParam } from "@/api/platform/model/companyGame";
import { handleDownload } from "@/utils/file-util";
import { toDateString } from "@/utils/utils";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof CompanyGameSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  {
    prop: "id",
    label: t('platform.companyGame.id'),
    width: 70,
    align: 'center',
    fixed: 'left',
  },
  {
    prop: "gameUid",
    label:  t('platform.companyGame.gameUid'),
    // minWidth: 110,
    align: 'left',
  },
  {
    prop: "companyId",
    label:  t('platform.companyGame.companyId'),
    width: 110,
    align: 'center',
  },
  {
    prop: "gameName",
    label:  t('platform.companyGame.gameName'),
    // minWidth: 110,
    align: 'left',
  },
  {
    prop: "gameType",
    label:  t('platform.companyGame.gameType'),
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "lang",
    label:  t('platform.companyGame.lang'),
    // minWidth: 110,
    align: 'left',
  },
  {
    prop: "status",
    label:  t('platform.companyGame.status'),
    formatter: (row) => row.status === 1 ?  t('action.yes') :   t('action.no'),
    width: 110,
    align: 'center',
  },
  {
    prop: "currency",
    slot: "currency",
    label:  t('platform.companyGame.currency'),
    minWidth: 150,
    align: 'left',
  },

  {
    prop: "factoryCode",
    label:  t('platform.companyGame.factoryCode'),
    // minWidth: 110,
    align: 'center',
  },
  // {
  //   prop: "jsonInfo",
  //   label: "原始信息",
  //   // minWidth: 110,
  //   align: 'left',
  // },
  {
    label:  t('platform.companyGame.createTime'),
    prop: 'createTime',
    formatter: (row) => toDateString(row.createTime),
    align: 'left',
    // minWidth: 110
  }
]);

/** 表格选中数据 */
const selections = ref<CompanyGame[]>([]);

/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageCompanyGames({
    ...where,
    ...orders,
    ...pages
  });
};

/** 搜索 */
const reload = (where?: CompanyGameParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};
const doExcelExport = () => {
  exportCompanyGame().then((res) => {
    handleDownload(t('platform.companyGame.thirdGame'), res.data as any);
  });
};
</script>
<style lang="scss">
.ellipsis {
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

// .custom-tooltip {
//   max-width: 500px;
// }</style>
