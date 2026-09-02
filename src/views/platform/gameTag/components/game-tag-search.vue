<!-- 搜索表单 -->
<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <!-- <el-col   :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="id">
                        <el-input  clearable  v-model.trim="form.tagId"  placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item :label="t('platform.gameTag.tagName')">
                        <el-input clearable v-model.trim="form.tagName" :placeholder="t('common.pleaseInput')" />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item :label="t('platform.gameTag.gameGroup')">
                        <dict-data code="gameGroup" v-model="form.gameGroup" valueType="number"  @change="search"/>
                    </el-form-item>
                </el-col>
                <el-col  :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item :label="t('platform.gameTag.state')">
                        <el-input clearable v-model.trim="form.state" :placeholder="t('common.pleaseInput')" />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label-width="16px">
                        <el-button type="primary" @click="search">{{ t('action.search') }}</el-button>
                        <el-button @click="reset">{{ t('action.reset') }}</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </ele-card>
</template>

<script lang="ts" setup>
import { useFormData } from '@/utils/use-form-data';
import type { GameTagParam } from '@/api/platform/model/gameTag';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const emit = defineEmits<{
    (e: 'search', where?: GameTagParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<GameTagParam>({
    tagId: undefined,
    tagName: "",
    gameGroup: undefined,
    sortNumber: undefined,
    state: undefined,
    realRate: undefined,
    betaRates: undefined,
    baseRates: undefined
});
/** 搜索 */
const search = () => {
    emit('search', { ...form });
};

/**  重置 */
const reset = () => {
    resetFields();
    search();
};
</script>
<style lang="scss">
.tips {
    color: red;
}
</style>