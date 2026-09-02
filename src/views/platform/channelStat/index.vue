<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <channel-stat-search ref="searchRef" style="margin-bottom: -14px" @search="reload" :type="type" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="type === 0 ? chanelColumns : dateColumns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" cache-key="channelStatTable" :show-summary="type == 0 ? true : false" size="small" :summary-method="getSummaries">
        <template #toolbar>
          <el-space>
            <el-button-group>
              <el-button :type="type === 0 ? 'primary' : 'info'" @click="handleClick(0)"> 按渠道 </el-button>
              <el-button :type="type === 1 ? 'primary' : 'info'" @click="handleClick(1)">按日期</el-button>
            </el-button-group>
          </el-space>
          <span style="margin-left: 10px">
            <el-popconfirm title="确认导出表格数据吗？" @confirm="openExport()">
              <template #reference>
                <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">导出</el-button>
              </template>
            </el-popconfirm>
          </span>
        </template></ele-pro-table
      >
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Column, Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import ChannelStatSearch from './components/channel-stat-search.vue';
  import { pageChannelStat, pageChannelDateStat, exportChannelStat, exportChannelDateStat } from '@/api/platform/channelStatApi';
  import type { ChannelStatVO, ChannelStatQuery } from '@/api/platform/model/channelStat';
  import { UploadOutlined } from '@/components/icons';
  import { toDateString } from '@/utils/utils';
  import { formatNumber } from '@/utils/common';
  import { ElMessage } from 'element-plus';
  import { withTooltipHeader } from '@/utils/table';

  const { t } = useI18n();
  const type = ref<number>(0);
  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);
  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof ChannelStatSearch> | null>(null);
  /** 表格选中数据 */
  const selections = ref<ChannelStatVO[]>([]);

  /** 按渠道-表格列配置 */
  const chanelColumns = ref<Columns>([
    // {
    //     prop: 'id',
    //     label: '序号',
    //     width: 70,
    //     align: 'center',
    //     fixed: 'left'
    // },
    {
      prop: 'channel',
      renderHeader: withTooltipHeader(t('platform.channelStat.channelTable.channel'), t('monitoringReport.channelStat.channelTooltips.channel')),
      width: 90,
      align: 'center'
    },
    {
      prop: 'channelName',
      renderHeader: withTooltipHeader(t('platform.channelStat.channelTable.channelName'), t('monitoringReport.channelStat.channelTooltips.channelName')),
      minWidth: 120,
      align: 'center'
    },
    {
      prop: 'channelCreateTime',
      formatter: (row: ChannelStatVO) => toDateString(row.channelCreateTime),
      renderHeader: withTooltipHeader(t('platform.channelStat.channelTable.channelCreateTime'), t('monitoringReport.channelStat.channelTooltips.channelCreateTime')),
      minWidth: 160,
      align: 'center'
    },
    {
      prop: 'topAgentCount',
      renderHeader: withTooltipHeader(t('platform.channelStat.channelTable.topAgentCount'), t('monitoringReport.channelStat.channelTooltips.topAgentCount')),
      minWidth: 100,
      align: 'center'
    },
    {
      prop: 'normalAgentCount',
      renderHeader: withTooltipHeader(t('platform.channelStat.channelTable.normalAgentCount'), t('monitoringReport.channelStat.channelTooltips.normalAgentCount')),
      minWidth: 100,
      align: 'center'
    },
    {
      prop: 'userCount',
      renderHeader: withTooltipHeader(t('platform.channelStat.channelTable.userCount'), t('monitoringReport.channelStat.channelTooltips.userCount')),
      minWidth: 90,
      align: 'center'
    },
    {
      prop: 'rechargeUserCount',
      renderHeader: withTooltipHeader(t('platform.channelStat.channelTable.rechargeUserCount'), t('monitoringReport.channelStat.channelTooltips.rechargeUserCount')),
      minWidth: 100,
      align: 'center'
    },
    {
      prop: 'rechargeAmount',
      renderHeader: withTooltipHeader(t('platform.channelStat.channelTable.rechargeAmount'), t('monitoringReport.channelStat.channelTooltips.rechargeAmount')),
      minWidth: 120,
      align: 'center'
    },
    {
      prop: 'withdrawUserCount',
      renderHeader: withTooltipHeader(t('platform.channelStat.channelTable.withdrawUserCount'), t('monitoringReport.channelStat.channelTooltips.withdrawUserCount')),
      minWidth: 100,
      align: 'center'
    },
    {
      prop: 'withdrawAmount',
      renderHeader: withTooltipHeader(t('platform.channelStat.channelTable.withdrawAmount'), t('monitoringReport.channelStat.channelTooltips.withdrawAmount')),
      minWidth: 120,
      align: 'center'
    },
    {
      prop: 'netRechargeAmount',
      renderHeader: withTooltipHeader(t('platform.channelStat.channelTable.netRechargeAmount'), t('monitoringReport.channelStat.channelTooltips.netRechargeAmount')),
      minWidth: 120,
      align: 'center'
    },
    {
      prop: 'profitRate',
      renderHeader: withTooltipHeader(t('platform.channelStat.channelTable.profitRate'), t('monitoringReport.channelStat.channelTooltips.profitRate')),
      minWidth: 100,
      align: 'center'
    }
  ]);
  /** 按日期-表格列配置 */
  const dateColumns = ref<Columns>([
    // {
    //     prop: 'id',
    //     label: '序号',
    //     width: 70,
    //     align: 'center',
    //     fixed: 'left'
    // },
    {
      prop: 'channelName',
      renderHeader: withTooltipHeader(t('platform.channelStat.dateTable.channelName'), t('monitoringReport.channelStat.dateTooltips.channelName')),
      minWidth: 120,
      align: 'center'
    },
    {
      prop: 'statDate',
      renderHeader: withTooltipHeader(t('platform.channelStat.dateTable.statDate'), t('monitoringReport.channelStat.dateTooltips.statDate')),
      width: 90,
      align: 'center'
    },
    {
      prop: 'newTopAgentCount',
      renderHeader: withTooltipHeader(t('platform.channelStat.dateTable.newTopAgentCount'), t('monitoringReport.channelStat.dateTooltips.newTopAgentCount')),
      minWidth: 120,
      align: 'center'
    },
    {
      prop: 'newNormalAgentCount',
      renderHeader: withTooltipHeader(t('platform.channelStat.dateTable.newNormalAgentCount'), t('monitoringReport.channelStat.dateTooltips.newNormalAgentCount')),
      minWidth: 120,
      align: 'center'
    },
    {
      prop: 'newUserCount',
      renderHeader: withTooltipHeader(t('platform.channelStat.dateTable.newUserCount'), t('monitoringReport.channelStat.dateTooltips.newUserCount')),
      minWidth: 120,
      align: 'center'
    },
    {
      prop: 'activeUserCount',
      renderHeader: withTooltipHeader(t('platform.channelStat.dateTable.activeUserCount'), t('monitoringReport.channelStat.dateTooltips.activeUserCount')),
      minWidth: 120,
      align: 'center'
    },
    {
      prop: 'firstPayUserCount',
      renderHeader: withTooltipHeader(t('platform.channelStat.dateTable.firstPayUserCount'), t('monitoringReport.channelStat.dateTooltips.firstPayUserCount')),
      minWidth: 120,
      align: 'center'
    },
    {
      prop: 'firstPayAmount',
      renderHeader: withTooltipHeader(t('platform.channelStat.dateTable.firstPayAmount'), t('monitoringReport.channelStat.dateTooltips.firstPayAmount')),
      minWidth: 120,
      align: 'center'
    },
    {
      prop: 'rechargeUserCount',
      renderHeader: withTooltipHeader(t('platform.channelStat.dateTable.rechargeUserCount'), t('monitoringReport.channelStat.dateTooltips.rechargeUserCount')),
      minWidth: 120,
      align: 'center'
    },
    {
      prop: 'rechargeAmount',
      renderHeader: withTooltipHeader(t('platform.channelStat.dateTable.rechargeAmount'), t('monitoringReport.channelStat.dateTooltips.rechargeAmount')),
      minWidth: 120,
      align: 'center'
    },
    {
      prop: 'withdrawUserCount',
      renderHeader: withTooltipHeader(t('platform.channelStat.dateTable.withdrawUserCount'), t('monitoringReport.channelStat.dateTooltips.withdrawUserCount')),
      minWidth: 120,
      align: 'center'
    },
    {
      prop: 'withdrawAmount',
      renderHeader: withTooltipHeader(t('platform.channelStat.dateTable.withdrawAmount'), t('monitoringReport.channelStat.dateTooltips.withdrawAmount')),
      minWidth: 120,
      align: 'center'
    },
    {
      prop: 'netRechargeAmount',
      renderHeader: withTooltipHeader(t('platform.channelStat.dateTable.netRechargeAmount'), t('monitoringReport.channelStat.dateTooltips.netRechargeAmount')),
      minWidth: 120,
      align: 'center'
    },
    {
      prop: 'profitRate',
      renderHeader: withTooltipHeader(t('platform.channelStat.dateTable.profitRate'), t('monitoringReport.channelStat.dateTooltips.profitRate')),
      minWidth: 120,
      align: 'center'
    }
  ]);

  /** 按渠道数据源 */
  const chanelDatasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageChannelStat({
      ...where,
      ...orders,
      ...pages
    } as ChannelStatQuery);
  };
  /** 按日期数据源 */
  const DateDatasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageChannelDateStat({
      ...where,
      ...orders,
      ...pages
    } as ChannelStatQuery);
  };
  /** 表格数据源  */
  const datasource = ref<DatasourceFunction>(chanelDatasource);
  /** 搜索/刷新 */
  const reload = (where?: Partial<ChannelStatQuery>) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };
  const handleClick = (value: number) => {
    type.value = value;

    if (!value) {
      datasource.value = chanelDatasource;
    } else {
      datasource.value = DateDatasource;
    }
  };
  const openExport = () => {
    if (type.value === 0) {
      exportChannelStat({ ...searchRef.value!.searchParams() }, 'QDTJ-chanel').then((res) => {
        ElMessage.success(res);
      });
    } else {
      exportChannelDateStat({ ...searchRef.value!.searchParams() }, 'QDTJ-date').then((res) => {
        ElMessage.success(res);
      });
    }
  };
  /** 表格合计行,  */
  const getSummaries = ({ columns, data }) => {
    const sums: string[] = [];
    const labelIndex = 0;

    const profitRateSum = data.reduce((acc, item) => acc + (Number(item.profitRate) || 0), 0);

    columns.forEach((column: Column, index: number) => {
      if (index === labelIndex) {
        sums[index] = '合计';
      } else if (column.property === 'profitRate') {
        sums[index] = (profitRateSum * 100).toFixed(2) + '%' || '0.00%';
      } else if (!['channel', 'channelName', 'channelCreateTime'].includes(column.property as string)) {
        const total = data.reduce((prev: number, curr: ChannelStatVO) => {
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
    name: 'ChannelStat'
  };
</script>
