<template>
    <ele-page>
        <ele-card :body-style="{ paddingTop: '8px' }">
            <goods-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
            <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
                :show-overflow-tooltip="true" :border="true" v-model:selections="selections"
                :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" cache-key="goodsTable"
                :tools="['refresh', 'columns', 'maximized']">
                <template #toolbar>
                    <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()">
                        新建
                    </el-button>
                    <el-popconfirm :title="t('common.sureExport')" @confirm="openExport" width="250px">
                        <template #reference>
                            <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">
                                {{ t('action.export') }}
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
                <template #type="{ row }">
                    <dict-data v-model="row.type" :code="'goods_type'" type="tag" value-type="number" />
                </template>
                <template #state="{ row }">
                    <el-tag :type="row.state === 1 ? 'success' : 'danger'">
                        {{ row.state === 1 ? '启用' : '停用' }}
                    </el-tag>
                </template>
                <template #action="{ row }">
                    <el-link type="primary" :underline="false" @click="openEdit(row)">修改</el-link>
                    <el-divider direction="vertical" />
                    <el-link type="danger" :underline="false" @click="remove(row)">删除</el-link>
                </template>
            </ele-pro-table>
        </ele-card>
        <goods-edit :data="current" v-model="showEdit" @done="reload" />
    </ele-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus/es';
import { EleMessage } from 'ele-admin-plus/es';
import type { EleProTable } from 'ele-admin-plus';
import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
import { UploadOutlined, PlusOutlined } from '@/components/icons';
import GoodsSearch from './components/goods-search.vue';
import GoodsEdit from './components/goods-edit.vue';
import { pageGoods, exportGoods, removeGoods } from '@/api/config/goodsApi';
import type { GoodsVO, GoodsParam } from '@/api/config/model/goods';
import { useI18n } from 'vue-i18n';
import { toDateString, toDateZone } from '@/utils/utils';

const { t } = useI18n();

/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof GoodsSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
    {
        prop: 'id',
        label: 'ID',
        // width: 80,
        fixed: 'left',
        align: 'center'
    },
    {
        prop: 'type',
        slot: 'type',
        label: '类型',
        // minWidth: 110,
        align: 'center',
    },
    {
        prop: 'name',
        label: '名称',
        // minWidth: 110,
        align: 'center',
    },
    {
        prop: 'walletExampleId',
        label: '钱包模板ID',
        // minWidth: 110,
        align: 'center'
    },
    {
        prop: 'freeGameExampleId',
        label: '免费游戏模板ID',
        // minWidth: 130,
        align: 'center'
    },

    {
        prop: 'sortNumber',
        label: '排序编号',
        minWidth: 110,
        align: 'center'
    },
    {
        prop: 'state',
        label: '状态',
        minWidth: 80,
        align: 'center',
        slot: 'state'
    },
    // {
    //     prop: 'description',
    //     label: '描述',
    //     minWidth: 110,
    //     align: 'left'
    // },
    {
        prop: 'createTime',
        label: '创建时间',
        minWidth: 160,
        align: 'center',
        formatter: (row: GoodsVO) => toDateString(row.createTime)
    },
    // {
    //     prop: 'updateTime',
    //     label: '更新时间',
    //     minWidth: 160,
    //     align: 'center',
    //     formatter: (row: GoodsVO) => toDateString(row.updateTime)
    // },
    {
        columnKey: 'action',
        label: '操作',
        width: 130,
        align: 'center',
        fixed: 'right',
        slot: 'action',
        hideInPrint: true,
        hideInExport: true
    }
]);

/** 表格选中数据 */
const selections = ref<GoodsVO[]>([]);

/** 当前编辑数据 */
const current = ref<GoodsVO | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);

/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageGoods({
        ...where,
        ...orders,
        ...pages
    });
};

/** 搜索 */
const reload = (where?: GoodsParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row?: GoodsVO) => {
    current.value = row ?? null;
    showEdit.value = true;
};

/** 删除 */
const remove = (row: GoodsVO) => {
    ElMessageBox.confirm(
        '确定要删除ID为"' + row.id + '"的数据吗?',
        '系统提示',
        { type: 'warning', draggable: true }
    )
        .then(() => {
            const loading = EleMessage.loading({ message: '请求中..', plain: true });
            removeGoods(row.id)
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

/** 导出 */
const openExport = () => {
    exportGoods({ ...searchRef.value!.searchParams() }, '物品配置').then((res) => {
        ElMessage.success(res);
    });
};
</script>

<script lang="ts">
export default {
    name: 'goods'
};
</script>
