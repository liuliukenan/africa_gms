<template>
    <ele-page>
        <ele-card style="height: 100%;">
            <el-tabs v-model="activeTab" type="border-card" @tab-click="tabClick">
                <el-tab-pane v-for="tab in availableTabs" :key="tab.name" :label="tab.label" :name="tab.name">
                    <component :is="tab.component"></component>
                </el-tab-pane>
            </el-tabs>
        </ele-card>
    </ele-page>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import ActivityConfig from './compoennts/activityConfig.vue';
import Records from './compoennts/records.vue';
import { usePermission } from '@/utils/use-permission';

// 当前激活 tab 的 index（字符串）
const activeTab = ref('first');
const { hasPermission } = usePermission();

const allTabs = [
    {
        label: '邀请拉新活动配置',
        name: 'first',
        permission: 'welfare:inviteAct:config',
        component: ActivityConfig
    },
    {
        label: '邀请拉新奖励记录',
        name: 'second',
        permission: 'welfare:inviteAct:records',
        component: Records
    }
];

const availableTabs = computed(() => {
    return allTabs.filter(tab => hasPermission(tab.permission));
});

// 监听可用 tabs 变化，如果当前激活的 tab 不可用则切换
watch(availableTabs, (newTabs) => {
    if (newTabs.length > 0 && !newTabs.find(tab => tab.name === activeTab.value)) {
        nextTick(() => {
            activeTab.value = newTabs[0].name;
        });
    }
});

const tabClick = (tab: any) => {
    activeTab.value = tab.props.name;
};
</script>
