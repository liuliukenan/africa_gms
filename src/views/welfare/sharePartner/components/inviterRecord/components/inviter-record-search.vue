<!-- 搜索表单 -->
<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="被邀请人用户ID">
                        <el-input clearable v-model.trim="form.uid" placeholder="请输入" />
                    </el-form-item>
                    <!-- <el-form-item label="邀请人用户ID">
                        <el-input clearable v-model.trim="form.layer1" placeholder="请输入" />
                    </el-form-item> -->
                </el-col>
                <el-col :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
                    <el-form-item label="时间">
                        <el-date-picker v-model="timeArr" type="daterange" range-separator="至" start-placeholder="开始"
                            :value-format="'YYYY-MM-DD'" end-placeholder="结束" />
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
import type { UserInviterRecordParam } from '@/api/welfare/model/inviterRecord';
import dayjs from 'dayjs';

const emit = defineEmits<{
    (e: 'search', where?: UserInviterRecordParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<UserInviterRecordParam>({
    uid: undefined,
    // layer1: undefined,
    startDay: undefined,
    endDay: undefined
});


/** 搜索表单是否展开 */
const searchExpand = ref(false);

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

/** 搜索展开/收起 */
const toggleExpand = () => {
    searchExpand.value = !searchExpand.value;
};
</script>
