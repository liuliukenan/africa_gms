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
import BaseConfig from './baseConfig/index.vue';
import BetRecord from './betRecord/index.vue';
import OpenAward from './openAward/index.vue';
import RobotConfig from './robotConfig/index.vue';
import { usePermission } from '@/utils/use-permission';

// 当前激活 tab 的 index（字符串）
const activeTab = ref('first');
const { hasPermission } = usePermission();

const allTabs = [
    {
        label: '基础配置',
        name: 'first',
        permission: 'welfare:dailyLottery:baseConfig',
        component: BaseConfig
    },
    {
        label: '投注记录',
        name: 'third',
        permission: 'welfare:dailyLottery:betRecord',
        component: BetRecord
    },
    {
        label: '开奖记录',
        name: 'forth',
        permission: 'welfare:dailyLottery:openAward',
        component: OpenAward
    },
    {
        label: '机器人配置',
        name: 'five',
        permission: 'welfare:dailyLottery:robotConfig',
        component: RobotConfig
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

const tabClick = (tab: any) => {
    activeTab.value = tab.name;
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
    name: 'DailyLottery'
};
</script>

<style scoped>
/* ::v-deep .el-tabs--left.el-tabs--border-card .el-tabs__item.is-left.is-active{
    font-weight: bold;
}
::v-deep .el-tabs--left {
    height: 94%;
}

::v-deep .el-tabs__nav {
    height: 100%;
}

::v-deep .el-tabs--left .el-tabs__item.is-left {
    flex: 1;
}

::v-deep .ele-card-body {
    height: 100%;
} */
</style>