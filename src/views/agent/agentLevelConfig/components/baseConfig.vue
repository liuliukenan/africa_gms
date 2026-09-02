<!-- 用户编辑弹窗 -->
<template>
  <el-form ref="formRef" :model="form" :rules="rules" @submit.prevent="">
    <div style="display: flex; justify-content: space-between">
      <div style="margin-bottom: 20px; font-size: 18px; font-weight: bold">基础配置</div>

      <el-button :type="isEdit ? 'success' : 'danger'" :loading="loading" @click="save"> {{ isEdit ? '保存' : '编辑' }} </el-button>
    </div>
    <el-row :gutter="16">
      <el-col :sm="6" :xs="24">
        <el-form-item label="结算周期:" prop="settlePeriod">
          <el-radio-group v-model="form.settlePeriod" v-if="isEdit">
            <el-radio :value="1">日结</el-radio>
            <el-radio :value="2">每周</el-radio>
            <el-radio :value="3">每月</el-radio>
          </el-radio-group>
          <span>{{ form.settlePeriod === 1 ? '日结' : form.settlePeriod === 2 ? '每周' : '每月' }}</span>
        </el-form-item>
      </el-col>
      <el-col :sm="6" :xs="24" v-if="form.settlePeriod !== 1">
        <el-form-item label="具体天数:" prop="settlePeriodValue">
          <el-input-number v-if="isEdit" :controls="false" style="width: 100%" v-model="form.settlePeriodValue" :min="1" :max="form.settlePeriod === 2 ? 7 : 31" placeholder="请输入具体天数" />
          <span v-else>{{ form.settlePeriodValue }}</span>
        </el-form-item>
      </el-col>
      <el-col :sm="6" :xs="24" v-if="form.settlePeriod !== 1">
        <el-form-item label="具体时间:" prop="settlePeriodTime">
          <span style="color: red">0:00</span>
        </el-form-item>
      </el-col>
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

  /** 提交状态 */
  const loading = ref(false);
  const isEdit = ref(false);

  /** 表单实例 */
  const formRef = ref<FormInstance | null>(null);
  /** 表单数据 */
  const [form, resetFields] = useFormData<AgentCommissionConf>({
    settlePeriod: 1,
    settlePeriodValue: undefined,
    commissionItem: {
      agentCommissionModel: 1, //RS
      rechargeRate: undefined,
      withdrawRate: undefined,
      otherFee: undefined,
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
    settlePeriodValue: [
      {
        required: true,
        type: 'number',
        message: '请输入具体天数',
        trigger: 'blur'
      }
    ],
    settlePeriod: [
      {
        required: true,
        type: 'number',
        message: '请选择结算周期',
        trigger: 'blur'
      }
    ]
  });
  /** 保存编辑 */
  const save = () => {
    isEdit.value = !isEdit.value;
    if (isEdit.value) return;
    formRef.value?.validate?.((valid) => {
      if (!valid) {
        return;
      }
      loading.value = true;

      saveCommissionConf(form)
        .then((msg) => {
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
