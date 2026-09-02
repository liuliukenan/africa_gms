<template>
    <ele-page>
        <user-gift-record-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
        <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
            :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
            :export-config="{ fileName: '新手礼包记录', datasource: exportSource }"
            :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }"
            cache-key="newUserBagTable">
            <template #toolbar>
                <el-popconfirm title="确定要导出所有数据吗?" @confirm="openExport()" width="250px">
                    <template #reference>
                        <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">导出</el-button>
                    </template>
                </el-popconfirm>
            </template>
            <template #state="{ row }">
                <dict-data code="newUserFiftStatus" valueType="number" type="tag" v-model="row.state" />
            </template>
            <template #action="{ row }">
                <!-- <el-link type="primary" :underline="false" @click="openG(row)">
                        发放
                    </el-link> -->
                <el-popconfirm title="确认发放礼包吗？" @confirm="openGive(row)">
                    <template #reference>
                        <el-link type="danger" class="ele-btn-icon" size="small" v-if="!row.state">
                            <span>发送</span>
                        </el-link>
                    </template>
                </el-popconfirm>
                <!-- <el-divider direction="vertical" v-if="!row.state" /> -->
                <el-link type="success" :underline="false" @click="openSee(row)" v-if="row.state">
                    查看
                </el-link>
            </template>
        </ele-pro-table>
        <user-gift-record-see :data="current" v-model="showSee" @done="reload" />
    </ele-page>

</template>

<script lang="ts" setup>
import { ref } from "vue";
import { EleMessage } from "ele-admin-plus/es";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
  import { UploadOutlined} from '@/components/icons';
import UserGiftRecordSearch from "./components/user-gift-record-search.vue";
import UserGiftRecordSee from "./components/user-gift-record-see.vue";
import { addUserGiftRecord, pageUserGiftRecords, exportUserGift } from "@/api/welfare/userGiftRecordApi";
import type { UserGiftRecord, UserGiftRecordParam } from "@/api/welfare/model/userGiftRecord";
import { handleDownload } from "@/utils/file-util";
import { addSecret } from "@/utils/common";


/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof UserGiftRecordSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
    // {
    //     prop: "id",
    //     label: "id",
    //     width: 60,
    //     align: 'left',
    //     fixed: 'left',
    // },
    {
        prop: "uid",
        label: "用户ID",
        minWidth: 110,
        align: 'left',
    },
    {
        prop: "pid",
        label: "代理ID",
        minWidth: 110,
        align: 'left',
    },
    {
        prop: "phone",
        label: "手机号",
        minWidth: 110,
        formatter: (row) =>addSecret(row.phone),   
        align: 'left',
    },
    {
        prop: "amount",
        label: "金额",
        minWidth: 110,
        align: 'left',
    },
    {
        prop: "state",
        slot: "state",
        label: "发放状态",
        minWidth: 110,
        align: 'left',
    },
    {
        label: '时间',
        prop: 'createTime',
        align: 'left',
        minWidth: 110
    },
    {
        columnKey: "action",
        label: "操作",
        width: 200,
        align: "center",
        slot: "action",
        hideInPrint: true,
        hideInExport: true
    }
]);

/** 表格选中数据 */
const selections = ref<UserGiftRecord[]>([]);

/** 当前编辑数据 */
const current = ref<UserGiftRecord | null>(null);

/** 是否显示编辑弹窗 */
const showSee = ref(false);


/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageUserGiftRecords({
        ...where,
        ...orders,
        ...pages
    });
};

/** 搜索 */
const reload = (where?: UserGiftRecordParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
};

/** 打开查看弹窗 */
const openSee = (row?: UserGiftRecord) => {
    current.value = row ?? null;
    showSee.value = true;
};
const openGive = (row: UserGiftRecord) => {
    const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
    });
    if (!row.id) return
    addUserGiftRecord(row.id)
        .then((msg) => {
            loading.close();
            EleMessage.success(msg);
            reload();
            current.value = row;
            setTimeout(() => {
                showSee.value = true;
            }, 800);

        })
        .catch((e) => {
            loading.close();
            EleMessage.error(e.message);
        });
}

/** 导出和打印全部数据的数据源 */
const exportSource: DatasourceFunction = ({ where, orders }) => {
    return pageUserGiftRecords({
        ...where,
        ...orders
    });
};
  // 导出
  const openExport = () => {
    exportUserGift(searchRef.value!.searchParams()).then((res) => {
        handleDownload('新用户礼包', res.data as any);
      });
  }
</script>
