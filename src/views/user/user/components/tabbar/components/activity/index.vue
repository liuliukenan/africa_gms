<template>
    <el-descriptions :border="true" :column="mobile ? 2 : 4" class="detail-table" direction="vertical">
        <el-descriptions-item :label="t('user.userList.activity.totalLoginDays')" :min-width="mobile ? 5 : 90">
            <div>{{ form.totalLoginDays }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="t('user.userList.activity.churnDays')" :min-width="mobile ? 5 : 90">
            <div>{{ form.churnDays }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="t('user.userList.activity.last30DaysActiveDays')" :min-width="mobile ? 5 : 90">
            <div>{{ form.last30DaysActiveDays }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="t('user.userList.activity.last7DaysActiveDays')" :min-width="mobile ? 5 : 90">
            <div>{{ form.last7DaysActiveDays }}</div>
        </el-descriptions-item>

    </el-descriptions>
</template>

<script lang="ts" setup>
import { useFormData } from '@/utils/use-form-data';
import { getUserActivity } from '@/api/user/userApi';
import type { UserActivity } from '@/api/model/user';
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
const [form, _, assignFields] = useFormData<UserActivity>({
    totalLoginDays: 0,
    churnDays: 0,
    last30DaysActiveDays: 0,
    last7DaysActiveDays: 0
});
const getActivity = () => {
    if (props.uid) {
        getUserActivity(props.uid)
            .then((data) => {
                assignFields({ ...data });
            })
            .catch((e) => {
                EleMessage.error(e.message);
            });
    }
}
getActivity()

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
