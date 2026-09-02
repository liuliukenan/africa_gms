<template>
  <el-dialog v-model="visible" :title="t('welfare.cashWheel.wheelSlots') + ' - ' + t('welfare.cashWheel.roundIndex', { index: round })" width="700px" destroy-on-close>
    <el-table :data="slotList" border >
      <el-table-column :label="t('welfare.cashWheel.slotNo')"  align="center">
        <template #default="{ row }">
          {{ t('welfare.cashWheel.hitSlotNo') }}{{ row.slotNo }}
        </template>
      </el-table-column>
      <el-table-column :label="t('welfare.cashWheel.displayType')" >
        <template #default="{ row }">
          <el-select v-if="editingIndex === row.slotNo" v-model="row.displayType"  style="width: 100%">
            <el-option v-for="opt in displayTypeOptions" :key="opt.value" :label="opt.label" :value="opt.value" />
          </el-select>
          <span v-else>{{ displayTypeOptions.find(o => o.value === row.displayType)?.label || row.displayType }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('welfare.cashWheel.displayAmount')" >
        <template #default="{ row }">
          <el-input-number v-if="editingIndex === row.slotNo" v-model="row.displayAmount" :controls="false" :min="0" :precision="2"  style="width: 100%" />
          <span v-else>{{ row.displayAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('action.action')"  align="center">
        <template #default="{ row }">
          <el-button v-if="editingIndex === row.slotNo" type="success"  link :loading="savingSlotNo === row.slotNo" @click="saveSlot(row)">
            {{ t('action.save') }}
          </el-button>
          <el-button v-if="editingIndex === row.slotNo" type="warning" link @click="cancelEditSlot(row)">
            {{ t('action.cancel') }}
          </el-button>
          <el-button v-else type="primary"  link @click="editSlot(row)">
            {{ t('action.edit') }}
          </el-button>
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
import { getCashWheelSlots, updateCashWheelSlot } from '@/api/welfare/cashWheelApi';
import type { CashWheelSlotConfigVO } from '@/api/welfare/model/cashWheel';

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

const slotList = ref<CashWheelSlotConfigVO[]>([]);
const editingIndex = ref<number | null>(null);
const savingSlotNo = ref<number | null>(null);
const originalSlotData = ref<CashWheelSlotConfigVO | null>(null);
const displayTypeOptions = [
  { label: '固定值', value: 1 },
  { label: '随机值', value: 2 },
  { label: '全提', value: 3 }
];

const fetchSlots = async () => {
  try {
    const data = await getCashWheelSlots(props.actItemId, props.round);
    slotList.value = data || [];
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Load slots failed';
    ElMessage.error(msg);
  }
};

onMounted(() => {
  fetchSlots();
});

const editSlot = (row: CashWheelSlotConfigVO) => {
  originalSlotData.value = JSON.parse(JSON.stringify(row));
  editingIndex.value = row.slotNo!;
};

const cancelEditSlot = (row: CashWheelSlotConfigVO) => {
  if (originalSlotData.value) {
    Object.assign(row, originalSlotData.value);
  }
  editingIndex.value = null;
  originalSlotData.value = null;
};

const saveSlot = async (row: CashWheelSlotConfigVO) => {
  try {
    savingSlotNo.value = row.slotNo!;
    const res = await updateCashWheelSlot(row);
    ElMessage.success(res.message);
    editingIndex.value = null;
    savingSlotNo.value = null;
  } catch (error) {
    savingSlotNo.value = null;
    const msg = error instanceof Error ? error.message : 'Save slot failed';
    ElMessage.error(msg);
  }
};
</script>
