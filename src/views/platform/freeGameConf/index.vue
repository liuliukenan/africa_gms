<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <free-game-conf-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable" :tools="['reload', 'columns', 'maximized']">
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
          <el-link type="success" :underline="false" @click="openCopy(row)"> 复制 </el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)"> 删除 </el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <free-game-conf-edit :data="current" :is-copy="isCopy" v-model="showEdit" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { PlusOutlined } from '@/components/icons';
  import FreeGameConfSearch from './components/free-game-conf-search.vue';
  import FreeGameConfEdit from './components/free-game-conf-edit.vue';
  import { addFreeGameConf, pageFreeGameConfs, removeFreeGameConf, sendConfServer } from '@/api/platform/freeGameConfApi';
  import type { FreeGameConf, FreeGameConfParam } from '@/api/platform/model/freeGameConf';
  import { toDateString } from '@/utils/utils';

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof FreeGameConfSearch> | null>(null);

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
      prop: 'name',
      label: '名称',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'triggerSpinType',
      formatter: (row) => {
        return row.triggerSpinType === 1 ? '免费次数' : '免费游戏';
      },
      label: '类型',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'gameId',
      label: '游戏ID',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'amount',
      label: '金额',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'base',
      label: 'base',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'rtpIndex',
      label: 'rtpIndex',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'bet',
      label: 'bet',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'level',
      label: 'level',
      minWidth: 110,
      align: 'left'
    },

    {
      prop: 'flowMutl',
      label: '流水倍数',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'requiredFlow',
      label: '流水需求',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'validDays',
      label: '有效天数',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'exampleId',
      label: '钱包模板',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'totalSpins',
      label: '次数',
      minWidth: 110,
      align: 'left'
    },
    {
      label: '时间',
      prop: 'createTime',
      formatter: (row) => toDateString(row.createTime),
      align: 'left',
      minWidth: 110
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 170,
      fixed: 'right',
      align: 'center',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    }
  ]);

  /** 表格选中数据 */
  const selections = ref<FreeGameConf[]>([]);

  /** 当前编辑数据 */
  const current = ref<FreeGameConf | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageFreeGameConfs({
      ...where,
      ...orders,
      ...pages
    });
  };

  /** 搜索 */
  const reload = (where?: FreeGameConfParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: FreeGameConf) => {
    current.value = row ?? null;
    showEdit.value = true;
    isCopy.value = false;
  };
  const isCopy = ref(false);
  /** 打开复制弹窗 */
  const openCopy = (row?: FreeGameConf) => {
    let params = { ...row, status: false, id: undefined, gameId: undefined, name: undefined };
    current.value = params ?? null;
    isCopy.value = true;
    showEdit.value = true;
  };
  /** 删除单个 */
  const remove = (row: FreeGameConf) => {
    ElMessageBox.confirm('确定要删除“' + row.name + '”吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeFreeGameConf(row.id)
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
