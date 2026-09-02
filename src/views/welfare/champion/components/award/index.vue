<template>
    <ele-page>
        <award-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
        <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
            :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
            :headerEllipsis="false" :export-config="{ fileName: '冠军中奖记录', datasource: exportSource }"
            :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }"
            cache-key="proAwardHistory">
             <template #action="{ row }">
                <el-link type="warning" :underline="false" @click="openEdit(row)"> 详情</el-link> 
            </template>
        </ele-pro-table>
        <award-info :data="current" v-model="showInfo" @done="reload" />
    </ele-page>

</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import AwardSearch from "./components/award-search.vue";
import AwardInfo from "./components/award-info.vue";
import { pageAward } from "@/api/welfare/champion";
import type { ChampionRecords, AwardParam } from "@/api/welfare/model/index";


/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof AwardSearch> | null>(null);

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
        prop: "username",
        label: "用户名",
        // minWidth: 90,
        align: 'center',
    },
    {
        prop: "gameId",
        label: "游戏ID",
        // minWidth: 90,
        align: 'center',
    },
    {
        prop: "gameName",
        label: "游戏名称",
        // minWidth: 90,
        align: 'center',
    },
    {
        prop: "periodName",
        label: "排期名称",
        // minWidth: 90,
        align: 'center',
    },
    {
        prop: "periodNum",
        label: "排期序号",
        // minWidth: 90,
        align: 'center',
    },
    {
        prop: "ranking",
        label: "排名",
        // minWidth: 90,
        align: 'center',
    },
    {
        prop: "userFlag",
        formatter: (row: any) => row.userFlag === 1 ? '机器人' : '真人',
        label: "用户标识",
        // minWidth: 110,
        align: 'center',
    },
    {
        prop: "muti",
        label: "倍率",
        // minWidth: 70,
        align: 'center',
    },
    {
        prop: "totalBet",
        label: "下注",
        // minWidth: 70,
        align: 'center',
    },
    {
        prop: "totalWin",
        label: "赢取",
        // minWidth: 70,
        align: 'center',
    },
    {
        prop: "amount",
        label: "奖金",
        // minWidth: 70,
        align: 'center',
    },
    {
        label: '创建时间',
        prop: 'createTime',
        align: 'center',
        // minWidth: 90
    },
    {
        label: "操作",
        width: 100,
        prop: 'action',
        align: "center",
        slot: "action",
        fixed: 'right',
        hideInPrint: true,
        hideInExport: true
    }
]);

/** 表格选中数据 */
const selections = ref<ChampionRecords[]>([]);

/** 当前编辑数据 */
const current = ref<ChampionRecords | null>(null);

/** 是否显示编辑弹窗 */
const showInfo = ref(false);

/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageAward({
        ...where,
        ...orders,
        ...pages
    });
};

/** 搜索 */
const reload = (where?: AwardParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
};
const currentId = ref(0)
/** 打开编辑弹窗 */
const openEdit = (row: ChampionRecords) => {
     current.value = row ?? null;
     showInfo.value = true;
};
/** 导出和打印全部数据的数据源 */
const exportSource: DatasourceFunction = ({ where, orders }) => {
    where = { lotteryType: 0, ...where }
    return pageAward({
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