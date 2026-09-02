<template>
    <ele-page>
        <ele-card :body-style="{ paddingTop: '8px' }">
            <!-- <activitysSearch ref="searchRef" style="margin-bottom: -14px" @search="reload" /> -->
            <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
                :show-overflow-tooltip="true" :border="true" v-model:selections="selections"
                :highlight-current-row="true" :headerEllipsis="false" :footer-style="{ paddingBottom: '16px' }"
                cache-key="proActivitys">
                <template #toolbar>
                    <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()">
                        新建
                    </el-button>
                    <el-popconfirm title="确认发送到服务器吗？" @confirm="sendServer()">
                        <template #reference>
                            <el-button type="danger" class="ele-btn-icon">
                                <span>发送服务器</span>
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
                <template #jumpType="{ row }">
                    <dict-data code="actionType" v-model="row.jumpType" valueType="number" type="tag" />
                </template>
                <template #jumpId="{ row }">
                    <div v-for="item in jumpIdArr" :key="item.id">
                        <span v-if="item.id === row.jumpId">{{ item.jumpName }}</span>
                    </div>
                </template>
                <template #gameGroup="{ row }">
                    <dict-data code="gameGroup" v-model="row.gameGroup" valueType="number" type="tag" />
                </template>
                <template #type="{ row }">
                    <dict-data code="bannerJumpType" v-model="row.type" valueType="string" type="tag" />
                </template>
                <template #imgUrl="{ row }">
                    <el-image :src="imgBaseUrl + row.imgUrl" style="width: 100px; height: 100px" />
                </template>
                <template #status="{ row }">
                    <el-link :type="row.status === true ? 'success' : 'danger'">{{ row.status === true ? '启用' : '禁用'
                        }}</el-link>
                </template>
                <template #action="{ row }">
                    <el-link type="primary" :underline="false" @click="openEdit(row)">
                        修改
                    </el-link>
                    <el-divider direction="vertical" />
                    <el-link type="danger" :underline="false" @click="remove(row)"> 删除
                    </el-link>
                </template>
            </ele-pro-table>
        </ele-card>
        <HomeActivitysEdit :data="current" v-model="showEdit" @done="reload" />
    </ele-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessageBox } from "element-plus/es";
import { EleMessage } from "ele-admin-plus/es";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import { PlusOutlined } from "@/components/icons";
// import activitysSearch from "./components/activitys-search.vue";
import HomeActivitysEdit from "./components/activitysEdit.vue";
import { pageActivitys, removeActivitys, sendConfServer } from "@/api/config/activitysApi";
import type { Activitys, ActivitysParam } from "@/api/model/activitys";
import { toDateZone } from "@/utils/utils";
import { byTypeGetList } from "@/api/platform/faceShotApi";
const imgBaseUrl = import.meta.env.VITE_APP_IMG_URL;
/** 搜索栏实例 */
// const searchRef = ref<InstanceType<typeof AnnouncementSearch> | null>(null);

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
        prop: "countryCode",
        label: "国家代码",
        minWidth: 110,
        align: 'left',
    },
    {
        prop: "name",
        label: "显示名称",
        minWidth: 110,
        align: 'left',
    },
    {
        prop: "imgUrl",
        slot: "imgUrl",
        label: "图片",
        minWidth: 110,
        align: 'left',
    },
    {
        prop: "type",
        slot: "type",
        label: "活动类型",
        minWidth: 110,
        align: 'left',
    },
    {
        prop: "jumpType",
        slot: "jumpType",
        label: "跳转类型",
        minWidth: 110,
        align: 'left',
    },
    {
        prop: "jumpId",
        slot: "jumpId",
        label: "跳转页面",
        minWidth: 110,
        align: 'left',
    },
    {
        label: '排序',
        prop: 'sortNumber',
        align: 'center'
    },

    {
        label: '状态',
        prop: 'status',
        slot: 'status',
        align: 'center'
    },
    {
        prop: "startDate",
        formatter: (row) => toDateZone(row.startDate, row.countryCode),
        label: "开始时间",
        minWidth: 110,
        align: 'left',
    },
    {
        prop: "endDate",
        formatter: (row) => toDateZone(row.endDate, row.countryCode),
        label: "结束时间",
        minWidth: 110,
        align: 'left',
    },
    {
        columnKey: "action",
        label: "操作",
        width: 200,
        align: "center",
        slot: "action",
        hideInPrint: true,
        hideInExport: true,
    },
]);

/** 表格选中数据 */
const selections = ref<Activitys[]>([]);

/** 当前编辑数据 */
const current = ref<Activitys | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);

/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageActivitys({
        ...where,
        ...orders,
        ...pages,
    });
};

/** 搜索 */
const reload = (where?: ActivitysParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row?: Activitys) => {
    current.value = row ?? null;
    showEdit.value = true;
};
const jumpIdArr = ref<any[]>([]);
// 根据内联，外联类型获取列表
const getList = (val: any) => {
    byTypeGetList(val).then((res) => {
        console.log(res);
        jumpIdArr.value = res;

    });
};
getList(3);
/** 删除单个 */
const remove = (row: Activitys) => {
    ElMessageBox.confirm("确定要删除ID为“" + row.id + "”的数据吗?", "系统提示", {
        type: "warning",
        draggable: true,
    })
        .then(() => {
            const loading = EleMessage.loading({
                message: "请求中..",
                plain: true,
            });
            removeActivitys(row.id)
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

// 发送到服务器
const sendServer = () => {
    const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
    });
    sendConfServer()
        .then((msg) => {
            loading.close();
            EleMessage.success(msg);
        })
        .catch((e) => {
            loading.close();
            EleMessage.error(e.message);
        });
};
</script>
<script lang="ts">
export default {
    name: 'Activitys'
};
</script>
<style lang="scss" scoped>
.w-100 {
    width: 100%;
}
</style>
