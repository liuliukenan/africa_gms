<template>
  <div style="margin-top: 16px">
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px">
      <strong>{{ title || t('welfare.userRecall.push.title') }}</strong>
      <el-button v-if="showAddButton" type="primary" size="small" @click="handleAdd">{{ t('welfare.userRecall.push.add') }}</el-button>
    </div>
    <el-table :data="modelValue || []" style="width: 100%" border size="small">
      <el-table-column :label="t('welfare.userRecall.push.name')" min-width="140">
        <template #default="{ row }">
          <el-input v-model="row.pushName" :placeholder="t('welfare.userRecall.push.name')" size="small" />
        </template>
      </el-table-column>
      <el-table-column :label="t('welfare.userRecall.push.delayValue')" width="120" v-if="actTypeEnum != 'kyc'">
        <template #default="{ row }">
          <el-input-number v-model="row.delayValue" size="small" :controls="false" :min="0" style="width: 100%" />
        </template>
      </el-table-column>
      <el-table-column :label="t('welfare.userRecall.push.delayUnit')" width="130" v-if="actTypeEnum != 'kyc'">
        <template #default="{ row }">
          <el-select v-model="row.delayUnit" size="small" style="width: 100%">
            <el-option :label="t('welfare.userRecall.delayUnitMinutes')" value="MINUTES" />
            <el-option :label="t('welfare.userRecall.delayUnitHours')" value="HOURS" />
            <el-option :label="t('welfare.userRecall.delayUnitDays')" value="DAYS" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column v-if="actTypeEnum !== 'REPAY' && actTypeEnum != 'kyc' && actTypeEnum != 'allVip'" :label="t('welfare.userRecall.push.needReward')" width="130">
        <template #default="{ row }">
          <el-select v-model="row.needReward" size="small" style="width: 100%">
            <el-option :label="t('action.no')" :value="0" />
            <el-option :label="t('action.yes')" :value="1" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column :label="t('welfare.userRecall.push.smsTemplate')" min-width="130">
        <template #default="{ row }">
          <el-select v-model="row.smsTemplateId" :placeholder="t('common.placeholder.select')" style="min-width: 240px" size="small" filterable>
            <el-option v-for="item in smsList" :key="item.id" :label="item.templateName" :value="item.id" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column :label="t('welfare.userRecall.push.appTemplate')" min-width="130">
        <template #default="{ row }">
          <el-select v-model="row.appPushTemplateId" :placeholder="t('common.placeholder.select')" style="min-width: 240px" size="small" filterable>
            <el-option v-for="item in appPushTemplates" :key="item.id" :label="item.templateName" :value="item.id" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column :label="t('welfare.userRecall.push.inAppTemplate')" min-width="140">
        <template #default="{ row }">
          <MailSelect v-model="row.inAppTemplateId" size="small" />
        </template>
      </el-table-column>
      <el-table-column :label="t('welfare.userRecall.push.status')" width="130">
        <template #default="{ row }">
          <el-select v-model="row.status" size="small" style="width: 100%">
            <el-option :label="t('welfare.userRecall.strategy.disable')" :value="0" />
            <el-option :label="t('welfare.userRecall.strategy.enable')" :value="1" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column :label="t('action.action')" width="80" fixed="right" align="center"> 
        <template #default="{ $index }">
          <el-button type="danger" size="small" link @click="handleRemove($index)">{{ t('action.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { ref, onMounted } from 'vue';
  import MailSelect from '@/components/MailSelect/index.vue';
  import type { Push } from '@/api/welfare/model/registerGive';
  import { pageSmsTemplates } from '@/api/platform/smsTemplateApi';
  import { pageAppPushTemplates } from '@/api/platform/appPushTemplateApi';
  import { useConfigStore } from '@/store/modules/config';

  const { t } = useI18n();
  const configStore = useConfigStore();

  const props = withDefaults(
    defineProps<{
      modelValue?: Push[];
      title?: string;
      keys?: string;
      showAddButton?: boolean;
      strategyId?: number;
      actTypeEnum?: string;
      countryCode?: number;
    }>(),
    {
      showAddButton: true
    }
  );

  const emit = defineEmits<{
    (e: 'update:modelValue', val: Push[]): void;
    (e: 'remove', index: number): void;
  }>();

  const smsList = ref<any[]>([]);
  const appPushTemplates = ref<any[]>([]);

  const getSMSList = () => {
    pageSmsTemplates({ page: 1, limit: 1000, countryCode: props.countryCode || configStore.countryArr?.[0]?.code || 254 }).then((res) => {
      if (res && res.list) {
        smsList.value = res.list || [];
      }
    });
  };

  const getAppPushTemplateList = () => {
    pageAppPushTemplates({ page: 1, limit: 1000, countryCode: props.countryCode || configStore.countryArr?.[0]?.code || 254 }).then((res) => {
      if (res && res.list) {
        appPushTemplates.value = res.list || [];
      }
    });
  };

  onMounted(() => {
    getSMSList();
    getAppPushTemplateList();
  });

  const createEmptyPush = (): Push => ({
    id: undefined,
    strategyId: undefined,
    pushName: '',
    delayValue: 0,
    delayUnit: 'MINUTES',
    needReward: 0,
    smsTemplateId: undefined,
    appPushTemplateId: undefined,
    inAppTemplateId: undefined,
    sortOrder: 0,
    status: 1
  });

  const handleAdd = () => {
    const list = [...(props.modelValue || [])];
    const row = createEmptyPush();
    if (props.strategyId !== undefined) {
      row.strategyId = props.strategyId;
    }
    list.push(row);
    emit('update:modelValue', list);
  };

  const handleRemove = (index: number) => {
    const list = [...(props.modelValue || [])];
    list.splice(index, 1);
    emit('update:modelValue', list);
    emit('remove', index);
  };
</script>
