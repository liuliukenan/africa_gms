<template>
  <ele-card :body-style="{ padding: '20px' }">
    <el-form ref="formRef" :model="form" @submit.prevent="">
      <el-row :gutter="16" style="display: flex;justify-content: space-between;width: 100%;padding: 0 10px;">
        <el-form-item :label="t('dashboard.workplace.country')" prop="countryCode">
          <el-select v-model="form.countryCode" :placeholder="t('common.placeholder.select')" style="width: 200px;" @change="refreshData">
            <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <div style="display: flex;align-items: center;">
          <el-form-item label="" prop="type" style="margin-right: 10px;">
            <el-radio-group v-model="form.type" @change="refreshData">
              <el-radio-button :value="0">{{ t('dashboard.workplace.yesterday') }}</el-radio-button>
              <el-radio-button :value="1">{{ t('dashboard.workplace.today') }}</el-radio-button>
              <el-radio-button :value="2">{{ t('dashboard.workplace.last7Days') }}</el-radio-button>
              <el-radio-button :value="3">{{ t('dashboard.workplace.last30Days') }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="" prop="type">
            <el-button type="success" @click="refesh">{{ t('dashboard.workplace.refresh') }}</el-button>
          </el-form-item>
        </div>
      </el-row>
    </el-form>
    <BaseDataContent :fund-data="fundData" :recharge-withdraw-data="rechargeWithdrawData" :bonus-data="bonusData" :fund-risk-data="fundRiskData" :user-conversion-data="userConversionData" />
    <!-- <el-descriptions :title="t('dashboard.workplace.gmv')" border :column="mobile ? 1 : 5">
      <template #title>
        <div class="title title1">{{ t('dashboard.workplace.gmv') }}:</div>
      </template>
      <template #extra>

      </template>
      <el-descriptions-item>
        <template #label>
          <component :is="withTooltipLabel(t('dashboard.workplace.gmvFields.rechargeAmount'), t('dashboard.workplace.gmvTooltips.rechargeAmount'))" />
        </template>
        {{ baseData.totalRechargeAmount }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <component :is="withTooltipLabel(t('dashboard.workplace.gmvFields.rechargeUserCount'), t('dashboard.workplace.gmvTooltips.rechargeUserCount'))" />
        </template>
        {{ baseData.rechargeUserCount }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <component :is="withTooltipLabel(t('dashboard.workplace.gmvFields.rechargeRate'), t('dashboard.workplace.gmvTooltips.rechargeRate'))" />
        </template>
        {{ baseData.rechargeRate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <component :is="withTooltipLabel(t('dashboard.workplace.gmvFields.avgRechargeAmount'), t('dashboard.workplace.gmvTooltips.avgRechargeAmount'))" />
        </template>
        {{ baseData.avgRechargeAmount }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <component :is="withTooltipLabel(t('dashboard.workplace.gmvFields.netRechargeAmount'), t('dashboard.workplace.gmvTooltips.netRechargeAmount'))" />
        </template>
        {{ baseData.netRechargeAmount }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <component :is="withTooltipLabel(t('dashboard.workplace.gmvFields.withdrawAmount'), t('dashboard.workplace.gmvTooltips.withdrawAmount'))" />
        </template>
        {{ baseData.totalWithdrawAmount }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <component :is="withTooltipLabel(t('dashboard.workplace.gmvFields.withdrawUserCount'), t('dashboard.workplace.gmvTooltips.withdrawUserCount'))" />
        </template>
        {{ baseData.withdrawUserCount }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <component :is="withTooltipLabel(t('dashboard.workplace.gmvFields.withdrawRate'), t('dashboard.workplace.gmvTooltips.withdrawRate'))" />
        </template>
        {{ baseData.withdrawRate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <component :is="withTooltipLabel(t('dashboard.workplace.gmvFields.avgWithdrawAmount'), t('dashboard.workplace.gmvTooltips.avgWithdrawAmount'))" />
        </template>
        {{ baseData.avgWithdrawAmount }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <component :is="withTooltipLabel(t('dashboard.workplace.gmvFields.ggr'), t('dashboard.workplace.gmvTooltips.ggr'))" />
        </template>
        {{ baseData.ggr }}
      </el-descriptions-item>
    </el-descriptions> -->
    <!-- <div class="title">{{ t('dashboard.workplace.userData') }}:</div>
    <el-descriptions border :column="mobile ? 1 : 5">
      <el-descriptions-item>
        <template #label>
          <component :is="withTooltipLabel(t('dashboard.workplace.userDataFields.newUserCount'), t('dashboard.workplace.userDataTooltips.newUserCount'))" />
        </template>
        {{ baseData.newUserCount }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <component :is="withTooltipLabel(t('dashboard.workplace.userDataFields.activeUserCount'), t('dashboard.workplace.userDataTooltips.activeUserCount'))" />
        </template>
        {{ baseData.activeUserCount }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <component :is="withTooltipLabel(t('dashboard.workplace.userDataFields.validActiveUserCount'), t('dashboard.workplace.userDataTooltips.validActiveUserCount'))" />
        </template>
        {{ baseData.validActiveUserCount }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <component :is="withTooltipLabel(t('dashboard.workplace.userDataFields.loseUserCount'), t('dashboard.workplace.userDataTooltips.loseUserCount'))" />
        </template>
        {{ baseData.loseUserCount }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <component :is="withTooltipLabel(t('dashboard.workplace.userDataFields.returnUserCount'), t('dashboard.workplace.userDataTooltips.returnUserCount'))" />
        </template>
        {{ baseData.returnUserCount }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <component :is="withTooltipLabel(t('dashboard.workplace.userDataFields.d1Retention'), t('dashboard.workplace.userDataTooltips.d1Retention'))" />
        </template>
        {{ retentionData.d1RetentionRate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <component :is="withTooltipLabel(t('dashboard.workplace.userDataFields.d3Retention'), t('dashboard.workplace.userDataTooltips.d3Retention'))" />
        </template>
        {{ retentionData.d3RetentionRate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <component :is="withTooltipLabel(t('dashboard.workplace.userDataFields.d5Retention'), t('dashboard.workplace.userDataTooltips.d5Retention'))" />
        </template>
        {{ retentionData.d5RetentionRate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <component :is="withTooltipLabel(t('dashboard.workplace.userDataFields.d7Retention'), t('dashboard.workplace.userDataTooltips.d7Retention'))" />
        </template>
        {{ retentionData.d7RetentionRate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <component :is="withTooltipLabel(t('dashboard.workplace.userDataFields.d14Retention'), t('dashboard.workplace.userDataTooltips.d14Retention'))" />
        </template>
        {{ retentionData.d14RetentionRate }}
      </el-descriptions-item>
    </el-descriptions> -->
    <!-- <div class="title">异常监控:</div>
    <el-descriptions border :column="mobile ? 1 : 3">
      <el-descriptions-item label="异常提款:">kooriookami</el-descriptions-item>
      <el-descriptions-item label="可疑账号:">18100000000</el-descriptions-item>
      <el-descriptions-item label="可疑游戏:">18100000000</el-descriptions-item>
    </el-descriptions> -->
    <!-- 游戏数据 -->
    <div class="title">{{ t('dashboard.workplace.gameData') }}:</div>
    <GameDataTable ref="gameDataTableRef" :searchForm="form" @reload="reload" />
    <!-- <div class="title">在线人数:</div>
    <WorkplaceEcarts :data="[]" /> -->
  </ele-card>

</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import { useI18n } from 'vue-i18n';
import BaseDataContent from "./components/baseData.vue";
// import { getBoardCount } from "@/api/dashboard/workplace";
import GameDataTable from "./components/gameDataTable/index.vue";
const gameDataTableRef = ref<InstanceType<typeof GameDataTable> | null>(null);
// import WorkplaceEcarts from "./components/workplace-line-ecarts.vue";
import { useMobile } from '@/utils/use-mobile';
import { getBaseDataApi, retentionDataApi, getFundDataApi, getRechargeWithdrawDataApi, getBonusDataApi, getFundRiskDataApi, getUserConversionDataApi } from "@/api/dashboard/workplace";
import type { BaseData, RetentionData, DashboardFundVO, DashboardRechargeWithdrawVO, DashboardBonusVO, DashboardFundRiskVO, DashboardUserConversionVO } from "@/api/dashboard/model/workplace";
import { useConfigStore } from "@/store/modules/config"; // 导入store
import { EleMessage } from "ele-admin-plus";
import { withTooltipLabel } from '@/utils/table';
const { t } = useI18n();
// 初始化store
const configStore = useConfigStore();
const { mobile } = useMobile();
const getCurDate = ref("");
const getCurrentTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const weekDays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  const weekDay = weekDays[now.getDay()];

  return `${year}年${month}月${day}日 ${weekDay}`;
};
const form = ref({
  type: 1,
  countryCode: 254
});
getCurDate.value = getCurrentTime();
onMounted(() => {
  // getData(form.value);
  // getRetentionData(form.value);
  getFundData(form.value);
  getRechargeWithdrawData(form.value);
  getBonusData(form.value);
  getFundRiskData(form.value);
  getUserConversionData(form.value);
});
const baseData = ref<BaseData>({});
const retentionData = ref<RetentionData>({});
const fundData = ref<DashboardFundVO>({});
const rechargeWithdrawData = ref<DashboardRechargeWithdrawVO>({});
const bonusData = ref<DashboardBonusVO>({});
const fundRiskData = ref<DashboardFundRiskVO>({});
const userConversionData = ref<DashboardUserConversionVO>({});
const getData = async (form: any) => {
  try {
    let res = await getBaseDataApi({ ...form });
    baseData.value = res || {};
  } catch (error) {
    console.log(error);
  }
}
const getRetentionData = async (form: any) => {
  try {
    let res = await retentionDataApi({ ...form });
    retentionData.value = res || {};
  } catch (error) {
    console.log(error);
  }
}
const getFundData = async (form: any) => {
  try {
    let res = await getFundDataApi({ ...form });
    fundData.value = res || {};
  } catch (error) {
    console.log(error);
  }
}
const getRechargeWithdrawData = async (form: any) => {
  try {
    let res = await getRechargeWithdrawDataApi({ ...form });
    rechargeWithdrawData.value = res || {};
  } catch (error) {
    console.log(error);
  }
}
const getBonusData = async (form: any) => {
  try {
    let res = await getBonusDataApi({ ...form });
    bonusData.value = res || {};
  } catch (error) {
    console.log(error);
  }
}
const getFundRiskData = async (form: any) => {
  try {
    let res = await getFundRiskDataApi({ ...form });
    fundRiskData.value = res || {};
  } catch (error) {
    console.log(error);
  }
}
const getUserConversionData = async (form: any) => {
  try {
    let res = await getUserConversionDataApi({ ...form });
    userConversionData.value = res || {};
  } catch (error) {
    console.log(error);
  }
}
// 只刷新上方统计数据（子组件 watch 会自动处理 gameDataApi）
const refreshData = async () => {
  const loading = EleMessage.loading({
    message: t('common.loading'),
    plain: true
  });
  // await getData(form.value);
  // await getRetentionData(form.value);
  await getFundData(form.value);
  await getRechargeWithdrawData(form.value);
  await getBonusData(form.value);
  await getFundRiskData(form.value);
  await getUserConversionData(form.value);
  loading.close();
};
// 刷新按钮：额外手动触发子组件（form 无变化时 watch 不会触发）
const refesh = async() => {
  const loading = EleMessage.loading({
    message: t('common.loading'),
    plain: true
  });
  // await getData(form.value);
  // await getRetentionData(form.value);
  await getFundData(form.value);
  await getRechargeWithdrawData(form.value);
  await getBonusData(form.value);
  await getFundRiskData(form.value);
  await getUserConversionData(form.value);
  await nextTick();
  gameDataTableRef.value?.reload();
  loading.close();
};
const reload = () => {
  // getData(form.value);
  // getRetentionData(form.value);
};

</script>

<style lang="scss" scoped>
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
