<!-- 修改密码弹窗 -->
<template>
  <ele-modal form :width="520" :title="t('login.editPwd')" :append-to-body="true" v-model="visible"
    @closed="handleClosed">
    <el-form ref="formRef" :model="form" :rules="rules" @submit.prevent="" label-position="top">
      <el-form-item label="原密码" prop="oldPassword">
        <el-input show-password type="password" size="large" v-model="form.oldPassword" placeholder="请输入原密码" />
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input show-password type="password" size="large" v-model="form.password" placeholder="请输入新密码" />
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input show-password type="password" size="large" v-model="form.password2" placeholder="请输入确认密码" />
      </el-form-item>
      <!-- <el-form-item :label="t('login.form.code')" prop="code">
        <el-input size="large"  v-model="form.code" :placeholder="t('login.placeholder.code')" />
      </el-form-item> -->
    </el-form>
    <template #footer>
      <el-button @click="handleCancel" size="large">{{ t('action.cancel') }}</el-button>
      <el-button type="primary" :loading="loading" @click="handleOk" size="large"> {{ t('action.save') }} </el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { EleMessage } from 'ele-admin-plus/es';
import { useFormData } from '@/utils/use-form-data';
import { updatePassword } from '@/api/layout';
import { useI18n } from 'vue-i18n';
import { logout } from '@/utils/common';
const { t } = useI18n();
/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });

/** 提交loading */
const loading = ref<boolean>(false);

/** 表单实例 */
const formRef = ref<FormInstance | null>(null);

/** 表单数据 */
const [form, resetFields] = useFormData({
  oldPassword: '',
  password: '',
  password2: '',
  code: ''
});
const validateNewPassword = (_: any, value: string, callback: Function) => {
  if (!value) {
    return callback(new Error('请输入新密码'));
  }

  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
  if (!passwordPattern.test(value)) {
    return callback(new Error('密码必须为6-16位数字和字母的组合'));
  }

  if (form && form.oldPassword && value === form.oldPassword) {
    return callback(new Error('新旧密码不能一致！'));
  }

  callback();
};
/** 表单验证规则 */
const rules = reactive<FormRules>({
  oldPassword: [
    {
      required: true,
      message: '请输入原密码',
      type: 'string',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      validator: validateNewPassword,
      trigger: 'blur',
      type: 'string',
    }
  ],
  password2: [
    {
      required: true,
      message: '请输入确认密码',
      type: 'string',
      trigger: 'blur'
    },
    {
      type: 'string',
      trigger: 'blur',
      validator: (_rule: any, value: string, callback: any) => {
        if (value && value !== form.password) {
          return callback(new Error('两次输入密码不一致！'));
        }
        callback();
      }
    }
  ],
});

/** 关闭弹窗 */
const handleCancel = () => {
  visible.value = false;
};

/** 保存修改 */
const handleOk = () => {
  formRef.value?.validate?.((valid) => {
    if (!valid) {
      return;
    }
    loading.value = true;
    updatePassword(form)
      .then((msg) => {
        loading.value = false;
        EleMessage.success(msg);
        setTimeout(() => {
          logout(false);
        }, 500);

        handleCancel();
      })
      .catch((e) => {
        loading.value = false;
        EleMessage.error(e.message);
      });
  });
};

/** 弹窗关闭事件 */
const handleClosed = () => {
  resetFields();
  formRef.value?.clearValidate?.();
  loading.value = false;
};
</script>
