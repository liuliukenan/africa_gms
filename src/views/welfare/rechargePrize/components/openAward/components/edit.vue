<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="680" v-model="visible" :title="isUpdate ? '修改机器人配置' : '新增机器人配置'" @open="handleOpen">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="110px" @submit.prevent="">
            <el-row :gutter="16">
                <el-col :sm="24" :xs="24">
                    <el-form-item label="物品名称" prop="name">
                        <el-input clearable placeholder="请输入物品名称" v-model="form.name" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :xs="24">
                    <el-form-item label="数量" prop="num">
                        <el-input-number :controls="false" clearable placeholder="请输入数量" :min="0" v-model="form.num"
                            style="width: 100%;" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :xs="24">
                    <el-form-item label="奖励类型" prop="type">
                        <dict-data code="winType" valueType="number" type="select" v-model="form.type" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :xs="24">
                    <el-form-item label="中奖权重" prop="weight">
                        <el-input-number :controls="false" clearable placeholder="请输入中奖权重" :min="0"
                            v-model="form.weight" style="width: 100%;" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :xs="24">
                    <el-form-item label="库存" prop="stock">
                        <el-input-number :controls="false" clearable placeholder="请输入库存" :min="0" v-model="form.stock"
                            style="width: 100%;" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :xs="24">
                    <el-form-item label="是否播报" prop="hasAnnounce">
                       <el-radio-group v-model="form.hasAnnounce" size="large">
                        <el-radio-button :label="1">是</el-radio-button>
                        <el-radio-button :label="0">否</el-radio-button>
                       </el-radio-group>

                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="12" :xs="24">
                    <el-form-item label="icon" prop="icon">
                        <image-upload :limit="1" v-model="form.icon" accept="image/png" :item-style="{
                            width: '120px',
                            height: '120px',
                            background: 'var(--el-fill-color-lighter)',
                            '--ele-upload-list-padding': 0
                        }" :button-style="{ width: '120px', height: '120px' }" category="1" :isOBS="true" />
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
import { updateAward, addAward } from '@/api/welfare/rechargePrize';
import type { Robot, RobotParam } from "@/api/welfare/model/index";
import ImageUpload from '@/components/ImageUpload/index.vue';
const props = defineProps<{
    /** 修改回显的数据 */
    data?: Robot | null;
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
const [form, resetFields, assignFields] = useFormData<any>({
    id: undefined,
    num: undefined,
    weight: undefined,
    type: undefined,
    stock: undefined,
    name: undefined,
    icon: undefined,
    hasAnnounce: 1,
});
/** 表单验证规则 */
const rules = reactive<FormRules>({
    name: [
        {
            required: true,
            type: 'string',
            message: '请输入物品名称',
            trigger: 'blur'
        }
    ],
    weight: [
        {
            required: true,
            type: 'number',
            message: '请输入权重',
            trigger: 'blur'
        }
    ],
    num: [
        {
            required: true,
            type: 'number',
            message: '请输入数量',
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
        const saveOrUpdate = isUpdate.value ? updateAward : addAward;
        saveOrUpdate(form)

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
        assignFields({ ...props.data });
        // form.personUserRangeStr = JSON.stringify(props.data.personUserRange);
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