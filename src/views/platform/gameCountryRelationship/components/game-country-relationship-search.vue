<!-- 搜索表单 -->
<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="国家">
                        <el-select v-model="form.countryCode" placeholder="请选择" style="width: 100%;" @change="search">
                            <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name"
                                :value="item.code || ''" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="游戏ID">
                        <el-input clearable v-model.trim="form.gameId" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="名称">
                        <el-input clearable v-model.trim="form.name" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="状态">
                        <dict-data code="gameConfState" v-model="form.state" valueType="number" type="select" 
                            placeholder="请选择状态" />
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="是否火热">
                        <el-radio-group v-model="form.hot" @change="search">
                            <el-radio :value="true">是</el-radio>
                            <el-radio :value="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="新游戏">
                        <el-radio-group v-model="form.hasNew" @change="search">
                            <el-radio :value="true">是</el-radio>
                            <el-radio :value="false">否</el-radio>
                        </el-radio-group>
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
import { ref, watch } from 'vue';
import { ArrowDown, ArrowUp } from '@/components/icons';
import { useFormData } from '@/utils/use-form-data';
import type { GameCountryRelationshipParam } from '@/api/platform/model/gameCountryRelationship';
import { useConfigStore } from "@/store/modules/config"; // 导入store
// 初始化store
const configStore = useConfigStore();
const emit = defineEmits<{
    (e: 'search', where?: GameCountryRelationshipParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<GameCountryRelationshipParam>({
    countryCode: configStore.countryArr?.[0]?.code || '',
    gameId: undefined,
    name: "",
    hot: undefined,
    hasNew: undefined,
    sortNumber: undefined,
    state: undefined
});
/** 搜索表单是否展开 */
const searchExpand = ref(false);

/** 搜索 */
const search = () => {
    emit('search', { ...form });
};
/** 监听state字段变化触发搜索 */
watch(() => form.state, () => {
    search();
});
/**  重置 */
const reset = () => {
    resetFields();
    search();
};
const searchParams = () => {
  return form.countryCode || '';
};
defineExpose({
  searchParams,
  search
});
/** 搜索展开/收起 */
const toggleExpand = () => {
    searchExpand.value = !searchExpand.value;
};
</script>

