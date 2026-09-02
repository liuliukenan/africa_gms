<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <!-- <announcement-run-search ref="searchRef" style="margin-bottom: -14px" @search="reload" /> -->
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable" :tools="['reload', 'density', 'columns', 'maximized']">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()"> 新建 </el-button>
          <el-popconfirm :title="t('common.sureSend')" @confirm="sendServer()">
            <template #reference>
              <el-button type="danger" class="ele-btn-icon">
                <span> {{ t('action.sendServer') }}</span>
              </el-button>
            </template>
          </el-popconfirm>
        </template>
        <template #state="{ row }">
          <el-tag v-if="row.state" type="success">开启</el-tag>
          <el-tag v-else type="danger">关闭</el-tag>
        </template>
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)"> 修改 </el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)"> 删除 </el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <announcement-run-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { PlusOutlined } from '@/components/icons';
  import AnnouncementRunSearch from './components/announcement-run-search.vue';
  import AnnouncementRunEdit from './components/announcement-run-edit.vue';
  import { pageAnnouncementRuns, removeAnnouncementRun, sendConfServer } from '@/api/push/announcementRunApi';
  import type { AnnouncementRun, AnnouncementRunParam } from '@/api/push/model/announcementRun';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof AnnouncementRunSearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    // {
    //   prop: "id",
    //   label: "ID",
    //   width: 60,
    //   align: 'left',
    //   fixed: 'left',
    // },
    {
      prop: 'announcementConfId',
      label: '模版ID',
      // minWidth: 110,
      align: 'center'
    },
    {
      prop: 'title',
      label: 'title',
      minWidth: 150,
      align: 'left'
    },
    // {
    //   prop: "gameName",
    //   label: "游戏名称",
    //   minWidth: 110,
    //   align: 'left',
    // },
    // {
    //   prop: "gameId",
    //   label: "游戏id",
    //   minWidth: 110,
    //   align: 'left',
    // },
    // {
    //   prop: "uid",
    //   label: "用户id",
    //   minWidth: 110,
    //   align: 'left',
    // },
    // {
    //   prop: "title",
    //   label: "运营标识名称",
    //   minWidth: 110,
    //   align: 'left',
    // },
    {
      prop: 'state',
      slot: 'state',
      label: '状态',
      // minWidth: 110,
      align: 'center'
    },
    {
      prop: 'startDate',
      label: '生效开始时间',
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'endDate',
      // formatter: (row) => toDateString(row.endDate),
      label: '生效结束时间',
      // minWidth: 110,
      align: 'center'
    },
    {
      prop: 'totalCount',
      label: '总推送次数',
      // minWidth: 110,
      align: 'center'
    },
    {
      prop: 'timeLen',
      label: '推送间隔（分钟）',
      // minWidth: 110,
      align: 'center'
    },
    {
      prop: 'sendCount',
      label: '已推送次数',
      // minWidth: 110,
      align: 'center'
    },
    // {
    //   prop: "nextTime",
    //   formatter: (row) => toDateString(row.nextTime),
    //   label: "下次推送时间戳（ms）",
    //   minWidth: 110,
    //   align: 'left',
    // },
    // {
    //   label: '时间',
    //   prop: 'createTime',
    //   formatter: (row) => toDateString(row.createTime),
    //   align: 'left',
    //   minWidth: 110
    // },
    {
      columnKey: 'action',
      label: '操作',
      width: 120,
      fixed: 'right',
      align: 'center',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    }
  ]);

  /** 表格选中数据 */
  const selections = ref<AnnouncementRun[]>([]);

  /** 当前编辑数据 */
  const current = ref<AnnouncementRun | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageAnnouncementRuns({
      ...where,
      ...orders,
      ...pages
    });
  };

  /** 搜索 */
  const reload = (where?: AnnouncementRunParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: AnnouncementRun) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  /** 删除单个 */
  const remove = (row: AnnouncementRun) => {
    ElMessageBox.confirm('确定要删除“' + row.id + '”吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeAnnouncementRun(row.id)
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
      message: t('common.loading'),
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
