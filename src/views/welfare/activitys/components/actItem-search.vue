<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <!-- 国家 -->
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="国家">
                        <el-select v-model="form.countryCode" placeholder="请选择"
                            style="width: 100%;" @change="search" clearable>
                            <el-option v-for="item in configStore.countryArr"
                                :key="item.code" :label="item.name" :value="item.code || ''" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <!-- 时间范围 -->
                <el-col :lg="7" :md="7" :sm="12" :xs="24">
                    <el-form-item label="时间">
                        <el-date-picker v-model="timeArr" type="datetimerange"
                            value-format="YYYY-MM-DD HH:mm:ss" :default-time="defaultTime" @change="search"
                            range-separator="至" start-placeholder="开始"
                            end-placeholder="结束" clearable style="width: 100%;" />
                    </el-form-item>
                </el-col>
                <!-- 展开字段 -->
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="显示名称">
                        <el-input v-model="form.name" placeholder="请输入显示名称" clearable />
                    </el-form-item>
                </el-col>
                <!-- <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="类型">
                        <el-input v-model="form.type" placeholder="请输入类型" clearable />
                    </el-form-item>
                </el-col> -->
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="状态">
                        <el-select v-model="form.status" placeholder="请选择" style="width: 100%;" clearable>
                            <el-option label="启用" :value="1" />
                            <el-option label="禁用" :value="0" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="ID">
                        <el-input v-model.number="form.id" placeholder="请输入ID" clearable />
                    </el-form-item>
                </el-col>
                <!-- 操作按钮列 -->
                <el-col :lg="5" :md="12" :sm="12" :xs="24">
                    <el-form-item label-width="16px">
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button @click="reset">重置</el-button>
                        <el-link type="primary" :underline="false"
                            @click="toggleExpand" style="margin-left: 12px">
                            <template v-if="searchExpand">
                                <span>收起</span>
                                <el-icon style="vertical-align: -1px"><ArrowUp /></el-icon>
                            </template>
                            <template v-else>
                                <span>展开</span>
                                <el-icon style="vertical-align: -2px"><ArrowDown /></el-icon>
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
import type { ActItemParam } from '@/api/welfare/model/actItem';
import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';
import { useConfigStore } from '@/store/modules/config';

const emit = defineEmits<{
    (e: 'search', where?: ActItemParam): void;
}>();

const configStore = useConfigStore();

const [form, resetFields] = useFormData<ActItemParam>({
    countryCode: configStore.countryArr?.[0]?.code || undefined,
    name: undefined,
    type: undefined,
    status: undefined,
    id: undefined,
    startDate: undefined,
    endDate: undefined,
});

const searchExpand = ref(false);

/** 日期时间选择器默认时间 */
const defaultTime: [Date, Date] = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)];

const timeArr = ref<[string, string] | undefined>(undefined);

const search = () => {
    const [startDate, endDate] = timeArr.value || [];
    if (startDate && endDate) {
        const diffDays = dayjs(endDate).diff(dayjs(startDate), 'day');
        if (diffDays > 90) {
            ElMessage.warning('最大时间跨度不能超过90天');
            timeArr.value = undefined;
            return;
        }
    }
    emit('search', { ...form, startDate, endDate });
};

const reset = () => {
    resetFields();
    timeArr.value = undefined;
    search();
};

const toggleExpand = () => { searchExpand.value = !searchExpand.value; };

const searchParams = () => {
    const [startDate, endDate] = timeArr.value || [];
    return { ...form, startDate, endDate };
};

defineExpose({ searchParams });
</script>
