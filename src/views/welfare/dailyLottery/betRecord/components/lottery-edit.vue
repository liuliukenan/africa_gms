<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="680" v-model="visible" title="修改开奖" @open="handleOpen">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent="">
            <el-row :gutter="16">
                <el-col :sm="24" :xs="24">
                    <el-form-item label="开奖号码" prop="num">
                        <el-input-number clearable placeholder="请输入开奖号码" :controls="false" v-model="form.num"
                            style="width: 100%;" />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" :loading="loading" @click="save"> 发送 </el-button>
        </template>
    </ele-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { EleMessage } from 'ele-admin-plus/es';
import { useFormData } from '@/utils/use-form-data';
import { updateHistory } from '@/api/lottery/history';

const props = defineProps<{
    /** 修改回显的数据 */
    data?: number;
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
interface Data {
    id: number,
    num: number
}
/** 表单数据 */
const [form, resetFields, assignFields] = useFormData<Data>({
    id: 0,
    num: 0
});
/** 自定义验证函数 */
const validateThreeDigitNumber = (rule: any, value: any, callback: any) => {
    if (value === '' || value === undefined) {
        callback(new Error('请输入开奖号码'));
    } else if (!/^\d{2}$/.test(value)) {
        callback(new Error('请输入2位数的开奖号码'));
    } else {
        callback();
    }
};
/** 表单验证规则 */
const rules = reactive<FormRules>({
    num: [
        { required: true,
            validator: validateThreeDigitNumber,
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
        updateHistory(form)
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

/** 弹窗打开事件 */
const handleOpen = () => {
    if (props.data) {
        assignFields({ id: props.data, num: undefined });
        // form.id = props.data;
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