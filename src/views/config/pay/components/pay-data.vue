<template>
<ele-page>
  <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :need-page="false" :tools="['reload', 'density', 'columns', 'maximized']" tool-class="ele-toolbar-form" :scroll="{ x: 800 }" height="calc(100vh - 290px)" tools-theme="default" bordered :pagination="false">
    <template #toolbar>
      <el-space :size="10">
        <el-button type="primary" class="ele-btn-icon" @click="openEdit()" v-permission="'config:pay:addList'">
          <template #icon>
            <PlusOutlined />
          </template>
          <span>新建</span>
        </el-button>
      </el-space>
    </template>
    <template #moneyType="{ row }">
      <dict-data code="moneyType" valueType="number" type="tag" v-model="row.moneyType" />
    </template>
    <template #jumpType="{ row }">
      <dict-data code="bannerJumpType" valueType="number" type="tag" v-model="row.jumpType" />
    </template>
    <template #payFlatType="{ row }">
      <dict-data code="payFlatType" valueType="number" type="tag" v-model="row.payFlatType" />
    </template>

    <template #action="{ row }">
      <el-link type="primary" :underline="false" @click="openEdit(row)" v-permission="'config:pay:editList'"> 修改 </el-link>
      <el-divider direction="vertical" />
      <el-popconfirm title="确认删除吗？" @confirm="remove(row)" >
        <template #reference>
          <el-button type="danger" class="ele-btn-icon" link v-permission="'config:pay:delList'">
            <span>删除</span>
          </el-button>
        </template>
      </el-popconfirm>
    </template>
  </ele-pro-table>
  <PayItemEdit v-model="showEdit" :data="current" :channel-id="channelId" :has-assign-item="hasAssignItem" :type="type" @done="reload" />
</ele-page>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { PlusOutlined } from '@/components/icons';
  import { listByChannel, removePayItem } from '@/api/pay/payItem';
  import PayItemEdit from './payItem-edit.vue';
  import { PayItem } from '@/api/pay/model';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';

  const props = defineProps<{
    channelId: number;
    type: string;
    hasAssignItem: boolean;
  }>();

  // 表格实例
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  const channelId = ref(0);
  // 表格列配置
  const columns = ref<Columns>([
    {
      label: 'ID',
      prop: 'id',
      align: 'center'
    },
    {
      label: '货币类型',
      prop: 'moneyType',
      align: 'center',
      slot: 'moneyType'
    },
    {
      label: '渠道类型',
      prop: 'channelType',
      align: 'center'
    },
    {
      label: '所属平台',
      prop: 'payFlatType',
      align: 'center',
      slot: 'payFlatType'
    },
    {
      label: '三方代码',
      prop: 'payThirdItem',
      align: 'center',
    },
    {
      label: '活动类型',
      prop: 'jumpType',
      slot: 'jumpType',
      align: 'center',
    },
    {
      label: '金额',
      prop: 'amount',
      align: 'left'
    },
    {
      label: '数量',
      prop: 'gold',
      align: 'left'
    },
    {
      label: '币种',
      prop: 'unit',
      align: 'center'
    },
    {
      label: '是否隐藏',
      prop: 'hide',
      align: 'center',
      formatter: (row) => (row.hide ? '是' : '否')
    },
    {
      label: '是否固定',
      prop: 'fix',
      slot: 'fix',
      align: 'center',
      formatter: (row) => (row.fix ? '是' : '否')
    },
    {
      label: '备注',
      prop: 'remark',
      align: 'left'
    },
    {
      label: '排序号',
      prop: 'sortNumber',
      align: 'center'
    },
    {
      label: '时间',
      prop: 'createTime',
      align: 'center'
    },
    {
      label: '操作',
      prop: 'action',
      slot: 'action',
      width: 130,
      align: 'center'
    }
  ]);

  // 当前编辑数据
  const current = ref<PayItem | null>(null);
  // 是否显示编辑弹窗
  const showEdit = ref(false);

  // 表格数据源
  const datasource: DatasourceFunction = () => {
    return listByChannel(channelId.value);
  };

  /* 刷新表格 */
  const reload = (where?: any) => {
    tableRef?.value?.reload({ page: 1, where });
  };

  /* 打开编辑弹窗 */
  const openEdit = (row?: PayItem) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  /* 删除单个 */
  const remove = (row: PayItem) => {
    const loading = EleMessage.loading({
      message: '请求中..',
      plain: true
    });
    if (!row.id) return;
    removePayItem(row.id)
      .then((msg) => {
        loading.close();
        EleMessage.success(msg);
        reload();
      })
      .catch((e) => {
        loading.close();
        EleMessage.error(e.message);
      });
  };

  // 监听左侧树id变化
  watch(
    () => props.channelId,
    (newChannelId) => {
      const validChannelId = !props.hasAssignItem ? 0 : (newChannelId ?? 0);
      channelId.value = validChannelId;
      reload();
    }
  );
</script>

<style lang="scss" scoped>
  .sys-dict-data-table :deep(.ant-table-body) {
    overflow: auto !important;
    overflow: overlay !important;
  }

  .sys-dict-data-table :deep(.ant-table-pagination.ant-pagination) {
    padding: 0 4px;
    margin-bottom: 0;
  }
</style>
