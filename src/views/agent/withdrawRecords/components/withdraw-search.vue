<!-- 搜索表单 -->
<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="国家代码">
                        <el-select v-model="form.countryCode" placeholder="请选择" clearable style="width: 100%">
                            <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name"
                                :value="item.code" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="代理ID">
                        <el-input clearable v-model.trim="form.agentId" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <!-- <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="手机号">
            <el-input clearable v-model.trim="form.phone" placeholder="请输入" />
          </el-form-item>
        </el-col> -->
                <!-- <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="订单号">
                        <el-input clearable v-model.trim="form.orderNo" placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="订单状态">
                        <!-- <el-select v-model="form.status" placeholder="请选择状态" clearable style="width: 100%">
                            <el-option label="处理中" value="0" />
                            <el-option label="成功" value="1" />
                            <el-option label="失败" value="2" />
                            <el-option label="待审核" value="3" />
                            <el-option label="已拒绝" value="4" />
                            <el-option label="退款中" value="5" />
                            <el-option label="已退款" value="6" />
                            <el-option label="撤销中" value="7" />
                            <el-option label="已撤销" value="8" />
                            <el-option label="部分退款" value="9" />
                            <el-option label="冻结中" value="10" />
                            <el-option label="已冻结" value="11" />
                        </el-select> -->
                        <dict-data code="withdrawStatus" valueType="number" v-model="form.status" placeholder="请选择" filterable/>
                    </el-form-item>
                </el-col>
                <!-- <el-col v-show="searchExpand" :lg="8" :md="8" :sm="12" :xs="24">
                    <el-form-item label="申请时间">
                        <el-date-picker v-model="timeArr" type="daterange" :value-format="'YYYY-MM-DD'"
                            range-separator="至" start-placeholder="开始" end-placeholder="结束" style="width: 100%" />
                    </el-form-item>
                </el-col> -->
                <el-col :lg="6" :md="12" :sm="12" :xs="24">
                    <el-form-item label-width="16px">
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button @click="reset">重置</el-button>
                        <!-- <el-link type="primary" :underline="false" @click="toggleExpand" style="margin-left: 12px">
                            <template v-if="searchExpand">
                                <span>收起</span>
                                <el-icon style="vertical-align: -1px">
                                    <ArrowUp />
                                </el-icon>
                            </template>
<template v-else>
                                <span>展开</span>
                                <el-icon style="vertical-align: -2px">
                                    <ArrowDown />
                                </el-icon>
                            </template>
</el-link> -->
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
import type { WithdrawRecordParam } from '@/api/agent/model/withdrawRecords';
import { useConfigStore } from '@/store/modules/config';

const configStore = useConfigStore();

const emit = defineEmits<{
    (e: 'search', where?: WithdrawRecordParam): void;
}>();

/** 表单数据 */
const [form, resetFields] = useFormData<WithdrawRecordParam>({
    agentId: undefined,
    phone: undefined,
    orderNo: undefined,
    status: undefined,
    countryCode: configStore.countryArr?.[0]?.code || '',
    startDate: undefined,
    endDate: undefined
});

const timeArr = ref<[string, string]>(['', '']);

/** 搜索表单是否展开 */
const searchExpand = ref(false);

/** 搜索 */
const search = () => {
    const [startDate, endDate] = timeArr.value || [];
    emit('search', { ...form, startDate, endDate });
};

/** 重置 */
const reset = () => {
    resetFields();
    timeArr.value = ['', ''];
    search();
};

/** 搜索展开/收起 */
const toggleExpand = () => {
    searchExpand.value = !searchExpand.value;
};
</script>
