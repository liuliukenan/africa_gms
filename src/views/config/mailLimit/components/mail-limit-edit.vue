<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="700" v-model="visible" :title="isUpdate ? '修改转账配置' : '新建转账配置'" @open="handleOpen">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="75px" @submit.prevent="">
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                    <el-form-item label="发送者:" prop="fromType">
                        <NumberSelect :dict-code="'svip'" v-model="form.fromType" :disabled="isUpdate" />
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="接收者:" prop="toType">
                        <NumberSelect :dict-code="'svip'" v-model="form.toType" :disabled="isUpdate" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                    <el-form-item label="单次最小:" prop="min">
                        <el-input-number :min="0" :controls="false" v-model="form.min"  placeholder="请输入单次最小" style="width: 100%;"/>
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="单次最大:" prop="max">
                        <el-input-number :min="0" :controls="false" v-model="form.max"  placeholder="请输入单次最大" style="width: 100%;"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                    <el-form-item label="税率%:" prop="duty">
                        <el-input-number  v-model="form.duty" :min="0" :controls="false" placeholder="请输入税率%" style="width: 100%;"/>
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="返利%:" prop="rebate">
                        <el-input-number  v-model="form.rebate" :min="0"  :controls="false" placeholder="请输入返利%" style="width: 100%;"/>
                    </el-form-item>
                </el-col>
                <!-- <el-col :sm="12" :xs="12">
                        <el-form-item label="" prop="ownMoney">
                            <el-input type="number"   v-model="form.ownMoney"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col> -->
            </el-row>
            <!-- <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="" prop="unbindMoney">
                            <el-input type="number"   v-model="form.unbindMoney"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row> -->
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
import { addMailLimit, updateMailLimit } from "@/api/config/mailLimitApi";
import type { MailLimit } from "@/api/model/mailLimit";
import NumberSelect from "@/components/NumberSelect/index.vue";
const props = defineProps<{
    /** 修改回显的数据 */
    data?: MailLimit | null;
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
const [form, resetFields, assignFields] = useFormData<MailLimit>({
    id: undefined,
    fromType: undefined,
    toType: undefined,
    min: undefined,
    max: undefined,
    duty: undefined,
    rebate: undefined,
    ownMoney: undefined,
    unbindMoney: undefined,
});

/** 表单验证规则 */
const rules = reactive<FormRules>({
    // fromType: [
    //     {
    //         required: true,
    //         type: 'number',
    //         message: '请输入',
    //         trigger: 'blur'
    //     }
    // ],
    // toType: [
    //     {
    //         required: true,
    //         type: 'number',
    //         message: '请输入',
    //         trigger: 'blur'
    //     }
    // ],
    // min: [
    //     {
    //         required: true,
    //         type: 'number',
    //         message: '请输入',
    //         trigger: 'blur'
    //     }
    // ],
    // max: [
    //     {
    //         required: true,
    //         type: 'number',
    //         message: '请输入',
    //         trigger: 'blur'
    //     }
    // ],
    duty: [
        {
            required: true,
            type: 'number',
            message: '请输入',
            trigger: 'blur'
        }
    ],
    rebate: [
        {
            required: true,
            type: 'number',
            message: '请输入',
            trigger: 'blur'
        }
    ],
    ownMoney: [
        {
            required: true,
            type: 'number',
            message: '请输入',
            trigger: 'blur'
        }
    ],
    unbindMoney: [
        {
            required: true,
            type: 'number',
            message: '请输入',
            trigger: 'blur'
        }
    ]
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
        const saveOrUpdate = isUpdate.value ? updateMailLimit : addMailLimit;;
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
