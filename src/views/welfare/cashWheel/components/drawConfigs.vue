<template>
  <el-dialog v-model="visible" :title="t('welfare.cashWheel.drawConfigs') + ' - ' + t('welfare.cashWheel.roundIndex', { index: round })" width="950px" destroy-on-close>
    <div style="margin-bottom: 12px">
      <el-button type="primary" @click="addRow">{{ t('welfare.cashWheel.addDrawConfig') }}</el-button>
      <el-button :loading="importing" @click="handleImport" type="success">{{ t('action.import') }}</el-button>
      <el-button :loading="exporting" @click="handleExport" type="warning">{{ t('action.export') }}</el-button>
    </div>
    <input ref="fileInputRef" type="file" accept=".xls,.xlsx" style="display: none" @change="onFileChange" />
    <el-table :data="list" border>
      <el-table-column :label="t('welfare.cashWheel.drawConfigWeight')" width="100" align="center">
        <template #default="{ row }">
          <el-input-number v-if="editingId === row.id" v-model="row.weight" :controls="false" :min="0" style="width: 100%" />
          <span v-else>{{ row.weight }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('welfare.cashWheel.initialAmount')" width="140" align="center">
        <template #default="{ row }">
          <el-input-number v-if="editingId === row.id" v-model="row.initialAmount" :controls="false" :min="0" :precision="2" style="width: 100%" />
          <span v-else>{{ row.initialAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('welfare.cashWheel.hitSlots')">
        <template #default="{ row }">
          <template v-if="editingId === row.id">
            <div v-for="(hs, hidx) in row.hitSlots" :key="hidx" style="display: flex; gap: 6px; align-items: center; margin-bottom: 4px">
              <!-- <span style="white-space: nowrap; width: 40px; font-size: 12px">{{ t('welfare.cashWheel.hitSlotNo') }}{{ hs.slotNo }}</span> -->
               {{ t('welfare.cashWheel.hitSlotNo') }}<el-input-number v-model="hs.slotNo" :controls="false" :min="0"  style="width: 100px" />
              <el-select v-model="hs.type" style="width: 100px">
                <el-option v-for="opt in hitTypeOptions" :key="opt.value" :label="opt.label" :value="opt.value" />
              </el-select>
              <el-input-number v-model="hs.amount" :controls="false" :min="0" :precision="2" style="width: 100px" />
              <el-button type="danger" link size="small" @click="removeHitSlot(row, Number(hidx))" style="flex-shrink: 0">×</el-button>
            </div>
            <el-button type="primary" link size="small" @click="addHitSlot(row)">
              + {{ t('welfare.cashWheel.addHitSlot') }}
            </el-button>
          </template>
          <template v-else>
            <span v-for="(hs, hidx) in row.hitSlots" :key="hidx" style="font-size: 12px; margin-right: 8px">
              {{ getHitTypeLabel(hs.type) || '--' }} {{ hs.amount || '' }}
              <template v-if="Number(hidx) < row.hitSlots!.length - 1"> | </template>
            </span>
          </template>
        </template>
      </el-table-column>
      <el-table-column :label="t('action.action')" width="140" align="center">
        <template #default="{ row }">
          <el-button v-if="editingId === row.id" type="success" link :loading="savingId === row.id" @click="saveRow(row)">
            {{ t('action.save') }}
          </el-button>
          <el-button v-if="editingId === row.id" type="info" link @click="cancelEdit(row)">
            {{ t('action.cancel') }}
          </el-button>
          <template v-else>
            <el-button type="primary" link @click="editRow(row)">
              {{ t('action.edit') }}
            </el-button>
            <el-popconfirm title="确定要删除此配置？" @confirm="deleteRow(row)">
              <template #reference>
                <el-button type="danger" link :loading="deletingId === row.id">{{ t('action.delete') }}</el-button>
              </template>
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <el-button @click="visible = false">{{ t('action.cancel') }}</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import { ElMessage } from 'element-plus';
  import { useI18n } from 'vue-i18n';
  import { getCashWheelDrawConfigs, updateCashWheelDrawConfig, addCashWheelDrawConfig, deleteCashWheelDrawConfig, importCashWheelDrawConfig, exportCashWheelDrawConfig } from '@/api/welfare/cashWheelApi';
  import { handleDownload } from '@/utils/file-util';
  import type { CashWheelDrawConfigVO, HitSlotConf } from '@/api/welfare/model/cashWheel';

  const { t } = useI18n();

  const props = defineProps<{
    modelValue: boolean;
    actItemId: number;
    round: number;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', val: boolean): void;
    (e: 'saved'): void;
  }>();

  const visible = computed({
    get: () => props.modelValue ?? false,
    set: (val) => emit('update:modelValue', val)
  });

  const list = ref<CashWheelDrawConfigVO[]>([]);
  const editingId = ref<number | null>(null);
  const savingId = ref<number | null>(null);
  const deletingId = ref<number | null>(null);
  const originalData = ref<CashWheelDrawConfigVO | null>(null);
  const fileInputRef = ref<HTMLInputElement | null>(null);
  const importing = ref(false);
  const exporting = ref(false);
  const hitTypeOptions = [
    { label: '固定值', value: 1 },
   { label: '随机值', value: 2 },
  { label: '全提', value: 3 }
  ];

  const getHitTypeLabel = (type?: number) => {
    return hitTypeOptions.find((o) => o.value === type)?.label || type || '';
  };

  let tempIdCounter = 0;

  const fetchList = async () => {
    try {
      const data = await getCashWheelDrawConfigs(props.actItemId, props.round);
      list.value = data || [];
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Load draw configs failed';
      ElMessage.error(msg);
    }
  };

  onMounted(() => {
    fetchList();
  });

  const editRow = (row: CashWheelDrawConfigVO) => {
    originalData.value = JSON.parse(JSON.stringify(row));
    editingId.value = row.id!;
  };

  const saveRow = async (row: CashWheelDrawConfigVO) => {
    try {
      savingId.value = row.id!;
      let msg = '';
      if (row.id && row.id > 0) {
        const res = await updateCashWheelDrawConfig(row);
        msg = res.message || '';
      } else {
        const res = await addCashWheelDrawConfig(row);
        msg = res.message || '';
      }
      console.log(1111, msg);

      ElMessage.success(msg);
      editingId.value = null;
      savingId.value = null;
      await fetchList();
    } catch (error) {
      savingId.value = null;
      const msg = error instanceof Error ? error.message : 'Save draw config failed';
      ElMessage.error(msg);
    }
  };

  const cancelEdit = (row: CashWheelDrawConfigVO) => {
    if (row.id && row.id <= 0) {
      // 新增行直接移除
      list.value = list.value.filter((item) => item.id !== row.id);
    } else if (originalData.value) {
      // 已有行还原数据
      Object.assign(row, originalData.value);
    }
    editingId.value = null;
    originalData.value = null;
  };

  const deleteRow = async (row: CashWheelDrawConfigVO) => {
    if (!row.id || row.id <= 0) {
      list.value = list.value.filter((item) => item.id !== row.id);
      return;
    }
    try {
      deletingId.value = row.id!;
      const res = await deleteCashWheelDrawConfig(row.id!);
      ElMessage.success(res.message);
      deletingId.value = null;
      await fetchList();
    } catch (error) {
      deletingId.value = null;
      const msg = error instanceof Error ? error.message : 'Delete draw config failed';
      ElMessage.error(msg);
    }
  };

  const addRow = () => {
    const slots: HitSlotConf[] = [{ slotNo: 1, type: undefined, amount: undefined }];
    const newRow: CashWheelDrawConfigVO = {
      id: --tempIdCounter, // 负数作为临时ID
      actItemId: props.actItemId,
      round: props.round,
      weight: undefined,
      initialAmount: undefined,
      hitSlots: slots
    };
    list.value.push(newRow);
    editingId.value = newRow.id!;
  };

  const addHitSlot = (row: CashWheelDrawConfigVO) => {
    // const maxSlotNo = row.hitSlots?.reduce((max, s) => Math.max(max, s.slotNo || 0), 0) || 0;
    row.hitSlots?.push({ slotNo:undefined, type: undefined, amount: undefined });
  };

  const removeHitSlot = (row: CashWheelDrawConfigVO, index: number) => {
    row.hitSlots?.splice(index, 1);
  };

  // ==================== 导入导出 ====================
  const handleImport = () => {
    fileInputRef.value?.click();
  };

  const onFileChange = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;
    try {
      importing.value = true;
      const res = await importCashWheelDrawConfig(props.round, file);
      ElMessage.success(res.message || t('action.saveSuccess'));
      await fetchList();
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Import failed';
      ElMessage.error(msg);
    } finally {
      importing.value = false;
      target.value = '';
    }
  };

  const handleExport = async () => {
    try {
      exporting.value = true;
      const res = await exportCashWheelDrawConfig(props.round);
      handleDownload(`DrawConfigs_Round${props.round}.xlsx`, res.data as Blob);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Export failed';
      ElMessage.error(msg);
    } finally {
      exporting.value = false;
    }
  };
</script>
