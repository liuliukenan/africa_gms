<template>
  <div>
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px">
      <strong>{{ t('activityConfig.rewardConfig.title') }}</strong>
      <el-button type="primary" size="small" @click="handleAddRow">{{ t('welfare.userRecall.reward.add') }}</el-button>
    </div>
    <el-table :data="goodsList" border style="width: 100%">
      <!-- 奖励物品类型 -->
      <el-table-column :label="t('activityConfig.rewardConfig.goodsType')" prop="goodsType" align="center">
        <template #default="scope">
          <dict-data :code="'goods_type'" v-model="scope.row.goodsType" value-type="number" @change="handleGoodsTypeChange(scope.row)"  size="small"/>
        </template>
      </el-table-column>
      <!-- 模版 -->
      <el-table-column :label="t('activityConfig.rewardConfig.template')" prop="goodsId" align="center">
        <template #default="scope">
          <!-- cash：不调模版，goodsId 显示 0 -->
          <span v-if="scope.row.goodsType === 0">--</span>
          <!-- group：钱包模版， gameId==0 -->
          <WallteSelect v-else-if="scope.row.goodsType === 1" v-model="scope.row.goodsId" filter-type="group" :label="scope.row.goodsName" size="small" @select-row="(row) => onSelectGoods(row, scope.row)"/>
          <!-- game：钱包模版，gameId>0 -->
          <WallteSelect v-else-if="scope.row.goodsType === 2" v-model="scope.row.goodsId" filter-type="game" :label="scope.row.goodsName" size="small" @select-row="(row) => onSelectGoods(row, scope.row)"/>
          <!-- freeGame：免费游戏模版 -->
          <FreeGameSelect v-else-if="scope.row.goodsType === 3" v-model="scope.row.goodsId"  size="small"/>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <!-- 奖励类型 -->
      <el-table-column :label="t('activityConfig.rewardConfig.rewardType')" prop="rewardType" align="center">
        <template #default="scope">
          <!-- freeGame：奖励类型固定为固定奖励，不可更改 -->
          <span v-if="scope.row.goodsType === 3">{{ t('activityConfig.rewardConfig.fixedReward') }}</span>
          <!-- 奖励金额由档位决定的活动：不需要选择奖励类型 -->
          <span v-else-if="hideRewardType">--</span>
          <el-select v-else v-model="scope.row.rewardType" :placeholder="t('common.placeholder.select')" @change="handleRewardTypeChange(scope.row)" style="width: 100%" size="small">
            <el-option :label="t('activityConfig.rewardConfig.fixedReward')" :value="0" />
            <el-option :label="t('activityConfig.rewardConfig.ratioReward')" :value="1" />
            <el-option :label="t('activityConfig.rewardConfig.weightReward')" :value="2" />
          </el-select>
        </template>
      </el-table-column>
      <!-- 固定奖励数量 -->
      <el-table-column :label="t('activityConfig.rewardConfig.fixedRewardAmount')" prop="amount" align="center">
        <template #default="scope">
          <span v-if="scope.row.goodsType === 3">1</span>
          <span v-else-if="scope.row.rewardType !== 0 || hideRewardType">--</span>
          <el-input-number v-else :controls="false" v-model="scope.row.amount" :placeholder="t('common.placeholder.input')" style="width: 100%"  size="small"/>
        </template>
      </el-table-column>
      <!-- 奖励比例 -->
      <el-table-column :label="t('activityConfig.rewardConfig.rewardRatio')" prop="amountRatio" align="center" v-if="actTypeEnum != 'vipDailyRebate' && actTypeEnum !== 'APK_LOGIN_BONUS'">
        <template #default="scope">
          <span v-if="scope.row.rewardType !== 1 || scope.row.goodsType === 3">--</span>
          <el-input-number v-else :controls="false" v-model="scope.row.amountRatio" :precision="4" :min="0" :max="1" :placeholder="t('common.placeholder.input')" style="width: 100%"  size="small"/>
        </template>
      </el-table-column>
      <!-- 最小限制 -->
      <el-table-column :label="t('activityConfig.rewardConfig.minLimit')" prop="minLimit" align="center">
        <template #default="scope">
          <span v-if="scope.row.rewardType !== 1 || scope.row.goodsType === 3">--</span>
          <el-input-number v-else :controls="false" v-model="scope.row.minLimit" :placeholder="t('common.placeholder.input')" style="width: 100%"  size="small"/>
        </template>
      </el-table-column>
      <!-- 最大限制 -->
      <el-table-column :label="t('activityConfig.rewardConfig.maxLimit')" prop="maxLimit" align="center">
        <template #default="scope">
          <span v-if="scope.row.rewardType !== 1 || scope.row.goodsType === 3">--</span>
          <el-input-number v-else :controls="false" v-model="scope.row.maxLimit" :placeholder="t('common.placeholder.input')" style="width: 100%"  size="small"/>
        </template>
      </el-table-column>
      <!-- 流水倍数 -->
      <el-table-column :label="t('activityConfig.rewardConfig.flowMultiple')" prop="flowMultiple" align="center">
        <template #default="scope">
          <el-input-number :controls="false" v-model="scope.row.flowMultiple" :placeholder="t('common.placeholder.input')" style="width: 100%"  size="small"/>
        </template>
      </el-table-column>
      <!-- 邮件模板 -->
      <el-table-column :label="t('activityConfig.rewardConfig.mailTemplate')" prop="mailConfId" align="center">
        <template #default="scope">
          <!-- <MailTextConfSelectTable v-model="scope.row.mailConfId"  size="small"/> -->
          <MailSelect v-model="scope.row.mailConfId" size="small" />
        </template>
      </el-table-column>
      <!-- Tips模板 -->
      <el-table-column :label="t('activityConfig.rewardConfig.tipsTemplate')" prop="tipsConfId" align="center">
        <template #default="scope">
          <TipsSelect v-model="scope.row.tipsConfId" size="small"/>
        </template>
      </el-table-column>
      <!-- 过期小时 -->
      <el-table-column :label="t('activityConfig.rewardConfig.expireHours')" prop="expire" align="center">
        <template #default="scope">
          <span v-if="scope.row.goodsType !== 4 && scope.row.goodsType !== 3">--</span>
          <el-input-number v-else :controls="false" v-model="scope.row.expire" :placeholder="t('common.placeholder.input')" style="width: 100%"  size="small"/>
        </template>
      </el-table-column>
      <el-table-column :label="t('action.action')" width="80" align="center" fixed="right">
        <template #default="scope">
          <el-button type="danger" link @click="handleDeleteRow(scope.$index)"  size="small">{{ t('action.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <WeightRewardTable v-if="activeWeightIndex >= 0" v-model="activeWeightList" />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import type { ActivityRewardGoodsProps, ActivityRewardGoodsEmits, RewardGoods } from './types';
  import type { WeightList } from '@/api/welfare/model/registerGive';
  import DictData from '@/components/DictData/index.vue';
  import WallteSelect from '@/components/WallteSelect/index.vue';
  import FreeGameSelect from '@/components/FreeGameSelect/index.vue';
  // import MailTextConfSelectTable from '@/views/push/globalMail/components/mail-text-select-table.vue';
  import TipsSelect from '@/components/TipsSelect/index.vue';
  import MailSelect from '@/components/MailSelect/index.vue';
  import WeightRewardTable from '@/components/WeightRewardTable/index.vue';
  const { t } = useI18n();

  const props = withDefaults(defineProps<ActivityRewardGoodsProps>(), {
    actTypeEnum: undefined
  });
  const emit = defineEmits<ActivityRewardGoodsEmits>();

  /** 奖励金额由档位决定的活动：隐藏「奖励类型」和「固定奖励数量」，不可配置 */
  const hideRewardType = computed(() => {
    const type = props.actTypeEnum;
    return type === 'CASH_WHEEL' || type === 'DAILY_RECHARGE_SURPRISE';
  });

  // 使用计算属性实现双向绑定
  const goodsList = computed<RewardGoods[]>({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  });

  /** 当前选中的权重奖励行索引 */
  const activeWeightIndex = computed(() => goodsList.value.findIndex((item) => item.rewardType === 2));

  /** 当前权重奖励行的档位列表（双向绑定） */
  const activeWeightList = computed<WeightList[]>({
    get: () => {
      const index = activeWeightIndex.value;
      return index >= 0 ? goodsList.value[index].weightList || [] : [];
    },
    set: (val) => {
      const index = activeWeightIndex.value;
      if (index >= 0) {
        goodsList.value[index].weightList = val;
      }
    }
  });

  /**
   * 钱包模版选中时，回写名称到当前行，便于持久化回显
   */
  const onSelectGoods = (walletRow: any, goodsRow: RewardGoods) => {
    goodsRow.goodsName = walletRow?.name || '';
  };

  /**
   * 切换奖励物品类型时重置 goodsId（cash 时默认设为 0；freeGame 时 amount 固定为 1）
   */
  const handleGoodsTypeChange = (row: RewardGoods) => {
    row.goodsId = Number(row.goodsType) === 0 ? 0 : undefined;
    // freeGame：固定奖励数量固定为 1，锁定 rewardType=0
    if (Number(row.goodsType) === 3) {
      row.rewardType = 0;
      row.amount = 1;
    } else {
      row.amount = undefined;
    }
  };

  /**
   * 切换奖励类型时清空相关字段
   */
  const handleRewardTypeChange = (row: RewardGoods) => {
    row.amountRatio = undefined;
    row.maxLimit = undefined;
    row.minLimit = undefined;
    row.amount = undefined;
    if (row.rewardType === 2) {
      row.weightList = row.weightList || [];
    } else {
      row.weightList = undefined;
    }
  };

  /**
   * 添加奖励物品行
   */
  const handleAddRow = () => {
    const newRow: RewardGoods = {
      goodsId: undefined,
      goodsName: '',
      goodsType: undefined,
      rewardType: undefined,
      amount: undefined,
      amountRatio: undefined,
      maxLimit: undefined,
      minLimit: undefined,
      flowMultiple: undefined,
      mailConfId: undefined,
      tipsConfId: undefined,
      expire: undefined
    };
    goodsList.value.push(newRow);
  };

  /**
   * 删除奖励物品行
   */
  const handleDeleteRow = (index: number) => {
    goodsList.value.splice(index, 1);
  };

  /**
   * 校验奖励物品表格
   * @returns 校验是否通过
   */
  const validate = (): { valid: boolean; message?: string } => {
    for (let i = 0; i < goodsList.value.length; i++) {
      const item = goodsList.value[i];
      // goodsType 为 1(group)、2(game)、3(freeGame) 时，模版(goodsId)必填
      if ([1, 2, 3].includes(Number(item.goodsType)) && !item.goodsId) {
        return {
          valid: false,
          message: `第${i + 1}行：${t('activityConfig.validation.templateRequired')}`
        };
      }
      // cashWheel 等奖励金额由档位决定的活动：不需要奖励类型和数额
      if (hideRewardType.value) {
        item.amount = undefined;
        item.amountRatio = undefined;
        item.maxLimit = undefined;
        item.minLimit = undefined;
        continue;
      }
      if (item.rewardType === 0) {
        // 固定奖励：freeGame 数量固定为 1，其他情况需手动填写
        if (String(item.goodsType) === '3') {
          item.amount = 1;
        } else if (!item.amount) {
          return {
            valid: false,
            message: `第${i + 1}行：${t('activityConfig.validation.fixedRewardAmountRequired')}`
          };
        }
        item.amountRatio = undefined;
        item.maxLimit = undefined;
        item.minLimit = undefined;
        item.weightList = undefined;
      } else if (item.rewardType === 1) {
        // 比例奖励：比例、最大、最小必填，清空固定数量
        // vipDailyRebate 不强制校验奖励比例（因为返利比例以下方的返利比例配置为准），但maxLimit和minLimit仍需校验
        if (props.actTypeEnum !== 'vipDailyRebate' && !item.amountRatio) {
          return {
            valid: false,
            message: `第${i + 1}行：${t('activityConfig.validation.rewardRatioRequired')}`
          };
        }
        if (!item.maxLimit) {
          return {
            valid: false,
            message: `第${i + 1}行：${t('activityConfig.validation.maxLimitRequired')}`
          };
        }
        if (item.minLimit == null || item.minLimit < 0) {
          return {
            valid: false,
            message: `第${i + 1}行：${t('activityConfig.validation.minLimitRequired')}`
          };
        }
        item.amount = undefined;
        item.weightList = undefined;
      } else if (item.rewardType === 2) {
        // 权重奖励：校验档位列表
        item.amount = undefined;
        item.amountRatio = undefined;
        item.maxLimit = undefined;
        item.minLimit = undefined;
        if (!item.weightList || item.weightList.length === 0) {
          return {
            valid: false,
            message: `请新增奖励档位配置`
          };
        }
        for (let j = 0; j < item.weightList.length; j++) {
          const weightItem = item.weightList[j];
          if (!weightItem.amount || weightItem.amount <= 0) {
            return {
              valid: false,
              message: `请输入奖励档位配置-第${j + 1}行：${t('activityConfig.rewardConfig.weightRewardAmount')}`
            };
          }
          if (weightItem.weight == null || weightItem.weight <= 0) {
            return {
              valid: false,
              message: `请输入奖励档位配置-第${j + 1}行：${t('activityConfig.rewardConfig.weightRewardWeight')}`
            };
          }
        }
      } else {
        return {
          valid: false,
          message: `第${i + 1}行：${t('activityConfig.validation.selectRewardType')}`
        };
      }
    }
    return { valid: true };
  };

  // 暴露方法供父组件调用
  defineExpose({
    validate
  });
</script>

