<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <vip-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :pagination="false" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :export-config="{ fileName: 'VIP', datasource: exportSource }" :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()"> 新建</el-button>
          <el-popconfirm title="确认发送到服务器吗？" @confirm="sendServer()">
            <template #reference>
              <el-button type="danger" class="ele-btn-icon" v-permission="'config:monthCard:send'">
                <span>发送服务器</span>
              </el-button>
            </template>
          </el-popconfirm>
        </template>
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)"> 修改</el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)"> 删除</el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <vip-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { PlusOutlined } from '@/components/icons';
  import VipSearch from './components/vip-search.vue';
  import VipEdit from './components/vip-edit.vue';
  import { pageVips, removeVip } from '@/api/config/vipApi';
  import type { Vip, VipParam } from '@/api/model/vip';
  import { sendConfServer } from '@/api/conf';

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof VipSearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'vipId',
      label: 'vip等级',
      // width: 60,
      align: 'left',
      fixed: 'left'
    },
    {
      prop: 'payAmount',
      label: '充值金额',
      // minWidth: 110,
      align: 'left'
    },
    {
      prop: 'upAmount',
      label: '升级礼包',
      // minWidth: 110,
      align: 'left'
    },
    {
      prop: 'upWaterFlow',
      label: '升级所需流水',
      // minWidth: 110,
      align: 'left'
    },
    {
      prop: 'weekReward',
      label: '每周奖励',
      // minWidth: 110,
      align: 'left'
    },
    {
      prop: 'weekWaterFlow',
      label: '每周奖励所需流水',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'monthReward',
      label: '每月奖励',
      // minWidth: 110,
      align: 'left'
    },
    {
      prop: 'monthWaterFlow',
      label: '每月奖励流水',
      // minWidth: 110,
      align: 'left'
    },
    {
      prop: 'withdrawDiscount',
      label: '抽现手续折扣',
      // minWidth: 110,
      align: 'left'
    },
    // {
    //   label: '时间',
    //   prop: 'createTime',
    //   align: 'left',
    //   // minWidth: 110
    // },
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
  const selections = ref<Vip[]>([]);

  /** 当前编辑数据 */
  const current = ref<Vip | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageVips({
      ...where,
      ...orders,
      ...pages
    });
  };

  /** 搜索 */
  const reload = (where?: VipParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: Vip) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  /** 删除单个 */
  const remove = (row: Vip) => {
    ElMessageBox.confirm('确定要删除“' + row.id + '”吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeVip(row.id)
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
  // 发送到服务器
  const sendServer = () => {
    const loading = EleMessage.loading({
      message: '请求中..',
      plain: true
    });
    sendConfServer(19)
      .then((msg) => {
        loading.close();
        EleMessage.success(msg);
      })
      .catch((e) => {
        loading.close();
        EleMessage.error(e.message);
      });
  };

  /** 导出和打印全部数据的数据源 */
  const exportSource: DatasourceFunction = ({ where, orders }) => {
    return pageVips({
      ...where,
      ...orders
    });
  };
</script>
