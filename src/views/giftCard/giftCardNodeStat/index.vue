<template>
  <ele-card :body-style="{ padding: '20px' }">
    <el-descriptions title="核销维度" border :column="mobile ? 1 : 4">
      <template #title>
        <div class="title title1">核销维度:</div>
      </template>
      <el-descriptions-item label="已生成">{{ statData.totalGenerated }}</el-descriptions-item>
      <el-descriptions-item label="已核销">{{ statData.totalUsed }}</el-descriptions-item>
      <el-descriptions-item label="核销率">
        {{ statData.totalGenerated ? (((statData.totalUsed ?? 0) / (statData.totalGenerated ?? 1)) * 100).toFixed(2) + '%' : '--' }}
      </el-descriptions-item>
      <el-descriptions-item label="累计发放总额">{{ statData.totalUsedAmount }}</el-descriptions-item>
    </el-descriptions>
    <!-- 各系列表现 -->
    <div class="title">各系列表现:</div>
    <ele-pro-table ref="tableRef" row-key="serieId" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" :tools="['reload', 'columns', 'maximized']" cache-key="giftCardStatTable" />
  </ele-card>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useMobile } from '@/utils/use-mobile';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { giftStatTotal, giftStatSerie } from '@/api/giftCard/giftCardSerieApi';
  import type { GiftCardSerieStatVO } from '@/api/giftCard/model/giftCardSerie';

  const { mobile } = useMobile();

  const statData = ref<GiftCardSerieStatVO>({});

  onMounted(() => {
    loadData();
  });

  const loadData = async () => {
    try {
      const res = await giftStatTotal();
      statData.value = res || {};
    } catch (error) {
      console.error(error);
    }
  };

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'serieId',
      label: '系列ID',
      align: 'center'
    },
    {
      prop: 'name',
      label: '系列名称',
      align: 'center'
    },
    {
      prop: 'amount',
      label: '单张面额',
      align: 'center'
    },
    {
      prop: 'useStrategy',
      label: '使用策略',
      align: 'center',
      formatter: (row) => (row.useStrategy === 1 ? '永久一次' : row.useStrategy === 2 ? '每日一次' : '--')
    },
    {
      prop: 'totalGenerated',
      label: '总生成数',
      align: 'center'
    },
    {
      prop: 'totalUsed',
      label: '已核销数',
      align: 'center'
    },
    {
      prop: 'totalVoid',
      label: '已作废数',
      align: 'center'
    },
    {
      prop: 'totalPending',
      label: '待使用数',
      align: 'center'
    },
    {
      prop: 'totalGeneratedAmount',
      label: '生成总金额',
      align: 'center'
    },
    {
      prop: 'totalUsedAmount',
      label: '核销总金额',
      align: 'center'
    },
    {
      prop: 'totalVoidAmount',
      label: '作废总金额',
      align: 'center'
    },
    {
      prop: 'totalPendingAmount',
      label: '待使用总金额',
      align: 'center'
    }
  ]);

  /** 表格选中数据 */
  const selections = ref<GiftCardSerieStatVO[]>([]);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return giftStatSerie({
      ...where,
      ...orders,
      ...pages
    });
  };
</script>

<style lang="scss" scoped>
  .title,
  .title1 {
    font-size: 20px;
    font-weight: bold;
    margin: 25px 0 10px;
  }

  .title1 {
    margin: 0;
  }

  :deep(.el-descriptions .el-descriptions__table.is-bordered tr > .el-descriptions__cell) {
    width: 10%;
  }
</style>
