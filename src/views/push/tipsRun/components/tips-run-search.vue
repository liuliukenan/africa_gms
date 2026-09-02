<!-- 搜索表单 -->
<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form  @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="标题">
                        <el-input clearable v-model.trim="form.title" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="配置ID">
                        <el-input clearable v-model.trim="form.tipsConfId" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <!-- <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="显示总数">
                        <el-input clearable v-model.trim="form.totalCount" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="显示次数">
                        <el-input clearable v-model.trim="form.sendCount" placeholder="请输入" />
                    </el-form-item>
                </el-col> 
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="下次时间">
                        <el-input clearable v-model.trim="form.nextTime" placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
                <el-col  :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="状态">
                        <el-select v-model="form.state" clearable>
                            <el-option label="启用" :value="true"></el-option>
                            <el-option label="禁用" :value="false"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="12" :sm="12" :xs="24">
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
import { TipsRunParam } from "@/api/config/model/tipsRun";

const emit = defineEmits<{
    (e: 'search', where?: TipsRunParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<TipsRunParam>({
    id: undefined,
    title: "",
    tipsConfId: undefined,
    totalCount: undefined,
    sendCount: undefined,
    nextTime: undefined,
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
