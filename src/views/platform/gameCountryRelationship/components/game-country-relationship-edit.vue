<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="880" v-model="visible" :title="isUpdate ? '修改国家与游戏关系配置表' : '新建国家与游戏关系配置表'"
        @open="handleOpen">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent="">
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                    <el-form-item label="国家" prop="countryCode">
                        <el-select v-model="form.countryCode" placeholder="请选择" style="width: 100%;" :disabled="isUpdate">
                            <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="游戏ID" prop="gameId">
                        <el-input-number v-model="form.gameId" :min="0" placeholder="请输入" :controls="false"  :disabled="isUpdate"
                            style="width: 100%;" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                    <el-form-item label="名称" prop="name">
                        <el-input clearable :maxlength="50" v-model="form.name" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="排序" prop="sortNumber">
                        <el-input-number v-model="form.sortNumber" :min="0" placeholder="请输入" :controls="false"
                            style="width: 100%;" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <!-- <el-col :sm="12" :xs="12">
                    <el-form-item label="是否新游戏" prop="hasNew">
                        <el-radio-group v-model="form.hasNew" style="display: inline-block;">
                            <el-radio :value="true">是</el-radio>
                            <el-radio :value="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col> -->
                <!-- <el-col :sm="12" :xs="12">
                    <el-form-item label="是否火热" prop="hot">
                        <el-radio-group v-model="form.hot" style="display: inline-block;">
                            <el-radio :value="true">是</el-radio>
                            <el-radio :value="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col> -->

            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                    <el-form-item label="状态" prop="state">
                        <dict-data code="gameConfState" v-model="form.state" valueType="number" type="select"
                            placeholder="请选择状态" />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" :loading="loading" @click="save">
                保存
            </el-button>
        </template>
    </ele-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { EleMessage } from "ele-admin-plus/es";
import { useFormData } from "@/utils/use-form-data";
import { addGameCountryRelationship, updateGameCountryRelationship } from "@/api/platform/gameCountryRelationshipApi";
import type { GameCountryRelationship } from "@/api/platform/model/gameCountryRelationship";
import { useConfigStore } from "@/store/modules/config"; // 导入store
// 初始化store
const configStore = useConfigStore();
const props = defineProps<{
    /** 修改回显的数据 */
    data?: GameCountryRelationship | null;
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
const [form, resetFields, assignFields] = useFormData<GameCountryRelationship>({
    id: undefined,
    countryCode: undefined,
    gameId: undefined,
    name: '',
    hot: 0,
    hasNew: 0,
    sortNumber: undefined,
    state: undefined,
});

/** 表单验证规则 */
const rules = reactive<FormRules>({
    countryCode: [
        {
            required: true,
            type: 'number',
            message: '请选择国家',
            trigger: 'blur'
        }
    ],
    gameId: [
        {
            required: true,
            type: 'number',
            message: '请输入游戏ID',
            trigger: 'blur'
        }
    ],
    name: [
        {
            required: true,
            type: 'string',
            message: '请输入名称',
            trigger: 'blur'
        }
    ],
    hot: [
        {
            required: true,
            type: 'boolean',
            message: '请选择是否火热',
            trigger: 'blur'
        }
    ],
    hasNew: [
        {
            required: true,
            type: 'boolean',
            message: '请选择是否新游戏',
            trigger: 'blur'
        }
    ],
    sortNumber: [
        {
            required: true,
            type: 'number',
            message: '请输入排序',
            trigger: 'blur'
        }
    ],
    state: [
        {
            required: true,
            type: 'number',
            message: '请选择状态',
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
        const saveOrUpdate = isUpdate.value ? updateGameCountryRelationship : addGameCountryRelationship;;
        saveOrUpdate(form)
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


