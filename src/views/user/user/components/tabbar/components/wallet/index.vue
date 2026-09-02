<template>
    <el-descriptions :border="true" :column="mobile ? 2 : 4" class="detail-table" direction="vertical">
        <el-descriptions-item :label="t('user.userList.wallet.totalBalance')" :min-width="mobile ? 5 : 90">
            <div>{{ totalBalance }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="t('user.userList.wallet.cashBalance')" :min-width="mobile ? 5 : 90">
            <div>{{ form.cashBalance ?? 0 }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="t('user.userList.wallet.groupBalance')" :min-width="mobile ? 5 : 90">
            <div>{{ form.groupBalance ?? 0 }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="t('user.userList.wallet.gameBalance')" :min-width="mobile ? 5 : 90">
            <div>{{ form.gameBalance ?? 0 }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="t('user.userList.wallet.withdrawableAmount')" :min-width="mobile ? 5 : 90">
            <div>{{ form.withdrawableAmount ?? 0 }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="t('user.userList.wallet.cashRemainingFlow')" :min-width="mobile ? 5 : 90">
            <div>{{ form.cashRemainingFlow ?? 0 }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="t('user.userList.wallet.groupRemainingFlow')" :min-width="mobile ? 5 : 90">
            <div>{{ form.groupRemainingFlow ?? 0 }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="t('user.userList.wallet.gameRemainingFlow')" :min-width="mobile ? 5 : 90">
            <div>{{ form.gameRemainingFlow ?? 0 }}</div>
        </el-descriptions-item>
    </el-descriptions>
</template>

<script lang="ts" setup>
import { useFormData } from '@/utils/use-form-data';
import { getUserWalletFlow } from '@/api/user/userApi';
import { useMobile } from '@/utils/use-mobile';
import { EleMessage } from 'ele-admin-plus';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const { t } = useI18n();

interface UserWalletFlow {
    totalBalance?: number;
    cashBalance?: number;
    groupBalance?: number;
    gameBalance?: number;
    withdrawableAmount?: number;
    cashRemainingFlow?: number;
    groupRemainingFlow?: number;
    gameRemainingFlow?: number;
}

const props = defineProps<{
    /** 用户ID */
    uid: number;
}>();

const emit = defineEmits<{
    (e: 'done'): void;
}>();

/** 是否是移动端 */
const { mobile } = useMobile();

/** 表单数据 */
const [form, _, assignFields] = useFormData<UserWalletFlow>({
    totalBalance: undefined,
    cashBalance: undefined,
    groupBalance: undefined,
    gameBalance: undefined,
    withdrawableAmount: undefined,
    cashRemainingFlow: undefined,
    groupRemainingFlow: undefined,
    gameRemainingFlow: undefined,
});
const totalBalance = computed(() => ((form.cashBalance || 0) + (form.groupBalance || 0) + (form.gameBalance || 0)).toFixed(2));
const getWalletFlow = () => {
    if (props.uid) {
        getUserWalletFlow(props.uid)
            .then((data) => {
                assignFields({ ...data });
            })
            .catch((e) => {
                EleMessage.error(e.message);
            });
    }
};
getWalletFlow();
</script>
<style lang="scss" scoped>
:deep(.el-descriptions__header) {
    margin: 10px 0;
}

:deep(.el-descriptions__content.el-descriptions__cell.is-bordered-content) {
    text-align: center;
}

.detail-table :deep(.el-descriptions__label) {
    width: 120px;
    text-align: center;
    font-weight: normal;
}

.detail-table :deep(.el-descriptions__content > div) {
    max-height: 100%;
}

:deep(.el-descriptions .el-descriptions__label.el-descriptions__cell.is-bordered-label) {
    width: 121px;
}
</style>
