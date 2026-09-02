<template>
    <ele-modal width="100%" v-model="visible" title="赠送奖励" @open="handleOpen" position="top"  :body-style="{ paddingTop: '0' }">
        <PayConfig title="奖励配置" :get-api="() => getRewardConfigApi({ channelId: channelId })"
            :save-api="updateRewardConfigApi" :send-api="sendActInfoServer" :config-keys="configKeys"
            :config-labels="configLabels" @close="handleCancel" />
             <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <!-- <el-button type="primary" :loading="loading" @click="save"> 保存 </el-button> -->
    </template>
    </ele-modal>
</template>

<script setup lang="ts">
import PayConfig from './payConfig.vue';
import { sendActInfoServer } from '@/api/welfare/activitysApi';
import { getRewardConfigApi, updateRewardConfigApi } from '@/api/pay/payChannel';
import { ref } from 'vue';
const props = defineProps<{
  /** 修改回显的数据 */
  channelId: number;
}>();
/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });
/** 提交状态 */
const loading = ref(false);

// 配置键名数组
const configKeys = [
    'recharge',      // 充值奖励
    'withdraw',      // 提现奖励
  
];

// 配置标签映射
const configLabels: Record<string, string> = {
    'recharge': '充值奖励',
    'withdraw': '提现奖励',
};
/** 关闭弹窗 */
const handleCancel = () => {
  visible.value = false;
};
/** 弹窗打开事件 */
const handleOpen = () => {
//   if (props.data) {
//     assignFields(props.data);
//     isUpdate.value = true;
//   } else {
//     resetFields();
//     isUpdate.value = false;
//   }
//   nextTick(() => {
//     nextTick(() => {
//       formRef.value?.clearValidate?.();
//     });
//   });
};
</script>

<style lang="scss" scoped>
::v-deep .el-divider__text {
    font-weight: bold;
    font-size: 20px;
}

.title {
    padding-left: 30px;
    font-weight: bold;
    font-size: 20px;
    margin: 20px 0;
}

.form-table .el-form-item {
    margin-bottom: 0 !important;
}

:deep(.el-form-item__label) {
    font-size: 18px;
}

.tips {
    color: red;
}

:deep(.el-input.is-disabled .el-input__wrapper) {
    background: rgb(253, 247, 247);
    color: black !important;
}

:deep(.el-input.is-disabled .el-input__inner) {
    color: black !important;
}
</style>
