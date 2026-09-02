<!-- 用户编辑弹窗 -->
<template>
  <ele-modal :width="680"  v-model="visible" :confirm-loading="loading" :title="isUpdate ? '修改' : '新建'"
    :body-style="{ paddingBottom: '5px' }" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" :label-col="{ md: 7, sm: 4, xs: 24 }"
      :wrapper-col="{ md: 17, sm: 20, xs: 24 }">
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="ID" prop="id">
            <el-input-number  :controls="false" v-model.trim="form.id" placeholder="请输入" clearable style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="日期" prop="daykey">
            <el-input-number  :controls="false" v-model.trim="form.daykey" placeholder="请输入" clearable style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="ukey" prop="ukey">
            <el-input clearable :maxlength="20" placeholder="请输入ukey" v-model="form.ukey" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="充值渠道" prop="channelType">
            <el-input clearable :maxlength="20" placeholder="请输入充值渠道" v-model="form.channelType" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="unit" prop="unit">
            <el-input clearable :maxlength="20" placeholder="请输入unit" v-model="form.unit" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="充值金额" prop="payAmount">
            <el-input-number  :controls="false" v-model.trim="form.payAmount" placeholder="请输入" clearable style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="提现金额" prop="withdrawAmount">
            <el-input-number  :controls="false" v-model.trim="form.withdrawAmount" placeholder="请输入" clearable style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="充值次数" prop="payTimes">
            <el-input-number  :controls="false" v-model.trim="form.payTimes" placeholder="请输入" clearable style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="提现次数" prop="withdrawTimes">
            <el-input-number  :controls="false" v-model.trim="form.withdrawTimes" placeholder="请输入" clearable style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </ele-modal>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue';
import { useFormData } from '@/utils/use-form-data';
import { addSysPayCount, updateSysPayCount } from '@/api/count/sysPayCount';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import type { SysPayCount } from '@/api/count/model';
const emit = defineEmits(['done']);
/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });
const props = defineProps<{
    // 修改回显的数据
    data: SysPayCount
  }>();

const formRef = ref<FormInstance | null>(null);

// 是否是修改
const isUpdate = ref(false);

// 提交状态
const loading = ref(false);

// 表单数据
const { form, resetFields, assignFields } = useFormData({
  id: undefined,
  daykey: undefined,
  ukey: undefined,
  channelType: undefined,
  unit: undefined,
  payAmount: undefined,
  withdrawAmount: undefined,
  payTimes: undefined,
  withdrawTimes: undefined,
});

// 表单验证规则
const rules = reactive<FormRules>({
  id: [
    {
      required: true,
      type: 'number',
      message: '请输入主键',
      trigger: 'blur'
    }
  ],
  daykey: [
    {
      required: true,
      type: 'number',
      message: '请输入日期',
      trigger: 'blur'
    }
  ],
  ukey: [
    {
      required: true,
      type: 'string',
      message: '请输入ukey',
      trigger: 'blur'
    }
  ],
  channelType: [
    {
      required: true,
      type: 'string',
      message: '请输入充值渠道',
      trigger: 'blur'
    }
  ],
  unit: [
    {
      required: true,
      type: 'string',
      message: '请输入unit',
      trigger: 'blur'
    }
  ],
  payAmount: [
    {
      required: true,
      type: 'number',
      message: '请输入充值金额',
      trigger: 'blur'
    }
  ],
  withdrawAmount: [
    {
      required: true,
      type: 'number',
      message: '请输入提现金额',
      trigger: 'blur'
    }
  ],
  payTimes: [
    {
      required: true,
      type: 'number',
      message: '请输入充值次数',
      trigger: 'blur'
    }
  ],
  withdrawTimes: [
    {
      required: true,
      type: 'number',
      message: '请输入提现次数',
      trigger: 'blur'
    }
  ]
});

/* 保存编辑 */
const save = () => {
  if (!formRef.value)  return;
  formRef.value
    .validate()
    .then(() => {
      loading.value = true;
      const saveOrUpdate = isUpdate.value ? updateSysPayCount : addSysPayCount;
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
    })
    .catch(() => { });
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
    isUpdate.value = false;
  }
  nextTick(() => {
    nextTick(() => {
      formRef.value?.clearValidate?.();
    });
  });
};
</script>
