<template>
    <ele-card :bordered="false" style="margin: 20px">
        <el-tabs v-model="activeName" type="card" class="demo-tabs">
            <el-tab-pane v-for="tab in availableTabs" :key="tab.name" :label="tab.label" :name="tab.name">
                <component :is="tab.component"></component>
            </el-tab-pane>
        </el-tabs>
    </ele-card>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import Reward from './components/reward/index.vue';
import OpenAward from './components/openAward/index.vue';
import WinRecord from './components/winRecord/index.vue';
import { usePermission } from '@/utils/use-permission';

const activeName = ref('first');
const { hasPermission } = usePermission();

const allTabs = [
    {
        label: '基础配置',
        name: 'first',
        permission: 'welfare:rechargePrize:baseConfig',
        component: Reward
    },
    {
        label: '开奖配置',
        name: 'second',
        permission: 'welfare:rechargePrize:openAward',
        component: OpenAward
    },
    {
        label: '中奖记录',
        name: 'third',
        permission: 'welfare:rechargePrize:winRecord',
        component: WinRecord
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
        if (!availableTabs.value.some(tab => tab.name === activeName.value)) {
            if (availableTabs.value.length > 0) {
                activeName.value = availableTabs.value[0].name;
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
    name: 'RechargePrize'
};
</script>