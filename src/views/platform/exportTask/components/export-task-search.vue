<!-- 搜索表单 -->
<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form  @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="任务ID">
                        <el-input clearable v-model.trim="form.taskId" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="任务状态：">
                        <el-select v-model="form.status" placeholder="请选择">
                            <el-option label="PROCESSING" value="0" />
                            <el-option label="SUCCESS" value="1" />
                            <el-option label="FAILED" value="2" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <!-- <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="错误消息">
                        <el-input clearable v-model.trim="form.message" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="下载地址">
                        <el-input clearable v-model.trim="form.downloadUrl" placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
                <el-col :lg="8" :md="12" :sm="12" :xs="24">
                    <el-form-item label-width="16px">
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button @click="reset">重置</el-button>
                        <!-- <el-link type="primary" :underline="false" @click="toggleExpand" style="margin-left: 12px">
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
                        </el-link> -->
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
import type { ExportTaskParam } from '@/api/platform/model/exportTask';

const emit = defineEmits<{
    (e: 'search', where?: ExportTaskParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<ExportTaskParam>({
    taskId: "",
    status: undefined,
    message: "",
    downloadUrl: ""
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
