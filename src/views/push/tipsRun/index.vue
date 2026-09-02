<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <tips-run-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :export-config="{ fileName: '系统Tips', datasource: exportSource }" :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()"> 新建 </el-button>
          <el-popconfirm title="确认发送到服务器吗？" @confirm="sendServer()">
            <template #reference>
              <el-button type="danger" class="ele-btn-icon">
                <span>发送服务器</span>
              </el-button>
            </template>
          </el-popconfirm>
        </template>
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)"> 修改 </el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)"> 删除 </el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <tips-run-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { PlusOutlined } from '@/components/icons';
  import TipsRunSearch from './components/tips-run-search.vue';
  import TipsRunEdit from './components/tips-run-edit.vue';
  import { TipsRun, TipsRunParam } from '@/api/config/model/tipsRun';
  import { pageTipsRuns, removeTipsRun, sendServer } from '@/api/config/tipsRunApi';
  import { toDateZone } from '@/utils/utils';

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof TipsRunSearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'id',
      label: 'id',
      width: 60,
      align: 'left',
      fixed: 'left'
    },
    {
      prop: 'title',
      label: '标题',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'tipsConfId',
      // label: '配置ID',
      label: 'Tips模版',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'startDate',
      formatter: (row) => toDateZone(row.startDate, row.countryCode),
      label: '开始时间',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'endDate',
      formatter: (row) => toDateZone(row.endDate, row.countryCode),
      label: '结束时间',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'totalCount',
      label: '显示总数',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'sendCount',
      label: '显示次数',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'nextTime',
      formatter: (row) => toDateZone(row.nextTime, row.countryCode),
      label: '下次时间',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'timeLen',
      label: '间隔分钟',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'state',
      label: '状态',
      minWidth: 110,
      align: 'left',
      formatter: (row) => {
        return row.state ? '启用' : '禁用';
      }
    },
    {
      label: '创建时间',
      formatter: (row) => toDateZone(row.createTime, row.countryCode),
      prop: 'createTime',
      align: 'left',
      minWidth: 110
    },
    {
      columnKey: 'action',
      fixed: 'right',
      label: '操作',
      width: 150,
      align: 'center',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    }
  ]);

  /** 表格选中数据 */
  const selections = ref<TipsRun[]>([]);

  /** 当前编辑数据 */
  const current = ref<TipsRun | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageTipsRuns({
      ...where,
      ...orders,
      ...pages
    });
  };

  /** 搜索 */
  const reload = (where?: TipsRunParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: TipsRun) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  /** 删除单个 */
  const remove = (row: TipsRun) => {
    ElMessageBox.confirm('确定要删除“' + row.id + '”吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeTipsRun(row.id)
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
    return pageTipsRuns({
      ...where,
      ...orders
    });
  };
</script>
