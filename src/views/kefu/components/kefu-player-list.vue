<template>
  <div>
    <ele-card :body-style="{ paddingBottom: '2px' }">
      <el-form :inline="true" @keyup.enter="search" @submit.prevent>
        <el-form-item label="玩家UID">
          <el-input-number
            v-model="where.uid"
            :min="1"
            :controls="false"
            clearable
            placeholder="请输入玩家UID"
          />
        </el-form-item>
        <el-form-item label="客服号">
          <el-input v-model.trim="where.kefuContact" clearable placeholder="请输入客服号" />
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
        cache-key="proKefuPlayers"
      >
        <template #toolbar>
          <el-button
            type="primary"
            :icon="PlusOutlined"
            @click="showBind = true"
          >
            新增绑定
          </el-button>
        </template>
        <template #showPosition="{ row }">
          {{ row.showPosition === 1 ? '大厅' : row.showPosition }}
        </template>
        <template #action="{ row }">
          <el-button
            link
            type="danger"
            @click="unbind(row)"
          >
            解绑
          </el-button>
        </template>
      </ele-pro-table>
    </ele-card>

    <KefuBind v-model="showBind" @done="handleChanged" />
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { PlusOutlined } from '@/components/icons';
  import { pageKefuPlayers, unbindKefuPlayer } from '@/api/config/kefuApi';
  import type { KefuPlayerParam, KefuPlayerRecord } from '@/api/model/kefu';
  import { toDateZone } from '@/utils/utils';
  import KefuBind from './kefu-bind.vue';

  const tableRef = ref<InstanceType<typeof EleProTable>>();
  const showBind = ref(false);
  const where = reactive<KefuPlayerParam>({});

  const columns = ref<Columns>([
    { prop: 'uid', label: '玩家UID', minWidth: 120, align: 'center' },
    { prop: 'phone', label: '玩家手机号', minWidth: 150, align: 'center' },
    { prop: 'showPosition', label: '来源', width: 100, align: 'center', slot: 'showPosition' },
    { prop: 'kefuContact', label: '归属客服号', minWidth: 160, align: 'center' },
    {
      prop: 'bindTime',
      label: '绑定时间',
      minWidth: 170,
      align: 'center',
      formatter: (row: KefuPlayerRecord) => toDateZone(row.bindTime) || '-'
    },
    { columnKey: 'action', label: '操作', width: 100, align: 'center', slot: 'action', fixed: 'right' }
  ]);

  const datasource: DatasourceFunction = ({ pages, orders }) => {
    return pageKefuPlayers({ ...where, ...orders, ...pages });
  };

  const search = () => {
    tableRef.value?.reload?.({ page: 1, where: { ...where } });
  };

  const reset = () => {
    where.uid = undefined;
    where.kefuContact = undefined;
    search();
  };

  const handleChanged = () => {
    search();
  };

  const unbind = async (row: KefuPlayerRecord) => {
    try {
      await ElMessageBox.confirm(
        `确认解除玩家 ${row.uid} 与客服号“${row.kefuContact}”的绑定吗？`,
        '解绑确认',
        { type: 'warning', draggable: true }
      );
      await unbindKefuPlayer(row.id);
      EleMessage.success('解绑成功');
      handleChanged();
    } catch (e: any) {
      if (e !== 'cancel' && e !== 'close') EleMessage.error(e.message);
    }
  };
</script>
