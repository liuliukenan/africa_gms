<!-- 搜索表单 -->
<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <!-- <el-col   :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="id">
                        <el-input  clearable  v-model.trim="form.id"  placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
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
                <!-- <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
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
                    <el-form-item label="slots下注">
                        <el-input  clearable  v-model.trim="form.slotsBet"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="slots赢取">
                        <el-input  clearable  v-model.trim="form.slotsWin"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="cards下注">
                        <el-input  clearable  v-model.trim="form.cardsBet"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="cards赢取">
                        <el-input  clearable  v-model.trim="form.cardsWin"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="捕鱼下注">
                        <el-input  clearable  v-model.trim="form.fishBet"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="捕鱼赢取">
                        <el-input  clearable  v-model.trim="form.fishWin"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="真人下注">
                        <el-input  clearable  v-model.trim="form.liveBet"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="真人赢取">
                        <el-input  clearable  v-model.trim="form.liveWin"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="体育下注">
                        <el-input  clearable  v-model.trim="form.sportsBet"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="体育赢取">
                        <el-input  clearable  v-model.trim="form.sportsWin"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="彩票下注">
                        <el-input  clearable  v-model.trim="form.lotteryBet"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="彩票赢取">
                        <el-input  clearable  v-model.trim="form.lotteryWin"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="其它下注">
                        <el-input  clearable  v-model.trim="form.otherBet"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="其它赢取">
                        <el-input  clearable  v-model.trim="form.otherWin"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="返利金额">
                        <el-input  clearable  v-model.trim="form.rebateAmount"  placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
                <el-col :lg="8" :md="12" :sm="12" :xs="24">
                    <el-form-item label-width="16px">
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button @click="reset">重置</el-button>
                        <!-- <el-link
                                type="primary"
                                :underline="false"
                                @click="toggleExpand"
                                style="margin-left: 12px"
                        >
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
// import { ArrowDown, ArrowUp } from '@/components/icons';
import { useFormData } from '@/utils/use-form-data';
import type { RebateListParam } from "@/api/welfare/model/rebateList"; import dayjs from 'dayjs';
;

const emit = defineEmits<{
    (e: 'search', where?: RebateListParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<RebateListParam>({
    id: undefined,
    daykey: undefined,
    startDay: undefined,
    uid: undefined,
    totalBet: undefined,
    totalWin: undefined,
    slotsBet: undefined,
    slotsWin: undefined,
    cardsBet: undefined,
    cardsWin: undefined,
    fishBet: undefined,
    fishWin: undefined,
    liveBet: undefined,
    liveWin: undefined,
    sportsBet: undefined,
    sportsWin: undefined,
    lotteryBet: undefined,
    lotteryWin: undefined,
    otherBet: undefined,
    otherWin: undefined,
    rebateAmount: undefined
});

let timeArr = ref<[string, string]>([dayjs().subtract(1, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]);
/** 搜索表单是否展开 */
const searchExpand = ref(false);

/** 搜索 */
const search = () => {
    if (timeArr.value && timeArr.value[0] && timeArr.value[1]) {
        form.startDay = Number(dayjs(timeArr.value[0]).format("YYYYMMDD"));
        form.endDay = Number(dayjs(timeArr.value[1]).format("YYYYMMDD"));
    }
    emit('search', { ...form });
};
const searchParams = () => {
    if (timeArr.value && timeArr.value[0] && timeArr.value[1]) {
        form.startDay = Number(dayjs(timeArr.value[0]).format("YYYYMMDD"));
        form.endDay = Number(dayjs(timeArr.value[1]).format("YYYYMMDD"));
    }
    return { ...form };
};
defineExpose({
    searchParams,
    search
});
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
