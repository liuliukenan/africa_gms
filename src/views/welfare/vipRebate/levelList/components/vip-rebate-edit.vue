<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="880" v-model="visible" :title="isUpdate ? '修改VIP返利配置' : '新建VIP返利配置'" @open="handleOpen">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" @submit.prevent="">
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                    <el-form-item label="level" name="level">
                        <el-input-number :controls="false" v-model="form.level" :min="0"  placeholder="请输入" 
                            style="width:100%" />
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="电子" name="slots">
                        <el-input-number :controls="false" v-model="form.slots" :min="0"  placeholder="请输入" :precision="5"
                            style="width:100%" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                    <el-form-item label="桌面" name="cards">
                        <el-input-number :controls="false" v-model="form.cards" :min="0"  placeholder="请输入" :precision="5"
                            style="width:100%" />
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="捕鱼" name="fish">
                        <el-input-number :controls="false" v-model="form.fish" :min="0"  placeholder="请输入" :precision="5"
                            style="width:100%" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                    <el-form-item label="真人" name="live">
                        <el-input-number :controls="false" v-model="form.live" :min="0"  placeholder="请输入" :precision="5"
                            style="width:100%" />
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="体育" name="sports">
                        <el-input-number :controls="false" v-model="form.sports" :min="0"  placeholder="请输入" :precision="5"
                            style="width:100%" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                    <el-form-item label="彩票" name="lottery">
                        <el-input-number :controls="false" v-model="form.lottery" :min="0"  placeholder="请输入" :precision="5"
                            style="width:100%" />
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="其它" name="other">
                        <el-input-number :controls="false" v-model="form.other" :min="0"  placeholder="请输入" :precision="5"
                            style="width:100%" />
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
import { addVipRebate, updateVipRebate } from "@/api/welfare/vipRebateApi";
import type { VipRebate } from "@/api/welfare/model/vipRebate";

const props = defineProps<{
    /** 修改回显的数据 */
    data?: VipRebate | null;
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
const [form, resetFields, assignFields] = useFormData<VipRebate>({
    level: undefined,
    slots: undefined,
    cards: undefined,
    fish: undefined,
    live: undefined,
    sports: undefined,
    lottery: undefined,
    other: undefined,
});

/** 表单验证规则 */
const rules = reactive<FormRules>({
    level: [
        {
            required: true,
            type: 'number',
            message: '请输入level',
            trigger: 'blur'
        }
    ],
    slots: [
        {
            required: true,
            type: 'number',
            message: '请输入电子',
            trigger: 'blur'
        }
    ],
    cards: [
        {
            required: true,
            type: 'number',
            message: '请输入桌面',
            trigger: 'blur'
        }
    ],
    fish: [
        {
            required: true,
            type: 'number',
            message: '请输入捕鱼',
            trigger: 'blur'
        }
    ],
    live: [
        {
            required: true,
            type: 'number',
            message: '请输入真人',
            trigger: 'blur'
        }
    ],
    sports: [
        {
            required: true,
            type: 'number',
            message: '请输入体育',
            trigger: 'blur'
        }
    ],
    lottery: [
        {
            required: true,
            type: 'number',
            message: '请输入彩票',
            trigger: 'blur'
        }
    ],
    other: [
        {
            required: true,
            type: 'number',
            message: '请输入其它',
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
        const saveOrUpdate = isUpdate.value ? updateVipRebate : addVipRebate;;
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
