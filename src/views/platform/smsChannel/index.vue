<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <!-- <sms-channel-search ref="searchRef" style="margin-bottom: -14px" @search="reload" /> -->
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :export-config="{ fileName: '短信通道', datasource: exportSource }" :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
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
        <template #extend="{ row }">
          {{ row.extend ? JSON.stringify(row.extend) : {} }}
        </template>
        <template #sender="{ row }">
          <dict-data code="smsChannel" v-model="row.sender" valueType="number" type="tag" />
        </template>
        <template #channelType="{ row }">
          <dict-data code="smsChannelType" v-model="row.channelType" valueType="number" type="tag" />
        </template>

        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)"> 修改 </el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)"> 删除 </el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <sms-channel-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { PlusOutlined } from '@/components/icons';
  import SmsChannelEdit from './components/sms-channel-edit.vue';
  import { pageSmsChannels, removeSmsChannel, sendConfServer } from '@/api/platform/smsChannelApi';
  import type { SmsChannel, SmsChannelParam } from '@/api/platform/model/smsChannel';
  import { toDateString } from '@/utils/utils';

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
      prop: 'name',
      label: '名称',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'channelType',
      slot: 'channelType',
      label: '渠道类型',
      // minWidth: 110,
      align: 'center'
    },

    {
      prop: 'sender',
      slot: 'sender',
      label: '短信渠道',
      // minWidth: 110,
      align: 'center'
    },

    {
      prop: 'url',
      label: '请求地址',
      minWidth: 150,
      align: 'left'
    },
    {
      prop: 'apikey',
      label: '请求apikey',
      minWidth: 150,
      align: 'left'
    },
    {
      prop: 'apisecret',
      label: '请求密钥',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'extend',
      slot: 'extend',
      label: '附加信息',
      minWidth: 130,
      align: 'left'
    },
    {
      prop: 'countryCodes',
      label: '国家',
      // minWidth: 110,
      align: 'center'
    },
    {
      prop: 'status',
      label: '状态',
      formatter: (row) => (row.status == 1 ? '启用' : '停用'),
      // minWidth: 110,
      align: 'center'
    },
    {
      label: '时间',
      prop: 'createTime',
      formatter: (row) => toDateString(row.createTime),
      align: 'center',
      // minWidth: 110
    },
    {
      prop: 'sortNumber',
      label: '排序',
      // minWidth: 110,
      align: 'center'
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 130,
      fixed: 'right',
      align: 'center',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    }
  ]);

  /** 表格选中数据 */
  const selections = ref<SmsChannel[]>([]);

  /** 当前编辑数据 */
  const current = ref<SmsChannel | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageSmsChannels({
      ...where,
      ...orders,
      ...pages
    });
  };

  /** 搜索 */
  const reload = (where?: SmsChannelParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: SmsChannel) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  /** 删除单个 */
  const remove = (row: SmsChannel) => {
    ElMessageBox.confirm('确定要删除“' + row.id + '”吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeSmsChannel(row.id)
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

  /** 导出和打印全部数据的数据源 */
  const exportSource: DatasourceFunction = ({ where, orders }) => {
    return pageSmsChannels({
      ...where,
      ...orders
    });
  };
</script>
