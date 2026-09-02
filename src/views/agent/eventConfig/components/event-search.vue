<!-- 搜索表单 -->
<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="事件类型">
                        <dict-data code="agentEventType" valueType="string" v-model="form.eventType"
                            placeholder="请选择" />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="事件名称">
                        <el-input clearable v-model.trim="form.eventName" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="状态">
                        <el-select v-model="form.status" placeholder="请选择状态" clearable style="width: 100%" >
                            <el-option label="启用" :value="1" />
                            <el-option label="禁用" :value="0" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <!-- <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="ID">
                        <el-input-number v-model="form.id" placeholder="请输入 ID" style="width: 100%" controls-position="right" />
                    </el-form-item>
                </el-col> -->
                <!-- <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="开始日期">
                        <el-date-picker v-model="form.startDate" type="date" :value-format="'YYYY-MM-DD'"
                            placeholder="选择开始" style="width: 100%" />
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="结束日期">
                        <el-date-picker v-model="form.endDate" type="date" :value-format="'YYYY-MM-DD'"
                            placeholder="选择结束" style="width: 100%" />
                    </el-form-item>
                </el-col> -->
                <el-col v-show="searchExpand" :md="6" :sm="24" :xs="24">
                    <el-form-item label="时间:">
                        <el-date-picker v-model="timeArr" type="daterange" range-separator="至" format="YYYY-MM-DD"
                            value-format="YYYY-MM-DD" start-placeholder="请选择开始日期" end-placeholder="请选择结束日期"
                           />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="12" :sm="12" :xs="24">
                    <el-form-item label-width="16px">
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button @click="reset">重置</el-button>
                        <el-link type="primary" :underline="false" @click="toggleExpand" style="margin-left: 12px">
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
import type { AgentEventConfigQuery } from '@/api/agent/model/eventConfig';

const emit = defineEmits<{
    (e: 'search', where?: AgentEventConfigQuery): void;
}>();
let timeArr = ref<[string, string]>(['', '']);
/** 表单数据 */
const [form, resetFields] = useFormData<AgentEventConfigQuery>({
    eventType: undefined,
    eventName: undefined,
    status: undefined,
    id: undefined,
    startDate: undefined,
    endDate: undefined,
    sortName: undefined,
    orderName: undefined
});

/** 搜索表单是否展开 */
const searchExpand = ref(false);

/** 搜索 */
const search = () => {
    const [startDate, endDate] = timeArr.value || [];
    emit('search', { ...form, startDate: startDate, endDate: endDate });
}

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
