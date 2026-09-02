<template>
  <ele-card :body-style="{ padding: '20px' }">
    <el-form ref="formRef" :model="form" @submit.prevent="">
      <div class="title title1">近期数据概览:</div>
      <el-row :gutter="16" style="display: flex; justify-content: space-between; width: 100%; padding: 0 10px">
        <!-- <el-form-item label="国家" prop="countryCode">
          <el-select v-model="form.countryCode" placeholder="请选择" style="width: 200px;" @change="refreshData">
            <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item> -->
        <div style="display: flex; align-items: center">
          <el-form-item label="" prop="type" style="margin-right: 10px">
            <el-radio-group v-model="form.type" @change="refreshData">
              <el-radio-button :value="1" label="今日" />
              <el-radio-button :value="2" label="近7日" />
              <el-radio-button :value="3" label="近30日" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="" prop="type">
            <el-button type="success" @click="refesh">刷新</el-button>
          </el-form-item>
        </div>
      </el-row>
    </el-form>
    <div class="card-container">
      <div class="card" :style="{ width: mobile ? '100%' : '18%', marginBottom: mobile ? '16px' : '0px' }">
        <div class="content">
          <div class="title">新增代理</div>
          <div>{{ recentInfo.newAgentCount }}</div>
        </div>
        <div class="content">
          <div>总代理: {{ recentInfo.newSuperAgentCount }}</div>
          <div>普通代理: {{ recentInfo.newNormalAgentCount }}</div>
        </div>
      </div>

      <div class="card" :style="{ width: mobile ? '100%' : '18%', marginBottom: mobile ? '16px' : '0px' }">
        <div class="title">新增玩家</div>
        <div class="content">
          <div>{{ recentInfo.newAgentUserCount }}</div>
        </div>
      </div>
      <div class="card" :style="{ width: mobile ? '100%' : '18%', marginBottom: mobile ? '16px' : '0px' }">
        <div class="title">净充值额</div>
        <div class="content">
          <div>{{ recentInfo.netRechargeAmount }}</div>
        </div>
      </div>
      <div class="card" :style="{ width: mobile ? '100%' : '18%', marginBottom: mobile ? '16px' : '0px' }">
        <div class="title">游戏盈亏</div>
        <div class="content">
          <div>{{ recentInfo.gameProfitLoss }}</div>
        </div>
      </div>
      <div class="card" :style="{ width: mobile ? '100%' : '18%' }">
        <div class="content">
          <div class="title">返利金额</div>
          <div>{{ recentInfo.totalRebateAmount }}</div>
        </div>
        <div class="content">
          <div>总代理: {{ recentInfo.superAgentRebateAmount }}</div>
          <div>普通代理: {{ recentInfo.normalAgentRebateAmount }}</div>
        </div>
      </div>
    </div>
    <div class="title">累计数据概览:</div>
    <!-- 游戏数据 -->
    <div class="card-container">
      <div class="card" :style="{ width: mobile ? '100%' : '18%', marginBottom: mobile ? '16px' : '0px' }">
        <div class="content">
          <div class="title">累计代理数</div>
          <div>{{ cumulativeInfo.totalAgentCount }}</div>
        </div>
        <div class="content">
          <div>总代理: {{ cumulativeInfo.totalSuperAgentCount }}</div>
          <div>普通代理: {{ cumulativeInfo.totalNormalAgentCount }}</div>
        </div>
      </div>

      <div class="card" :style="{ width: mobile ? '100%' : '18%', marginBottom: mobile ? '16px' : '0px' }">
        <div class="title">累计玩家数</div>
        <div class="content">
          <div>{{ cumulativeInfo.totalUserCount }}</div>
        </div>
      </div>
      <div class="card" :style="{ width: mobile ? '100%' : '18%', marginBottom: mobile ? '16px' : '0px' }">
        <div class="content">
          <div class="title">累计返利</div>
          <div>{{ cumulativeInfo.totalRebateAmount }}</div>
        </div>
        <div class="content">
          <div>总代理: {{ cumulativeInfo.totalSuperAgentRebate }}</div>
          <div>普通代理: {{ cumulativeInfo.totalNormalAgentRebate }}</div>
        </div>
      </div>
      <div class="card" :style="{ width: mobile ? '100%' : '18%', marginBottom: mobile ? '16px' : '0px' }">
        <div class="title">累计净充值额</div>
        <div class="content">
          <div>{{ cumulativeInfo.totalNetRechargeAmount }}</div>
        </div>
      </div>
      <div class="card" :style="{ width: mobile ? '100%' : '18%' }">
        <div class="title">ROAS</div>
        <div class="content">
          <div>{{ cumulativeInfo.roas }}</div>
        </div>
      </div>
    </div>
    <el-row :gutter="16">
      <el-col :sm="24" :md="12">
        <div class="title">总代理-累计返利TOP10:</div>
        <GenerateAgent ref="generateAgentRef" :searchForm="form" />
      </el-col>
      <el-col :sm="24" :md="12">
        <div class="title">普通代理-累计返利TOP10:</div>
        <NormalAgent ref="normalAgentRef" :searchForm="form" />
      </el-col>
    </el-row>
    <div class="title">利润模式分布:</div>
    <ProfitModeDistribution ref="profitModeDistributionRef" :searchForm="form" />
  </ele-card>
