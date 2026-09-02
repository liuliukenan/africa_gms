<template>
  <ele-page>
    <el-form ref="formRef" :model="form" :label-width="mobile ? 0 : '140px'">
      <div class="sub-title">{{ t('welfare.userRecall.baseConfig.title') }}：</div>
      <el-row :gutter="20">
        <el-col :md="6" :sm="24">
          <el-form-item :label="t('welfare.userRecall.baseConfig.country')">
            <el-select v-model="form.countryConfig.countryCode" :placeholder="t('common.placeholder.select')" @change="loadConfig" style="min-width: 240px">
              <el-option v-for="item in countryOptions" :key="item.code" :label="item.name" :value="item.code ?? 0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="24">
          <el-form-item :label="t('welfare.userRecall.baseConfig.switchStatus')">
            <el-switch v-model="form.countryConfig.status" :active-text="t('welfare.userRecall.baseConfig.switchOn')" :inactive-text="t('welfare.userRecall.baseConfig.switchOff')" :active-value="1" :inactive-value="0" size="large" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="8" :sm="24">
          <el-form-item :label="t('welfare.userRecall.baseConfig.functionTimeRange')">
            <el-date-picker v-model="timeRange" type="daterange" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" :range-separator="t('common.time.to')" :start-placeholder="t('common.time.start')" :end-placeholder="t('common.time.end')" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('welfare.userRecall.baseConfig.ipLimitCount')">
            <el-input-number v-model="form.countryConfig.ipLimit" :controls="false" style="width: 100%" :min="0" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('welfare.userRecall.baseConfig.ipLimitPeriod')">
            <el-input-number v-model="form.countryConfig.ipPeriod" :controls="false" style="width: 100%" :min="0" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('welfare.userRecall.baseConfig.deviceLimitCount')">
            <el-input-number v-model="form.countryConfig.deviceLimit" :controls="false" style="width: 100%" :min="0" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('welfare.userRecall.baseConfig.deviceLimitPeriod')">
            <el-input-number v-model="form.countryConfig.devicePeriod" :controls="false" style="width: 100%" :min="0" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div v-for="(item, idx) in form.strategies" :key="idx" style="margin-bottom: 20px">
      <div class="box">
        <el-form label-width="120px" :model="item.strategy!">
          <el-row :gutter="20">
            <div class="sub-title">{{ idx == 0 ? t('welfare.userRecall.strategy.registerRecall') : t('welfare.userRecall.strategy.depositRecall') }}:</div>
          </el-row>
          <el-row :gutter="20">
            <!-- <el-col :md="6" :sm="12" :xs="24">
                <el-form-item :label="t('welfare.userRecall.strategy.strategyName')">
                  <el-input v-model="item.strategy!.strategyName" :placeholder="t('common.placeholder.input')" />
                </el-form-item>
              </el-col>
              <el-col :md="6" :sm="12" :xs="24">
                <el-form-item :label="t('welfare.userRecall.strategy.strategyType')">
                  <el-select v-model="item.strategy!.strategyType" :placeholder="t('common.placeholder.select')" style="width: 100%">
                    <el-option :label="t('welfare.userRecall.strategy.strategyRegister')" value="register" />
                    <el-option :label="t('welfare.userRecall.strategy.strategyDeposit')" value="deposit" />
                    <el-option :label="t('welfare.userRecall.strategy.strategyLoginInactive')" value="login_inactive" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="6" :sm="12" :xs="24">
                <el-form-item :label="t('welfare.userRecall.strategy.conditionType')">
                  <el-select v-model="item.strategy!.conditionType" :placeholder="t('common.placeholder.select')" style="width: 100%">
                    <el-option :label="t('welfare.userRecall.strategy.conditionNotDeposited')" value="NOT_DEPOSITED" />
                    <el-option :label="t('welfare.userRecall.strategy.conditionDepositNotActive')" value="DEPOSIT_NOT_ACTIVE" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="6" :sm="12" :xs="24">
                <el-form-item :label="t('welfare.userRecall.strategy.sortOrder')">
                  <el-input-number v-model="item.strategy!.sortOrder" :controls="false" style="width: 100%" :min="0" :placeholder="t('welfare.userRecall.strategy.sortOrderPlaceholder')" />
                </el-form-item>
              </el-col> -->
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item :label="t('welfare.userRecall.strategy.enableStatus')">
                <el-switch v-model="item.strategy!.status" :active-text="t('welfare.userRecall.strategy.enable')" :inactive-text="t('welfare.userRecall.strategy.disable')" :active-value="1" :inactive-value="0" size="large" />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="sub-title2" v-if="hasConditionParam(item.strategy?._conditionParams)">{{ t('welfare.userRecall.strategy.triggerCondition') }}</div>
          <el-row :gutter="20" v-if="hasConditionParam(item.strategy?._conditionParams)">
            <el-col v-for="(label, key) in conditionMap" :key="key" :md="6" :sm="12" :xs="24">
              <el-form-item :label="t(label)">
                <el-input-number v-model="item.strategy!._conditionParams![key as string]" :controls="false" style="width: 100%" :min="0" :precision="key === 'maxDepositWithdrawRatio' || key === 'minNetLoss' ? 2 : 0" :placeholder="t('common.placeholder.input')" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <ActivityRewardGoods :ref="(el: any) => setActivityRewardGoodsRef(el, idx)" :model-value="item._rewardGoods || []" @update:model-value="(val: RewardGoods[]) => (item._rewardGoods = val)" />

        <ActivityPush v-model="item.pushes" :strategy-id="item.strategy?.id" />
      </div>
    </div>
    <el-button type="success" @click="saveConfig" style="margin-left: 12px">{{ t('action.save') }}</el-button>
    <el-popconfirm :title="t('common.sureSend')" @confirm="sendServer()">
      <template #reference>
        <el-button type="danger" size="default" class="ele-btn-icon" style="margin-left: 12px">
          <span>{{ t('action.send') }}</span>
        </el-button>
      </template>
    </el-popconfirm>
  </ele-page>
