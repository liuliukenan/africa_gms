<template>
  <ele-page>
    <ele-card :body-style="{ padding: '0px' }">
      <robot-search style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :header-ellipsis="false" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" :tools="['reload', 'columns', 'maximized']" cache-key="dailySurpriseRobotTexts">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openAdd">
            {{ t('action.add') }}
          </el-button>
        </template>
        <!-- 状态 -->
        <template #status="{ row }">
          <el-tag v-if="row.status === 1" type="success">{{ t('welfare.cashWheel.robotTable.statusEnabled') }}</el-tag>
          <el-tag v-else type="info">{{ t('welfare.cashWheel.robotTable.statusDisabled') }}</el-tag>
        </template>
        <!-- 创建时间 -->
        <template #createTime="{ row }">
          {{ toDateZone(row.createTime, row.countryCode) }}
        </template>
        <!-- 更新时间 -->
        <template #updateTime="{ row }">
          {{ toDateZone(row.updateTime, row.countryCode) }}
        </template>
        <!-- 操作 -->
        <template #action="{ row }">
          <el-button type="primary" size="small" link @click="openEdit(row)">
            {{ t('action.edit') }}
          </el-button>
          <el-popconfirm :title="t('common.sureDelete')" @confirm="handleDelete(row)">
            <template #reference>
              <el-button type="danger" size="small" link>{{ t('action.delete') }}</el-button>
            </template>
          </el-popconfirm>
        </template>
      </ele-pro-table>
    </ele-card>

    <!-- 新增/编辑弹窗 -->
    <RobotEdit v-model="dialogVisible" :row="editRow" @saved="handleSaved" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { ElMessage } from 'element-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { PlusOutlined } from '@/components/icons';
  import RobotSearch from './robot-search.vue';
  import RobotEdit from './robot-edit.vue';
  import { pageDailySurpriseRobotTexts, deleteDailySurpriseRobotText } from '@/api/welfare/dailySurpriseApi';
  import type { DailyRechargeSurpriseRobotTextVO, DailyRechargeSurpriseRobotTextQuery } from '@/api/welfare/model/dailySurprise';
  import { useI18n } from 'vue-i18n';
  import { toDateZone } from '@/utils/utils';
  import { useConfigStore } from '@/store/modules/config';

  const { t } = useI18n();
  const configStore = useConfigStore();

  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  const columns = ref<Columns>([
    { prop: 'id', label: t('welfare.cashWheel.robotTable.id'), width: 80, fixed: 'left', align: 'center' },
    // { prop: 'actItemId', label: t('welfare.cashWheel.robotTable.actItemId'),},
    // { prop: 'countryCode', label: t('welfare.cashWheel.robotTable.countryCode'),},
    { prop: 'textContent', label: t('welfare.cashWheel.robotTable.textContent'), minWidth: 420, showOverflowTooltip: true },
    { prop: 'weight', label: t('welfare.cashWheel.robotTable.weight'), align: 'center' },
    { prop: 'status', label: t('welfare.cashWheel.robotTable.status'), slot: 'status', align: 'center' },
    // { prop: 'createTime', label: t('welfare.cashWheel.robotTable.createTime'), slot: 'createTime' },
    // { prop: 'updateTime', label: t('welfare.cashWheel.robotTable.updateTime'),  slot: 'updateTime' },
    { prop: 'action', label: t('action.action'), fixed: 'right', slot: 'action', align: 'center' }
  ]);

  const selections = ref<DailyRechargeSurpriseRobotTextVO[]>([]);

  const defaultWhere = reactive({
    countryCode: configStore.countryArr?.[0]?.code || '',
    startDate: '',
    endDate: ''
  });

  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageDailySurpriseRobotTexts({ ...defaultWhere, ...where, ...orders, ...pages });
  };

  const reload = (where?: DailyRechargeSurpriseRobotTextQuery) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  // --- 新增/编辑弹窗 ---
  const dialogVisible = ref(false);
  const editRow = ref<DailyRechargeSurpriseRobotTextVO | null>(null);

  const openAdd = () => {
    editRow.value = null;
    dialogVisible.value = true;
  };

  const openEdit = (row: DailyRechargeSurpriseRobotTextVO) => {
    editRow.value = row;
    dialogVisible.value = true;
  };

  const handleSaved = () => {
    tableRef.value?.reload?.();
  };

  const handleDelete = async (row: DailyRechargeSurpriseRobotTextVO) => {
    try {
      const { message } = await deleteDailySurpriseRobotText(row.id!);
      ElMessage.success(message);
      tableRef.value?.reload?.();
    } catch (e: any) {
      ElMessage.error(e.message || t('common.saveFailed'));
    }
  };
</script>

<script lang="ts">
  export default { name: 'dailySurpriseRobot' };
</script>
