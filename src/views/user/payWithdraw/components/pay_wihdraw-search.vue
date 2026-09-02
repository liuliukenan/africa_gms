<!-- 搜索表单 -->
<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item :label="t('user.payWithdraw.search.orderNo')">
                        <el-input clearable v-model.trim="form.orderNo" :placeholder="t('common.placeholder.input')" />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item :label="t('user.payWithdraw.search.uid')">
                        <el-input-number clearable :controls="false" v-model.trim="form.uid" :placeholder="t('common.placeholder.input')"
                            style="width: 100%;" />
                    </el-form-item>
                </el-col>
                <el-col :lg="7" :md="7" :sm="12" :xs="24">
                    <el-form-item :label="t('user.payWithdraw.search.operateTime')">
                        <el-date-picker type="datetimerange" v-model="dateRange" range-separator="-"
                            value-format="YYYY-MM-DD HH:mm:ss" :default-time="defaultTime" :start-placeholder="t('common.time.start')" :end-placeholder="t('common.time.end')"
                            class="ele-fluid" />
                    </el-form-item>
                </el-col>
                <!-- <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="货币类型">
                        <dict-data code="moneyType" valueType="number" v-model="form.moneyType" />
                    </el-form-item>
                </el-col> -->
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item :label="t('user.payWithdraw.search.phone')">
                        <el-input clearable v-model.trim="form.phone" :placeholder="t('common.placeholder.input')" />
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item :label="t('user.payWithdraw.search.transactionId')">
                        <el-input clearable v-model.trim="form.transactionId" :placeholder="t('common.placeholder.input')" />
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item :label="t('user.payWithdraw.search.status')">
                        <dict-data code="withdrawStatus" valueType="number" v-model="form.status" :placeholder="t('common.placeholder.select')" filterable/>
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="渠道类型">
                        <dict-data code="channelNewType" valueType="number" v-model="form.channelType" />
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item :label="t('user.payWithdraw.search.refund')">
                        <el-select v-model="form.refund" :placeholder="t('common.placeholder.select')" clearable @change="search">
                            <el-option :label="t('user.payWithdraw.search.refundYes')" :value="true" />
                             <el-option :label="t('user.payWithdraw.search.refundNo')" :value="false" />
                        </el-select>
                    </el-form-item>
                </el-col>
                 <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item :label="t('user.payWithdraw.search.replayOrderNo')">
                        <el-input clearable v-model.trim="form.replayOrderNo" :placeholder="t('common.placeholder.input')" />
                    </el-form-item>
                </el-col>
                <el-col :lg="5" :md="12" :sm="12" :xs="24">
                    <el-form-item label-width="16px">
                        <el-button type="primary" @click="search">{{ t('action.search') }}</el-button>
                        <el-button @click="reset">{{ t('action.reset') }}</el-button>
                        <el-link type="primary" :underline="false" @click="toggleExpand" style="margin-left: 12px">
                            <template v-if="searchExpand">
                                <span>{{ t('user.userList.userSearch.collapse') }}</span>
                                <el-icon style="vertical-align: -1px">
                                    <ArrowUp />
                                </el-icon>
                            </template>
                            <template v-else>
                                <span>{{ t('user.userList.userSearch.expand') }}</span>
                                <el-icon style="vertical-align: -2px">
                                    <ArrowDown />
                                </el-icon>
                            </template>
                        </el-link>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </ele-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useFormData } from '@/utils/use-form-data';
import type { PayWithdrawParam } from '@/api/model/payWithdraw';
import { ArrowDown, ArrowUp } from '@/components/icons';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const emit = defineEmits<{
    (e: 'search', where?: PayWithdrawParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<PayWithdrawParam>({
    orderNo: undefined,
    uid: undefined,
    phone: undefined,
    transactionId: undefined,
    status: undefined,
    channelType: undefined,
    startDate: undefined,
    replayOrderNo: undefined,
    refund: undefined,
    endDate: undefined
});


/** 搜索表单是否展开 */
const searchExpand = ref(false);
/** 日期时间选择器默认时间 */
const defaultTime: [Date, Date] = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)];
/** 日期范围 */
const dateRange = ref<[string, string] | undefined>(undefined);
/** 搜索 */
const search = () => {
    const [startDate, endDate] = dateRange.value || [];
    emit('search', { ...form, startDate, endDate });
};

/**  重置 */
const reset = () => {
    resetFields();
    dateRange.value = undefined;
    search();
};
/** 搜索展开/收起 */
const toggleExpand = () => {
    searchExpand.value = !searchExpand.value;
};
const searchParams = () => {
    const [startDate, endDate] = dateRange.value || [];
    return { ...form, startDate, endDate };
};

defineExpose({
    searchParams,
    search
});

</script>
