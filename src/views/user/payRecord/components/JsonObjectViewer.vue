<template>
  <el-descriptions :column="1" border size="small" :labelStyle="{ width: '200px', fontWeight: '600' }">
    <el-descriptions-item v-for="(value, key) in data" :key="key" :label="String(key)" :min-width="74">
      <template v-if="isObject(value)">
        <div style="padding: 8px; border-radius: 4px">
          <JsonObjectViewer :data="value" />
        </div>
      </template>
      <template v-else-if="value === null || value === undefined">
        <span style="color: #c0c4cc">null</span>
      </template>
      <template v-else>
        <span>{{ value }}</span>
      </template>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    data: Record<string, any>;
  }>();

  const isObject = (val: any): boolean => {
    return val !== null && typeof val === 'object' && !Array.isArray(val);
  };
</script>
<style scoped lang="scss">
// ::v-deep  .el-descriptions__cell{
//   min-width: 74px !important;
// }
</style>
