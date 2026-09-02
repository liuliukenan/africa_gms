<template>
  <!-- filterable -->
  <ele-table-select ref="selectRef" clearable  placeholder="请选择" value-key="keyId" label-key="mailTitle" v-model="selectedValue" :table-props="tableProps" :popper-width="580" :cache-data="cacheData" @select="handleSelect" @filter-change="handleFilterChange">
    <template #jumpType="{ row }">
      <dict-data code="actionType2" v-model="row.jumpType" valueType="number" type="tag" />
    </template>
    <template #state="{ row }">
      <el-link :type="row.state === true ? 'success' : 'danger'">{{ row.state === true ? '启用' : '禁用' }}</el-link>
    </template>
  </ele-table-select>
</template>

<script setup lang="ts">
  import { pageMailTextConfs } from '@/api/config/mailTextConfApi';
  import { useConfigStore } from '@/store/modules/config';
  import type { TableSelectProps } from 'ele-admin-plus/es/ele-table-select/props';
  import { reactive, ref, watch } from 'vue';

  // ========== 模块级共享缓存 ==========
  // 所有 MailSelect 实例共享同一份 label 数据，避免多实例各自重复请求
  const sharedLabelMap = ref<Map<number, { keyId: number; mailTitle: string }>>(new Map());
  let sharedFetchPromise: Promise<void> | null = null;

  /** 确保共享缓存已加载（只发一次请求） */
  function ensureCacheLoaded(defaultWhere: any) {
    if (!sharedFetchPromise) {
      sharedFetchPromise = pageMailTextConfs({ page: 1, limit: 200, ...defaultWhere })
        .then((res) => {
          const map = new Map<number, { keyId: number; mailTitle: string }>();
          (res?.list || []).forEach((item: any) => {
            map.set(item.keyId, { keyId: item.keyId, mailTitle: item.mailTitle });
          });
          sharedLabelMap.value = map;
        })
        .catch(() => {
          sharedFetchPromise = null; // 失败后允许重试
        });
    }
    return sharedFetchPromise;
  }
  // ====================================

  // 初始化store
  const configStore = useConfigStore();
  const selectedValue = defineModel<number>();
  const emit = defineEmits<{
    (e: 'selectRow', { mailText, mailTitle }): void;
  }>();
  // 缓存已选中行的数据，用于回显 label
  const cacheData = ref<any[]>([]);
  const defaultWhere = reactive({
    countryCode: configStore.countryArr?.[0]?.code || undefined
  });

  // ========== 服务端搜索 ==========
  const selectRef = ref<any>();
  const searchText = ref('');
  let filterTimer: ReturnType<typeof setTimeout> | null = null;

  const handleFilterChange = (value: string) => {
    if (filterTimer) clearTimeout(filterTimer);
    filterTimer = setTimeout(() => {
      searchText.value = value || '';
      selectRef.value?.tableRef?.reload();
    }, 300);
  };
  // ==============================

  // 表格配置
  const tableProps = reactive<Exclude<TableSelectProps['tableProps'], undefined>>({
    datasource: ({ pages, where }) =>
      pageMailTextConfs({ ...pages, ...where, mailTitle: searchText.value || undefined, ...defaultWhere }),
    columns: [
      // {
      //     prop: 'id',
      //     label: 'ID',
      //     width: 48,
      //     align: 'center',
      //     fixed: 'left'
      // },
      {
        prop: 'keyId',
        label: 'ID',
        width: 70,
        align: 'center',
        fixed: 'left'
      },
      {
        prop: 'mailTitle',
        label: '邮件标题'
      },
      {
        prop: 'jumpType',
        slot: 'jumpType',
        label: '跳转类型'
      },
      // {
      //     prop: 'buttonText',
      //     label: '按钮文本',
      // },
      // {
      //     prop: 'mailText',
      //     label: '文本内容',
      // },
      {
        prop: 'state',
        slot: 'state',
        label: '状态'
      },
      {
        prop: 'remark',
        label: '备注'
      }
    ],
    highlightCurrentRow: true,
    toolbar: false,
    pagination: {
      pageSize: 6,
      layout: 'total, prev, pager, next, jumper'
    },
    footerStyle: { padding: '0px' },
    rowStyle: { cursor: 'pointer' }
  });
  const handleSelect = (row: any) => {
    // 缓存选中行数据，确保回显时能显示 mailTitle
    cacheData.value = [{ keyId: row.keyId, mailTitle: row.mailTitle }];
    if (row?.mailText != null) {
      emit('selectRow', { mailText: row.mailText, mailTitle: row.mailTitle });
    }
  };

  // 处理初始回显：从共享缓存同步查找 label，避免多实例各自发请求导致的时序不一致
  function syncCacheFromShared() {
    const val = selectedValue.value;
    if (val != null && !cacheData.value.some((item) => item.keyId === val)) {
      // 先从已加载的共享缓存中同步查找
      const cached = sharedLabelMap.value.get(val);
      if (cached) {
        cacheData.value = [cached];
        return;
      }
      // 缓存未加载则触发一次加载，加载完成后重试
      ensureCacheLoaded(defaultWhere).then(() => {
        const item = sharedLabelMap.value.get(val);
        if (item) {
          cacheData.value = [item];
        }
      });
    }
  }

  // 组件挂载时立即尝试同步回显
  syncCacheFromShared();
  // 监听 value 变化
  watch(selectedValue, () => syncCacheFromShared());
</script>

<style scoped></style>
