<template>
    <ele-page>
        <ele-card :body-style="{ paddingTop: '8px' }">
            <records-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
            <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
                :show-overflow-tooltip="true" :border="true" v-model:selections="selections"
                :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }"
                :tools="[ 'reload', 'columns', 'maximized']" cache-key="dailySurpriseChanceRecords">
                <template #toolbar>
                    <el-popconfirm :title="t('common.sureExport')" @confirm="openExport" width="250px">
                        <template #reference>
                            <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">
                                {{ t('action.export') }}
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
                <!-- 状态 -->
                <template #status="{ row }">
                    <el-tag v-if="row.status === 0" type="success">未使用</el-tag>
                    <el-tag v-else-if="row.status === 1" type="info">已使用</el-tag>
                    <el-tag v-else-if="row.status === 2" type="danger">IP风控</el-tag>
                    <el-tag v-else-if="row.status === 3" type="warning">设备风控</el-tag>
                </template>
                <!-- 是否过期 -->
                <template #expired="{ row }">
                    <el-tag v-if="row.expired" type="warning">已过期</el-tag>
                    <el-tag v-else type="success">未过期</el-tag>
                </template>
                <!-- 次数获得时间 -->
                <template #createTime="{ row }">
                    {{ toDateZone(row.createTime, row.countryCode) }}
                </template>
                <!-- 次数过期时间 -->
                <template #expireTime="{ row }">
                    {{ toDateZone(row.expireTime, row.countryCode) }}
                </template>
                <!-- 抽奖时间 -->
                <template #useTime="{ row }">
                    {{ toDateZone(row.useTime, row.countryCode) }}
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
import RecordsSearch from './records-search.vue';
import { pageDailySurpriseChanceRecords, exportDailySurpriseChanceRecords } from '@/api/welfare/dailySurpriseApi';
import type { DailyRechargeSurpriseChanceVO, DailyRechargeSurpriseChanceQuery } from '@/api/welfare/model/dailySurprise';
import { useI18n } from 'vue-i18n';
import { toDateZone } from '@/utils/utils';
import { useConfigStore } from '@/store/modules/config';

const { t } = useI18n();
const configStore = useConfigStore();

const searchRef = ref<InstanceType<typeof RecordsSearch> | null>(null);
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

const columns = ref<Columns>([
    { prop: 'id', label: '记录ID', width: 90, fixed: 'left' },
    { prop: 'uid', label: '用户ID', minWidth: 130 },
    { prop: 'countryCode', label: '国家代码', minWidth: 90 },
    { prop: 'rechargeOrderNo', label: '充值订单号', minWidth: 160 },
    { prop: 'rechargeAmount', label: '充值金额', minWidth: 110, align: 'left' },
    { prop: 'status', label: '状态', minWidth: 100, slot: 'status' },
    { prop: 'expired', label: '是否过期', minWidth: 100, slot: 'expired' },
    { prop: 'slotNo', label: '命中格子序号', minWidth: 110 },
    { prop: 'rewardRatio', label: '奖励比例', minWidth: 100 },
    { prop: 'rewardAmount', label: '奖励金额', minWidth: 100, align: 'left' },
    { prop: 'ip', label: '充值IP', minWidth: 140 },
    { prop: 'deviceId', label: '设备ID', minWidth: 140 },
    { prop: 'riskReason', label: '风控原因', minWidth: 140 },
    { prop: 'createTime', label: '次数获得时间', minWidth: 160, slot: 'createTime' },
    { prop: 'expireTime', label: '次数过期时间', minWidth: 160, slot: 'expireTime' },
    { prop: 'useTime', label: '抽奖时间', minWidth: 160, slot: 'useTime' }
]);

const selections = ref<DailyRechargeSurpriseChanceVO[]>([]);

const defaultWhere = reactive({
    countryCode: configStore.countryArr?.[0]?.code || '',
    startDate: dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    endDate: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
});

const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageDailySurpriseChanceRecords({ ...defaultWhere, ...where, ...orders, ...pages });
};

const reload = (where?: DailyRechargeSurpriseChanceQuery) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
};

const openExport = () => {
    exportDailySurpriseChanceRecords({ ...searchRef.value!.searchParams() }, 'DailyRechargeSurpriseChanceRecords').then((res) => {
        ElMessage.success(res);
    });
};
</script>

<script lang="ts">
export default { name: 'dailySurpriseChanceRecords' };
</script>
