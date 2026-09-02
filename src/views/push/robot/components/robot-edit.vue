<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="680" v-model="visible" :title="isUpdate ? '修改机器人配置' : '新建机器人配置'" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="id" name="id">
            {{ form.id }}
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="电话" name="phone">
            <el-input clearable :maxlength="50" v-model="form.phone" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="头像" name="avatar">
            <el-input clearable :maxlength="50" v-model="form.avatar" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="默认头像" name="defaultAvatar">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.defaultAvatar" :min="0" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="权重" name="weight">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.weight" :min="0" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="呢称" name="nickname">
            <el-input clearable :maxlength="50" v-model="form.nickname" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="状态">
            <el-select v-model="form.status" placeholder="请选择" clearable style="width: 100%">
              <el-option label="CLOSE" :value="false" />
              <el-option label="OPEN" :value="true" />
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
  import { addRobot, updateRobot } from '@/api/config/robotApi';
  import type { Robot } from '@/api/model/robot';

  const props = defineProps<{
    /** 修改回显的数据 */
    data?: Robot | null;
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
  const [form, resetFields, assignFields] = useFormData<Robot>({
    id: undefined,
    phone: undefined,
    avatar: undefined,
    defaultAvatar: undefined,
    weight: undefined,
    nickname: undefined,
    status: undefined
  });

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    id: [
      {
        required: true,
        type: 'number',
        message: '请输入id',
        trigger: 'blur'
      }
    ],
    phone: [
      {
        required: true,
        type: 'string',
        message: '请输入电话',
        trigger: 'blur'
      }
    ],
    avatar: [
      {
        required: true,
        type: 'string',
        message: '请输入头像',
        trigger: 'blur'
      }
    ],
    defaultAvatar: [
      {
        required: true,
        type: 'number',
        message: '请输入默认头像',
        trigger: 'blur'
      }
    ],
    weight: [
      {
        required: true,
        type: 'number',
        message: '请输入性别',
        trigger: 'blur'
      }
    ],
    nickname: [
      {
        required: true,
        type: 'string',
        message: '请输入呢称',
        trigger: 'blur'
      }
    ],
    status: [
      {
        required: true,
        type: 'number',
        message: '请输入状态',
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
      const saveOrUpdate = isUpdate.value ? updateRobot : addRobot;
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
