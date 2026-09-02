<template>
    <ele-page>
        <ele-card :body-style="{ paddingTop: '8px' }">
            <act-item-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
            <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
                :show-overflow-tooltip="true" :border="true" v-model:selections="selections"
                :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" cache-key="actItem">
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
                    <el-tag :type="row.status ? 'success' : 'danger'">
                        {{ row.status ? '启用' : '禁用' }}
                    </el-tag>
                </template>
                <template #showStartDate="{ row }">
                    <div> {{ toDateString(row.showStartDate) }}</div>
                    <div> {{ toDateString(row.showEndDate) }}</div>
                </template>
                <!-- 图片 -->
                <template #imgUrl="{ row }">
                    <el-image :src="imgBaseUrl + row.imgUrl" style="width: 100px; height: 100px" />
                </template>
                <template #action="{ row }">
                    <el-link type="primary" :underline="false" @click="openEdit(row)">
                        编辑
                    </el-link>
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
import ActItemSearch from './components/actItem-search.vue';
import { pageActItem, exportActItem } from '@/api/welfare/actItemApi';
import type { ActItemVO, ActItemParam } from '@/api/welfare/model/actItem';
import { useI18n } from 'vue-i18n';
import { toDateString, toDateZone } from '@/utils/utils';
import { useConfigStore } from '@/store/modules/config';
import { ActivityConstants } from '@/utils/constant';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const configStore = useConfigStore();
const imgBaseUrl = import.meta.env.VITE_APP_IMG_URL;
const searchRef = ref<InstanceType<typeof ActItemSearch> | null>(null);
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

const columns = ref<Columns>([
    { prop: 'id', label: 'ID',  fixed: 'left' },
    { prop: 'sortNumber', label: '排序' },
    // { prop: 'countryCode', label: '国家代码', minWidth: 100 },
    { prop: 'name', label: '显示名称' },
    // { prop: 'type', label: '类型', minWidth: 110 },
    // { prop: 'jumpType', label: '跳转类型', minWidth: 100 },
    // { prop: 'jumpId', label: '跳转', minWidth: 110 },
    // { prop: 'userRange', label: '发送范围', minWidth: 100 },
    // { prop: 'triggerType', label: '触发类型', minWidth: 100 },

    { prop: 'status', label: '状态', slot: 'status' },
    { prop: 'imgUrl', label: '图片', slot: 'imgUrl' },
    { prop: 'showStartDate', label: '活动预热时间', slot: 'showStartDate' },
    { prop: 'startDate', label: '活动开始时间', formatter: (row: ActItemVO) => toDateString(row.startDate) },
    { prop: 'endDate', label: '活动结束时间', formatter: (row: ActItemVO) => toDateString(row.endDate) },
    // { prop: 'showEndDate', label: '活动预热结束时间', formatter: (row: ActItemVO) => toDateString(row.showEndDate) },
    // { prop: 'description', label: '描述', minWidth: 160 },
    // { prop: 'createBy', label: '创建人', minWidth: 100 },
    {
        columnKey: "action",
        label: "操作",
        align: "center",
        slot: "action",
        fixed: 'right',
        // minWidth: 120,
        hideInPrint: true,
        hideInExport: true
    }
]);

const selections = ref<ActItemVO[]>([]);

const defaultWhere = reactive({
    countryCode: configStore.countryArr?.[0]?.code || '',
    // startDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
    // endDate: dayjs().format('YYYY-MM-DD')
});

const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageActItem({ ...defaultWhere, ...where, ...orders, ...pages });
};

const reload = (where?: ActItemParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
};
const router = useRouter();
const openEdit = (row: ActItemVO) => {
    switch (row.id) {
        case ActivityConstants.FirstPay:
            router.push('/welfare/firstPay');
            break;
        case ActivityConstants.InviteAct:
            router.push('/welfare/inviteAct');
            break;
        case ActivityConstants.registerGive:
            router.push('/welfare/registerGive');
            break;
        case ActivityConstants.Daily7:
            router.push('/welfare/daily7');
            break;
        case ActivityConstants.Repay:
            router.push('/welfare/repay');
            break;
        default:
            break;
    }
};

const openExport = () => {
    exportActItem({ ...searchRef.value!.searchParams() }, '活动列表').then((res) => {
        ElMessage.success(res);
    });
};
</script>

<script lang="ts">
export default { name: 'actItem' };
</script>
