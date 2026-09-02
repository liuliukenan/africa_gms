<template>
  <ele-page>
    <ele-card :body-style="{ padding: '0px' }">
      <robot-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :header-ellipsis="false" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" :tools="['reload', 'columns', 'maximized']" cache-key="cashWheelRobotTexts">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openAdd">
            {{ t('action.add') }}
          </el-button>
        </template>
        <!-- 状态 -->
        <template #status="{ row }">
          <el-tag v-if="row.status === 1" type="success">{{ t('welfare.cashWheel.robotTable.statusEnabled') }}</el-tag>
          <el-tag v-else type="info">{{ t('welfare.cashWheel.robotTable.statusDisabled') }}</el-tag>
        </template>
        <!-- 创建时间 -->
        <template #createTime="{ row }">
          {{ toDateZone(row.createTime, row.countryCode) }}
        </template>
        <!-- 更新时间 -->
        <template #updateTime="{ row }">
          {{ toDateZone(row.updateTime, row.countryCode) }}
        </template>
        <!-- 操作 -->
        <template #action="{ row }">
          <el-button type="primary" size="small" link @click="openEdit(row)">
            {{ t('action.edit') }}
          </el-button>
          <el-popconfirm :title="t('common.sureDelete')" @confirm="handleDelete(row)">
            <template #reference>
              <el-button type="danger" size="small" link>{{ t('action.delete') }}</el-button>
            </template>
          </el-popconfirm>
        </template>
      </ele-pro-table>
    </ele-card>

    <!-- 新增/编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" :close-on-click-modal="false" width="560px" @closed="resetForm">
      <el-form ref="dialogFormRef" :model="dialogForm" :rules="formRules" label-width="140px">
        <el-form-item :label="t('activityConfig.baseConfig.country')" prop="countryCode">
          <el-select v-model="dialogForm.countryCode" :placeholder="t('common.placeholder.select')" style="width: 100%">
            <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code || ''" />
          </el-select>
        </el-form-item>
        <el-form-item :label="t('welfare.cashWheel.robotTable.textContent')" prop="textContent">
          <el-input v-model="dialogForm.textContent" :placeholder="t('common.placeholder.input')" type="textarea" :rows="3" />
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
  </ele-page>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { dayjs, ElMessage } from 'element-plus/es';
import type { FormInstance, FormRules } from 'element-plus';
import type { EleProTable } from 'ele-admin-plus';
import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
import { PlusOutlined } from '@/components/icons';
import RobotSearch from './robot-search.vue';
import { pageCashWheelRobotTexts, addCashWheelRobotText, updateCashWheelRobotText, deleteCashWheelRobotText } from '@/api/welfare/cashWheelApi';
import type { CashWheelRobotTextVO, CashWheelRobotTextQuery } from '@/api/welfare/model/cashWheel';
import { useI18n } from 'vue-i18n';
import { toDateZone } from '@/utils/utils';
import { useConfigStore } from '@/store/modules/config';

const { t } = useI18n();
const configStore = useConfigStore();

const searchRef = ref<{ searchParams: () => CashWheelRobotTextQuery } | null>(null);
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

const columns = ref<Columns>([
  { prop: 'id', label: t('welfare.cashWheel.robotTable.id'), width: 80, fixed: 'left' },
  { prop: 'actItemId', label: t('welfare.cashWheel.robotTable.actItemId'), minWidth: 100 },
  { prop: 'countryCode', label: t('welfare.cashWheel.robotTable.countryCode'), minWidth: 80 },
  { prop: 'textContent', label: t('welfare.cashWheel.robotTable.textContent'), minWidth: 220, showOverflowTooltip: true },
  { prop: 'weight', label: t('welfare.cashWheel.robotTable.weight'), minWidth: 80 },
  { prop: 'status', label: t('welfare.cashWheel.robotTable.status'), minWidth: 80, slot: 'status' },
  { prop: 'createTime', label: t('welfare.cashWheel.robotTable.createTime'), minWidth: 160, slot: 'createTime' },
  { prop: 'updateTime', label: t('welfare.cashWheel.robotTable.updateTime'), minWidth: 160, slot: 'updateTime' },
  { prop: 'action', label: t('action.action'), minWidth: 140, fixed: 'right', slot: 'action' }
]);

const selections = ref<CashWheelRobotTextVO[]>([]);

const defaultWhere = reactive({
  countryCode: configStore.countryArr?.[0]?.code || '',
  startDate: '',
  endDate: ''
  // startDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
  // endDate: dayjs().format('YYYY-MM-DD')
});

const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageCashWheelRobotTexts({ ...defaultWhere, ...where, ...orders, ...pages });
};

const reload = (where?: CashWheelRobotTextQuery) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

// --- 新增/编辑弹窗 ---
const dialogVisible = ref(false);
const saving = ref(false);
const isEdit = ref(false);
const dialogFormRef = ref<FormInstance | null>(null);

const dialogForm = reactive<CashWheelRobotTextVO>({
  id: undefined,
  countryCode: undefined,
  textContent: '',
  weight: 0,
  status: 1
});

const dialogTitle = computed(() => {
  return isEdit.value ? t('welfare.cashWheel.robotTable.dialogTitleEdit') : t('welfare.cashWheel.robotTable.dialogTitleAdd');
});

const formRules: FormRules = {
  countryCode: [{ required: true, message: t('common.placeholder.select'), trigger: 'change' }],
  textContent: [{ required: true, message: t('common.placeholder.input'), trigger: 'blur' }],
  weight: [{ required: true, message: t('common.placeholder.input'), trigger: 'blur' }],
  status: [{ required: true, message: t('common.placeholder.select'), trigger: 'change' }]
};

const openAdd = () => {
  isEdit.value = false;
  dialogForm.id = undefined;
  dialogForm.countryCode = configStore.countryArr?.[0]?.code || undefined;
  dialogForm.textContent = '';
  dialogForm.weight = 0;
  dialogForm.status = 1;
  dialogVisible.value = true;
};

const openEdit = (row: CashWheelRobotTextVO) => {
  isEdit.value = true;
  dialogForm.id = row.id;
  dialogForm.countryCode = row.countryCode;
  dialogForm.textContent = row.textContent || '';
  dialogForm.weight = row.weight || 0;
  dialogForm.status = row.status;
  dialogVisible.value = true;
};

const resetForm = () => {
  dialogFormRef.value?.resetFields();
};

const handleSave = async () => {
  const valid = await dialogFormRef.value?.validate().catch(() => false);
  if (!valid) return;

  saving.value = true;
  try {
    const api = isEdit.value ? updateCashWheelRobotText : addCashWheelRobotText;
    const { message } = await api({ ...dialogForm });
    ElMessage.success(message || t('common.saveSuccess'));
    dialogVisible.value = false;
    tableRef.value?.reload?.();
  } catch (e: any) {
    ElMessage.error(e.message || t('common.saveFailed'));
  } finally {
    saving.value = false;
  }
};

const handleDelete = async (row: CashWheelRobotTextVO) => {
  try {
    const { message } = await deleteCashWheelRobotText(row.id!);
    ElMessage.success(message);
    tableRef.value?.reload?.();
  } catch (e: any) {
    ElMessage.error(e.message || t('common.saveFailed'));
  }
};
</script>

<script lang="ts">
export default { name: 'cashWheelRobot' };
</script>
