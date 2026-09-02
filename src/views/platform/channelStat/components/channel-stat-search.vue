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
          <el-form-item label="渠道ID">
            <el-select v-model="form.channel" placeholder="请选择渠道" style="width: 100%" @change="search" filterable>
              <el-option v-for="item in configStore.ShareChannelArr" :key="item.id" :label="item.channelName" :value="item.channel || 0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="渠道类型">
            <dict-data code="channelNewType" valueType="number" v-model="form.channelType" />
          </el-form-item>
        </el-col>
        <el-col :lg="7" :md="7" :sm="12" :xs="24" v-if="searchExpand">
          <el-form-item :label="type ? '统计时间' : '渠道创建时间'">
            <el-date-picker v-model="timeArr" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :default-time="defaultTime" @change="search" range-separator="至" start-placeholder="开始" end-placeholder="结束" />
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
  import { useFormData } from '@/utils/use-form-data';
  import type { ChannelStatQuery } from '@/api/platform/model/channelStat';
  import { useConfigStore } from '@/store/modules/config'; // 导入store
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  type Props = {
    type: number;
  };
  const props = withDefaults(defineProps<Props>(), {
    type: 0
  });

  // 初始化store
  const configStore = useConfigStore();
  configStore.getShareChannels();
  const emit = defineEmits<{
    (e: 'search', where?: Partial<ChannelStatQuery>): void;
  }>();
  /** 搜索表单是否展开 */
  const searchExpand = ref(false);
  /** 表单数据 */
  const [form, resetFields] = useFormData<Partial<ChannelStatQuery>>({
    channel: undefined,
    countryCode: configStore.countryArr?.[0]?.code || '',
    startDate: undefined,
    channelType: undefined,
    endDate: undefined
  });
  /** 日期时间选择器默认时间 */
  const defaultTime: [Date, Date] = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)];
  let timeArr = ref<[string, string] | undefined>(undefined);
  /** 搜索 */
  const search = () => {
    const [startDate, endDate] = timeArr.value || [];
    emit('search', { ...form, startDate, endDate });
  };
  const searchParams = () => {
    const [startDate, endDate] = timeArr.value || [];
    return { ...form, startDate, endDate };
  };
  /** 搜索展开/收起 */
  const toggleExpand = () => {
    searchExpand.value = !searchExpand.value;
  };
  defineExpose({
    searchParams,
    timeArr
  });
  /** 重置 */
  const reset = () => {
    resetFields();
    timeArr.value = undefined;
    search();
  };
</script>
