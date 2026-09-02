<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <robot-win-conf-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :export-config="{ fileName: '机器人中奖配置', datasource: exportSource }" :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()"> 新建 </el-button>
          <el-popconfirm title="确认发送到服务器吗？" @confirm="sendServer()">
            <template #reference>
              <el-button type="danger" class="ele-btn-icon">
                <span>发送服务器</span>
              </el-button>
            </template>
          </el-popconfirm>
          <el-button type="primary" class="ele-btn-icon" @click="openImport()"> 导入导出 </el-button>
        </template>
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)"> 修改 </el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)"> 删除 </el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <robot-win-conf-edit :data="current" v-model="showEdit" @done="reload" />
  <robot-win-conf-import v-model="showImport" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { PlusOutlined } from '@/components/icons';
  import RobotWinConfSearch from './components/robot-win-conf-search.vue';
  import RobotWinConfEdit from './components/robot-win-conf-edit.vue';
  import RobotWinConfImport from './components/robot-win-conf-import.vue';

  import type { RobotWinConf, RobotWinConfParam } from '@/api/config/model/robotWinConf';
  import { pageRobotWinConfs, removeRobotWinConf, sendConfServer } from '@/api/config/robotWinConfApi';

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof RobotWinConfSearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'id',
      label: 'id',
      width: 60,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'gameId',
      label: '游戏ID',
      // minWidth: 110,
      align: 'center'
    },
    {
      prop: 'gameName',
      label: '游戏名称',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'weight',
      label: '抽取权重',
      // minWidth: 110,
      align: 'center'
    },
    {
      prop: 'betAmounts',
      label: '下注金额列表',
      minWidth: 310,
      align: 'left'
    },
    {
      prop: 'state',
      label: '状态',
      formatter: (row) => {
        return row.state ? '启用' : '禁用';
      },
      // minWidth: 110,
      align: 'center',
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 130,
      align: 'center',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    }
  ]);

  /** 表格选中数据 */
  const selections = ref<RobotWinConf[]>([]);

  /** 当前编辑数据 */
  const current = ref<RobotWinConf | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  /** 是否显示导入弹窗 */
  const showImport = ref(false);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageRobotWinConfs({
      ...where,
      ...orders,
      ...pages
    });
  };

  /** 搜索 */
  const reload = (where?: RobotWinConfParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: RobotWinConf) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  /** 打开导入弹窗 */
  const openImport = () => {
    showImport.value = true;
  };

  /** 删除单个 */
  const remove = (row: RobotWinConf) => {
    ElMessageBox.confirm('确定要删除“' + row.id + '”吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeRobotWinConf(row.id)
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
    return pageRobotWinConfs({
      ...where,
      ...orders
    });
  };

  // 发送到服务器
  const sendServer = () => {
    const loading = EleMessage.loading({
      message: '请求中..',
      plain: true
    });
    sendConfServer()
      .then((msg) => {
        loading.close();
        EleMessage.success(msg);
      })
      .catch((e) => {
        loading.close();
        EleMessage.error(e.message);
      });
  };
</script>
