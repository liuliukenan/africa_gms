<template>
    <ele-page>
        <ele-card :body-style="{ padding: '0px' }">
            <!-- <announcement-conf-search ref="searchRef" style="margin-bottom: -14px" @search="reload" /> -->
            <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :tools="['reload', 'columns', 'maximized']"
                :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :pagination="false"
                :highlight-current-row="true" :footer-style="{ padding: '0px' }" cache-key="timeTable">
                <template #toolbar>
                    <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()">
                        新建时间段
                    </el-button>
                </template>
                <template #sourceType="{ row }">
                    <dict-data code="announceType" v-model="row.sourceType" type="tag" value-type="number" />
                </template>
                <template #jumpType="{ row }">
                    <dict-data code="jumpType2" v-model="row.jumpType" type="tag" value-type="number" />
                </template>
                <template #state="{ row }">
                    <el-tag v-if="row.state" type="success">开启</el-tag>
                    <el-tag v-else type="danger">关闭</el-tag>
                </template>

                <template #action="{ row }">
                    <el-link type="primary" :underline="false" @click="openEdit(row)">
                        修改
                    </el-link>
                    <!-- <el-divider direction="vertical" />
                    <el-link type="danger" :underline="false" @click="remove(row)">
                        删除
                    </el-link> -->
                </template>
            </ele-pro-table>
        </ele-card>
        <TimeTableEdit :data="current" :form="props.form" v-model="showEdit" @done="reload" />
    </ele-page>

</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { ElMessageBox } from "element-plus/es";
import { EleMessage } from "ele-admin-plus/es";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import { PlusOutlined } from "@/components/icons";
// import AnnouncementConfSearch from "./components/announcement-conf-search.vue";
import TimeTableEdit from "./time-table-edit.vue";
// import { pageAnnouncementConfs, removeAnnouncementConf } from "@/api/push/announcementConfApi";
import type { AnnouncementConf, AnnouncementConfParam } from "@/api/push/model/announcementConf";
import { pageAnnounceTriggerConfs, removeAnnounceTriggerConf } from "@/api/push/announceTriggerConfApi";
import { toDateString } from "@/utils/utils";

const props = defineProps<{
    triggerType?: number;
    form?: any;
}>();

/** 搜索栏实例 */
// const searchRef = ref<InstanceType<typeof AnnouncementConfSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
    {
        prop: "name",
        label: "名称",
        minWidth: 110,
        align: 'left',
    },
    {
        prop: "startTime",
        // formatter: (row: any) => toDateString(row.startTime),
        label: "开始时间",
        minWidth: 110,
        align: 'left',
    },
    {
        prop: "endTime",
        // formatter: (row: any) => toDateString(row.endTime),
        label: "结束时间",
        minWidth: 110,
        align: 'left',
    },
    {
        prop: "minIntervalSeconds",
        label: "间隔最小秒数",
        minWidth: 110,
        align: 'left',
    },
    {
        prop: "maxIntervalSeconds",
        label: "间隔最大秒数",
        minWidth: 110,
        align: 'left',
    },
    {
        columnKey: "action",
        label: "操作",
        width: 150,
        fixed: 'right',
        align: "center",
        slot: "action",
        hideInPrint: true,
        hideInExport: true
    }
]);

/** 表格选中数据 */
const selections = ref<AnnouncementConf[]>([]);

/** 当前编辑数据 */
const current = ref<AnnouncementConf | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);


/** 表格数据源：取 form.robotTimeSlots */
const datasource = computed(() => props.form?.robotTimeSlots || []);

/** 搜索 */
const reload = (where?: AnnouncementConfParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row?: AnnouncementConf) => {
    current.value = row ?? null;
    showEdit.value = true;
};

/** 删除单个 */
const remove = (row: AnnouncementConf) => {
    ElMessageBox.confirm(
        '确定要删除“' + row.id + '”吗?',
        '系统提示',
        { type: 'warning', draggable: true }
    )
        .then(() => {
            const loading = EleMessage.loading({
                message: '请求中..',
                plain: true
            });
            removeAnnounceTriggerConf(row.id)
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
        .catch(() => {
        });
};

</script>
