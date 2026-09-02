<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <!-- <announcement-conf-search ref="searchRef" style="margin-bottom: -14px" @search="reload" /> -->
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :tools="['reload', 'columns', 'maximized']" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :pagination="false" :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" cache-key="commonTableTable">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()"> 新建 </el-button>
        </template>
        <template #sourceType="{ row }">
          <dict-data code="announceType" v-model="row.sourceType" type="tag" value-type="number" />
        </template>
        <template #jumpType="{ row }">
          <dict-data code="jumpType2" v-model="row.jumpType" type="tag" value-type="number" />
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
    <CommonTableEdit :data="current" :triggerType="props.triggerType" v-model="showEdit" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { PlusOutlined } from '@/components/icons';
  import CommonTableEdit from './commonTable-edit.vue';
  import type { AnnounceTriggerConf, AnnounceTriggerConfParam } from '@/api/push/model/announceTriggerConf';
  import { pageAnnounceTriggerConfs, removeAnnounceTriggerConf } from '@/api/push/announceTriggerConfApi';

  const props = defineProps<{
    triggerType?: number;
  }>();

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = computed<Columns>(() => [
    ...(props.triggerType == 1 || props.triggerType === 2
      ? [
          {
            prop: 'minMultiplier',
            label: '倍数下限',
            minWidth: 110,
            align: 'left'
          },
          {
            prop: 'maxMultiplier',
            slot: 'maxMultiplier',
            label: '倍数上限',
            minWidth: 110,
            align: 'left'
          }
        ]
      : [
          {
            prop: 'minAmount',
            label: '金额下限',
            minWidth: 110,
            align: 'left'
          },
          {
            prop: 'maxAmount',
            label: '金额上限',
            minWidth: 110,
            align: 'left'
          }
        ]),
    {
      prop: 'weight',
      slot: 'weight',
      label: '抽取权重',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'state',
      slot: 'state',
      label: '状态',
      minWidth: 110,
      align: 'left'
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 150,
      fixed: 'right',
      align: 'center',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    }
  ]);

  /** 表格选中数据 */
  const selections = ref<AnnounceTriggerConf[]>([]);

  /** 当前编辑数据 */
  const current = ref<AnnounceTriggerConf | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageAnnounceTriggerConfs({
      ...where,
      ...orders,
      ...pages
    }).then((res: any) => {
      if (props.triggerType != null && res && Array.isArray(res)) {
        return res.filter((item: any) => item.triggerType === props.triggerType && item.isRobot === true);
      }
      // 兼容分页结构 { list, count }
      if (props.triggerType != null && res && Array.isArray(res.list)) {
        return {
          ...res,
          list: res.list.filter((item: any) => item.triggerType === props.triggerType && item.isRobot === true)
        };
      }
      return res;
    });
  };

  /** 搜索 */
  const reload = (where?: AnnounceTriggerConfParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: AnnounceTriggerConf) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  /** 删除单个 */
  const remove = (row: AnnounceTriggerConf) => {
    ElMessageBox.confirm('确定要删除“' + row.id + '”吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeAnnounceTriggerConf(row.id)
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
</script>
