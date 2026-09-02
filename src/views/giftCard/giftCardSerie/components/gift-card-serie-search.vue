<!-- 搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form label-width="72px" @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="系列名称">
            <el-input clearable v-model.trim="form.name" placeholder="请输入" />
          </el-form-item>
        </el-col>

        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="状态">
            <el-select v-model="form.status" style="width: 100%">
              <el-option label="禁用" :value="0" />
              <el-option label="启用" :value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :md="12" :sm="12" :xs="24">
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
  import { ref } from 'vue';
  import { useFormData } from '@/utils/use-form-data';
  import type { GiftCardSerieParam } from '@/api/giftCard/model/giftCardSerie';

  const emit = defineEmits<{
    (e: 'search', where?: GiftCardSerieParam): void;
  }>();
  /** 表单数据 */
  const [form, resetFields] = useFormData<GiftCardSerieParam>({
    name: '',
    status: undefined
  });

  /** 搜索 */
  const search = () => {
    emit('search', { ...form });
  };

  /**  重置 */
  const reset = () => {
    resetFields();
    search();
  };
</script>
