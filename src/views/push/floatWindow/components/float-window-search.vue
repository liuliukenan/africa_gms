<!-- 悬浮窗搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="国家代码">
            <el-select v-model="form.countryCode" placeholder="请选择" style="width: 100%">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="显示名称">
            <el-input clearable v-model.trim="form.name" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="所属于分组">
            <dict-data code="gameGroup" v-model="form.gameGroup" valueType="number" placeholder="请输入分组" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="跳转类型">
            <dict-data code="actionType" v-model="form.jumpType" valueType="number" placeholder="请选择跳转类型" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="状态">
            <el-select v-model="form.status" placeholder="请选择状态" style="width: 100%">
              <el-option label="启用" :value="true" />
              <el-option label="禁用" :value="false" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :md="12" :sm="12" :xs="24">
          <el-form-item label-width="16px">
            <el-button type="primary" @click="search">查询</el-button>
            <el-button @click="reset">重置</el-button>
            <el-link type="primary" :underline="false" @click="toggleExpand" style="margin-left: 12px">
              <template v-if="searchExpand">
                <span>收起</span>
                <el-icon style="vertical-align: -1px">
                  <ArrowUp />
                </el-icon>
              </template>
              <template v-else>
                <span>展开</span>
                <el-icon style="vertical-align: -2px">
                  <ArrowDown />
                </el-icon>
              </template>
            </el-link>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </ele-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ArrowDown, ArrowUp } from '@/components/icons';
import { useFormData } from '@/utils/use-form-data';
import type { FloatWindowParam } from '@/api/platform/model/floatWindow';
import { useConfigStore } from '@/store/modules/config';
const configStore = useConfigStore();
const emit = defineEmits<{
  (e: 'search', where?: FloatWindowParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<FloatWindowParam>({
  id: undefined,
  countryCode: configStore.countryArr?.[0]?.code || '',
  name: '',
  gameGroup: undefined,
  jumpType: undefined,
  status: true
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

/** 搜索展开/收起 */
const toggleExpand = () => {
  searchExpand.value = !searchExpand.value;
};
defineExpose({ form });
</script>
