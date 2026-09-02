<!-- 用户编辑弹窗 -->
<template>
  <el-form ref="formRef" :model="form" :rules="rules" @submit.prevent="">
    <div style="display: flex; justify-content: space-between">
      <div style="margin-bottom: 20px; font-size: 18px; font-weight: bold">基础配置</div>
      <el-button :type="isEdit ? 'success' : 'danger'" :loading="loading" @click="save"> {{ isEdit ? '保存' : '编辑' }} </el-button>
    </div>
    <el-row :gutter="16">
      <el-col :sm="4" :xs="24">
        <el-form-item label="充值手续费比率" prop="commissionItem.rechargeRate">
          <el-input-number v-if="isEdit" :controls="false" style="width: 100%" v-model="form.commissionItem!.rechargeRate" :min="0" :max="1" placeholder="请输入充值手续费比率" />
          <span v-else> {{ form.commissionItem!.rechargeRate }} </span>
        </el-form-item>
      </el-col>
      <el-col :sm="4" :xs="24">
        <el-form-item label="提现手续费比率" prop="commissionItem.withdrawRate">
          <el-input-number v-if="isEdit" :controls="false" style="width: 100%" v-model="form.commissionItem!.withdrawRate" :min="0" :max="1" placeholder="请输入提现手续费比率" />
          <span v-else> {{ form.commissionItem!.withdrawRate }} </span>
        </el-form-item>
      </el-col>
      <el-col :sm="4" :xs="24">
        <el-form-item label="分润比例" prop="commissionItem.tripartiteRate">
          <el-input-number v-if="isEdit" :controls="false" style="width: 100%" v-model="form.commissionItem!.tripartiteRate" :min="0" :max="1" placeholder="请输入分润比例" />
          <span v-else> {{ form.commissionItem!.tripartiteRate }} </span>
        </el-form-item>
      </el-col>
      <el-col :sm="4" :xs="24">
        <el-form-item label="其他固定费用" prop="commissionItem.otherFee">
          <el-input-number v-if="isEdit" :controls="false" style="width: 100%" v-model="form.commissionItem!.otherFee" :min="0" placeholder="请输入其他固定费用" />
          <span v-else> {{ form.commissionItem!.otherFee }} </span>
        </el-form-item>
      </el-col>
      <el-col :sm="4" :xs="24">
        <el-form-item label="福利扣除系数" prop="commissionItem.welfareRate">
          <el-input-number v-if="isEdit" :controls="false" style="width: 100%" v-model="form.commissionItem!.welfareRate" :min="0" placeholder="请输入福利扣除系数" />
          <span v-else> {{ form.commissionItem!.welfareRate }} </span>
        </el-form-item>
      </el-col>
      <!-- <el-col :sm="4" :xs="24">
      </el-col> -->
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { EleMessage } from 'ele-admin-plus/es';
  import { useFormData } from '@/utils/use-form-data';
  import { saveCommissionConf, getCommissionConf } from '@/api/agent/agentLevelConfigApi';
  import type { AgentCommissionConf } from '@/api/agent/model/agentLevelConfig';
  const isEdit = ref(false);
  /** 提交状态 */
  const loading = ref(false);

  /** 表单实例 */
  const formRef = ref<FormInstance | null>(null);
  /** 表单数据 */
  const [form, resetFields] = useFormData<AgentCommissionConf>({
    settlePeriod: undefined,
    settlePeriodValue: undefined,
    commissionItem: {
      agentCommissionModel: 1, //RS
      rechargeRate: undefined,
      withdrawRate: undefined,
      otherFee: undefined,
      welfareRate: undefined,
      tripartiteRate: undefined
    }
  });
  const getCommissionConfData = () => {
    getCommissionConf(1).then((res) => {
      Object.assign(form, res || ({} as AgentCommissionConf));
    });
  };
  getCommissionConfData();
  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    'commissionItem.rechargeRate': [
      {
        required: true,
        type: 'number',
        message: '请输入充值手续费比率',
        trigger: 'blur'
      }
    ],
    'commissionItem.withdrawRate': [
      {
        required: true,
        type: 'number',
        message: '请输入提现手续费比率',
        trigger: 'blur'
      }
    ],
    'commissionItem.otherFee': [
      {
        required: true,
        type: 'number',
        message: '请输入其他固定费用',
        trigger: 'blur'
      }
    ],
    'commissionItem.tripartiteRate': [
      {
        required: true,
        type: 'number',
        message: '请输入分润比例',
        trigger: 'blur'
      }
    ],
    'commissionItem.welfareRate': [
      {
        required: true,
        type: 'number',
        message: '请输入福利扣除系数',
        trigger: 'blur'
      }
    ]
  });
  /** 保存编辑 */
  const save = () => {
    if (!isEdit.value) {
      isEdit.value = true;
      return;
    }

    formRef.value?.validate?.((valid) => {
      if (!valid) {
        return;
      }
      loading.value = true;

      saveCommissionConf(form)
        .then((msg) => {
          isEdit.value = false;
          EleMessage.success(msg);
        })
        .catch((e) => {
          EleMessage.error(e.message);
        })
        .finally(() => {
          loading.value = false;
        });
    });
  };
</script>
