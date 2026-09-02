<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="880" v-model="visible" :title="t('agentApplyRecords.auditTitle')" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="110px" @submit.prevent="">
      <el-row :gutter="16">
        <!-- <el-col :sm="24" :xs="24" :md="12">
          <el-form-item label="UID:">
            <span>{{ form.uid }}</span>
          </el-form-item>
        </el-col> -->
        <el-col :sm="24" :xs="24" :md="12">
          <el-form-item :label="t('agentApplyRecords.table.uid')" prop="uid">
            <span>{{ form.uid }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <!-- <el-col :sm="24" :xs="24" :md="12">
          <el-form-item label="昵称:" prop="nickname">
            <span>{{ form.nickname }}</span>
          </el-form-item>
        </el-col> -->
        <!-- <el-col :sm="24" :xs="24" :md="12">
          <el-form-item label="等级:" prop="agentLevel">
            <span>{{ form.agentLevel }}</span>
          </el-form-item>
        </el-col> -->
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24" :md="12">
          <el-form-item :label="t('agentApplyRecords.table.phone')" prop="phone">
            <span>{{ form.phone }}</span>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24" :md="12">
          <el-form-item :label="t('agentApplyRecords.table.whatsApp')" prop="whatsApp">
            <span>{{ form.whatsApp }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item :label="t('agentApplyRecords.table.auditResult')" prop="status">
            <el-radio-group v-model="form.status" @change="handleStatusChange">
              <el-radio :value="1">{{ t('agentApplyRecords.pass') }}</el-radio>
              <el-radio :value="2">{{ t('agentApplyRecords.reject') }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item :label="t('agentApplyRecords.table.handleRemark')" prop="handleRemark"
            :rules="form.status === 2 ? [{ required: true, message: t('common.placeholder.input'), trigger: 'blur' }] : []">
            <el-input v-model="form.handleRemark" type="textarea" :rows="3" :placeholder="t('common.placeholder.input')" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item :label="t('agentApplyRecords.table.agentType')" prop="agentType"
            :rules="form.status === 1 ? [{ required: true, message: t('common.placeholder.select'), trigger: 'change' }] : []">
            <el-select v-model="form.agentType" :placeholder="t('common.placeholder.select')" @change="handleAgentTypeChange">
              <el-option v-for="item in agentTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item :label="t('agentApplyRecords.table.commissionModelLabel')" prop="commissionModel"
            :rules="form.status === 1 ? [{ required: true, message: t('common.placeholder.select'), trigger: 'change' }] : []">
            <el-select v-model="form.commissionModel" :placeholder="t('common.placeholder.select')" @change="handleCommissionModelChange">
              <el-option v-for="item in commissionModelOptions" :key="item.value" :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item :label="t('agentApplyRecords.table.agentLevel')" prop="agentLevel">
            <!-- <el-select v-model="form.agentLevel" placeholder="请选择代理等级">
              <el-option v-for="item in levelArr" :label="item.label" :value="item.value" />
            </el-select> -->
            {{ 1 }}
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">{{ t('action.cancel') }}</el-button>
      <el-popconfirm :title="t('agentApplyRecords.confirmChannelTip')" @confirm="save()" width="250px">
        <template #reference>
          <el-button type="primary" :loading="loading">{{ t('action.save') }}</el-button>
        </template>
      </el-popconfirm>
      <!-- <el-button type="primary" :loading="loading" @click="save"> 保存 </el-button> -->
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick, computed } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { EleMessage } from 'ele-admin-plus/es';
import { useFormData } from '@/utils/use-form-data';
// import { updateAgent } from '@/api/user/agentApi';
import { auditAgent } from '@/api/agent/applyRecordsApi';
import { pageAgentLevelConfigs } from '@/api/agent/agentLevelConfigApi';
import type { ApplyRecords } from '@/api/agent/model/applyRecords';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  /** 修改回显的数据 */
  data?: ApplyRecords | null;
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
const [form, resetFields, assignFields] = useFormData<ApplyRecords>({
  id: undefined,
  uid: undefined,
  handleRemark: undefined,
  agentLevel: undefined,
  commissionModel: undefined,
  whatsApp: undefined,
  phone: undefined,
  status: 1
});

/** 表单验证规则 */
const rules = reactive<FormRules>({
  // handleRemark: [
  //   {
  //     required: false,
  //     type: 'string',
  //     message: '请输入审核备注',
  //     trigger: 'blur'
  //   }
  // ],
  // agentType: [
  //   {
  //     required: true,
  //     type: 'number',
  //     message: '请选择代理类型',
  //     trigger: 'change'
  //   }
  // ],
  // commissionModel: [
  //   {
  //     required: true,
  //     type: 'number',
  //     message: '请选择佣金核算模式',
  //     trigger: 'change'
  //   }
  // ],
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
  // rules.handleRemark![0].required = status === 2;
  // rules.agentType![0].required = status === 1;
  // rules.commissionModel![0].required = status === 1;
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
    // rules.handleRemark![0].required = false;
    // rules.agentType![0].required = true;
    // rules.commissionModel![0].required = true;
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
/** 代理类型选项（本身已是总代理时只能选普代） */
const agentTypeOptions = computed(() => {
  if (props.data?.inviterAgentType === 1) {
    return [{ label: t('agentApplyRecords.agentType2'), value: 2 }];
  }
  return [
    { label: t('agentApplyRecords.agentType1'), value: 1 },
    { label: t('agentApplyRecords.agentType2'), value: 2 }
  ];
});

/** 佣金核算模式选项（总代理仅RS模式） */
const commissionModelOptions = computed(() => {
  if (form.agentType === 1) {
    return [{ label: t('agentApplyRecords.commissionModelRs'), value: '1' }];
  }
  return [
    { label: t('agentApplyRecords.commissionModelCpa'), value: '0' },
    { label: t('agentApplyRecords.commissionModelRs'), value: '1' }
  ];
});

const handleAgentTypeChange = (val: number) => {
  // 总代理只有RS模式，自动设置
  // if (val === 1) {
  //   form.commissionModel = '1';
  // } else {
  form.commissionModel = undefined;
  // }
  fetchLevelArr(val, form.commissionModel !== undefined ? Number(form.commissionModel) : undefined);
};
const handleCommissionModelChange = (val: number) => {
  fetchLevelArr(form.agentType, val);
};
</script>
