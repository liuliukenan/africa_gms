<!-- 搜索表单 -->
<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <!-- <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="ID">
                        <el-input clearable v-model.trim="form.id" placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="名称">
                        <el-input clearable v-model.trim="form.name" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="跑马灯类型">
                        <dict-data code="announceType" v-model="form.sourceType" valueType="number" filterable
                            placeholder="请选择跑马灯类型" style="width: 100%" />
                    </el-form-item>
                </el-col>
                <!-- <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="跳转类型">
                        <el-input  clearable  v-model.trim="form.jumpType"  placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
                <!-- <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="跳转ID/跳转功能">
                        <el-input  clearable  v-model.trim="form.jumpId"  placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
                <!-- <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="多语言跑马灯内容，{"EN":"...","SW":"..."}，支持占位符">
                        <el-input  clearable  v-model.trim="form.announcementContent"  placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
                <!-- <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="状态">
                        <el-input  clearable  v-model.trim="form.state"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="随机抽取权重">
                        <el-input  clearable  v-model.trim="form.weight"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="keyid">
                        <el-input  clearable  v-model.trim="form.keyId"  placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
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
// import { ArrowDown, ArrowUp } from '@/components/icons';
import { useFormData } from '@/utils/use-form-data';
import type { AnnouncementConfParam } from '@/api/push/model/announcementConf';

const emit = defineEmits<{
    (e: 'search', where?: AnnouncementConfParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<AnnouncementConfParam>({
    // id: undefined,
    name: "",
    sourceType: undefined,
    // jumpType: undefined,
    // jumpId: undefined,
    // announcementContent: undefined,
    state: undefined,
    // weight: undefined,
    keyId: undefined
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
