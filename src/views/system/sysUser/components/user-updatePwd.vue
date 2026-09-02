<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="580" v-model="visible" title="重置密码" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item  label="重置密码" prop="password">
            <el-input show-password type="password" v-model.trim="form.password" placeholder="请输入要重置的密码" />
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
import { updateUserPassword } from '@/api/system/sysUserApi';
import type { SysUser } from '@/api/model/sysUser';

const props = defineProps<{
  /** 修改回显的数据 */
  data?: SysUser | null;
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
const [form, resetFields, assignFields] = useFormData<SysUser>({
  id: void 0,
  username: undefined,
  password: '',
});

/** 表单验证规则 */
const rules = reactive<FormRules>({
  password: [
    {
      required: true,
      message: '请输入密码',
      type: 'string',
      trigger: 'blur'
    },
    {
      type: 'string',
      trigger: 'blur',
      validator: (_rule: any, value: string, callback: any) => {
        if (isUpdate.value || /^[\S]{5,18}$/.test(value)) {
          return callback();
        }
        callback(new Error('密码必须为5-18位非空白字符'));
      }
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
    updateUserPassword(form)
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
    assignFields({ ...props.data, password: '' });
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
