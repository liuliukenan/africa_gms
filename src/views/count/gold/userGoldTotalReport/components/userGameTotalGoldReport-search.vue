<!-- 搜索表单 -->
<template>
  <el-form :label-col="{ xl: 7, lg: 5, md: 7, sm: 4 }" :wrapper-col="{ xl: 17, lg: 19, md: 17, sm: 20 }">
    <el-row :gutter="8">
      <el-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
        <el-form-item label="游戏名称">
          <el-input v-model="form.gameName" placeholder="请输入" clearable />
        </el-form-item>
      </el-col>
      <el-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
        <el-form-item label="场次">
          <el-input-number v-model="form.limitTag" placeholder="请输入" :controls="false" clearable style="width: 100%" />
        </el-form-item>
      </el-col>

      <el-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
        <el-form-item class="ele-text-center" :wrapper-col="{ span: 24 }">
          <el-space>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-space>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
  import { useFormData } from '@/utils/use-form-data';

  const emit = defineEmits(['search']);

  // 表单数据
  const { form, resetFields } = useFormData({
    uid: undefined,
    gameId: undefined,
    gameName: undefined,
    limitTag: undefined
  });

  /* 搜索 */
  const search = () => {
    emit('search', form);
  };
  /**  重置 */
  const reset = () => {
    resetFields();
    search();
  };
</script>
