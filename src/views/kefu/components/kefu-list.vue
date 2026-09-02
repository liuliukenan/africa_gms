<template>
  <div>
    <ele-card class="display-conf-card">
      <div class="display-conf-row">
        <span class="display-conf-label">客服展示条件</span>
        <el-select v-model="displayConf.conditionType" style="width: 180px">
          <el-option label="不限制" :value="0" />
          <el-option label="需要下注" :value="1" />
          <el-option label="需要充值" :value="2" />
        </el-select>
        <el-button type="primary" :loading="savingDisplayConf" @click="saveDisplayConf">
          保存
        </el-button>
      </div>
    </ele-card>

    <el-row :gutter="16" class="stats-row">
      <el-col v-for="item in statItems" :key="item.label" :xs="12" :sm="12" :md="6">
        <ele-card shadow="hover">
          <div class="stat-label">{{ item.label }}</div>
          <div class="stat-value">{{ item.value }}</div>
        </ele-card>
      </el-col>
    </el-row>

    <ele-card :body-style="{ paddingBottom: '2px' }">
      <el-form :inline="true" @keyup.enter="search" @submit.prevent>
        <el-form-item label="客服号">
          <el-input v-model.trim="where.contact" clearable placeholder="请输入客服号" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="where.status" clearable placeholder="全部" style="width: 150px">
            <el-option label="下线" :value="0" />
            <el-option label="在线" :value="1" />
            <el-option label="已作废" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </ele-card>

    <ele-card :body-style="{ paddingTop: '8px' }">
      <ele-pro-table
        ref="tableRef"
        row-key="id"
        :columns="columns"
        :datasource="datasource"
        :show-overflow-tooltip="true"
        :border="true"
        :highlight-current-row="true"
        :footer-style="{ paddingBottom: '16px' }"
        cache-key="proKefuGuide"
      >
        <template #toolbar>
          <el-button
            type="primary"
            :icon="PlusOutlined"
            @click="openEdit()"
          >
            新增客服号
          </el-button>
        </template>
        <template #showPosition="{ row }">
          {{ row.showPosition === 1 ? '大厅' : row.showPosition }}
        </template>
        <template #status="{ row }">
          <el-tag v-if="row.invalid === 1" type="info">已作废</el-tag>
          <el-tag v-else-if="row.state === 1" type="success">在线</el-tag>
          <el-tag v-else type="warning">下线</el-tag>
        </template>
        <template #players="{ row }">
          <span>{{ row.players }}</span>
          <span v-if="row.invalid === 1" class="snapshot-label">（作废前）</span>
        </template>
        <template #action="{ row }">
          <template v-if="row.invalid === 0">
            <el-button link type="primary" @click="openEdit(row)">
              编辑
            </el-button>
            <el-button
              link
              :type="row.state === 1 ? 'warning' : 'success'"
              @click="changeState(row)"
            >
              {{ row.state === 1 ? '下线' : '上线' }}
            </el-button>
            <el-button
              v-if="row.state === 0"
              link
              type="danger"
              @click="voidRecord(row)"
            >
              作废
            </el-button>
          </template>
          <span v-else class="disabled-action">无可用操作</span>
        </template>
      </ele-pro-table>
    </ele-card>

    <KefuEdit :data="current" v-model="showEdit" @done="reloadAll" />
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, reactive, ref } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { PlusOutlined } from '@/components/icons';
  import {
    getKefuDisplayConf,
    getKefuStats,
    pageKefu,
    saveKefuDisplayConf,
    updateKefuState,
    voidKefu
  } from '@/api/config/kefuApi';
  import type {
    KefuDisplayConf,
    KefuGuideParam,
    KefuRecord,
    KefuStats
  } from '@/api/model/kefu';
  import { toDateZone } from '@/utils/utils';
  import KefuEdit from './kefu-edit.vue';

  const tableRef = ref<InstanceType<typeof EleProTable>>();
  const showEdit = ref(false);
  const savingDisplayConf = ref(false);
  const current = ref<KefuRecord | null>(null);
  const where = reactive<KefuGuideParam>({});
  const displayConf = reactive<KefuDisplayConf>({
    jsonType: 'KefuDisplayConf',
    conditionType: 0
  });
  const stats = reactive<KefuStats>({
    totalCount: 0,
    onlineCount: 0,
    activePlayerCount: 0,
    todayBindCount: 0
  });

  const statItems = computed(() => [
    { label: '客服号总数', value: stats.totalCount },
    { label: '在线数量', value: stats.onlineCount },
    { label: '有效绑定玩家', value: stats.activePlayerCount },
    { label: '今日绑定次数', value: stats.todayBindCount }
  ]);

  const columns = ref<Columns>([
    { prop: 'id', label: '序号', width: 80, align: 'center', fixed: 'left' },
    { prop: 'contact', label: '客服号', minWidth: 160 },
    { prop: 'url', label: '跳转地址', minWidth: 240 },
    { prop: 'showPosition', label: '展示位置', width: 110, align: 'center', slot: 'showPosition' },
    { prop: 'status', label: '状态', width: 100, align: 'center', slot: 'status' },
    { prop: 'players', label: '绑定玩家', width: 130, align: 'center', slot: 'players' },
    { prop: 'todayBindCount', label: '今日绑定', width: 110, align: 'center' },
    {
      prop: 'createTime',
      label: '创建时间',
      minWidth: 170,
      align: 'center',
      formatter: (row: KefuRecord) => toDateZone(row.createTime) || '-'
    },
    {
      prop: 'updateTime',
      label: '更新时间',
      minWidth: 170,
      align: 'center',
      formatter: (row: KefuRecord) => toDateZone(row.updateTime) || '-'
    },
    { columnKey: 'action', label: '操作', width: 220, align: 'center', slot: 'action', fixed: 'right' }
  ]);

  const datasource: DatasourceFunction = ({ pages, orders }) => {
    return pageKefu({ ...where, ...orders, ...pages });
  };

  const loadStats = async () => {
    try {
      Object.assign(stats, await getKefuStats());
    } catch (e: any) {
      EleMessage.error(e.message);
    }
  };

  const loadDisplayConf = async () => {
    try {
      Object.assign(displayConf, await getKefuDisplayConf());
    } catch (e: any) {
      EleMessage.error(e.message);
    }
  };

  const saveDisplayConf = async () => {
    savingDisplayConf.value = true;
    try {
      await saveKefuDisplayConf({
        jsonType: 'KefuDisplayConf',
        conditionType: displayConf.conditionType
      });
      EleMessage.success('客服展示条件保存成功');
    } catch (e: any) {
      EleMessage.error(e.message);
    } finally {
      savingDisplayConf.value = false;
    }
  };

  const search = () => {
    tableRef.value?.reload?.({ page: 1, where: { ...where } });
  };

  const reset = () => {
    where.contact = undefined;
    where.status = undefined;
    search();
  };

  const openEdit = (row?: KefuRecord) => {
    current.value = row || null;
    showEdit.value = true;
  };

  const reloadAll = () => {
    search();
    loadStats();
  };

  const changeState = async (row: KefuRecord) => {
    const nextState = row.state === 1 ? 0 : 1;
    const action = nextState === 1 ? '上线' : '下线';
    try {
      await ElMessageBox.confirm(`确认${action}客服号“${row.contact}”吗？`, `${action}确认`, {
        type: nextState === 1 ? 'success' : 'warning',
        draggable: true
      });
      await updateKefuState(row.id!, nextState);
      EleMessage.success(`${action}成功`);
      reloadAll();
    } catch (e: any) {
      if (e !== 'cancel' && e !== 'close') EleMessage.error(e.message);
    }
  };

  const voidRecord = async (row: KefuRecord) => {
    try {
      await ElMessageBox.confirm(
        `作废后不可恢复，并会解除该客服号当前全部玩家绑定。作废前绑定人数将保留为 ${row.players}。确认继续吗？`,
        '不可逆操作二次确认',
        {
          type: 'error',
          confirmButtonText: '确认作废',
          cancelButtonText: '取消',
          draggable: true
        }
      );
      await voidKefu(row.id!);
      EleMessage.success('作废成功');
      reloadAll();
    } catch (e: any) {
      if (e !== 'cancel' && e !== 'close') EleMessage.error(e.message);
    }
  };

  onMounted(() => {
    loadDisplayConf();
    loadStats();
  });

</script>

<style scoped>
  .display-conf-card {
    margin-bottom: 16px;
  }
  .display-conf-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .display-conf-label {
    color: var(--el-text-color-regular);
    font-weight: 500;
  }
  .stats-row {
    margin-bottom: 16px;
  }
  .stat-label {
    color: var(--el-text-color-secondary);
    font-size: 14px;
  }
  .stat-value {
    font-size: 28px;
    font-weight: 600;
    margin-top: 8px;
  }
  .snapshot-label,
  .disabled-action {
    color: var(--el-text-color-secondary);
    font-size: 12px;
  }
</style>
