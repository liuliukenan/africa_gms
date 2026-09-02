<!-- 代理编辑弹窗 -->
<template>
    <ele-modal :width="325" v-model="visible" :title="t('acting.getActingData.table.titleCode')" @open="handleOpen">
      <img :src="data" alt="QR Code" style="padding-left: 50px;"/>
      <template #footer>
        <el-button @click="handleCancel">{{ t('action.cancel') }}</el-button>
      </template>
    </ele-modal>
  </template>
  
  <script lang="ts" setup>
    // import { ref } from 'vue';
    // import { seeActingCode } from '@/api/actingApi';
    // import { seeMerchantCode } from '@/api/actingApi';
    // import type { Acting } from '@/api/model/acting';
    // import type { Merchant } from '@/api/model/acting';
    import { useI18n } from 'vue-i18n';
    const { t } = useI18n();
  defineProps<{
      /** 修改回显的数据 */
      data?: string| undefined;
    }>();
  
    const emit = defineEmits<{
      (e: 'done'): void;
    }>();
  
    /** 弹窗是否打开 */
    const visible = defineModel({ type: Boolean });
    /** 弹窗打开事件 */
    const handleOpen = () => {
      // if (props.data?.actingNum) {
      //   seeActingCode({actingNum:props.data.actingNum}).then((res) => {
      //     qrCodeUrl.value = res;
      //   });
      // } else if(props.data?.account) {
      //   seeMerchantCode({account:props.data.account}).then((res) => {
      //     qrCodeUrl.value = res;
      //   });
      // }else{}
    };
    /** 关闭弹窗 */
    const handleCancel = () => {
      visible.value = false;
    };
  </script>
  <style scoped lang="scss">
  :deep(.el-dialog__body) {
    text-align: center !important;
  }
  </style>
  