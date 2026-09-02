<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="980" v-model="visible" :title="isUpdate ? '修改代理配置' : '新建代理配置'" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="150px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :sm="12" :xs="12">
          <el-form-item label="代理类型:">
            <!-- <el-select v-model="form.agentType" placeholder="请选择代理类型" style="width: 100%" clearable>
              <el-option label="总代理" :value="1" />
              <el-option label="普通代理" :value="2" />
            </el-select> -->
            总代理
          </el-form-item>
        </el-col>

        <el-col :sm="12" :xs="12">
          <el-form-item label="分润模式:">
            <!-- <el-select v-model="form.commissionModel" placeholder="请选择分润模式" style="width: 100%" clearable>
              <el-option label="CPA" :value="0" />
              <el-option label="Revenue Share" :value="1" />
              <el-option label="Hybrid" :value="2" />
              <el-option label="Turnover" :value="3" />
            </el-select> -->
            Revenue Share
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="代理等级" prop="agentLevel">
            <el-input-number :controls="false" style="width: 100%" v-model="form.agentLevel" :min="0"
              placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="升级条件满足个数" prop="upgradeConditionCount">
            <el-input-number :controls="false" style="width: 100%" v-model="form.upgradeConditionCount" :min="0"
              placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="RS分润比例" prop="rate1">
            <el-input-number :controls="false" style="width: 100%" v-model="form.rate1" :min="0" :max="1"
              placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="CPA分润比例" prop="rate">
            <el-input-number :controls="false" style="width: 100%" v-model="form.rate" :min="0" :max="1"
              placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="总付费人数阈值（含直属+普代直属）" prop="maTotalPaidUserCount" class="special">
            <el-input-number :controls="false" style="width: 100%" v-model="form.maTotalPaidUserCount" :min="0"
              placeholder="请输入" />
          </el-form-item>
        </el-col>
        <!-- <el-col :sm="12" :xs="12">
          <el-form-item label="总充值金额阈值（含直属+普代直属）" prop="maTotalRechargeAmount" class="special">
            <el-input-number :controls="false" style="width: 100%" v-model="form.maTotalRechargeAmount" :min="0"
              placeholder="请输入" />
          </el-form-item>
        </el-col> -->

        <el-col :sm="12" :xs="12">
          <el-form-item label="结算周期内新增付费用户阈值（含直属+普代直属）" prop="maCycleNewPaidUserCount" class="special">
            <el-input-number :controls="false" style="width: 100%" v-model="form.maCycleNewPaidUserCount" :min="0"
              placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="团队总GGR阈值（含直属+普代直属）" prop="maTotalGgr" class="special">
            <el-input-number :controls="false" style="width: 100%" v-model="form.maTotalGgr" :min="0"
              placeholder="请输入" />
          </el-form-item>
        </el-col>
        <!-- <el-col :sm="12" :xs="12">
          <el-form-item label="团队周期内GGR阈值（含直属+普代直属）" prop="maCycleGgr" class="special">
            <el-input-number :controls="false" style="width: 100%" v-model="form.maCycleGgr" :min="0"
              placeholder="请输入" />
          </el-form-item>
        </el-col> -->
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
import { addAgentLevelConfig, updateAgentLevelConfig } from '@/api/agent/agentLevelConfigApi';
import type { AgentLevelConfig } from '@/api/agent/model/agentLevelConfig';

const props = defineProps<{
  /** 修改回显的数据 */
  data?: AgentLevelConfig | null;
}>();

const emit = defineEmits<{
  (e: 'done'): void;
}>();

/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });

/** 是否是修改 */
const isUpdate = ref(false);

/** 提交状态 */
const loading = ref(false);

/** 表单实例 */
const formRef = ref<FormInstance | null>(null);

/** 表单数据 */
const [form, resetFields, assignFields] = useFormData<AgentLevelConfig>({
  id: undefined,
  agentType: undefined,
  agentLevel: undefined,
  commissionModel: undefined,
  rate: undefined,
  rate1: undefined,
  upgradeConditionCount: undefined,
  maTotalPaidUserCount: undefined,
  maTotalRechargeAmount: undefined,
  maCycleNewPaidUserCount: undefined,
  maTotalGgr: undefined,
  maCycleGgr: undefined
});

/** 表单验证规则 */
const rules = reactive<FormRules>({
  agentType: [
    {
      required: true,
      type: 'number',
      message: '请选择代理类型',
      trigger: 'blur'
    }
  ],
  agentLevel: [
    {
      required: true,
      type: 'number',
      message: '请选择代理等级',
      trigger: 'blur'
    }
  ],
  commissionModel: [
    {
      required: true,
      type: 'number',
      message: '请选择分润模式',
      trigger: 'blur'
    }
  ],
  rate: [
    {
      required: true,
      type: 'number',
      message: '请输入CPA分润比例',
      trigger: 'blur'
    }
  ],
  rate1: [
    {
      required: true,
      type: 'number',
      message: '请输入RS分润比例',
      trigger: 'blur'
    }
  ],
  upgradeConditionCount: [
    {
      required: true,
      type: 'number',
      message: '请输入需满足的升级条件个数，满足其中N条即可升级',
      trigger: 'blur'
    }
  ],
  maTotalPaidUserCount: [
    {
      required: true,
      type: 'number',
      message: '请输入总付费人数阈值（含直属+普代直属）',
      trigger: 'blur'
    }
  ],
  maTotalRechargeAmount: [
    {
      required: true,
      type: 'number',
      message: '请输入总充值金额阈值（含直属+普代直属）',
      trigger: 'blur'
    }
  ],
  maCycleNewPaidUserCount: [
    {
      required: true,
      type: 'number',
      message: '请输入结算周期内新增付费用户阈值（含直属+普代直属）',
      trigger: 'blur'
    }
  ],
  maTotalGgr: [
    {
      required: true,
      type: 'number',
      message: '请输入团队总GGR阈值（含直属+普代直属）',
      trigger: 'blur'
    }
  ],
  maCycleGgr: [
    {
      required: true,
      type: 'number',
      message: '请输入团队周期内GGR阈值（含直属+普代直属）',
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
    const saveOrUpdate = isUpdate.value ? updateAgentLevelConfig : addAgentLevelConfig;
    // 只能选择总代理
    form.agentType = 1;
    // 只能选择Revenue Share
    form.commissionModel = 1;
    saveOrUpdate(form)
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
    // 只能选择总代理
    form.agentType = 1;
    // 只能选择Revenue Share
    form.commissionModel = 1;
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
<style lang="scss" scoped>
:deep(.special .el-form-item__label) {
  line-height: 15px !important;
}
</style>
