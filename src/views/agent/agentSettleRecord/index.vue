<template>
    <ele-page>
        <ele-card :body-style="{ paddingTop: '8px' }">
            <agent-settle-record-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
            <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
                :show-overflow-tooltip="true" :border="true" v-model:selections="selections"
                :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" cache-key="agentSettleRecord">
                <template #toolbar>
                    <el-popconfirm :title="t('common.sureExport')" @confirm="openExport" width="250px">
                        <template #reference>
                            <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">
                                {{ t('action.export') }}
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
                <!-- 代理类型 -->
                <!-- <template #agentType="{ row }">
                    <el-tag v-if="row.agentType === 1" type="primary">总代理</el-tag>
                    <el-tag v-else-if="row.agentType === 2" type="success">普通代理</el-tag>
                    <span v-else>-</span>
                </template> -->
                <!-- 佣金模式 -->
                <template #commissionModel="{ row }">
                    <span>{{ getCommissionModel(row.commissionModel) }}</span>
                </template>
                <!-- 时间字段 -->
                <template #statDate="{ row }">
                    <span>{{ row.statDate ?? '-' }}</span>
                </template>
                <template #settleStartTime="{ row }">
                    <span>{{ row.settleStartTime ?? '-' }}</span>
                </template>
                <template #settleEndTime="{ row }">
                    <span>{{ row.settleEndTime ?? '-' }}</span>
                </template>
                <template #createTime="{ row }">
                    <span>{{ toDateZone(row.createTime, row.countryCode) }}</span>
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
import AgentSettleRecordSearch from './components/agentSettleRecord-search.vue';
import { pageAgentSettleRecord, exportAgentSettleRecord } from '@/api/agent/agentSettleRecordApi';
import type { AgentSettleRecordVO, AgentSettleRecordParam } from '@/api/agent/model/agentSettleRecord';
import { useI18n } from 'vue-i18n';
import { toDateZone } from '@/utils/utils';
import { useConfigStore } from '@/store/modules/config';

const { t } = useI18n();
const configStore = useConfigStore();

const searchRef = ref<InstanceType<typeof AgentSettleRecordSearch> | null>(null);
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);
const getCommissionModel = (type: string) => {
    const modelMap: Record<string, string> = {
        '0': 'CPA',
        '1': 'Revenue Share',
        '2': 'Hybrid',
        '3': 'Turnover'
    };
    console.log('type', type, modelMap[String(type)]);
    return type != null ? (modelMap[String(type)] ?? '-') : '-';
};
const columns = ref<Columns>([
    { prop: 'id', label: 'ID', width: 80, fixed: 'left' },
    { prop: 'agentId', label: '代理ID', minWidth: 110 },
    { prop: 'inviterAgentId', label: '上级代理ID', minWidth: 120 },
    { prop: 'countryCode', label: '国家代码', minWidth: 100 },
    { prop: 'channel', label: '渠道', minWidth: 100 },
    { prop: 'agentType', label: '代理类型', minWidth: 110, slot: 'agentType', formatter: (row) => (row.agentType === 1 ? '总代理' : row.agentType === 2 ? '普通代理' : '无') },
    { prop: 'statDate', label: '结算日期', minWidth: 120, slot: 'statDate' },
    { prop: 'commissionModel', label: '佣金模式', minWidth: 110, slot: 'commissionModel' },
    { prop: 'settleStartTime', label: '结算开始时间', minWidth: 160, slot: 'settleStartTime' },
    { prop: 'settleEndTime', label: '结算结束时间', minWidth: 160, slot: 'settleEndTime' },
    { prop: 'totalProfit', label: '周期内总收益', minWidth: 130, align: 'left' },
    { prop: 'totalContribution', label: '周期内总贡献', minWidth: 140, align: 'left' },
    { prop: 'totalContributionBase', label: '原始贡献基数', minWidth: 140, align: 'left' },
    { prop: 'createTime', label: '创建时间', minWidth: 160, slot: 'createTime' }
]);

const selections = ref<AgentSettleRecordVO[]>([]);

const defaultWhere = reactive({
    countryCode: configStore.countryArr?.[0]?.code || '',
    // startDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
    // endDate: dayjs().format('YYYY-MM-DD')
});

const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageAgentSettleRecord({ ...defaultWhere, ...where, ...orders, ...pages });
};

const reload = (where?: AgentSettleRecordParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
};

const openExport = () => {
    exportAgentSettleRecord({ ...searchRef.value!.searchParams() }, '代理结算记录导出').then((res) => {
        ElMessage.success(res);
    });
};
</script>

<script lang="ts">
export default { name: 'agentSettleRecord' };
</script>