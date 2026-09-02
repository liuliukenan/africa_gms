<template>
  <ele-table-select clearable placeholder="请选择" value-key="keyId" label-key="name" v-model="selectedValue" :table-props="tableProps" :popper-width="580" @select="handleSelect">
    <template #state="{ row }">
      <el-tag v-if="row.state" type="success">启用</el-tag>
      <el-tag v-else type="danger">禁用</el-tag>
    </template>
    <template #sourceType="{ row }">
      <dict-data code="announceType" value-type="number" v-model="row.sourceType" type="tag" />
    </template>
    <template #jumpType="{ row }">
      <!-- <dict-data code="actionType2" value-type="number" v-model="row.jumpType" type="tag" /> -->
         <dict-data code="actionType2" value-type="number" v-model="row.jumpType" type="tag" />
    </template>
  </ele-table-select>
</template>

<script setup lang="ts">
  import { pageAnnouncementConfs } from '@/api/push/announcementConfApi';
  import type { TableSelectProps } from 'ele-admin-plus/es/ele-table-select/props';
  import { computed } from 'vue';

  const selectedValue = defineModel<number>();
  const emit = defineEmits<{
    (e: 'selectRow', row: any): void;
  }>();

  const columns: Exclude<TableSelectProps['tableProps'], undefined>['columns'] = [
    { prop: 'keyId', label: 'keyId', width: 60, align: 'left', fixed: 'left' },
    { prop: 'name', label: '跑马灯名称', minWidth: 110, align: 'left' },
    { prop: 'sourceType', slot: 'sourceType', label: '跑马灯类型', minWidth: 110, align: 'left' },
        { prop: 'jumpType', slot: 'jumpType', label: '跳转类型', minWidth: 110, align: 'left' },
    { prop: 'state', slot: 'state', label: '状态', minWidth: 110, align: 'left' }
  ];

  const tableProps = computed<Exclude<TableSelectProps['tableProps'], undefined>>(() => ({
    datasource: async ({ pages, where }: any) => {
        return pageAnnouncementConfs({ ...pages, ...where,selectFlag:true } as any);
    },
    columns,
    highlightCurrentRow: true,
    toolbar: false,
    pagination: {
      pageSize: 9,
      layout: 'total, prev, pager, next, jumper'
    },
    footerStyle: { padding: '0px' },
    rowStyle: { cursor: 'pointer' }
  }));
  const handleSelect = (row: any) => {
    emit('selectRow', row);
  };
</script>

<style scoped></style>
