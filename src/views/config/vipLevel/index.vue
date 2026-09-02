<template>
    <ele-page>
        <ele-card :body-style="{ paddingTop: '8px' }">
            <!-- <rtp-config-search ref="searchRef" style="margin-bottom: -14px" @search="reload" /> -->
            <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :pagination="false"
                :headerEllipsis="false" :show-overflow-tooltip="true" :border="true" v-model:selections="selections"
                :highlight-current-row="true"  :footer-style="{ paddingBottom: '16px' }"
                cache-key="rtpConfig">
                <template #toolbar>
                    <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()"> 新建
                    </el-button>
                </template>
                <template #vip="{ row }">
                    <dict-data code="vipLevel" v-model="row.vip" type="tag" />
                </template>
                <template #action="{ row }">
                    <el-link type="primary" :underline="false" @click="openEdit(row)"> 修改 </el-link>
                    <el-divider direction="vertical" />
                    <el-link type="danger" :underline="false" @click="remove(row)"> 删除 </el-link>
                </template>
            </ele-pro-table>
        </ele-card>
        <VipLevelEdit :data="current" v-model="showEdit" @done="reload" />
    </ele-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessageBox } from 'element-plus/es';
import { EleMessage } from 'ele-admin-plus/es';
import type { EleProTable } from 'ele-admin-plus';
import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
import { PlusOutlined } from '@/components/icons';
// import VipLevelSearch from './components/rtp-config-search.vue';
import VipLevelEdit from './components/vipLevel-edit.vue';
import { pageVipLevels, removeVipLevel } from '@/api/config/vipLevelApi';
import type { VipLevel, VipLevelParam } from '@/api/model/vipLevel';

/** 搜索栏实例 */
// const searchRef = ref<InstanceType<typeof VipLevelSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
    {
        prop: 'id',
        label: 'ID',
        width: 100,
        align: 'center',
    },
    {
        prop: 'vip',
        slot: 'vip',
        label: 'VIP等级',
        // width: 100,
        align: 'center'
    },
    {
        label: '升级需求',
        // width: 140,
        align: 'center',
        children:[
            {
                prop: 'recharge',
                label: '充值需求',
                width: 100,
                align: 'center',
            },
            {
                prop: 'flow',
                label: '流水需求',
                // width: 100,
                align: 'center'
            },
        ]
    },
    {
        prop: 'slots',
        label: '等级奖励',
        align: 'center',
        children:[
            {
                prop: 'id',
                label: 'ID',
                align: 'center',
            },
            {
                prop: 'type',
                label: '奖励类型',
                // width: 100,
                align: 'center'
            },
            {
                prop: 'condition',
                label: '条件',
                // width: 100,
                align: 'center'
            },
            {
                prop: 'num',
                label: '条件数量',
                // width: 100,
                align: 'center'
            },
            {
                prop: 'type2',
                label: '奖励类型',
                // width: 100,
                align: 'center'
            },
            {
                prop: 'num',
                label: '奖励数量',
                // width: 100,
                align: 'center'
            },
        ]
    },
    {
        prop: 'action',
        label: '操作',
        // width: 120,
        align: 'center',
        slot: 'action',
    }
]);

/** 表格选中数据 */
const selections = ref<VipLevel[]>([]);

/** 当前编辑数据 */
const current = ref<VipLevel | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);

// const defaultWhere = {
//     type: 0,
// }
/** 表格数据源 */
const datasource: DatasourceFunction = ({ where, orders }) => {
    return pageVipLevels({
        // ...defaultWhere,
        ...where,
        ...orders
    });
};

/** 搜索 */
const reload = (where?: VipLevelParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row?: VipLevel) => {
    current.value = row ?? null;
    showEdit.value = true;
};

/** 删除单个 */
const remove = (row: VipLevel) => {
    ElMessageBox.confirm('确定要删除id为“' + row.id + '”的数据吗?', '系统提示', { type: 'warning', draggable: true })
        .then(() => {
            const loading = EleMessage.loading({
                message: '请求中..',
                plain: true
            });
            removeVipLevel(row.id)
                .then((msg) => {
                    loading.close();
                    EleMessage.success(msg);
                    reload();
                })
                .catch((e) => {
                    loading.close();
                    EleMessage.error(e.message);
                });
        })
        .catch(() => { });
};

/** 导出和打印全部数据的数据源 */
const exportSource: DatasourceFunction = ({ where, orders }) => {
    return pageVipLevels({
        ...where,
        ...orders
    });
};
</script>
<script lang="ts">
export default {
    name: 'rtpConfig'
};
</script>
<style lang="scss" scoped>
// 超出换行显示
:deep(.el-table .cell.el-tooltip) {
    white-space: normal;
}
</style>