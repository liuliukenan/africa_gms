<template>
    <ele-card :bordered="false" style="padding: 0;position:relative;" type="border-card">
        <!-- :class="{'pc':!mobile}" -->
        <el-tabs v-model="activeName" type="card" class="demo-tabs"  @tab-click="changeTab">
            <el-tab-pane v-for="tab in availableTabs" :key="tab.name" :label="tab.label" :name="tab.name" lazy>
                <!-- <el-space style="justify-content: flex-end;">
                    <el-button-group>
                        <el-button :type="type === 0 ? 'primary' : 'info'" @click="handleClick(0)"> 比率 </el-button>
                        <el-button :type="type === 1 ? 'primary' : 'info'" @click="handleClick(1)">人数</el-button>
                        <el-button :type="type === 2 ? 'primary' : 'info'" @click="handleClick(2)">人均</el-button>
                    </el-button-group>
                    <span style="margin-left: 10px;">
                        <el-popconfirm title="确认导出表格数据吗？" @confirm="openExport()">
                            <template #reference>
                                <el-button type="warning" class="ele-btn-icon">导出</el-button>
                            </template>
                        </el-popconfirm>
                    </span>
                </el-space> -->
                <!-- :type="type" :activeTab="activeName" -->
                <!-- <component :is="tab.component" ></component> -->
            </el-tab-pane>
        </el-tabs>
    </ele-card>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import Bets from './bets.vue';
import Profits from './profits.vue';
import { useMobile } from '@/utils/use-mobile';
import { usePermission } from '@/utils/use-permission';
const props = defineProps<{
    /** 修改回显的数据 */
    //   uid: number;
}>();
/** 是否是移动端 */
const { mobile } = useMobile();
const activeName = ref('first');
const { hasPermission } = usePermission();

const allTabs = [
    {
        label: '投注分布',
        name: 'first',
        permission: '',
        component: Bets
    },
    {
        label: '盈亏分布',
        name: 'second',
        // permission: 'welfare:tenTimes:winRecord',
        permission: '',
        component: Profits
    },
];
const type = ref(1);
const handleClick = (val: number) => {
    type.value = val;
}
const openExport = () => {
}
const changeTab = (e) => {
    activeName.value = e.name;
    //  type.value=0
}

// 计算可用的标签页
const availableTabs = computed(() => {
    return allTabs.filter(tab => tab?.permission ? hasPermission(tab.permission) : true);
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
    name: 'TenTimes'
};
</script>
<style lang="scss" scoped>
:deep(.pc .ele-pro-table) {
    margin-top: -32px;
}
:deep(.pc .ele-toolbar) {
    margin-bottom: 15px;
}
.pc2 {
    position: absolute;
    top: 10px;
    right: 10px;
}

:deep(.ele-card-body) {
    padding: 0;
}

:deep(.el-tabs__item.is-active) {
    background-color: var(--el-color-primary);
    color: #fff;
    transition: all 0.3s linear;
}
</style>