<!-- 搜索表单 -->
<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="名称">
                        <el-input v-model="form.name" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="所属导航">
                        <dict-data code="bannerJumpType" v-model="form.navId" valueType="number" placeholder="全部" />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="状态">
                        <el-select v-model="form.status" placeholder="启用中" clearable style="width: 100%">
                            <el-option label="启用中" :value="1" />
                            <el-option label="已禁用" :value="0" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="推送范围">
                        <dict-data code="bannerJumpType" v-model="form.pushRange" valueType="number" placeholder="全部" />
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="生效时间">
                        <el-date-picker v-model="timeArr" type="daterange" :value-format="'YYYY-MM-DD'" @change="search"
                            range-separator="至" start-placeholder="开始" end-placeholder="结束" />
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
import type { BannerParam } from '@/api/model/homeBanner';
import { ref } from 'vue';
import { ArrowDown, ArrowUp } from '@/components/icons';
const emit = defineEmits<{
    (e: 'search', where?: BannerParam): void;
}>();

/** 表单数据 */
const [form, resetFields] = useFormData<BannerParam>({
    name: '',
    navId: undefined,
    status: undefined,
    pushRange: undefined,
    startDate: '',
    endDate: '',
});
/** 搜索表单是否展开 */
const searchExpand = ref(false);
let timeArr = ref<[string, string]>(['', '']);
/** 搜索展开/收起 */
const toggleExpand = () => {
    searchExpand.value = !searchExpand.value;
};
/** 搜索 */
const search = () => {
    const [startDate, endDate] = timeArr.value || [];
    emit('search', { ...form, startDate, endDate, });
};

/**  重置 */
const reset = () => {
    resetFields();
    timeArr.value = ['', ''];
    search();
};
const searchParams = () => {
  const [startDate, endDate] = timeArr.value || [];
  return { ...form, startDate, endDate };
};
defineExpose({
  searchParams,
  search
});
</script>
