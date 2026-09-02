<template>
    <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true"
        :border="true" v-model:selections="selections" :highlight-current-row="true" :headerEllipsis="false"
        :export-config="{ fileName: '列表', datasource: exportSource }" :print-config="{ datasource: exportSource }"
        :footer-style="{ paddingBottom: '16px' }" cache-key="proGameDataCount" :show-summary="true"
        :summary-method="getSummaries" :tools="['reload', 'columns', 'maximized']">
        <!-- <template #action="{ row }">
            <el-link type="primary" :underline="false" @click="openInfo(row)">
                详情
            </el-link>
        </template> -->
    </ele-pro-table>
    <!-- </ele-page> -->
</template>

<script lang="ts" setup>
import { reactive, ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { EleProTable } from 'ele-admin-plus';
import type { Columns, Column, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
import Search from './search.vue';
import type { GameData, GameDataParam } from '@/api/dashboard/model/workplace';
import { gameDataApi } from "@/api/dashboard/workplace";
import { formatNumber } from '@/utils/common';
import { withTooltipHeader } from '@/utils/table';
const { t } = useI18n();
// import dayjs from 'dayjs';
const props = defineProps<{
    /** 修改回显的数据 */
    searchForm?: any | null;
}>();

/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof Search> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
    {
        prop: 'factoryCode',
        renderHeader: withTooltipHeader(t('dashboard.workplace.gameDataTable.factoryCode'), t('dashboard.workplace.gameDataTooltips.factoryCode')),
        // width: 70,
        align: 'center'
    },
    {
        prop: 'gameGroupName',
        renderHeader: withTooltipHeader(t('dashboard.workplace.gameDataTable.gameGroupName'), t('dashboard.workplace.gameDataTooltips.gameGroupName')),
        // minWidth: 110,
        align: 'center',
    },
    {
        prop: 'gameId',
        renderHeader: withTooltipHeader(t('dashboard.workplace.gameDataTable.gameId'), t('dashboard.workplace.gameDataTooltips.gameId')),
        // minWidth: 110,
        align: 'center',
        sortable: 'custom'
    },
    {
        prop: 'gameName',
        renderHeader: withTooltipHeader(t('dashboard.workplace.gameDataTable.gameName'), t('dashboard.workplace.gameDataTooltips.gameName')),
        // minWidth: 110,
        align: 'center',
    },
    {
        prop: 'betAmount',
        renderHeader: withTooltipHeader(t('dashboard.workplace.gameDataTable.betAmount'), t('dashboard.workplace.gameDataTooltips.betAmount')),
        // minWidth: 110,
        align: 'center',
        sortable: 'custom'
    },
    {
        prop: 'rewardAmount',
        renderHeader: withTooltipHeader(t('dashboard.workplace.gameDataTable.rewardAmount'), t('dashboard.workplace.gameDataTooltips.rewardAmount')),
        // minWidth: 110,
        align: 'center',
        sortable: 'custom'
    },
    {
        prop: 'ggr',
        renderHeader: withTooltipHeader(t('dashboard.workplace.gameDataTable.ggr'), t('dashboard.workplace.gameDataTooltips.ggr')),
        // minWidth: 110,
        align: 'center',
        // sortable: 'custom'
    },
    {
        prop: 'rtp',
        renderHeader: withTooltipHeader(t('dashboard.workplace.gameDataTable.rtp'), t('dashboard.workplace.gameDataTooltips.rtp')),
        // minWidth: 110,
        align: 'center',
        // sortable: 'custom'
    },

]);

/** 表格选中数据 */
const selections = ref<GameData[]>([]);

// 默认搜索条件
const defaultWhere = computed(() => ({
    type: props.searchForm?.type || 1,
    countryCode: props.searchForm?.countryCode || 254,
    // startDate: dayjs().startOf('month').format('YYYY-MM-DD'),
    // endDate: dayjs().format('YYYY-MM-DD')
}));
/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    where = {
        ...defaultWhere.value,
        ...where,
    };
    return gameDataApi({
        ...where,
        ...orders,
        ...pages
    });
};
watch(() => props.searchForm, () => {
    reload();
}, { deep: true });
/** 搜索 */
const reload = (where?: GameDataParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
};
defineExpose({ reload });
/** 表格合计行,  */
const getSummaries = ({ columns, data }) => {
    const sums: string[] = [];
    const labelIndex = 0;
    // 赔付金额合计
    const rewardAmountSum = data.reduce((acc, item) => acc + (Number(item.rewardAmount) || 0), 0);
    // 投注金额合计
    const betAmountSum = data.reduce((acc, item) => acc + (Number(item.betAmount) || 0), 0);
    columns.forEach((column: Column, index: number) => {
        if (index === labelIndex) {
            sums[index] = t('dashboard.workplace.gameDataTable.total');
        } 
        // GGR合计=投注-赔付
        else if (column.property === 'ggr') {
            sums[index] = formatNumber(betAmountSum - rewardAmountSum);
        }
        //  RTP合计=赔付/投注
        else if (column.property === 'rtp') {
            sums[index] = betAmountSum ? (rewardAmountSum / betAmountSum*100).toFixed(2) + '%' : '0.00%';
        }
        else if (!['uid', 'daykey', 'gameGroupName', 'gameId', 'gameName'].includes(column.property as string)) {
            const total = data
                .map((item: GameData) => Number(item[column.property as string]))
                .reduce((prev: number, curr: number) => {
                    const value = Number(curr);
                    if (!isNaN(value)) {
                        return prev + curr;
                    } else {
                        return prev;
                    }
                }, 0);
            sums[index] = formatNumber(total);
        } else {
            sums[index] = '';
        }
    });
    return sums;
};
/** 导出和打印全部数据的数据源 */
const exportSource: DatasourceFunction = ({ where, orders }) => {
    where = { ...defaultWhere.value, ...where };
    return gameDataApi({
        ...where,
        ...orders
    });
};
</script>

<script lang="ts">
export default {
    name: 'GameDataCount'
};
</script>
