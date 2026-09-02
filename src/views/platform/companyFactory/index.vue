<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <company-factory-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections"
        :tools="['reload', 'density', 'columns', 'maximized']" :highlight-current-row="true"
        :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
      </ele-pro-table>
    </ele-card>
  </ele-page>

</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import CompanyFactorySearch from "./components/company-factory-search.vue";
import { pageCompanyFactorys } from "@/api/platform/companyFactoryApi";
import type { CompanyFactory, CompanyFactoryParam } from "@/api/platform/model/companyFactory";
import { toDateString } from "@/utils/utils";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof CompanyFactorySearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  {
    prop: "id",
    label: t('platform.companyFactory.id'),
    width: 60,
    align: 'center',
    fixed: 'left',
  },
  {
    prop: "companyId",
    label: t('platform.companyFactory.companyId'),
    width: 80,
    align: 'center',
  },
  {
    prop: "name",
    label: t('platform.companyFactory.name'),
    formatter: (row) => row.name + " (" + row.code + " )",
    width: 140,
    align: 'center',
  },
  {
    prop: "status",
    label: t('platform.companyFactory.status'),
    formatter: (row) => row.status === 1 ? t('action.yes') : t('action.no'),
    width: 110,
    align: 'center',
  },
  {
    prop: "lang",
    label: t('platform.companyFactory.lang'),
    // minWidth: 110,
    align: 'left',
  },
  {
    prop: "currency",
    label: t('platform.companyFactory.currency'),
    minWidth: 180,
    align: 'left',
  },

  // {
  //   prop: "jsonInfo",
  //   label: "三方返回的完整数据",
  //   // minWidth: 110,
  //   align: 'center',
  // },


  {
    label: t('platform.companyFactory.createTime'),
    prop: 'createTime',
    formatter: (row) => toDateString(row.createTime),
    align: 'center',
    width: 110
  },
  // {
  //   columnKey: "action",
  //   label: "操作",
  //   width: 200,
  //   align: "center",
  //   slot: "action",
  //   hideInPrint: true,
  //   hideInExport: true
  // }
]);

/** 表格选中数据 */
const selections = ref<CompanyFactory[]>([]);

/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageCompanyFactorys({
    ...where,
    ...orders,
    ...pages
  });
};

/** 搜索 */
const reload = (where?: CompanyFactoryParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

</script>
