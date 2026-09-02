<template>
    <el-descriptions :border="true" :column="mobile ? 2 : 4" class="detail-table" direction="vertical">
        <el-descriptions-item :label="t('user.userList.recharge.totalPayApplyCnt')" :min-width="mobile ? 5 : 90">
            <div>{{ form.totalPayApplyCnt }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="t('user.userList.recharge.totalPaySuccessCnt')" :min-width="mobile ? 5 : 90">
            <div>{{ form.totalPaySuccessCnt }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="t('user.userList.recharge.totalPaySuccessAmount')" :min-width="mobile ? 5 : 90">
            <div>{{ form.totalPaySuccessAmount }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="t('user.userList.recharge.paySuccessRate')" :min-width="mobile ? 5 : 90">
            <div>{{ form.paySuccessRate }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="t('user.userList.recharge.avgPayAmount')" :min-width="mobile ? 5 : 90">
            <div>{{ form.avgPayAmount }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="t('user.userList.recharge.firstPayAmount')" :min-width="mobile ? 5 : 90">
            <div>{{ form.firstPayAmount }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="t('user.userList.recharge.lastPayAmount')" :min-width="mobile ? 5 : 90">
            <div>{{ form.lastPayAmount }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="t('user.userList.recharge.last7DaysRechargeAmount')" :min-width="mobile ? 5 : 90">
            <div>{{ form.last7DaysRechargeAmount }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="t('user.userList.recharge.last30DaysRechargeAmount')" :min-width="mobile ? 5 : 90">
            <div>{{ form.last30DaysRechargeAmount }}</div>
        </el-descriptions-item>
        <el-descriptions-item label="" :min-width="mobile ? 5 : 90">
            <div></div>
        </el-descriptions-item>
        <el-descriptions-item label="" :min-width="mobile ? 5 : 90">
            <div></div>
        </el-descriptions-item>
        <el-descriptions-item label="" :min-width="mobile ? 5 : 90">
            <div></div>
        </el-descriptions-item>
    </el-descriptions>
    <!-- <el-descriptions :border="true" :column="mobile ? 2 : 4" class="detail-table" direction="vertical" style="margin-top: 20px;">
        <el-descriptions-item label="30周期流水" :min-width="mobile ? 5 : 90">
            <div>{{ form.totalPayApplyCnt }}</div>
        </el-descriptions-item>
        <el-descriptions-item label="30周期有效充值" :min-width="mobile ? 5 : 90">
            <div>{{ form.totalPayApplyCnt }}</div>
        </el-descriptions-item>
        <el-descriptions-item label="7天周期流水" :min-width="mobile ? 5 : 90">
            <div>{{ form.totalPayApplyCnt }}</div>
        </el-descriptions-item>
        <el-descriptions-item label="7天周期有效充值" :min-width="mobile ? 5 : 90">
            <div>{{ form.totalPayApplyCnt }}</div>
        </el-descriptions-item>
        <el-descriptions-item label="当前福利状态" :min-width="mobile ? 5 : 90">
            <div>{{ form.totalPayApplyCnt }}</div>
        </el-descriptions-item>
        <el-descriptions-item label="历史已兑数量" :min-width="mobile ? 5 : 90">
            <div>{{ form.totalPayApplyCnt }}</div>
        </el-descriptions-item>
        <el-descriptions-item label="总裂变返利" :min-width="mobile ? 5 : 90">
            <div>{{ form.totalPayApplyCnt }}</div>
        </el-descriptions-item>
        <el-descriptions-item label="总代理返利" :min-width="mobile ? 5 : 90">
            <div>{{ form.totalPayApplyCnt }}</div>
        </el-descriptions-item>
    </el-descriptions> -->
</template>

<script lang="ts" setup>
import { useFormData } from '@/utils/use-form-data';
import { getUserRecharge } from '@/api/user/userApi';
import type { UserRecharge } from '@/api/model/user';
import { useMobile } from '@/utils/use-mobile';
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
const [form, _, assignFields] = useFormData<UserRecharge>({
    totalPayApplyCnt: undefined,
    totalPaySuccessCnt: undefined,
    totalPaySuccessAmount: undefined,
    paySuccessRate: undefined,
    avgPayAmount: undefined,
    firstPayAmount: undefined,
    lastPayAmount: undefined,
    last7DaysRechargeAmount: undefined,
    last30DaysRechargeAmount: undefined,
});
const getRecharge = () => {
    if (props.uid) {
        getUserRecharge(props.uid)
            .then((data) => {
                assignFields({ ...data });
            })
            .catch((e) => {
                EleMessage.error(e.message);
            });
    }
}
getRecharge()    
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
