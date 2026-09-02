<template>
    <ele-page>
        <BalanceEcharts ref="balanceEchartsRef" />
        <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
            :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
            :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable"
            :tools="['reload', 'columns', 'maximized']">
        </ele-pro-table>
    </ele-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useI18n } from 'vue-i18n';
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
// import { PlusOutlined } from "@/components/icons";
import Search from "./search.vue";
import BalanceEcharts from "./components/banlance-echarts.vue";
// import { pageTenTimesRecord } from '@/api/welfare/tenTimes';
import type { TenTimesRecord, TenTimesRecordParam } from "@/api/welfare/model";

const { t } = useI18n();

/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof Search> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);
/** 表格列配置 */
const columns = ref<Columns>([
    {
        prop: "gameType",
        label: t('user.userList.balance.time'),
        // width: 60,
        align: 'center',
    },
    {
        prop: "rtp",
        label: t('user.userList.balance.beforeAmount'),
        // width: 60,
        align: 'center',
    },
    {
        prop: "rtpExcept",
        label: t('user.userList.balance.changeAmount'),
        // minWidth: 110,
        align: 'center',
    },
    {
        prop: "gdp",
        label: t('user.userList.balance.afterAmount'),
        // minWidth: 110,
        align: 'center',
    },
    {
        prop: "gdpExcept",
        label: t('user.userList.balance.type'),
        // minWidth: 110,
        align: 'center',
    },
    {
        prop: "totalBet",
        label: t('user.userList.balance.target'),
        // minWidth: 110,
        align: 'center',
    },
]);
const curUid = ref(0);
/** 表格选中数据 */
const selections = ref<TenTimesRecord[]>([]);

/** 当前编辑数据 */
const current = ref<TenTimesRecord | null>(null);

/** 是否显示编辑弹窗 */
const showInfo = ref(false);
const titleType = ref(0);


/** 表格数据源 */
const datasource: DatasourceFunction = () => {
    // return pageTenTimesRecord({
    //     ...where,
    //     ...orders,
    //     ...pages
    // });
     return Promise.resolve({
            records: [],
            total: 0
        });
};

/** 搜索 */
const reload = (where?: TenTimesRecordParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
};

/** 打开详情弹窗 */
const openInfo = (type: number, row?: TenTimesRecord) => {
    current.value = row ?? null;
    titleType.value = type
    showInfo.value = true;
};
</script>
