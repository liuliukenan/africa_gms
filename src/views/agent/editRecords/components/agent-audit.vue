<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="880" v-model="visible" title="佣金模式更换申请" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="130px" @submit.prevent="">
      <el-row :gutter="16">
        <!-- <el-col :sm="24" :xs="24" :md="12">
          <el-form-item label="UID:">
            <span>{{ form.uid }}</span>
          </el-form-item>
        </el-col> -->
        <el-col :sm="12" :xs="24" :md="12">
          <el-form-item label="账号ID:" prop="uid">
            <span>{{ form.uid }}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24" :md="12">
          <el-form-item label="代理类型:">
            <span>{{ form.agentType == 1 ? '总代理' : (form.agentType == 2 ? '普通代理' : '无') }}</span>
          </el-form-item>
        </el-col>
        <!-- <el-col :sm="12" :xs="24" :md="12">
          <el-form-item label="等级:" prop="agentLevel">
            <span>{{ form.agentLevel }}</span>
          </el-form-item>
        </el-col> -->

        <el-col :sm="12" :xs="24">
          <el-form-item label="代理等级:" prop="agentLevel">
            <!-- <el-select v-model="form.agentLevel" placeholder="请选择代理等级">
              <el-option v-for="item in levelArr" :label="item.label" :value="item.value" />
            </el-select> -->
            {{ form.agentLevel|| '--'  }}
          </el-form-item>
        </el-col>
        <!-- <el-col :sm="12" :xs="24" :md="12">
          <el-form-item label="手机号:" prop="phone">
            <span>{{ form.phone }}</span>
          </el-form-item>
        </el-col> -->
        <!-- <el-col :sm="24" :xs="24" :md="12">
          <el-form-item label="whatapp ID:" prop="whatsApp">
            <span>{{ form.whatsApp }}</span>
          </el-form-item>
        </el-col> -->
        <el-col :sm="12" :xs="24">
          <el-form-item label="现佣金模式:" >
            <!-- <el-select v-model="form.commissionModel" placeholder="请选择佣金核算模式" @change="handleCommissionModelChange">
              <el-option label="CPA模式" :value="0" />
              <el-option label="Revenue Share 模式" :value="1" />
            </el-select> -->
            {{ getModel(String(form.oldCommissionModel)) || '--'}}
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="申请新佣金模式:" >
            <!-- <el-select v-model="form.commissionModel" placeholder="请选择佣金核算模式" @change="handleCommissionModelChange">
              <el-option label="CPA模式" :value="0" />
              <el-option label="Revenue Share 模式" :value="1" />
            </el-select> -->
            {{ getModel(String(form.commissionModel)) || '--'}}
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="上次更改模式时间:" >
            {{  form.lastUpdateTime || '--' }}
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="审核结果:" prop="status">
            <el-radio-group v-model="form.status" @change="handleStatusChange">
              <el-radio :value="1">通过</el-radio>
              <el-radio :value="2">拒绝</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="审核备注:" prop="handleRemark" >
            <el-input v-model="form.handleRemark" type="textarea" :rows="3" placeholder="请输入审核备注" style="width: 100%" />
          </el-form-item>
        </el-col>
        <!-- <el-col :sm="24" :xs="24">
          <el-form-item label="代理类型:" prop="agentType" :required="form.status === 1">
            <el-select v-model="form.agentType" placeholder="请选择代理类型" @change="handleAgentTypeChange">
              <el-option label="总代理" :value="1" />
              <el-option label="普通代理" :value="2" />
            </el-select>
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
// import { updateAgent } from '@/api/user/agentApi';
import { auditAgent } from '@/api/agent/applyRecordsApi';
import { pageAgentLevelConfigs } from '@/api/agent/agentLevelConfigApi';
import type { ApplyRecordsParam, ApplyRecords } from '@/api/agent/model/applyRecords';

const props = defineProps<{
  /** 修改回显的数据 */
  data?: ApplyRecords | null;
}>();

const emit = defineEmits<{
  (e: 'done'): void;
}>();
const getModel = (type: string) => {
  switch (type) {
    case '0':
      return 'CPA';
    case '1':
      return 'Revenue Share';
    case '2':
      return 'Hybrid';
    case '3':
      return 'Turnover';
    default:
      return '';
  }
};
/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });

/** 是否是修改 */
const isUpdate = ref(false);

/** 提交状态 */
const loading = ref(false);

/** 表单实例 */
const formRef = ref<FormInstance | null>(null);

/** 表单数据 */
const [form, resetFields, assignFields] = useFormData<ApplyRecords>({
  id: undefined,
  uid: undefined,
  handleRemark: undefined,
  agentLevel: undefined,
  commissionModel: undefined,
  whatsApp: undefined,
  phone: undefined,
  lastUpdateTime: undefined,
  oldCommissionModel: undefined,
  status: 1
});

/** 表单验证规则 */
const rules = reactive<FormRules>({
  handleRemark: [
    {
      required: false,
      type: 'string',
      message: '请输入审核备注',
      trigger: 'blur'
    }
  ],
  agentType: [
    {
      required: true,
      type: 'number',
      message: '请选择代理类型',
      trigger: 'change'
    }
  ],
  commissionModel: [
    {
      required: true,
      type: 'number',
      message: '请选择佣金核算模式',
      trigger: 'change'
    }
  ],
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
    // const saveOrUpdate = isUpdate.value ? updateAgent : addAgent;;
    let params = { ...form, level: 1 };
    auditAgent(params)
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

/** 切换审核结果：拒绝时清空代理类型/佣金模式并取消校验 */
const handleStatusChange = (status: number) => {
  rules.handleRemark![0].required = status === 2;
  rules.agentType![0].required = status === 1;
  rules.commissionModel![0].required = status === 1;
  if (status === 2) {
    form.agentType = undefined;
    form.commissionModel = undefined;
    form.agentLevel = undefined;
    levelArr.value = [];
    nextTick(() => formRef.value?.clearValidate(['agentType', 'commissionModel']));
  }
};

/** 弹窗打开事件 */
const handleOpen = () => {
  if (props.data) {
    assignFields({ ...props.data });
    form.status = 1;
    rules.handleRemark![0].required = false;
    rules.agentType![0].required = true;
    rules.commissionModel![0].required = true;
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
const levelArr = ref<{ label: string; value: number }[]>([]);
// 根据 agentType + commissionModel 获取代理等级列表
const fetchLevelArr = async (agentType?: number, commissionModel?: number) => {
  if (agentType === undefined || commissionModel === undefined) {
    levelArr.value = [];
    return;
  }
  try {
    const res = await pageAgentLevelConfigs({ agentType, commissionModel, limit: 200, page: 1 });
    const list = res?.list ?? [];
    levelArr.value = list
      .filter((item) => item.agentLevel !== undefined)
      .map((item) => ({ label: ` ${item.agentLevel}`, value: item.agentLevel as number }));
  } catch (e) {
    levelArr.value = [];
  }
  // 重置已选等级（避免旧值不在新列表中）
  form.agentLevel = undefined;
};
const handleAgentTypeChange = (val: number) => {
  fetchLevelArr(val, form.commissionModel !== undefined ? Number(form.commissionModel) : undefined);
};
const handleCommissionModelChange = (val: number) => {
  fetchLevelArr(form.agentType, val);
};
</script>
