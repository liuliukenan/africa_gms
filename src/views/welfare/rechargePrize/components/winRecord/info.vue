<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="800" v-model="visible" :title="title ? '发货情况' : '详情'" @open="handleOpen">
        <el-form ref="formRef" :model="form" label-width="110px">
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                    <el-form-item label="用户ID:" prop="uid">
                        {{ form.uid }}
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="用户名:" prop="username">
                        {{ form.uid }}
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="物品名称:" prop="goodName">
                        {{ form.goodName }}
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="数量:" prop="num">
                        {{ form.num }}
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="类型:">
                        <dict-data code="winType" valueType="number" type="tag" v-model="form.type" />

                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="状态:">
                        <dict-data code="sendStatus" valueType="number" type="tag" v-model="form.status" />
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="24">
                    <el-form-item label="收货人:" prop="receiver"
                        :rules="[{ required: true, message: '请输入收货人', trigger: 'blur' }]">
                        <el-input v-if="title" clearable placeholder="请输入收货人" v-model.trim="form.receiver" />
                        <span v-else> {{ form.receiver }}</span>
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="24">
                    <el-form-item label="快递单号:" prop="expressNumer"
                        :rules="[{ required: true, message: '请输入快递单号', trigger: 'blur' }]">
                        <el-input v-if="title" clearable placeholder="请输入快递单号" v-model.trim="form.expressNumer" />
                        <span v-else> {{ form.expressNumer }}</span>
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="24">
                    <el-form-item label="快递公司:" prop="expressCompany"
                        :rules="[{ required: true, message: '请输入快递公司', trigger: 'blur' }]">
                        <el-input v-if="title" clearable placeholder="请输入快递公司" v-model.trim="form.expressCompany" />
                        <span v-else> {{ form.expressCompany }}</span>
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="24">
                    <el-form-item label="邮编:" prop="postalCode"
                        :rules="[{ required: true, message: '请输入邮编', trigger: 'blur' }]">
                        <el-input-number v-if="title" :controls="false" style="width: 100%;" clearable
                            placeholder="请输入邮编" v-model="form.postalCode" />
                        <span v-else> {{ form.postalCode }}</span>
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :xs="24">
                    <el-form-item label="收货地址:" prop="address"
                        :rules="[{ required: true, message: '请输入收货地址', trigger: 'blur' }]">
                        <el-input v-if="title" clearable placeholder="请输入实物奖励快递编号" v-model.trim="form.address" />
                        <span v-else> {{ form.address }}</span>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" v-if="title" :loading="loading" @click="save"> {{ form.status == 0 ? '发货' :
                (form.status == 1 ? '完成' : '') }} </el-button>
        </template>
    </ele-modal>
</template>

<script lang="ts" setup>
import { ref, nextTick } from "vue";
import { useFormData } from "@/utils/use-form-data";
import type { Vip } from "@/api/model/vip";
import { ElForm } from "element-plus";
import { updateWinAward } from "@/api/welfare/rechargePrize";
import { EleMessage } from "ele-admin-plus";
import type { WinAward } from "@/api/welfare/model";
const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const props = defineProps<{
    /** 修改回显的数据 */
    data?: Vip | null;
    title: number
}>();

const emit = defineEmits<{
    (e: "done"): void;
}>();

/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });
/** 提交状态 */
const loading = ref(false);
/** 是否是修改 */
const isUpdate = ref(false)

/** 表单数据 */
const [form, resetFields, assignFields] = useFormData<WinAward>({
    id: undefined,
    uid: undefined,
    goodName: undefined,
    username: undefined,
    num: undefined,
    type: undefined,
    status: undefined,
    address: undefined,
    expressNumer: undefined,
    receiver: undefined,
    expressCompany: undefined,
    postalCode: undefined,
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
        let params = { ...form };
        if (form.status == 0) {
            params.status = 1;
        }
        updateWinAward(params)
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
<style lang="scss" scoped>
::v-deep .el-col {
    margin: 20px 0;
}
</style>
