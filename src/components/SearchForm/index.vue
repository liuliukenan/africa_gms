<!-- 搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <!-- 国家 -->
        <el-col v-if="showField('countryCode')" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="国家">
            <el-select v-model="form.countryCode" placeholder="请选择" style="width: 100%" @change="search">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code || ''" />
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 用户类型 -->
        <el-col v-if="showField('userType')" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="用户类型">
            <dict-data code="statUserTypeOfLoginRetention" v-model="form.userType" valueType="number" @change="search" />
          </el-form-item>
        </el-col>
        <!-- 日期 -->
        <el-col v-if="showField('date')" :lg="7" :md="7" :sm="12" :xs="24">
          <el-form-item label="日期">
            <el-date-picker v-model="timeArr" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :default-time="defaultTime" @change="search" range-separator="至" start-placeholder="开始" end-placeholder="结束" />
          </el-form-item>
        </el-col>
        <!-- 推广渠道 -->
        <el-col v-if="showField('channel')" :lg="6" :md="6" :sm="12" :xs="24" v-show="searchExpand">
          <el-form-item label="推广渠道">
            <dict-data code="serverType" v-model="form.channel" valueType="number" />
          </el-form-item>
        </el-col>

        <!-- 设备 -->
        <el-col v-if="showField('clientType')" :lg="6" :md="6" :sm="12" :xs="24" v-show="searchExpand">
          <el-form-item label="设备">
            <dict-data code="DeviceType" v-model="form.clientType" valueType="number" />
          </el-form-item>
        </el-col>
        <!-- 代理ID -->
        <el-col v-if="showField('agentId')" :lg="6" :md="6" :sm="12" :xs="24" v-show="searchExpand">
          <el-form-item label="代理ID">
            <el-input-number v-model="form.agentId" :controls="false" style="width: 100%" />
          </el-form-item>
        </el-col>
        <!-- 游戏ID -->
        <el-col v-if="showField('gameId')" :lg="6" :md="6" :sm="12" :xs="24" v-show="searchExpand">
          <el-form-item label="游戏ID">
            <el-input-number v-model="form.gameId" :controls="false" style="width: 100%" />
          </el-form-item>
        </el-col>
        <!-- 游戏厂商 -->
        <el-col v-if="showField('factoryCode')" :lg="6" :md="6" :sm="12" :xs="24" v-show="searchExpand">
          <el-form-item label="游戏厂商">
            <el-input v-model="form.factoryCode" placeholder="请输入游戏厂商" />
          </el-form-item>
        </el-col>
        <!-- 游戏类型 -->
        <el-col v-if="showField('gameGroupId')" :lg="6" :md="6" :sm="12" :xs="24" v-show="searchExpand">
          <el-form-item label="游戏类型">
            <dict-data code="gameGroup" v-model="form.gameGroupId" valueType="number" @change="search" />
          </el-form-item>
        </el-col>
        <!-- 用户ID -->
        <el-col v-if="showField('uid')" :lg="6" :md="6" :sm="12" :xs="24" v-show="searchExpand">
          <el-form-item label="用户ID">
            <el-input v-model="form.uid" placeholder="请输入用户ID" />
          </el-form-item>
        </el-col>

        <!-- 操作按钮 -->
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
  import { ref, computed } from 'vue';
  import { useFormData } from '@/utils/use-form-data';
  import type { OperationParam } from '@/api/operateAnalysis/monitoringReport/model/operation';
  import { useConfigStore } from '@/store/modules/config'; // 导入store
  import { ArrowUp, ArrowDown } from '@/components/icons';
  import { SearchParam } from '@/api/operateAnalysis/monitoringReport/model/searchForm';
  import dayjs from 'dayjs';
  const configStore = useConfigStore();
  const emit = defineEmits<{
    (e: 'search', where?: OperationParam): void;
  }>();
  const props = defineProps<{
    showWhere?: string[];
  }>();
  const showField = (field: string) => {
    return !props.showWhere || props.showWhere.includes(field);
  };
  /** 表单数据 */
  const [form, resetFields] = useFormData<SearchParam>({
    countryCode: configStore.countryArr?.[0]?.code || '',
    channel: undefined,
    clientType: undefined,
    agentId: undefined,
    gameId: undefined,
    factoryCode: undefined,
    gameGroupId: undefined,
    uid: undefined,
    startDate: undefined,
    endDate: undefined,
    userType: 2
  });

  /** 日期时间选择器默认时间 */
  const defaultTime: [Date, Date] = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)];
  let timeArr = ref<[string, string] | undefined>([
    dayjs().subtract(1, 'month').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  ]);
  /* 搜索 */
  const search = () => {
    const [startDay, endDay] = timeArr.value || [];
    emit('search', { ...form, startDate: startDay, endDate: endDay });
  };
  /* 展开收起 */
  const searchExpand = ref(false);

  /** 搜索展开/收起 */
  const toggleExpand = () => {
    searchExpand.value = !searchExpand.value;
  };
  const searchParams = () => {
    const [startDate, endDate] = timeArr.value || [];
    return { ...form, startDate, endDate };
  };

  defineExpose({
    searchParams
  });
  /**  重置 */
  const reset = () => {
    resetFields();
    timeArr.value = [
      dayjs().subtract(1, 'month').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
    ];
    search();
  };
</script>
