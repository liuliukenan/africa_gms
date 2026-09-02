<template>
    <ele-page>
        <ele-card :body-style="{ paddingTop: '8px' }">
            <!-- <auditWithdrawConf-search ref="searchRef" style="margin-bottom: -14px" @search="reload" /> -->
            <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :pagination="false"
                :show-overflow-tooltip="true" :border="true" :highlight-current-row="true"
                :tools="['reload', 'columns', 'maximized']" :footer-style="{ paddingBottom: '16px' }"
                cache-key="auditWithdrawConf" :span-method="objectSpanMethod">
                <!-- 用户类型 -->
                <template #userType="{ row }">
                    {{ row.userType === 0 ? '非首充（普通用户）' : '首充用户(注册后首次充值)' }}
                </template>

                <!-- 指标类型 -->
                <!-- <template #indicatorType="{ row }">
                    <dict-data code="withdraw_audit_indicator_type" v-model="row.indicatorType" valueType="string"
                        type="tag" />
                </template> -->

                <!-- 是否启用 -->
                <template #enabled="{ row }">
                    <el-tag :type="row.enabled ? 'success' : 'danger'">
                        {{ row.enabled ? '启用' : '禁用' }}
                    </el-tag>
                </template>

                <!-- 自定义表头 -->
                <template #l1Min-header>
                    <div>L1 (自动放行)</div>
                    <div>[下限, 上限)</div>
                </template>
                <template #l2Min-header>
                    <div>L2 (人工复核)</div>
                    <div>[下限, 上限)</div>
                </template>
                <template #l3Min-header>
                    <div>L3 (冻结+人工)</div>
                    <div>[下限, 上限)</div>
                </template>

                <!-- 创建时间 -->
                <template #createTime="{ row }">
                    {{ toDateZone(row.createTime) }}
                </template>

                <!-- 更新时间 -->
                <template #updateTime="{ row }">
                    {{ toDateZone(row.updateTime) }}
                </template>

                <!-- 操作列 -->
                <template #action="{ row }">
                    <el-link type="primary" :underline="false" @click="openEdit(row)" v-permission="'platform:auditWithdrawConf:edit'">编辑</el-link>
                </template>
            </ele-pro-table>
        </ele-card>
        <!-- 编辑弹窗 -->
        <auditWithdrawConf-edit v-model="editVisible" :data="editData" @done="reload" />
    </ele-page>
</template>

<script lang="ts" setup>
import { ref, reactive, h } from 'vue';
import type { EleProTable } from 'ele-admin-plus';
import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
import AuditWithdrawConfSearch from './components/auditWithdrawConf-search.vue';
import AuditWithdrawConfEdit from './components/auditWithdrawConf-edit.vue';
import { listWithdrawAutoAuditRule } from '@/api/platform/auditWithdrawConfApi';
import type { WithdrawAutoAuditRuleVO, WithdrawAutoAuditRuleParam } from '@/api/platform/model/auditWithdrawConf';
import { toDateZone } from '@/utils/utils';

const searchRef = ref<InstanceType<typeof AuditWithdrawConfSearch> | null>(null);
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

// 合并单元格相关数据
const spanArr = reactive<number[]>([]);
const pos = ref<number>(0);

const columns = ref<Columns>([
    { prop: 'userType', label: '用户类型', minWidth: 50, slot: 'userType' },
    { prop: 'ruleName', label: '规则名称', minWidth: 100 },
    // { prop: 'indicatorType', label: '指标类型', minWidth: 90, slot: 'indicatorType' },
    {
        prop: 'l1Min', label: 'L1 (自动放行)[下限, 上限) ', minWidth: 100, align: 'left',
        renderHeader: () => h('div', null, [h('div', null, 'L1 (自动放行)'), h('div', null, '[下限, 上限)')]),
        formatter: (row: any) => {
            if (row.l1Min === null && row.l1Max === null) return '--';
            const min = row.l1Min === null ? '-∞' : row.l1Min;
            const max = row.l1Max === null ? '+∞' : row.l1Max;
            return `[${min}, ${max})`;
        }
    },
    {
        prop: 'l2Min', label: 'L2 (人工复核)[下限, 上限)  ', minWidth: 100, align: 'left',
        renderHeader: () => h('div', null, [h('div', null, 'L2 (人工复核)'), h('div', null, '[下限, 上限)')]),
        formatter: (row: any) => {
            if (row.l2Min === null && row.l2Max === null) return '--';
            const min = row.l2Min === null ? '-∞' : row.l2Min;
            const max = row.l2Max === null ? '+∞' : row.l2Max;
            return `[${min}, ${max})`;
        }
    },
    {
        prop: 'l3Max', label: 'L3 (冻结+人工)[下限, 上限) ', minWidth: 100, align: 'left',
        renderHeader: () => h('div', null, [h('div', null, 'L3 (冻结+人工)'), h('div', null, '[下限, 上限)')]),
        formatter: (row: any) => {
            if (row.l3Min === null && row.l3Max === null) return '--';
            const min = row.l3Min === null ? '-∞' : row.l3Min;
            const max = row.l3Max === null ? '+∞' : row.l3Max;
            return `[${min}, ${max})`;
        }
    },
    { prop: 'checkPeriodDays', label: '检查周期天数', minWidth: 80, align: 'center' },
    { prop: 'enabled', label: '是否启用', minWidth: 60, slot: 'enabled', align: 'center' },
    // { prop: 'sort', label: '排序', minWidth: 80, align: 'left' },
    { prop: 'remark', label: '备注', minWidth: 150 },
    // { prop: 'createTime', label: '创建时间', minWidth: 160, slot: 'createTime' },
    // { prop: 'updateTime', label: '更新时间', minWidth: 160, slot: 'updateTime' }
    { prop: 'action', label: '操作', width: 80, align: 'center', slot: 'action', fixed: 'right' }
]);

const datasource: DatasourceFunction = async ({ where }) => {
    const result = await listWithdrawAutoAuditRule(where as WithdrawAutoAuditRuleParam);
    // 计算合并数组
    getSpanArr(result || []);
    return result;
};

// 计算合并数组
const getSpanArr = (data: WithdrawAutoAuditRuleVO[]) => {
    spanArr.length = 0;
    pos.value = 0;

    for (let i = 0; i < data.length; i++) {
        if (i === 0) {
            spanArr.push(1);
            pos.value = 0;
        } else {
            // 判断当前行与上一行的 userType 是否相同
            if (data[i].userType === data[i - 1].userType) {
                spanArr[pos.value]++;
                spanArr.push(0);
            } else {
                spanArr.push(1);
                pos.value = i;
            }
        }
    }
};

// 合并单元格方法
const objectSpanMethod = ({ row, column, rowIndex, columnIndex }: any) => {
    // userType 列的索引是 0
    if (columnIndex === 0) {
        const _row = spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
            rowspan: _row,
            colspan: _col
        };
    }
};

const reload = (where?: WithdrawAutoAuditRuleParam) => {
    tableRef.value?.reload?.({ page: 1, where });
};

/** 编辑弹窗 */
const editVisible = ref(false);
const editData = ref<WithdrawAutoAuditRuleVO | null>(null);

const openEdit = (row: WithdrawAutoAuditRuleVO) => {
    editData.value = row;
    editVisible.value = true;
};
</script>

<script lang="ts">
export default { name: 'auditWithdrawConf' };
</script>
<style lang="scss" scoped>
::v-deep .ele-data-table .ele-table-head-tr.is-ellipsis>.el-table__cell>.cell {
    color: rgba(0, 0, 0, 0.88) !important;
}
</style>
