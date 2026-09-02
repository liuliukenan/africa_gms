<template>
  <div class="base-data">
    <!-- 一、资金真实性 -->
    <div class="section">
      <div class="section-header">
        <span class="section-title">{{ t('dashboard.workplace.baseData.sections.fundReality') }}</span>
        <!-- <span class="section-subtitle">{{ t('dashboard.workplace.baseData.sections.fundRealityDesc') }}</span> -->
      </div>
      <el-row :gutter="16" class="card-row">
        <el-col v-for="item in fundItems" :key="item.field" :xl="3" :lg="3" :md="12" :sm="24" class="card-col" style="display: flex;">
          <div class="data-card card-cols" >
            <div class="card-title-row card-title-clo">
              <span class="card-label">{{ item.label }}</span>
              <el-tooltip :content="item.tooltip" placement="top">
                <el-icon class="card-question"><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="card-value" :class="valueClass(fundData[item.field])">
              {{ formatValue(fundData[item.field]) }}<span v-if="item.unit" class="card-value-unit">{{ item.unit }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 二、充值结构 -->
    <div class="section section-recharge">
      <div class="section-header">
        <span class="section-title">{{ t('dashboard.workplace.baseData.sections.rechargeStructure') }}</span>
        <!-- <span class="section-subtitle">{{ t('dashboard.workplace.baseData.sections.rechargeStructureDesc') }}</span> -->
      </div>
      <el-row :gutter="16" class="card-row">
        <el-col v-for="item in rechargeItems" :key="item.field" :xl="item.field === 'withdrawUserFundSource' ? 8 : 4" :lg="item.field === 'withdrawUserFundSource' ? 8 : 4" :md="item.field === 'withdrawUserFundSource' ? 8 : 4" :sm="24" class="card-col">
          <!-- 提现玩家资金来源 是特殊复合卡片 -->
          <template v-if="item.field === 'withdrawUserFundSource'">
            <div class="data-card data-card-complex">
              <div class="card-title-row">
                <span class="card-label">{{ t('dashboard.workplace.baseData.rechargeCards.withdrawUserFundSource.label') }}</span>
                <el-tooltip :content="t('dashboard.workplace.baseData.rechargeCards.withdrawUserFundSource.tooltip')" placement="top">
                  <el-icon class="card-question"><QuestionFilled /></el-icon>
                </el-tooltip>
              </div>
              <div class="fund-source-grid">
                <div class="fund-source-col">
                  <div class="fund-source-col-label">{{ t('dashboard.workplace.baseData.rechargeCards.fundSourceRecharge') }}</div>
                  <div class="fund-source-col-line" :class="valueClass(rechargeWithdrawData?.withdrawUserRechargeAmount)">{{ formatValue(rechargeWithdrawData?.withdrawUserRechargeAmount) }}</div>
                  <div class="fund-source-col-value" :class="valueClass(rechargeWithdrawData?.withdrawUserRechargeRate)">{{ formatValue(rechargeWithdrawData?.withdrawUserRechargeRate) }}</div>
                </div>
                <div class="fund-source-col">
                  <div class="fund-source-col-label">{{ t('dashboard.workplace.baseData.rechargeCards.fundSourceCashReward') }}</div>
                  <div class="fund-source-col-line" :class="valueClass(rechargeWithdrawData?.withdrawUserCashRewardAmount)">{{ formatValue(rechargeWithdrawData?.withdrawUserCashRewardAmount) }}</div>
                  <div class="fund-source-col-value" :class="valueClass(rechargeWithdrawData?.withdrawUserCashRewardRate)">{{ formatValue(rechargeWithdrawData?.withdrawUserCashRewardRate) }}</div>
                </div>
                <div class="fund-source-col">
                  <div class="fund-source-col-label">{{ t('dashboard.workplace.baseData.rechargeCards.fundSourceBonus') }}</div>
                  <div class="fund-source-col-line" :class="valueClass(rechargeWithdrawData?.withdrawUserBonusToCashAmount)">{{ formatValue(rechargeWithdrawData?.withdrawUserBonusToCashAmount) }}</div>
                  <div class="fund-source-col-value" :class="valueClass(rechargeWithdrawData?.withdrawUserBonusToCashRate)">
                    {{ formatValue(rechargeWithdrawData?.withdrawUserBonusToCashRate) }}
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="data-card data-card-recharge">
              <div class="card-title-row">
                <span class="card-label">{{ item.label }}</span>
                <el-tooltip :content="item.tooltip" placement="top">
                  <el-icon class="card-question"><QuestionFilled /></el-icon>
                </el-tooltip>
              </div>
              <div class="card-value card-value-recharge" :class="valueClass(rechargeWithdrawData[item.field])">
                {{ formatValue(rechargeWithdrawData[item.field]) }}<span v-if="item.unit" class="card-value-unit">{{ item.unit }}</span>
              </div>
            </div>
          </template>
        </el-col>
      </el-row>
    </div>

    <!-- 三、Bonus健康 -->
    <div class="section">
      <div class="section-header">
        <span class="section-title">{{ t('dashboard.workplace.baseData.sections.bonusHealth') }}</span>
        <!-- <span class="section-subtitle">{{ t('dashboard.workplace.baseData.sections.bonusHealthDesc') }}</span> -->
      </div>
      <el-row :gutter="16" class="card-row">
        <el-col v-for="item in bonusItems" :key="item.field" :xl="6" :lg="8" :md="12" :sm="24" class="card-col">
          <div class="data-card" >
            <div class="card-title-row">
              <span class="card-label">{{ item.label }}</span>
              <el-tooltip :content="item.tooltip" placement="top">
                <el-icon class="card-question"><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="card-value" :class="valueClass(bonusData[item.field])">
              {{ formatValue(bonusData[item.field]) }}<span v-if="item.unit" class="card-value-unit">{{ item.unit }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 四、资金安全异常 -->
    <div class="section">
      <div class="section-header">
        <span class="section-title">{{ t('dashboard.workplace.baseData.sections.fundRisk') }}</span>
        <!-- <span class="section-subtitle">{{ t('dashboard.workplace.baseData.sections.fundRiskDesc') }}</span> -->
      </div>
      <el-row :gutter="16" class="card-row">
        <el-col v-for="item in safeAnomalyItems" :key="item.field" :xl="12" :lg="12" :md="24" :sm="24" class="card-col">
          <div class="data-card data-card-wide">
            <div class="card-title-row">
              <span class="card-label">{{ item.label }}</span>
              <el-tooltip :content="item.tooltip" placement="top">
                <el-icon class="card-question"><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="card-value" :class="valueClass(fundRiskData[item.field])"> {{ formatValue(fundRiskData[item.field]) }}<span class="card-value-unit">{{ t('dashboard.workplace.baseData.sections.userCountUnit') }}</span> </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 五、用户转化 -->
    <div class="section">
      <div class="section-header">
        <span class="section-title">{{ t('dashboard.workplace.baseData.sections.userConversion') }}</span>
        <!-- <span class="section-subtitle">{{ t('dashboard.workplace.baseData.sections.userConversionDesc') }}</span> -->
      </div>
      <el-row :gutter="16" class="card-row">
        <el-col v-for="item in userConversionItems" :key="item.field" :xl="4" :lg="6" :md="12" :sm="12" class="card-col">
          <div class="data-card">
            <div class="card-title-row">
              <span class="card-label">{{ item.label }}</span>
              <el-tooltip :content="item.tooltip" placement="top">
                <el-icon class="card-question"><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="card-value" :class="valueClass(userConversionData[item.field])">
              {{ formatValue(userConversionData[item.field]) }}<span v-if="item.unit" class="card-value-unit">{{ item.unit }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { QuestionFilled } from '@element-plus/icons-vue';
  import type { DashboardFundVO, DashboardRechargeWithdrawVO, DashboardBonusVO, DashboardFundRiskVO, DashboardUserConversionVO } from '@/api/dashboard/model/workplace';

  const { t } = useI18n();

  const props = withDefaults(
    defineProps<{
      fundData?: DashboardFundVO;
      rechargeWithdrawData?: DashboardRechargeWithdrawVO;
      bonusData?: DashboardBonusVO;
      fundRiskData?: DashboardFundRiskVO;
      userConversionData?: DashboardUserConversionVO;
    }>(),
    {
      fundData: () => ({}),
      rechargeWithdrawData: () => ({}),
      bonusData: () => ({}),
      fundRiskData: () => ({}),
      userConversionData: () => ({})
    }
  );

  const bd = () => 'dashboard.workplace.baseData';

  /** 资金真实性卡片配置 */
  const fundItems = computed(() => [
    { field: 'totalGgr', label: t(`${bd()}.fundRealityCards.totalGgr.label`), tooltip: t(`${bd()}.fundRealityCards.totalGgr.tooltip`), unit: 'KES' },
    { field: 'cashGgr', label: t(`${bd()}.fundRealityCards.cashGgr.label`), tooltip: t(`${bd()}.fundRealityCards.cashGgr.tooltip`), unit: 'KES', core: true },
    { field: 'bonusGgr', label: t(`${bd()}.fundRealityCards.bonusGgr.label`), tooltip: t(`${bd()}.fundRealityCards.bonusGgr.tooltip`), unit: 'KES' },
    { field: 'cashGgrRate', label: t(`${bd()}.fundRealityCards.cashGgrRate.label`), tooltip: t(`${bd()}.fundRealityCards.cashGgrRate.tooltip`), unit: '', core: true },
    { field: 'cashNgr', label: t(`${bd()}.fundRealityCards.cashNgr.label`), tooltip: t(`${bd()}.fundRealityCards.cashNgr.tooltip`), unit: 'KES', core: true },
    { field: 'realProfit', label: t(`${bd()}.fundRealityCards.realProfit.label`), tooltip: t(`${bd()}.fundRealityCards.realProfit.tooltip`), unit: 'KES', core: true },
    { field: 'platformNetCashFlow', label: t(`${bd()}.fundRealityCards.platformNetCashFlow.label`), tooltip: t(`${bd()}.fundRealityCards.platformNetCashFlow.tooltip`), unit: 'KES' },
    { field: 'cashRetentionRate', label: t(`${bd()}.fundRealityCards.cashRetentionRate.label`), tooltip: t(`${bd()}.fundRealityCards.cashRetentionRate.tooltip`), unit: '', core: true }
  ]);

  /** 充值结构卡片配置 */
  const rechargeItems = computed(() => [
    { field: 'actualRechargeAmount', label: t(`${bd()}.rechargeCards.actualRechargeAmount.label`), tooltip: t(`${bd()}.rechargeCards.actualRechargeAmount.tooltip`), unit: 'KES' },
    { field: 'withdrawAmount', label: t(`${bd()}.rechargeCards.withdrawAmount.label`), tooltip: t(`${bd()}.rechargeCards.withdrawAmount.tooltip`), unit: 'KES' },
    { field: 'netRechargeAmount', label: t(`${bd()}.rechargeCards.netRechargeAmount.label`), tooltip: t(`${bd()}.rechargeCards.netRechargeAmount.tooltip`), unit: 'KES' },
    { field: 'withdrawRechargeRate', label: t(`${bd()}.rechargeCards.withdrawRechargeRate.label`), tooltip: t(`${bd()}.rechargeCards.withdrawRechargeRate.tooltip`), unit: '' },
    { field: 'withdrawUserFundSource', label: t(`${bd()}.rechargeCards.withdrawUserFundSource.label`), tooltip: t(`${bd()}.rechargeCards.withdrawUserFundSource.tooltip`), unit: '%' }
  ]);

  /** Bonus健康卡片配置 */
  const bonusItems = computed(() => [
    { field: 'bonusAmount', label: t(`${bd()}.bonusCards.bonusAmount.label`), tooltip: t(`${bd()}.bonusCards.bonusAmount.tooltip`), unit: 'KES' },
    { field: 'bonusToCashAmount', label: t(`${bd()}.bonusCards.bonusToCashAmount.label`), tooltip: t(`${bd()}.bonusCards.bonusToCashAmount.tooltip`), unit: 'KES', core: true },
    { field: 'redemptionRate', label: t(`${bd()}.bonusCards.redemptionRate.label`), tooltip: t(`${bd()}.bonusCards.redemptionRate.tooltip`), unit: '' },
    { field: 'bonusRechargeRate', label: t(`${bd()}.bonusCards.bonusRechargeRate.label`), tooltip: t(`${bd()}.bonusCards.bonusRechargeRate.tooltip`), unit: '' }
  ]);

  /** 资金安全异常卡片配置 */
  const safeAnomalyItems = computed(() => [
    { field: 'withdrawGreaterRechargeUserCount', label: t(`${bd()}.fundRiskCards.withdrawGreaterRechargeUserCount.label`), tooltip: t(`${bd()}.fundRiskCards.withdrawGreaterRechargeUserCount.tooltip`), unit: '' },
    { field: 'zeroRechargeWithdrawUserCount', label: t(`${bd()}.fundRiskCards.zeroRechargeWithdrawUserCount.label`), tooltip: t(`${bd()}.fundRiskCards.zeroRechargeWithdrawUserCount.tooltip`), unit: '' }
  ]);

  /** 用户转化卡片配置 */
  const userConversionItems = computed(() => [
    { field: 'newUserCount', label: t(`${bd()}.userConversionCards.newUserCount.label`), tooltip: t(`${bd()}.userConversionCards.newUserCount.tooltip`), unit: '' },
    { field: 'validNewUserCount', label: t(`${bd()}.userConversionCards.validNewUserCount.label`), tooltip: t(`${bd()}.userConversionCards.validNewUserCount.tooltip`), unit: '' },
    { field: 'newRechargeUserCount', label: t(`${bd()}.userConversionCards.newRechargeUserCount.label`), tooltip: t(`${bd()}.userConversionCards.newRechargeUserCount.tooltip`), unit: '' },
    { field: 'paymentConversionRate', label: t(`${bd()}.userConversionCards.paymentConversionRate.label`), tooltip: t(`${bd()}.userConversionCards.paymentConversionRate.tooltip`), unit: '' },
    { field: 'newRepeatRechargeRate', label: t(`${bd()}.userConversionCards.newRepeatRechargeRate.label`), tooltip: t(`${bd()}.userConversionCards.newRepeatRechargeRate.tooltip`), unit: '' },
    { field: 'newAverageRechargeAmount', label: t(`${bd()}.userConversionCards.newAverageRechargeAmount.label`), tooltip: t(`${bd()}.userConversionCards.newAverageRechargeAmount.tooltip`), unit: 'KES' },
    { field: 'activeUserCount', label: t(`${bd()}.userConversionCards.activeUserCount.label`), tooltip: t(`${bd()}.userConversionCards.activeUserCount.tooltip`), unit: '' },
    { field: 'activeRechargeUserCount', label: t(`${bd()}.userConversionCards.activeRechargeUserCount.label`), tooltip: t(`${bd()}.userConversionCards.activeRechargeUserCount.tooltip`), unit: '' },
    { field: 'activeWithdrawUserCount', label: t(`${bd()}.userConversionCards.activeWithdrawUserCount.label`), tooltip: t(`${bd()}.userConversionCards.activeWithdrawUserCount.tooltip`), unit: '' },
    { field: 'activeRepeatRechargeRate', label: t(`${bd()}.userConversionCards.activeRepeatRechargeRate.label`), tooltip: t(`${bd()}.userConversionCards.activeRepeatRechargeRate.tooltip`), unit: '' },
    { field: 'averageRechargeAmount', label: t(`${bd()}.userConversionCards.averageRechargeAmount.label`), tooltip: t(`${bd()}.userConversionCards.averageRechargeAmount.tooltip`), unit: 'KES' },
    { field: 'averageWithdrawAmount', label: t(`${bd()}.userConversionCards.averageWithdrawAmount.label`), tooltip: t(`${bd()}.userConversionCards.averageWithdrawAmount.tooltip`), unit: 'KES' }
  ]);

  /** 数值格式化，仅返回数字部分，单位由模板中的 card-value-unit span 单独渲染 */
  const formatValue = (val: any): string => {
    if (val === null || val === undefined) return '0';
    const str = String(val);
    // 已是百分比字符串，直接返回
    if (str.includes('%')) return str;
    const num = Number(val);
    if (isNaN(num)) return str;
    return num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  };

  /** 根据数值正负返回颜色class，自带%的字符串会先剥离 */
  const valueClass = (val: any): string => {
    if (val === null || val === undefined) return 'value-empty';
    const str = String(val);
    const num = Number(str.includes('%') ? str.replace('%', '') : val);
    if (isNaN(num)) return '';
    if (num < 0) return 'red';
    if (num > 0) return 'green';
    return '';
  };
</script>

<script lang="ts">
  export default { name: 'BaseData' };
</script>

<style lang="scss" scoped>
  .base-data {
    padding: 0 10px;
  }
  .core {
    background: #f4f7f3 !important;
    border: 1px solid #0e7a6b !important;
    box-shadow: 1px 1px 1px 1px #f4f7f3;
    .card-value {
      color: #0e7a6b;
      text-align: right;
    }
  }
  .section {
    margin-bottom: 24px;
  }

  .section-header {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 6px;

    .section-title {
      font-size: 16px;
      font-weight: 700;
      color: #303133;
    }

    .section-subtitle {
      margin-left: 12px;
      font-size: 13px;
      color: #909399;
    }

    .section-question {
      cursor: pointer;
      color: #909399;
      font-size: 16px;
    }
  }

  .card-row {
    .card-col {
      margin-bottom: 12px;
      // display: flex;
    }
  }

  .data-card {
    padding: 16px 20px;
    background: #f7f7f7;
    // border: 1px solid #67c23a;
    border: 1px solid #e8e8e8;
    // box-shadow: 1px 1px 1px 1px #d3d3d3;
    border-radius: 6px;
    min-height: 40px;
    display: flex;
    // flex-direction: column;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s ease;
    // cursor: pointer;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      //   border-color: #67c23a;
    }
  }

  .data-card-complex {
    flex-direction: column;
    // align-items: flex-start;
    justify-content: center;
    gap: 2px;
  }

  .section-recharge {
    .card-col {
      display: flex;
    }
    .data-card {
      min-height: 90px;
      height: 90px;
      width: 100%;
      padding: 12px 16px;
    }
    .data-card-recharge,
    .data-card-complex {
      flex-direction: column;
      // align-items: flex-start;
      justify-content: center;
      gap: 4px;
    }
    .data-card-complex {
      gap: 2px;
    }
    .card-value-recharge {
      text-align: left;
    }
    .fund-source-grid {
      margin-top: 4px;
    }
    .fund-source-col {
      gap: 4px;
    }
    .fund-source-col-label {
      font-size: 12px;
      font-weight: bold;
    }
    .fund-source-col-line {
      font-size: 12px;
    }
    .fund-source-col-value {
      font-size: 14px;
    }
  }

  .fund-source-grid {
    display: flex;
    width: 100%;
    margin-top: 8px;
  }

  .fund-source-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    &:not(:last-child) {
      border-right: 1px solid #e8e8e8;
    }
  }

  .fund-source-col-label {
    font-size: 13px;
    color: #909399;
  }

  .fund-source-col-value {
    font-size: 16px;
    font-weight: 600;
    color: #303133;
  }

  .data-card-wide {
    // min-height: 100px;
    min-height: 40px;
  }

  .data-card-sm {
    // min-height: 70px;
    min-height: 40px;
    padding: 12px 16px;

    .card-value {
      font-size: 20px;
      font-weight: bold;
      text-align: right;
    }
  }

  .card-title-row {
    // display: flex;
    // align-items: center;
    // gap: 2px;
    font-weight: bold;
    // margin-bottom: 8px;

    .card-label {
      font-size: 14px;
      color: #606266;
    }

    .card-question {
      cursor: pointer;
      color: #909399;
      font-size: 15px;
      margin-left: 2px;
      vertical-align: -3px;
    }
  }
.card-cols{
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2px;
  width: 100%;
}
  .card-value {
    font-size: 22px;
    font-weight: 600;
    color: #303133;
    line-height: 1.3;
    text-align: center !important;
    word-break: break-all;
  }

  .card-value-unit {
    font-size: 13px;
    font-weight: 600;
    margin-left: 2px;
  }

  .red {
    color: #d02b3f;
    font-weight: 600;
  }
  .green {
    // color: #0e7a6b;
    color: #058800;
    font-weight: 600;
  }

  .value-empty {
    color: #000000;
  }

  /* 提现玩家资金来源 */
  .fund-source-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 4px;
  }

  .fund-source-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .fund-source-label {
      font-size: 14px;
      color: #909399;
    }

    .fund-source-value {
      font-size: 18px;
      font-weight: 600;
      color: #303133;
    }

    .fund-source-unit {
      font-size: 12px;
      font-weight: 500;
      margin-left: 2px;
    }
  }
</style>
