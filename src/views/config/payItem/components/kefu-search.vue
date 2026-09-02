<!-- 搜索表单 -->
<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form  @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <!-- <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="id">
                        <el-input clearable v-model.trim="form.id" placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="类型">
                        <dict-data code="addressType" valueType="number" placeholder="请选择类型" v-model="form.type" />
                    </el-form-item>
                </el-col>
                <el-col :lg="12" :md="12" :sm="12" :xs="24">
                    <el-form-item label="地址">
                        <el-input clearable v-model.trim="form.url" placeholder="请输入" />
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
import { ref } from 'vue';
import { useFormData } from '@/utils/use-form-data';
import type { KefuParam } from '@/api/model/kefu';

const emit = defineEmits<{
    (e: 'search', where?: KefuParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<KefuParam>({
    id: undefined,
    type: undefined,
    url: ""
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
