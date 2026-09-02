<template>
    <ele-page>
        <ele-card :body-style="{ paddingTop: '8px' }">
            <EventSearch ref="searchRef" style="margin-bottom: -14px" @search="reload" />
            <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
                :show-overflow-tooltip="true" :border="true" v-model:selections="selections"
                :highlight-current-row="true" :export-config="{ fileName: '代理事件配置列表', datasource: exportSource }"
                :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }"
                cache-key="eventConfigTable" size="small">
                <!-- <template #eventType="{ row }">
                    <dict-data code="agentEventType" valueType="string" type="tag" v-model="row.eventType" />
                </template> -->
                <template #status="{ row }">
                    <el-tag :type="getStatusColor(row.status)">{{ getStatusLabel(row.status) }}</el-tag>
                </template>
            </ele-pro-table>
        </ele-card>
    </ele-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { EleProTable } from 'ele-admin-plus';
import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
import EventSearch from './components/event-search.vue';

import { listAgentEventConfig } from '@/api/agent/eventConfigApi';
import type { AgentEventConfig, AgentEventConfigQuery } from '@/api/agent/model/eventConfig';
import { toDateString } from '@/utils/utils';

/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof EventSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格选中数据 */
const selections = ref<AgentEventConfig[]>([]);

/** 订单状态颜色 */
const getStatusColor = (status: number) => {
    if (status === 1) {
        return 'success';
    } else if (status === 0) {
        return 'danger';
    }
    return 'info';
};

/** 订单状态文本 */
const getStatusLabel = (status: number) => {
    if (status === 1) {
        return '启用';
    } else if (status === 0) {
        return '禁用';
    }
    return String(status ?? '');
};

/** 表格列配置 */
const columns = ref<Columns>([
    {
        prop: 'id',
        label: 'ID',
        minWidth: 50,
        align: 'left'
    },
    {
        prop: 'eventType',
        slot: 'eventType',
        label: '事件类型',
        minWidth: 140,
        align: 'left'
    },
    {
        prop: 'eventName',
        label: '事件名称',
        minWidth: 150,
        align: 'left'
    },
    {
        prop: 'titleTemplate',
        label: '标题模板',
        minWidth: 180,
        align: 'left'
    },
    {
        prop: 'supplementTemplate',
        label: '补充内容模板',
        minWidth: 180,
        align: 'left'
    },
    {
        prop: 'titleParamDesc',
        label: '标题参数描述',
        minWidth: 150,
        align: 'left'
    },
    {
        prop: 'supplementParamDesc',
        label: '补充参数描述',
        minWidth: 150,
        align: 'left'
    },
    {
        prop: 'status',
        slot: 'status',
        label: '状态',
        minWidth: 80,
        align: 'center'
    },
    {
        prop: 'sort',
        label: '排序',
        minWidth: 70,
        align: 'center'
    },
    {
        prop: 'createTime',
        formatter: (row) => toDateString(row.createTime),
        label: '创建时间',
        // minWidth: 160,
        align: 'left'
    },
    {
        prop: 'updateTime',
        formatter: (row) => toDateString(row.updateTime),
        label: '更新时间',
        // minWidth: 160,
        align: 'left'
    }
]);

/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return listAgentEventConfig({
        ...where,
        ...orders,
        ...pages
    });
};

/** 搜索 */
const reload = (where?: AgentEventConfigQuery) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
};

/** 导出和打印全部数据的数据源 */
const exportSource: DatasourceFunction = ({ where, orders }) => {
    return listAgentEventConfig({
        ...where,
        ...orders
    });
};
</script>
