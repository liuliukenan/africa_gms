<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <HomeBannerSearch ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
        :headerEllipsis="false" :export-config="{ fileName: '轮播图', datasource: exportSource }" :pagination="false"
        :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }" cache-key="proBanner"  :tools="['reload', 'columns', 'maximized']">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()">
            新建
          </el-button>
          <el-button type="success" class="ele-btn-icon"  @click="openData()">
            数据
          </el-button>
          <el-popconfirm title="确认发送到服务器吗？" @confirm="sendServer()">
            <template #reference>
              <el-button type="danger" class="ele-btn-icon">
                <span>发送服务器</span>
              </el-button>
            </template>
          </el-popconfirm>
        </template>
        <template #navId="{ row }">
          <el-tag type="success" effect="dark" v-if="row.navId">{{ row.navId }}</el-tag>
        </template>
        <template #pushRange="{ row }">
          <dict-data code="bannerJumpType" v-model="row.pushRange" valueType="number" type="tag" />
        </template>
        <template #pushDetail="{ row }">
          <div style="white-space: pre-line; font-size: 12px">{{ row.pushDetail }}</div>
        </template>
        <template #en="{ row }">
          <img v-if="row.en" :src="row.en" class="table-img" />
          <el-icon v-else style="font-size: 32px; color: #ccc">
            <Picture />
          </el-icon>
        </template>
        <template #status="{ row }">
          <span>{{ row.status ? '开启' : '关闭' }}</span>
        </template>
        <template #intervalTime="{ row }">
          <span v-if="row.intervalTime">{{ row.intervalTime }}秒</span>
        </template>
        <template #action="{ row }">
          <el-link type="primary" size="small" @click="openEdit(row)" style="margin-right: 8px;">编辑</el-link>
          <el-link type="warning" size="small" @click="copy(row)" style="margin-right: 8px;">复制</el-link>
          <el-link type="success" size="small" @click="openData(row)" style="margin-right: 8px;">数据</el-link>
          <el-link type="danger" size="small" @click="remove(row)">删除</el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <HomeBannerEdit :data="current" v-model="showEdit" @done="reload" />
    <HomeBannerData :data="current" v-model="showData" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessageBox } from "element-plus/es";
import { EleMessage } from "ele-admin-plus/es";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import { PlusOutlined } from "@/components/icons";
import { Picture } from "@element-plus/icons-vue";
import HomeBannerSearch from "./components/homeBanner-search.vue";
import HomeBannerData from "./components/data.vue";
import HomeBannerEdit from "./components/homeBannerEdit.vue";
import { pageBanner, removeBanner, sendConfServer, copyBanner, addBanner } from "@/api/config/homeBannerApi";
import type { Banner, BannerParam } from "@/api/model/homeBanner";

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);
const searchRef = ref<InstanceType<typeof HomeBannerSearch> | null>(null);
/** 表格列配置 */
const columns = ref<Columns>([
  {
    prop: "id",
    label: "ID",
    width: 60,
    align: "center",
    fixed: "left",
  },
  {
    prop: "priority",
    label: "优先级",
    // width: 80,
    align: "center",
  },
  {
    prop: "name",
    label: "轮播图名称",
    // minWidth: 120,
    align: "center",
  },
  {
    prop: "navId",
    label: "所属导航",
    slot: "navId",
    minWidth: 120,
    align: "center",
  },
  {
    prop: "pushRange",
    label: "推送范围",
    slot: "pushRange",
    minWidth: 100,
    align: "center",
  },
  {
    prop: "pushDetail",
    label: "推送详情",
    slot: "pushDetail",
    minWidth: 120,
    align: "center",
  },
  {
    label: "图片",
    prop: "en",
    slot: "en",
    width: 130,
    align: "center",
  },
  // {
  //   prop: "startTime",
  //   label: "生效时间",
  //   minWidth: 180,
  //   align: "center",
  //   formatter: (row: Banner) => {
  //     if (row.startTime && row.endTime) {
  //       return row.startTime + '~' + row.endTime;
  //     }
  //     return '';
  //   }
  // },
  {
    label: "状态",
    prop: "status",
    slot: "status",
    minWidth: 80,
    align: "center",
  },
  {
    label: "间隔",
    prop: "intervalTime",
    slot: "intervalTime",
    minWidth: 80,
    align: "center",
  },
  {
    columnKey: "action",
    label: "操作",
    width: 230,
    align: "center",
    slot: "action",
    hideInPrint: true,
    hideInExport: true,
  },
]);

/** 表格选中数据 */
const selections = ref<Banner[]>([]);

/** 当前编辑数据 */
const current = ref<Banner | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);
const showData = ref(false);

/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageBanner({
    ...where,
    ...orders,
  });
};

/** 搜索 */
const reload = (where?: BannerParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row?: Banner) => {
  current.value = row ?? null;
  showEdit.value = true;
};
const openData = (row?: Banner) => {
  current.value = row ?? null;
  showData.value = true;
};

/** 复制 */
const copy = (row: Banner) => {
  const loading = EleMessage.loading({
    message: '请求中..',
    plain: true,
  });
  let params = { ...row, status: 1 };
  addBanner(params)
    .then((msg) => {
      loading.close();
      EleMessage.success(msg);
      reload();
    })
    .catch((e) => {
      loading.close();
      EleMessage.error(e.message);
    });
};

/** 删除单个 */
const remove = (row: Banner) => {
  ElMessageBox.confirm("确定要删除ID为“" + row.id + "”的数据吗?", "系统提示", {
    type: "warning",
    draggable: true,
  })
    .then(() => {
      const loading = EleMessage.loading({
        message: "请求中..",
        plain: true,
      });
      removeBanner(row.id)
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
    .catch(() => { });
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
  return pageBanner({
    ...where,
    ...orders,
  });
};
</script>
<script lang="ts">
export default {
  name: 'Banner'
};
</script>
<style lang="scss" scoped>
.table-img {
  width: 80px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}
</style>
