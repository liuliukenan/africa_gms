<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="900" v-model="visible" :title="isUpdate ? '修改短信通道' : '新建短信通道'" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :sm="12" :xs="12">
          <el-form-item label="名称" prop="name">
            <el-input clearable :maxlength="50" v-model="form.name" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="排序" prop="sortNumber">
            <el-input-number v-model="form.sortNumber" :min="0" placeholder="请输入" :controls="false" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="请求地址" prop="url">
            <el-input clearable :maxlength="255" v-model="form.url" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="apikey" prop="apikey">
            <el-input clearable :maxlength="255" v-model="form.apikey" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="12" :xs="12">
          <el-form-item label="请求密钥" prop="apisecret">
            <el-input clearable :maxlength="50" v-model="form.apisecret" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="国家列表" prop="countryCodes">
            <el-select v-model="form.countryCodes" multiple placeholder="请选择" style="width: 100%">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code || ''" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :sm="12" :xs="12">
          <el-form-item label="短信渠道" prop="sender">
            <dict-data code="smsChannel" v-model="form.sender" valueType="number" placeholder="请选择" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="渠道类型" prop="channelType">
            <dict-data code="smsChannelType" v-model="form.channelType" valueType="number" placeholder="请选择" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="form.status" size="small">
              <el-radio :value="true">启用</el-radio>
              <el-radio :value="false">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="附加信息" prop="extend">
            <el-input clearable type="textarea" :rows="3" :maxlength="50" v-model="form.extend" placeholder="请输入" />
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
  import { addSmsChannel, updateSmsChannel } from '@/api/platform/smsChannelApi';
  import type { SmsChannel } from '@/api/platform/model/smsChannel';
  import { useConfigStore } from '@/store/modules/config';
  const configStore = useConfigStore();

  const props = defineProps<{
    /** 修改回显的数据 */
    data?: SmsChannel | null;
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
  const [form, resetFields, assignFields] = useFormData<SmsChannel>({
    id: undefined,
    sender: undefined,
    name: undefined,
    sortNumber: undefined,
    channelType: undefined,
    url: undefined,
    apikey: undefined,
    apisecret: undefined,
    extend: '{}',
    countryCodes: undefined,
    status: 1
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
    sender: [
      {
        required: true,
        type: 'number',
        message: '请输入sender',
        trigger: 'blur'
      }
    ],
    name: [
      {
        required: true,
        type: 'string',
        message: '请输入名称',
        trigger: 'blur'
      }
    ],
    sortNumber: [
      {
        required: true,
        type: 'number',
        message: '请输入排序',
        trigger: 'blur'
      }
    ],
    url: [
      {
        required: true,
        type: 'string',
        message: '请输入请求地址',
        trigger: 'blur'
      }
    ],
    apikey: [
      {
        required: true,
        type: 'string',
        message: '请输入请求apikey',
        trigger: 'blur'
      }
    ],
    apisecret: [
      {
        required: true,
        type: 'string',
        message: '请输入请求密钥',
        trigger: 'blur'
      }
    ],
    extend: [
      {
        required: true,
        type: 'string',
        message: '请输入附加信息',
        trigger: 'blur'
      }
    ]
    // status: [
    //   {
    //     required: true,
    //     type: 'number',
    //     message: '请选择状态',
    //     trigger: 'change'
    //   }
    // ]
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
      let extend = {};
      try {
        extend = JSON.parse(form.extend || '{}');
      } catch (e) {
        EleMessage.error('exend字段不是正确的json字符串，请检查！');
        loading.value = false;
        return;
      }

      // 解析exend字符串为对象
      const formData = {
        ...form,
        extend: extend as any
      };
      const saveOrUpdate = isUpdate.value ? updateSmsChannel : addSmsChannel;
      saveOrUpdate(formData)
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
      // 解析exend字符串为对象
      form.extend = JSON.stringify(props.data.extend || '{}');
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
