<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <channelGroup-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" cache-key="channelGroup">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" @click="openEdit()">
            <template #icon>
              <PlusOutlined />
            </template>
            <span>新建</span>
          </el-button>
          <el-popconfirm :title="t('common.sureExport')" @confirm="openExport" width="250px">
            <template #reference>
              <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">
                {{ t('action.export') }}
              </el-button>
            </template>
          </el-popconfirm>
        </template>
        <template #createTime="{ row }">
          <div style="font-size: 12px">{{ toDateString(row.createTime) }}</div>
          <div style="font-size: 12px">{{ toDateString(row.updateTime) }}</div>
        </template>
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)">编辑</el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)">删除</el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <!-- 编辑弹窗 -->
    <ChannelGroupEdit v-model="showEdit" :data="current" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { dayjs, ElMessage } from 'element-plus/es';
  import { EleMessage, EleProTable } from 'ele-admin-plus/es';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { PlusOutlined, UploadOutlined } from '@/components/icons';
  import ChannelGroupSearch from './components/channelGroup-search.vue';
  import ChannelGroupEdit from './components/channelGroup-edit.vue';
  import { pageChannelGroup, exportChannelGroup, removeChannelGroup } from '@/api/platform/channelGroupApi';
  import type { ChannelGroupVO, ChannelGroupParam } from '@/api/platform/model/channelGroup';
  import { useI18n } from 'vue-i18n';
  import { toDateString } from '@/utils/utils';
  import { ElMessageBox } from 'element-plus';
  import { useConfigStore } from '@/store/modules/config';
  const configStore = useConfigStore();
  const { t } = useI18n();

  const searchRef = ref<InstanceType<typeof ChannelGroupSearch> | null>(null);
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  const columns = ref<Columns>([
    {
      label: 'ID',
      prop: 'id',
      width: 80,
      align: 'center',
      fixed: 'left'
    },
    {
      label: '国家代码',
      prop: 'countryCode',
      align: 'center'
    },
    {
      label: '分组名称',
      prop: 'groupName',
      minWidth: 130,
      align: 'center'
    },
    {
      label: '备注',
      prop: 'remark',
      minWidth: 180,
      align: 'center'
    },
    {
      label: '创建|更新',
      prop: 'createTime',
      minWidth: 160,
      align: 'center',
      slot: 'createTime'
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 140,
      align: 'center',
      slot: 'action'
    }
  ]);

  const selections = ref<ChannelGroupVO[]>([]);

  // 当前编辑数据
  const current = ref<ChannelGroupVO | null>(null);

  // 是否显示编辑弹窗
  const showEdit = ref(false);

  const defaultWhere = reactive({
    countryCode: configStore.countryArr?.[0]?.code || undefined,
    startDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD')
  });

  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageChannelGroup({ ...defaultWhere, ...where, ...orders, ...pages });
  };

  const reload = (where?: ChannelGroupParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: ChannelGroupVO) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  const openExport = () => {
    exportChannelGroup({ ...searchRef.value!.searchParams() }, 'channel-group').then((res) => {
      ElMessage.success(res);
    });
  };

  const remove = (row: ChannelGroupVO) => {
    ElMessageBox.confirm('确定要删除"' + row.groupName + '"吗?', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeChannelGroup(row.id as number)
          .then((msg) => {
            loading.close();
            ElMessage.success(msg);
            reload();
          })
          .catch((e) => {
            loading.close();
            ElMessage.error(e.message);
          });
      })
      .catch(() => {});
  };
</script>

<script lang="ts">
  export default { name: 'channelGroup' };
</script>
