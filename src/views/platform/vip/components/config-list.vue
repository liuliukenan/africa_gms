<template>
  <div class="vip-config-list">
    <!-- VIP配置列表表格 -->
    <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :pagination="false" :show-overflow-tooltip="true" :border="true" :highlight-current-row="true" :tools="['reload', 'columns', 'maximized']" cache-key="vipConfigList">
      <!-- 状态列 -->
      <template #status="{ row }">
        <el-tag :type="row.status === 1 ? 'success' : 'danger'">
          {{ row.status === 1 ? t('platform.vip.configList.enabled') : t('platform.vip.configList.disabled') }}
        </el-tag>
      </template>

      <!-- 更新时间列 -->
      <template #updateTime="{ row }">
        {{ toDateZone(row.updateTime) }}
      </template>
      <template #action="{ row }">
        <el-link type="primary" :underline="false" @click="openEdit(row)">修改</el-link>
      </template>
    </ele-pro-table>
    <ConfigEdit :data="current" v-model="showEdit" ref="editRef" @reload="reload" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { getVipConfigList } from '@/api/platform/vipApi';
  import type { VipConfigListVO, VipConfigListParam } from '@/api/platform/model/vip';
  import { toDateZone } from '@/utils/utils';
  import { useConfigStore } from '@/store/modules/config';
  import ConfigEdit from './config-edit.vue';
  const { t } = useI18n();
  const configStore = useConfigStore();

  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);
  const showEdit = ref(false);
  const current = ref<VipConfigListVO | null>(null);
  // 表格列配置
  const columns = ref<Columns>([
    {
      prop: 'level',
      label: t('platform.vip.configList.level'),
      align: 'center'
    },
    {
      prop: 'levelName',
      label: t('platform.vip.configList.levelName'),
      minWidth: 120,
      align: 'center'
    },
    {
      prop: 'upgradeFlow',
      label: t('platform.vip.configList.upgradeFlow'),
      minWidth: 130,
      align: 'center'
    },
    {
      prop: 'sortOrder',
      label: t('platform.vip.configList.sortOrder'),
      align: 'center'
    },
     {
       prop: 'status',
       label: t('platform.vip.configList.status'),
       align: 'center',
       slot: 'status'
     },
    // {
    //   prop: 'strategyCount',
    //   label: t('platform.vip.configList.strategyCount'),
    //   align: 'center'
    // },
    {
      prop: 'updateTime',
      label: t('platform.vip.configList.updateTime'),
      minWidth: 160,
      align: 'center',
      slot: 'updateTime'
    },
    {
      columnKey: 'action',
      label: t('action.action'),
      // width: 150,
      fixed: 'right',
      align: 'center',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    }
  ]);

  // 表格数据源
  const datasource: DatasourceFunction = async ({ where }) => {
    const params: VipConfigListParam = {
      countryCode: (where as any)?.countryCode || configStore.countryArr?.[0]?.code
    };
    return await getVipConfigList(params);
  };

  // 刷新表格
  const reload = (where?: VipConfigListParam) => {
    tableRef.value?.reload?.({ page: 1, where });
  };
  const openEdit = (row: VipConfigListVO) => {
    current.value = row;
    showEdit.value = true;
  };
  // 暴露方法给父组件
  defineExpose({
    reload
  });
</script>

<style scoped lang="scss">
  .vip-config-list {
    margin-top: 20px;
  }
</style>
