<!-- 短信模板编辑弹窗 -->
<template>
  <ele-modal form :width="800" v-model="visible" :title="isUpdate ? '修改短信模板' : '新建短信模板'" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent="">
      <el-row :gutter="16">
         <el-col :sm="24" :xs="24">
          <el-form-item label="ID" prop="id">
            <el-input-number  :controls="false"  clearable  v-model="form.id" placeholder="请输入"  style="width: 100%" :disabled="isUpdate"/>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="国家" prop="countryCode">
            <el-select v-model="form.countryCode" placeholder="请选择" clearable style="width: 100%">
               <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :sm="24" :xs="24">
          <el-form-item label="模板编码" prop="templateCode">
            <el-input clearable :maxlength="50" v-model="form.templateCode" placeholder="请输入" />
          </el-form-item>
        </el-col> -->
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="模板名称" prop="templateName">
            <el-input clearable :maxlength="50" v-model="form.templateName" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :value="1">启用</el-radio>
              <el-radio :value="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="模板内容" prop="content">
            <el-input clearable type="textarea" :rows="6" :maxlength="500" v-model="form.content" placeholder="请输入模板内容，支持占位符 {paramName}" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="参数" prop="paramNameStr">
            <el-input clearable v-model="form.paramNameStr" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save">保存</el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref, reactive, nextTick } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { EleMessage } from 'ele-admin-plus/es';
  import { useFormData } from '@/utils/use-form-data';
  import { addSmsTemplate, updateSmsTemplate } from '@/api/platform/smsTemplateApi';
  import type { SmsTemplateVO } from '@/api/platform/model/smsTemplate';
  import { useConfigStore } from '@/store/modules/config';

  const configStore = useConfigStore();

  const props = defineProps<{
    /** 修改回显的数据 */
    data?: SmsTemplateVO | null;
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
  const [form, resetFields, assignFields] = useFormData<SmsTemplateVO>({
    id: undefined,
    templateCode: undefined,
    templateName: undefined,
    countryCode: configStore.countryArr?.[0]?.code,
    content: undefined,
    paramNames: undefined,
    paramNameStr: '[]',
    status: 1
  });

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    countryCode: [{ required: true, message: '请输入国家代码', trigger: 'blur' }],
    id: [{ required: true, message: '请输入ID', trigger: 'blur' }],
    templateCode: [{ required: true, message: '请输入模板编码', trigger: 'blur' }],
    templateName: [{ required: true, message: '请输入模板名称', trigger: 'blur' }],
    content: [{ required: true, message: '请输入模板内容', trigger: 'blur' }],
    status: [{ required: true, message: '请选择状态', trigger: 'change' }]
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
      const params = { ...form };
      params.paramNames = JSON.parse(form.paramNameStr || '[]');
      const saveOrUpdate = isUpdate.value ? updateSmsTemplate : addSmsTemplate;
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
      if (props.data.paramNames) {
        form.paramNameStr = JSON.stringify(props.data.paramNames);
      } else {
        form.paramNameStr = '[]';
      }
      isUpdate.value = true;
    } else {
      resetFields();
      form.status = 1;
      form.paramNameStr = '[]';
      isUpdate.value = false;
    }
    nextTick(() => {
      nextTick(() => {
        formRef.value?.clearValidate?.();
      });
    });
  };
</script>
