<!-- 搜索表单 -->
<template>
    <el-form :label-col="{ xl: 7, lg: 5, md: 7, sm: 4 }" :wrapper-col="{ xl: 17, lg: 19, md: 17, sm: 20 }">
        <el-row :gutter="8">
            <el-col :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
                <el-form-item :label="t('dashboard.workplace.search.date')">
                    <el-date-picker v-model="timeArr" type="daterange" unlink-panels :range-separator="t('common.time.to')"
                        value-format="YYYYMMDD" :start-placeholder="t('common.time.start')" :end-placeholder="t('common.time.end')" :shortcuts="shortcuts"
                        :disabled-date="disabledDate" :default-value="defaultDateRange" />
                </el-form-item>
            </el-col>
            <el-col :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
                <el-form-item class="ele-text-right" :wrapper-col="{ span: 24 }">
                    <el-button type="primary" @click="search">{{ t('action.search') }}</el-button>
                    <el-button @click="reset">{{ t('action.reset') }}</el-button>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useFormData } from '@/utils/use-form-data';
import { GameDataParam } from '@/api/dashboard/model/workplace';
const { t } = useI18n();

const emit = defineEmits(['search']);
const timeArr = ref('')

// 计算近一个月的起始时间（当前日期往前推30天）
const getOneMonthAgo = () => {
    const date = new Date();
    date.setTime(date.getTime() - 30 * 24 * 60 * 60 * 1000);
    return date;
};

// 禁用日期规则：只能选择近一个月内的日期，且不能选择未来日期
const disabledDate = (date: Date) => {
    const oneMonthAgo = getOneMonthAgo();
    const today = new Date();
    // 禁用今天之后的日期 和 一个月之前的日期
    return date > today || date < oneMonthAgo;
};

// 计算默认日期范围：上个月1号 ~ 今天
const defaultDateRange = computed((): [Date, Date] => {
    const today = new Date();
    // 上个月1号（处理1月时，month-1为0，自动转为上一年12月）
    const lastMonthFirstDay = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    return [lastMonthFirstDay, today] as const;
});

const shortcuts = computed(() => [
    {
        text: t('dashboard.workplace.search.today'),
        value: () => {
            const end = new Date()
            const start = new Date()
            return [start, end]
        },
    },
    // {
    //     text: '昨日',
    //     value: () => {
    //         const end = new Date()
    //         const start = new Date()
    //         start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
    //         return [start, end]
    //     },
    // },
    {
        text: t('dashboard.workplace.search.last7Days'),
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
        },
    },
    {
        text: t('dashboard.workplace.search.last30Days'),
        value: () => {
            const end = new Date()
            const start = getOneMonthAgo() // 复用近一个月计算逻辑
            return [start, end]
        },
    },
])

// 表单数据
const { form, resetFields } = useFormData<GameDataParam>({
    startDate: undefined,
    endDate: undefined,
});

/* 搜索 */
const search = () => {
    const [startDate, endDate] = timeArr.value || [];
    emit('search', { ...form, startDate, endDate });
};

/* 重置 */
const reset = () => {
    resetFields();
    timeArr.value = '';
    search();
};

defineExpose({
    search
});
</script>