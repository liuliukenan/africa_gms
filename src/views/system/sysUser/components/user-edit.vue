<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="680" v-model="visible" :title="isUpdate ? '修改用户' : '新建用户'" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :sm="12" :xs="12">
          <el-form-item label="用户账号" prop="username">
            <el-input clearable :maxlength="20" v-model.trim="form.username" placeholder="请输入用户账号" :disabled="isUpdate" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="姓名" prop="realname">
            <el-input clearable :maxlength="20" v-model.trim="form.realname" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="12" :xs="12">
          <el-form-item label="角色" prop="roleId">
            <role-select :user-group="0" v-model="form.roleId" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="手机号" prop="phone">
            <el-input clearable :maxlength="11" v-model.trim="form.phone" placeholder="请输入手机号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="12" :xs="12">
          <el-form-item label="谷歌验证码" prop="useVerification">
            <el-radio-group v-model="form.useVerification">
              <el-radio :value="1">启用</el-radio>
              <el-radio :value="0">不启用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item v-if="!isUpdate" label="密码" prop="password">
            <el-input show-password type="password" :maxlength="20" v-model.trim="form.password" placeholder="请输入密码" />
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
import { EleMessage, emailReg, phoneReg } from 'ele-admin-plus/es';
import { useFormData } from '@/utils/use-form-data';
import RoleSelect from '@/components/RoleSelect/index.vue';
import { addUser,updateUser, checkExistence } from '@/api/system/sysUserApi';
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
  realname: undefined,
  roleId: undefined,
  phone: '',
  password: '',
  status: 0,//0正常 1是封号
  loginCount:0,
  useVerification: 0
});

/** 表单验证规则 */
const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: '请输入用户账号',
      type: 'string',
      trigger: 'blur'
    },
    {
      min: 4,
      message: '账号长度最少为4位',
      type: 'string',
      trigger: 'blur'
    },
    // {
    //   type: 'string',
    //   trigger: 'blur',
    //   validator: (_rule: any, value: string, callback: any) => {
    //     if (isUpdate.value) {
    //       callback();
    //       return;
    //     }
        // checkExistence('username', value)
        //   .then(() => {
        //     callback(new Error('账号已经存在'));
        //   })
        //   .catch(() => {
        //     callback();
        //   });
      // }
    // }
  ],
  realname: [
    {
      required: true,
      message: '请输入姓名',
      type: 'string',
      trigger: 'blur'
    }
  ],

  roleId: [
    {
      required: true,
      message: '请选择角色',
      type: 'number',
      trigger: 'change'
    }
  ],
  email: [
    {
      pattern: emailReg,
      message: '邮箱格式不正确',
      type: 'string',
      trigger: 'blur'
    }
  ],
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
  phone: [
    {
      required: true,
      message: '请输入手机号',
      type: 'string',
      trigger: 'blur'
    },
    // {
    //   pattern: phoneReg,
    //   message: '手机号格式不正确',
    //   type: 'string',
    //   trigger: 'blur'
    // }
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
    const saveOrUpdate = isUpdate.value ? updateUser : addUser;
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
