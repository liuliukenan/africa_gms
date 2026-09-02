<!-- 搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form label-width="72px" @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="游戏ID">
            <el-input clearable v-model.trim="form.gameId" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="搜索内容">
            <el-input clearable v-model.trim="form.gameName" placeholder="请输入" />
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
  import { useFormData } from '@/utils/use-form-data';
  import { GameHotsParam } from '@/api/config/model/gameHots';

  const emit = defineEmits<{
    (e: 'search', where?: GameHotsParam): void;
  }>();
  /** 表单数据 */
  const [form, resetFields] = useFormData<GameHotsParam>({
    gameName: ''
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
