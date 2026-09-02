<template>
  <ele-modal
    form
    :width="560"
    v-model="visible"
    :title="isUpdate ? '编辑客服号' : '新增客服号'"
    @open="handleOpen"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="110px" @submit.prevent>
      <el-form-item label="客服号" prop="contact">
        <el-input
          v-model.trim="form.contact"
          :disabled="configLocked"
          placeholder="请输入WhatsApp客服号"
        />
      </el-form-item>
      <el-form-item label="跳转地址" prop="url">
        <el-input
          v-model.trim="form.url"
          :disabled="configLocked"
          placeholder="请输入WhatsApp跳转地址"
        />
        <div v-if="configLocked" class="form-tip">
          已有绑定玩家，客服号和跳转地址不能修改
        </div>
      </el-form-item>
      <el-form-item label="展示位置" prop="showPosition">
        <el-select v-model="form.showPosition" style="width: 100%">
          <el-option label="大厅" :value="1" />
        </el-select>
      </el-form-item>
      <el-alert
        v-if="!isUpdate"
        title="新增后默认下线，确认配置后请在列表中手动上线"
        type="info"
        :closable="false"
      />
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save">保存</el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
  import { computed, nextTick, reactive, ref } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { EleMessage } from 'ele-admin-plus/es';
  import { useFormData } from '@/utils/use-form-data';
  import { addKefu, updateKefu } from '@/api/config/kefuApi';
  import type { KefuRecord } from '@/api/model/kefu';

  const props = defineProps<{
    data?: KefuRecord | null;
  }>();

  const emit = defineEmits<{
    (e: 'done'): void;
  }>();

  const visible = defineModel({ type: Boolean });
  const loading = ref(false);
  const isUpdate = ref(false);
  const formRef = ref<FormInstance>();
  const [form, resetFields, assignFields] = useFormData<Partial<KefuRecord>>({
    id: undefined,
    contact: '',
    url: '',
    showPosition: 1
  });

  const configLocked = computed(() => isUpdate.value && Number(props.data?.players || 0) > 0);

  const rules = reactive<FormRules>({
    contact: [{ required: true, message: '请输入客服号', trigger: 'blur' }],
    url: [{ required: true, message: '请输入WhatsApp跳转地址', trigger: 'blur' }],
    showPosition: [{ required: true, message: '请选择展示位置', trigger: 'change' }]
  });

  const handleOpen = () => {
    if (props.data) {
      assignFields({
        id: props.data.id,
        contact: props.data.contact,
        url: props.data.url,
        showPosition: props.data.showPosition
      });
      isUpdate.value = true;
    } else {
      resetFields();
      form.showPosition = 1;
      isUpdate.value = false;
    }
    nextTick(() => formRef.value?.clearValidate());
  };

  const save = () => {
    formRef.value?.validate(async (valid) => {
      if (!valid) return;
      loading.value = true;
      try {
        if (isUpdate.value) {
          await updateKefu(form as Pick<KefuRecord, 'id' | 'contact' | 'url' | 'showPosition'>);
        } else {
          await addKefu(form as Pick<KefuRecord, 'contact' | 'url' | 'showPosition'>);
        }
        EleMessage.success(isUpdate.value ? '修改成功' : '新增成功');
        visible.value = false;
        emit('done');
      } catch (e: any) {
        EleMessage.error(e.message);
      } finally {
        loading.value = false;
      }
    });
  };
</script>

<style scoped>
  .form-tip {
    color: var(--el-text-color-secondary);
    font-size: 12px;
    line-height: 20px;
  }
</style>
