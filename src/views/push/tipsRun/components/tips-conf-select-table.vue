<template>
    <ele-table-select clearable placeholder="请选择" value-key="keyId" label-key="tipsName" v-model="selectedValue"
        :table-props="tableProps" :popper-width="580">
        <template #jumpType="{ row }">
            <dict-data code="actionType2" v-model="row.jumpType" valueType="number" type="tag" />
        </template>
        <template #state="{ row }">
            <el-link :type="row.state === true ? 'success' : 'danger'">{{ row.state === true ? '启用' : '禁用' }}</el-link>
        </template>
        <template #colorType="{ row }">
            <dict-data code="colorType" v-model="row.colorType" type="tag" valueType="number"
                :typeColor="setColorType(row.colorType)" />
        </template>
    </ele-table-select>
</template>

<script setup lang="ts">
import type { TableSelectProps } from 'ele-admin-plus/es/ele-table-select/props';
import { pageTipsConfs } from '@/api/config/tipsConfApi';
import { reactive } from 'vue';
const selectedValue = defineModel<number>();
// 表格配置
const tableProps = reactive<Exclude<TableSelectProps['tableProps'], undefined>>({
    datasource: ({ pages, where }) => pageTipsConfs({ ...pages, ...where }),
    columns: [
        {
            prop: 'id',
            label: 'ID',
            width: 48,
            align: 'center',
            fixed: 'left'
        },
        {
            prop: 'tipsName',
            label: 'tips标题',
        },
        {
            prop: 'jumpType',
            slot: "jumpType",
            label: '跳转类型',
        },
        {
            prop: 'colorType',
            slot: 'colorType',
            label: '颜色类型',
        },
        {
            prop: 'state',
            label: '状态',
        },
    ],
    highlightCurrentRow: true,
    toolbar: false,
    pagination: {
        pageSize: 6,
        layout: 'total, prev, pager, next, jumper'
    },
    footerStyle: { padding: '0px' },
    rowStyle: { cursor: 'pointer' }
});
const setColorType = (status: number) => {
    switch (status) {
        case 0://red
            return 'danger'
        case 1://yellow
            return 'warning'
        case 2://green
            return 'success'
        case 3://blue
            return 'primary'
        default:
            return 'info'
    }
}
</script>

<style scoped></style>
