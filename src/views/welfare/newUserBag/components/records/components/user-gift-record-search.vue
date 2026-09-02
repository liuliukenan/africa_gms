<!-- 搜索表单 -->
<template>
    <ele-page>
        <el-form @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="uid">
                        <el-input clearable v-model.trim="form.uid" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="手机号">
                        <el-input clearable v-model.trim="form.phone" placeholder="请输入" />
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
    </ele-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useFormData } from '@/utils/use-form-data';
import type { UserGiftRecordParam } from '@/api/welfare/model/userGiftRecord';

const emit = defineEmits<{
    (e: 'search', where?: UserGiftRecordParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<UserGiftRecordParam>({
    uid: undefined,
    phone: "",
    amount: undefined,
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

const searchParams = () => {
//   const [startDate, endDate] = dateRange.value || [];
  return { ...form };
};
defineExpose({
  searchParams,
  search
});
</script>
