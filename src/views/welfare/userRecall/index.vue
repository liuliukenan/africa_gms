<template>
  <ele-page>
    <ele-card style="height: 100%;margin: 0" >
      <el-tabs v-model="activeTab" type="border-card" @tab-click="tabClick">
        <el-tab-pane v-for="tab in availableTabs" :key="tab.name" :label="tab.label" :name="tab.name" lazy>
          <component :is="tab.component"></component>
        </el-tab-pane>
      </el-tabs>
    </ele-card>
  </ele-page>
</template>

<script setup lang="ts">
  import { ref, computed, watch, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';
  import BaseConfig from './components/baseConfig.vue';
  import Records from './components/records.vue';
  import { usePermission } from '@/utils/use-permission';
  
  const { t } = useI18n();
  // 当前激活 tab 的 index（字符串）
  const activeTab = ref('first');
  const { hasPermission } = usePermission();

  const allTabs = [
    {
      label: t('welfare.userRecall.tabConfig'),
      name: 'first',
      permission: 'welfare:userRecall:config',
      component: BaseConfig
    },
    {
      label: t('welfare.userRecall.tabRecords'),
      name: 'second',
      permission: 'welfare:userRecall:records',
      component: Records
    }
  ];

  const availableTabs = computed(() => {
    return allTabs.filter((tab) => hasPermission(tab.permission));
  });

  // 监听可用 tabs 变化，如果当前激活的 tab 不可用则切换
  watch(availableTabs, (newTabs) => {
    if (newTabs.length > 0 && !newTabs.find((tab) => tab.name === activeTab.value)) {
      nextTick(() => {
        activeTab.value = newTabs[0].name;
      });
    }
  });

  const tabClick = (tab: any) => {
    activeTab.value = tab.props.name;
  };
</script>
