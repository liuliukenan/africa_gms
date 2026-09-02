<template>
    <ele-table-select ref="selectRef" clearable  placeholder="请选择" value-key="keyId" label-key="tipsName" v-model="selectedValue"
        :table-props="tableProps" :popper-width="680" :cache-data="cacheData" @select="handleSelect" @filter-change="handleFilterChange">
        <template #tipsType="{ row }">
            <dict-data code="tipsType" v-model="row.tipsType" type="tag" valueType="number" />
        </template>
        <template #colorType="{ row }">
            <dict-data code="colorType" v-model="row.colorType" type="tag" valueType="number"
                :typeColor="setColorType(row.colorType)" />
        </template>
    </ele-table-select>
</template>

<script setup lang="ts">
import { pageTipsConfs } from '@/api/config/tipsConfApi';
import { useConfigStore } from '@/store/modules/config';
import type { TableSelectProps } from 'ele-admin-plus/es/ele-table-select/props';
import { reactive, ref, watch } from 'vue';

// ========== 模块级共享缓存 ==========
// 所有 TipsSelect 实例共享同一份 label 数据，避免多实例各自重复请求
const sharedLabelMap = ref<Map<number, { keyId: number; tipsName: string }>>(new Map());
let sharedFetchPromise: Promise<void> | null = null;

/** 确保共享缓存已加载（只发一次请求） */
function ensureCacheLoaded(defaultWhere: any) {
    if (!sharedFetchPromise) {
        sharedFetchPromise = pageTipsConfs({ page: 1, limit: 200, ...defaultWhere }).then((res) => {
            const map = new Map<number, { keyId: number; tipsName: string }>();
            (res?.list || []).forEach((item: any) => {
                map.set(item.keyId, { keyId: item.keyId, tipsName: item.tipsName });
            });
            sharedLabelMap.value = map;
        }).catch(() => {
            sharedFetchPromise = null; // 失败后允许重试
        });
    }
    return sharedFetchPromise;
}
// ====================================

// 初始化store
const configStore = useConfigStore();
const selectedValue = defineModel<number>();
const emit = defineEmits<{
    (e: 'selectRow', row: any): void;
}>();
// 缓存已选中行的数据，用于回显 label
const cacheData = ref<any[]>([]);
const defaultWhere = reactive({
    countryCode: configStore.countryArr?.[0]?.code || undefined
});

// ========== 服务端搜索 ==========
const selectRef = ref<any>();
const searchText = ref('');
let filterTimer: ReturnType<typeof setTimeout> | null = null;

const handleFilterChange = (value: string) => {
    if (filterTimer) clearTimeout(filterTimer);
    filterTimer = setTimeout(() => {
        searchText.value = value || '';
        selectRef.value?.tableRef?.reload();
    }, 300);
};
// ==============================

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
// 表格配置
const tableProps = reactive<Exclude<TableSelectProps['tableProps'], undefined>>({
    datasource: ({ pages, where }) =>
        pageTipsConfs({ ...pages, ...where, tipsName: searchText.value || undefined }),
    columns: [
        {
            prop: "keyId",
            label: "keyId",
            // minWidth: 110,
            align: 'left',
        },
        {
            prop: 'tipsName',
            label: '名称',
            // minWidth: 110,
            align: 'left'
        },
        {
            prop: 'tipsType',
            slot: 'tipsType',
            label: 'Tips类型',
            // minWidth: 110,
            align: 'left'
        },
        {
            prop: 'colorType',
            slot: 'colorType',
            label: '颜色类型',
            // minWidth: 110,
            align: 'left'
        },
        {
          prop: 'remark',
          slot: 'remark',
          label: '备注',
          // minWidth: 110,
          align: 'left'
        },
    ],
    highlightCurrentRow: true,
    toolbar: false,
    pagination: {
        pageSize: 5,
        layout: 'total, prev, pager, next, jumper'
    },
    footerStyle: { padding: '0px' },
    rowStyle: { cursor: 'pointer' }
});
const handleSelect = (row: any) => {
    // 缓存选中行数据，确保回显时能显示 tipsName
    cacheData.value = [{ keyId: row.keyId, tipsName: row.tipsName }];
    emit('selectRow', row);
};

// 处理初始回显：从共享缓存同步查找 label，避免多实例各自发请求导致的时序不一致
function syncCacheFromShared() {
    const val = selectedValue.value;
    if (val != null && !cacheData.value.some(item => item.keyId === val)) {
        // 先从已加载的共享缓存中同步查找
        const cached = sharedLabelMap.value.get(val);
        if (cached) {
            cacheData.value = [cached];
            return;
        }
        // 缓存未加载则触发一次加载，加载完成后重试
        ensureCacheLoaded(defaultWhere).then(() => {
            const item = sharedLabelMap.value.get(val);
            if (item) {
                cacheData.value = [item];
            }
        });
    }
}

// 组件挂载时立即尝试同步回显
syncCacheFromShared();
// 监听 value 变化
watch(selectedValue, () => syncCacheFromShared());
</script>

<style scoped></style>
