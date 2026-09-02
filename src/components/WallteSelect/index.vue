<template>
    <ele-table-select clearable placeholder="请选择" value-key="id" label-key="name" v-model="selectedValue"
        :table-props="tableProps" :popper-width="580" :cache-data="cacheData" :init-value="initValue" @select="handleSelect">
        <template #gameGroupId="{ row }">
            <dict-data v-model="row.gameGroupId" code="gameGroup" value-type="number" placeholder="请选择" type="tag" />
        </template>
        <template #companyId="{ row }">
            <dict-data code="serverType" value-type="number" v-model="row.companyId" type="tag" />
        </template>
    </ele-table-select>
</template>

<script setup lang="ts">
import { pageUserWalletExamples, getUserWalletExample } from "@/api/platform/userWalletExampleApi";
import type { TableSelectProps } from 'ele-admin-plus/es/ele-table-select/props';
import { computed, ref, watch } from 'vue';
const selectedValue = defineModel<number>();

// 缓存已选中过的数据行，供跨页回显名称使用（cacheData 需包含 value-key(id) 与 label-key(name)）
const cacheData = ref<any[]>([]);

// filterType: 'group' => gameId==0；'game' => gameId>0
const props = withDefaults(defineProps<{
    filterType?: 'group' | 'game'
    /** 初始/回填时的显示名称（刷新后 cacheData 为空，靠它回显） */
    label?: string
}>(), {});

const emit = defineEmits<{
    (e: 'selectRow', row: any): void;
}>();

// 有值且未在 cacheData 中命中时，用 label 构造完整行给组件回显名称
const initValue = computed(() => {
    if (selectedValue.value != null && props.label) {
        return { id: selectedValue.value, name: props.label };
    }
    return undefined;
});

// 兜底：当有值、但 cacheData 与 label 都没有名称时，按 id 反查一次名称，避免刷新后回显成 id
watch(selectedValue, async (val) => {
    if (val == null) return;
    const hasCached = cacheData.value.some(d => d.id === val);
    if (hasCached || props.label) return;
    try {
        const row = await getUserWalletExample(val);
        if (row && row.id === val) {
            const idx = cacheData.value.findIndex(d => d.id === val);
            // 用新数组引用赋值，触发 ele-table-select 的 cacheData watch，从而重新回显名称
            const next = [...cacheData.value];
            if (idx !== -1) {
                next[idx] = row;
            } else {
                next.push(row);
            }
            cacheData.value = next;
        }
    } catch (e) {
        // 反查失败不阻断，仍显示 id
    }
}, { immediate: true });

const columns: Exclude<TableSelectProps['tableProps'], undefined>['columns'] = [
    { prop: "id", label: "id", width: 60, align: 'left', fixed: 'left' },
    { prop: "name", label: "钱包名称", minWidth: 110, align: 'left' },
    { prop: "gameId", label: "游戏ID", minWidth: 110, align: 'left' },
    { prop: "companyId", slot: "companyId", label: "公司ID", minWidth: 110, align: 'left' },
    { prop: "gameGroupId", slot: "gameGroupId", label: "游戏分组", minWidth: 110, align: 'left' },
];

// 用 computed 确保 filterType 变化时 datasource 重建，触发重新查询
const tableProps = computed<Exclude<TableSelectProps['tableProps'], undefined>>(() => ({
    datasource: async ({ pages, where }) => {
        // group: 传 gameId=0 让后端精确过滤；game: 不传 gameId，前端过滤 gameId>0
        const extraParams = props.filterType === 'group' ? { gameId: 0 } : {};
        const result = await pageUserWalletExamples({ ...pages, ...where, ...extraParams });
        if (result && props.filterType === 'game') {
            result.list = (result.list ?? []).filter(row => (row.gameId ?? 0) > 0);
        }
        return result;
    },
    columns,
    highlightCurrentRow: true,
    toolbar: false,
    pagination: {
        pageSize: 6,
        layout: 'total, prev, pager, next, jumper'
    },
    footerStyle: { padding: '0px' },
    rowStyle: { cursor: 'pointer' }
}));
const handleSelect = (row: any) => {
    // 缓存选中的行，用于跨页回显名称（翻页后 getCurrentRow 取不到时，组件会从 cacheData 反查）
    const idx = cacheData.value.findIndex(d => d.id === row.id);
    const next = [...cacheData.value];
    if (idx !== -1) {
        next[idx] = row;
    } else {
        next.push(row);
    }
    cacheData.value = next;
    emit('selectRow', row);
};
</script>

<style scoped></style>