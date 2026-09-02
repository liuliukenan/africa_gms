<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="880" v-model="visible" :title="isUpdate ? '修改礼包卡系列' : '新建礼包卡系列'" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="130px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :sm="12" :xs="12">
          <el-form-item label="系列名称" prop="name">
            <el-input clearable :maxlength="50" v-model="form.name" placeholder="请输入" />
          </el-form-item>
        </el-col>

        <el-col :sm="12" :xs="12">
          <el-form-item label="是否主钱包" prop="hasMaster">
            <el-select v-model="form.hasMaster" style="width: 100%">
              <el-option label="钱包模板" :value="false" />
              <el-option label="主钱包" :value="true" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :sm="12" :xs="12" v-if="!form.hasMaster">
          <el-form-item label="钱包模板类型" prop="walletType" :rules="!form.hasMaster ? [{ required: true, message: '请选择钱包模板类型', trigger: 'blur' }] : []">
            <WalletSelect v-model="form.walletType" filter-type="group" :label="form.walletName" @select-row="(row) => (form.walletName = row?.name || '')" />
          </el-form-item>
        </el-col>

        <el-col :sm="12" :xs="12">
          <el-form-item label="面额" prop="amount">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.amount" :min="0" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="流水倍数" prop="flowMultiple">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.flowMultiple" :min="0" placeholder="请输入" />
          </el-form-item>
        </el-col>

        <el-col :sm="12" :xs="12">
          <el-form-item label="使用类型" prop="useType">
            <el-select v-model="form.useType" style="width: 100%">
              <el-option label="不限制" :value="0" />
              <el-option label="充值使用" :value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12" v-if="form.useType === 1">
          <el-form-item label="充值需求金额" prop="rechargeAmount">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.rechargeAmount" :min="0" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="领取策略" prop="useStrategy">
            <el-select v-model="form.useStrategy" style="width: 100%">
              <el-option label="永久一次" :value="1" />
              <el-option label="每日一次" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :value="1">启用</el-radio>
              <el-radio :value="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :sm="16" :xs="24">
          <el-form-item label="启用开始时间" prop="startDate">
            <el-date-picker v-model="timeRange" type="daterange" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save"> 保存 </el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref, reactive, nextTick } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { EleMessage } from 'ele-admin-plus/es';
  import { useFormData } from '@/utils/use-form-data';
  import { addGiftCardSerie, updateGiftCardSerie } from '@/api/giftCard/giftCardSerieApi';
  import type { GiftCardSerie } from '@/api/giftCard/model/giftCardSerie';
  import WalletSelect from '@/components/WallteSelect/index.vue';
  import { toDateString } from '@/utils/utils';
  const props = defineProps<{
    /** 修改回显的数据 */
    data?: GiftCardSerie | null;
  }>();

  const emit = defineEmits<{
    (e: 'done'): void;
  }>();
  const timeRange = ref<string[]>([]);
  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean });

  /** 是否是修改 */
  const isUpdate = ref(false);

  /** 提交状态 */
  const loading = ref(false);

  /** 表单实例 */
  const formRef = ref<FormInstance | null>(null);

  /** 表单数据 */
  const [form, resetFields, assignFields] = useFormData<GiftCardSerie>({
    id: undefined,
    name: undefined,
    hasMaster: undefined,
    walletType: undefined,
    walletName: undefined,
    amount: undefined,
    flowMultiple: undefined,
    useStrategy: undefined,
    validityType: undefined,
    validityDays: undefined,
    startDate: undefined,
    endDate: undefined,
    useType: undefined,
    rechargeAmount: undefined,
    status: 1
  });

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    name: [
      {
        required: true,
        type: 'string',
        message: '请输入系列名称',
        trigger: 'blur'
      }
    ],
    hasMaster: [
      {
        required: true,
        type: 'boolean',
        message: '请选择是否主钱包',
        trigger: 'blur'
      }
    ],
    walletType: [
      {
        required: true,
        type: 'number',
        message: '请选择',
        trigger: 'blur'
      }
    ],
    amount: [
      {
        required: true,
        type: 'number',
        message: '请输入面额)',
        trigger: 'blur'
      }
    ],
    flowMultiple: [
      {
        required: true,
        type: 'number',
        message: '请输入流水倍数',
        trigger: 'blur'
      }
    ],
    useStrategy: [
      {
        required: true,
        type: 'number',
        message: '请选择领取策略',
        trigger: 'blur'
      }
    ],
    validityType: [
      {
        required: true,
        type: 'number',
        message: '请输入有效期类型',
        trigger: 'blur'
      }
    ],
    validityDays: [
      {
        required: true,
        type: 'number',
        message: '请输入有效天数',
        trigger: 'blur'
      }
    ],
    status: [
      {
        required: true,
        type: 'number',
        message: '请选择状态',
        trigger: 'blur'
      }
    ]
  });

  /** 关闭弹窗 */
  const handleCancel = () => {
    visible.value = false;
  };

  /** 保存编辑 */
  const save = () => {
    formRef.value?.validate?.((valid) => {
      if (!valid) {
        return;
      }
      loading.value = true;
      const saveOrUpdate = isUpdate.value ? updateGiftCardSerie : addGiftCardSerie;
      const [startDate, endDate] = timeRange.value;
      const params = { ...form, startDate, endDate };
      saveOrUpdate(params)
        .then((msg) => {
          loading.value = false;
          EleMessage.success(msg);
          handleCancel();
          emit('done');
        })
        .catch((e) => {
          loading.value = false;
          EleMessage.error(e.message);
        });
    });
  };

  /** 弹窗打开事件 */
  const handleOpen = () => {
    if (props.data) {
      assignFields({ ...props.data });
      if (props.data.startDate || props.data.endDate) {
        timeRange.value = [toDateString(Number(props.data.startDate) * 1000, 'yyyy-MM-dd HH:mm:ss'), toDateString(Number(props.data.endDate) * 1000, 'yyyy-MM-dd HH:mm:ss')];
      }
      isUpdate.value = true;
    } else {
      resetFields();
      isUpdate.value = false;
    }
    nextTick(() => {
      nextTick(() => {
        formRef.value?.clearValidate?.();
      });
    });
  };
</script>
