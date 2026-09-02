<template>
  <el-dialog v-model="dialogVisible" :title="dialogTitle" :close-on-click-modal="false" width="840px" @closed="resetForm">
    <el-form ref="dialogFormRef" :model="dialogForm" :rules="formRules" label-width="140px">
      <el-form-item :label="t('activityConfig.baseConfig.country')" prop="countryCode">
        <el-select v-model="dialogForm.countryCode" :placeholder="t('common.placeholder.select')" style="width: 100%">
          <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code || ''" />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('welfare.cashWheel.robotTable.textContent')" prop="textContent">
        <tinymce-editor v-model="dialogForm.textContent" :init="{ height: 200 }" category="mail" style="width: 100%" />
      </el-form-item>
      <el-form-item :label="t('welfare.cashWheel.robotTable.weight')" prop="weight">
        <el-input-number v-model="dialogForm.weight" :placeholder="t('common.placeholder.input')" :min="0" style="width: 100%" :controls="false" />
      </el-form-item>
      <el-form-item :label="t('welfare.cashWheel.robotTable.status')" prop="status">
        <el-radio-group v-model="dialogForm.status">
          <el-radio :value="1">{{ t('welfare.cashWheel.robotTable.statusEnabled') }}</el-radio>
          <el-radio :value="0">{{ t('welfare.cashWheel.robotTable.statusDisabled') }}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">{{ t('action.cancel') }}</el-button>
      <el-button type="primary" :loading="saving" @click="handleSave">{{ t('action.confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue';
import { ElMessage } from 'element-plus/es';
import type { FormInstance, FormRules } from 'element-plus';
import TinymceEditor from '@/components/TinymceEditor/index.vue';
import { addDailySurpriseRobotText, updateDailySurpriseRobotText } from '@/api/welfare/dailySurpriseApi';
import type { DailyRechargeSurpriseRobotTextVO } from '@/api/welfare/model/dailySurprise';
import { useI18n } from 'vue-i18n';
import { useConfigStore } from '@/store/modules/config';

const { t } = useI18n();
const configStore = useConfigStore();

const props = defineProps<{
  modelValue: boolean;
  /** 编辑时的行数据 */
  row?: DailyRechargeSurpriseRobotTextVO | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'saved'): void;
}>();

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const isEdit = computed(() => !!props.row?.id);

const saving = ref(false);
const dialogFormRef = ref<FormInstance | null>(null);

const dialogForm = reactive<DailyRechargeSurpriseRobotTextVO>({
  id: undefined,
  countryCode: undefined,
  textContent: '',
  weight: 0,
  status: 1
});

const dialogTitle = computed(() => {
  return isEdit.value
    ? t('welfare.cashWheel.robotTable.dialogTitleEdit')
    : t('welfare.cashWheel.robotTable.dialogTitleAdd');
});

const formRules: FormRules = {
  countryCode: [{ required: true, message: t('common.placeholder.select'), trigger: 'change' }],
  textContent: [{ required: true, message: t('common.placeholder.input'), trigger: 'blur' }],
  weight: [{ required: true, message: t('common.placeholder.input'), trigger: 'blur' }],
  status: [{ required: true, message: t('common.placeholder.select'), trigger: 'change' }]
};

// 弹窗打开时初始化表单
watch(
  () => props.modelValue,
  (visible) => {
    if (visible) {
      const row = props.row;
      dialogForm.id = row?.id ?? undefined;
      dialogForm.countryCode = row?.countryCode ?? configStore.countryArr?.[0]?.code ?? undefined;
      dialogForm.textContent = row?.textContent ?? '';
      dialogForm.weight = row?.weight ?? 0;
      dialogForm.status = row?.status ?? 1;
    }
  }
);

const resetForm = () => {
  dialogFormRef.value?.resetFields();
};

const handleSave = async () => {
  const valid = await dialogFormRef.value?.validate().catch(() => false);
  if (!valid) return;

  saving.value = true;
  try {
    const api = isEdit.value ? updateDailySurpriseRobotText : addDailySurpriseRobotText;
    const { message } = await api({ ...dialogForm });
    ElMessage.success(message || t('common.saveSuccess'));
    dialogVisible.value = false;
    emit('saved');
  } catch (e: any) {
    ElMessage.error(e.message || t('common.saveFailed'));
  } finally {
    saving.value = false;
  }
};
</script>
