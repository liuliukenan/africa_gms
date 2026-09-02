<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <tips-conf-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :export-config="{ fileName: 'Tips配置', datasource: exportSource }" :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
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
        <!-- <template #jumpType="{ row }">
          <dict-data code="actionType2" v-model="row.jumpType" valueType="number" type="tag" />
        </template> -->
        <template #tipsType="{ row }">
          <dict-data code="tipsType" v-model="row.tipsType" type="tag" valueType="number" />
        </template>
        <template #colorType="{ row }">
          <dict-data code="colorType" v-model="row.colorType" type="tag" valueType="number" :typeColor="setColorType(row.colorType)" />
        </template>
        <template #state="{ row }">
          <el-link :type="row.state === true ? 'success' : 'danger'">{{ row.state === true ? '启用' : '禁用' }}</el-link>
        </template>

        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)"> 修改 </el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)"> 删除 </el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <tips-conf-edit :data="current" v-model="showEdit" @done="refresh" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { PlusOutlined } from '@/components/icons';
  import TipsConfSearch from './components/tips-conf-search.vue';
  import TipsConfEdit from './components/tips-conf-edit.vue';
  import { pageTipsConfs, removeTipsConf, sendConfServer } from '@/api/config/tipsConfApi';
  import type { TipsConf, TipsConfParam } from '@/api/config/model/tipsConf';
  import { toDateString } from '@/utils/utils';
  import { useConfigStore } from '@/store/modules/config';
  const configStore = useConfigStore();
  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof TipsConfSearch> | null>(null);
  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);
  const setColorType = (status: number) => {
    switch (status) {
      case 0: //red
        return 'danger';
      case 1: //yellow
        return 'warning';
      case 2: //green
        return 'success';
      case 3: //blue
        return 'primary';
      default:
        return 'info';
    }
  };
  /** 表格列配置 */
  const columns = ref<Columns>([
    // {
    //   prop: 'id',
    //   label: 'id',
    //   width: 60,
    //   align: 'left',
    //   fixed: 'left'
    // },
    {
      prop: 'keyId',
      label: 'keyId',
      // minWidth: 110,
      align: 'left'
    },
    {
      prop: 'tipsName',
      label: '名称',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'tipsType',
      slot: 'tipsType',
      label: 'Tips类型',
      // minWidth: 110,
      align: 'left'
    },
    {
      prop: 'colorType',
      slot: 'colorType',
      label: '颜色类型',
      // minWidth: 110,
      align: 'left'
    },
    {
      prop: 'jumpType',
      label: '跳转类型',
      // minWidth: 110,
      align: 'left'
    },
    {
      prop: 'jumpId',
      label: '跳转ID',
      // minWidth: 110,
      align: 'left'
    },
    {
      prop: 'paramNames',
      label: '参数',
      minWidth: 120,
      align: 'left',
      formatter: (row) => {
        return JSON.stringify(row.paramNames);
      }
    },
    {
      prop: 'state',
      slot: 'state',
      label: '状态',
      // minWidth: 110,
      align: 'left'
    },
    {
      prop: 'tipsText',
      showOverflowTooltip: true,
      label: '内容',
      minWidth: 200,
      align: 'left'
    },
    {
      label: '时间',
      formatter: (row) => toDateString(row.createTime),
      align: 'left'
      // minWidth: 110
    },
    {
      prop: 'remark',
      label: '备注',
      minWidth: 110,
      align: 'left'
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
  const selections = ref<TipsConf[]>([]);

  /** 当前编辑数据 */
  const current = ref<TipsConf | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);
  const defaultWhere = {
    countryCode: configStore.countryArr?.[0]?.code || ''
  };

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageTipsConfs({
      ...defaultWhere,
      ...where,
      ...orders,
      ...pages
    });
  };

  /** 搜索 */
  const reload = (where?: TipsConfParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 编辑保存后刷新（保持当前页不变） */
  const refresh = () => {
    selections.value = [];
    tableRef.value?.reload?.();
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: TipsConf) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  /** 删除单个 */
  const remove = (row: TipsConf) => {
    ElMessageBox.confirm('确定要删除“' + row.id + '”吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeTipsConf(row.id)
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
    return pageTipsConfs({
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