</template>

<script setup lang="ts">
  import { computed, onMounted, reactive, ref, watch } from 'vue';
  import { dayjs, ElForm } from 'element-plus';
  import { EleMessage } from 'ele-admin-plus/es';
  import { useI18n } from 'vue-i18n';
  import { useConfigStore } from '@/store/modules/config';
  import { getRecallConfig, saveRecallConfig, reloadRecall } from '@/api/welfare/userRecallApi';
  import type { RecallConfigVO } from '@/api/welfare/model/userRecall';
  import type { CountryCode } from '@/api/platform/model/countryCode';
  import type { RewardGoods } from '@/api/welfare/model/registerGive';
  import { useMobile } from '@/utils/use-mobile';
  import ActivityRewardGoods from '@/components/ActivityRewardGoods/index.vue';
  import ActivityPush from '@/components/ActivityPush/index.vue';

  const { t } = useI18n();
  const configStore = useConfigStore();
  const countryOptions = computed<CountryCode[]>(() => configStore.countryArr || []);
  const { mobile } = useMobile();
  const timeRange = ref<string[]>([]);
  // const smsMuteRange = ref<string[]>([]);
  // const appPushMuteRange = ref<string[]>([]);
  // const inAppMuteRange = ref<string[]>([]);
  const conditionMap = {
    minDepositCount: 'welfare.userRecall.strategy.minDepositCount',
    maxDepositWithdrawRatio: 'welfare.userRecall.strategy.maxDepositWithdrawRatio',
    minNetLoss: 'welfare.userRecall.strategy.minNetLoss'
  };
  // goodsType 字符串 → 数字映射
  const goodsTypeNameMap: Record<string, number> = {
    CASH: 0,
    GROUP: 1,
    GAME: 2,
    FREE_GAME: 3,
    NONE: 10
  };
  // 每个 strategy 对应的奖励物品列表（已废弃，改用 item._rewardGoods）
  const rewardGoodsLists = ref<Record<number, RewardGoods[]>>({});

  // 存储 ActivityRewardGoods 的 ref
  const rewardGoodsTableRefs = ref<Record<number, any>>({});

  const setActivityRewardGoodsRef = (el: any, idx: number) => {
    if (el) {
      rewardGoodsTableRefs.value[idx] = el;
    }
  };

  const form = reactive<Required<RecallConfigVO>>({
    countryConfig: {
      id: undefined,
      countryCode: (configStore.countryArr?.[0]?.code ?? 0) as number,
      startTime: '',
      endTime: '',
      status: 0,
      smsMuteStart: '',
      smsMuteEnd: '',
      appPushMuteStart: '',
      appPushMuteEnd: '',
      inAppMuteStart: '',
      inAppMuteEnd: '',
      deferRandomMinutes: 0,
      ipLimit: 0,
      ipPeriod: 0,
      deviceLimit: 0,
      devicePeriod: 0
    },
    strategies: []
  });

  const loadConfig = async () => {
    try {
      const data = await getRecallConfig(configStore.countryArr?.[0]?.code);
      const countryConfig = data?.countryConfig;
      if (!countryConfig) {
        EleMessage.warning(t('welfare.userRecall.noConfigFound'));
        form.strategies = [];
        rewardGoodsLists.value = {};
        return;
      }

      form.countryConfig = {
        ...form.countryConfig,
        ...countryConfig
      };

      // 时间戳转字符串给 el-date-picker 回显
      const toDateStr = (v: any) => {
        if (!v && v !== 0) return '';
        const n = Number(v);
        return dayjs(n < 1e12 ? n * 1000 : n).format('YYYY-MM-DD HH:mm:ss');
      };
      timeRange.value = [toDateStr(countryConfig.startTime), toDateStr(countryConfig.endTime)];
      form.countryConfig.startTime = timeRange.value[0] || '';
      form.countryConfig.endTime = timeRange.value[1] || '';

      // smsMuteRange.value = [countryConfig.smsMuteStart || '', countryConfig.smsMuteEnd || ''];
      // appPushMuteRange.value = [countryConfig.appPushMuteStart || '', countryConfig.appPushMuteEnd || ''];
      // inAppMuteRange.value = [countryConfig.inAppMuteStart || '', countryConfig.inAppMuteEnd || ''];

      // 先做深拷贝避免 reactive proxy 与原始数据冲突
      const rawStrategies = JSON.parse(JSON.stringify(data?.strategies || []));
      form.strategies = rawStrategies;

      // 解析每个 strategy 的 rewardConf 到 item._rewardGoods，conditionParam 到 _conditionParams
      form.strategies.forEach((item, idx) => {
        // 解析 rewardConf 到 item._rewardGoods（直接挂在响应式对象上确保回显）
        if (item.strategy?.rewardConf) {
          try {
            const parsed = JSON.parse(item.strategy.rewardConf);
            // rewardConf 结构为 { rewardGoods: [...] }，需要取出 rewardGoods 数组
            const goodsArr = parsed?.rewardGoods;
            if (Array.isArray(goodsArr)) {
              // 将 goodsType 字符串转为数字（后端返回如 "CASH" → 0）
              item._rewardGoods = goodsArr.map((g: any) => ({
                ...g,
                goodsType: typeof g.goodsType === 'string' ? (goodsTypeNameMap[g.goodsType] ?? g.goodsType) : g.goodsType
              }));
            } else {
              item._rewardGoods = [];
            }
          } catch {
            item._rewardGoods = [];
          }
        } else {
          item._rewardGoods = [];
        }
        // 同步到 rewardGoodsLists（兼容旧逻辑）
        rewardGoodsLists.value[idx] = item._rewardGoods;
        // 解析 conditionParam 到 item.strategy._conditionParams
        if (item.strategy?.conditionParam) {
          try {
            item.strategy._conditionParams = JSON.parse(item.strategy.conditionParam);
          } catch {
            item.strategy._conditionParams = {};
          }
        } else if (item.strategy) {
          item.strategy._conditionParams = {};
        }
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : t('welfare.userRecall.queryFailed');
      EleMessage.error(message);
    }
  };

  const saveConfig = async () => {
    // 校验所有奖励物品表格
    for (const idx in rewardGoodsTableRefs.value) {
      const tableRef = rewardGoodsTableRefs.value[idx];
      if (tableRef) {
        const validation = tableRef.validate();
        if (!validation.valid) {
          // 使用国际化标签作为策略名称
          const strategyLabel = Number(idx) === 0 ? t('welfare.userRecall.strategy.registerRecall') : t('welfare.userRecall.strategy.depositRecall');
          EleMessage.error(`【${strategyLabel}】${validation.message}`);
          return;
        }
      }
    }

    // 序列化每个 strategy 的 rewardGoodsList 到 rewardConf，_conditionParams 到 conditionParam
    form.strategies.forEach((item) => {
      if (item.strategy) {
        const goodsList = item._rewardGoods || [];
        item.strategy.rewardConf = goodsList.length > 0 ? JSON.stringify({ rewardGoods: goodsList }) : '';

        const condParams = item.strategy._conditionParams;
        item.strategy.conditionParam = condParams && Object.keys(condParams).length > 0 ? JSON.stringify(condParams) : '';
        delete item.strategy._conditionParams;
        delete item._rewardGoods;
      }
    });

    try {
      await saveRecallConfig(form);
      loadConfig();
      EleMessage.success(t('welfare.userRecall.saveSuccess'));
    } catch (error) {
      const message = error instanceof Error ? error.message : t('welfare.userRecall.saveFailed');
      EleMessage.error(message);
    }
  };

  // 发送到服务器
  const sendServer = () => {
    reloadRecall()
      .then((msg) => {
        EleMessage.success(msg || t('welfare.userRecall.sendSuccess'));
      })
      .catch((e) => {
        EleMessage.error(e.message);
      });
  };

  // 判断 _conditionParams 是否有有效数据
  const hasConditionParam = (params: Record<string, number> | undefined) => {
    return params && Object.keys(params).length > 0 && Object.values(params).some((v) => v !== undefined && v !== null);
  };

  watch(timeRange, (value) => {
    if (form.countryConfig) {
      form.countryConfig.startTime = value?.[0] || '';
      form.countryConfig.endTime = value?.[1] || '';
    }
  });

  // watch(smsMuteRange, (value) => {
  //   if (form.countryConfig) {
  //     form.countryConfig.smsMuteStart = value?.[0] || '';
  //     form.countryConfig.smsMuteEnd = value?.[1] || '';
  //   }
  // });

  // watch(appPushMuteRange, (value) => {
  //   if (form.countryConfig) {
  //     form.countryConfig.appPushMuteStart = value?.[0] || '';
  //     form.countryConfig.appPushMuteEnd = value?.[1] || '';
  //   }
  // });

  // watch(inAppMuteRange, (value) => {
  //   if (form.countryConfig) {
  //     form.countryConfig.inAppMuteStart = value?.[0] || '';
  //     form.countryConfig.inAppMuteEnd = value?.[1] || '';
  //   }
  // });

  onMounted(() => {
    loadConfig();
  });
</script>
<style lang="scss" scoped>
  .box {
    padding: 16px;
    // border: 2px solid #cccbcb;
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

  .sub-title2 {
    font-size: 15px;
    font-weight: bold;
    margin: 8px 0;
  }
  ::v-deep .el-form-item__label {
    line-height: 1;
    align-items: center;
  }
</style>
