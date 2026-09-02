<!-- 代理编辑弹窗 -->
<template>
    <ele-modal :width="325" v-model="visible" title=" 查看谷歌二维码" @open="handleOpen">
      <img :src="qrCodeUrl" alt="QR Code" style="width: 240px;padding-left: 20px;"/>
      <template #footer>
        <el-button @click="handleCancel">{{ t('action.cancel') }}</el-button>
      </template>
    </ele-modal>
  </template>
  
  <script lang="ts" setup>
    import { ref } from 'vue';
    import { seeMerchantCode } from '@/api/system/sysUserApi';
      import type { SysUser } from '@/api/model/sysUser';
    import { useI18n } from 'vue-i18n';
    const { t } = useI18n();
    const props = defineProps<{
      /** 修改回显的数据 */
      data?: SysUser | null;
    }>();
  
    const emit = defineEmits<{
      (e: 'done'): void;
    }>();
  
    /** 弹窗是否打开 */
    const visible = defineModel({ type: Boolean });
    const qrCodeUrl = ref<string>('');
    /** 弹窗打开事件 */
    const handleOpen = () => {
      if (props.data?.username) {
        seeMerchantCode(props.data.username).then((res) => {
          if(res){
            qrCodeUrl.value = res as string;
          }
        });
      }
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
  