<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="800" v-model="visible" :title="title" @open="handleOpen">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="120px" @submit.prevent="">
            <el-row :gutter="16">
                <el-col :sm="24" :xs="24">
                    <el-form-item :label="form.status ? t('user.userList.userSeal.unsealUserId') : t('user.userList.userSeal.sealUserId')">
                        {{ form.uid }}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16" v-if="form.status">
                <el-col :sm="24" :xs="24">
                    <el-form-item :label="form.status ? t('user.userList.userSeal.unsealDuration') : t('user.userList.userSeal.sealDuration')" prop="lockTime">
                        <dict-data code="LockTime" v-model="form.lockTime" value-type="number" :placeholder="t('common.placeholder.select')" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16" >
                <el-col :sm="24" :xs="24">
                    <el-form-item :label="form.status ? t('user.userList.userSeal.unsealReason') : t('user.userList.userSeal.sealReason')" prop="remark">
                        <el-input type="textarea" :rows="3" v-model.trim="form.remark" :placeholder="t('common.placeholder.input')" />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <el-button @click="handleCancel">{{ t('action.cancel') }}</el-button>
            <el-button type="primary" :loading="loading" @click="save">{{ t('action.confirm') }}</el-button>
        </template>
    </ele-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from "vue";
import { useI18n } from 'vue-i18n';
import type { FormInstance, FormRules } from "element-plus";
import { EleMessage } from "ele-admin-plus/es";
import { useFormData } from "@/utils/use-form-data";
import { getMainWalletFlow, sealUser } from '@/api/user/userApi';
import { SealUser } from "@/api/model/user";

const { t } = useI18n();
const props = defineProps<{
    /** 修改回显的数据 */
    // uid?: number;
    data?: DeductGold | null;
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
interface DeductGold {
    uid?: number;
    lockTime?: number;
    state?: number;
    remark?: string;
}
/** 表单数据 */
const [form, resetFields, assignFields] = useFormData<SealUser>({
    uid: undefined,
    lockTime: undefined,
    remark: undefined,
    status: undefined,
});

/** 表单验证规则 */
const rules = reactive<FormRules>({
    lockTime: [
        {
            required: true,
            type: 'number',
            message: t('common.placeholder.select'),
            trigger: 'blur'
        }
    ],
    remark: [
        {
            required: true,
            type: 'string',
            message: t('common.placeholder.input'),
            trigger: 'blur'
        }
    ],
});
let mainWalletFlow = ref(0)
const getMainWalletFlows = async () => {
    if (props.data && props.data.uid) {
        let res = await getMainWalletFlow({ uid: props.data.uid, queryType: 1 });
        mainWalletFlow.value = res || 0
    }
}

/** 关闭弹窗 */
const handleCancel = () => {
    visible.value = false;
};

/** 保存编辑 */
const save = () => {
    formRef.value?.validate?.((valid) => {
        const params = { ...form }
        if (!valid) {
            return;
        }
        loading.value = true;
        sealUser(params as any)
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
let title = ref(t('user.userList.userSeal.unsealTitle'))
/** 弹窗打开事件 */
const handleOpen = () => {
    if (props.data) {
        assignFields({ ...props.data });
        title.value = props.data.state ? t('user.userList.userSeal.unsealTitle') : t('user.userList.userSeal.sealTitle')
        form.status = props.data.state ? 0 : 1;
        form.uid = props.data.uid;
        isUpdate.value = true;
        getMainWalletFlows()
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
