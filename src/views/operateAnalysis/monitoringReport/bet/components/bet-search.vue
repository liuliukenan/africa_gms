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
        <el-col :lg="7" :md="7" :sm="12" :xs="24">
          <el-form-item label="日期">
            <el-date-picker v-model="timeArr" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :default-time="defaultTime" @change="search" range-separator="至" start-placeholder="开始" end-placeholder="结束" />
          </el-form-item>
        </el-col>
        <!-- <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="渠道">
                        <dict-data code="serverType" v-model="form.channel" valueType="number" />
                    </el-form-item>
                </el-col> -->
        <el-col :lg="6" :md="6" :sm="12" :xs="24" v-show="searchExpand">
          <el-form-item label="用户类型">
            <dict-data code="statUserTypeOfBet" v-model="form.userType" valueType="number" @change="search" />
          </el-form-item>
        </el-col>
        <!-- <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="设备">
                        <dict-data code="DeviceType" v-model="form.clientType" valueType="number" />
                    </el-form-item>
                </el-col> -->
        <!-- <el-col :lg="6" :md="6" :sm="12" :xs="24" v-show="searchExpand">
                    <el-form-item label="代理">
                        <el-input-number v-model="form.agentId" :controls="false" style="width: 100%;" />
                    </el-form-item>
                </el-col> -->
        <el-col :lg="6" :md="6" :sm="12" :xs="24" v-show="searchExpand">
          <el-form-item label="游戏ID">
            <el-input-number v-model="form.gameId" :controls="false" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24" v-show="searchExpand">
          <el-form-item label="游戏厂商">
            <el-input-number v-model="form.factoryId" :controls="false" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24" v-show="searchExpand">
          <el-form-item label="公司">
            <!-- <el-select v-model="form.companyId" placeholder="请选择" style="width: 100%;" @change="search">
                            <el-option v-for="item in companyArr" :key="item.id" :label="item.name" :value="item.id" />
                        </el-select> -->
            <dict-data code="serverType" valueType="number" v-model="form.companyId" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24" v-show="searchExpand">
          <el-form-item label="游戏类型">
            <dict-data code="gameGroup" v-model="form.gameGroupId" valueType="number" @change="search" />
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
  import { useConfigStore } from '@/store/modules/config'; // 导入store
  import { ArrowUp, ArrowDown } from '@/components/icons';
  import dayjs from 'dayjs';
  import { BetParam } from '@/api/operateAnalysis/monitoringReport/model/bet';
  import { pageCompanys } from '@/api/platform/companyApi';
  const configStore = useConfigStore();
  const emit = defineEmits<{
    (e: 'search', where?: BetParam): void;
  }>();
  /** 表单数据 */
  const [form, resetFields] = useFormData<BetParam>({
    countryCode: configStore.countryArr?.[0]?.code || '',
    channel: undefined,
    clientType: undefined,
    agentId: undefined,
    startDate: undefined,
    endDate: undefined,
    gameGroupId: undefined,
    factoryId: undefined,
    companyId: undefined,
    userType: 10
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
  };
  // const companyArr = ref<any[]>([]);
  // const getCompany = () => {
  //     pageCompanys({ page: 1, limit: 1000 }).then((res) => {
  //         companyArr.value = res.list || []
  //     });
  // };
  // getCompany();
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
    searchParams,
    timeArr
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
