<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="800" v-model="visible" :title="t('user.userList.userFlow.title')" @open="handleOpen">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="120px" @submit.prevent="">
            <el-row :gutter="16">
                <el-col :sm="24" :xs="24">
                    <el-form-item :label="t('user.userList.userFlow.uid')">
                        {{ form.uid }}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="24" :xs="24">
                    <el-form-item :label="t('user.userList.userFlow.walletType')" prop="queryType">
                        <el-radio-group v-model="form.queryType" placeholder="请选择" @change="changeQueryType">
                            <el-radio :value="0">{{ t('user.userList.userFlow.cashWallet') }}</el-radio>
                            <el-radio :value="2">{{ t('user.userList.userFlow.bonusGroupWallet') }}</el-radio>
                            <el-radio :value="3">{{ t('user.userList.userFlow.bonusGameWallet') }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16" v-if="form.queryType === 2 && form.operationType === 1">
                <el-col :sm="24" :xs="24">
                    <el-form-item :label="t('user.userList.userFlow.groupType')" prop="groupId">
                        <dict-data code="gameGroup" v-model="form.groupId" valueType="number" :placeholder="t('common.placeholder.input')"
                            clearable style="width: 100%" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16" v-if="form.queryType === 3 && form.operationType === 1">
                <el-col :sm="24" :xs="24">
                    <el-form-item :label="t('user.userList.userFlow.gameId')" prop="gameId">
                        <el-input-number :controls="false" clearable v-model.trim="form.gameId" :placeholder="t('common.placeholder.input')"
                            style="width: 100%;" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="24" :xs="24">
                    <el-form-item :label="t('user.userList.userFlow.flowOperationType')" prop="operationType">
                        <el-radio-group v-model="form.operationType" placeholder="请选择">
                            <el-radio :value="1">{{ t('user.userList.userFlow.addFlow') }}</el-radio>
                            <el-radio :value="2">{{ t('user.userList.userFlow.reduceFlow') }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="24" :xs="24">
                    <el-form-item :label="t('user.userList.userFlow.currentFlow')">
                        <!-- <el-radio-group v-model="form.accountType" placeholder="请选择">
                            <el-radio :value="0">中心账户流水:{{ mainWalletFlow }}</el-radio>
                            <el-radio :value="1">指定游戏金币数额:989</el-radio>
                        </el-radio-group> -->
                        <div>{{ mainWalletFlow }}</div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="24" :xs="24">
                    <el-form-item :label="(form.operationType === 1 ? t('user.userList.userFlow.addFlowAmount') : t('user.userList.userFlow.reduceFlowAmount'))" prop="amount">
                        <el-input-number :controls="false" clearable v-model.trim="form.amount" :placeholder="t('common.placeholder.input')"
                            style="width: 100%;" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="24" :xs="24">
                    <el-form-item :label="t('user.userList.userFlow.remark')" prop="remark">
                        <el-input type="textarea" :rows="3" v-model.trim="form.remark" :placeholder="t('common.placeholder.input')" />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <el-button @click="handleCancel">{{ t('action.cancel') }}</el-button>
            <el-popconfirm :title="form.operationType === 1 ? t('user.userList.userFlow.confirmAddFlow') : t('user.userList.userFlow.confirmReduceFlow')" @confirm="save()"
                width="250px">
                <template #reference>
                    <el-button type="primary" :loading="loading">{{ t('action.confirm') }}</el-button>
                </template>
            </el-popconfirm>
        </template>
    </ele-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from "vue";
import { useI18n } from 'vue-i18n';
import type { FormInstance, FormRules } from "element-plus";
import { EleMessage } from "ele-admin-plus/es";
import { useFormData } from "@/utils/use-form-data";
import { getMainWalletFlow, operationFlow } from '@/api/user/userApi';

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
    amount?: number;
    accountType?: number;
    operationType?: number;
    queryType?: number;
    companyId?: number;
    groupId?: number;
    gameId?: number;
    remark?: string;
}
/** 表单数据 */
const [form, resetFields, assignFields] = useFormData<DeductGold>({
    uid: undefined,
    accountType: 0,
    amount: undefined,
    operationType: 1,
    queryType: 0,
    companyId: 1,
    groupId: undefined,
    remark: undefined,
});

/** 表单验证规则 */
const rules = reactive<FormRules>({
    amount: [
        {
            required: true,
            type: 'number',
            message: t('common.placeholder.input'),
            trigger: 'blur'
        }
    ],
    flowId: [
        {
            required: true,
            type: 'number',
            message: t('common.placeholder.input'),
            trigger: 'blur'
        }
    ],
});
let mainWalletFlow = ref(0)
const getMainWalletFlows = async () => {
    if (props.data && props.data.uid) {
        let res = await getMainWalletFlow({ uid: props.data.uid, queryType: form.queryType });
        mainWalletFlow.value = res||0
    }
}
const changeQueryType = () => {
    form.groupId = undefined;
    form.gameId = undefined;
    getMainWalletFlows();
};
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
        operationFlow(params as any)
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
        form.uid = props.data.uid;
        form.operationType = 1;
        form.accountType = 0;
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
