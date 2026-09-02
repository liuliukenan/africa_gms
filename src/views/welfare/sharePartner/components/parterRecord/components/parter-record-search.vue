<!-- 搜索表单 -->
<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="uid">
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
                    <el-form-item label="时间">
                        <el-input  clearable  v-model.trim="form.daykey"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="总下注">
                        <el-input  clearable  v-model.trim="form.totalBet"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="总赢取">
                        <el-input  clearable  v-model.trim="form.totalWin"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="净利">
                        <el-input  clearable  v-model.trim="form.totalResult"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="一级">
                        <el-input  clearable  v-model.trim="form.layer1"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="二级">
                        <el-input  clearable  v-model.trim="form.layer2"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="三级">
                        <el-input  clearable  v-model.trim="form.layer3"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="一级利润">
                        <el-input  clearable  v-model.trim="form.layer1Result"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="二级利润">
                        <el-input  clearable  v-model.trim="form.layer2Result"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="三级利润">
                        <el-input  clearable  v-model.trim="form.layer3Result"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="注册时间">
                        <el-input  clearable  v-model.trim="form.regTime"  placeholder="请输入" />
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
import type { UserParterRecordParam } from "@/api/welfare/model/parterRecord";
import dayjs from 'dayjs';

const emit = defineEmits<{
    (e: 'search', where?: UserParterRecordParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<UserParterRecordParam>({
    //   id:undefined,
    uid: undefined,
    startDay: undefined,
    endDay: undefined
    //   daykey:undefined,
    //   totalBet:undefined,
    //   totalWin:undefined,
    //   totalResult:undefined,
    //   layer1:undefined,
    //   layer2:undefined,
    //   layer3:undefined,
    //   layer1Result:undefined,
    //   layer2Result:undefined,
    //   layer3Result:undefined,
    //   regTime:undefined
});


let timeArr = ref<[string, string]>([dayjs().subtract(1, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]);
/* 搜索 */
const search = () => {
    if (timeArr.value && timeArr.value[0] && timeArr.value[1]) {
        form.startDay = Number(dayjs(timeArr.value[0]).format("YYYYMMDD"));
        form.endDay = Number(dayjs(timeArr.value[1]).format("YYYYMMDD"));
    } else {
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

</script>
