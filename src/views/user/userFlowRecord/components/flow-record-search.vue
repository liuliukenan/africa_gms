<!-- 搜索表单 -->
<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item :label="t('user.userFlowRecord.table.countryCode')">
                        <el-select v-model="form.countryCode" :placeholder="t('common.pleaseSelect')" style="width: 100%;"
                            @change="search">
                            <el-option v-for="item in configStore.countryArr" :key="item.code"
                                :label="item.name" :value="item.code || ''" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="7" :md="7" :sm="12" :xs="24">
                    <el-form-item :label="t('user.userFlowRecord.timeArr')">
                        <el-date-picker v-model="timeArr" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss"
                            :default-time="defaultTime" @change="search" :range-separator="t('common.time.to')" :start-placeholder="t('common.time.start')"
                            :end-placeholder="t('common.time.end')" clearable style="width: 100%;" />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item :label="t('user.userFlowRecord.table.uid')">
                        <el-input clearable v-model.trim="form.uid" :placeholder="t('common.pleaseInput')" />
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item :label="t('user.userFlowRecord.table.phone')">
                        <el-input clearable v-model.trim="form.phone" :placeholder="t('common.pleaseInput')" />
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item :label="t('user.userFlowRecord.table.walletType')">
                        <el-select v-model="form.queryType" :placeholder="t('common.pleaseSelect')" clearable style="width: 100%;">
                            <el-option :label="t('user.userFlowRecord.walletTypeOptions.cash')" :value="0" />
                            <el-option :label="t('user.userFlowRecord.walletTypeOptions.group')" :value="2" />
                            <el-option :label="t('user.userFlowRecord.walletTypeOptions.game')" :value="3" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item :label="t('user.userFlowRecord.table.flowType')">
                        <dict-data :code="flowTypeDictCode" v-model="form.flowType" valueType="number" multiple filterable/>
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item :label="t('user.userFlowRecord.table.status')">
                        <el-select v-model="form.status" :placeholder="t('common.pleaseSelect')" clearable style="width: 100%;">
                            <el-option :label="t('user.userFlowRecord.status.inProgress')" :value="0" />
                            <el-option :label="t('user.userFlowRecord.status.completed')" :value="1" />
                            <el-option :label="t('user.userFlowRecord.status.closed')" :value="2" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="5" :md="12" :sm="12" :xs="24">
                    <el-form-item label-width="16px">
                        <el-button type="primary" @click="search">{{ t('action.search') }}</el-button>
                        <el-button @click="reset">{{ t('action.reset') }}</el-button>
                        <el-link type="primary" :underline="false" @click="toggleExpand"
                            style="margin-left: 12px">
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
import { ref, computed, watch } from 'vue';
import { ArrowDown, ArrowUp } from '@/components/icons';
import { useFormData } from '@/utils/use-form-data';
import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';
import { useConfigStore } from '@/store/modules/config';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface Props {
    flowType?: string;
}

const props = withDefaults(defineProps<Props>(), {
    flowType: 'common'
});

const emit = defineEmits<{
    (e: 'search', where?: Record<string, any>): void;
}>();

const configStore = useConfigStore();

const [form, resetFields] = useFormData({
    uid: undefined,
    queryType: undefined,
    flowType: undefined,
    status: undefined,
    countryCode: configStore.countryArr?.[0]?.code || undefined,
    startDate: undefined,
    endDate: undefined,
    phone: undefined,
    id: undefined
});

const searchExpand = ref(false);

/** 日期时间选择器默认时间 */
const defaultTime: [Date, Date] = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)];

const timeArr = ref<[string, string] | undefined>([
    dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
]);

/** 流水类型字典编码 */
const flowTypeDictCode = computed(() => {
    return 'flow_type_common';
    // switch (props.flowType) {
    //     case 'common':
    //         return 'flow_type_common';
    //     case 'game':
    //         return 'flow_type_game';
    //     case 'group':
    //         return 'flow_type_group';
    //     default:
    //         return 'flow_type_common';
    // }
});

/** 监听flowType变化，重置流水类型 */
watch(() => props.flowType, () => {
    form.flowType = undefined;
});

const search = () => {
    const [startDate, endDate] = timeArr.value || [];
    if (startDate && endDate) {
        const diffDays = dayjs(endDate).diff(dayjs(startDate), 'day');
        if (diffDays > 90) {
            ElMessage.warning(t('user.userFlowRecord.maxTimeSpanWarning'));
            timeArr.value = undefined;
            return;
        }
    }
    emit('search', { ...form, startDate, endDate });
};

const reset = () => {
    resetFields();
    timeArr.value = [
        dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
    ];
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
