<!-- 用户编辑弹窗 -->
<template>
  <ele-modal :width="600" v-model="visible" :confirm-loading="loading" :title="isUpdate ? '修改渠道' : '新建渠道'"
    :body-style="{ paddingBottom: '5px' }" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="110px">
      <el-row :gutter="16">
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="渠道名称" prop="name">
            <el-input clearable placeholder="请输入渠道名称" v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="token" prop="token">
            <el-input clearable placeholder="请输入GRPC_token" v-model="form.token" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="服务器IP数组" prop="ip">
            <el-input clearable placeholder="请输入服务器IP(多个IP以逗号分隔)" v-model="form.ip" />
            <div class="tips">
              格式如：127.0.0.1:8080，127.1.1.1:8080
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="启用" prop="state">
            <el-switch v-model="form.state" style="--el-switch-on-color: #13ce66; "></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save">
        保存
      </el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue';
import { EleMessage } from 'ele-admin-plus/es';
import { useFormData } from '@/utils/use-form-data';
import { addGameChannels, updateGameChannels } from '@/api/game/gameChannel/index';
// import ChannelSelect from '@/views/game/gameChannel/components/channel-select.vue';

import type { GameChannels } from '@/api/game/model/index';
import { FormInstance, FormRules } from 'element-plus';
const props = defineProps<{
  /** 修改回显的数据 */
  data?: GameChannels | null;
}>();

const emit = defineEmits<{
  (e: "done"): void;
}>();

/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });
const formRef = ref<FormInstance | null>(null);

// 是否是修改
const isUpdate = ref(false);

// 提交状态
const loading = ref(false);


// 表单数据
const { form, resetFields, assignFields } = useFormData<GameChannels>({
  id: undefined,
  name: undefined,
  token: undefined,
  ip:'',
  state: true
});

// 表单验证规则
const rules = reactive<FormRules>({
  id: [
    {
      required: true,
      type: 'number',
      message: '请输入id',
      trigger: 'blur'
    }
  ],
  name: [
    {
      required: true,
      type: 'string',
      message: '请输入渠道名称',
      trigger: 'blur'
    }
  ],
  token: [
    {
      required: true,
      type: 'string',
      message: '请输入GRPC_token',
      trigger: 'blur'
    }
  ]
});

/* 保存编辑 */
const save = () => {
  if (!formRef.value) return;
  let params = {}
  if (form.ip&& !Array.isArray(form.ip)) {
    params = { ...form, ip: convertToArray(form.ip) }
  } else {
    params = { ...form }
  }

  formRef.value?.validate?.((valid) => {
    if (!valid) return;
    loading.value = true;
    const saveOrUpdate = isUpdate.value ? updateGameChannels : addGameChannels;;
    saveOrUpdate(params)
      .then((msg) => {
        loading.value = false;
        EleMessage.success(msg);
        handleCancel();
        emit("done");
      })
      .catch((e) => {
        loading.value = false;
        EleMessage.error(e.message);
      });
  });
};
// 将逗号分割的字符串转换为数组字符串
const convertToArray = (input: string): string[] => {
  if (typeof input !== 'string') return [];
  return input.split(',').map(item => item.trim());
};
/** 关闭弹窗 */
const handleCancel = () => {
  visible.value = false;
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
<style lang="scss" scoped>
.tips{
  color: red;
}</style>
