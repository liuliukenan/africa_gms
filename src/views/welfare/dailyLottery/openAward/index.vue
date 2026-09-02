<template>
    <ele-pro-table ref="tableRef" :striped="true" :bordered="true" row-key="id" :columns="columns"
        :datasource="datasource" :scroll="{ x: 1000 }" :where="defaultWhere" cache-key="probyRobotName">
        <!-- <template #toolbar>
            <el-space>
              <el-button type="primary" class="ele-btn-icon" @click="openEdit()">
                <template #icon>
                  <plus-outlined />
                </template>
<span>新建</span>
</el-button>
</el-space>
</template> -->
        <template #createTime="{ row }">
            <div style="font-size: 12px">{{ row.createTime }}</div>
            <div style="font-size: 12px">{{ row.updateTime }}</div>
        </template>
        <template #action="{ row }">
            <el-link type="primary" :underline="false" @click="openEdit(row)"> 修改
            </el-link>
            <el-divider direction="vertical" />
            <el-link type="danger" :underline="false" @click="remove(row)"> 删除
            </el-link>
        </template>
    </ele-pro-table>

</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { pageOpenAward } from '@/api/welfare/dailyLottery';
import type { OpenAward } from '@/api/welfare/model';
import { ElMessageBox } from 'element-plus';
import { EleMessage, EleProTable } from 'ele-admin-plus';
import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
// 表格实例
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);
/** 搜索栏实例 */
// const searchRef = ref<InstanceType<typeof ByRobotNameSearch> | null>(null);
// 表格列配置
const columns = ref<Columns>([
    {
        label: '期数',
        prop: 'periods',
        // width: 60,
        align: 'left',
        fixed: 'left',
    },
    {
        label: '中奖号码',
        prop: 'awardNum',
        // width: 110,
        align: 'left',
    },
    {
        label: '参与人数',
        prop: 'joinNum',
        // width: 110,
        align: 'left',
    },
    {
        label: '中奖总人数',
        prop: 'hitTotalNum',
        // width: 110,
        align: 'left',
    },
    {
        label: '中奖用户数',
        prop: 'hitUserNum',
        // width: 110,
        align: 'left',
    },
    {
        label: '中奖金额',
        prop: 'awardAmount',
        // width: 110,
        align: 'left',
    },
]);

// 表格选中数据
const selection = ref([]);

// 当前编辑数据
const current = ref<OpenAward | null>(null);

// 是否显示编辑弹窗
const showEdit = ref(false);
const showImport = ref(false);
// 默认搜索条件
const defaultWhere = reactive({
    id: undefined,
    name: ""
});

// 表格数据源
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageOpenAward({ ...defaultWhere, ...where, ...orders, ...pages });
};

/* 搜索 */
const reload = (where?: OpenAward) => {
    selection.value = [];
    tableRef?.value?.reload({ page: 1, where });
};

/* 打开编辑弹窗 */
const openEdit = (row?: OpenAward) => {
    current.value = row ?? null;
    showEdit.value = true;
};
//提交状态
const loading = ref(false);
// 发送到服务器
const refresh = () => {
    loading.value = true;
    // fishReload(7)
    //     .then((msg) => {
    //         loading.value = false;
    //         EleMessage.success(msg);
    //     })
    //     .catch((e) => {
    //         loading.value = false;
    //         EleMessage.error(e.message);
    //     });
};
/* 删除单个 */
const remove = (row: OpenAward) => {
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
            // removeByRobotName(row.id)
            //     .then((msg) => {
            //         loading.close();
            //         EleMessage.success(msg);
            //         reload();
            //     })
            //     .catch((e) => {
            //         loading.close();
            //         EleMessage.error(e.message);
            //     });
        })
        .catch(() => { });
};
</script>

<script lang="ts">
export default {
    name: 'OpenAward'
};
</script>