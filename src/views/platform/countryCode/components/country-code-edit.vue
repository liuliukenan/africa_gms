<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="880" v-model="visible" :title="isUpdate ? '修改国家代码' : '新建国家代码'" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="150px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="国家区号" prop="code">
            <el-input-number :max="9999999999" v-model="form.code" :min="0" :controls="false" placeholder="请输入"
              style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="手机位数" prop="phoneLen">
            <el-input-number :min="0" v-model="form.phoneLen" :controls="false" placeholder="请输入"
              style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="国家名称" prop="name">
            <el-input clearable :maxlength="50" v-model="form.name" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="中文名" prop="note">
            <el-input clearable :maxlength="50" v-model="form.note" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="时区" prop="timezone">
            <el-input clearable :maxlength="50" v-model="form.timezone" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="币种" prop="currency">
            <el-input clearable  v-model="form.currency" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="主钱包流水清理金额" prop="masterWalletCleanFlowAmount">
            <el-input-number :min="0" v-model="form.masterWalletCleanFlowAmount" :controls="false" placeholder="请输入"
              style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="子钱包流水清理金额" prop="childWalletCleanFlowAmount">
            <el-input-number :min="0" v-model="form.childWalletCleanFlowAmount" :controls="false" placeholder="请输入"
              style="width: 100%;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="启用" prop="state">
            <el-radio-group v-model="form.state" style="display: inline-block;">
              <el-radio :value="1">是</el-radio>
              <el-radio :value="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save">
        保存
      </el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { EleMessage } from "ele-admin-plus/es";
import { useFormData } from "@/utils/use-form-data";
import { addCountryCode, updateCountryCode } from "@/api/platform/countryCodeApi";
import type { CountryCode } from "@/api/platform/model/countryCode";

const props = defineProps<{
  /** 修改回显的数据 */
  data?: CountryCode | null;
}>();

const emit = defineEmits<{
  (e: "done"): void;
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
const [form, resetFields, assignFields] = useFormData<CountryCode>({
  id: undefined,
  code: undefined,
  phoneLen: undefined,
  name: undefined,
  note: undefined,
  timezone: undefined,
  state: undefined,
  currency: undefined,
  masterWalletCleanFlowAmount: undefined,
  childWalletCleanFlowAmount: undefined
});
/** 表单验证规则 */
const rules = reactive<FormRules>({
  code: [
    {
      required: true,
      type: 'number',
      message: '请输入国家电话',
      trigger: 'blur'
    }
  ],
  currency: [
    {
      required: true,
      type: 'string',
      message: '请输入币种',
      trigger: 'blur'
    }
  ],
  name: [
    {
      required: true,
      type: 'string',
      message: '请输入国家名称',
      trigger: 'blur'
    }
  ],
  note: [
    {
      required: true,
      type: 'string',
      message: '请输入中文名',
      trigger: 'blur'
    }
  ],
  timezone: [
    {
      required: true,
      type: 'string',
      message: '请输入时区',
      trigger: 'blur'
    }
  ],
  state: [
    {
      required: true,
      type: 'number',
      message: '请输入启用0未用1启用',
      trigger: 'blur'
    }
  ],
  masterWalletCleanFlowAmount: [
    {
      required: true,
      type: 'number',
      message: '请输入主钱包流水清理金额',
      trigger: 'blur'
    }
  ],
  childWalletCleanFlowAmount: [
    {
      required: true,
      type: 'number',
      message: '请输入子钱包流水清理金额',
      trigger: 'blur'
    }
  ],
  phoneLen: [
    {
      required: true,
      type: 'number',
      message: '请输入手机位数',
      trigger: 'blur'
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
    const saveOrUpdate = isUpdate.value ? updateCountryCode : addCountryCode;;
    saveOrUpdate(form)
      .then((msg) => {
        loading.value = false;
        EleMessage.success(msg);
        handleCancel();
        emit("done");
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
