<template>
    <ele-table-select clearable placeholder="请选择" value-key="keyId" label-key="mailTitle" v-model="selectedValue"
        :table-props="tableProps" :popper-width="580" @select="handleSelect">
        <template #jumpType="{ row }">
            <dict-data code="actionType2" v-model="row.jumpType" valueType="number" type="tag" />
        </template>
        <template #state="{ row }">
            <el-link :type="row.state === true ? 'success' : 'danger'">{{ row.state === true ? '启用' : '禁用' }}</el-link>
        </template>
    </ele-table-select>
</template>

<script setup lang="ts">
import { pageMailTextConfs } from '@/api/config/mailTextConfApi';
import { useConfigStore } from '@/store/modules/config';
import type { TableSelectProps } from 'ele-admin-plus/es/ele-table-select/props';
import { reactive } from 'vue';
// 初始化store
const configStore = useConfigStore();
const selectedValue = defineModel<number>();
const emit = defineEmits<{
    (e: 'selectRow', { mailText, mailTitle }): void;
}>();
const defaultWhere = reactive({
    countryCode: configStore.countryArr?.[0]?.code || undefined
});
// 表格配置
const tableProps = reactive<Exclude<TableSelectProps['tableProps'], undefined>>({
    datasource: ({ pages, where }) => pageMailTextConfs({ ...pages, ...where, ...defaultWhere }),
    columns: [
        // {
        //     prop: 'id',
        //     label: 'ID',
        //     width: 48,
        //     align: 'center',
        //     fixed: 'left'
        // },
        {
            prop: 'keyId',
            label: 'ID',
            width: 48,
            align: 'center',
            fixed: 'left'
        },
        {
            prop: 'mailTitle',
            label: '邮件标题',
        },
        {
            prop: 'jumpType',
            slot: "jumpType",
            label: '跳转类型',
        },
        {
            prop: 'buttonText',
            label: '按钮文本',
        },
        // {
        //     prop: 'mailText',
        //     label: '文本内容',
        // },
        {
            prop: 'state',
            slot: "state",
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
const handleSelect = (row: any) => {
    if (row?.mailText != null) {
        emit('selectRow', { mailText: row.mailText, mailTitle: row.mailTitle });
    }
};
</script>

<style scoped></style>