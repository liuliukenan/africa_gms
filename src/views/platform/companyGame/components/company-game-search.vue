<!-- 搜索表单 -->
<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <!-- <el-col   :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="id">
                        <el-input  clearable  v-model.trim="form.id"  :placeholder="t('common.pleaseInput')" />
                    </el-form-item>
                </el-col> -->
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item :label="t('platform.companyGame.gameUid')">
                        <el-input clearable v-model.trim="form.gameUid" :placeholder="t('common.pleaseInput')" />
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item :label="t('platform.companyGame.gameName')">
                        <el-input clearable v-model.trim="form.gameName" :placeholder="t('common.pleaseInput')" />
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item :label="t('platform.companyGame.gameType')">
                        <!-- <el-input clearable v-model.trim="form.gameGroup" :placeholder="t('common.pleaseInput')" /> -->
                        <dict-data code="gameGroup" v-model="form.gameGroup" valueType="number" @change="search"/>
                    </el-form-item>
                </el-col>
                <!-- <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="语言">
                        <el-input  clearable  v-model.trim="form.lang"  :placeholder="t('common.pleaseInput')" />
                    </el-form-item>
                </el-col> -->
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item :label="t('platform.companyGame.status')">
                        <el-select v-model="form.status" :placeholder="t('common.pleaseSelect')" clearable @change="search">
                            <el-option label="是" :value="1"></el-option>
                            <el-option label="否" :value="0"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item :label="t('platform.companyGame.currency')">
                        <el-input clearable v-model.trim="form.currency" :placeholder="t('common.pleaseInput')" />
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item :label="t('platform.companyGame.companyId')">
                        <el-input clearable v-model.trim="form.companyId" :placeholder="t('common.pleaseInput')" />
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item :label="t('platform.companyGame.factoryCode')">
                        <el-input clearable v-model.trim="form.factoryCode" :placeholder="t('common.pleaseInput')" />
                    </el-form-item>
                </el-col>
                <!-- <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="原始信息">
                        <el-input  clearable  v-model.trim="form.jsonInfo"  :placeholder="t('common.pleaseInput')" />
                    </el-form-item>
                </el-col> -->
                <el-col :lg="8" :md="12" :sm="12" :xs="24">
                    <el-form-item label-width="16px">
                        <el-button type="primary" @click="search">{{t('action.search')}}</el-button>
                        <el-button @click="reset">{{t('action.reset')}}</el-button>
                        <el-link type="primary" :underline="false" @click="toggleExpand" style="margin-left: 12px">
                            <template v-if="searchExpand">
                                <span>{{t('action.collapse')}}</span>
                                <el-icon style="vertical-align: -1px">
                                    <ArrowUp />
                                </el-icon>
                            </template>
                            <template v-else>
                                <span>{{t('action.expand')}}</span>
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
import type { CompanyGameParam } from '@/api/platform/model/companyGame';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const emit = defineEmits<{
    (e: 'search', where?: CompanyGameParam): void;
}>();
/** 表单数据 */
const [form, resetFields] = useFormData<CompanyGameParam>({
    id: undefined,
    gameUid: undefined,
    gameName: undefined,
    gameGroup: undefined,
    lang: undefined,
    status: undefined,
    currency: undefined,
    companyId: undefined,
    factoryCode: undefined,
    jsonInfo: undefined
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
