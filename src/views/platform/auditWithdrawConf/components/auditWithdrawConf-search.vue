<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <!-- 常驻字段 -->
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="用户类型">
                        <el-select v-model="form.userType" placeholder="请选择" style="width: 100%;" clearable @change="search">
                            <el-option label="非首充（普通用户）" :value="0" />
                            <el-option label="首充用户(注册后首次充值)" :value="1" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="是否启用">
                        <el-select v-model="form.enabled" placeholder="请选择" style="width: 100%;" clearable @change="search">
                            <el-option label="启用" :value="true" />
                            <el-option label="禁用" :value="false" />
                        </el-select>
                    </el-form-item>
                </el-col>

                <!-- 展开字段 -->
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="指标类型">
                        <el-select v-model="form.indicatorType" placeholder="请选择" style="width: 100%;" clearable>
                            <el-option label="有效投注(局)" value="VALID_BET" />
                            <el-option label="充值成功率(%)" value="RECHARGE_SUCCESS_RATE" />
                            <el-option label="设备关联数(个)" value="DEVICE_RELATION_COUNT" />
                            <el-option label="IP关联数(个)" value="IP_RELATION_COUNT" />
                            <el-option label="撮/充比" value="WITHDRAW_DEPOSIT_RATIO" />
                            <el-option label="注册-首撮时间(小时)" value="REG_TO_FIRST_WITHDRAW_HOURS" />
                            <el-option label="盈亏比(%)" value="WIN_LOSS_RATIO" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="规则名称">
                        <el-input v-model="form.ruleName" placeholder="请输入规则名称" clearable />
                    </el-form-item>
                </el-col>

                <!-- 操作按钮列 -->
                <el-col :lg="6" :md="12" :sm="12" :xs="24">
                    <el-form-item label-width="16px">
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button @click="reset">重置</el-button>
                        <el-link type="primary" :underline="false" @click="toggleExpand" style="margin-left: 12px">
                            <template v-if="searchExpand">
                                <span>收起</span>
                                <el-icon style="vertical-align: -1px"><ArrowUp /></el-icon>
                            </template>
                            <template v-else>
                                <span>展开</span>
                                <el-icon style="vertical-align: -2px"><ArrowDown /></el-icon>
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
import { ArrowDown, ArrowUp } from '@/components/icons';
import { useFormData } from '@/utils/use-form-data';
import type { WithdrawAutoAuditRuleParam } from '@/api/platform/model/auditWithdrawConf';

const emit = defineEmits<{
    (e: 'search', where?: WithdrawAutoAuditRuleParam): void;
}>();

const [form, resetFields] = useFormData<WithdrawAutoAuditRuleParam>({
    userType: undefined,
    enabled: undefined,
    indicatorType: undefined,
    ruleName: undefined,
});

const searchExpand = ref(false);

const search = () => {
    emit('search', { ...form });
};

const reset = () => {
    resetFields();
    search();
};

const toggleExpand = () => { 
    searchExpand.value = !searchExpand.value; 
};

const searchParams = () => {
    return { ...form };
};

defineExpose({ searchParams });
</script>
