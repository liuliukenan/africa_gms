<!-- 编辑弹窗 -->
<template>
  <ele-modal form :width="660" v-model="visible" :title="isUpdate ? '修改返水渠道' : '添加返水渠道'" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent="">
      <el-form-item label="ID:" prop="account">
        <el-input clearable v-model="form.account" placeholder="请输入ID" />
      </el-form-item>
      <!-- <el-form-item label="渠道类型:" prop="channelType">
        <string-select :dict-code="'channelType'" v-model="form.channelType" />
      </el-form-item> -->
      <el-form-item label="返水渠道:" prop="baseUrl">
        <el-input clearable v-model="form.baseUrl" placeholder="请输入返水渠道" />
      </el-form-item>
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
  import { addPayChannel, updatePayChannel } from '@/api/pay/payChannel';
  import StringSelect from '@/components/StringSelect/index.vue';
  // import DictData from '@/components/DictData/index.vue';
  import type { PayChannelParams, PayChannel } from '@/api/pay/model/index';
  const props = defineProps<{
    /** 修改回显的数据 */
    data?: PayChannel | null;
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
  const [form, resetFields, assignFields] = useFormData<PayChannelParams>({
    channelId: undefined,
    account: '',
    secretKey: '',
    channelType: '',
    baseUrl: '',
    notifyUrl: '',
    hasAssignItem: false,
    annex: ''
  });

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    account: [
      {
        required: true,
        message: '请输入帐号',
        type: 'string',
        trigger: 'blur'
      }
    ],
    secretKey: [
      {
        required: true,
        message: '请输入密钥',
        type: 'string',
        trigger: 'blur'
      }
    ],
    baseUrl: [
      {
        required: true,
        message: '请输入api地址',
        type: 'string',
        trigger: 'blur'
      }
    ],
    notifyUrl: [
      {
        required: true,
        message: '回调地址',
        type: 'string',
        trigger: 'blur'
      }
    ],
    channelType: [
      {
        required: true,
        message: '请输入类型',
        type: 'string',
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
      const saveOrUpdate = isUpdate.value ? updatePayChannel : addPayChannel;
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
      assignFields(props.data);
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
