<template>
    <ele-page>
        <ele-card :bordered="false" >
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
import Rank from './components/rank/index.vue';
import Award from './components/award/index.vue';
import { usePermission } from '@/utils/use-permission';

// 当前激活 tab 的 index（字符串）
const activeTab = ref('first');
const { hasPermission } = usePermission();

const allTabs = [
    {
        label: '基础配置',
        name: 'first',
        permission: 'welfare:champion:baseConfig',
        component: BaseConfig
    },
    {
        label: '排行记录',
        name: 'third',
        permission: 'welfare:champion:rank',
        component: Rank
    },
    {
        label: '中奖记录',
        name: 'forth',
        permission: 'welfare:champion:award',
        component: Award
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
    name: 'Champion'
};
</script>

<style scoped></style>