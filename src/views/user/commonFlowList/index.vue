<template>
    <ele-page>
        <ele-card :body-style="{ paddingTop: '8px' }">
            <common-flow-list-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
            <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
                :show-overflow-tooltip="true" :border="true" v-model:selections="selections"
                :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }"
                cache-key="commonFlowList">
                <template #toolbar>
                    <el-popconfirm :title="t('common.sureExport')" @confirm="openExport" width="250px">
                        <template #reference>
                            <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">
                                {{ t('action.export') }}
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
                <template #flowType="{ row }">
                    <dict-data code="flow_type_common" v-model="row.flowType" valueType="string" type="tag" />
                </template>
                <template #status="{ row }">
                    <el-tag :type="row.status === 0 ? 'warning' : 'success'">
                        {{ row.status === 0 ? '进行中' : '已完成' }}
                    </el-tag>
                </template>
                <template #withdrawDeducted="{ row }">
                    <el-tag :type="row.withdrawDeducted ? 'danger' : 'success'">
                        {{ row.withdrawDeducted ? '已扣除' : '正常' }}
                    </el-tag>
                </template>
            </ele-pro-table>
        </ele-card>
    </ele-page>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { dayjs, ElMessage } from 'element-plus/es';
import type { EleProTable } from 'ele-admin-plus';
import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
import { UploadOutlined } from '@/components/icons';
import CommonFlowListSearch from './components/common-flow-list-search.vue';
import { pageCommonFlowList, exportCommonFlowList } from '@/api/user/commonFlowListApi';
import type { CommonFlowRecordVO, CommonFlowRecordParam } from '@/api/user/model/commonFlowList';
import { useI18n } from 'vue-i18n';
import { toDateZone } from '@/utils/utils';
import { useConfigStore } from '@/store/modules/config';

const { t } = useI18n();
const configStore = useConfigStore();

/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof CommonFlowListSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
    {
        prop: 'id',
        label: 'ID',
        width: 80,
        align: 'left',
        fixed: 'left'
    },
    {
        prop: 'uid',
        label: '用户ID',
        minWidth: 100,
        align: 'left'
    },
    {
        prop: 'nickname',
        label: '用户昵称',
        minWidth: 110,
        align: 'left'
    },
    {
        prop: 'companyId',
        label: '公司ID',
        // formatter: (row) => (row.companyId === 0 ? '主钱包' : row.companyId),
        minWidth: 100,
        align: 'left'
    },
    {
        prop: 'gameGroupId',
        label: '游戏分组ID',
        // formatter: (row) => (row.gameGroupId === 0 ? '主钱包' : row.gameGroupId),
        minWidth: 110,
        align: 'left'
    },
    {
        prop: 'gameId',
        label: '游戏ID',
        // formatter: (row) => (row.gameId === 0 ? '主钱包' : row.gameId),
        minWidth: 100,
        align: 'left'
    },
    {
        prop: 'initAmount',
        label: '变更金额',
        minWidth: 110,
        align: 'left'
    },
    {
        prop: 'flowMultiple',
        label: '流水倍数',
        minWidth: 100,
        align: 'left'
    },
    {
        prop: 'requiredFlow',
        label: '需要流水',
        minWidth: 110,
        align: 'left'
    },
    {
        prop: 'remainingFlow',
        label: '剩余流水',
        minWidth: 110,
        align: 'left'
    },
    {
        prop: 'lockAmount',
        label: '锁定金额',
        minWidth: 110,
        align: 'left'
    },
    {
        prop: 'flowType',
        slot: 'flowType',
        label: '流水类型',
        minWidth: 130,
        align: 'left'
    },
    {
        prop: 'status',
        slot: 'status',
        label: '状态',
        minWidth: 90,
        align: 'center'
    },
    {
        prop: 'businessId',
        label: '业务关联ID',
        minWidth: 140,
        align: 'left'
    },
    {
        prop: 'withdrawDeducted',
        slot: 'withdrawDeducted',
        label: '提现扣除',
        minWidth: 100,
        align: 'center'
    },
    {
        prop: 'remark',
        label: '备注',
        minWidth: 120,
        align: 'left'
    },
    {
        prop: 'createTime',
        label: '创建时间',
        formatter: (row) => toDateZone(row.createTime, row.countryCode),
        minWidth: 160,
        align: 'left'
    }
]);

/** 表格选中数据 */
const selections = ref<CommonFlowRecordVO[]>([]);

/** 默认搜索条件 */
const defaultWhere = reactive({
    countryCode: configStore.countryArr?.[0]?.code || '',
    startDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD')
});

/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageCommonFlowList({ ...defaultWhere, ...where, ...orders, ...pages });
};

/** 搜索 */
const reload = (where?: CommonFlowRecordParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
};

/** 导出 */
const openExport = () => {
    exportCommonFlowList({ ...searchRef.value!.searchParams() }, 'TYLSJL').then((res) => {
        ElMessage.success(res);
    });
};
</script>

<script lang="ts">
export default { name: 'commonFlowList' };
</script>