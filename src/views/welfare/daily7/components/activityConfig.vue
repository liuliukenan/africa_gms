<template>
    <MultiActivityConfig 
        :title="t('welfare.daily7.configTitle')"
        :get-api="() => getActInfo({countryCode: 254, actTypeEnum: 'SIGN_IN'})"
        :save-api="saveActInfo"
        :send-api="sendActInfoServer"
        :config-keys="configKeys"
        :config-labels="configLabels"
        act-type-enum="SIGN_IN"
    />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import MultiActivityConfig from '@/components/MultiActivityConfig/index.vue';
// import { getInviteAct, saveInviteAct, sendConfServer } from '@/api/welfare/inviteActApi';
import { getActInfo, saveActInfo, sendActInfoServer } from '@/api/welfare/activitysApi';

const { t } = useI18n();

// 配置键名数组
const configKeys = [
    '1',      // 签到奖励
    '2',      // 签到奖励
    '3',      // 签到奖励
    '4',      // 签到奖励
    '5',      // 签到奖励
    '6',      // 签到奖励
    '7',      // 签到奖励
];

// 配置标签映射
const configLabels = computed<Record<string, string>>(() => ({
    '1': t('welfare.daily7.day1Reward'),
    '2': t('welfare.daily7.day2Reward'),
    '3': t('welfare.daily7.day3Reward'),
    '4': t('welfare.daily7.day4Reward'),
    '5': t('welfare.daily7.day5Reward'),
    '6': t('welfare.daily7.day6Reward'),
    '7': t('welfare.daily7.day7Reward')
}));
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
