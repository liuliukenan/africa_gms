<!-- 用户编辑弹窗 -->
<template>
    <ele-modal :width="920" v-model="visible" :confirm-loading="loading" @open="handleOpen" :footer="null"
        :title="t('user.payWithdraw.info.title')">
        <el-form ref="formRef" :model="form">
            <el-row :gutter="16">
                <el-col :md="12" :sm="24" :xs="24">
                    <el-form-item :label="t('user.payWithdraw.info.orderNo') + ': '" prop="orderNo">{{ form.orderNo }}</el-form-item>
                </el-col>
     
                <el-col :md="12" :sm="24" :xs="24">
                    <el-form-item :label="t('user.payWithdraw.info.uid') + ': '" prop="uid">
                        <div @click="goUserInfo(data?.uid)" class="link" style="color: red;text-decoration: underline;cursor: pointer;">{{
                            data?.uid}}</div>
                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="24" :xs="24">
                    <el-form-item :label="t('user.payWithdraw.info.payWay') + ': '" prop="payWay">
                        {{ form.payWay }}
                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="24" :xs="24">
                    <el-form-item :label="t('user.payWithdraw.info.moneyType') + ': '" prop="moneyType">
                        <!-- {{ form.moneyType?'钻石':'金币' }} -->
                        <dict-data code="moneyType" valueType="number" type="tag" v-model="form.moneyType" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :md="12" :sm="24" :xs="24">
                    <el-form-item :label="t('user.payWithdraw.info.amount') + ': '" prop="amount">
                        {{ form.amount }}
                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="24" :xs="24" >
                    <el-form-item :label="(form.moneyType ? t('user.payWithdraw.info.gold').split('|')[0] : t('user.payWithdraw.info.gold').split('|')[1])" prop="gold">
                        {{ form.gold }}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :md="12" :sm="24" :xs="24">
                    <el-form-item :label="t('user.payWithdraw.info.channelType') + ': '" prop="channelType">
                        {{ form.channelType }}
                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="24" :xs="24">
                    <el-form-item :label="t('user.payWithdraw.info.notifyUrl') + ': '" prop="notifyUrl">
                        {{ form.notifyUrl }}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :md="12" :sm="24" :xs="24">
                    <el-form-item :label="t('user.payWithdraw.info.bankCode') + ': '" prop="bankCode">
                        {{ form.bankCode }}
                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="24" :xs="24">
                    <el-form-item :label="t('user.payWithdraw.info.bankCard') + ': '" prop="bankCard">
                        {{ form.bankCard }}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :md="12" :sm="24" :xs="24">
                    <el-form-item :label="t('user.payWithdraw.info.bankName') + ': '" prop="bankName">
                        {{ form.bankName }}
                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="24" :xs="24">
                    <el-form-item :label="t('user.payWithdraw.info.bankPhone') + ': '" prop="bankPhone"> {{ form.bankPhone }}</el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="16">
                <el-col :md="12" :sm="24" :xs="24">
                    <el-form-item :label="t('user.payWithdraw.info.duty') + ': '" prop="duty">
                        {{ form.duty }}
                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="24" :xs="24">
                    <el-form-item :label="t('user.payWithdraw.info.status') + ': '" prop="status">
                        <dict-data code="withdrawStatus" valueType="number" type="tag" v-model="form.status"
                            :placeholder="t('common.placeholder.select')" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :md="24" :sm="24" :xs="24">
                    <el-form-item :label="t('user.payRecord.info.callback') + ': '" prop="callback">
                       <JsonObjectViewer v-if="form.callback" :data="form.callback" />
                    </el-form-item>
                </el-col>
            </el-row>   
            <el-row :gutter="16">
                <el-col :md="24" :sm="24" :xs="24">
                    <el-form-item :label="t('user.payRecord.info.response') + ': '" prop="response">
                      <JsonObjectViewer v-if="form.response" :data="form.response" />
                    </el-form-item>
                </el-col>
            </el-row>   
        </el-form>
        <template #footer>
            <el-button @click="handleCancel">{{ t('action.cancel') }}</el-button>
        </template>
    </ele-modal>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import type { PayWithdraw } from '@/api/model/payWithdraw';
import { useFormData } from '@/utils/use-form-data';
import { FormInstance } from 'element-plus';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import JsonObjectViewer from '@/views/user/payRecord/components/JsonObjectViewer.vue';
const { t } = useI18n();

const emit = defineEmits(['done']);

const props = defineProps<{
    /** 修改回显的数据 */
    data?: PayWithdraw | null;
}>();
/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });

// 是否是修改
const isUpdate = ref(false);

// 提交状态
const loading = ref(false);

/** 表单实例 */
const formRef = ref<FormInstance | null>(null);

// 表单数据
const { form, resetFields, assignFields } = useFormData<PayWithdraw>({
    id: undefined,
    orderNo: undefined,
    moneyType: undefined,
    callback: undefined,
    response: undefined,
    // diamond: undefined,
    uid: undefined,
    mid: undefined,
    payWay: undefined,
    payChannelId: undefined,
    type: undefined,
    notifyUrl: undefined,
    amount: undefined,
    transactionId: undefined,
    duty: undefined,
    gold: undefined,
    channelType: undefined,
    bankCode: undefined,
    bankCard: undefined,
    bankName: undefined,
    bankPhone: undefined,
    countStatus: undefined,
    status: undefined
});
const $router = useRouter();
const goUserInfo = (id?: number) => {
    if (id) {
        $router.push('/user/user?id=' + id)
    }
}
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
/** 关闭弹窗 */
const handleCancel = () => {
    visible.value = false;
};
</script>