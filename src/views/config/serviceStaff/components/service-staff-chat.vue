<!-- 用户编辑弹窗 -->
<template>
  <ele-modal :close-on-click-modal="false" width="600" v-model="visible" title="" :body-style="{ height: '800px', marginTop: '10', zIndex: 2001 }" position="center">
    <iframe :src="iframeUrl" frameborder="0" style="width: 100%; height: 100%; border: none"></iframe>
  </ele-modal>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    /** 修改回显的数据 */
    iframeUrl?: string | undefined;
  }>();
console.log(props)
  const emit = defineEmits<{
    (e: 'done'): void;
  }>();

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean });

  // /** 关闭弹窗 */
  // const handleCancel = () => {
  //     visible.value = false;
  // };
</script>
