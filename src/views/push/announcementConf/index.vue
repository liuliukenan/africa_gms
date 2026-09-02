<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <announcement-conf-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()"> 新建 </el-button>
          <el-popconfirm :title="t('common.sureSend')" @confirm="sendServer()">
            <template #reference>
              <el-button type="danger" class="ele-btn-icon">
                <span> {{ t('action.sendServer') }}</span>
              </el-button>
            </template>
          </el-popconfirm>
          <el-button type="success" class="ele-btn-icon" :icon="UploadOutlined" @click="showImport = true">导入导出</el-button>
        </template>
        <template #sourceType="{ row }">
          <dict-data code="announceType" v-model="row.sourceType" type="tag" value-type="number" />
        </template>
        <template #jumpType="{ row }">
           <dict-data code="actionType2" value-type="number" v-model="row.jumpType" type="tag" />
        </template>
        <template #state="{ row }">
          <el-tag v-if="row.state == 1" type="success">开启</el-tag>
          <el-tag v-else type="danger">关闭</el-tag>
        </template>

        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)"> 修改 </el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)"> 删除 </el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <announcement-conf-edit :data="current" v-model="showEdit" @done="reload" />
    <AnnouncementConfImport v-model="showImport" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { PlusOutlined, UploadOutlined } from '@/components/icons';
  import AnnouncementConfSearch from './components/announcement-conf-search.vue';
  import AnnouncementConfEdit from './components/announcement-conf-edit.vue';
  import { pageAnnouncementConfs, removeAnnouncementConf, sendConfServer } from '@/api/push/announcementConfApi';
  import type { AnnouncementConf, AnnouncementConfParam } from '@/api/push/model/announcementConf';
  import { toDateString } from '@/utils/utils';
  import { useI18n } from 'vue-i18n';
  import AnnouncementConfImport from './components/announcement-conf-import.vue';
  const { t } = useI18n();

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof AnnouncementConfSearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    // {
    //   prop: "id",
    //   label: "ID",
    //   width: 90,
    //   align: 'left',
    //   fixed: 'left',
    // },
    {
      prop: 'keyId',
      label: 'keyid',
      // minWidth: 110,
      align: 'center'
    },
    {
      prop: 'name',
      label: '名称',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'sourceType',
      slot: 'sourceType',
      label: '跑马灯类型',
      // minWidth: 110,
      align: 'center'
    },
    {
      prop: 'jumpType',
      slot: 'jumpType',
      label: '跳转类型',
      // minWidth: 110,
      align: 'center'
    },
    {
      prop: 'jumpId',
      label: '跳转ID/跳转功能',
      // minWidth: 110,
      align: 'center'
    },
    {
      prop: 'announcementContent',
      label: '内容',
      minWidth: 200,
      align: 'left',
      formatter: (row) => {
        return JSON.stringify(row.announcementContent);
      }
    },
    {
      prop: 'state',
      slot: 'state',
      label: '状态',
      // minWidth: 110,
      align: 'center'
    },
    {
      prop: 'weight',
      label: '随机抽取权重',
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

  /** 是否显示导入导出弹窗 */
  const showImport = ref(false);

  /** 表格选中数据 */
  const selections = ref<AnnouncementConf[]>([]);

  /** 当前编辑数据 */
  const current = ref<AnnouncementConf | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageAnnouncementConfs({
      ...where,
      ...orders,
      ...pages
    });
  };

  /** 搜索 */
  const reload = (where?: AnnouncementConfParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: AnnouncementConf) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  /** 删除单个 */
  const remove = (row: AnnouncementConf) => {
    ElMessageBox.confirm('确定要删除“' + row.keyId + '”吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeAnnouncementConf(row.keyId)
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
