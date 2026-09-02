<!-- 搜索表单 -->
<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <!-- 常驻字段 -->
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="国家">
                        <el-select v-model="form.countryCode" placeholder="请选择"
                            style="width: 100%;" @change="search">
                            <el-option v-for="item in configStore.countryArr"
                                :key="item.code" :label="item.name" :value="item.code || ''" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="时间">
                        <el-date-picker v-model="timeArr" type="daterange"
                            :value-format="'YYYY-MM-DD'" @change="search"
                            range-separator="至" start-placeholder="开始"
                            end-placeholder="结束" clearable style="width: 100%;" />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="玩家ID">
                        <el-input v-model.trim="form.uid" placeholder="请输入玩家ID" clearable />
                    </el-form-item>
                </el-col>

                <!-- 展开字段 -->
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="原渠道">
                        <el-select v-model="form.oldChannel" placeholder="请选择原渠道"
                            style="width: 100%;" clearable @change="search" filterable>
                            <el-option v-for="item in configStore.ShareChannelArr"
                                :key="item.id" :label="item.channelName"
                                :value="item.channel || 0" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="新渠道">
                        <el-select v-model="form.newChannel" placeholder="请选择新渠道"
                            style="width: 100%;" clearable @change="search" filterable>
                            <el-option v-for="item in configStore.ShareChannelArr"
                                :key="item.id" :label="item.channelName"
                                :value="item.channel || 0" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="操作人ID">
                        <el-input v-model.trim="form.operatorId" placeholder="请输入操作人ID" clearable />
                    </el-form-item>
                </el-col>

                <!-- 操作按钮列 -->
                <el-col :lg="6" :md="12" :sm="12" :xs="24">
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
import type { ChannelChangeRecordQuery } from '@/api/platform/model/channelChangeRecord';
import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';
import { useConfigStore } from '@/store/modules/config';

const emit = defineEmits<{
    (e: 'search', where?: ChannelChangeRecordQuery): void;
}>();

const configStore = useConfigStore();
configStore.getShareChannels();

const [form, resetFields] = useFormData<ChannelChangeRecordQuery>({
    countryCode: configStore.countryArr?.[0]?.code || undefined,
    startDate: undefined,
    endDate: undefined,
    uid: undefined,
    oldChannel: undefined,
    newChannel: undefined,
    operatorId: undefined
});

const searchExpand = ref(false);

const timeArr = ref<[string, string]>([
    dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
    dayjs().format('YYYY-MM-DD')
]);

const search = () => {
    const [startDate, endDate] = timeArr.value || [];
    // if (startDate && endDate) {
    //     const diffDays = dayjs(endDate).diff(dayjs(startDate), 'day');
    //     if (diffDays > 90) {
    //         ElMessage.warning('最大时间跨度不能超过90天');
    //         timeArr.value = ['', ''];
    //         return;
    //     }
    // }
    emit('search', { ...form, startDate, endDate });
};

const reset = () => {
    resetFields();
    timeArr.value = ['', ''];
    search();
};

const toggleExpand = () => {
    searchExpand.value = !searchExpand.value;
};

const searchParams = () => {
    const [startDate, endDate] = timeArr.value || [];
    return { ...form, startDate, endDate };
};

defineExpose({ searchParams });
</script>
