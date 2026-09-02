<!-- 搜索表单 -->
<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <!-- <el-col :lg="4" :md="4" :sm="12" :xs="24" v-if="form.indicator != 0">
                    <el-form-item label="国家">
                        <el-select v-model="form.countryCode" placeholder="请选择" style="width: 100%;" @change="search">
                            <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name"
                                :value="item.code || ''" />
                        </el-select>
                    </el-form-item>
                </el-col> -->
                <!-- <el-col :lg="5" :md="5" :sm="12" :xs="24">
                    <el-form-item label="指标">
                        <dict-data code="statUserTypeOfLoginRetention" v-model="form.userType" valueType="number"
                            @change="search" />
                        <el-select v-model="form.indicator" placeholder="请选择" style="width: 100%;"
                            @change="changeIndicator" clearable>
                            <el-option label="在线人数" :value="0" />
                        </el-select>
                    </el-form-item>
                </el-col> -->
                <!-- <el-col :lg="5" :md="5" :sm="12" :xs="24">
                    <el-form-item label="渠道">
                        <dict-data code="serverType" v-model="form.channel" valueType="number" />
                        <el-select v-model="form.channel" placeholder="请选择渠道" style="width: 100%;" @change="search">
                            <el-option v-for="item in configStore.ShareChannelArr" :key="item.id"
                                :label="item.channelName" :value="item.channel|| 0" />
                        </el-select>
                    </el-form-item>
                </el-col> -->
                <el-col :lg="5" :md="5" :sm="12" :xs="24">
                    <el-form-item label="指标">
                        <el-select v-model="form.metric" placeholder="请选择" style="width: 100%;" @change="search">
                            <el-option label="在线人数" :value="0" />
                            <el-option label="充值次数" :value="1" />
                            <el-option label="充值金额" :value="2" />
                            <el-option label="提现次数" :value="3" />
                            <el-option label="提现金额" :value="4" />
                            <el-option label="cash下注次数" :value="5" />
                            <el-option label="cash下注金额" :value="6" />
                            <el-option label="cash返奖金额" :value="7" />
                            <el-option label="bonus下注次数" :value="8" />
                            <el-option label="bonus下注金额" :value="9" />
                            <el-option label="bonus返奖金额" :value="10" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="5" :md="5" :sm="12" :xs="24">
                    <el-form-item label="对比日期">
                        <el-date-picker v-model="form.startDate" type="date" :value-format="'YYYY-MM-DD'"
                            :picker-options="pickerOptions" placeholder="请选择" @change="search"/>
                    </el-form-item>
                </el-col>
                <el-col :lg="5" :md="5" :sm="12" :xs="24">
                    <el-form-item>
                        <!-- <el-button type="primary" @click="search">查询</el-button> -->
                        <el-button @click="reset">重置</el-button>
                        <el-button @click="reload"  type="success">刷新</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </ele-card>
</template>

<script lang="ts" setup>
import { useFormData } from '@/utils/use-form-data';
import type { OperationParam } from '@/api/operateAnalysis/monitoringReport/model/operation';
import { useConfigStore } from "@/store/modules/config"; // 导入store
import dayjs from 'dayjs';
import { ref } from 'vue';
import { EleMessage } from 'ele-admin-plus';
const configStore = useConfigStore();
const emit = defineEmits<{
    (e: 'search', where?: OperationParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<any>({
    // countryCode: configStore.countryArr?.[0]?.code || '',
    // userType: undefined,
    // indicator: undefined,
    metric: 0,
    startDate: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
});
const pickerOptions = ref({
    disabledDate(time) {
        // 获取今天的开始时间（00:00:00）
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        // 禁用今天及之后的日期
        return time.getTime() >= today.getTime();
    }
})
const changeIndicator = (val) => {
    if (val == 0) {
        form.countryCode = undefined
    }
    search();
}
// let timeArr = ref<[string, string]>([dayjs().subtract(1, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]);
/* 搜索 */
const search = () => {
    // const [startDay, endDay] = timeArr.value || [];
    // emit('search', { ...form, startDate: startDay, endDate: endDay });
    emit('search', { ...form });
}
const reload = () => {
    search();
    EleMessage.success('刷新成功');
};

const searchParams = () => {
    return { ...form };
};

defineExpose({
    searchParams,
});
/**  重置 */
const reset = () => {
    resetFields();
    search();
};
</script>
