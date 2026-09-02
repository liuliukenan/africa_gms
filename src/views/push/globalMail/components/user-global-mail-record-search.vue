<!-- 搜索表单 -->
<template>
    <el-form @keyup.enter="search" @submit.prevent="">
        <el-row :gutter="8">
            <!-- <el-col   :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="id">
                        <el-input  clearable  v-model.trim="form.id"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col   :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="全局邮件ID">
                        <el-input  clearable  v-model.trim="form.mid"  placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
            <el-col :lg="8" :md="8" :sm="12" :xs="24">
                <el-form-item label="用户ID">
                    <el-input clearable v-model.trim="form.uid" placeholder="请输入" />
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
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useFormData } from '@/utils/use-form-data';
import type { UserGlobalMailRecordParam } from '@/api/platform/model/userGlobalMailRecord';

const emit = defineEmits<{
    (e: 'search', where?: UserGlobalMailRecordParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<UserGlobalMailRecordParam>({
    id: undefined,
    mid: undefined,
    uid: undefined
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
