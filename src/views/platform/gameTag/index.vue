<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <game-tag-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :max-height="650" 
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
        :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable" :pagination="false"
        :tools="['reload', 'columns', 'maximized']">
       
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()">
            {{ t('action.add') }}
          </el-button>
          <el-popconfirm title="确认发送到服务器吗？" @confirm="sendServer()">
            <template #reference>
              <el-button type="danger" class="ele-btn-icon">
                <span>发送服务器</span>
              </el-button>
            </template>
          </el-popconfirm>
        </template>
        <template #gameGroup="{ row }">
          <dict-data code="gameGroup" v-model="row.gameGroup" valueType="number" type="tag" />
        </template>
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)">
            {{ t('action.edit') }}
          </el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)">
            {{ t('action.delete') }}
          </el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <game-tag-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>

</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessageBox } from "element-plus/es";
import { EleMessage } from "ele-admin-plus/es";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import { PlusOutlined } from "@/components/icons";
import GameTagSearch from "./components/game-tag-search.vue";
import GameTagEdit from "./components/game-tag-edit.vue";
import { pageGameTags, removeGameTag, sendConfServer } from "@/api/platform/gameTagApi";
import type { GameTag, GameTagParam } from "@/api/platform/model/gameTag";
import { useI18n } from 'vue-i18n';
import { toDateString } from "@/utils/utils";
const { t } = useI18n();

/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof GameTagSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  {
    prop: "tagId",
    label: t('platform.gameTag.id'),
    width: 60,
    align: 'left',
    fixed: 'left',
  },
  {
    prop: "tagName",
    label: t('platform.gameTag.tagName'),
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "gameGroup",
    slot: "gameGroup",
    label: t('platform.gameTag.gameGroup'),
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "sortNumber",
    label: t('platform.gameTag.sortNumber'),
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "state",
    label: t('platform.gameTag.state'),
    formatter: (row) => row.state ? t('action.open') : t('action.close'),
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "realRate",
    label: t('platform.gameTag.realRate'),
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "betaRates",
    label: t('platform.gameTag.betaRates'),
    formatter: (row) => '[' + (row.betaRates) + ']',
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "baseRates",
    label: t('platform.gameTag.baseRates'),
    formatter: (row) => '[' + (row.baseRates) + ']',
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "rowNum",
    label: t('platform.gameTag.rowNum')+t('platform.gameTag.colNum'),
    formatter: (row) => row.rowNum + '*' + row.colNum,
    minWidth: 110,
    align: 'left',
  },
  {
    label: t('platform.gameTag.createTime'),
    prop: 'createTime',
    formatter: (row) => toDateString(row.createTime),
    align: 'left',
    minWidth: 110
  },
  {
    columnKey: "action",
    label: t('action.action'),
    width: 200,
    align: "center",
    slot: "action",
    hideInPrint: true,
    hideInExport: true
  }
]);

/** 表格选中数据 */
const selections = ref<GameTag[]>([]);

/** 当前编辑数据 */
const current = ref<GameTag | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);


/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageGameTags({
    ...where,
    ...orders,
    // ...pages
  });
};

/** 搜索 */
const reload = (where?: GameTagParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row?: GameTag) => {
  current.value = row ?? null;
  showEdit.value = true;
};

/** 删除单个 */
const remove = (row: GameTag) => {
  ElMessageBox.confirm(
    t('common.sureDel', [row.tagId]),
    t('common.tips'),
    { type: 'warning', draggable: true }
  )
    .then(() => {
      const loading = EleMessage.loading({
        message: t('common.loading'),
        plain: true
      });
      removeGameTag(row.tagId)
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
    .catch(() => {
    });
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
