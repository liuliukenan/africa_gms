<template>
    <ele-table-select clearable placeholder="请选择" value-key="id" label-key="id" v-model="selectedValue"
        :table-props="tableProps" :popper-width="580" @select="handleSelect">
        <template #type="{ row }">
            <dict-data v-model="row.type" :code="'goods_type'" type="tag" value-type="number" />
        </template>
        <template #state="{ row }">
            <el-tag :type="row.state === 1 ? 'success' : 'danger'">
                {{ row.state === 1 ? '启用' : '停用' }}
            </el-tag>
        </template>
    </ele-table-select>
</template>

<script setup lang="ts">
import { pageGoods } from '@/api/config/goodsApi';
import { useConfigStore } from '@/store/modules/config';
import type { TableSelectProps } from 'ele-admin-plus/es/ele-table-select/props';
import { reactive } from 'vue';
// 初始化store
const configStore = useConfigStore();
const selectedValue = defineModel<number>();
const emit = defineEmits<{
    (e: 'selectRow', row: any): void;
}>();
const defaultWhere = reactive({
    countryCode: configStore.countryArr?.[0]?.code || undefined
});
// 表格配置
const tableProps = reactive<Exclude<TableSelectProps['tableProps'], undefined>>({
    datasource: ({ pages, where }) => pageGoods({ ...pages, ...where }),
    columns: [
        {
            prop: "id",
            label: "id",
            width: 60,
            align: 'left',
            fixed: 'left',
        },
        {
            prop: 'name',
            label: '名称',
            minWidth: 110,
            align: 'center',
        },
        {
            prop: 'type',
            slot: 'type',
            label: '类型',
            minWidth: 110,
            align: 'center',
        },
        {
            prop: 'walletExampleId',
            label: '钱包模板ID',
            minWidth: 110,
            align: 'center'
        },
        {
            prop: 'freeGameExampleId',
            label: '免费游戏模板ID',
            minWidth: 130,
            align: 'center'
        },
        {
            prop: 'state',
            label: '状态',
            minWidth: 80,
            align: 'center',
            slot: 'state'
        }
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