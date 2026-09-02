<template>
    <ele-page>
        <lottery-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
        <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
            :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
            :headerEllipsis="false" :export-config="{ fileName: '邮件记录', datasource: exportSource }"
            :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }"
            cache-key="proHistory">
            <template #hundred="{ row }">
                {{ row.hundred }} {{ row.ten }} {{ row.unit }}
            </template>
            <template #status="{ row }">
                {{ row.status ? '已开奖' : '未开奖' }}
            </template>
            <template #awardResult="{ row }">
                <dict-data code="lotteryWinType" valueType="number" type="tag" v-model="row.awardResult"
                    :typeColor="row.awardResult == 1 ? 'danger' : (row.awardResult == 2 ? 'warning' : 'info')" />
            </template>
        </ele-pro-table>
        <lottery-edit :data="currentId" v-model="showEdit" @done="reload" />
    </ele-page>

</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import LotterySearch from "./components/lottery-search.vue";
import LotteryEdit from "./components/lottery-edit.vue";
import { pageBet } from "@/api/welfare/dailyLottery";
import type { Bet, BetParam } from "@/api/welfare/model/index";


/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof LotterySearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);
/** 表格列配置 */
const columns = ref<Columns>([
    {
        prop: "uid",
        label: "用户ID",
        // width: 70,
        align: 'center',
        fixed: 'left',
    },
    {
        prop: "periods",
        label: "期数",
        // minWidth: 70,
        align: 'center',
    },
    {
        prop: "hundred",
        slot: "hundred",
        label: "开奖号码",
        // minWidth: 90,
        align: 'center',
    },
    {
        prop: "awardNum",
        label: "中奖号码",
        // minWidth: 90,
        align: 'center',
    },
    {
        prop: "userFlag",
        formatter: (row: any) => row.userFlag === 1 ? '机器人' : '真人',
        label: "状态",
        // minWidth: 110,
        align: 'center',
    },
    {
        prop: "status",
        slot: "status",
        label: "状态",
        // minWidth: 70,
        align: 'center',
    },
    {
        prop: "awardResult",
        slot: "awardResult",
        label: "中奖结果",
        // minWidth: 70,
        align: 'center',
    },
    {
        prop: "awardAmount",
        label: "获取金额",
        // minWidth: 70,
        align: 'center',
    },
    {
        label: '创建时间',
        prop: 'createTime',
        align: 'center',
        // minWidth: 90
    },
    // {
    //     label: "操作",
    //     width: 100,
    //     prop: 'action',
    //     align: "center",
    //     slot: "action",
    //     fixed: 'right',
    //     hideInPrint: true,
    //     hideInExport: true
    // }
]);

/** 表格选中数据 */
const selections = ref<Bet[]>([]);

/** 当前编辑数据 */
const current = ref<Bet | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);

/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    where = { lotteryType: 0, ...where }
    return pageBet({
        ...where,
        ...orders,
        ...pages
    });
};

/** 搜索 */
const reload = (where?: BetParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
};
const currentId = ref(0)
/** 打开编辑弹窗 */
const openEdit = (row: Bet) => {
    if (row.id) {
        currentId.value = row.id;
        showEdit.value = true;
    }

};
/** 导出和打印全部数据的数据源 */
const exportSource: DatasourceFunction = ({ where, orders }) => {
    where = { lotteryType: 0, ...where }
    return pageBet({
        ...where,
        ...orders
    });
};
</script>

<script lang="ts">
export default {
    name: 'History'
};
</script>
<style lang="scss" scoped>
::v-deep .el-tabs--border-card>.el-tabs__content {
    height: calc(100vh - 190px);
}
</style>