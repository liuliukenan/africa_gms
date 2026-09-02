<template>
    <ele-page>
        <!-- <lottery-search ref="searchRef" style="margin-bottom: -14px" @search="reload" /> -->
        <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
            :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
            :headerEllipsis="false" :export-config="{ fileName: '机器人记录', datasource: exportSource }"
            :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }"
            cache-key="proHistory">
            <template #toolbar>
                <el-space>
                    <el-button type="primary" class="ele-btn-icon" @click="openEdit()">
                        <template #icon>
                            <plus-outlined />
                        </template>
                        <span>新建</span>
                    </el-button>
                </el-space>
            </template>
            <template #action="{ row }">
                <el-link type="primary" :underline="false" @click="openEdit(row)"> 修改
                </el-link>
                <el-divider direction="vertical" />
                <el-link type="danger" :underline="false" @click="remove(row)"> 删除
                </el-link>
            </template>
        </ele-pro-table>
        <lottery-edit :data="current" v-model="showEdit" @done="reload" />
    </ele-page>

</template>

<script lang="ts" setup>
import { ref } from "vue";
import { EleMessage, type EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
// import LotterySearch from "./components/lottery-search.vue";
import { PlusOutlined } from '@/components/icons';
import LotteryEdit from "./components/lottery-edit.vue";
import type { Robot, RobotParam } from "@/api/welfare/model/index";
import { ElMessageBox } from "element-plus";
import { pageRobot, removeRobot } from '@/api/welfare/dailyLottery';

/** 搜索栏实例 */
// const searchRef = ref<InstanceType<typeof LotterySearch> | null>(null);
// 获取表格tableData的列数据

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
    {
        prop: "id",
        label: "用户ID",
        width: 140,
        align: 'center',
        fixed: 'left',
    },
    {
        prop: "minPeron",
        label: "中奖最少人数",
        align: 'center',
    },
    {
        prop: "maxPerson",
        label: "中奖最多人数",
        align: 'center',
    },
    {
        prop: "personRobotRange",
        label: "中奖机器范围",
        align: 'center',
        formatter: (row: any) => '[' + row.personRobotRange + ']'
    },
    {
        label: "操作",
        width: 200,
        prop: 'action',
        align: "center",
        slot: "action",
        fixed: 'right',
    }
]);

/** 表格选中数据 */
const selections = ref<Robot[]>([]);

/** 当前编辑数据 */
const current = ref<Robot | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);

/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    // where = { lotteryType: 0, ...where }
    return pageRobot({
        ...where,
        ...orders,
        ...pages
    });
};
/* 打开编辑弹窗 */
const openEdit = (row?: Robot) => {
    current.value = row ?? null;
    showEdit.value = true;
};
/** 搜索 */
const reload = (where?: RobotParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
};
/** 导出和打印全部数据的数据源 */
const exportSource: DatasourceFunction = ({ where, orders }) => {
    where = { lotteryType: 0, ...where }
    return pageRobot({
        ...where,
        ...orders
    });
};
/* 删除单个 */
const remove = (row: Robot) => {
    ElMessageBox.confirm('确定要删除ID为“' + row.id + '”的数据吗?', '系统提示', {
        type: 'warning',
        draggable: true
    })
        .then(() => {
            const loading = EleMessage.loading({
                message: '请求中..',
                plain: true
            });
            if (!row.id) return;
            removeRobot(row.id)
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
</script>

<script lang="ts">
export default {
    name: 'History'
};
</script>