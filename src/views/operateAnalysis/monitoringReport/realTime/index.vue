<template>
  <ele-page>
    <ele-card class="ele-body">
      <Search @search="reload" />
      <EChart :where="searchWhere"/>
    </ele-card>
  </ele-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EChart from './components/echart.vue';
import Search from './components/search.vue';
const searchWhere = ref({});
const reload = (where: any) => {
  searchWhere.value = where;
};
</script>