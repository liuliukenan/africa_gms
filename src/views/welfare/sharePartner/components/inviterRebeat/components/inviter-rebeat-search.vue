<!-- 搜索表单 -->
<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="用户Id">
                        <el-input clearable v-model.trim="form.uid" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
                    <el-form-item label="时间">
                        <el-date-picker v-model="timeArr" type="daterange" range-separator="至" start-placeholder="开始"
                            :value-format="'YYYY-MM-DD'" end-placeholder="结束" />
                    </el-form-item>
                </el-col>
                <!-- <el-col   :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="ukey">
                        <el-input  clearable  v-model.trim="form.ukey"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="daykey">
                        <el-input  clearable  v-model.trim="form.daykey"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="总下注">
                        <el-input  clearable  v-model.trim="form.totalBet"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="返利人数">
                        <el-input  clearable  v-model.trim="form.totalNum"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="总金额">
                        <el-input  clearable  v-model.trim="form.amount"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="是否发送">
                        <el-input  clearable  v-model.trim="form.send"  placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
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
// import { ArrowDown, ArrowUp } from '@/components/icons';
import { useFormData } from '@/utils/use-form-data';
import type { UserInviterRebeatParam } from "@/api/welfare/model/inviterRebeat";
import dayjs from 'dayjs';
import { time } from 'console';

const emit = defineEmits<{
    (e: 'search', where?: UserInviterRebeatParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<UserInviterRebeatParam>({
    // id: undefined,
    uid: undefined,
    // ukey: "",
    startDay: undefined,
    endDay: undefined,
    //   totalNum:undefined,
    //   amount:undefined,
    //   send:""
});


/** 搜索表单是否展开 */
const searchExpand = ref(false);

let timeArr = ref<[string, string]>([dayjs().subtract(1, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]);
/* 搜索 */
const search = () => {
    if (timeArr.value && timeArr.value[0] && timeArr.value[1]) {
        form.startDay = Number(dayjs(timeArr.value[0]).format("YYYYMMDD"));
        form.endDay = Number(dayjs(timeArr.value[1]).format("YYYYMMDD"));
    }else {
        form.startDay = undefined
        form.endDay = undefined
    }
    emit('search', form);
};

/**  重置 */
const reset = () => {
    resetFields();
    timeArr.value = [dayjs().subtract(1, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')];
    search();
};

/** 搜索展开/收起 */
const toggleExpand = () => {
    searchExpand.value = !searchExpand.value;
};
</script>
