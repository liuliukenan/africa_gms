<!-- 搜索表单 -->
<template>
  <!-- <ele-card :body-style="{ paddingBottom: '2px' }"> -->
    <el-form  @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="游戏ID">
            <el-input clearable v-model.trim="form.gameId" placeholder="请输入游戏ID" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="游戏名称">
            <el-input clearable v-model="form.name" placeholder="请输入游戏名称" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="渠道类型">
            <dict-data code="serverType" valueType="number" v-model="form.sid" placeholder="请选择渠道类型" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label-width="16px">
            <el-button type="primary" @click="search">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  <!-- </ele-card> -->
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useFormData } from '@/utils/use-form-data';
  import type { GameConfParam } from '@/api/game/model/index';
  const emit = defineEmits<{
    (e: 'search', where?: GameConfParam): void;
  }>();
  /** 表单数据 */
  const [form, resetFields] = useFormData<GameConfParam>({
    name: undefined,
    sid: undefined,
    gameId: undefined,
  });

  /** 搜索表单是否展开 */
  const searchExpand = ref(false);

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
