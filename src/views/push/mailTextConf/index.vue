<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <mail-text-conf-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
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
        <template #jumpType="{ row }">
          <dict-data code="actionType2" v-model="row.jumpType" valueType="number" type="tag" />
        </template>
        <template #gameGroup="{ row }">
          <dict-data code="gameGroup" v-model="row.gameGroup" valueType="number" type="tag" />
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
    <mail-text-conf-edit :data="current" v-model="showEdit" @done="refresh" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { PlusOutlined } from '@/components/icons';
  import MailTextConfSearch from './components/mail-text-conf-search.vue';
  import MailTextConfEdit from './components/mail-text-conf-edit.vue';
  import { pageMailTextConfs, removeMailTextConf, sendConfServer } from '@/api/config/mailTextConfApi';
  import { MailTextConf, MailTextConfParam } from '@/api/config/model/mailTextConf';
  import { toDateString } from '@/utils/utils';
  import { useConfigStore } from '@/store/modules/config';
  const configStore = useConfigStore();

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof MailTextConfSearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'keyId',
      label: 'keyId',
      width: 90,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'countryCode',
      label: '国家代码',
      // minWidth: 80,
      align: 'center'
    },
    {
      prop: 'mailTitle',
      label: '邮件标题',
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'mailText',
      label: '内容',
      minWidth: 320,
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
      prop: 'imgPos',
      formatter: (row) => {
        return row.imgPos === 0 ? '上' : '下';
      },
      label: '图片位置',
      minWidth: 70,
      align: 'center'
    },
    {
      prop: 'state',
      slot: 'state',
      label: '状态',
      minWidth: 70,
      align: 'center'
    },
    {
      prop: 'remark',
      label: '备注',
      minWidth: 130,
      align: 'left'
    },
    {
      label: '时间',
      prop: 'createTime',
      formatter: (row) => toDateString(row.createTime),
      align: 'center',
      // minWidth: 100
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
  const selections = ref<MailTextConf[]>([]);

  /** 当前编辑数据 */
  const current = ref<MailTextConf | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);
  const defaultWhere = {
    countryCode: configStore.countryArr?.[0]?.code || ''
  };

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageMailTextConfs({
      ...defaultWhere,
      ...where,
      ...orders,
      ...pages
    });
  };

  /** 搜索 */
  const reload = (where?: MailTextConfParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 编辑保存后刷新（保持当前页不变） */
  const refresh = () => {
    selections.value = [];
    tableRef.value?.reload?.();
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: MailTextConf) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  /** 删除单个 */
  const remove = (row: MailTextConf) => {
    ElMessageBox.confirm('确定要删除“' + row.id + '”吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeMailTextConf(row.id)
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
