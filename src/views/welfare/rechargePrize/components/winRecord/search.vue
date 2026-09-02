<!-- 搜索表单 -->
<template>
    <el-form @keyup.enter="search" @submit.prevent="">
        <el-row :gutter="8">
            <el-col :lg="6" :md="6" :sm="12" :xs="24">
                <el-form-item label="用户ID">
                    <el-input clearable v-model.trim="form.uid" placeholder="请输入" />
                </el-form-item>
            </el-col>
            <!-- <el-col :lg="6" :md="6" :sm="12" :xs="24">
                <el-form-item label="奖励">
                    <el-input clearable v-model.trim="form.reward" placeholder="请输入" />
                </el-form-item>
            </el-col> -->
            <el-col :lg="6" :md="6" :sm="12" :xs="24">
                <el-form-item label="奖励">
                    <dict-data code="sendStatus" v-model="form.status" valueType="number" />
                </el-form-item>
            </el-col>
            <!-- <el-col :md="6" :sm="24" :xs="24">
                <el-form-item label="活动时间:">
                    <el-date-picker v-model="timeArr" type="daterange" range-separator="至" format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD" start-placeholder="请选择开始日期" end-placeholder="请选择结束日期"
                        @change="changeTime" />
                </el-form-item>
            </el-col> -->
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
import type { VipParam } from '@/api/model/vip';
import type {  WinAwardParam } from "@/api/welfare/model";
const emit = defineEmits<{
    (e: 'search', where?: VipParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<WinAwardParam>({
    uid: undefined,
    status: undefined,
    // endTime: undefined,
});


/** 搜索表单是否展开 */
const searchExpand = ref(false);
// const timeArr = ref(['', ''])
// const changeTime = (val: string[]) => {
    // if (val) {
    //     form.startTime = val[0]
    //     form.endTime = val[1]
    // }
// }
/** 搜索 */
const search = () => {
    emit('search', { ...form });
};

/**  重置 */
const reset = () => {
    resetFields();
    search();
};

/** 搜索展开/收起 */
const toggleExpand = () => {
    searchExpand.value = !searchExpand.value;
};
</script>
