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
          <el-form-item label="游戏名称">
            <el-input clearable v-model.trim="form.gameName" placeholder="请输入" />
          </el-form-item>
        </el-col>

        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="状态">
            <el-select v-model="form.state" placeholder="请选择" clearable style="width: 100%">
              <el-option label="CLOSE" :value="false" />
              <el-option label="OPEN" :value="true" />
            </el-select>
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
  import type { RobotWinConfParam } from '@/api/config/model/robotWinConf';

  const emit = defineEmits<{
    (e: 'search', where?: RobotWinConfParam): void;
  }>();
  /** 表单数据 */
  const [form, resetFields] = useFormData<RobotWinConfParam>({
    gameId: undefined,
    gameName: '',
    state: undefined
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
