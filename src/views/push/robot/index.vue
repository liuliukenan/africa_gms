<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <robot-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :export-config="{ fileName: '机器人配置', datasource: exportSource }" :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
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
    <robot-edit :data="current" v-model="showEdit" @done="reload" />
  <robot-import v-model="showImport" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { PlusOutlined } from '@/components/icons';
  import RobotSearch from './components/robot-search.vue';
  import RobotEdit from './components/robot-edit.vue';
  import { pageRobots, removeRobot, sendConfServer } from '@/api/config/robotApi';
  import type { Robot, RobotParam } from '@/api/model/robot';
  import { toDateString } from '@/utils/utils';
  import RobotImport from './components/robot-import.vue';

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof RobotSearch> | null>(null);

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
      prop: 'phone',
      label: '电话',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'avatar',
      label: '头像',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'defaultAvatar',
      label: '默认头像',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'weight',
      label: '权重',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'nickname',
      label: '呢称',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'status',
      label: '状态',
      minWidth: 110,
      align: 'left'
    },
    {
      label: '时间',
      prop: 'createTime',
      align: 'left',
      minWidth: 110,
      formatter: (row) => {
        return toDateString(row.createTime);
      }
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 200,
      align: 'center',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    }
  ]);

  /** 表格选中数据 */
  const selections = ref<Robot[]>([]);

  /** 当前编辑数据 */
  const current = ref<Robot | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  /** 是否显示导入弹窗 */
  const showImport = ref(false);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageRobots({
      ...where,
      ...orders,
      ...pages
    });
  };

  /** 搜索 */
  const reload = (where?: RobotParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: Robot) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  /** 打开导入弹窗 */
  const openImport = () => {
    showImport.value = true;
  };

  /** 删除单个 */
  const remove = (row: Robot) => {
    ElMessageBox.confirm('确定要删除“' + row.id + '”吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeRobot(row.id)
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
    return pageRobots({
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
