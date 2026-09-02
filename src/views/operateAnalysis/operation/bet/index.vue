<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <SearchForm ref="searchRef"
        :showWhere="['countryCode', 'channel', 'userType', 'clientType', 'agentId', 'gameId', 'factoryCode', 'gameGroupId', 'date']"
        @search="reload" />
      <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="changeTab">
        <el-tab-pane v-for="tab in availableTabs" :key="tab.name" :label="tab.label" :name="tab.name" lazy>
          <component :is="tab.component" :where="searchWhere"></component>
        </el-tab-pane>
      </el-tabs>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, watch } from "vue";
import SearchForm from "@/components/SearchForm/index.vue";
import Bets from './components/bets.vue';
import Profits from './components/profits.vue';
import { usePermission } from '@/utils/use-permission';
/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof SearchForm> | null>(null);
const activeName = ref('first');
const { hasPermission } = usePermission();

const allTabs = [
  {
    label: '投注分布',
    name: 'first',
    permission: '',
    component: Bets
  },
  {
    label: '盈亏分布',
    name: 'second',
    // permission: 'welfare:tenTimes:winRecord',
    permission: '',
    component: Profits
  },
];
const changeTab = (e) => {
  activeName.value = e.name;
}

// 计算可用的标签页
const availableTabs = computed(() => {
  return allTabs.filter(tab => tab?.permission ? hasPermission(tab.permission) : true);
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
const searchWhere=ref({});
const reload = (where?: any) => {
  searchWhere.value = where;
  // selections.value = [];
  // tableRef.value?.reload?.({ page: 1, where });
};
</script>
<style scoped lang="scss">
.red {
  color: red;
}

:deep(.el-tabs__item.is-active) {
  background-color: var(--el-color-primary);
  color: #fff;
  transition: all 0.3s linear;
}
</style>