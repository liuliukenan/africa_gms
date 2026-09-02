<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="680" v-model="visible" :title="isUpdate ? '修改密码' : '创建密码'" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="用户ID:" prop="uid">
            {{ form.uid }}
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="帐号:" prop="username">
            {{ form.countryCode }} {{ form.phone }}
          </el-form-item>
          <!-- <el-input clearable placeholder="请输入手机号" v-model="form.phone" type="mobile" @change="changeName" /> -->
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="国家代码:" prop="countryCode">
            <!-- <dict-data code="areaCode" v-model="form.areaCode" placeholder="请输入区号" @change="changeName" />
            <div>帐号由区号+手机号组成</div> -->
            {{ form.countryCode }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="手机号:" prop="phone">
            <el-input clearable placeholder="请输入手机号" v-model="form.phone" type="mobile"/>
            <!-- {{ form.phone }} -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="密码:" prop="passwd">
            <el-input clearable placeholder="请输入密码" v-model="form.passwd" type="password" show-password />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save"> 发送</el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { EleMessage } from 'ele-admin-plus/es';
import { useFormData } from '@/utils/use-form-data';
import type { UserPwdParam } from '@/api/model/user';
import { changePwd } from '@/api/user/userApi';

const props = defineProps<{
  /** 修改回显的数据 */
  data?: UserPwdParam | null;   
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
const [form, resetFields, assignFields] = useFormData<UserPwdParam>({
  uid: undefined,
  countryCode: 254,
  phone: undefined,
  username: undefined,
  passwd: undefined,
});

// const changeName = (_: string) => {
//   form.username = form.areaCode + form.mobile;
// };

/** 表单验证规则 */
const rules = reactive<FormRules>({
  phone: [
    {
      required: true,
      type: 'string',
      message: '请输入手机号',
      trigger: 'blur'
    }
  ],
  passwd: [
    {
      required: true,
      type: 'string',
      message: '请输入密码',
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
    // loading.value = true;
    let params = { ...form, username: form.countryCode + form.phone }
    changePwd(params)
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
    assignFields({ ...props.data, id: props.data.uid });
    form.username = form.username ? form.username : form.nickname;
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
