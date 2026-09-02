<template>
    <ele-modal form  :title="t('user.userList.userTabbar.title')" v-model="visible" @open="handleOpen" width="80%">
        <ele-card :bordered="false" style="padding: 0" type="border-card">
            <el-tabs v-model="activeName" type="card" class="demo-tabs">
                <el-tab-pane v-for="tab in availableTabs" :key="tab.name" :label="tab.label" :name="tab.name" lazy>
                    <component :is="tab.component" :uid="uid" :data="data"></component>
                </el-tab-pane>
            </el-tabs>
        </ele-card>
         <template #footer>
      <el-button :loading="loading" @click="handleCancel">{{ t('action.cancel') }}</el-button>
    </template>
    </ele-modal>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import Recharge from './components/recharge/index.vue';
import KYC from './components/kyc/index.vue';
import Game from './components/game/index.vue';
import Activity from './components/activity/index.vue';
import Withdraw from './components/withdraw/index.vue';
// import Balance from './components/balance/index.vue';
import Wallet from './components/wallet/index.vue';
import Delete from './components/delete/index.vue';
import FundTraceability from './components/fundTraceability/index.vue';
import GetBonus from './components/getBonus/index.vue';

import { usePermission } from '@/utils/use-permission';

const { t } = useI18n();
const props = defineProps<{
    /** 修改回显的数据 */
    uid: number;
    // 表格行数据
    data: any;
}>();
const activeName = ref('first');
/** 提交状态 */
const loading = ref(false);
const { hasPermission } = usePermission();
/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });
const allTabs = [
    {
        label: t('user.userList.userTabbar.gameInfo'),
        name: 'first',
        permission: '',
        component: Game
    },
    {
        label: t('user.userList.userTabbar.activityInfo'),
        name: 'second',
        // permission: 'welfare:tenTimes:winRecord',
        permission: '',
        component: Activity
    },
    {
        label: t('user.userList.userTabbar.kycInfo'),
        name: 'third',
        // permission: 'welfare:tenTimes:winRecord',
        permission: '',
        component: KYC
    },
    {
        label: t('user.userList.userTabbar.rechargeInfo'),
        name: 'fourth',
        // permission: 'welfare:tenTimes:winRecord',
        permission: '',
        component: Recharge
    },
    {
        label: t('user.userList.userTabbar.withdrawInfo'),
        name: 'fifth',
        // permission: 'welfare:tenTimes:winRecord',
        permission: '',
        component: Withdraw
    },
    {
        label: t('user.userList.userTabbar.walletInfo'),
        name: 'seventh',
        permission: '',
        component: Wallet
    },
    // {
    //     label: t('user.userList.userTabbar.balanceInfo'),
    //     name: 'sixth',
    //     // permission: 'welfare:tenTimes:winRecord',
    //     permission: '',
    //     component: Balance
    // },
    {
        label: t('user.userList.userTabbar.deleteInfo'),
        name: 'nine',
        // permission: 'welfare:tenTimes:winRecord',
        permission: '',
        component: Delete
    },
    {
        label: t('user.userList.userTabbar.fundTraceability'),
        name: 'eighth',
        // permission: 'welfare:tenTimes:winRecord',
        permission: '',
        component: FundTraceability
    },
    {
        label: t('user.userList.userTabbar.getBonus'),
        name: 'tenth',
        // permission: 'welfare:tenTimes:winRecord',
        permission: '',
        component: GetBonus
    },
];

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
const handleOpen = () => {

};
/** 关闭弹窗 */
const handleCancel = () => {
  visible.value = false;
};
</script>

<script lang="ts">
export default {
    name: 'TenTimes'
};
</script>
<style lang="scss" scoped>
:deep(.ele-card-body) {
    padding: 0;
}

:deep(.el-tabs__item.is-active) {
    background-color: var(--el-color-primary);
    color: #fff;
    transition: all 0.3s linear;
}
</style>