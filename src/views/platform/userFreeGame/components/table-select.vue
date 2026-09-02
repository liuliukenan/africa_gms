<template>
    <ele-table-select clearable placeholder="请选择" value-key="id" label-key="name" v-model="selectedValue"
        :table-props="tableProps" :popper-width="580" @select="handleSelect">
        <template #gameGroupId="{ row }">
            <dict-data v-model="row.gameGroupId" code="gameGroup" value-type="number" placeholder="请选择" type="tag" />
        </template>
        <template #companyId="{ row }">
            <dict-data code="serverType" value-type="number" v-model="row.companyId" type="tag" />
        </template>
    </ele-table-select>
</template>

<script setup lang="ts">
import { pageFreeGameConfs } from "@/api/platform/freeGameConfApi";
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
    datasource: ({ pages, where }) => pageFreeGameConfs({ ...pages, ...where }),
    columns: [
        // {
        //     prop: "id",
        //     label: "id",
        //     width: 60,
        //     align: 'left',
        //     fixed: 'left',
        // },
        {
            prop: "name",
            label: "名称",
            minWidth: 110,
            align: 'left',
        },
        {
            prop: "triggerSpinType",
            formatter: (row) => {
                return row.triggerSpinType === 1 ? "免费次数" : "免费游戏";
            },
            label: "类型",
            minWidth: 110,
            align: 'left',
        },
        {
            prop: "gameId",
            label: "游戏ID",
            minWidth: 110,
            align: 'left',
        },
        {
            prop: "amount",
            label: "金额",
            minWidth: 110,
            align: 'left',
        }, {
            prop: "flowMutl",
            label: "流水倍数",
            minWidth: 110,
            align: 'left',
        },
        {
            prop: "validDays",
            label: "有效天数",
            minWidth: 110,
            align: 'left',
        },
        {
            prop: "exampleId",
            label: "钱包模板",
            minWidth: 110,
            align: 'left',
        },
        {
            prop: "totalSpins",
            label: "次数",
            minWidth: 110,
            align: 'left',
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
    emit('selectRow', row);
};
</script>

<style scoped></style>