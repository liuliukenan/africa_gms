<!-- 搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="国家">
            <el-select v-model="form.countryCode" placeholder="请选择" style="width: 100%" @change="search">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code || ''" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="用户类型">
            <dict-data code="StatUserPayType" v-model="form.userType" valueType="number" @change="search" />
          </el-form-item>
        </el-col>
        <el-col :lg="7" :md="7" :sm="12" :xs="24">
          <el-form-item label="时间">
            <el-date-picker v-model="timeArr" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :default-time="defaultTime" range-separator="至" start-placeholder="开始" end-placeholder="结束" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24" v-show="searchExpand">
          <el-form-item :label="t('user.operation.channel')">
            <el-select v-model="form.channel" :placeholder="t('user.operation.placeholder.channel')" style="width: 100%;" @change="search" filterable clearable>
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
          <el-form-item label="设备">
            <dict-data code="DeviceType" v-model="form.clientType" valueType="number" @change="search" />
          </el-form-item>
        </el-col>

        <el-col :lg="6" :md="6" :sm="12" :xs="24" v-show="searchExpand">
          <el-form-item label="代理ID">
            <el-input-number v-model="form.agentId" :controls="false" style="width: 100%" @enter.native="search" />
          </el-form-item>
        </el-col>

        <el-col :lg="5" :md="12" :sm="12" :xs="24">
          <el-form-item label-width="16px">
            <el-button type="primary" @click="search">查询</el-button>
            <el-button @click="reset">重置</el-button>
            <el-link type="primary" :underline="false" @click="toggleExpand" style="margin-left: 12px">
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
  import type { PaymentRetentionParam } from '@/api/operateAnalysis/userAnalysis/model/payment';
  import { useConfigStore } from '@/store/modules/config';
  import { ArrowUp, ArrowDown } from '@/components/icons';
  import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
  const configStore = useConfigStore();
configStore.getShareChannels();
  const emit = defineEmits<{
    (e: 'search', where?: PaymentRetentionParam): void;
  }>();
  /** 表单数据 */
  const [form, resetFields] = useFormData<PaymentRetentionParam>({
    countryCode: configStore.countryArr?.[0]?.code || '',
    channel: undefined,
    channelType: undefined,
    clientType: undefined,
    agentId: undefined,
    startDate: undefined,
    endDate: undefined,
    userType: 3 //新增用户
  });

  /** 日期时间选择器默认时间 */
  const defaultTime: [Date, Date] = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)];
  let timeArr = ref<[string, string] | undefined>([
    dayjs().subtract(14, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  ]);
  /* 搜索 */
  const search = () => {
    const [startDay, endDay] = timeArr.value || [];
    emit('search', { ...form, startDate: startDay, endDate: endDay });
  };
  const searchExpand = ref(false);
  const toggleExpand = () => {
    searchExpand.value = !searchExpand.value;
  };
  /**  重置 */
  const reset = () => {
    resetFields();
    timeArr.value = [
      dayjs().subtract(14, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
    ];
    search();
  };
  const searchParams = () => {
    const [startDate, endDate] = timeArr.value || [];
    return { ...form, startDate, endDate };
  };

  defineExpose({
    searchParams
  });
</script>
