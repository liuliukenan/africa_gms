<template>
  <table class="fund-table">
    <thead>
      <tr>
        <th>{{ t('user.userList.fundTraceability.clo1') }}</th>
        <th>{{ t('user.userList.fundTraceability.clo2') }}</th>
        <th>{{ t('user.userList.fundTraceability.clo3') }}</th>
      </tr>
    </thead>
    <tbody>
      <!-- 提现 -->
      <tr>
        <td>{{ t('user.userList.fundTraceability.totalPaySuccessAmount') }}</td>
        <td class="amount">{{ formatAmount(form.totalPaySuccessAmount) }}</td>
        <td>{{ formatRatio(form.totalPaySuccessAmount) }}</td>
      </tr>
      <tr>
        <td>{{ t('user.userList.fundTraceability.totalBonusToCashAmount') }}</td>
        <td class="amount">{{ formatAmount(form.totalBonusToCashAmount) }}</td>
        <td>{{ formatRatio(form.totalBonusToCashAmount) }}</td>
      </tr>
      <tr>
        <td>{{ t('user.userList.fundTraceability.cashNetWinAmount') }}</td>
        <td class="amount">{{ formatAmount(form.cashNetWinAmount) }}</td>
        <td>{{ (form.cashNetWinAmount ?? 0) < 0 ? '0.00%' : formatRatio(form.cashNetWinAmount) }}</td>
      </tr>

      <tr class="total">
        <td class="with-total">{{ t('user.userList.fundTraceability.withTotal') }}</td>
        <td class="amount">{{ formatAmount(withTotal) }}</td>
        <td>100%</td>
      </tr>
      <tr style="height: 40px;">
        <td :colspan="3"></td>
      </tr>
      <!-- 当前 -->
      <tr>
        <td>{{ t('user.userList.fundTraceability.totalWithdrawSuccessAmount') }}</td>
        <td class="amount">{{ formatAmount(form.totalWithdrawSuccessAmount) }}</td>
        <td>{{ formatRatio(form.totalWithdrawSuccessAmount, curTotal) }}</td>
      </tr>
      <tr>
        <td>{{ t('user.userList.fundTraceability.cashBalance') }}</td>
        <td class="amount">{{ formatAmount(form.cashBalance) }}</td>
        <td>{{ formatRatio(form.cashBalance, curTotal) }}</td>
      </tr>
      <!-- <tr>
        <td class="with-total">{{ t('user.userList.fundTraceability.curTotal') }}</td>
        <td class="amount">{{ formatAmount(curTotal) }}</td>
        <td>100%</td>
      </tr> -->
    </tbody>
  </table>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useFormData } from '@/utils/use-form-data';
  import { getUserFundSource } from '@/api/user/userApi';
  import type { UserFundSourceVO } from '@/api/model/user';
  import { EleMessage } from 'ele-admin-plus';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  const props = defineProps<{
    /** 修改回显的数据 */
    uid: number | null;
  }>();

  /** 表单数据 */
  const [form, _, assignFields] = useFormData<UserFundSourceVO>({
    totalPaySuccessAmount: 0,
    totalBonusToCashAmount: 0,
    cashNetWinAmount: 0,
    totalWithdrawSuccessAmount: 0,
    cashBalance: 0
  });

  /** 可提现来源合计 = 自己充值本金 + Bonus转Cash + 游戏Cash净赢 */
  const withTotal = computed(
    () => (form.totalPaySuccessAmount ?? 0) + (form.totalBonusToCashAmount ?? 0) + (form.cashNetWinAmount ?? 0)
  );
  /** 占来源比分母：游戏Cash净赢为负时只取前两项之和 */
  const withTotalRatio = computed(() => {
    const netWin = form.cashNetWinAmount ?? 0;
    const base = (form.totalPaySuccessAmount ?? 0) + (form.totalBonusToCashAmount ?? 0);
    return netWin < 0 ? base : base + netWin;
  });
  const curTotal = computed(() => (form.cashBalance ?? 0) + (form.totalWithdrawSuccessAmount ?? 0));

  /** 金额千分位格式化 */
  const formatAmount = (val?: number) => (val ?? 0).toLocaleString();

  /** 占来源比：金额 / 合计，保留2位小数，默认按 withTotalRatio 计算 */
  const formatRatio = (amount?: number, total?: number) => {
    const base = total ?? withTotalRatio.value;
    if (!base) return '0%';
    return `${(((amount ?? 0) / base) * 100).toFixed(2)}%`;
  };

  const getFundSource = () => {
    if (props.uid) {
      getUserFundSource(props.uid)
        .then((data) => {
          assignFields({ ...data });
        })
        .catch((e) => {
          EleMessage.error(e.message);
        });
    }
  };
  getFundSource();
</script>

<style lang="scss" scoped>
  .fund-table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 8px 12px;
      border: 1px solid var(--el-border-color);
      text-align: center;
      font-size: 14px;
    }

    th {
      background: var(--el-fill-color-light);
      font-weight: normal;
    }

    .amount {
      //   text-align: right;
    }
    .with-total {
      font-weight: bold;
    }
    .total {
      background: #fef0f0;
    }
  }
</style>
