<!-- 修改审核提现配置弹窗 -->
<template>
    <ele-modal :width="620" v-model="visible" :confirm-loading="loading" title="修改审核提现配置"
        :body-style="{ paddingBottom: '5px' }" @open="handleOpen">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="130px">
            <el-row :gutter="16">
                <el-col :sm="24">
                    <el-form-item label="用户类型">
                        <el-tag :type="form.userType === 0 ? 'primary' : 'success'">
                            {{ form.userType === 0 ? '非首充（普通用户）' : '首充用户（注册后首次充值）' }}
                        </el-tag>
                    </el-form-item>
                </el-col>
                <el-col :sm="24">
                    <el-form-item label="规则名称">
                        <el-input v-model="form.ruleName" disabled style="width: 100%;" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24">
                    <el-form-item label="L1 下限" prop="l1Min">
                        <el-input-number v-model="form.l1Min" :controls="false" placeholder="不填表示 -∞"
                            style="width: 100%;" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24">
                    <el-form-item label="L1 上限" prop="l1Max">
                        <el-input-number v-model="form.l1Max" :controls="false" placeholder="不填表示 +∞"
                            style="width: 100%;" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24">
                    <el-form-item label="L2 下限" prop="l2Min">
                        <el-input-number v-model="form.l2Min" :controls="false" placeholder="不填表示 -∞"
                            style="width: 100%;" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24">
                    <el-form-item label="L2 上限" prop="l2Max">
                        <el-input-number v-model="form.l2Max" :controls="false" placeholder="不填表示 +∞"
                            style="width: 100%;" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24">
                    <el-form-item label="L3 下限" prop="l3Min">
                        <el-input-number v-model="form.l3Min" :controls="false" placeholder="不填表示 -∞"
                            style="width: 100%;" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24">
                    <el-form-item label="L3 上限" prop="l3Max">
                        <el-input-number v-model="form.l3Max" :controls="false" placeholder="不填表示 +∞"
                            style="width: 100%;" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24">
                    <el-form-item label="检测周期（天）" prop="checkPeriodDays">
                        <el-input-number v-model="form.checkPeriodDays" :min="1" :controls="false"
                            placeholder="请输入" style="width: 100%;" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24">
                    <el-form-item label="排序" prop="sort">
                        <el-input-number v-model="form.sort" :min="0" :controls="false" placeholder="请输入"
                            style="width: 100%;" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24">
                    <el-form-item label="是否启用" prop="enabled">
                        <el-switch v-model="form.enabled" active-text="启用" inactive-text="禁用"
                            style="--el-switch-on-color: #13ce66;" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24">
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="form.remark" type="textarea" :rows="3" placeholder="请输入备注"
                            style="width: 100%;" />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" :loading="loading" @click="save">保存</el-button>
        </template>
    </ele-modal>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue';
import { EleMessage } from 'ele-admin-plus/es';
import { useFormData } from '@/utils/use-form-data';
import { updateWithdrawAutoAuditRule } from '@/api/platform/auditWithdrawConfApi';
import type { WithdrawAutoAuditRuleVO } from '@/api/platform/model/auditWithdrawConf';
import type { FormInstance, FormRules } from 'element-plus';

const props = defineProps<{
    data?: WithdrawAutoAuditRuleVO | null;
}>();

const emit = defineEmits<{
    (e: 'done'): void;
}>();

/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });
const formRef = ref<FormInstance | null>(null);
const loading = ref(false);

const { form, resetFields, assignFields } = useFormData<WithdrawAutoAuditRuleVO>({
    id: undefined,
    userType: undefined,
    indicatorType: undefined,
    ruleName: undefined,
    l1Min: undefined,
    l1Max: undefined,
    l2Min: undefined,
    l2Max: undefined,
    l3Min: undefined,
    l3Max: undefined,
    checkPeriodDays: undefined,
    enabled: true,
    sort: undefined,
    remark: undefined,
});

const rules = reactive<FormRules>({
    checkPeriodDays: [{ required: true, type: 'number', message: '请输入检测周期', trigger: 'blur' }],
});

/** 保存 */
const save = () => {
    if (!formRef.value) return;
    formRef.value.validate((valid) => {
        if (!valid) return;
        loading.value = true;
        updateWithdrawAutoAuditRule({ ...form })
            .then((msg) => {
                loading.value = false;
                EleMessage.success(msg);
                handleCancel();
                emit('done');
            })
            .catch((e) => {
                loading.value = false;
                EleMessage.error(e.message);
            });
    });
};

/** 关闭弹窗 */
const handleCancel = () => {
    visible.value = false;
};

/** 弹窗打开 */
const handleOpen = () => {
    if (props.data) {
        assignFields({ ...props.data });
    } else {
        resetFields();
    }
    nextTick(() => {
        nextTick(() => {
            formRef.value?.clearValidate?.();
        });
    });
};
</script>