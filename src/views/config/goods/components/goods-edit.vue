<!-- 物品编辑弹窗 -->
<template>
    <ele-modal form :width="560" v-model="visible" :title="isUpdate ? '修改物品' : '新建物品'" @open="handleOpen">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent="">
            <el-row :gutter="16">
                <el-col :sm="24" :xs="24">
                    <el-form-item label="名称" prop="name">
                        <el-input clearable v-model="form.name" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :xs="24">
                    <el-form-item label="类型" prop="type">
                        <dict-data v-model="form.type" :code="'goods_type'"  value-type="number" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :xs="24">
                    <el-form-item label="钱包模板" prop="walletExampleId">
                        <WalletSelect v-model="form.walletExampleId" style="width: 100%;" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :xs="24">
                    <el-form-item label="免费游戏模板" prop="freeGameExampleId">
                        <FreeGameSelect v-model="form.freeGameExampleId" style="width: 100%;" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :xs="24">
                    <el-form-item label="排序编号" prop="sortNumber">
                        <el-input-number :controls="false" :min="0" clearable v-model="form.sortNumber"
                            placeholder="请输入" style="width: 100%;" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :xs="24">
                    <el-form-item label="状态" prop="state">
                        <el-radio-group v-model="form.state">
                            <el-radio label="1">启用</el-radio>
                            <el-radio label="0">停用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <!-- <el-col :sm="24" :xs="24">
                    <el-form-item label="描述" prop="description">
                        <el-input type="textarea" clearable v-model="form.description" placeholder="请输入" :rows="3" />
                    </el-form-item>
                </el-col> -->
            </el-row>
        </el-form>
        <template #footer>
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" :loading="loading" @click="save">保存</el-button>
        </template>
    </ele-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { EleMessage } from 'ele-admin-plus/es';
import { useFormData } from '@/utils/use-form-data';
import { addGoods, updateGoods } from '@/api/config/goodsApi';
import type { GoodsVO } from '@/api/config/model/goods';
import WalletSelect from '@/components/WallteSelect/index.vue';
import FreeGameSelect from '@/components/FreeGameSelect/index.vue';

const props = defineProps<{
    /** 修改回显的数据 */
    data?: GoodsVO | null;
}>();

const emit = defineEmits<{
    (e: 'done'): void;
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
const [form, resetFields, assignFields] = useFormData<GoodsVO>({
    id: undefined,
    type: undefined,
    walletExampleId: undefined,
    freeGameExampleId: undefined,
    sortNumber: undefined,
    state: '1',
    description: undefined,
    name: undefined,
});

/** 表单验证规则 */
const rules = reactive<FormRules>({
    type: [{ required: true, message: '请选择类型', trigger: 'change' }],
    state: [{ required: true, message: '请选择状态', trigger: 'change' }],
});

/** 关闭弹窗 */
const handleCancel = () => {
    visible.value = false;
};

/** 保存编辑 */
const save = () => {
    formRef.value?.validate?.((valid) => {
        if (!valid) return;
        loading.value = true;
        const saveOrUpdate = isUpdate.value ? updateGoods : addGoods;
        saveOrUpdate(form)
            .then((msg) => {
                loading.value = false;
                EleMessage.success(msg);
                handleCancel();
                emit('done');
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
        form.state = String(props.data.state);
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
