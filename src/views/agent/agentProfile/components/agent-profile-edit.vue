<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="680" v-model="visible" :title="isUpdate ? '修改代理账号' : '新建代理账号'" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="账号ID：" name="agentId">
            <!-- <el-input-number :controls="false" style="width: 100%" v-model="form.agentId" :min="0" placeholder="请输入" /> -->
            {{ form.agentId }}
          </el-form-item>
        </el-col>
        <!--<el-col :sm="24" :xs="24">
          <el-form-item label="代理ID" name="agentId">
            <el-input-number :controls="false" style="width: 100%" v-model="form.agentId" :min="0" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="国家代码" name="countryCode">
            <el-select v-model="form.countryCode" placeholder="请选择" style="width: 100%">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="渠道" name="channel">
            <el-select v-model="form.channel" placeholder="请选择渠道" style="width: 100%">
              <el-option v-for="item in configStore.ShareChannelArr" :key="item.id" :label="item.channelName" :value="item.channel|| 0" />
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col :sm="24" :xs="24">
          <el-form-item label="代理等级：" name="agentLevel">
            {{ form.agentLevel }}
            <!-- <el-input-number :controls="false" style="width: 100%" v-model="form.agentLevel" :min="0" placeholder="请输入" /> -->
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="代理类型：" name="agentType">
            <!-- <el-select v-model="form.agentType" placeholder="请选择代理类型" style="width: 100%" clearable>
              <el-option label="总代理" :value="1" />
              <el-option label="普通代理" :value="2" />
            </el-select> -->
            {{ form.agentType == 1 ? '总代理' : '普通代理' }}
          </el-form-item>
        </el-col>
        <!-- <el-col :sm="24" :xs="24">
          <el-form-item label="状态:" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :value="1">启用</el-radio>
              <el-radio :value="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col> -->
        <el-col :sm="24" :xs="24">
          <el-form-item label="佣金模式：" name="commissionModel">
            <el-select v-model="form.commissionModel" placeholder="请选择佣金模式" style="width: 100%" clearable>
              <el-option label="CPA" :value="0" />
              <el-option label="Revenue Share" :value="1" />
              <el-option label="Hybrid" :value="2" />
              <el-option label="Turnover" :value="3" />
            </el-select>
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
import { addAgentProfile, updateAgentProfile } from '@/api/agent/agentProfileApi';
import type { AgentProfile } from '@/api/agent/model/agentProfile';
import { useConfigStore } from '@/store/modules/config';
const configStore = useConfigStore();
const props = defineProps<{
  /** 修改回显的数据 */
  data?: AgentProfile | null;
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
const [form, resetFields, assignFields] = useFormData<AgentProfile>({
  id: undefined,
  agentId: undefined,
  // status: 1,
  countryCode: undefined,
  channel: undefined,
  totalProfit: undefined,
  totalWithdraw: undefined,
  inviterUserCount: undefined,
  inviterAgentCount: undefined,
  totalContribution: undefined,
  inviterAgentId: undefined,
  loginCount: undefined,
  firstLoginTime: undefined,
  firstLoginIp: undefined,
  firstLoginAddress: undefined,
  lastLoginTime: undefined,
  lastLoginIp: undefined,
  lastLoginAddress: undefined,
  agentLevel: undefined,
  agentType: undefined,
  commissionModel: undefined,
  profit0: undefined,
  profit1: undefined,
  profit2: undefined,
  profit3: undefined,
  contribution0: undefined,
  contribution1: undefined,
  contribution2: undefined,
  contribution3: undefined
});

/** 表单验证规则 */
const rules = reactive<FormRules>({
  id: [
    {
      required: true,
      type: 'number',
      message: '请输入',
      trigger: 'blur'
    }
  ],
  agentId: [
    {
      required: true,
      type: 'number',
      message: '请输入代理id',
      trigger: 'blur'
    }
  ],
  countryCode: [
    {
      required: true,
      type: 'number',
      message: '请输入国家代码',
      trigger: 'blur'
    }
  ],
  channel: [
    {
      required: true,
      type: 'number',
      message: '请输入渠道',
      trigger: 'blur'
    }
  ],
  totalProfit: [
    {
      required: true,
      type: 'number',
      message: '请输入总收益',
      trigger: 'blur'
    }
  ],
  totalWithdraw: [
    {
      required: true,
      type: 'number',
      message: '请输入总提现',
      trigger: 'blur'
    }
  ],
  inviterUserCount: [
    {
      required: true,
      type: 'number',
      message: '请输入总推广人数',
      trigger: 'blur'
    }
  ],
  inviterAgentCount: [
    {
      required: true,
      type: 'number',
      message: '请输入总推广代理数',
      trigger: 'blur'
    }
  ],
  totalContribution: [
    {
      required: true,
      type: 'number',
      message: '请输入贡献',
      trigger: 'blur'
    }
  ],
  inviterAgentId: [
    {
      required: true,
      type: 'number',
      message: '请输入上级代理id',
      trigger: 'blur'
    }
  ],
  loginCount: [
    {
      required: true,
      type: 'number',
      message: '请输入累计登录次数',
      trigger: 'blur'
    }
  ],
  firstLoginTime: [
    {
      required: true,
      type: 'number',
      message: '请输入首次登录时间',
      trigger: 'blur'
    }
  ],
  firstLoginIp: [
    {
      required: true,
      type: 'string',
      message: '请输入首次登录IP',
      trigger: 'blur'
    }
  ],
  firstLoginAddress: [
    {
      required: true,
      type: 'string',
      message: '请输入首次登录地理位置',
      trigger: 'blur'
    }
  ],
  lastLoginTime: [
    {
      required: true,
      type: 'number',
      message: '请输入最后登录时间',
      trigger: 'blur'
    }
  ],
  lastLoginIp: [
    {
      required: true,
      type: 'string',
      message: '请输入最后登录IP',
      trigger: 'blur'
    }
  ],
  lastLoginAddress: [
    {
      required: true,
      type: 'string',
      message: '请输入最后登录地理位置',
      trigger: 'blur'
    }
  ],
  agentLevel: [
    {
      required: true,
      type: 'number',
      message: '请输入代理等级',
      trigger: 'blur'
    }
  ],
  agentType: [
    {
      required: true,
      type: 'number',
      message: '请输入代理类型: 1=总代理 2=普通代理 ',
      trigger: 'blur'
    }
  ],
  commissionModel: [
    {
      required: true,
      type: 'number',
      message: '请输入佣金模式 0=CPA 1=Revenue Share 2=Hybrid 3=Turnover',
      trigger: 'blur'
    }
  ],
  profit0: [
    {
      required: true,
      type: 'number',
      message: '请输入cpa返利',
      trigger: 'blur'
    }
  ],
  profit1: [
    {
      required: true,
      type: 'number',
      message: '请输入rs返利',
      trigger: 'blur'
    }
  ],
  profit2: [
    {
      required: true,
      type: 'number',
      message: '请输入hybrid返利',
      trigger: 'blur'
    }
  ],
  profit3: [
    {
      required: true,
      type: 'number',
      message: '请输入Turnover返利',
      trigger: 'blur'
    }
  ],
  contribution0: [
    {
      required: true,
      type: 'number',
      message: '请输入cpa贡献',
      trigger: 'blur'
    }
  ],
  contribution1: [
    {
      required: true,
      type: 'number',
      message: '请输入rs贡献',
      trigger: 'blur'
    }
  ],
  contribution2: [
    {
      required: true,
      type: 'number',
      message: '请输入hybrid贡献',
      trigger: 'blur'
    }
  ],
  contribution3: [
    {
      required: true,
      type: 'number',
      message: '请输入Turnover贡献',
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
    const saveOrUpdate = isUpdate.value ? updateAgentProfile : addAgentProfile;
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
