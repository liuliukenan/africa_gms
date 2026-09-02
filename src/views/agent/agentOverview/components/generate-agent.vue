<template>
  <ele-pro-table ref="tableRef" row-key="id" :pagination="false" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :headerEllipsis="false" :footer-style="{ paddingBottom: '16px' }" cache-key="proGameDataCount" :tools="[]"> </ele-pro-table>
</template>

<script lang="ts" setup>
  import { ref, watch, computed } from 'vue';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, Column, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { getGeneralAgentTop10 } from '@/api/agent/agentOverviewApi';
  import { AgentOverviewParam, GeneralAgentTop10 } from '@/api/agent/model/agentOverview';
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
      prop: 'rank',
      label: '排名',
      // width: 70,
      align: 'center'
    },
    {
      prop: 'agentId',
      label: '代理ID',
      // minWidth: 110,
      align: 'center'
    },
    {
      prop: 'totalProfit',
      label: '累计返利',
      // minWidth: 110,
      align: 'center',
    //   sortable: 'custom'
    },
    {
      prop: 'profit0',
      label: 'CPA模式',
      // minWidth: 110,
      align: 'center'
    },
    {
      prop: 'profit1',
      label: 'RS模式',
      // minWidth: 110,
      align: 'center',
    //   sortable: 'custom'
    },
    {
      prop: 'teamNetRecharge',
      label: '团队净充值额',
      // minWidth: 110,
      align: 'center'
    }
  ]);

  /** 表格选中数据 */
  const selections = ref<GeneralAgentTop10[]>([]);

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
    return getGeneralAgentTop10({
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
</script>

<script lang="ts">
  export default {
    name: 'GenerateAgentTop10'
  };
</script>
