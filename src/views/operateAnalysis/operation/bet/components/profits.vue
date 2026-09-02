<template>
    <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true"
        :border="true" v-model:selections="selections" :highlight-current-row="true" size="small"
        :footer-style="{ paddingBottom: '16px' }" cache-key="proUserUser" :tools="['reload', 'columns', 'maximized']">
        <template #toolbar>
            <el-space>
                <el-button-group>
                    <el-button :type="type === 0 ? 'primary' : 'info'" @click="handleClick(0)"> 比率 </el-button>
                    <el-button :type="type === 1 ? 'primary' : 'info'" @click="handleClick(1)">人数</el-button>
                    <el-button :type="type === 2 ? 'primary' : 'info'" @click="handleClick(2)">人均</el-button>
                </el-button-group>
            </el-space>
            <span style="margin-left: 10px;">
                <el-popconfirm title="确认导出表格数据吗？" @confirm="openExport()">
                    <template #reference>
                        <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">导出</el-button>
                    </template>
                </el-popconfirm>
            </span>
        </template>
        <!-- <template #tools>
            <el-space>
                <el-button-group>
                    <el-button :type="type === 1 ? 'primary' : 'info'" @click="handleClick(1)"> 比率 </el-button>
                    <el-button :type="type === 0 ? 'primary' : 'info'" @click="handleClick(0)">人数</el-button>
                </el-button-group>
            </el-space>
            <span style="margin-left: 10px;">
                <el-popconfirm title="确认导出表格数据吗？" @confirm="openExport()">
                    <template #reference>
                        <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">导出</el-button>
                    </template>
                </el-popconfirm>
            </span>
        </template> -->
    </ele-pro-table>
</template>
<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import { pageUserLoginRetention, pageUserLoginRetentionRate, exportLoginRetention } from "@/api/operateAnalysis/userAnalysis/loginApi";
import type { LoginRetention, LoginRetentionParam } from "@/api/operateAnalysis/userAnalysis/model/login";
import dayjs from "dayjs";
import { UploadOutlined } from "@/components/icons";
import { useConfigStore } from "@/store/modules/config";
const props = defineProps<{
    where: any;
}>();
const type = ref(0);
const handleClick = (val: number) => {
    type.value = val;
    updateDatasource(val)
}

//   const emit = defineEmits<{
//     (e: 'done'): void;
//   }>();

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);
/** 搜索栏实例 */
// const searchRef = ref<InstanceType<typeof SearchForm> | null>(null);
/** 表格列配置 */
const columns = ref<Columns>([
    {
        prop: "statDate",
        label: "日期",
        align: 'center',
        fixed: 'left',
    },
    {
        prop: "userCount",
        label: "0-10000以上",
        align: 'center',
    },
    {
        prop: "retention1d",
        label: "-10000~-5000",
        align: 'center',
    },
    {
        prop: "retention2d",
        label: "-5000~-2000",
        align: 'center',
    },
    {
        prop: "retention3d",
        label: "-2000~-1000",
        align: 'center',
    },
    {
        prop: "retention4d",
        label: "-1000~-500",
        align: 'center',
    },
    {
        prop: "retention5d",
        label: "-500~-100",
        align: 'center',
    },
    {
        prop: "retention5d",
        label: "-100~-1",
        align: 'center',
    },
    {
        prop: "retention5d",
        label: "0",
        width:80,
        align: 'center',
    },
      {
        prop: "retention2d",
        label: "100~500",
        align: 'center',
    },
    {
        prop: "retention3d",
        label: "100~500",
        align: 'center',
    },
    {
        prop: "retention4d",
        label: "500~1000",
        align: 'center',
    },
    {
        prop: "retention5d",
        label: "1000~2000",
        align: 'center',
    },
    {
        prop: "retention6d",
        label: "2000~5000",
        align: 'center',
    },
    {
        prop: "retention7d",
        label: "5000~10000",
        align: 'center',
    },
    {
        prop: "retention60d",
        label: "10000+",
        align: 'center',
    },
]);

/** 表格选中数据 */
const selections = ref<LoginRetention[]>([]);
const configStore = useConfigStore();
// 默认搜索条件
const defaultWhere = reactive({
    startDate: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    countryCode: configStore.countryArr?.[0]?.code || '',
    userType: 2,
});

/** 人数数据源 */
const datasourceCount: DatasourceFunction = ({ pages, where, orders }) => {
    return pageUserLoginRetention({
        ...defaultWhere,
        ...where,
        ...orders,
        ...pages
    });
};

/** 比率数据源 */
const datasourceRate: DatasourceFunction = ({ pages, where, orders }) => {
    return pageUserLoginRetentionRate({
        ...defaultWhere,
        ...where,
        ...orders,
        ...pages
    });
};
// 人均数据源
const datasourceAvg: DatasourceFunction = ({ pages, where, orders }) => {
    return pageUserLoginRetentionRate({
        ...defaultWhere,
        ...where,
        ...orders,
        ...pages
    });
};
/** 表格数据源  */
const datasource = ref<DatasourceFunction>(datasourceRate);
/** 导出/打印数据源 */
const exportSource = ref<DatasourceFunction>(datasourceRate);

// 根据 type 更新数据源
const updateDatasource = (type: number) => {
    switch (type) {
        case 0://比率
            datasource.value = datasourceRate;
            exportSource.value = datasourceRate;
        case 1://人数
            datasource.value = datasourceCount;
            exportSource.value = datasourceCount;
            break;
        case 2://人均
            datasource.value = datasourceAvg;
            exportSource.value = datasourceAvg;
            break;
        default:
            break;
    }
};
const openExport = () => {
    // exportLoginRetention({ ...searchRef.value!.searchParams() }, 'DLLCB').then((res) => {
    //     ElMessage.success(res);
    // });
};
// 监听搜索参数变化，更新数据源
watch(
    () => props.where, (nval, oval) => {
        tableRef.value?.reload?.({ page: 1, where: nval });
    },
    { immediate: true }
);
</script>
<style scoped>
.red {
    color: red;
}
</style>