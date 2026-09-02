<template>
  <div>
    <ele-card :bordered="false" style="margin: 0" body-class="card" :body-style="{ padding: '0px' }">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="130px">
        <!-- 基础配置 -->
        <ActivityBaseConfig ref="baseConfigRef" v-model="form" :get-api="props.getApi" @loaded="handleBaseLoaded" />
        <!-- 签到活动专属字段 -->
        <el-row :gutter="16" v-if="props.actTypeEnum === 'SIGN_IN'">
          <el-col :md="8" :sm="24" :xs="24">
            <el-form-item :label="t('MultiActivityConfig.accumulateThreshold')" prop="rechargeThreshold">
              <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="form.configValue!.rechargeThreshold" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24" :xs="24">
            <el-form-item :label="t('MultiActivityConfig.rechargeWindowDays')" prop="rechargeWindowDays">
              <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" :max="30" v-model="form.configValue!.rechargeWindowDays" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24" :xs="24">
            <el-form-item :label="t('MultiActivityConfig.l1MaxDays')" prop="l1MaxDays">
              <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" :max="7" v-model="form.configValue!.l1MaxDays" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 动态渲染多个配置区块 -->
        <div v-for="confKey in props.configKeys" :key="confKey" class="box">
          <div class="sub-title">{{ props.configLabels[confKey] || confKey }}:</div>
          <!-- 只在配置已初始化后渲染 -->
          <template v-if="multiConf[confKey]">
            <div class="sub-title3">{{t('activityConfig.limitConfig.title')}}:</div>
            <!-- 非三连冲-第一次充值配置时显示 -->
            <el-row :gutter="16" v-if="confKey != 'repayFirst'">
              <el-col :md="8" :sm="24" :xs="24">
                <el-form-item :label="t('activityConfig.limitConfig.ipLimit')" :prop="`multiConf.${confKey}.ipLimit`">
                  <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="multiConf[confKey].ipLimit" style="width: 100%" />
                </el-form-item>
              </el-col>
              <el-col :md="8" :sm="24" :xs="24">
                <el-form-item :label="t('activityConfig.limitConfig.ipPeriod')" :prop="`multiConf.${confKey}.ipPeriod`">
                  <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="multiConf[confKey].ipPeriod" style="width: 100%" />
                </el-form-item>
              </el-col>
              <el-col :md="8" :sm="24" :xs="24">
                <el-form-item :label="t('activityConfig.limitConfig.deviceLimit')" :prop="`multiConf.${confKey}.deviceLimit`">
                  <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="multiConf[confKey].deviceLimit" style="width: 100%" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="16">
              <el-col :md="8" :sm="24" :xs="24"  v-if="confKey != 'repayFirst'">
                <el-form-item :label="t('activityConfig.limitConfig.devicePeriod')" :prop="`multiConf.${confKey}.devicePeriod`">
                  <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="multiConf[confKey].devicePeriod" style="width: 100%" />
                </el-form-item>
              </el-col>
              <el-col :md="8" :sm="24" :xs="24" v-if="confKey != 'repayFirst'">
                <el-form-item :label="t('activityConfig.limitConfig.rewardLimit')" :prop="`multiConf.${confKey}.rewardLimit`">
                  <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="multiConf[confKey].rewardLimit" style="width: 100%" />
                </el-form-item>
              </el-col>
              <!-- 邀请拉新 - 邀请人累计充值奖励- 显示：累计充值阈值 -->
              <el-col :md="8" :sm="24" :xs="24" v-if="confKey === 'inviterAccumulatePay'">
                <el-form-item :label="t('MultiActivityConfig.accumulateThreshold')" :prop="`multiConf.${confKey}.accumulateThreshold`">
                  <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="(multiConf[confKey] || {}).accumulateThreshold" style="width: 100%" />
                </el-form-item>
              </el-col>
              <!-- 三连充 - 第一/二/三次充值配置 - 显示：最小充值金额 -->
              <el-col :md="8" :sm="24" :xs="24" v-if="confKey === 'repaySecond' || confKey === 'repayThird' || confKey === 'repayFirst'">
                <el-form-item :prop="`multiConf.${confKey}.minRechargeAmount`">
                  <template #label>
                    <span style="color: #f56c6c; margin-right: 4px">*</span>
                    {{ t('MultiActivityConfig.minRechargeAmount') }}
                  </template>
                  <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="1" v-model="(multiConf[confKey] || {}).minRechargeAmount" style="width: 100%" />
                </el-form-item>
              </el-col>
               <!--  三连充 - 第二/三次充值配置 - 显示：建议充值档位 -->
               <el-col :md="8" :sm="24" :xs="24"  v-if="confKey === 'repaySecond' || confKey === 'repayThird'">
                <el-form-item :prop="`multiConf.${confKey}.suggestPayTiers`">
                  <template #label>
                    <span style="color: #f56c6c; margin-right: 4px">*</span>
                    {{ t('MultiActivityConfig.suggestPayTiers') }}
                  </template>
                  <el-input :placeholder="'[100,200,500,800,1000]'" v-model="suggestPayTiersInput[confKey]" />
                  <div>数字数组，格式如：[100,200,500]</div>
                </el-form-item>
              </el-col>
               <!--  三连充 - 顺利完成配置 - 倒计时 -->
               <el-col :md="8" :sm="24" :xs="24" v-if="confKey === 'repayUltimate'">
                <el-form-item :label="t('MultiActivityConfig.deadlineHours')" :prop="`multiConf.${confKey}.deadlineHours`">
                  <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="(multiConf[confKey] || {}).deadlineHours" style="width: 100%" />
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 奖励物品表格 -->
            <!-- <div class="sub-title3"> {{ t('MultiActivityConfig.rewardGoodsConfig') }}:</div> -->
            <el-row :gutter="16">
              <el-col :span="24">
                <ActivityRewardGoods :ref="(el: any) => setActivityRewardGoodsRef(el, confKey)" v-model="multiRewardGoodsList[confKey]" />
              </el-col>
            </el-row>
            <!-- 推送表格 -->
            <el-row :gutter="16">
              <el-col :span="24">
                <ActivityPush v-for="strategy in pushStrategiesBySubType[confKey] || []" :key="strategy.id" v-model="strategy.pushes" :strategy-id="strategy.id" :act-type-enum="props.actTypeEnum"/>
              </el-col>
            </el-row>
          </template>
        </div>
      </el-form>
      <div style="text-align: left; padding: 20px 0">
        <el-button type="primary" @click="save">{{ t('action.save') }}</el-button>
        <el-popconfirm :title="t('common.sureSend')" @confirm="sendServer()">
          <template #reference>
            <el-button type="danger" class="ele-btn-icon">
              <span>{{ t('action.send') }}</span>
            </el-button>
          </template>
        </el-popconfirm>
      </div>
    </ele-card>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { EleMessage } from 'ele-admin-plus/es';
  import { ElForm } from 'element-plus';
  import type { MultiActivityConfigProps, RegisterBonusRequest, RewardGoods, ActSubConf } from './types';
  import ActivityRewardGoods from '@/components/ActivityRewardGoods/index.vue';
  import ActivityPush from '@/components/ActivityPush/index.vue';
  import ActivityBaseConfig from '@/components/ActivityBaseConfig/index.vue';

  const { t } = useI18n();
  const props = defineProps<MultiActivityConfigProps>();

  const formRef = ref<InstanceType<typeof ElForm> | null>(null);
  const baseConfigRef = ref<any>(null);
  const form = ref<RegisterBonusRequest>({
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
    pushStrategies: [],
    configValue: {
      jsonType: '',
      rechargeWindowDays: undefined,
      rechargeThreshold: undefined,
      l1MaxDays: undefined,
      subActRewardConf: {}
    }
  });
  // 多配置区块（每个配置键对应一个 ActSubConf）
  const multiConf = ref<Record<string, ActSubConf>>({});

  // 建议充值档位输入框的字符串绑定（用于输入 [100,200,500] 格式）
  const suggestPayTiersInput = ref<Record<string, string>>({});

  // 多奖励物品列表（每个配置键对应一个奖励物品数组）
  const multiRewardGoodsList = ref<Record<string, RewardGoods[]>>({});

  // 按 subType 分组缓存推送策略，避免模板 v-for 中重复 filter
  const pushStrategiesBySubType = computed(() => {
    const map: Record<string, NonNullable<typeof form.value.pushStrategies>[number][]> = {};
    (form.value.pushStrategies || []).forEach((s) => {
      if (!s.subType) return;
      if (!map[s.subType]) map[s.subType] = [];
      map[s.subType].push(s);
    });
    return map;
  });

  // 存储每个配置键对应的 ActivityRewardGoods ref
  const rewardGoodsTableRefs = ref<Record<string, InstanceType<typeof ActivityRewardGoods> | null>>({});

  // 设置 ActivityRewardGoods ref
  const setActivityRewardGoodsRef = (el: any, confKey: string) => {
    if (el) {
      rewardGoodsTableRefs.value[confKey] = el;
    }
  };

  // 初始化所有配置区块
  const initMultiConf = () => {
    props.configKeys.forEach((key) => {
      multiConf.value[key] = {
        deadlineHours: undefined,
        ipLimit: undefined,
        ipPeriod: undefined,
        deviceLimit: undefined,
        devicePeriod: undefined,
        rewardLimit: undefined,
        rewardGoods: [],
        accumulateThreshold: undefined,
        minRechargeAmount: undefined,
        suggestPayTiers: undefined,
      };
      multiRewardGoodsList.value[key] = [];
      suggestPayTiersInput.value[key] = '';
    });
  };

  // 表单验证规则
  const rules = {
    countryCode: [{ required: true, message: '请选择国家', trigger: 'change' }],
    jumpId: [{ required: true, message: '请选择', trigger: 'change' }]
  };

  // 基础配置加载完成后，填充活动专属的多子配置
  const handleBaseLoaded = (data: any) => {
    if (!data) return;
    // 填充多个子配置
    if (data.configValue && data.configValue.subActRewardConf) {
      props.configKeys.forEach((key) => {
        const confData = data.configValue.subActRewardConf[key];
        if (confData) {
          multiConf.value[key] = { ...confData };
          multiRewardGoodsList.value[key] = confData.rewardGoods || [];
          // 回显建议充值档位：数组转字符串
          if (Array.isArray(confData.suggestPayTiers)) {
            suggestPayTiersInput.value[key] = JSON.stringify(confData.suggestPayTiers);
          } else {
            suggestPayTiersInput.value[key] = '';
          }
        }
        // 如果后端没有返回该配置，保持初始化时的默认值即可
      });
    }
  };

  // 发送到服务器
  const sendServer = () => {
    const loading = EleMessage.loading({
      message: t('common.loading'),
      plain: true
    });
    props
      .sendApi()
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
        return;
      }

      // 校验第二/三次充值的最小充值金额和建议充值档位必填
      for (const confKey of props.configKeys) {
        if (confKey === 'repaySecond' || confKey === 'repayThird') {
          if (!multiConf.value[confKey]?.minRechargeAmount) {
            EleMessage.error(`【${props.configLabels[confKey]}】最小充值金额不能为空`);
            return;
          }
          if (!suggestPayTiersInput.value[confKey]?.trim()) {
            EleMessage.error(`【${props.configLabels[confKey]}】建议充值档位不能为空`);
            return;
          }
        }
      }

      // 校验所有配置区块的奖励物品表格
      for (const confKey of props.configKeys) {
        const tableRef = rewardGoodsTableRefs.value[confKey];
        if (tableRef) {
          const validation = tableRef.validate();
          if (!validation.valid) {
            EleMessage.error(`【${props.configLabels[confKey]}】${validation.message}`);
            return;
          }
        }
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

      // 组装多个配置区块
      const subActRewardConf: Record<string, any> = {};
      for (const confKey of props.configKeys) {
        const confData = { ...multiConf.value[confKey] };

        // 只有 inviterAccumulatePay 才保留 accumulateThreshold 字段
        if (confKey !== 'inviterAccumulatePay') {
          delete confData.accumulateThreshold;
        }

        // 解析建议充值档位：字符串转数组（仅 repaySecond/repayThird 需要校验格式）
        const tiersStr = suggestPayTiersInput.value[confKey]?.trim();
        if (tiersStr) {
          try {
            const parsed = JSON.parse(tiersStr);
            if (Array.isArray(parsed) && parsed.length > 0 && parsed.every((v) => typeof v === 'number' && v > 0)) {
              confData.suggestPayTiers = parsed;
            } else if (confKey === 'repaySecond' || confKey === 'repayThird') {
              EleMessage.error(`【${props.configLabels[confKey]}】建议充值档位格式错误，请输入纯数字数组，如：[100,200,500]`);
              loading.close();
              return;
            }
          } catch {
            if (confKey === 'repaySecond' || confKey === 'repayThird') {
              EleMessage.error(`【${props.configLabels[confKey]}】建议充值档位格式错误，请输入纯数字数组，如：[100,200,500]`);
              loading.close();
              return;
            }
          }
        } else {
          confData.suggestPayTiers = undefined;
        }

        subActRewardConf[confKey] = {
          ...confData,
          rewardGoods: (multiRewardGoodsList.value[confKey] || []).filter((item) => item.goodsId !== undefined)
        };
      }

      // 组装 configValue，保持 jsonType、SIGN_IN活动专属字段和 subActRewardConf 结构
      const configValue: any = {
        jsonType: form.value.configValue?.jsonType || 'ActRewardConf',
        subActRewardConf
      };

      // 只有 SIGN_IN 活动才保存这三个专属字段
      if (props.actTypeEnum === 'SIGN_IN') {
        configValue.rechargeThreshold = form.value.configValue?.rechargeThreshold;
        configValue.rechargeWindowDays = form.value.configValue?.rechargeWindowDays;
        configValue.l1MaxDays = form.value.configValue?.l1MaxDays;
      }

      // 组装提交数据
      const params: RegisterBonusRequest = {
        ...form.value,
        imgUrl,
        startDate,
        endDate,
        showStartDate,
        showEndDate,
        configValue
      };
      props
        .saveApi(params)
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
    // 先初始化所有配置区块
    initMultiConf();
    // 再加载数据
    baseConfigRef.value?.loadingAppConf().then(handleBaseLoaded);
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
    font-size: 15px;
    font-weight: bold;
    margin: 8px 0;
  }
  ::v-deep .el-form-item__label {
    line-height: 1;
    align-items: center;
  }
</style>
