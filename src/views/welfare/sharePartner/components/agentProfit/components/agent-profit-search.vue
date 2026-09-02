<!-- 搜索表单 -->
<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="用户ID">
                        <el-input clearable v-model.trim="form.uid" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="日期">
                        <el-date-picker v-model="timeArr" type="daterange" placeholder="开始日期" value-format="YYYYMMDD"
                            :clearable="false" style="width: 100%"></el-date-picker>
                    </el-form-item>
                </el-col>

                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="发放状态">
                        <el-select v-model="form.status" placeholder="请选择">
                            <el-option label="待发放" :value="0"></el-option>
                            <el-option label="发放中" :value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="8" :md="12" :sm="12" :xs="24">
                    <el-form-item label-width="16px">
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button @click="reset">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </ele-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useFormData } from '@/utils/use-form-data';
import type { AgentProfitParam } from '@/api/welfare/model/agentProfit';
import dayjs from 'dayjs';

const emit = defineEmits<{
    (e: 'search', where?: AgentProfitParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<AgentProfitParam>({
    uid: undefined,
    endDay: undefined,
    startDay: undefined,
    status: undefined
});


/** 搜索表单是否展开 */
const searchExpand = ref(false);

const timeArr = ref<[string, string]>([dayjs().subtract(7, 'day').format('YYYYMMDD'), dayjs().format('YYYYMMDD')]);
/** 搜索 */
const search = () => {
    const [startDay, endDay] = timeArr.value || []
    emit('search', { ...form, startDay, endDay });
};

/**  重置 */
const reset = () => {
    resetFields();
    search();
    timeArr.value = ['', '']
};
</script>
