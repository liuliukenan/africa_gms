<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="680" v-model="visible" :title="isUpdate ? '修改客服列表' : '新建客服列表'" @open="handleOpen">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" @submit.prevent="">
            <el-row :gutter="16">
                <el-col :sm="24" :xs="24">
                    <el-form-item label=" 头像编号" prop="avatar">
                        <el-input v-model.number="form.avatar" :min="0" placeholder="请输入" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="24" :xs="24">
                    <el-form-item label="呢称" prop="nickanme">
                        <el-input clearable :maxlength="50" v-model="form.nickanme" placeholder="请输入" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="24" :xs="24">
                    <el-form-item label="状态" prop="status">
                        <el-radio-group v-model="form.status">
                            <el-radio :value="true">启用</el-radio>
                            <el-radio :value="false">禁用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" :loading="loading" @click="save">
                保存
            </el-button>
        </template>
    </ele-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { EleMessage } from "ele-admin-plus/es";
import { useFormData } from "@/utils/use-form-data";
import { addServiceStaff, updateServiceStaff } from "@/api/config/serviceStaffApi";
import type { ServiceStaff } from "@/api/model/serviceStaff";

const props = defineProps<{
    /** 修改回显的数据 */
    data?: ServiceStaff | null;
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
const [form, resetFields, assignFields] = useFormData<ServiceStaff>({
    avatar: undefined,
    nickanme: undefined,
    uid: undefined,
    status: true,
});

/** 表单验证规则 */
const rules = reactive<FormRules>({
    uid: [
        {
            required: true,
            type: 'number',
            message: '请输入id',
            trigger: 'blur'
        }
    ],
    avatar: [
        {
            required: true,
            type: 'number',
            message: '请输入 头像',
            trigger: 'blur'
        }
    ],
    nickanme: [
        {
            required: true,
            type: 'string',
            message: '请输入呢称',
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
        const saveOrUpdate = isUpdate.value ? updateServiceStaff : addServiceStaff;;
        saveOrUpdate(form)
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
        console.log(11111111,props.data);
        
        assignFields({ ...props.data });
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
