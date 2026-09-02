<template>
  <div class="vip-base-config">
    <!-- VIP配置表单 -->
    <div class="sub-title">{{ t('platform.vip.baseConfig.title1') }}</div>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="170px" @submit.prevent>
      <el-row :gutter="16">
        <el-col :md="8" :sm="12" :xs="24">
          <el-form-item :label="t('platform.vip.baseConfig.countryCode')" prop="countryCode">
            <el-select v-model="form.countryCode" :placeholder="t('common.placeholder.select')" style="width: 100%" @change="handleCountryChange">
              <el-option v-for="item in countryList" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :xs="24">
          <el-form-item :label="t('platform.vip.baseConfig.weeklyRewardSettlementDay')" prop="weeklyRewardSettlementDay">
            <el-select v-model="form.weeklyRewardSettlementDay" :placeholder="t('common.placeholder.select')" style="width: 100%">
              <el-option :label="t('common.week.monday')" :value="1" />
              <el-option :label="t('common.week.tuesday')" :value="2" />
              <el-option :label="t('common.week.wednesday')" :value="3" />
              <el-option :label="t('common.week.thursday')" :value="4" />
              <el-option :label="t('common.week.friday')" :value="5" />
              <el-option :label="t('common.week.saturday')" :value="6" />
              <el-option :label="t('common.week.sunday')" :value="7" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :xs="24">
          <el-form-item :label="t('platform.vip.baseConfig.weeklyRewardClaimRetentionDays')" prop="weeklyRewardClaimRetentionDays">
            <el-input-number v-model="form.weeklyRewardClaimRetentionDays" :min="0" :controls="false" :placeholder="t('common.placeholder.input')" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :xs="24">
          <el-form-item :label="t('platform.vip.baseConfig.monthlyRewardSettlementDay')" prop="monthlyRewardSettlementDay">
            <el-select v-model="form.monthlyRewardSettlementDay" :placeholder="t('common.placeholder.select')" style="width: 100%">
              <el-option v-for="day in 31" :key="day" :label="`${day}日`" :value="day" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :xs="24">
          <el-form-item :label="t('platform.vip.baseConfig.monthlyRewardClaimRetentionDays')" prop="monthlyRewardClaimRetentionDays">
            <el-input-number v-model="form.monthlyRewardClaimRetentionDays" :min="0" :controls="false" :placeholder="t('common.placeholder.input')" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :xs="24">
          <el-form-item :label="t('platform.vip.baseConfig.dailyTurnoverRebateSettlementTime')" prop="dailyTurnoverRebateSettlementTime">
            <el-time-picker v-model="form.dailyTurnoverRebateSettlementTime" format="HH:mm" value-format="HH:mm" :placeholder="t('common.placeholder.select')" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :xs="24">
          <el-form-item :label="t('platform.vip.baseConfig.weeklyLossRebateSettlementDay')" prop="weeklyLossRebateSettlementDay">
            <el-select v-model="form.weeklyLossRebateSettlementDay" :placeholder="t('common.placeholder.select')" style="width: 100%">
              <el-option :label="t('common.week.monday')" :value="1" />
              <el-option :label="t('common.week.tuesday')" :value="2" />
              <el-option :label="t('common.week.wednesday')" :value="3" />
              <el-option :label="t('common.week.thursday')" :value="4" />
              <el-option :label="t('common.week.friday')" :value="5" />
              <el-option :label="t('common.week.saturday')" :value="6" />
              <el-option :label="t('common.week.sunday')" :value="7" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :xs="24">
          <el-form-item :label="t('platform.vip.baseConfig.exclusiveCustomerServiceLevel')" prop="exclusiveCustomerServiceLevel">
            <el-input-number v-model="form.exclusiveCustomerServiceLevel" :min="0" :controls="false" :placeholder="t('common.placeholder.input')" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :xs="24">
          <el-form-item :label="t('platform.vip.baseConfig.exclusiveCustomerServiceUrl')" prop="vexclusiveCustomerServiceUrl">
            <el-input v-model="form.exclusiveCustomerServiceUrl" :placeholder="t('common.placeholder.input')" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="display: flex; justify-content: flex-end; align-items: center">
        <el-button type="primary" :loading="loading" @click="handleSave" size="large">
          {{ t('action.save') }}
        </el-button>
        <el-popconfirm :title="t('common.sureSend')" @confirm="handleSendToServer">
          <template #reference>
            <el-button type="danger" class="ele-btn-icon" size="large">
              <span>{{ t('action.send') }}</span>
            </el-button>
          </template>
        </el-popconfirm>
      </el-row>
    </el-form>
    <div class="sub-title">{{ t('platform.vip.baseConfig.title2') }}</div>
    <!-- VIP配置列表 -->
    <ConfigList ref="configListRef" />
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { EleMessage } from 'ele-admin-plus/es';
  import { useFormData } from '@/utils/use-form-data';
  import { getVipBaseConfig, updateVipBaseConfig, reloadVipConfig } from '@/api/platform/vipApi';
  import type { VipBaseConfigDTO } from '@/api/platform/vipApi';
  import type { FormInstance, FormRules } from 'element-plus';
  import { useConfigStore } from '@/store/modules/config';
  import ConfigList from './config-list.vue';
  const { t } = useI18n();
  const configStore = useConfigStore();

  const formRef = ref<FormInstance | null>(null);
  const configListRef = ref<InstanceType<typeof ConfigList> | null>(null);
  const loading = ref(false);
  const countryList = ref<any[]>([]);

  const { form, resetFields, assignFields } = useFormData<VipBaseConfigDTO>({
    countryCode: (configStore.countryArr?.[0]?.code ?? 0) as number,
    weeklyRewardSettlementDay: 0,
    weeklyRewardClaimRetentionDays: 0,
    monthlyRewardSettlementDay: 0,
    monthlyRewardClaimRetentionDays: 0,
    dailyTurnoverRebateSettlementTime: '',
    weeklyLossRebateSettlementDay: 0,
    exclusiveCustomerServiceLevel: 0,
    exclusiveCustomerServiceUrl: ''
  });

  const rules = reactive<FormRules>({
    countryCode: [{ required: true, type: 'number', message: t('common.placeholder.select'), trigger: 'change' }],
    weeklyRewardSettlementDay: [{ required: true, type: 'number', message: t('common.placeholder.select'), trigger: 'change' }],
    weeklyRewardClaimRetentionDays: [{ required: true, type: 'number', message: t('common.placeholder.input'), trigger: 'blur' }],
    monthlyRewardSettlementDay: [{ required: true, type: 'number', message: t('common.placeholder.select'), trigger: 'change' }],
    monthlyRewardClaimRetentionDays: [{ required: true, type: 'number', message: t('common.placeholder.input'), trigger: 'blur' }],
    dailyTurnoverRebateSettlementTime: [{ required: true, type: 'string', message: t('common.placeholder.select'), trigger: 'change' }],
    weeklyLossRebateSettlementDay: [{ required: true, type: 'number', message: t('common.placeholder.select'), trigger: 'change' }],
    exclusiveCustomerServiceLevel: [{ required: true, type: 'number', message: t('common.placeholder.input'), trigger: 'blur' }],
    exclusiveCustomerServiceUrl: [{ required: true, type: 'string', message: t('common.placeholder.input'), trigger: 'blur' }]
  });

  /** 国家切换 */
  const handleCountryChange = () => {
    if (form.countryCode) {
      loadConfig();
      // 刷新列表
      configListRef.value?.reload?.({ countryCode: form.countryCode });
    } else {
      resetFields();
    }
  };

  /** 加载配置 */
  const loadConfig = () => {
    if (!form.countryCode) return;

    getVipBaseConfig({ countryCode: form.countryCode })
      .then((data) => {
        if (data) {
          assignFields(data);
        }
      })
      .catch((e) => {
        EleMessage.error(e.message);
      });
  };

  /** 保存 */
  const handleSave = () => {
    if (!formRef.value) return;

    formRef.value.validate((valid) => {
      if (!valid) return;

      loading.value = true;
      updateVipBaseConfig({ ...form })
        .then((msg) => {
          loading.value = false;
          EleMessage.success(msg);
          loadConfig();
          // 刷新列表
          configListRef.value?.reload?.();
        })
        .catch((e) => {
          loading.value = false;
          EleMessage.error(e.message);
        });
    });
  };

  /** 发送到服务器 */
  const handleSendToServer = () => {
    // loading.value = true;
    // reloadVipConfig()
    //   .then((success) => {
    //     loading.value = false;
    //     if (success) {
    //       EleMessage.success(t('common.sendSuccess'));
    //     } else {
    //       EleMessage.warning(t('common.sendFailed'));
    //     }
    //   })
    //   .catch((e) => {
    //     loading.value = false;
    //     EleMessage.error(e.message);
    //   });
    const loading = EleMessage.loading({
      message: t('common.loading'),
      plain: true
    });
    reloadVipConfig()
      .then((msg) => {
        loading.close();
        EleMessage.success(msg);
      })
      .catch((e) => {
        loading.close();
        EleMessage.error(e.message);
      });
  };

  onMounted(() => {
    // 获取国家列表
    countryList.value = configStore.countryArr || [];
    loadConfig();
  });
</script>

<style scoped lang="scss">
  .vip-base-config {
    padding: 16px;
  }

  .sub-title {
    font-size: 20px;
    font-weight: bold;
    margin: 8px 0 10px;
    &::before {
      content: '';
      display: inline-block;
      width: 6px;
      min-height: 30px;
      height: 100%;
      background-color: #1677ff;
      vertical-align: -8px;
      margin-right: 5px;
    }
  }
</style>
