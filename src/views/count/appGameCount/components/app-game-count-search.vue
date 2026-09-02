<!-- 搜索表单 -->
<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form label-width="72px" @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <el-col :lg="8" :md="12" :sm="12" :xs="24">
                    <el-form-item label="时间">
                        <el-date-picker v-model="timeArr" type="daterange" :value-format="'YYYY-MM-DD'" range-separator="至"
                            start-placeholder="开始" end-placeholder="结束" />
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
import type { AppGameCountParam } from '@/api/count/model/appGameCount';
import dayjs from 'dayjs';

const emit = defineEmits<{
    (e: 'search', where?: AppGameCountParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<AppGameCountParam>({
    startDay: undefined,
    endDay: undefined,

});

let timeArr = ref<[string, string]>([dayjs().subtract(1, 'month').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]);
/* 搜索 */
const search = () => {
    const [startDay, endDay] = timeArr.value || [];
    emit('search', { ...form, startDay, endDay });
}

/**  重置 */
const reset = () => {
    resetFields();
    timeArr.value = ['', ''];
    search();
};
</script>
