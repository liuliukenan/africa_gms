<template>
    <ele-page>
        <ele-card :body-style="{ paddingTop: '8px' }">
            <!-- <kefu-search ref="searchRef" style="margin-bottom: -14px" @search="reload" /> -->
            <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
                :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :pagination=false
                :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" cache-key="payItemTable">
                <template #toolbar>
                    <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()" v-permission="'config:payItem:add'">
                        {{ t('config.payItem.table.add') }}
                    </el-button>
                </template>
                <template #type="{ row }">
                    <dict-data code="addressType" valueType="number" type="tag" v-model="row.type" />
                </template>
                <template #status="{ row }">
                    <div :style="{ color: !row.status ? 'red' : '#20a53a' }">{{ row.status ? t('config.payItem.table.statusEnabled') : t('config.payItem.table.statusDisabled') }}</div>
                </template>
                <template #action="{ row }">
                    <el-link type="primary" :underline="false" @click="openEdit(row)" style="margin-right: 8px" v-permission="'config:payItem:edit'">
                        {{ t('config.payItem.table.edit') }}
                    </el-link>
                    <el-link type="danger" :underline="false" @click="remove(row)" v-permission="'config:payItem:remove'">
                        {{ t('config.payItem.table.delete') }}
                    </el-link>
                </template>
            </ele-pro-table>
        </ele-card>
        <PayItemEdit :data="current" v-model="showEdit" @done="reload" />
    </ele-page>

</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessageBox } from "element-plus/es";
import { EleMessage } from "ele-admin-plus/es";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import { PlusOutlined } from "@/components/icons";
// import PayItemSearch from "./components/kefu-search.vue";
import PayItemEdit from "./components/payItem-edit.vue";
import { pagePayItem, removePayItem } from "@/api/config/payItemApi";
import type { PayItem, PayItemParam } from "@/api/config/model/payItem";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
/** 搜索栏实例 */
// const searchRef = ref<InstanceType<typeof PayItemSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
    {
        label: t('config.payItem.table.index'),
        type: 'index',
        width: 150,
        align: 'center',
        fixed: 'left'
    },
    {
        prop: "id",
        label: t('config.payItem.table.id'),
        // width: 60,
        // width: 120,
        align: 'center',
    },
    {
        prop: "amount",
        label: t('config.payItem.table.amount'),
        // minWidth: 110,
        align: 'center',
    },
    {
        prop: "status",
        slot: "status",
        label: t('config.payItem.table.status'),
        // minWidth: 110,
        align: 'center',
    },
    {
        label: t('config.payItem.table.remark'),
        prop: 'remark',
        align: 'left',
        minWidth: 160
    },
    {
        label: t('config.payItem.table.createTime'),
        prop: 'createTime',
        align: 'center',
        minWidth: 110
    },
    {
        columnKey: "action",
        label: t('action.action'),
        width: 200,
        align: "center",
        slot: "action",
        hideInPrint: true,
        hideInExport: true
    }
]);

/** 表格选中数据 */
const selections = ref<PayItem[]>([]);

/** 当前编辑数据 */
const current = ref<PayItem | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);


/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pagePayItem({
        ...where,
    });
};

/** 搜索 */
const reload = (where?: PayItemParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row?: PayItem) => {
    current.value = row ?? null;
    showEdit.value = true;
};

/** 删除单个 */
const remove = (row: PayItem) => {
    ElMessageBox.confirm(
        t('common.sureDel', [row.id]),
        t('common.tips'),
        { type: 'warning', draggable: true }
    )
        .then(() => {
            const loading = EleMessage.loading({
                message: t('common.loading'),
                plain: true
            });
            removePayItem(row.id)
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
        .catch(() => {
        });
};

</script>
