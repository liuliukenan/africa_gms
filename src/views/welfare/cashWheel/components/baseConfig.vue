<template>
  <ele-page>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="140px">
      <!-- ==================== 基础信息 ==================== -->
      <div class="sub-title">{{ t('welfare.cashWheel.baseInfo') }}</div>
      <el-row :gutter="16">
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item :label="t('welfare.cashWheel.country')" prop="countryCode">
            <el-select v-model="form.countryCode" :placeholder="t('common.placeholder.select')" style="width: 100%" @change="handleCountryChange">
              <el-option v-for="item in countryOptions" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item :label="t('welfare.cashWheel.activityName')" prop="name">
            <el-input clearable :placeholder="t('common.placeholder.input')" v-model="form.name" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item :label="t('welfare.cashWheel.activitySubTitle')" prop="subTitle">
            <el-input clearable :placeholder="t('common.placeholder.input')" v-model="form.subTitle" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item :label="t('welfare.cashWheel.activityStatus')" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :value="true">{{ t('welfare.cashWheel.switchOn') }}</el-radio>
              <el-radio :value="false">{{ t('welfare.cashWheel.switchOff') }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item :label="t('welfare.cashWheel.sortNumber')" prop="sortNumber">
            <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="form.sortNumber" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item :label="t('welfare.cashWheel.activityStartTime')" prop="timeArr">
            <el-date-picker v-model="timeArr" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" format="YYYY-MM-DD HH:mm:ss" :range-separator="t('common.time.to')" :start-placeholder="t('common.time.start')" :end-placeholder="t('common.time.end')" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item :label="t('welfare.cashWheel.activityShowTime')" prop="showTimeArr">
            <el-date-picker v-model="showTimeArr" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" format="YYYY-MM-DD HH:mm:ss" :range-separator="t('common.time.to')" :start-placeholder="t('common.time.start')" :end-placeholder="t('common.time.end')" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item :label="t('welfare.cashWheel.activityDescription')" prop="description">
            <el-input clearable :placeholder="t('common.placeholder.input')" v-model="form.description" type="textarea" :rows="3" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item :label="t('welfare.cashWheel.image')" prop="imgUrl">
            <image-upload :limit="1" :model-value="form.imgUrl ?? ''" @update:model-value="(val: string) => (form.imgUrl = val)" accept="image/*" :item-style="{ width: '120px', height: '120px', background: 'var(--el-fill-color-lighter)', '--ele-upload-list-padding': 0 }" :button-style="{ width: '120px', height: '120px' }" category="1" fileName="activitys" />
          </el-form-item>
        </el-col>
      </el-row>

      <!-- ==================== 限制配置 ==================== -->
      <!-- <div class="sub-title">{{ t('welfare.cashWheel.limitConfig') }}</div>
      <el-row :gutter="16">
        <el-col :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('welfare.cashWheel.ipLimit')">
            <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="form.configValue!.ipLimit" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('welfare.cashWheel.ipPeriod')">
            <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="form.configValue!.ipPeriod" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('welfare.cashWheel.deviceLimit')">
            <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="form.configValue!.deviceLimit" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('welfare.cashWheel.devicePeriod')">
            <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="form.configValue!.devicePeriod" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('welfare.cashWheel.rewardLimit')">
            <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="form.configValue!.rewardLimit" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row> -->

      <!-- ====================    全局配置 ==================== -->
      <div class="sub-title">{{ t('welfare.cashWheel.globalConfig') }}</div>
      <el-row :gutter="16">
        <el-col :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('welfare.cashWheel.cycleEnabled')">
            <el-switch v-model="form.configValue!.cycleEnabled" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :xs="24" v-if="form.configValue!.cycleEnabled">
          <el-form-item :label="t('welfare.cashWheel.cycleStartRound')">
            <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="1" v-model="form.configValue!.cycleStartRound" style="width: 100%" />
          </el-form-item>
        </el-col>
        </el-row>
         <el-row :gutter="16">
        <el-col :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('welfare.cashWheel.periodUserClaimLimit')">
            <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" :precision="2" v-model="form.configValue!.periodUserClaimLimit" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('welfare.cashWheel.inviteFirstPayDrawTimes')">
            <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="form.configValue!.inviteFirstPayDrawTimes" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('welfare.cashWheel.sameDeviceValidLimit')">
            <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="form.configValue!.sameDeviceValidLimit" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('welfare.cashWheel.sameIpValidLimit')">
            <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="form.configValue!.sameIpValidLimit" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('welfare.cashWheel.deviceLimitPeriodDays')">
            <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="form.configValue!.deviceLimitPeriodDays" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('welfare.cashWheel.ipLimitPeriodDays')">
            <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="form.configValue!.ipLimitPeriodDays" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('welfare.cashWheel.inviteeTotalRechargeAmount')">
            <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="form.configValue!.inviteeTotalRechargeAmount" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('welfare.cashWheel.inviteeCashNetFlow')">
            <el-input-number clearable :controls="false" :placeholder="t('common.placeholder.input')" :min="0" v-model="form.configValue!.inviteeCashNetFlow" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- ==================== 开放周期列表 ==================== -->
      <div style="display: flex; justify-content: space-between; align-items: center">
        <div class="sub-title"> {{ t('welfare.cashWheel.periods') }}</div>

        <el-button type="primary" size="small" @click="addPeriod" style="margin-left: 16px">{{ t('welfare.cashWheel.addPeriod') }}</el-button>
      </div>
      <el-table :data="form.configValue!.periods" border size="small">
        <el-table-column :label="t('welfare.cashWheel.periodId')" width="120" align="center">
          <template #default="{ row }">
            <div>{{row.id??'--'}}</div>
          </template>
        </el-table-column>
        <el-table-column :label="t('welfare.cashWheel.periodStartTime')" min-width="200">
          <template #default="{ row }">
            <el-date-picker v-model="row.startTime" type="datetime" value-format="YYYY-MM-DD" format="YYYY-MM-DD" :placeholder="t('common.placeholder.select')" style="width: 100%" size="small" />
          </template>
        </el-table-column>
        <el-table-column :label="t('welfare.cashWheel.periodEndTime')" min-width="200">
          <template #default="{ row }">
            <el-date-picker v-model="row.endTime" type="datetime" value-format="YYYY-MM-DD" format="YYYY-MM-DD" :placeholder="t('common.placeholder.select')" style="width: 100%" size="small" />
          </template>
        </el-table-column>
        <el-table-column :label="t('action.action')" width="80" align="center">
          <template #default="{ $index }">
            <el-button type="danger" size="small" link @click="removePeriod($index)">{{ t('action.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- ==================== 轮次配置 ==================== -->
      <div style="display: flex; justify-content: space-between; align-items: center">
        <div class="sub-title">{{ t('welfare.cashWheel.rounds') }}</div>
        <el-button type="primary" size="small" @click="addRound">{{ t('welfare.cashWheel.addRound') }}</el-button>
      </div>
      <el-table :data="form.configValue!.rounds" border size="small">
        <el-table-column :label="t('welfare.cashWheel.round')"  align="center">
          <template #default="{ row }">
            <!-- <el-input-number v-model="row.round" :controls="false" :min="1" size="small" style="width: 100%" /> -->
        <div>第{{row.round}}轮</div> 
        </template>
        </el-table-column>
        <el-table-column :label="t('welfare.cashWheel.rewardAmount')" >
          <template #default="{ row }">
            <el-input-number v-model="row.rewardAmount" :controls="false" :min="0" :precision="2" size="small" style="width: 100%" />
          </template>
        </el-table-column>
        <el-table-column :label="t('welfare.cashWheel.validHours')" >
          <template #default="{ row }">
            <el-input-number v-model="row.validHours" :controls="false" :min="0" size="small" style="width: 100%" />
          </template>
        </el-table-column>
         <el-table-column :label="t('welfare.cashWheel.finishRequiredDrawCount')">
          <template #default="{ row }">
            <el-input-number v-model="row.finishRequiredDrawCount" :controls="false" :min="0" size="small" style="width: 100%" />
          </template>
        </el-table-column>
        <!-- <el-table-column :label="t('welfare.cashWheel.finishDays')">
          <template #default="{ row }">
            <el-input-number v-model="row.finishDays" :controls="false" :min="0" size="small" style="width: 100%" />
          </template>
        </el-table-column> -->
          <el-table-column :label="t('welfare.cashWheel.initialDrawTimes')" >
          <template #default="{ row }">
            <el-input-number v-model="row.initialDrawTimes" :controls="false" :min="0" size="small" style="width: 100%" />
          </template>
        </el-table-column>
         <el-table-column :label="t('welfare.cashWheel.extraFreeCountdownHours')">
          <template #default="{ row }">
            <el-input-number v-model="row.extraFreeCountdownHours" :controls="false" :min="0" size="small" style="width: 100%" />
          </template>
        </el-table-column>
        <el-table-column :label="t('welfare.cashWheel.extraFreeDrawTimes')">
          <template #default="{ row }">
            <el-input-number v-model="row.extraFreeDrawTimes" :controls="false" :min="0" size="small" style="width: 100%" />
          </template>
        </el-table-column>
      
        <el-table-column :label="t('welfare.cashWheel.dailyInviteLimit')" >
          <template #default="{ row }">
            <el-input-number v-model="row.dailyInviteLimit" :controls="false" :min="0" size="small" style="width: 100%" />
          </template>
        </el-table-column>
       
       
        <el-table-column :label="t('welfare.cashWheel.wheelSlots')" align="center">
          <template #default="{ row }">
              <el-button type="primary" size="small" link @click="editWheelSlots(row)">{{ t('action.edit') }}</el-button>
          </template>
        </el-table-column>
        <el-table-column :label="t('welfare.cashWheel.drawConfigs')" align="center">
          <template #default="{ row }">
              <el-button type="primary" size="small" link @click="editDrawConfigs(row)">{{ t('action.edit') }}</el-button>
          </template>
        </el-table-column>
        <el-table-column :label="t('action.action')"  align="center">
          <template #default="{ $index }">
            <el-button type="danger" size="small" link @click="removeRound($index)">{{ t('action.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- ==================== 奖励物品表格 ==================== -->
      <div class="sub-title">{{ t('welfare.cashWheel.rewardGoodsConfig') }}</div>
      <el-row :gutter="16">
        <el-col :span="24">
          <ActivityRewardGoods ref="rewardGoodsTableRef" v-model="rewardGoodsList" actTypeEnum="CASH_WHEEL" />
        </el-col>
      </el-row>

      <!-- ==================== 推送策略 ==================== -->
      <div class="sub-title">{{ t('welfare.cashWheel.pushStrategy') }}</div>
      <div v-for="(strategy, sIdx) in form.pushStrategies" :key="sIdx" class="box">
        <div class="section-header">
          <span class="section-label">{{ strategy.strategyName || `Strategy ${sIdx + 1}` }}</span>
        </div>
        <el-table :data="strategy.pushes || []" border size="small">
          <el-table-column :label="t('welfare.cashWheel.pushName')" min-width="160">
            <template #default="{ row }">
              <el-input v-model="row.pushName" :placeholder="t('common.placeholder.input')" size="small" />
            </template>
          </el-table-column>
          <el-table-column :label="t('welfare.cashWheel.delayValue')" width="110">
            <template #default="{ row }">
              <el-input-number v-model="row.delayValue" :controls="false" :min="0" size="small" style="width: 100%" />
            </template>
          </el-table-column>
          <el-table-column :label="t('welfare.cashWheel.delayUnit')" width="120">
            <template #default="{ row }">
              <el-select v-model="row.delayUnit" size="small" style="width: 100%">
                <el-option :label="t('welfare.userRecall.delayUnitMinutes')" value="MINUTES" />
                <el-option :label="t('welfare.userRecall.delayUnitHours')" value="HOURS" />
                <el-option :label="t('welfare.userRecall.delayUnitDays')" value="DAYS" />
              </el-select>
            </template>
          </el-table-column>
          <!-- <el-table-column :label="t('welfare.cashWheel.needReward')" width="100">
            <template #default="{ row }">
              <el-select v-model="row.needReward" size="small" style="width: 100%">
                <el-option :label="t('action.no')" :value="0" />
                <el-option :label="t('action.yes')" :value="1" />
              </el-select>
            </template>
          </el-table-column> -->
          <el-table-column :label="t('welfare.cashWheel.smsTemplate')" min-width="140">
            <template #default="{ row }">
              <el-select v-model="row.smsTemplateId" :placeholder="t('common.placeholder.select')" size="small" filterable clearable style="width: 100%">
                <el-option v-for="item in smsList" :key="item.id" :label="item.templateName" :value="item.id" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column :label="t('welfare.cashWheel.appTemplate')" min-width="140">
            <template #default="{ row }">
              <el-select v-model="row.appPushTemplateId" :placeholder="t('common.placeholder.select')" size="small" filterable clearable style="width: 100%">
                <el-option v-for="item in appPushTemplates" :key="item.id" :label="item.templateName" :value="item.id" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column :label="t('welfare.cashWheel.inAppTemplate')" min-width="140">
            <template #default="{ row }">
              <MailSelect v-model="row.inAppTemplateId" size="small" />
            </template>
          </el-table-column>
          <el-table-column :label="t('welfare.cashWheel.sortOrder')" width="90">
            <template #default="{ row }">
              <el-input-number v-model="row.sortOrder" :controls="false" :min="0" size="small" style="width: 100%" />
            </template>
          </el-table-column>
          <el-table-column :label="t('welfare.cashWheel.status')" width="100">
            <template #default="{ row }">
              <el-select v-model="row.status" size="small" style="width: 100%">
                <el-option :label="t('welfare.userRecall.strategy.disable')" :value="0" />
                <el-option :label="t('welfare.userRecall.strategy.enable')" :value="1" />
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- ==================== 操作按钮 ==================== -->
      <div style="text-align: left; padding: 20px 0">
        <el-button type="primary" @click="save">{{ t('action.save') }}</el-button>
        <el-popconfirm :title="t('common.sureSend')" @confirm="handleReload">
          <template #reference>
            <el-button type="danger" :loading="reloading">{{ t('action.sendServer') }}</el-button>
          </template>
        </el-popconfirm>
      </div>
    </el-form>
  </ele-page>

  <!-- ==================== 轮盘布局弹窗 ==================== -->
  <WheelSlots v-if="slotDialogVisible" v-model="slotDialogVisible" :act-item-id="wheelSlotsActItemId" :round="wheelSlotsRound" @saved="loadConfig" />

  <!-- ==================== 抽奖命中配置弹窗 ==================== -->
  <DrawConfigs v-if="drawConfigsDialogVisible" v-model="drawConfigsDialogVisible" :act-item-id="drawConfigsActItemId" :round="drawConfigsRound" @saved="loadConfig" />
</template>

<script setup lang="ts">
  import { computed, onMounted, reactive, ref } from 'vue';
  import { ElForm, ElMessage } from 'element-plus';
  import { useI18n } from 'vue-i18n';
  import { useConfigStore } from '@/store/modules/config';
  import ImageUpload from '@/components/ImageUpload/index.vue';
  import ActivityRewardGoods from '@/components/ActivityRewardGoods/index.vue';
  import MailSelect from '@/components/MailSelect/index.vue';
  import WheelSlots from './wheelSlots.vue';
  import DrawConfigs from './drawConfigs.vue';
  import { toDateZone } from '@/utils/utils';
  import { getCashWheelInfo, saveCashWheel, reloadCashWheel } from '@/api/welfare/cashWheelApi';
  import { pageSmsTemplates } from '@/api/platform/smsTemplateApi';
  import { pageAppPushTemplates } from '@/api/platform/appPushTemplateApi';
  import type { CashWheelActConfigVO, RewardGoodsItem } from '@/api/welfare/model/cashWheel';

  const { t } = useI18n();
  const configStore = useConfigStore();
  const formRef = ref<InstanceType<typeof ElForm> | null>(null);
  const rewardGoodsTableRef = ref<InstanceType<typeof ActivityRewardGoods> | null>(null);
  const reloading = ref(false);

  const countryOptions = computed(() => configStore.countryArr || []);

  // 默认国家代码
  const defaultCountryCode = computed(() => configStore.countryArr?.[0]?.code ?? 254);

  // 表单
  const form = reactive<CashWheelActConfigVO>({
    id: undefined,
    countryCode: defaultCountryCode.value,
    name: '',
    subTitle: '',
    imgUrl: '',
    sortNumber: undefined,
    status: true,
    startDate: '',
    endDate: '',
    showStartDate: '',
    showEndDate: '',
    description: '',
    configValue: {
      jsonType: 'CashWheelActConf',
      ipLimit: undefined,
      ipPeriod: undefined,
      deviceLimit: undefined,
      devicePeriod: undefined,
      rewardLimit: undefined,
      rewardGoods: [],
      periods: [],
      rounds: [],
      cycleEnabled: false,
      cycleStartRound: undefined,
      periodUserClaimLimit: undefined,
      inviteFirstPayDrawTimes: undefined,
      sameDeviceValidLimit: undefined,
      sameIpValidLimit: undefined,
      deviceLimitPeriodDays: undefined,
      ipLimitPeriodDays: undefined,
      inviteeTotalRechargeAmount: undefined,
      inviteeCashNetFlow: undefined
    },
    pushStrategies: []
  });

  // 日期范围
  const timeArr = ref<[string, string]>(['', '']);
  const showTimeArr = ref<[string, string]>(['', '']);

  // 奖励物品列表
  const rewardGoodsList = ref<RewardGoodsItem[]>([]);

  // 模板数据
  const smsList = ref<any[]>([]);
  const appPushTemplates = ref<any[]>([]);

  const fetchSmsList = () => {
    pageSmsTemplates({ page: 1, limit: 1000, countryCode: form.countryCode || 254 }).then((res) => {
      if (res && res.list) {
        smsList.value = res.list || [];
      }
    });
  };

  const fetchAppPushTemplates = () => {
    pageAppPushTemplates({ page: 1, limit: 1000, countryCode: form.countryCode || 254 }).then((res) => {
      if (res && res.list) {
        appPushTemplates.value = res.list || [];
      }
    });
  };

  // 表单验证规则
  const rules = {
    countryCode: [{ required: true, message: t('welfare.cashWheel.countryRequired'), trigger: 'change' }]
  };

  // 国家切换
  const handleCountryChange = () => {
    loadConfig();
  };

  // ==================== 周期操作 ====================
  const addPeriod = () => {
    form.configValue!.periods = form.configValue!.periods || [];
    form.configValue!.periods.push({
      id: undefined,
      startTime: '',
      endTime: ''
    });
  };

  const removePeriod = (pIdx: number) => {
    form.configValue!.periods!.splice(pIdx, 1);
  };

  // ==================== 轮次操作 ====================
  const addRound = () => {
    form.configValue!.rounds = form.configValue!.rounds || [];
    const nextRound = form.configValue!.rounds.length + 1;
    form.configValue!.rounds.push({
      round: nextRound,
      rewardAmount: undefined,
      validHours: undefined,
      finishDays: undefined,
      initialDrawTimes: undefined,
      dailyInviteLimit: undefined,
      finishRequiredDrawCount: undefined,
      wheelSlots: [],
      drawConfigs: []
    });
  };

  const removeRound = (rIdx: number) => {
    form.configValue!.rounds!.splice(rIdx, 1);
  };

  // ==================== 轮盘布局弹窗 ====================
  const slotDialogVisible = ref(false);
  const wheelSlotsActItemId = ref(0);
  const wheelSlotsRound = ref(0);

  const editWheelSlots = (row: any) => {
    if (!form.id) {
      ElMessage.warning(t('welfare.cashWheel.noActItemId'));
      return;
    }
    wheelSlotsActItemId.value = form.id!;
    wheelSlotsRound.value = row.round!;
    slotDialogVisible.value = true;
  };

  // ==================== 抽奖命中配置弹窗 ====================
  const drawConfigsDialogVisible = ref(false);
  const drawConfigsActItemId = ref(0);
  const drawConfigsRound = ref(0);

  const editDrawConfigs = (row: any) => {
    if (!form.id) {
      ElMessage.warning(t('welfare.cashWheel.noActItemId'));
      return;
    }
    drawConfigsActItemId.value = form.id!;
    drawConfigsRound.value = row.round!;
    drawConfigsDialogVisible.value = true;
  };

  // ==================== 加载配置 ====================
  const loadConfig = async () => {
    try {
      const data = await getCashWheelInfo(form.countryCode || 254);
      if (!data) return;

      // 填充基础字段
      form.id = data.id;
      form.name = data.name;
      form.subTitle = data.subTitle;
      form.sortNumber = data.sortNumber;
      form.status = data.status;
      form.description = data.description;

      // 图片回显
      if (data.imgUrl) {
        form.imgUrl = import.meta.env.VITE_APP_IMG_URL + data.imgUrl;
      } else {
        form.imgUrl = '';
      }

      // 日期范围（根据国家代码回显对应时区的时间）
      if (data.startDate && data.endDate) {
        timeArr.value = [toDateZone(data.startDate, form.countryCode), toDateZone(data.endDate, form.countryCode)];
      } else {
        timeArr.value = ['', ''];
      }
      if (data.showStartDate && data.showEndDate) {
        showTimeArr.value = [toDateZone(data.showStartDate, form.countryCode), toDateZone(data.showEndDate, form.countryCode)];
      } else {
        showTimeArr.value = ['', ''];
      }

      // 填充 configValue
      if (data.configValue) {
        const cv = data.configValue;
        form.configValue = {
          jsonType: cv.jsonType || 'CashWheelActConf',
          ipLimit: cv.ipLimit,
          ipPeriod: cv.ipPeriod,
          deviceLimit: cv.deviceLimit,
          devicePeriod: cv.devicePeriod,
          rewardLimit: cv.rewardLimit,
          rewardGoods: cv.rewardGoods || [],
          periods: cv.periods || [],
          rounds: cv.rounds || [],
          cycleEnabled: cv.cycleEnabled || false,
          cycleStartRound: cv.cycleStartRound,
          periodUserClaimLimit: cv.periodUserClaimLimit,
          inviteFirstPayDrawTimes: cv.inviteFirstPayDrawTimes,
          sameDeviceValidLimit: cv.sameDeviceValidLimit,
          sameIpValidLimit: cv.sameIpValidLimit,
          deviceLimitPeriodDays: cv.deviceLimitPeriodDays,
          ipLimitPeriodDays: cv.ipLimitPeriodDays,
          inviteeTotalRechargeAmount: cv.inviteeTotalRechargeAmount,
          inviteeCashNetFlow: cv.inviteeCashNetFlow,
          subActRewardConf: cv.subActRewardConf
        };
        rewardGoodsList.value = cv.subActRewardConf?.common?.rewardGoods || [];
      } else {
        resetConfigValue();
      }

      // 推送策略
      form.pushStrategies = data.pushStrategies || [];
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Load config failed';
      ElMessage.error(msg);
    }
  };

  const resetConfigValue = () => {
    form.configValue = {
      jsonType: 'CashWheelActConf',
      ipLimit: undefined,
      ipPeriod: undefined,
      deviceLimit: undefined,
      devicePeriod: undefined,
      rewardLimit: undefined,
      rewardGoods: [],
      periods: [],
      rounds: [],
      cycleEnabled: false,
      cycleStartRound: undefined,
      periodUserClaimLimit: undefined,
      inviteFirstPayDrawTimes: undefined,
      sameDeviceValidLimit: undefined,
      sameIpValidLimit: undefined,
      deviceLimitPeriodDays: undefined,
      ipLimitPeriodDays: undefined,
      inviteeTotalRechargeAmount: undefined,
      inviteeCashNetFlow: undefined
    };
    rewardGoodsList.value = [];
  };

  // ==================== 保存 ====================
  const save = async () => {
    // 校验基础表单
    const valid = await formRef.value?.validate().catch(() => false);
    if (!valid) return;

    // 校验奖励物品表格
    if (rewardGoodsTableRef.value) {
      const validation = rewardGoodsTableRef.value.validate();
      if (!validation.valid) {
        ElMessage.error(validation.message);
        return;
      }
    }

    // 解构日期范围
    const [startDate, endDate] = timeArr.value || ['', ''];
    const [showStartDate, showEndDate] = showTimeArr.value || ['', ''];

    // 剥离图片域名前缀
    const imgBaseUrl = import.meta.env.VITE_APP_IMG_URL;
    let imgUrl = form.imgUrl;
    if (imgUrl && imgBaseUrl && imgUrl.startsWith(imgBaseUrl)) {
      imgUrl = imgUrl.slice(imgBaseUrl.length);
    }

    // 组装 configValue
    const configValue = {
      ...form.configValue,
      subActRewardConf: {
        ...form.configValue?.subActRewardConf,
        common: {
          ...form.configValue?.subActRewardConf?.common,
          rewardGoods: (rewardGoodsList.value || []).filter((item) => item.goodsId !== undefined)
        }
      }
    };

    const params = {
      id: form.id,
      countryCode: form.countryCode,
      name: form.name,
      subTitle: form.subTitle,
      imgUrl,
      sortNumber: form.sortNumber,
      status: form.status,
      startDate,
      endDate,
      showStartDate,
      showEndDate,
      description: form.description,
      configValue,
      pushStrategies: form.pushStrategies || []
    };

    try {
      const msg = await saveCashWheel(params);
      ElMessage.success(msg || t('action.saveSuccess'));
      await loadConfig();
    } catch (error) {
      const msg = error instanceof Error ? error.message : t('action.saveFailed');
      ElMessage.error(msg);
    }
  };

  // ==================== 发送到服务器 ====================
  const handleReload = async () => {
    try {
      reloading.value = true;
      const res = await reloadCashWheel();
      ElMessage.success(res.message || t('action.saveSuccess'));
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Reload failed';
      ElMessage.error(msg);
    } finally {
      reloading.value = false;
    }
  };

  onMounted(() => {
    loadConfig();
    fetchSmsList();
    fetchAppPushTemplates();
  });
</script>

<style lang="scss" scoped>
  .sub-title {
    font-size: 20px;
    font-weight: bold;
    margin: 20px 0 10px;
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
    margin: 12px 0 8px;
  }

  .box {
    padding: 16px;
    box-shadow: 0 5px 5px 0 rgba(34, 34, 34, 0.1);
    margin: 15px 0;
    border-radius: 15px;
  }

  .round-box {
    padding: 12px;
    margin: 10px 0;
    border: 1px dashed #dcdfe6;
    border-radius: 8px;
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
