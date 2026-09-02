<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="880" v-model="visible" title="提现记录审核" @open="handleOpen">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="130px" @submit.prevent="">
            <el-row :gutter="16">
                <el-col :sm="12" :xs="24" :md="12">
                    <el-form-item label="代理ID:" prop="agentId">
                        <span>{{ form.agentId }}</span>
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :xs="24" :md="12">
                    <el-form-item label="提现金额:" prop="amount">
                        <span>{{ form.amount }}</span>
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :xs="24">
                    <el-form-item label="审核结果:" prop="approved">
                        <el-radio-group v-model="form.approved" @change="handleStatusChange">
                            <el-radio :value="true">通过</el-radio>
                            <el-radio :value="false">拒绝</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :xs="24">
                    <el-form-item label="原因:" prop="reason"
                        :rules="!form.approved ? [{ required: true, message: '请输入原因', trigger: 'change' }] : []">
                        <el-input v-model="form.reason" type="textarea" :rows="3" placeholder="请输入原因"
                            style="width: 100%" />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" :loading="loading" @click="save"> 保存 </el-button>
        </template>
    </ele-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { EleMessage } from 'ele-admin-plus/es';
import { useFormData } from '@/utils/use-form-data';
import { auditWithdrawRecord } from '@/api/agent/withdrawRecordsApi';
import type { WithdrawRecord } from '@/api/agent/model/withdrawRecords';
const props = defineProps<{
    /** 修改回显的数据 */
    data?: WithdrawRecord | null;
}>();

const emit = defineEmits<{
    (e: 'done'): void;
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
const [form, resetFields, assignFields] = useFormData<WithdrawRecord>({
    id: undefined,
    agentId: undefined,
    reason: undefined,
    amount: undefined,
    approved: true
});

/** 表单验证规则 */
const rules = reactive<FormRules>({
    reason: [
        {
            required: false,
            type: 'string',
            message: '请输入审核备注',
            trigger: 'blur'
        }
    ],
    approved: [
        {
            required: true,
            type: 'boolean',
            message: '请选择审核结果',
            trigger: 'change'
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
        // const saveOrUpdate = isUpdate.value ? updateAgent : addAgent;;
        let params = { ...form, level: 1 };
        auditWithdrawRecord(params)
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

/** 切换审核结果：拒绝时清空代理类型/佣金模式并取消校验 */
const handleStatusChange = (status: number) => {
    rules.reason![0].required = status === 2;
    if (status === 2) {
        levelArr.value = [];
        nextTick(() => formRef.value?.clearValidate(['agentType', 'commissionModel']));
    }
};

/** 弹窗打开事件 */
const handleOpen = () => {
    if (props.data) {
        assignFields({ ...props.data });
        // form.status = 1;
        form.approved = true;
        // rules.reason![0].required = false;
        // form.approved = form.status == 2 ? true : false;
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
const levelArr = ref<{ label: string; value: number }[]>([]);

</script>
