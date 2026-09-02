<template>
  <ele-page>
    <ele-card :bordered="false" >
      <el-tabs v-model="activeName" type="card" class="demo-tabs">
        <el-tab-pane v-for="tab in availableTabs" :key="tab.name" :label="tab.label" :name="tab.name">
          <component :is="tab.component"></component>
        </el-tab-pane>
      </el-tabs>
    </ele-card>
  </ele-page>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import BaseConfig from './components/baseConfig/index.vue';
import Records from './components/records/index.vue';
import { usePermission } from '@/utils/use-permission';

const activeName = ref('first');
const { hasPermission } = usePermission();

const allTabs = [
  {
    label: '基础配置',
    name: 'first',
    permission: 'welfare:newUserBag:baseConfig',
    component: BaseConfig
  },
  {
    label: '发放记录',
    name: 'second',
    permission: 'welfare:newUserBag:records',
    component: Records
  }
];

// 计算可用的标签页
const availableTabs = computed(() => {
  return allTabs.filter(tab => hasPermission(tab.permission));
});

// 确保当前激活的标签是可用的
const ensureValidActiveTab = () => {
  nextTick(() => {
    // 如果当前激活的标签不可用，则切换到第一个可用标签
    if (!availableTabs.value.some(tab => tab.name === activeName.value)) {
      if (availableTabs.value.length > 0) {
        activeName.value = availableTabs.value[0].name;
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
  name: 'NewUserBag'
};
</script>