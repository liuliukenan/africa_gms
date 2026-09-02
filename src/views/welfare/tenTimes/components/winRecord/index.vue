<template>
    <ele-page>
        <!-- <el-descriptions class="margin-top" title="用户参与统计" :column="4" border direction="vertical"
            style="margin-bottom:20px ;">
            <el-descriptions-item label="总参与人次" align="center">2</el-descriptions-item>
            <el-descriptions-item label="总中奖次数" align="center">1</el-descriptions-item>
            <el-descriptions-item label="总发放奖金" align="center">1</el-descriptions-item>
        </el-descriptions> -->
        <search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
        <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
            :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
            :export-config="{ fileName: 'VIP', datasource: exportSource }" :print-config="{ datasource: exportSource }"
            :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
        </ele-pro-table>
        <!-- </ele-card> -->
        <!-- <Info :title="titleType" :data="current" v-model="showInfo" @done="reload" />
        <Info :title="titleType" :data="current" v-model="showInfo" @done="reload" /> -->
    </ele-page>

</template>

<script lang="ts" setup>
import { ref } from "vue";
import { EleMessage } from "ele-admin-plus/es";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
// import { PlusOutlined } from "@/components/icons";
import Search from "./search.vue";
// import Info from "./info.vue";
import { pageTenTimesRecord } from '@/api/welfare/tenTimes';
import type { TenTimesRecord,TenTimesRecordParam } from "@/api/welfare/model";
import { sendConfServer } from '@/api/conf';

/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof Search> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);
/** 表格列配置 */
const columns = ref<Columns>([
    {
        prop: "uid",
        label: "用户ID",
        // width: 60,
        align: 'center',
    },
    {
        prop: "username",
        label: "用户名",
        // width: 60,
        align: 'center',
    }, {
        prop: "orderNo",
        label: "订单号",
        // minWidth: 110,
        align: 'center',
    },

    {
        prop: "amount",
        label: "充值金额",
        // minWidth: 110,
        align: 'center',
    },

    {
        prop: "targetAmount",
        label: "获得金额",
        // minWidth: 110,
        align: 'center',
    },
    {
        prop: "gold",
        label: "金币数量",
        // minWidth: 110,
        align: 'center',
    },
    {
        prop: "status",
        formatter: (row: any) => row.status === 1 ? '中奖' : '未中奖',
        label: "状态",
        // minWidth: 110,
        align: 'center',
    },
    {
        prop: "userFlag",
        formatter: (row: any) => row.userFlag === 1 ? '机器人' : '真人',
        label: "是否机器人",
        // minWidth: 110,
        align: 'center',
    },
    {
        prop: "createTime",
        label: "时间",
        // width: 60,
        align: 'center',
    },
]);

/** 表格选中数据 */
const selections = ref<TenTimesRecord[]>([]);

/** 当前编辑数据 */
const current = ref<TenTimesRecord | null>(null);

/** 是否显示编辑弹窗 */
const showInfo = ref(false);
const titleType = ref(0);


/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageTenTimesRecord({
        ...where,
        ...orders,
        ...pages
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
// 发送到服务器
const sendServer = () => {
    const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
    });
    sendConfServer(19)
        .then((msg) => {
            loading.close();
            EleMessage.success(msg);
        })
        .catch((e) => {
            loading.close();
            EleMessage.error(e.message);
        });
};

/** 导出和打印全部数据的数据源 */
const exportSource: DatasourceFunction = ({ where, orders }) => {
    return pageTenTimesRecord({
        ...where,
        ...orders
    });
};
</script>
