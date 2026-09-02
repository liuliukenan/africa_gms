<!-- 修改渠道弹窗 -->
<template>
  <ele-modal :width="500" v-model="visible" :confirm-loading="loading" title="修改渠道"
    :body-style="{ paddingBottom: '5px' }" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="110px">
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="用户ID" prop="uid">
            <el-input-number v-model="form.uid" placeholder="请输入用户ID" style="width: 100%;" :controls="false"/>
          </el-form-item>
        </el-col>
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="目标渠道" prop="channel">
            <!-- <el-select v-model="form.channel" placeholder="请选择目标渠道" style="width: 100%;" clearable>
              <el-option v-for="item in channelList" :key="item.channel" :label="item.channelName"
                :value="item.channel" />
            </el-select> -->
             <el-input-number v-model="form.channel" placeholder="请输入目标渠道" style="width: 100%;" :controls="false"/>
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
import { changeUserChannel } from '@/api/platform/shareChannelApi';
import type { UpdateUserChannelDTO } from '@/api/platform/model/shareChannel';
import { FormInstance, FormRules } from 'element-plus';

const props = defineProps<{
  /** 用户ID */
  uid?: number;
  /** 当前渠道ID */
  currentChannel?: number;
}>();

const emit = defineEmits<{
  (e: "done"): void;
}>();

/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });
const formRef = ref<FormInstance | null>(null);

// 提交状态
const loading = ref(false);

// 表单数据
const { form, resetFields, assignFields } = useFormData<UpdateUserChannelDTO>({
  uid: undefined,
  channel: undefined
});

// 表单验证规则
const rules = reactive<FormRules>({
  uid: [
    {
      required: true,
      type: 'number',
      message: '用户ID不能为空',
      trigger: 'blur'
    }
  ],
  channel: [
    {
      required: true,
      type: 'number',
      message: '请输入目标渠道ID',
      trigger: 'blur'
    }
  ],
});

/** 加载渠道列表 */
const loadChannelList = async () => {
  // 渠道通过手动输入，不需要加载列表
};

/* 保存编辑 */
const save = () => {
  if (!formRef.value) return;

  formRef.value?.validate?.((valid) => {
    if (!valid) return;
    loading.value = true;
    changeUserChannel({ ...form })
      .then((msg) => {
        loading.value = false;
        EleMessage.success(msg || '修改渠道成功');
        handleCancel();
        emit("done");
      })
      .catch((e) => {
        loading.value = false;
        EleMessage.error(e.message);
      });
  });
};

/** 关闭弹窗 */
const handleCancel = () => {
  visible.value = false;
};

/** 弹窗打开事件 */
const handleOpen = () => {
  resetFields();
  if (props.uid) {
    assignFields({
      uid: props.uid,
      channel: props.currentChannel || 0
    });
  }
  loadChannelList();
  nextTick(() => {
    formRef.value?.clearValidate?.();
  });
};
</script>

<style lang="scss" scoped>
.tips {
  color: red;
}
</style>
