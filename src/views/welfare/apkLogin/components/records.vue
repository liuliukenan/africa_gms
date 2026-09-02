<template>
    <ele-page>
        <ele-card :body-style="{ paddingTop: '8px' }">
            <records-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
            <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
                :show-overflow-tooltip="true" :border="true" v-model:selections="selections"
                :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }"
                :tools="[ 'reload', 'columns', 'maximized']" cache-key="registerRecords">
                <template #toolbar>
                    <el-popconfirm :title="t('common.sureExport')" @confirm="openExport" width="250px">
                        <template #reference>
                            <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">
                                {{ t('action.export') }}
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
                <!-- 二级类型 -->
                <template #subType="{ row }">
                    <dict-data code="act_sub_type" v-model="row.subType" type="tag" value-type="string" />
                </template>
                <!-- 状态 -->
                <template #status="{ row }">
                    <el-tag v-if="row.status === 0" type="success">正常</el-tag>
                    <el-tag v-else-if="row.status === 1" type="danger">IP风控</el-tag>
                    <el-tag v-else-if="row.status === 2" type="warning">设备风控</el-tag>
                </template>
                <!-- 补发标志 -->
                <template #compensation="{ row }">
                    <el-tag v-if="row.compensation" type="success">是</el-tag>
                    <el-tag v-else type="info">否</el-tag>
                </template>
                <!-- 注册时间 -->
                <template #regTime="{ row }">
                    {{ toDateZone(row.regTime, row.countryCode) }}
                </template>
                <!-- 创建时间 -->
                <template #createTime="{ row }">
                    {{ toDateZone(row.createTime, row.countryCode) }}
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
import { pageApkLoginRecord, exportApkLoginRecord } from '@/api/welfare/apkLoginApi';
import type { RegisterRecordVO, RegisterRecordParam } from '@/api/welfare/model/registerGive';
import { useI18n } from 'vue-i18n';
import { toDateZone } from '@/utils/utils';
import { useConfigStore } from '@/store/modules/config';

const { t } = useI18n();
const configStore = useConfigStore();

const searchRef = ref<InstanceType<typeof RecordsSearch> | null>(null);
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

const columns = ref<Columns>([
    { prop: 'id', label: 'ID', width: 80, fixed: 'left' },
    { prop: 'subType', label: '二级类型', minWidth: 140, slot: 'subType' },
    { prop: 'uid', label: '用户ID', minWidth: 130 },
    // { prop: 'invitedUid', label: '被邀请人UID', minWidth: 130 },
    { prop: 'invitedPhone', label: '手机号', minWidth: 130 },
    // { prop: 'inviterId', label: '邀请人ID', minWidth: 120 },
    { prop: 'goodsType', label: '奖励类型', minWidth: 110 },
    { prop: 'amount', label: '奖励数量/金额', minWidth: 130, align: 'left' },
    { prop: 'flowMultiple', label: '流水倍数', minWidth: 110, align: 'left' },
    { prop: 'mailId', label: '关联邮件ID', minWidth: 120 },
    { prop: 'status', label: '状态', minWidth: 110, slot: 'status' },
    { prop: 'riskReason', label: '风控原因', minWidth: 140 },
    { prop: 'compensation', label: '补发标志', minWidth: 110, slot: 'compensation' },
    { prop: 'expire', label: '过期天数', minWidth: 110 },
    // { prop: 'regTime', label: '注册时间', minWidth: 160, slot: 'regTime' },
    { prop: 'createTime', label: '创建时间', minWidth: 160, slot: 'createTime' }
]);

const selections = ref<RegisterRecordVO[]>([]);

const defaultWhere = reactive({
    countryCode: configStore.countryArr?.[0]?.code || '',
    startDate: dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    endDate: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
});

const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageApkLoginRecord({ ...defaultWhere, ...where, ...orders, ...pages });
};

const reload = (where?: RegisterRecordParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
};

const openExport = () => {
    exportApkLoginRecord({ ...searchRef.value!.searchParams() }, 'RegisterRecords').then((res) => {
        ElMessage.success(res);
    });
};
</script>

<script lang="ts">
export default { name: 'registerRecords' };
</script>
