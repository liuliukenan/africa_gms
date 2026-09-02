<!-- 搜索表单 -->
<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <!-- <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="id">
                        <el-input clearable v-model.trim="form.id" placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
                <!-- <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="名称">
                        <el-input clearable v-model.trim="form.name" placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
                <!-- <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="公司ID">
                        <el-input clearable v-model.trim="form.companyId" placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
                <el-col  :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="游戏分组">
                        <!-- <el-select v-model="form.gameGroupId" placeholder="请选择" style="width: 100%;">
                            <el-option v-for="item in configStore.gameGroupArr" :key="item.groupId"
                                :label="item.groupName" :value="item.groupId || ''" />
                        </el-select> -->
                        <dict-data v-model="form.gameGroupId" code="gameGroup" value-type="number" placeholder="请选择"
                            style="width: 100%;" />
                    </el-form-item>
                </el-col>
                <el-col  :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="游戏ID">
                        <el-input clearable v-model.trim="form.gameId" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
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
import type { UserWalletExampleParam } from '@/api/platform/model/userWalletExample';
import { useConfigStore } from '@/store/modules/config';

const emit = defineEmits<{
    (e: 'search', where?: UserWalletExampleParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<UserWalletExampleParam>({
    id: undefined,
    name: "",
    companyId: undefined,
    gameGroupId: undefined,
    gameId: undefined
});

const configStore = useConfigStore()

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
