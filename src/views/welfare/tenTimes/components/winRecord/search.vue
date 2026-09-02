<!-- 搜索表单 -->
<template>
    <el-form @keyup.enter="search" @submit.prevent="">
        <el-row :gutter="8">
            <el-col :lg="6" :md="6" :sm="12" :xs="24">
                <el-form-item label="用户ID">
                    <el-input clearable v-model.trim="form.uid" placeholder="请输入" />
                </el-form-item>
            </el-col>
            <el-col :lg="6" :md="6" :sm="12" :xs="24">
                <el-form-item label="是否机器人">
                     <el-select v-model="form.userFlag" placeholder="请选择">
                        <el-option label="机器人" :value="1"></el-option>
                        <el-option label="真人" :value="0"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :md="6" :sm="24" :xs="24">
                <el-form-item label="日期:">
                    <el-date-picker v-model="timeArr" type="daterange" range-separator="至" format="YYYY-MM-DD"
                        value-format="YYYYMMDD" start-placeholder="请选择开始日期" end-placeholder="请选择结束日期" />
                </el-form-item>
            </el-col>
            <el-col :lg="6" :md="12" :sm="12" :xs="24">
                <el-form-item label-width="16px">
                    <el-button type="primary" @click="search">查询</el-button>
                    <el-button @click="reset">重置</el-button>

                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
// import { ArrowDown, ArrowUp } from '@/components/icons';
import { useFormData } from '@/utils/use-form-data';
import type { TenTimesRecordParam } from "@/api/welfare/model";

const emit = defineEmits<{
    (e: 'search', where?: TenTimesRecordParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<TenTimesRecordParam>({
    uid: undefined,
    startDate: undefined,
    endDate: undefined,
    startDay: undefined,
    endDay: undefined,
    userFlag: undefined,
});

const timeArr = ref(['', ''])
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
