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
          <el-form-item label="名称">
            <el-input clearable v-model.trim="form.tipsName" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24" v-show="searchExpand">
          <el-form-item label="tips类型">
            <!-- <el-input clearable v-model.trim="form.tipsType" placeholder="请输入" /> -->
             <dict-data code="tipsType" v-model="form.tipsType" valueType="number" placeholder="请输入类型"
              style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24" v-show="searchExpand">
          <el-form-item label="状态">
            <el-select v-model="form.state" placeholder="请选择状态" style="width: 100%" clearable>
              <el-option label="启用" :value="true" />
              <el-option label="禁用" :value="false" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="备注">
            <el-input clearable v-model.trim="form.remark" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
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
import { useFormData } from '@/utils/use-form-data';
import type { TipsConfParam } from '@/api/config/model/tipsConf';
import { useConfigStore } from '@/store/modules/config';
import { ArrowDown, ArrowUp } from '@/components/icons';
import { ref } from 'vue';
const configStore = useConfigStore();
const emit = defineEmits<{
  (e: 'search', where?: TipsConfParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<TipsConfParam>({
  tipsName: '',
  tipsType: undefined,
  countryCode: configStore.countryArr?.[0]?.code || '',
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
/** 搜索展开/收起 */
const toggleExpand = () => {
    searchExpand.value = !searchExpand.value;
};
</script>
