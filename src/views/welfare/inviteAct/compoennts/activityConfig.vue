<template>
    <MultiActivityConfig 
        title="邀请拉新活动配置"
        :get-api="() => getActInfo({countryCode: 254, actTypeEnum: 'INVITE_ACT'})"
        :save-api="saveActInfo"
        :send-api="sendActInfoServer"
        :config-keys="configKeys"
        :config-labels="configLabels"
        act-type-enum="INVITE_ACT"
    />
</template>

<script setup lang="ts">
import MultiActivityConfig from '@/components/MultiActivityConfig/index.vue';
// import { getInviteAct, saveInviteAct, sendConfServer } from '@/api/welfare/inviteActApi';
import { getActInfo, saveActInfo, sendActInfoServer } from '@/api/welfare/activitysApi';

// 配置键名数组
const configKeys = [
    'inviterRegister',      // 邀请人注册奖励
    'invitedRegister',      // 被邀请人注册奖励
    'inviterFirstPay',      // 邀请人首次充值奖励
    'invitedFirstPay',      // 被邀请人首次充值奖励
    'inviterAccumulatePay'  // 邀请人累计充值奖励
];

// 配置标签映射
const configLabels: Record<string, string> = {
    'inviterRegister': '邀请人注册奖励',
    'invitedRegister': '被邀请人注册奖励',
    'inviterFirstPay': '邀请人首次充值奖励',
    'invitedFirstPay': '被邀请人首次充值奖励',
    'inviterAccumulatePay': '邀请人累计充值奖励'
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
