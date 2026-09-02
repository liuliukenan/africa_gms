<!-- 用户编辑弹窗 -->
<template>
  <ele-modal :width="600" form v-model="visible" title="查询渠道余额" :body-style="{ paddingBottom: '5px' }"
    @open="handleOpen">
    <div v-if="info">
      <div v-for="(value, key) in info" :key="key" style="display: flex; gap: 8px; padding: 4px 0;">
        <span style="font-weight: 600; min-width: 80px;">{{ key }}:</span>
        <span>{{ value ?? 'null' }}</span>
      </div>
    </div>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <!-- <el-button type="primary" :loading="loading" @click="save"> 保存</el-button> -->
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useFormData } from '@/utils/use-form-data';
import { queryChannels } from '@/api/pay/payChannel';
import type { PayItem } from '@/api/pay/model';
import { ElMessage, FormInstance, FormRules } from 'element-plus';

const emit = defineEmits(['done']);
const props = defineProps<{
  // channelId: number;
  // 修改回显的数据
  data: any | null;
}>();
const visible = defineModel({ type: Boolean });
//
const formRef = ref<FormInstance | null>(null);

// 是否是修改
const isUpdate = ref(false);

// 提交状态
const loading = ref(false);
// 表单数据
const { form, resetFields, assignFields } = useFormData<PayItem>({
  id: undefined,
  moneyType: undefined,
  payChannelId: undefined,
  channelType: undefined,
  payFlatType: undefined,
  payThirdItem: undefined,
  unit: undefined,
  amount: undefined,
  gold: undefined,
  sortNumber: undefined,
  jumpType: undefined,
  hide: false,
  fix: false
});

/** 关闭弹窗 */
const handleCancel = () => {
  visible.value = false;
};
const info = ref<any | null>(null);
const getqueryChannels = async () => {
  try {
    let res = await queryChannels({ channelId: props.data?.channelId || 0 });
    info.value = res;
  } catch (error) {
    ElMessage.error((error as Error).message);
  }

};
/** 弹窗打开事件 */
const handleOpen = () => {
  if (props.data) {
    // assignFields({ ...props.data });
    // isUpdate.value = true;
    getqueryChannels()
  } else {
    resetFields();
    // if (props.hasAssignItem) {
    //   form.channelType = props.type;
    // } else {
    //   form.channelType = 'COMMON';
    // }
    // form.payChannelId = props.channelId;
    // isUpdate.value = false;
  }
  nextTick(() => {
    nextTick(() => {
      formRef.value?.clearValidate?.();
    });
  });
};
</script>
