<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <banner-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :pagination="false" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
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
          <dict-data code="actionType" v-model="row.jumpType" valueType="number" type="tag" />
        </template>
        <template #gameGroup="{ row }">
          <dict-data code="gameGroup" v-model="row.gameGroup" valueType="number" type="tag" />
        </template>
        <template #actId="{ row }">
          <div>{{ activityArr.find((item) => item.id === row.actId)?.name }}</div>
        </template>
        <template #actCompletePolicy="{ row }">
          <dict-data code="actCompletePolicy" v-model="row.actCompletePolicy" valueType="number" type="tag" />
        </template>
        <template #imgUrl="{ row }">
          <el-image :src="imgBaseUrl + row.imgUrl" style="width: 100px; height: 100px" />
        </template>
        <template #status="{ row }">
          <el-link :type="row.status === true ? 'success' : 'danger'">{{ row.status === true ? '启用' : '禁用' }}</el-link>
        </template>
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)"> 修改 </el-link>
          <el-link type="success" :underline="false" @click="copy(row)"> 复制 </el-link>
          <el-link type="danger" :underline="false" @click="remove(row)"> 删除 </el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <banner-edit :data="current" v-model="showEdit" :is-copy="isCopy" :activity-arr="activityArr" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { PlusOutlined } from '@/components/icons';
  import BannerSearch from './components/banner-search.vue';
  import BannerEdit from './components/banner-edit.vue';
  import { addBanner, pageBanners, removeBanner, sendConfServer } from '@/api/platform/bannerApi';
  import type { Banner, BannerParam } from '@/api/platform/model/banner';
  import { toDateZone } from '@/utils/utils';
  import { useConfigStore } from '@/store/modules/config';
  import { CountryAct } from '@/api/platform/model/faceShot.js';
  import { listByCountryCode } from '@/api/platform/faceShotApi.js';
  const configStore = useConfigStore();

  const imgBaseUrl = import.meta.env.VITE_APP_IMG_URL;
  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof BannerSearch> | null>(null);

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
      prop: 'countryCode',
      label: '国家代码',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'name',
      label: '显示名称',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'imgUrl',
      slot: 'imgUrl',
      label: '图片',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'gameGroup',
      slot: 'gameGroup',
      label: '所属于分组',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'jumpType',
      slot: 'jumpType',
      label: '跳转类型',
      minWidth: 110,
      align: 'left'
    },
    // {
    //   prop: "jumpExtend",
    //   label: "扩展信息",
    //   minWidth: 110,
    //   align: 'left',
    // },
    // {
    //   prop: "userRange",
    //   label: "发送范围",
    //   minWidth: 110,
    //   align: 'left',
    // },
    // {
    //   prop: "triggerType",
    //   label: "触发类型",
    //   minWidth: 110,
    //   align: 'left',
    // },
    {
      prop: 'jumpId',
      label: '跳转类联ID',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'actId',
      slot: 'actId',
      label: '关联活动',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'actCompletePolicy',
      slot: 'actCompletePolicy',
      label: '活动完成策略',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'sortNumber',
      label: '排序',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'status',
      slot: 'status',
      label: '状态',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'startDate',
      // formatter: (row) => toDateZone(row.startDate, row.countryCode),
      label: '开始时间',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'endDate',
      // formatter: (row) => toDateZone(row.endDate, row.countryCode),
      label: '结束时间',
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
  const selections = ref<Banner[]>([]);

  /** 当前编辑数据 */
  const current = ref<Banner | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  const defaultWhere = {
    countryCode: configStore.countryArr?.[0]?.code || ''
  };

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageBanners({
      ...defaultWhere,
      ...where,
      ...orders,
      ...pages
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
    isCopy.value = false;
  };
  const isCopy = ref(false);
  /** 复制 */
  const copy = (row: Banner) => {
    let params = { ...row, status: false, id: undefined };
    current.value = params ?? null;
    isCopy.value = true;
    showEdit.value = true;
  };
  /** 删除单个 */
  const remove = (row: Banner) => {
    ElMessageBox.confirm('确定要删除“' + row.id + '”吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
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
  const activityArr = ref<CountryAct[]>([]);
  // 根据国家代码获取活动列表
  const changeCountry = async (val: any) => {
    try {
      const res = await listByCountryCode(val);
      if (res) {
        activityArr.value = res;
      }
    } catch (e) {
      console.error(e);
    }
  };
  watch(
    () => searchRef.value?.form.countryCode,
    (val) => {
      changeCountry(val);
    }
  );
</script>
