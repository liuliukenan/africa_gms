<template>
  <div>
    <ele-card :bordered="false" style="margin: 0" body-class="card" :body-style="{ padding: '0px' }">
      <el-form ref="formRef" :model="form" :rules="rules" :label-width="130">
        <!-- 基础配置 -->
        <div class="sub-title">{{ t('activityConfig.baseConfig.title') }}</div>
        <ActivityBaseConfig ref="baseConfigRef" v-model="form" :get-api="getApi" @loaded="handleBaseLoaded" />

        <!-- 每日充值惊喜专属配置 -->
        <div>
          <div class="sub-title">活动控制</div>
          <ActivityControl v-model="configValue" />
        </div>

        <!-- 限制配置 -->
        <div>
          <div class="sub-title">限制配置</div>
          <ActivityLimit v-model="subConf" />
        </div>

        <!-- 奖励档位配置 -->
        <ActivitySlots v-model="slotList" />

        <!-- 奖励物品表格 -->
        <div>
          <div class="sub-title">奖励物品配置</div>
          <ActivityRewardGoods ref="rewardGoodsTableRef" v-model="rewardGoodsList" actTypeEnum="DAILY_RECHARGE_SURPRISE" />
        </div>

        <!-- 推送策略奖表格 -->
        <div>
          <div class="sub-title">引导与推送策略</div>
          <el-row :gutter="16">
            <el-col :md="8" :sm="24" :xs="24">
              <el-form-item label="大厅引导弹窗" prop="configValue.popupEnabled">
                <el-switch v-model="configValue.popupEnabled" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <ActivityPushStrategy v-model="form.pushStrategies" :country-code="form.countryCode" /> -->
          <div v-for="(strategy, sIdx) in form.pushStrategies" :key="strategy.id ?? sIdx" style="margin-bottom: 16px">
            <!-- <el-input v-model="strategy.strategyName" placeholder="策略名称" size="small" style="width: 200px; margin-bottom: 8px" /> -->
            <ActivityPush v-model="strategy.pushes" :country-code="form.countryCode" :strategy-id="strategy.id" />
          </div>
        </div>
      </el-form>
      <div style="text-align: left; padding: 20px 0">
        <el-button type="primary" size="large" @click="save">{{ t('action.save') }}</el-button>
        <el-popconfirm :title="t('common.sureSend')" @confirm="sendServer()">
          <template #reference>
            <el-button type="danger" size="large" class="ele-btn-icon">
              <span>{{ t('action.send') }}</span>
            </el-button>
          </template>
        </el-popconfirm>
      </div>
    </ele-card>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { EleMessage } from 'ele-admin-plus/es';
  import { ElForm } from 'element-plus';
  import type { ActSubConf, RewardGoods } from '@/api/welfare/model/registerGive';
  import type { DailyRechargeSurpriseRequest, DailyRechargeSurpriseActConf, DailyRechargeSurpriseSlot } from '@/api/welfare/model/dailySurprise';
  import { getDailySurpriseActInfo, saveDailySurpriseActInfo, sendDailySurpriseActInfo } from '@/api/welfare/dailySurpriseApi';
  import ActivityRewardGoods from '@/components/ActivityRewardGoods/index.vue';
  import ActivityBaseConfig from '@/components/ActivityBaseConfig/index.vue';
  import ActivityLimit from '@/components/ActivityLimit/index.vue';
  // import ActivityPushStrategy from '@/components/ActivityPushStrategy/index.vue';
  import ActivityPush from '@/components/ActivityPush/index.vue';
  import ActivityControl from './activityControl.vue';
  import ActivitySlots from './activitySlots.vue';

  const { t } = useI18n();
  const formRef = ref<InstanceType<typeof ElForm> | null>(null);
  const baseConfigRef = ref<any>(null);

  // 获取配置API（供基础配置组件调用）
  const getApi = (countryCode: number) => getDailySurpriseActInfo({ countryCode, actTypeEnum: 'DAILY_RECHARGE_SURPRISE' });

  const form = ref<DailyRechargeSurpriseRequest>({
    id: undefined,
    countryCode: 254,
    name: '',
    jumpType: undefined,
    jumpValue: '',
    imgUrl: '',
    sortNumber: undefined,
    jumpId: undefined,
    status: true,
    startDate: '',
    endDate: '',
    showStartDate: '',
    showEndDate: '',
    subTitle: '',
    description: '',
    pushStrategies: [],
    configValue: {
      jsonType: 'DailyRechargeSurpriseActConf',
      subActRewardConf: {}
    }
  });

  // 每日充值惊喜专属配置（configValue）
  const configValue = ref<DailyRechargeSurpriseActConf>({
    rechargeThreshold: undefined,
    rulesThreshold: undefined,
    singleRechargeLimit: undefined,
    remainingTimesLimit: undefined,
    dailyTimesLimit: undefined,
    chanceExpireDays: undefined,
    flowMultiple: undefined,
    popupEnabled: false,
    slots: []
  });

  // 奖励档位列表（独立维护，保存时组装进 configValue.slots）
  const slotList = ref<DailyRechargeSurpriseSlot[]>([]);

  // 子类型配置（独立维护，保存时组装进 configValue.subActRewardConf）
  const SUB_CONF_KEY = 'common';
  const subConf = ref<ActSubConf>({
    ipLimit: undefined,
    ipPeriod: undefined,
    deviceLimit: undefined,
    devicePeriod: undefined,
    rewardLimit: undefined,
    rewardGoods: []
  });

  // 奖励物品列表（独立维护，保存时组装进 subConf.rewardGoods）
  const rewardGoodsList = ref<RewardGoods[]>([]);
  const rewardGoodsTableRef = ref<InstanceType<typeof ActivityRewardGoods> | null>(null);

  // 表单验证规则
  const rules = {
    countryCode: [{ required: true, message: '请选择', trigger: 'change' }],
    jumpId: [{ required: true, message: '请选择', trigger: 'change' }]
  };

  // 基础配置加载完成后，填充活动专属配置
  const handleBaseLoaded = (data: any) => {
    if (!data) return;
    // 填充每日充值惊喜专属配置
    if (data.configValue) {
      configValue.value = {
        rechargeThreshold: data.configValue.rechargeThreshold,
        rulesThreshold: data.configValue.rulesThreshold,
        singleRechargeLimit: data.configValue.singleRechargeLimit,
        remainingTimesLimit: data.configValue.remainingTimesLimit,
        dailyTimesLimit: data.configValue.dailyTimesLimit,
        chanceExpireDays: data.configValue.chanceExpireDays,
        flowMultiple: data.configValue.flowMultiple,
        popupEnabled: data.configValue.popupEnabled,
        slots: data.configValue.slots || []
      };
      slotList.value = data.configValue.slots || [];
      // 填充子配置
      if (data.configValue.subActRewardConf) {
        const subConfData = data.configValue.subActRewardConf[SUB_CONF_KEY];
        if (subConfData) {
          subConf.value = { ...subConfData };
          rewardGoodsList.value = subConfData.rewardGoods || [];
        }
      }
    }
    // 填充推送策略
    form.value.pushStrategies = data.pushStrategies || [];
  };

  // 发送到服务器
  const sendServer = () => {
    const loading = EleMessage.loading({
      message: t('common.loading'),
      plain: true
    });
    sendDailySurpriseActInfo()
      .then((msg) => {
        loading.close();
        EleMessage.success(msg);
      })
      .catch((e) => {
        loading.close();
        EleMessage.error(e.message);
      });
  };

  // 保存
  const save = () => {
    formRef.value?.validate((valid) => {
      if (!valid) {
        EleMessage.error('请完善基础配置信息');
        return;
      }
      // 校验奖励物品表格
      const validation = rewardGoodsTableRef.value?.validate();
      if (validation && !validation.valid) {
        EleMessage.error(validation.message);
        return;
      }
      if (!validation) {
        EleMessage.error('奖励物品表格未初始化');
        return;
      }
      const loading = EleMessage.loading({
        message: t('common.loading'),
        plain: true
      });
      // 解构日期范围
      const [startDate, endDate] = baseConfigRef.value?.timeArr || [];
      const [showStartDate, showEndDate] = baseConfigRef.value?.timeArr2 || [];
      // 保存时剥离图片域名前缀
      const imgBaseUrl = import.meta.env.VITE_APP_IMG_URL;
      let imgUrl = form.value.imgUrl;
      if (imgUrl && imgBaseUrl && imgUrl.startsWith(imgBaseUrl)) {
        imgUrl = imgUrl.slice(imgBaseUrl.length);
      }
      // 组装提交数据
      const params: DailyRechargeSurpriseRequest = {
        ...form.value,
        imgUrl,
        startDate,
        endDate,
        showStartDate,
        showEndDate,
        pushStrategies: form.value.pushStrategies || [],
        configValue: {
          ...form.value.configValue,
          jsonType: 'DailyRechargeSurpriseActConf',
          rechargeThreshold: configValue.value.rechargeThreshold,
          rulesThreshold: configValue.value.rulesThreshold,
          singleRechargeLimit: configValue.value.singleRechargeLimit,
          remainingTimesLimit: configValue.value.remainingTimesLimit,
          dailyTimesLimit: configValue.value.dailyTimesLimit,
          chanceExpireDays: configValue.value.chanceExpireDays,
          flowMultiple: configValue.value.flowMultiple,
          popupEnabled: configValue.value.popupEnabled,
          slots: slotList.value,
          subActRewardConf: {
            [SUB_CONF_KEY]: {
              ...subConf.value,
              rewardGoods: rewardGoodsList.value.filter((item) => item.goodsId !== undefined)
            }
          }
        }
      };
      saveDailySurpriseActInfo(params)
        .then((msg) => {
          loading.close();
          EleMessage.success(msg);
          baseConfigRef.value?.loadingAppConf().then(handleBaseLoaded);
        })
        .catch((e) => {
          loading.close();
          EleMessage.error(e.message);
        });
    });
  };

  onMounted(() => {
    baseConfigRef.value?.loadingAppConf().then(handleBaseLoaded);
  });
</script>
<style lang="scss" scoped>
  .box {
    padding: 16px;
    box-shadow: 0 5px 5px 0 rgba(34, 34, 34, 0.1);
    margin: 15px 0;
    border-radius: 15px;
  }

  .sub-title {
    font-size: 20px;
    font-weight: bold;
    margin: 8px 0;
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
    font-size: 15px;
    font-weight: bold;
    margin: 8px 0;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .section-label {
    font-size: 16px;
    font-weight: bold;
    color: #1677ff;
  }

  ::v-deep .el-form-item__label {
    line-height: 1;
    align-items: center;
  }
</style>
