<!-- 搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="系列ID">
            <el-input-number clearable v-model.trim="form.serieId" :controls="false" style="width: 100%" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="系列名称">
            <el-input clearable v-model.trim="form.serieName" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="节点名称">
            <el-input clearable v-model.trim="form.nodeName" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="12" :sm="12" :xs="24">
          <el-form-item label-width="16px">
            <el-button type="primary" @click="search">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </ele-card>
</template>

<script lang="ts" setup>
  import { useFormData } from '@/utils/use-form-data';
  import type { GiftCardNodeParam } from '@/api/giftCard/model/giftCardNode';
  import { useRoute } from 'vue-router';
  import { onMounted } from 'vue';

  const emit = defineEmits<{
    (e: 'search', where?: GiftCardNodeParam): void;
  }>();
  const route = useRoute();
  const serieIdQuery = route.query.serieId as any as number;

  /** 表单数据 */
  const [form, resetFields] = useFormData<GiftCardNodeParam>({
    serieId: serieIdQuery,
    nodeCode: '',
    serieName: '',
    status: undefined
  });
  onMounted(() => {
    if (serieIdQuery) {
      form.serieId = serieIdQuery;
      search();
    }
  });
  /** 搜索 */
  const search = () => {
    emit('search', { ...form });
  };

  /**  重置 */
  const reset = () => {
    resetFields();
    form.serieId = undefined;
    search();
  };
</script>
