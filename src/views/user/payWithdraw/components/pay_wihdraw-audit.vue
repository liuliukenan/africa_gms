<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="580" v-model="visible" :title="t('user.payWithdraw.audit.title')" @open="handleOpen">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="90px" @submit.prevent="">
            <el-row :gutter="16">
                <el-col :sm="24" :xs="24">
                    <el-form-item :label="t('user.payWithdraw.audit.uid') + ': '" prop="uid">
                        {{ form.uid }}
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :xs="24">
                    <el-form-item :label="t('user.payWithdraw.audit.orderNo') + ': '" prop="orderNo">
                        {{ form.orderNo }}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="24" :xs="24" >
                    <el-form-item :label="t('user.payWithdraw.audit.approved') + ': '" prop="approved">
                        <el-radio-group v-model="form.approved">
                            <el-radio :value="true" style="margin-right: 20px">{{ t('user.payWithdraw.audit.approve') }}</el-radio>
                            <el-radio :value="false">{{ t('user.payWithdraw.audit.reject') }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :xs="24">
                    <el-form-item :label="t('user.payWithdraw.audit.reason') + ': '" prop="reason" :required="!form.approved">
                        <el-input clearable type="textarea" :rows="3" v-model="form.reason" :placeholder="t('common.placeholder.input')" />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <el-button @click="handleCancel">{{ t('action.cancel') }}</el-button>
            <el-button type="primary" :loading="loading" @click="save">
                {{ t('action.save') }}
            </el-button>
        </template>
    </ele-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick, computed } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { EleMessage } from "ele-admin-plus/es";
import { useFormData } from "@/utils/use-form-data";
import { auditWithdraw } from "@/api/user/payWithdrawApi";
import type { PayWithdraw ,PayWithdrawParam} from "@/api/model/payWithdraw";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const props = defineProps<{
    /** 修改回显的数据 */
    data?: PayWithdraw | null;
}>();

const emit = defineEmits<{
    (e: "done"): void;
}>();

/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });

/** 是否是修改 */
const isUpdate = ref(false);

/** 提交状态 */
const loading = ref(false);

/** 表单实例 */
const formRef = ref<FormInstance | null>(null);

/** 表单数据 */
const [form, resetFields, assignFields] = useFormData<PayWithdrawParam>({
    id: undefined,
    reason: undefined,
    uid: undefined,
    orderNo: undefined,
    approved: true,
    // refund: true,
});
/** 表单验证规则 */
const rules = reactive<FormRules>({
    approved: [
        {
            required: true,
            type: 'boolean',
            message: t('common.placeholder.select'),
            trigger: 'blur'
        }
    ],
    reason: [
        {
            required: true,
            type: 'string',
            message: t('common.placeholder.input'),
            trigger: 'blur'
        }
    ],
});

/** 关闭弹窗 */
const handleCancel = () => {
    visible.value = false;
};

/** 保存编辑 */
const save = () => {
    formRef.value?.validate?.((valid) => {
        if (!valid) {
            return;
        }
        loading.value = true;
        auditWithdraw(form)
            .then((msg) => {
                loading.value = false;
                EleMessage.success(msg);
                handleCancel();
                emit("done");
            })
            .catch((e) => {
                loading.value = false;
                EleMessage.error(e.message);
            });
    });
};

/** 弹窗打开事件 */
const handleOpen = () => {
    if (props.data) {
        assignFields({ ...props.data });
        // 如果是模拟到账 就pass默认true
        // if (props.data.simulate) form.approved = true;
        form.approved = true;
        // if (props.data.refund) form.refund = true;
        // if(!props.data.channelType)  form.channelType = 'GHPAY';
        isUpdate.value = true;
    } else {
        resetFields();
        isUpdate.value = false;
    }
    nextTick(() => {
        nextTick(() => {
            formRef.value?.clearValidate?.();
        });
    });
};
</script>
