<!-- 搜索表单 -->
<template>
  <el-form  @keyup.enter="search" @submit.prevent="">
    <el-row :gutter="8">
      <el-col :lg="6" :md="12" :sm="12" :xs="24">
        <el-form-item label="用户账号">
          <el-input
            clearable
            v-model.trim="form.username"
            placeholder="请输入用户账号"
          />
        </el-form-item>
      </el-col>
      <el-col :lg="6" :md="12" :sm="12" :xs="24">
        <el-form-item label="真实姓名">
          <el-input
            clearable
            v-model.trim="form.realname"
            placeholder="请输入真实姓名"
          />
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
</template>

<script lang="ts" setup>
  import { useFormData } from '@/utils/use-form-data';
  import type { SysUserParam } from '@/api/model/sysUser';
  const emit = defineEmits<{
    (e: 'search', where?: SysUserParam): void;
  }>();

  /** 表单数据 */
  const [form, resetFields] = useFormData<SysUserParam>({
    username:undefined,
    realname: undefined,
    // sex: void 0
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

  defineExpose({ resetFields });
</script>
