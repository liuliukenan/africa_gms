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
import ActivityConfig from './components/activityConfig.vue';
import Records from './components/records.vue';
import { usePermission } from '@/utils/use-permission';

// 当前激活 tab 的 index（字符串）
const activeTab = ref('first');
const { hasPermission } = usePermission();

const allTabs = [
    {
        label: '首日充值活动配置',
        name: 'first',
        permission: 'welfare:firstPay:config',
        component: ActivityConfig
    },
    {
        label: '首充奖励记录',
        name: 'second',
        permission: 'welfare:firstPay:records',
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

<style lang="scss" scoped>
::v-deep .el-divider__text {
    font-weight: bold;
    font-size: 20px;
}


.title {
    padding-left: 30px;
    font-weight: bold;
    font-size: 20px;
    margin: 20px 0;
}

.form-table .el-form-item {
    margin-bottom: 0 !important;
}

.tips {
    color: red;
}

:deep(.el-input.is-disabled .el-input__wrapper) {
    background: rgb(253, 247, 247);
    color: black !important;
}

:deep(.el-input.is-disabled .el-input__inner) {
    color: black !important;
}
</style>