<template>
    <ele-page>
        <ele-card :body-style="{ paddingTop: '8px' }">
            <WithdrawSearch ref="searchRef" style="margin-bottom: -14px" @search="reload" />
            <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
                :show-overflow-tooltip="true" :border="true" v-model:selections="selections"
                :highlight-current-row="true" :export-config="{ fileName: '提现订单列表', datasource: exportSource }"
                :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }"
                cache-key="withdrawRecordsTable" size="small">
                <template #status="{ row }">
                    <!-- <el-tag :type="getStatusColor(row.status)">{{ getStatusLabel(row.status) }}</el-tag> -->
                    <dict-data code="withdrawStatus" value-type="number" v-model="row.status" type="tag" />
                </template>
                <template #action="{ row }">
                    <el-link type="primary" :underline="false" @click="openAudit(row)" v-if="[0,8,10,11].includes(row.status)">
                        审核
                    </el-link>

                </template>
            </ele-pro-table>
            <WithdrawAudit :data="current" v-model="showAudit" @done="reload" />
        </ele-card>
    </ele-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { EleProTable } from 'ele-admin-plus';
import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
import WithdrawSearch from './components/withdraw-search.vue';
import WithdrawAudit from './components/withdraw-audit.vue';

import { pageWithdrawRecords } from '@/api/agent/withdrawRecordsApi';
import type { WithdrawRecord, WithdrawRecordParam } from '@/api/agent/model/withdrawRecords';
import { addSecret } from '@/utils/common';
import { toDateZone } from '@/utils/utils';

/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof WithdrawSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格选中数据 */
const selections = ref<WithdrawRecord[]>([]);

/** 订单状态颜色 */
const getStatusColor = (status: string) => {
    switch (status) {
        case '0':
            return 'warning';
        case '1':
            return 'success';
        case '2':
            return 'danger';
        case '3':
            return 'primary';
        case '4':
            return 'danger';
        case '5':
        case '6':
            return 'info';
        case '7':
        case '8':
            return 'info';
        case '9':
            return 'warning';
        case '10':
        case '11':
            return 'warning';
        default:
            return 'info';
    }
};

/** 订单状态文本 */
const getStatusLabel = (status: string) => {
    switch (status) {
        case '0':
            return '处理中';
        case '1':
            return '成功';
        case '2':
            return '失败';
        case '3':
            return '待审核';
        case '4':
            return '已拒绝';
        case '5':
            return '退款中';
        case '6':
            return '已退款';
        case '7':
            return '撤销中';
        case '8':
            return '已撤销';
        case '9':
            return '部分退款';
        case '10':
            return '冻结中';
        case '11':
            return '已冻结';
        default:
            return status ?? '';
    }
};

const current = ref<WithdrawRecord | null>(null);
const showAudit = ref(false);
const openAudit = (row: WithdrawRecord) => {
    showAudit.value = true;
    current.value = row;
};
/** 表格列配置 */
const columns = ref<Columns>([
    {
        prop: 'id',
        label: 'ID',
        // minWidth: 90,
        align: 'left'
    },
    // {
    //   prop: 'orderNo',
    //   label: '订单号',
    //   minWidth: 180,
    //   align: 'left'
    // },
    {
        prop: 'agentId',
        label: '代理UID',
        // minWidth: 110,
        align: 'left'
    },
    {
        prop: 'phone',
        label: '手机号',
        // minWidth: 130,
        align: 'left',
        formatter: (row) => addSecret(row.phone)
    },
    {
        prop: 'channel',
        label: '渠道',
        // minWidth: 80,
        align: 'left'
    },
    {
        prop: 'commissionModel',
        label: '分润模式',
        minWidth: 110,
        align: 'left',
        formatter: (row) => {
            switch (row.commissionModel) {
                case 0:
                    return 'CPA';
                case 1:
                    return 'Revenue Share';
                case 2:
                    return 'Hybrid';
                case 3:
                    return 'Turnover';
                default:
                    return '';
            }
        }
    },
    {
        prop: 'currency',
        label: '货币代码',
        //   minWidth: 110,
        align: 'left'
    },
    // {
    //   prop: 'inviterAgentId',
    //   label: '上级代理ID',
    //   minWidth: 110,
    //   align: 'left'
    // },
    // {
    //   prop: 'countryCode',
    //   label: '国家代码',
    //   minWidth: 90,
    //   align: 'left'
    // },
    // {
    //     prop: 'currency',
    //     label: '货币代码',
    //     minWidth: 90,
    //     align: 'left'
    // },

    {
        prop: 'amount',
        label: '提现金额',
        // minWidth: 110,
        align: 'right'
    },
    {
        prop: 'totalAmount',
        label: '已提现金额',
        // minWidth: 110,
        align: 'right'
    },
    {
        prop: 'fee',
        label: '手续费',
        // minWidth: 100,
        align: 'right'
    },
    {
        prop: 'actualAmount',
        label: '实际到账金额',
        // minWidth: 120,
        align: 'right'
    },
    {
        prop: 'status',
        slot: 'status',
        label: '订单状态',
        // minWidth: 100,
        align: 'center'
    },
    {
        prop: 'auditor',
        label: '审核人',
        // minWidth: 100,
        align: 'left'
    },
    // {
    //     prop: 'remark',
    //     label: '备注',
    //     minWidth: 110,
    //     align: 'left'
    // },
    {
        prop: 'reason',
        label: '原因',
        minWidth: 120,
        align: 'left'
    },
    {
        prop: 'createTime',
        label: '申请时间',
        formatter: (row) => toDateZone(row.createTime, row.countryCode),
        // minWidth: 160,
        align: 'left'
    },
    {
        prop: 'auditTime',
        label: '审核时间',
        formatter: (row) => toDateZone(row.auditTime, row.countryCode),
        // minWidth: 160,
        align: 'left'
    },
    {
        columnKey: "action",
        label: "操作",
        width: 150,
        fixed: "right",
        align: "center",
        slot: "action",
        hideInPrint: true,
        hideInExport: true,
    },
]);

/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageWithdrawRecords({
        ...where,
        ...orders,
        ...pages
    });
};

/** 搜索 */
const reload = (where?: WithdrawRecordParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
};

/** 导出和打印全部数据的数据源 */
const exportSource: DatasourceFunction = ({ where, orders }) => {
    return pageWithdrawRecords({
        ...where,
        ...orders
    });
};
</script>
