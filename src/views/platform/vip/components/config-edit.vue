<template>
  <ele-modal width="80vw" v-model="visible" title="编辑VIP等级配置" @open="handleOpen" position="top" :body-style="{ paddingBottom: '0px', paddingTop: '0px', minHeight: '85vh' }">
    <el-form ref="formRef" :model="form" label-width="120px" style="padding-right: 10px">
      <!-- 等级配置 -->
      <div class="box">
        <div class="sub-title">{{ t('platform.vip.configEdit.levelConfig') }}</div>
        <el-row :gutter="16">
          <el-col :md="8" :sm="24" :xs="24">
            <el-form-item :label="t('platform.vip.configList.level')">
              <el-input-number v-model="form.levelConfig.level" :min="0" :controls="false" style="width: 100%" disabled />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24" :xs="24">
            <el-form-item :label="t('platform.vip.configList.levelName')">
              <el-input v-model="form.levelConfig.levelName" :placeholder="t('common.placeholder.input')" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24" :xs="24">
            <el-form-item :label="t('platform.vip.configList.upgradeFlow')">
              <el-input-number v-model="form.levelConfig.upgradeFlow" :min="0" :controls="false" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24" :xs="24">
            <el-form-item :label="t('platform.vip.configList.sortOrder')">
              <el-input-number v-model="form.levelConfig.sortOrder" :min="0" :controls="false" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24" :xs="24">
            <el-form-item :label="t('platform.vip.configList.status')">
              <el-radio-group v-model="form.levelConfig.status">
                <el-radio :value="1">{{ t('platform.vip.configList.enabled') }}</el-radio>
                <el-radio :value="0">{{ t('platform.vip.configList.disabled') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <!--按businessType分类 -->
      <div class="">
        <template v-for="bizType in businessTypes" :key="`push_${bizType}`">
          <div v-if="pushStrategiesMap[bizType] && rewardConfigsMap[bizType]" class="box">
            <div class="sub-title"
              >{{ getBusinessTypeLabel(bizType) }} <span class="tag" :class="rewardConfigsMap[bizType].manualClaim ? 'tag1' : 'tag0'">({{ rewardConfigsMap[bizType].manualClaim ? t('platform.vip.configEdit.manualClaim1') : t('platform.vip.configEdit.manualClaim0') }})</span></div
            >

            <!-- 策略限制配置 -->
            <el-row :gutter="16">
              <el-col :md="8" :sm="24" :xs="24">
                <el-form-item :label="t('activityConfig.limitConfig.ipLimit')">
                  <el-input-number v-model="rewardConfigsMap[bizType].rewardConf.ipLimit" :min="0" :controls="false" style="width: 100%" />
                </el-form-item>
              </el-col>
              <el-col :md="8" :sm="24" :xs="24">
                <el-form-item :label="t('activityConfig.limitConfig.ipPeriod')">
                  <el-input-number v-model="rewardConfigsMap[bizType].rewardConf.ipPeriod" :min="0" :controls="false" style="width: 100%" />
                </el-form-item>
              </el-col>
              <el-col :md="8" :sm="24" :xs="24">
                <el-form-item :label="t('activityConfig.limitConfig.deviceLimit')">
                  <el-input-number v-model="rewardConfigsMap[bizType].rewardConf.deviceLimit" :min="0" :controls="false" style="width: 100%" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="16">
              <el-col :md="8" :sm="24" :xs="24">
                <el-form-item :label="t('activityConfig.limitConfig.devicePeriod')">
                  <el-input-number v-model="rewardConfigsMap[bizType].rewardConf.devicePeriod" :min="0" :controls="false" style="width: 100%" />
                </el-form-item>
              </el-col>
              <el-col :md="8" :sm="24" :xs="24">
                <el-form-item :label="t('activityConfig.limitConfig.rewardLimit')">
                  <el-input-number v-model="rewardConfigsMap[bizType].rewardConf.rewardLimit" :min="0" :controls="false" style="width: 100%" />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 返利费率配置（仅vipDailyRebate显示） -->
            <template v-if="bizType === 'vipDailyRebate'">
              <!-- <div class="sub-title3" style="margin-top: 16px">{{ t('platform.vip.configEdit.rebateRateConf') }}</div> -->
              <template v-for="(companyRate, companyId) in rewardConfigsMap[bizType].rebateRateConf?.companyRates" :key="companyId">
                <div class="sub-title3" style="margin-top: 12px">{{ getCompanyLabel(String(companyId)) }} · {{ t('platform.vip.configEdit.rebateRateByGameType') }}</div>
                <el-row :gutter="16">
                  <el-col :md="8" :sm="12" :xs="24">
                    <el-form-item :label="t('platform.vip.configEdit.sports')" label-width="80px">
                      <el-input-number v-model="companyRate.sports" :min="0" :max="1" :precision="4" :step="0.01" :controls="false" style="width: 100%" />
                    </el-form-item>
                  </el-col>
                  <el-col :md="8" :sm="12" :xs="24">
                    <el-form-item :label="t('platform.vip.configEdit.casino')" label-width="80px">
                      <el-input-number v-model="companyRate.casino" :min="0" :max="1" :precision="4" :step="0.01" :controls="false" style="width: 100%" />
                    </el-form-item>
                  </el-col>
                  <el-col :md="8" :sm="12" :xs="24">
                    <el-form-item :label="t('platform.vip.configEdit.aviator')" label-width="80px">
                      <el-input-number v-model="companyRate.aviator" :min="0" :max="1" :precision="4" :step="0.01" :controls="false" style="width: 100%" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="16">
                  <el-col :md="8" :sm="12" :xs="24">
                    <el-form-item :label="t('platform.vip.configEdit.crash')" label-width="80px">
                      <el-input-number v-model="companyRate.crash" :min="0" :max="1" :precision="4" :step="0.01" :controls="false" style="width: 100%" />
                    </el-form-item>
                  </el-col>
                  <el-col :md="8" :sm="12" :xs="24">
                    <el-form-item :label="t('platform.vip.configEdit.mini')" label-width="80px">
                      <el-input-number v-model="companyRate.mini" :min="0" :max="1" :precision="4" :step="0.01" :controls="false" style="width: 100%" />
                    </el-form-item>
                  </el-col>
                  <el-col :md="8" :sm="12" :xs="24">
                    <el-form-item :label="t('platform.vip.configEdit.virtual')" label-width="80px">
                      <el-input-number v-model="companyRate.virtual" :min="0" :max="1" :precision="4" :step="0.01" :controls="false" style="width: 100%" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="16">
                  <el-col :md="8" :sm="12" :xs="24">
                    <el-form-item :label="t('platform.vip.configEdit.live')" label-width="80px">
                      <el-input-number v-model="companyRate.live" :min="0" :max="1" :precision="4" :step="0.01" :controls="false" style="width: 100%" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </template>
            </template>
            <!-- 奖励物品（从rewardConfigs中取对应businessType的数据） -->
            <el-row :gutter="16">
              <el-col :span="24">
                <ActivityRewardGoods :ref="(el: any) => setActivityRewardGoodsRef(el, `strategy_${bizType}`)" v-model="rewardConfigsMap[bizType].rewardConf.rewardGoods" :actTypeEnum="bizType" />
              </el-col>
            </el-row>

            <!-- 推送配置 -->
            <ActivityPush v-model="pushStrategiesMap[bizType].pushes" :strategy-id="pushStrategiesMap[bizType].id" :show-add-button="true" act-type-enum="allVip"/>

            <!-- 推送终止配置 -->
            <template v-if="bizType === 'vipWeekly' || bizType === 'vipMonthly'">
              <div class="sub-title3"> {{ t('platform.vip.configEdit.pushStopConfig') }}</div>
              <el-row :gutter="16">
                <el-col :md="24" :sm="24" :xs="24">
                  <el-form-item label="" label-width="0">
                    <el-switch v-model="pushStrategiesMap[bizType].stopAfterClaim" :active-value="1" :inactive-value="0" style="--el-switch-on-color: #2e9e5b" />
                    {{ t('platform.vip.configEdit.stopAfterClaim') }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="16">
                <el-col :md="24" :sm="24" :xs="24">
                  <el-form-item label="" label-width="0">
                    <el-switch v-model="pushStrategiesMap[bizType].stopAfterMissedEnabled" :active-value="1" :inactive-value="0" style="--el-switch-on-color: #2e9e5b" />{{ t('platform.vip.configEdit.continuous')}}
                    <el-input-number v-model="pushStrategiesMap[bizType].stopAfterMissedPeriods" :min="1" :max="52" :controls="false" style="width: 8%; margin: 0 5px" :placeholder="t('common.placeholder.input')" />
                    {{ t('platform.vip.configEdit.stopAfterMissedEnabled') }}
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
          </div>
        </template>
      </div>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleSave">保存</el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { EleMessage } from 'ele-admin-plus/es';
  import { getVipConfigDetail, saveVipConfig } from '@/api/platform/vipApi';
  import ActivityRewardGoods from '@/components/ActivityRewardGoods/index.vue';
  import ActivityPush from '@/components/ActivityPush/index.vue';

  const { t } = useI18n();

  const props = defineProps<{
    data?: any | null;
  }>();

  const emit = defineEmits<{
    (e: 'reload'): void;
  }>();

  const visible = defineModel({ type: Boolean });
  const loading = ref(false);

  // 所有业务类型
  const businessTypes = ['vipUpgrade', 'vipWeekly', 'vipMonthly', 'vipDailyRebate', 'vipWeeklyLossRebate'];

  const form = ref<any>({
    levelConfig: {
      id: undefined,
      countryCode: undefined,
      level: undefined,
      levelName: '',
      upgradeFlow: 0,
      sortOrder: 0,
      status: 1
    },
    rewardConfigs: [],
    pushStrategies: []
  });

  // 初始化所有业务类型的配置
  const initAllConfigs = () => {
    // 初始化推送策略（只需要确保pushes数组存在）
    businessTypes.forEach((bizType) => {
      let strategy = form.value.pushStrategies.find((s: any) => s.businessType === bizType);
      if (!strategy) {
        strategy = {
          businessType: bizType,
          strategyName: '',
          conditionParam: '{}',
          sortOrder: 0,
          status: 1,
          pushes: [], // 必须初始化为空数组
          stopAfterClaim: 0,
          stopAfterMissedEnabled: 0,
          stopAfterMissedPeriods: 1
        };
        form.value.pushStrategies.push(strategy);
      } else if (!Array.isArray(strategy.pushes)) {
        // 如果pushes不是数组（null/undefined），初始化为空数组
        strategy.pushes = [];
      }
    });

    // 初始化奖励配置（这是真正使用的数据）
    businessTypes.forEach((bizType) => {
      let conf = form.value.rewardConfigs.find((r: any) => r.businessType === bizType);
      if (!conf) {
        conf = {
          businessType: bizType,
          rewardConf: {
            ipLimit: 0,
            ipPeriod: 0,
            deviceLimit: 0,
            devicePeriod: 0,
            rewardLimit: 0,
            rewardGoods: []
          },
          status: 1
        };
        // 如果是vipDailyRebate，初始化rebateRateConf
        if (bizType === 'vipDailyRebate') {
          conf.rebateRateConf = {
            companyRates: getDefaultCompanyRates()
          };
        }
        form.value.rewardConfigs.push(conf);
      } else if (!conf.rewardConf) {
        // 如果conf存在但rewardConf为null，则初始化rewardConf
        conf.rewardConf = {
          ipLimit: 0,
          ipPeriod: 0,
          deviceLimit: 0,
          devicePeriod: 0,
          rewardLimit: 0,
          rewardGoods: []
        };
      } else if (conf.rewardConf.rewardGoods === null || conf.rewardConf.rewardGoods === undefined) {
        // 如果rewardGoods为null，初始化为空数组
        conf.rewardConf.rewardGoods = [];
      }
      // 确保vipDailyRebate的rebateRateConf存在
      if (bizType === 'vipDailyRebate') {
        if (!conf.rebateRateConf) {
          conf.rebateRateConf = { companyRates: getDefaultCompanyRates() };
        } else if (!conf.rebateRateConf.companyRates) {
          conf.rebateRateConf = { companyRates: getDefaultCompanyRates() };
        }
      }
    });
  };

  // 按businessType分组的推送策略（computed缓存）
  const pushStrategiesMap = computed(() => {
    const map: Record<string, any> = {};
    businessTypes.forEach((bizType) => {
      const strategy = form.value.pushStrategies.find((s: any) => s.businessType === bizType);
      if (strategy) {
        map[bizType] = strategy;
      }
    });
    return map;
  });

  // 按businessType分组的奖励配置（computed缓存）
  const rewardConfigsMap = computed(() => {
    const map: Record<string, any> = {};
    businessTypes.forEach((bizType) => {
      const conf = form.value.rewardConfigs.find((r: any) => r.businessType === bizType);
      if (conf) {
        map[bizType] = conf; // 返回整个conf对象，包含rewardConf
      }
    });
    return map;
  });

  // 存储ActivityRewardGoods的ref
  const rewardGoodsTableRefs = ref<Record<string, any>>({});

  const setActivityRewardGoodsRef = (el: any, key: string) => {
    if (el) {
      rewardGoodsTableRefs.value[key] = el;
    }
  };

  // 业务类型标签映射
  const getBusinessTypeLabel = (businessType: string) => {
    const map: Record<string, string> = {
      vipUpgrade: t('platform.vip.configEdit.vipUpgrade'),
      vipWeekly: t('platform.vip.configEdit.vipWeekly'),
      vipMonthly: t('platform.vip.configEdit.vipMonthly'),
      vipDailyRebate: t('platform.vip.configEdit.vipDailyRebate'),
      vipWeeklyLossRebate: t('platform.vip.configEdit.vipWeeklyLossRebate')
    };
    return map[businessType] || businessType;
  };

  // 默认返利比例结构
  const getDefaultCompanyRates = () => {
    const defaultRate = () => ({
      sports: 0,
      casino: 0,
      aviator: 0,
      crash: 0,
      mini: 0,
      virtual: 0,
      live: 0
    });
    return {
      '1': defaultRate(),
      '2': defaultRate()
    };
  };

  // 公司标签映射
  const getCompanyLabel = (companyId: string) => {
    const map: Record<string, string> = {
      '1': t('platform.vip.configEdit.selfDevelopedPlatform'),
      '2': t('platform.vip.configEdit.grayscalePlatform')
    };
    return map[companyId] || companyId;
  };

  // 弹窗打开
  const handleOpen = () => {
    // 先初始化空配置
    initAllConfigs();
    if (props.data?.id) {
      loadDetail(props.data.id);
    }
  };

  // 加载详情
  const loadDetail = (id: number) => {
    getVipConfigDetail(id)
      .then((data) => {
        if (data) {
          form.value = {
            levelConfig: data.levelConfig || {},
            rewardConfigs: data.rewardConfigs || [],
            pushStrategies: data.pushStrategies || []
          };
          // 初始化所有业务类型的配置
          initAllConfigs();
        }
      })
      .catch((e) => {
        EleMessage.error(e.message);
      });
  };

  // 保存
  const handleSave = () => {
    // 校验所有奖励物品表格
    for (const key in rewardGoodsTableRefs.value) {
      const tableRef = rewardGoodsTableRefs.value[key];
      if (tableRef) {
        const validation = tableRef.validate();
        if (!validation.valid) {
          // 提取业务类型标签（key格式：strategy_vipUpgrade）
          const bizType = key.replace('strategy_', '');
          const bizTypeLabel = getBusinessTypeLabel(bizType);
          EleMessage.error(`【${bizTypeLabel}】${validation.message}`);
          return;
        }
      }
    }

    loading.value = true;
    saveVipConfig(form.value)
      .then((msg) => {
        loading.value = false;
        EleMessage.success(msg);
        handleCancel();
        emit('reload');
      })
      .catch((e) => {
        loading.value = false;
        EleMessage.error(e.message);
      });
  };

  // 关闭弹窗
  const handleCancel = () => {
    visible.value = false;
  };
</script>

<style scoped lang="scss">
  .box {
    padding: 16px;
    box-shadow: 0 5px 5px 0 rgba(34, 34, 34, 0.1);
    background: #f5f7fa;
    margin: 0 0 15px;
    border-radius: 12px;
  }
  .tag {
    border-radius: 4px;
    font-size: 15px;
    padding: 4px 8px;
  }
  .tag0 {
    color: #37a362;
    background: #e7f6ed;
  }
  .tag1 {
    color: #e49946;
    background: #fdf1e2;
  }
  .sub-box {
    padding: 12px;
    margin: 10px 0;
    border-radius: 8px;
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
  .sub-title3 {
    font-size: 14px;
    font-weight: bold;
    margin: 8px 0;
  }
</style>
