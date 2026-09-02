<template>
  <ele-modal form width="100%" v-model="visible" title="下级详情" @open="handleOpen" @cancel="handleCancel" destroyOnClose>
    <el-tabs v-model="activeName" type="card" class="demo-tabs">
      <el-tab-pane v-for="tab in availableTabs" :key="tab.name" :label="tab.label" :name="tab.name" lazy>
        <component :is="tab.component" :agentId="agentId"></component>
      </el-tab-pane>
    </el-tabs>
  </ele-modal>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import AgentUserStatDetail from './agentUserStatDetail/index.vue';
import AgentStatDetail from './agentStatDetail/index.vue';
import { usePermission } from '@/utils/use-permission';
const props = defineProps<{
  /** 代理ID */
  agentId: number;
  /** 代理类型：1-总代理，2-普通代理 */
  agentType?: number;
}>();
/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });
const activeName = ref('first');
const { hasPermission } = usePermission();
const allTabs = [
  {
    label: '下级代理',
    name: 'first',
    permission: '',
    component: AgentStatDetail
  },
  {
    label: '下级玩家',
    name: 'second',
    permission: '',
    component: AgentUserStatDetail
  },
];
const agentId = computed(() => props.agentId);
// 计算可用的标签页
const availableTabs = computed(() => {
  return allTabs.filter((tab) => {
    // 权限过滤
    if (tab?.permission && !hasPermission(tab.permission)) {
      return false;
    }
    // 非总代理（agentType !== 1）不显示"下级代理"标签页
    if (tab.name === 'first' && props.agentType !== 1) {
      return false;
    }
    return true;
  });
});

// 确保当前激活的标签是可用的
const ensureValidActiveTab = () => {
  nextTick(() => {
    // 如果当前激活的标签不可用，则切换到第一个可用标签
    if (!availableTabs.value.some((tab) => tab.name === activeName.value)) {
      if (availableTabs.value.length > 0) {
        activeName.value = availableTabs.value[0].name;
      }
    }
  });
};

/** 关闭弹窗 */
const handleCancel = () => {
  visible.value = false;
};
/** 弹窗打开事件 */
const handleOpen = () => {
  nextTick(() => {
    // 每次打开弹窗都重置到第一个可用标签
    if (availableTabs.value.length > 0) {
      activeName.value = availableTabs.value[0].name;
    }
  });
};
</script>

<script lang="ts">
export default {
  name: 'TenTimes'
};
</script>
<style lang="scss" scoped>
:deep(.ele-card-body) {
  padding: 0;
}

:deep(.el-tabs__item.is-active) {
  background-color: var(--el-color-primary);
  color: #fff;
  transition: all 0.3s linear;
}

.reback {
  position: absolute;
  right: 1px;
  top: 10px;
  z-index: 999;
}
</style>
