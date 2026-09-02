<template>
  <ele-page>
    <ele-card style="height: 100%">
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
  import RewardRecords from './components/reward-records.vue';
  import PushRecords from './components/push-records.vue';
  import { usePermission } from '@/utils/use-permission';

  const { t } = useI18n();

  // 当前激活 tab 的 index（字符串）
  const activeTab = ref('first');
  const { hasPermission } = usePermission();

  const allTabs = computed(() => [
    {
      label: t('platform.vip.tab.baseConfig'),
      name: 'first',
      // permission: 'platform:vip:config',
      permission: '',
      component: BaseConfig
    },
    {
      label: t('platform.vip.tab.rewardRecords'),
      name: 'second',
      // permission: 'platform:vip:records',
      permission: '',
      component: RewardRecords
    },
    {
      label: t('platform.vip.tab.pushRecords'),
      name: 'third',
      // permission: 'platform:vip:pushRecords',
      permission: '',
      component: PushRecords
    }
  ]);

  const availableTabs = computed(() => {
    return allTabs.value.filter((tab) => hasPermission(tab.permission));
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
