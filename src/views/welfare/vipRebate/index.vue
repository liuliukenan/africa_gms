<template>
  <ele-page>
    <ele-card :bordered="false">
      <el-tabs v-model="activeTab" type="card" class="demo-tabs">
        <el-tab-pane v-if="hasPermission('welfare:vipRebate:baseConfig')" label="基础配置" name="first">
          <BaseConfig />
        </el-tab-pane>
        <el-tab-pane v-if="hasPermission('welfare:vipRebate:levelList')" label="倍率记录" name="third">
          <LevelList />
        </el-tab-pane>
        <el-tab-pane v-if="hasPermission('welfare:vipRebate:rebateList')" label="返利记录" name="forth">
          <RebateList />
        </el-tab-pane>
      </el-tabs>
    </ele-card>
  </ele-page>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import BaseConfig from './baseConfig/index.vue';
import LevelList from './levelList/index.vue';
import RebateList from './rebateList/index.vue';
import { usePermission } from '@/utils/use-permission';

const activeTab = ref('first');
const { hasPermission } = usePermission();

// 计算可用的标签页
const availableTabs = computed<string[]>(() => {
  const tabs: string[] = [];
  if (hasPermission('welfare:vipRebate:baseConfig')) {
    tabs.push('first');
  }
  if (hasPermission('welfare:vipRebate:levelList')) {
    tabs.push('third');
  }
  if (hasPermission('welfare:vipRebate:rebateList')) {
    tabs.push('forth');
  }
  return tabs;
});

// 确保当前激活的标签是可用的
const ensureValidActiveTab = () => {
  nextTick(() => {
    // 如果当前激活的标签不可用，则切换到第一个可用标签
    if (!availableTabs.value.includes(activeTab.value)) {
      if (availableTabs.value.length > 0) {
        activeTab.value = availableTabs.value[0];
      }
    }
  });
};

// 监听可用标签变化
watch(availableTabs, () => {
  ensureValidActiveTab();
}, { immediate: true });

// 组件初始化时确保标签有效
ensureValidActiveTab();
</script>

<script lang="ts">
export default {
  name: 'VipRebate'
};
</script>

<style scoped></style>