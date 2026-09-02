<!-- User edit弹窗 -->
<template>
  <ele-modal form :width="800" v-model="visible" :confirm-loading="loading" @open="handleOpen" title="修改多语言">
    <el-form ref="formRef" :model="form" :rules="rules" :label-col="{ md: 7, sm: 4, xs: 24 }" :wrapper-col="{ md: 17, sm: 20, xs: 24 }">
      <el-row :gutter="16">
<!--        <el-col :md="24" :sm="24" :xs="24">-->
<!--          <el-form-item label="类型" prop="type">-->
<!--            &lt;!&ndash; <string-select  :dict-code="'type'" v-model.trim="form.type" /> &ndash;&gt;-->
<!--            <el-input type="number" clearable :maxlength="20" placeholder="请输入类型" v-model.trim="form.type" />-->
<!--          </el-form-item>-->
<!--        </el-col>-->
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="消息ID" prop="msgCode">
            <el-input disabled type="number" clearable :maxlength="20" placeholder="请输入消息ID" v-model.trim="form.msgCode" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-col :md="24" :sm="24" :xs="24">
        <el-form-item label="消息Key" prop="msgKey">
          <el-input clearable :maxlength="50" placeholder="请输入消息Key" v-model.trim="form.msgKey" />
        </el-form-item>
      </el-col>
      <el-row :gutter="16">
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="消息内容" prop="content">
            <el-input type="textarea" :rows="4" :maxlength="200" placeholder="请输入消息内容" v-model.trim="form.content" />
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

<script setup lang="ts">
  import { reactive, ref, nextTick } from 'vue';
  import { useFormData } from '@/utils/use-form-data';
  import { updateMutiLang } from '@/api/mutiLang/mutiLang';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { MutiLang } from '@/api/mutiLang/model/index';
  import { FormInstance, FormRules } from 'element-plus';
  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean });
  const props = defineProps<{
    // 修改回显的数据
    data?: MutiLang | null;
  }>();
  const emit = defineEmits<{
    (e: 'done'): void;
  }>();

  const formRef = ref<FormInstance>(); // 使用泛型指定类型

  // 是否是修改
  const isUpdate = ref(false);

  // 提交状态
  const loading = ref(false);

  // 表单数据
  const { form, resetFields, assignFields } = useFormData<MutiLang>({
    type: undefined,
    msgCode: undefined,
    msgKey: undefined,
    content: undefined
  });

  // 表单验证规则
  const rules = reactive<FormRules>({
    type: [
      {
        required: true,
        type: 'number',
        message: '请输入类型',
        trigger: 'blur'
      }
    ],
    msgKey: [
      {
        required: true,
        type: 'string',
        message: '请输入消息Key',
        trigger: 'blur'
      }
    ],
    content: [
      {
        required: true,
        type: 'string',
        message: '请输入消息内容',
        trigger: 'blur'
      }
    ]
  });

  /* 保存编辑 */
  const save = () => {
    formRef.value?.validate?.((valid) => {
      if (!valid) return;
      loading.value = true;
      let params = { ...form, content: JSON.parse(form.content as string) } as any;
      updateMutiLang(params)
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
      form.content = JSON.stringify(form.content)
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
  /** 关闭弹窗 */
  const handleCancel = () => {
    visible.value = false;
  };
</script>
