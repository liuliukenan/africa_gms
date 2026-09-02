<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <gift-card-node-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :export-config="{ fileName: '礼包卡节点', datasource: exportSource }" :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
        <!-- <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()"> 新建 </el-button>
        </template> -->
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)"> 修改 </el-link>
          <el-divider direction="vertical" />
          <el-link type="warning" :underline="false" @click="openNodeInfo(row)"> 礼品码详情 </el-link>
          <el-divider direction="vertical" />
          <el-link type="success" :underline="false" @click="handleRetryNode(row)" v-if="row.generateStatus === 3"> 重试 </el-link>
          <el-divider direction="vertical" v-if="row.generateStatus === 3" />

          <!-- <el-link type="danger" :underline="false" @click="remove(row)"> 删除 </el-link>
          <el-divider direction="vertical" /> -->
          <el-link type="danger" :underline="false" @click="exportNode(row)"> 导出 </el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <gift-card-node-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  // import { PlusOutlined } from '@/components/icons';
  import GiftCardNodeSearch from './components/gift-card-node-search.vue';
  import GiftCardNodeEdit from './components/gift-card-node-edit.vue';
  import { pageGiftCardNodes, removeGiftCardNode, retryNode, exportGiftCardNodes } from '@/api/giftCard/giftCardNodeApi';
  import type { GiftCardNode, GiftCardNodeParam } from '@/api/giftCard/model/giftCardNode';
  import { toDateString } from '@/utils/utils.js';
  import { useRouter } from 'vue-router';
  import { handleDownload } from '@/utils/file-util.js';

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof GiftCardNodeSearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'id',
      label: '主键ID',
      width: 80,
      align: 'left',
      fixed: 'left'
    },
    {
      prop: 'serieId',
      label: '关联系列ID',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'serieName',
      label: '系统名称',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'nodeName',
      label: '节点名称',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'nodeCode',
      label: '节点标识',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'codePrefix',
      label: '卡号前缀',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'totalCount',
      label: '计划生成卡号数量',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'generatedCount',
      label: '实际已生成卡号数量',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'usedCount',
      label: '已核销卡号数量',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'voidCount',
      label: '已作废卡号数量',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'generateStatus',
      label: '生成状态',
      formatter: (row) => {
        switch (row.generateStatus) {
          case 0:
            return '待生成';
          case 1:
            return '生成中';
          case 2:
            return '成功';
          case 3:
            return '失败';
          default:
            return '';
        }
      },
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'status',
      label: '节点状态',
      formatter: (row) => (row.status === 1 ? '启用' : '停用'),
      minWidth: 110,
      align: 'left'
    },
    {
      label: '时间',
      prop: 'createTime',
      formatter: (row) => toDateString(row.createTime) ?? '-',
      align: 'left',
      minWidth: 110
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 150,
      fixed: 'right',
      align: 'center',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    }
  ]);

  /** 表格选中数据 */
  const selections = ref<GiftCardNode[]>([]);

  /** 当前编辑数据 */
  const current = ref<GiftCardNode | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageGiftCardNodes({
      ...where,
      ...orders,
      ...pages
    });
  };

  /** 搜索 */
  const reload = (where?: GiftCardNodeParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: GiftCardNode) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  /** 删除单个 */
  const remove = (row: GiftCardNode) => {
    ElMessageBox.confirm('确定要删除“' + row.id + '”吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeGiftCardNode(row.id)
          .then((msg) => {
            loading.close();
            EleMessage.success(msg);
            reload();
          })
          .catch((e) => {
            loading.close();
            EleMessage.error(e.message);
          });
      })
      .catch(() => {});
  };
  const handleRetryNode = (row: GiftCardNode) => {
    ElMessageBox.confirm('确定要重试“' + row.id + '”吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        if (!row.id) return;
        retryNode(row.id)
          .then((msg) => {
            loading.close();
            EleMessage.success(msg);
            reload();
          })
          .catch((e) => {
            loading.close();
            EleMessage.error(e.message);
          });
      })
      .catch(() => {});
  };

  /** 导出和打印全部数据的数据源 */
  const exportSource: DatasourceFunction = ({ where, orders }) => {
    return pageGiftCardNodes({
      ...where,
      ...orders
    });
  };
  const router = useRouter();
  const openNodeInfo = (row?: GiftCardNode) => {
    current.value = row ?? null;
    router.push('/giftCard/giftCardRecord?nodeId=' + current.value?.id);
  };
  const exportNode = (row?: GiftCardNode) => {
    exportGiftCardNodes(row?.id).then((res) => {
      handleDownload('礼品码详情', res.data as any);
    });
  };
</script>
·
