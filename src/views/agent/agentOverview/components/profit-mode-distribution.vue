<template>
  <ele-pro-table ref="tableRef" row-key="id" :pagination="false" :columns="columns" :datasource="datasource" :show-summary="true" :summary-method="getSummaries" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :headerEllipsis="false" :footer-style="{ paddingBottom: '16px' }" cache-key="proGameDataCount" :tools="[]"> </ele-pro-table>
</template>

<script lang="ts" setup>
  import { ref, watch, computed } from 'vue';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, Column, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { getProfitModeDistribution } from '@/api/agent/agentOverviewApi';
  import { formatNumber } from '@/utils/common';
  import { AgentOverviewParam, ProfitModeDistribution } from '@/api/agent/model/agentOverview';
  // import dayjs from 'dayjs';
  const props = defineProps<{
    /** 修改回显的数据 */
    searchForm?: any | null;
  }>();

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'commissionModelName',
      label: '返利模式',
      // width: 70,
      align: 'center'
    },
    {
      prop: 'agentCount',
      label: '代理人数',
      // minWidth: 110,
      align: 'center'
    },
    {
      prop: 'ratio',
      label: '占比',
      formatter: (row) => {
        return (row.ratio * 100).toFixed(2) + '%';
      },
      // minWidth: 110,
      align: 'center'
      //   sortable: 'custom'
    }
  ]);

  /** 表格选中数据 */
  const selections = ref<ProfitModeDistribution[]>([]);

  // 默认搜索条件
  const defaultWhere = computed(() => ({
    type: props.searchForm?.type || 1,
    countryCode: props.searchForm?.countryCode || 254
    // startDate: dayjs().startOf('month').format('YYYY-MM-DD'),
    // endDate: dayjs().format('YYYY-MM-DD')
  }));
  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where }) => {
    where = {
      ...defaultWhere.value,
      ...where
    };
    return getProfitModeDistribution({
      ...where,
      ...pages
    });
  };
  watch(
    () => props.searchForm,
    () => {
      reload();
    },
    { deep: true }
  );
  /** 搜索 */
  const reload = (where?: AgentOverviewParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };
  defineExpose({ reload });
  /** 表格合计行,  */
  const getSummaries = ({ columns, data }) => {
    const sums: string[] = [];
    const labelIndex = 0;
    // 占比
    const ratioSum = data.reduce((acc, item) => acc + (Number(item.ratio) || 0), 0);

    columns.forEach((column: Column, index: number) => {
      if (index === labelIndex) {
        sums[index] = '合计';
      } else if (column.property === 'ratio') {
        sums[index] = ratioSum ? (ratioSum * 100).toFixed(2) + '%' : '0.00%';
      } else if (!['commissionModelName'].includes(column.property as string)) {
        const total = data.reduce((prev: number, curr: ProfitModeDistribution) => {
          const value = Number(curr[column.property as string]);
          if (!isNaN(value)) {
            return prev + value;
          }
          return prev;
        }, 0);
        sums[index] = formatNumber(total);
      } else {
        sums[index] = '';
      }
    });
    return sums;
  };
</script>

<script lang="ts">
  export default {
    name: 'GenerateAgentTop10'
  };
</script>
