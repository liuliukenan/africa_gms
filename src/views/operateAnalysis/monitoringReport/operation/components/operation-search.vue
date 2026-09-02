<!-- 搜索表单 -->
<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item :label="t('platform.countryCode.name')">
                        <el-select v-model="form.countryCode" :placeholder="t('common.placeholder.select')" style="width: 100%;" @change="search">
                            <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name"
                                :value="item.code || ''" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="7" :md="7" :sm="12" :xs="24">
                    <el-form-item :label="t('user.operation.timeArr')">
                        <el-date-picker v-model="timeArr" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :default-time="defaultTime" @change="search"
                            :range-separator="t('common.time.to')" :start-placeholder="t('common.time.start')" :end-placeholder="t('common.time.end')" />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item :label="t('user.operation.device')">
                        <dict-data code="DeviceType" v-model="form.clientType" valueType="number" @change="search"/>
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="6" :sm="12" :xs="24" v-show="searchExpand">
                    <el-form-item :label="t('user.operation.channel')">
                        <!-- <dict-data code="serverType" v-model="form.channel" valueType="number" /> -->
                        <el-select v-model="form.channel" :placeholder="t('user.operation.placeholder.channel')" style="width: 100%;" @change="search" filterable>
                            <el-option v-for="item in configStore.ShareChannelArr" :key="item.id"
                                :label="item.channelName" :value="item.channel|| 0" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="6" :sm="12" :xs="24" v-show="searchExpand">
                    <el-form-item label="渠道类型">
                        <dict-data code="channelNewType" valueType="number" v-model="form.channelType" />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="6" :sm="12" :xs="24" v-show="searchExpand">
                    <el-form-item :label="t('user.operation.agent')">
                        <el-input-number v-model="form.agentId" :controls="false" style="width: 100%;" />
                    </el-form-item>
                </el-col>

                <el-col :lg="5" :md="12" :sm="12" :xs="24">
                    <el-form-item label-width="16px">
                        <el-button type="primary" @click="search">{{ t('action.search') }}</el-button>
                        <el-button @click="reset">{{ t('action.reset') }}</el-button>
                        <el-link type="primary" :underline="false" @click="toggleExpand" style="margin-left: 12px">
                            <template v-if="searchExpand">
                                <span>{{ t('action.collapse') }}</span>
                                <el-icon style="vertical-align: -1px">
                                    <ArrowUp />
                                </el-icon>
                            </template>
                            <template v-else>
                                <span>{{ t('action.expand') }}</span>
                                <el-icon style="vertical-align: -2px">
                                    <ArrowDown />
                                </el-icon>
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
import { useFormData } from '@/utils/use-form-data';
import type { OperationParam } from '@/api/operateAnalysis/monitoringReport/model/operation';
import { useConfigStore } from "@/store/modules/config"; // 导入store
import { ArrowUp, ArrowDown } from '@/components/icons'
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const configStore = useConfigStore();
configStore.getShareChannels();
const emit = defineEmits<{
    (e: 'search', where?: OperationParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<OperationParam>({
    countryCode: configStore.countryArr?.[0]?.code || '',
    channel: undefined,
    channelType: undefined,
    clientType: undefined,
    agentId: undefined,
    startDate: undefined,
    endDate: undefined,
});
/** 日期时间选择器默认时间 */
const defaultTime: [Date, Date] = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)];
let timeArr = ref<[string, string] | undefined>([
    dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
]);
/* 搜索 */
const search = () => {
    const [startDay, endDay] = timeArr.value || [];
    emit('search', { ...form, startDate: startDay, endDate: endDay });
}
/* 展开收起 */
const searchExpand = ref(false);

/** 搜索展开/收起 */
const toggleExpand = () => {
    searchExpand.value = !searchExpand.value;
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
    timeArr.value = [
        dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
    ];
    search();
};
</script>
