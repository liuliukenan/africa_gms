<!-- 代理编辑弹窗 -->
<template>
    <ele-modal :width="1000" v-model="visible" :title="t('action.info')" @open="handleOpen">
        <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
            :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
            :tools="['reload', 'columns', 'maximized']" :footer-style="{ paddingBottom: '16px' }"
            cache-key="gameInfoTable">
            <template #toolbar>
                <el-popconfirm :title="t('action.exportConfirm')" @confirm="openExport()" width="250px">
                    <template #reference>
                        <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">
                            {{ t('action.export') }}
                        </el-button>
                    </template>
                </el-popconfirm>
            </template>
        </ele-pro-table>
        <template #footer>
            <el-button @click="handleCancel">{{ t('action.cancel') }}</el-button>
        </template>
    </ele-modal>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import { getUserGameInfo } from '@/api/user/userApi';
import { UploadOutlined } from '@/components/icons';
import { handleDownload } from '@/utils/file-util';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import { UserGameWinLossVO } from '@/api/model/user';
const props = defineProps<{
    /** 修改回显的数据 */
    uid: number | null;
    /** 当前选中的游戏信息 */
    data: UserGameWinLossVO | null;
}>();

const emit = defineEmits<{
    (e: 'done'): void;
}>();

/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });
/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);
const defaultWhere = reactive({
    sortName: 'totalBet',
    orderName: 'desc',
});
/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    // 只有当 uid 有值时才发起请求，否则返回空数组
    if (!props.uid) {
        return Promise.resolve({
            records: [],
            total: 0
        });
    }
    where = { 
        ...defaultWhere, 
        ...where, 
        orderName: orders.order || defaultWhere.orderName, 
        sortName: orders.sort || defaultWhere.sortName, 
        ...pages 
    };
    return getUserGameInfo({
        ...where,
        uid: props.uid,
        gameGroupId: props.data?.gameGroupId != null ? Number(props.data.gameGroupId) : undefined,
    });
};
/** 表格列配置 */
const columns = ref<Columns>([
    {
        prop: "companyId",
        label: t('user.userList.game.info.companyId'),
        // width: 60,
        align: 'center',
    },
    {
        prop: "gameId",
        label: t('user.userList.game.info.gameId'),
        // width: 60,
        align: 'center',
    },
    {
        prop: "gameName",
        label: t('user.userList.game.info.gameName'),
        // width: 60,
        align: 'center',
    },
    {
        prop: "rtp",
        label: t('user.userList.game.info.rtp'),
        // minWidth: 110,
        align: 'center',
    },
    {
        prop: "profitLoss",
        label: t('user.userList.game.info.profitLoss'),
        sortable: true,
        // minWidth: 110,
        align: 'center',
    },
    {
        prop: "totalBet",
        label: t('user.userList.game.info.totalBet'),
        sortable: true,
        // minWidth: 110,
        align: 'center',
    },
    {
        prop: "totalReward",
        label: t('user.userList.game.info.totalReward'),
        sortable: true,
        // minWidth: 110,
        align: 'center',
    },
    {
        prop: "totalBetCnt",
        label: t('user.userList.game.info.totalBetCnt'),
        sortable: true,
        // minWidth: 110,
        align: 'center',
    },
    // {
    //     prop: "lastGameTime",
    //     label: "最后一次游戏时间",
    //     minWidth: 110,
    //     align: 'center',
    // },
]);

/** 表格选中数据 */
const selections = ref<any[]>([]);
/** 弹窗打开事件 */
/** 弹窗打开事件 */
const handleOpen = async () => {
    if (tableRef.value && props.uid) {
        tableRef.value.reload();
    }
};
/** 关闭弹窗 */
const handleCancel = () => {
    visible.value = false;
};
// 导出
const openExport = () => {
    // exportUser().then((res) => {
    //     handleDownload('用户列表', res.data as any);
    // });
}
</script>
<style scoped lang="scss">
:deep(.el-dialog__body) {
    text-align: center !important;
}
</style>