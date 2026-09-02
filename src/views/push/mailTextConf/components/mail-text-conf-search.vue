<!-- 搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="国家代码">
            <el-select v-model="form.countryCode" placeholder="请选择" style="width: 100%">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name"
                :value="item.code" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="邮件标题">
            <el-input clearable v-model.trim="form.mailTitle" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="备注">
            <el-input clearable v-model.trim="form.remark" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="状态">
            <el-select v-model="form.state" clearable>
              <el-option label="启用" :value="1"></el-option>
              <el-option label="禁用" :value="0"></el-option>
            </el-select>
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
  </ele-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useFormData } from '@/utils/use-form-data';
import type { MailTextConfParam } from '@/api/config/model/mailTextConf';
import { useConfigStore } from '@/store/modules/config';
const configStore = useConfigStore();
const emit = defineEmits<{
  (e: 'search', where?: MailTextConfParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<MailTextConfParam>({
  id: undefined,
  mailTitle: '',
  // mailText: '',
  countryCode: configStore.countryArr?.[0]?.code || '',
  //imgPos: undefined,
  // imgUrl: undefined,
  // buttonText: '',
  jumpType: undefined,
  jumpId: undefined,
  // jumpExtend: undefined,
  state: undefined
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