</template>

<script setup lang="ts">
  import { onMounted, ref, nextTick } from 'vue';
  import GenerateAgent from './components/generate-agent.vue';
  import NormalAgent from './components/normal-agent.vue';
  import ProfitModeDistribution from './components/profit-mode-distribution.vue';
  const generateAgentRef = ref<InstanceType<typeof GenerateAgent> | null>(null);
  const normalAgentRef = ref<InstanceType<typeof NormalAgent> | null>(null);
  const profitModeDistributionRef = ref<InstanceType<typeof ProfitModeDistribution> | null>(null);
  // import WorkplaceEcarts from "./components/workplace-line-ecarts.vue";
  import { useMobile } from '@/utils/use-mobile';
  import { getRecentInfo, getCumulativeInfo } from '@/api/agent/agentOverviewApi';
  import type { RecentInfo, CumulativeInfo, AgentOverviewParam } from '@/api/agent/model/agentOverview';
  import { useConfigStore } from '@/store/modules/config'; // 导入store
  import { EleMessage } from 'ele-admin-plus';
  // 初始化store
  const configStore = useConfigStore();
  const { mobile } = useMobile();
  const form = ref({
    countryCode: 254,
    type: 1
  });
  onMounted(() => {
    getData(form.value);
    getCumulativeData(form.value);
  });
  const recentInfo = ref<RecentInfo>({} as RecentInfo);
  const cumulativeInfo = ref<CumulativeInfo>({} as CumulativeInfo);
  //  近期数据概览
  const getData = async (form: AgentOverviewParam) => {
    try {
      let res = await getRecentInfo({ ...form });
      recentInfo.value = res || {};
    } catch (error) {
      console.log(error);
    }
  };
  // 累计数据概览
  const getCumulativeData = async (form: AgentOverviewParam) => {
    try {
      let res = await getCumulativeInfo({ ...form });
      cumulativeInfo.value = res || {};
    } catch (error) {
      console.log(error);
    }
  };
  // 只刷新上方【近期数据概览】
  const refreshData = async () => {
    const loading = EleMessage.loading({
      message: '请求中..',
      plain: true
    });
    await getData(form.value);
    await getCumulativeData(form.value);
    loading.close();
  };
  // 刷新按钮【所有数据概览】：额外手动触发子组件（form 无变化时 watch 不会触发）
  const refesh = async () => {
    const loading = EleMessage.loading({
      message: '请求中..',
      plain: true
    });
    await getData(form.value);
    await getCumulativeData(form.value);
    await nextTick();
    generateAgentRef.value?.reload();
    normalAgentRef.value?.reload();
    profitModeDistributionRef.value?.reload();
    loading.close();
  };
</script>

<style lang="scss" scoped>
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .card {
      //   height: 120px;
      background: #fff;
      box-sizing: border-box;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .content {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      &:last-child {
        margin-bottom: 0;
      }
      .title {
        font-size: 16px;
        font-weight: bold;
        margin-top: 0cqw;
      }
    }
  }
  .title,
  .title1 {
    font-size: 20px;
    font-weight: bold;
    margin: 25px 0 10px;
  }

  .title1 {
    margin: 0;
  }

  :deep(.el-descriptions .el-descriptions__table.is-bordered tr > .el-descriptions__cell) {
    width: 10%;
    // text-align: center;
  }
</style>
