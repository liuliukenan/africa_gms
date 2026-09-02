<!-- 轮播图编辑弹窗 -->
<template>
    <ele-modal form :width="880" v-model="visible" :title="isUpdate ? '查看数据' : '查看全部数据'" @open="handleOpen">
        <el-form ref="formRef" :model="form" @submit.prevent="" v-if="!isUpdate">
            <el-row :gutter="16">
                <el-col :lg="8" :md="8" :sm="12" :xs="24">
                    <el-form-item label="用户ID">
                        <el-input-number :min="1" v-model="form.uid" placeholder="请输入" :controls="false"
                            class="ele-fluid" style="width: 100%;" clearable @enter.native="search" />
                    </el-form-item>
                </el-col>
                <el-col :sm="8" :xs="24">
                    <el-form-item label="轮播图名称" prop="name">
                        <el-input v-model="form.name" placeholder="请输入轮播图名称" clearable @enter.native="search" />
                    </el-form-item>
                </el-col>
                <el-col :sm="8" :xs="24">
                    <el-form-item label="所属导航" prop="navId">
                        <dict-data code="bannerJumpType" v-model="form.navId" valueType="number" placeholder="请选择所属导航"
                            style="width: 100%" />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label-width="16px">
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button @click="reset">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>
        <template #footer>
            <el-button @click="handleCancel">取消</el-button>
        </template>
        <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
            :tools="['reload', 'columns', 'maximized']" :show-overflow-tooltip="true" :border="true"
            v-model:selections="selections" :highlight-current-row="true" :headerEllipsis="false" :pagination="false"
            :footer-style="{ paddingBottom: '16px' }" cache-key="proBanner">
        </ele-pro-table>
    </ele-modal>

</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from "vue";
import type { FormInstance } from "element-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import { EleMessage, EleProTable } from "ele-admin-plus/es";
import { useFormData } from "@/utils/use-form-data";
import { addBanner, pageBanner, updateBanner } from "@/api/config/homeBannerApi";
import type { Banner, BannerParam } from "@/api/model/homeBanner";
import { useConfigStore } from "@/store/modules/config";

const configStore = useConfigStore();

const props = defineProps<{
    /** 修改回显的数据 */
    data?: Banner | null;
}>();

const emit = defineEmits<{
    (e: "done"): void;
}>();

/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });

/** 是否是修改 */
const isUpdate = ref(false);

/** 提交状态 */
const loading = ref(false);

/** 表单实例 */
const formRef = ref<FormInstance | null>(null);

/** 表单数据 */
const [form, resetFields, assignFields] = useFormData<Banner>({
    id: undefined,
    name: '',
    priority: undefined,
    navId: undefined,
    jumpType: undefined,
    countryCodes: undefined,
    status: 1,
    pushRange: undefined,
    pushDetail: '',
    intervalTime: undefined,
    zh: '',
    en: '',
    th: '',
    mm: '',
    my: '',
    vn: '',
    indon: '',
    uca: '',
});

const search = () => {
    reload(form);
};
/**  重置 */
const reset = () => {
    resetFields();
    search();
};
/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);
/** 表格列配置 */
const columns = ref<Columns>([
    {
        prop: "id",
        label: "ID",
        width: 60,
        align: "center",
        fixed: "left",
    },
    {
        prop: "priority",
        label: "名称",
        // width: 80,
        align: "center",
    },
    {
        prop: "priority",
        label: "加载次数",
        // width: 80,
        align: "center",
    },
    {
        prop: "priority",
        label: "曝光次数",
        // width: 80,
        align: "center",
    },
    {
        prop: "priority",
        label: "点击次数",
        // width: 80,
        align: "center",
    },
    {
        prop: "priority",
        label: "点击转化率",
        // width: 80,
        align: "center",
    },
]);

/** 表格选中数据 */
const selections = ref<Banner[]>([]);

/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageBanner({
        ...where,
        ...orders,
    });
};

/** 搜索 */
const reload = (where?: BannerParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
};
/** 关闭弹窗 */
const handleCancel = () => {
    visible.value = false;
};


/** 弹窗打开事件 */
const handleOpen = () => {
    if (props.data) {
        assignFields({ ...props.data });
        isUpdate.value = true;
    } else {
        resetFields();
        isUpdate.value = false;
    }
    nextTick(() => {
        nextTick(() => {
            formRef.value?.clearValidate?.();
        });
    });
};
</script>
<style lang="scss" scoped>
:deep(.el-input-number__inner::placeholder) {
    text-align: left !important;
}
</style>
