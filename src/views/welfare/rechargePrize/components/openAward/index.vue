<template>
  <div style="margin-top: 20px">
    <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
      <template #toolbar>
        <el-space>
          <el-button type="primary" class="ele-btn-icon" @click="openEdit()">
            <template #icon>
              <plus-outlined />
            </template>
            <span>新建</span>
          </el-button>
        </el-space>
      </template>
      <template #type="{ row }">
        <dict-data code="winType" valueType="number" type="tag" v-model="row.type" />
      </template>
      <template #icon="{ row }">
        <img :src="row.icon" alt="" style="width: 40px" />
      </template>
      <template #action="{ row }">
        <el-link type="primary" :underline="false" @click="openEdit(row)"> 修改 </el-link>
        <el-divider direction="vertical" />
        <el-link type="danger" :underline="false" @click="remove(row)"> 删除 </el-link>
      </template>
    </ele-pro-table>
    <openAwardEdit :data="current" v-model="showEdit" @done="reload" />
  </div>
</template>

<script setup lang="ts">
  // import BaseEditTable from '@/components/BaseEditTable/index.vue';
  import { pageOpenAward, removeAward } from '@/api/welfare/rechargePrize';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { ref } from 'vue';
  import { PlusOutlined } from '@/components/icons';
  import { EleMessage, EleProTable } from 'ele-admin-plus';
  import { ElMessageBox } from 'element-plus';
  import openAwardEdit from './components/edit.vue';

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);
  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'id',
      label: 'id',
      // width: 60,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'name',
      label: '物品名称',
      // width: 60,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'num',
      label: '数量',
      // width: 60,
      align: 'center'
    },
    {
      prop: 'icon',
      label: 'icon',
      slot: 'icon',
      // width: 60,
      align: 'center'
    },
    {
      prop: 'type',
      slot: 'type',
      label: '奖励类型',
      // minWidth: 110,
      align: 'center'
    },
    {
      prop: 'hasAnnounce',
      label: '是否播报',
      // minWidth: 110,
      align: 'center',
      formatter: (row: any) => {
        return row.hasAnnounce ? '是' : '否'
      }
    },
    {
      prop: 'weight',
      label: '中奖权重',
      // minWidth: 110,
      align: 'center'
    },
    {
      prop: 'stock',
      label: '库存',
      // minWidth: 110,
      align: 'center'
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 150,
      align: 'center',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    }
  ]);

  /** 表格选中数据 */
  const selections = ref<any[]>([]);

  /** 当前编辑数据 */
  const current = ref<any | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);
  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageOpenAward({
      ...where,
      ...orders,
      ...pages
    });
  };
  /* 打开编辑弹窗 */
  const openEdit = (row?: any) => {
    current.value = row ?? null;
    showEdit.value = true;
  };
  /** 搜索 */
  const reload = (where?: any) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };
  /* 删除单个 */
  const remove = (row: any) => {
    ElMessageBox.confirm('确定要删除ID为“' + row.id + '”的数据吗?', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        if (!row.id) return;
        removeAward(row.id)
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
</script>

<style scoped></style>
