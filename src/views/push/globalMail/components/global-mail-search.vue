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
                    <el-form-item label="类型">
                        <el-select v-model="form.type" clearable>
                            <el-option label="所有人" :value="0"></el-option>
                            <el-option label="提定人" :value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="发件人名称">
                        <el-input clearable v-model.trim="form.fromName" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="状态">
                        <el-select v-model="form.status" clearable>
                            <el-option label="启用" :value="1"></el-option>
                            <el-option label="禁用" :value="0"></el-option>
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
import { ref } from 'vue';
import { ArrowDown, ArrowUp } from '@/components/icons';
import { useFormData } from '@/utils/use-form-data';
import type { GlobalMailParam } from '@/api/platform/model/globalMail';
import { useConfigStore } from "@/store/modules/config"; // 导入store
// 初始化store
const configStore = useConfigStore();
const emit = defineEmits<{
    (e: 'search', where?: GlobalMailParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<GlobalMailParam>({
    id: undefined,
    type: undefined,
    countryCode: configStore.countryArr?.[0]?.code || '',
    title: "",
    content: "",
    fromName: "",
    status: undefined,
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
