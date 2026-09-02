<template>
    <ele-page>
        <ele-card :bordered="false">
            <el-tabs v-model="activeTab" type="card" class="demo-tabs">
                <el-tab-pane v-for="tab in availableTabs" :key="tab.name" :label="tab.label" :name="tab.name">
                    <component :is="tab.component"></component>
                </el-tab-pane>
            </el-tabs>
        </ele-card>
    </ele-page>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import BaseConfig from './components/baseConfig/index.vue';
import InviterRecords from './components/inviterRecord/index.vue';
import InviterRebeats from './components/inviterRebeat/index.vue';
import ParterApply from './components/parterApply/index.vue';
import AgentProfit from './components/agentProfit/index.vue';
import { usePermission } from '@/utils/use-permission';

const activeTab = ref('first');
const { hasPermission } = usePermission();

const allTabs = [
    {
        label: '基础配置',
        name: 'first',
        permission: 'welfare:sharePartner:baseConfig',
        component: BaseConfig
    },
    {
        label: '审核配置',
        name: 'second',
        permission: 'welfare:sharePartner:parterApply',
        component: ParterApply
    },
    {
        label: '分享奖励表',
        name: 'third',
        permission: 'welfare:sharePartner:inviterRecord',
        component: InviterRecords
    },
    {
        label: '分享流水奖励',
        name: 'forth',
        permission: 'welfare:sharePartner:inviterRebeat',
        component: InviterRebeats
    },
    {
        label: '代理利润',
        name: 'five',
        permission: 'welfare:sharePartner:agentProfit',
        component: AgentProfit
    }
];

// 计算可用的标签页
const availableTabs = computed(() => {
    return allTabs.filter(tab => hasPermission(tab.permission));
});

// 确保当前激活的标签是可用的
const ensureValidActiveTab = () => {
    nextTick(() => {
        // 如果当前激活的标签不可用，则切换到第一个可用标签
        if (!availableTabs.value.some(tab => tab.name === activeTab.value)) {
            if (availableTabs.value.length > 0) {
                activeTab.value = availableTabs.value[0].name;
            }
        }
    });
};

// 监听可用标签变化
watch(availableTabs, () => {
    ensureValidActiveTab();
}, { immediate: true });

// 组件初始化时确保标签有效
ensureValidActiveTab();
</script>

<script lang="ts">
export default {
    name: 'SharePartner'
};
</script>

<style scoped></style>