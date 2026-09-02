<!-- 搜索表单 -->
<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="用户ID">
                        <el-input clearable v-model.trim="form.uid" placeholder="请输入用户ID" />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="触发类型">
                        <el-select style="width: 100%;" clearable v-model="form.triggerSpinType" placeholder="请选择">
                            <el-option label="免费次数" :value="1" />
                            <el-option label="免费游戏" :value="2" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="名称">
                        <el-input clearable v-model.trim="form.name" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="游戏ID">
                        <el-input clearable v-model.trim="form.gameId" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <!-- <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="钱包模板">
                        <el-input  clearable  v-model.trim="form.exampleId"  placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="状态">
                        <el-select style="width: 100%;" clearable v-model="form.status" placeholder="请选择">
                            <el-option label="pending" value="pending" />
                            <el-option label="in_progress" value="in_progress" />
                            <el-option label="completed" value="completed" />
                            <el-option label="expired" value="expired" />
                            <el-option label="forfeited" value="forfeited" />
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
import type { UserFreeGameParam } from '@/api/platform/model/userFreeGame';

const emit = defineEmits<{
    (e: 'search', where?: UserFreeGameParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<UserFreeGameParam>({
    id: undefined,
    uid: undefined,
    triggerSpinType: undefined,
    freeGameConfId: undefined,
    name: undefined,
    gameId: undefined,
    base: undefined,
    level: undefined,
    totalSpins: undefined,
    usedSpins: undefined,
    exampleId: undefined,
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
