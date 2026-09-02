<template>
  <el-dialog v-model="visible" :title="`${isEdit ? '编辑' : '新增'}第 ${dayItem.dayNo} 天配置`"  top="0vh"  :before-close="handleClose" width="70%" >
    <el-form ref="formRef" :model="dayItem" :label-width="120">
      <el-row :gutter="20">
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <!-- 天数 -->
          <el-form-item label="第几天" prop="dayNo" :rules="[{ required: true, message: '请输入天数', trigger: 'blur' }]">
            <el-input-number v-model="dayItem.dayNo" :controls="false" :min="1" :placeholder="t('common.placeholder.input')" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <!-- 奖励名称 -->
          <el-form-item label="奖励名称" prop="rewardName">
            <el-input v-model="dayItem.rewardName" :placeholder="t('common.placeholder.input')" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <!-- 奖励限制 -->
          <el-form-item label="奖励限制" prop="rewardLimit">
            <el-input-number v-model="dayItem.rewardLimit" :controls="false" :min="0" placeholder="0=不限" style="width: 100%" />
            <span style="margin-left: 8px; color: #999; font-size: 12px">0表示不限制</span>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <!-- 奖励图标 -->
          <el-form-item label="图标URL" prop="rewardIconUrl" style="margin-bottom: 0;">
            <Image-upload
              :key="`day-icon-${dayItem.dayNo}`"
              :limit="1"
              :model-value="dayItem.rewardIconUrl ?? ''"
              @update:model-value="(val: string) => (dayItem.rewardIconUrl = val)"
              accept="image/*"
              :item-style="{
                width: '120px',
                height: '120px',
                background: 'var(--el-fill-color-lighter)',
                '--ele-upload-list-padding': 0
              }"
              :button-style="{ width: '120px', height: '120px' }"
              category="1"
              fileName="activitys"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 奖励物品配置 -->
      <div class="sub-title">奖励物品</div>
      <ActivityRewardGoods ref="rewardGoodsRef" v-model="dayItem.rewardGoods!" actTypeEnum="REGISTER_BONUS" />

      <!-- 推送策略配置 -->
      <div class="sub-title">推送策略</div>
      <!-- <ActivityPushStrategy v-model="dayItem.pushStrategies!" :country-code="countryCode" /> -->
      <div v-for="(strategy, sIdx) in dayItem.pushStrategies" :key="strategy.id ?? sIdx" style="margin-bottom: 16px">
        <!-- <el-input v-model="strategy.strategyName" placeholder="策略名称" size="small" style="width: 200px; margin-bottom: 8px" /> -->
        <ActivityPush v-model="strategy.pushes" :country-code="countryCode" :strategy-id="strategy.id" />
      </div>
    </el-form>

    <template #footer>
      <el-button @click="handleClose">{{ t('action.cancel') }}</el-button>
      <el-button type="primary" @click="handleSave">{{ t('action.confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, watch, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { EleMessage } from 'ele-admin-plus/es';
  import { ElForm } from 'element-plus';
  import ActivityRewardGoods from '@/components/ActivityRewardGoods/index.vue';
  // import ActivityPushStrategy from '@/components/ActivityPushStrategy/index.vue';
  import ActivityPush from '@/components/ActivityPush/index.vue';
  import type { RegisterDailyBonusDayConfigVO } from '@/api/welfare/model/registerDailyBonus';
  import ImageUpload from '@/components/ImageUpload/index.vue';
  const { t } = useI18n();
  const formRef = ref<InstanceType<typeof ElForm> | null>(null);
  const rewardGoodsRef = ref<InstanceType<typeof ActivityRewardGoods> | null>(null);

  const props = defineProps<{
    modelValue: boolean;
    data?: RegisterDailyBonusDayConfigVO;
    countryCode?: number;
    isEdit?: boolean;
  }>();

  const isEdit = computed(() => props.isEdit !== false);

  const emit = defineEmits<{
    (e: 'update:modelValue', val: boolean): void;
    (e: 'confirm', val: RegisterDailyBonusDayConfigVO): void;
  }>();

  const visible = ref(false);
  const dayItem = ref<RegisterDailyBonusDayConfigVO>({
    dayNo: 1,
    rewardName: '',
    rewardIconUrl: '',
    rewardLimit: 0,
    rewardGoods: [],
    pushStrategies: []
  });

  watch(
    () => props.modelValue,
    (val) => {
      visible.value = val;
      if (val && props.data) {
        dayItem.value = JSON.parse(
          JSON.stringify({
            dayNo: props.data.dayNo,
            rewardName: props.data.rewardName || '',
            rewardIconUrl: props.data.rewardIconUrl || '',
            rewardLimit: props.data.rewardLimit || 0,
            rewardGoods: props.data.rewardGoods || [],
            pushStrategies: props.data.pushStrategies || []
          })
        );
      }
    }
  );

  watch(visible, (val) => {
    emit('update:modelValue', val);
  });

  const handleClose = () => {
    visible.value = false;
  };

  const handleSave = () => {
    formRef.value?.validate((valid) => {
      if (!valid) {
        EleMessage.error('请完善配置信息');
        return;
      }
      // 校验奖励物品
      const validation = rewardGoodsRef.value?.validate();
      if (validation && !validation.valid) {
        EleMessage.error(validation.message);
        return;
      }
      emit('confirm', { ...dayItem.value });
      visible.value = false;
    });
  };
</script>

<style lang="scss" scoped>
  .sub-title {
    font-size: 16px;
    font-weight: bold;
    margin: 16px 0 8px;
    &::before {
      content: '';
      display: inline-block;
      width: 4px;
      min-height: 20px;
      height: 100%;
      background-color: #1677ff;
      vertical-align: -5px;
      margin-right: 5px;
    }
  }
</style>
