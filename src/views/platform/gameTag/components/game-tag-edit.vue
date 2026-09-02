<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="880" v-model="visible"
        :title="isUpdate ? t('platform.gameTag.editTag') : t('platform.gameTag.addTag')" @open="handleOpen">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="130px" @submit.prevent="">
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                    <el-form-item label="id" prop="tagId">
                        <el-input-number v-model="form.tagId" :min="0" :max='999' :placeholder="t('common.pleaseInput')"
                            style="width:100%" :controls="false" />
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item :label="t('platform.gameTag.tagName')" prop="tagName">
                        <el-input clearable :maxlength="50" v-model="form.tagName"
                            :placeholder="t('common.pleaseInput')" />
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                    <el-form-item :label="t('platform.gameTag.gameGroup')" prop="gameGroup">
                        <dict-data code="gameGroup" v-model="form.gameGroup" valueType="number"
                            :placeholder="t('common.pleaseSelect')" />
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item :label="t('platform.gameTag.sortNumber')" prop="sortNumber">
                        <el-input-number style="width:100%" :controls="false" v-model="form.sortNumber" :min="0"
                            :placeholder="t('common.pleaseInput')" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                    <el-form-item :label="t('platform.gameTag.rowNum')" prop="rowNum">
                        <el-input-number style="width:100%" :controls="false" v-model="form.rowNum" :min="0" :max="1"
                            :placeholder="t('common.pleaseInput')" />
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item :label="t('platform.gameTag.colNum')" prop="colNum">
                        <el-input-number style="width:100%" :controls="false" v-model="form.colNum" :min="0" :max="10"
                            :placeholder="t('common.pleaseInput')" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                    <el-form-item :label="t('platform.gameTag.state')" prop="state">
                        <el-radio-group v-model="form.state" :placeholder="t('common.pleaseSelect')">
                            <el-radio :value="1">{{ t('action.open') }}</el-radio>
                            <el-radio :value="0">{{ t('action.close') }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item :label="t('platform.gameTag.realRate')" prop="realRate">
                        <el-input-number style="width:100%" :controls="false" v-model="form.realRate" :min="0"
                            :max="100" :placeholder="t('common.pleaseInput')" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                    <el-form-item :label="t('platform.gameTag.betaRates')" prop="betaRatesStr">
                        <el-input clearable :maxlength="50" v-model="form.betaRatesStr"
                            :placeholder="t('common.pleaseInput')" />
                        <div class="tips">{{ t('platform.gameTag.tips') }}</div>
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item :label="t('platform.gameTag.baseRates')" prop="baseRatesStr">
                        <el-input clearable :maxlength="50" v-model="form.baseRatesStr"
                            :placeholder="t('common.pleaseInput')" />
                        <div class="tips">{{ t('platform.gameTag.tips') }}</div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <el-button @click="handleCancel">{{ t('action.cancel') }}</el-button>
            <el-button type="primary" :loading="loading" @click="save">
                {{ t('action.save') }}
            </el-button>
        </template>
    </ele-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { EleMessage } from "ele-admin-plus/es";
import { useFormData } from "@/utils/use-form-data";
import { addGameTag, updateGameTag } from "@/api/platform/gameTagApi";
import type { GameTag } from "@/api/platform/model/gameTag";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const props = defineProps<{
    /** 修改回显的数据 */
    data?: GameTag | null;
}>();

const emit = defineEmits<{
    (e: "done"): void;
}>();

/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });

/** 是否是修改 */
const isUpdate = ref(false);

/** 提交状态 */
const loading = ref(false);

/** 表单实例 */
const formRef = ref<FormInstance | null>(null);

/** 表单数据 */
const [form, resetFields, assignFields] = useFormData<GameTag>({
    tagId: undefined,
    tagName: undefined,
    gameGroup: undefined,
    sortNumber: undefined,
    colNum: undefined,
    rowNum: undefined,
    state: 1,
    realRate: undefined,
    betaRates: [],
    betaRatesStr: '[]',
    baseRatesStr: '[]',
    baseRates: []
});

/** 表单验证规则 */
const rules = reactive<FormRules>({
    tagName: [
        {
            required: true,
            type: 'string',
            message: t('common.pleaseInput', [t('platform.gameTag.tagName')]),
            trigger: 'blur'
        }
    ],
    gameGroup: [
        {
            required: true,
            type: 'number',
            message: t('common.pleaseInput', [t('platform.gameTag.gameGroup')]),
            trigger: 'blur'
        }
    ],
    sortNumber: [
        {
            required: true,
            type: 'number',
            message: t('common.pleaseInput', [t('platform.gameTag.sortNumber')]),
            trigger: 'blur'
        }
    ],
    realRate: [
        {
            required: true,
            type: 'number',
            message: t('common.pleaseInput', [t('platform.gameTag.realRate')]),
            trigger: 'blur'
        }
    ],
    betaRates: [
        {
            required: true,
            type: 'number',
            message: t('common.pleaseInput', [t('platform.gameTag.betaRates')]),
            trigger: 'blur'
        }
    ],
    baseRates: [
        {
            required: true,
            type: 'number',
            message: t('common.pleaseInput', [t('platform.gameTag.baseRates')]),
            trigger: 'blur'
        }
    ]
});

/** 关闭弹窗 */
const handleCancel = () => {
    visible.value = false;
};

/** 保存编辑 */
const save = () => {
    formRef.value?.validate?.((valid) => {
        if (!valid) {
            return;
        }
        loading.value = true;
        form.betaRates = JSON.parse(form.betaRatesStr || '[]');
        form.baseRates = JSON.parse(form.baseRatesStr || '[]');
        // const saveOrUpdate = isUpdate.value ? updateGameTag : addGameTag;;
        updateGameTag(form)
            .then((msg) => {
                loading.value = false;
                EleMessage.success(msg);
                handleCancel();
                emit("done");
            })
            .catch((e) => {
                loading.value = false;
                EleMessage.error(e.message);
            });
    });
};

/** 弹窗打开事件 */
const handleOpen = () => {
    if (props.data) {
        assignFields({ ...props.data });
        form.betaRatesStr = JSON.stringify(props.data.betaRates);
        form.baseRatesStr = JSON.stringify(props.data.baseRates);
        isUpdate.value = true;
    } else {
        resetFields();
        isUpdate.value = false;
    }
    nextTick(() => {
        nextTick(() => {
            formRef.value?.clearValidate?.();
        });
    });
};
</script>
