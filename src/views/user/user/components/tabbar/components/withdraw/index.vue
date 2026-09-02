<template>
    <el-descriptions :border="true" :column="mobile ? 2 : 4" class="detail-table" direction="vertical">
        <el-descriptions-item :label="t('user.userList.withdraw.totalWithdrawApplyCnt')" :min-width="mobile ? 5 : 90">
            <div>{{ form.totalWithdrawApplyCnt ?? 0 }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="t('user.userList.withdraw.totalWithdrawSuccessCnt')" :min-width="mobile ? 5 : 90">
            <div>{{ form.totalWithdrawSuccessCnt ?? 0 }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="t('user.userList.withdraw.totalWithdrawSuccessAmount')"
            :min-width="mobile ? 5 : 90">
            <div>{{ form.totalWithdrawSuccessAmount ?? 0 }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="t('user.userList.withdraw.withdrawSuccessRate')" :min-width="mobile ? 5 : 90">
            <div>{{ getPercent(form.withdrawSuccessRate ?? 0) }}</div>
        </el-descriptions-item>
        <!-- <el-descriptions-item :label="t('user.userList.withdraw.avgWithdrawAmount')" :min-width="mobile ? 5 : 90">
            <div>{{ form.avgWithdrawAmount ?? 0 }}</div>
        </el-descriptions-item> -->

        <el-descriptions-item :label="t('user.userList.withdraw.frozenAmount')" :min-width="mobile ? 5 : 90">
            <div>{{ form.frozenAmount ?? 0 }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="t('user.userList.withdraw.firstWithdrawAmount')" :min-width="mobile ? 5 : 90">
            <div>{{ form.firstWithdrawAmount ?? 0 }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="t('user.userList.withdraw.lastWithdrawAmount')" :min-width="mobile ? 5 : 90">
            <div>{{ form.lastWithdrawAmount ?? 0 }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="t('user.userList.withdraw.lockAmount')" :min-width="mobile ? 5 : 90">
            <div>{{ form.lockAmount ?? 0 }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="t('user.userList.withdraw.remainingFlow')" :min-width="mobile ? 5 : 90">
            <div>{{ form.remainingFlow ?? 0 }}</div>
        </el-descriptions-item>
        <el-descriptions-item label="" :min-width="mobile ? 5 : 90">
            <div></div>
        </el-descriptions-item>
        <!-- <el-descriptions-item label="提现信息1" :min-width="mobile ? 5 : 90">
            <div>{{ form.firstWithdrawAmount }}</div>
        </el-descriptions-item>
        <el-descriptions-item label="提现信息2" :min-width="mobile ? 5 : 90">
            <div>{{ form.firstWithdrawAmount }}</div>
        </el-descriptions-item> -->
    </el-descriptions>
</template>

<script lang="ts" setup>
import { useFormData } from '@/utils/use-form-data';
import type { UserWithdraw } from '@/api/model/user';
import { useMobile } from '@/utils/use-mobile';
import { getUserWithdraw } from '@/api/user/userApi';
import { EleMessage } from 'ele-admin-plus';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const props = defineProps<{
    /** 修改回显的数据 */
    uid: number | null;
}>();

const emit = defineEmits<{
    (e: 'done'): void;
}>();
/** 是否是移动端 */
const { mobile } = useMobile();

/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });

/** 表单数据 */
const [form, _, assignFields] = useFormData<UserWithdraw>({
    totalWithdrawApplyCnt: undefined,
    totalWithdrawSuccessCnt: 0,
    totalWithdrawSuccessAmount: undefined,
    avgWithdrawAmount: undefined,
    withdrawSuccessRate: undefined,
    frozenAmount: undefined,
    firstWithdrawAmount: undefined,
    lastWithdrawAmount: undefined,
    lockAmount: undefined,
    remainingFlow: undefined,
});
const getWithdraw = () => {
    if (props.uid) {
        getUserWithdraw(props.uid)
            .then((data) => {
                assignFields({ ...data });
            })
            .catch((e) => {
                EleMessage.error(e.message);
            });
    }
}
getWithdraw()
const getPercent = (num: number) => {
    return (num * 100).toFixed(2) + '%';
}
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

:deep(.bet .el-descriptions .el-descriptions__label.el-descriptions__cell.is-bordered-label) {
    width: 120px;
}
</style>
