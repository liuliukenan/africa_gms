<!-- 用户编辑弹窗 -->
<template>
  <ele-modal :width="900" form v-model="visible" :title="isUpdate ? '修改充值项' : '新建充值项'"
    :body-style="{ paddingBottom: '5px' }" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" @submit.prevent="" label-width="80px">
      <el-row :gutter="16">
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="ID" prop="id">
            <el-input-number :precision="2" :controls="false" :min="0" :disabled="isUpdate" v-model.trim="form.id"
              placeholder="请输入" clearable style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="VIP等级" prop="unit">
            <string-select :dict-code="'unitType'" v-model="form.unit" placeholder="请选择币种" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="货币" prop="moneyType">
            <dict-data code="moneyType" v-model="form.moneyType" valueType="number" placeholder="请选择货币" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="slots" prop="slots">
            <el-input-number :precision="2" :controls="false" :min="0" v-model.trim="form.slots" placeholder="请输入slots"
              clearable style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="棋牌" prop="payThirdItem">
            <el-input-number :precision="2" :controls="false" :min="0" v-model="form.payThirdItem" placeholder="棋牌"
              clearable style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="捕鱼" prop="amount">
            <el-input-number :precision="2" :controls="false" :min="0" v-model.trim="form.amount" placeholder="请输入捕鱼"
              clearable style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="真人" prop="gold">
            <el-input-number :precision="2" :controls="false" :min="0" v-model.trim="form.gold" placeholder="请输入真人"
              clearable style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="彩票" prop="sortNumber">
            <el-input-number :precision="2" :controls="false" :min="0" v-model.trim="form.sortNumber"
              placeholder="请输入彩票" clearable style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="轮盘" prop="sortNumber">
            <el-input-number :precision="2" :controls="false" :min="0" v-model.trim="form.sortNumber"
              placeholder="请输入轮盘" clearable style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save"> 保存</el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue';
import { useFormData } from '@/utils/use-form-data';
import { addPayItem, updatePayItem } from '@/api/pay/payItem';
import StringSelect from '@/components/StringSelect/index.vue';
import type { PayItem } from '@/api/pay/model';
import { ElMessage, FormInstance, FormRules } from 'element-plus';

const emit = defineEmits(['done']);
const props = defineProps<{
  channelId: number;
  type: string;
  hasAssignItem: boolean;
  // 修改回显的数据
  data: PayItem | null;
}>();
const visible = defineModel({ type: Boolean });


//
const formRef = ref<FormInstance | null>(null);

// 是否是修改
const isUpdate = ref(false);

// 提交状态
const loading = ref(false);

// 表单数据
const { form, resetFields, assignFields } = useFormData<PayItem>({
  id: undefined,
  moneyType: undefined,
  payChannelId: undefined,
  channelType: undefined,
  payFlatType: undefined,
  payThirdItem: undefined,
  unit: undefined,
  amount: undefined,
  gold: undefined,
  sortNumber: undefined,
  hide: false,
  fix: false
});

// 表单验证规则
const rules = reactive<FormRules>({
  type: [
    {
      required: true,
      type: 'string',
      message: '请输入类型',
      trigger: 'blur'
    }
  ],
  unit: [
    {
      required: true,
      type: 'string',
      message: '请选择币种',
      trigger: 'blur'
    }
  ],
  amount: [
    {
      required: true,
      type: 'number',
      message: '请输入用户ID',
      trigger: 'blur'
    }
  ]
});

/* 保存编辑 */
const save = () => {
  formRef.value?.validate?.((valid) => {
    if (!valid) return;
    loading.value = true;
    console.log('form', form);
    const saveOrUpdate = isUpdate.value ? updatePayItem : addPayItem;
    saveOrUpdate(form)
      .then((msg) => {
        loading.value = false;
        ElMessage.success(msg);
        handleCancel();
        emit('done');
      })
      .catch((e) => {
        loading.value = false;
        ElMessage.error(e.message);
      });
  });
};

/** 关闭弹窗 */
const handleCancel = () => {
  visible.value = false;
};

/** 弹窗打开事件 */
const handleOpen = () => {
  if (props.data) {
    assignFields({ ...props.data });
    isUpdate.value = true;
  } else {
    resetFields();
    if (props.hasAssignItem) {
      form.channelType = props.type;
    } else {
      form.channelType = 'COMMON';
    }
    form.payChannelId = props.channelId;
    isUpdate.value = false;
  }
  nextTick(() => {
    nextTick(() => {
      formRef.value?.clearValidate?.();
    });
  });
};
</script>
