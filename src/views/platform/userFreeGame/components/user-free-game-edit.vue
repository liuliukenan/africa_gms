<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="880" v-model="visible" :title="isUpdate ? '修改用户免费游戏' : '新建用户免费游戏'" @open="handleOpen">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" @submit.prevent="">
            <el-row :gutter="16">
                <el-col :sm="24" :xs="24">
                    <el-form-item label="用户ID" prop="uid">
                        <el-input-number style="width: 100%;" :controls="false" clearable v-model="form.uid" :min="0"
                            placeholder="请输入" />
                    </el-form-item>
                </el-col>
                 <el-col :sm="24" :xs="24">
                    <el-form-item label="游戏模板" prop="freeGameConfId">
                        <TableSelect v-model="form.freeGameConfId" @select-row="selectRow" />
                    </el-form-item>
                </el-col>
                <!--<el-col :sm="12" :xs="12">
                    <el-form-item label="触发类型" name="triggerSpinType">
                         <el-select style="width: 100%;" clearable v-model="form.triggerSpinType" placeholder="请选择"
                          >
                            <el-option label="免费次数" :value="1" />
                            <el-option label="免费游戏" :value="2" />
                        </el-select>
                    </el-form-item>
                </el-col>
               <el-col :sm="12" :xs="12">
                    <el-form-item label="模板类型" name="freeGameConfId">
                        <el-input-number style="width: 100%;" :controls="false" clearable v-model="form.freeGameConfId"
                            :min="0" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="名称" name="name">
                        <el-input-number style="width: 100%;" :controls="false" clearable v-model="form.name" :min="0"
                            placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="游戏ID" name="gameId">
                        <el-input-number style="width: 100%;" :controls="false" clearable v-model="form.gameId" :min="0"
                            placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="下注金额" name="betAmount">
                        <el-input-number style="width: 100%;" :controls="false" clearable v-model="form.betAmount"
                            :min="0" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="下注索引" name="base">
                        <el-input-number style="width: 100%;" :controls="false" clearable v-model="form.base" :min="0"
                            placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="level" name="level">
                        <el-input-number style="width: 100%;" :controls="false" clearable v-model="form.level" :min="0"
                            placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="总次数" name="totalSpins">
                        <el-input-number style="width: 100%;" :controls="false" clearable v-model="form.totalSpins"
                            :min="0" placeholder="请输入" />
                    </el-form-item>
                </el-col>
           
                <el-col :sm="12" :xs="12">
                    <el-form-item label="流水倍数" name="flowMutl">
                        <el-input-number style="width: 100%;" :controls="false" clearable v-model="form.flowMutl"
                            :min="0" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="已用已次" name="usedSpins">
                        <el-input-number style="width: 100%;" :controls="false" clearable v-model="form.usedSpins"
                            :min="0" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="钱包模板" name="exampleId">
                        <el-input-number style="width: 100%;" :controls="false" clearable v-model="form.exampleId"
                            :min="0" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="有效结束时间" name="expireTime">
                        <el-input clearable :maxlength="50" v-model="form.expireTime" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="状态" name="status">
                        <el-select style="width: 100%;" clearable v-model="form.status" placeholder="请选择">
                            <el-option label="pending" value="pending" />
                            <el-option label="in_progress" value="in_progress" />
                            <el-option label="completed" value="completed" />
                            <el-option label="expired" value="expired" />
                            <el-option label="forfeited" value="forfeited" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="累积赢取" name="totalWin">
                        <el-input-number style="width: 100%;" :controls="false" clearable v-model="form.totalWin"
                            :min="0" placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
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
import { addUserFreeGame, updateUserFreeGame } from "@/api/platform/userFreeGameApi";
import type { UserFreeGame } from "@/api/platform/model/userFreeGame";
// import WalletSelect from "@/components/WallteSelect/index.vue";
import TableSelect from "./table-select.vue";

const props = defineProps<{
    /** 修改回显的数据 */
    data?: UserFreeGame | null;
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
const [form, resetFields, assignFields] = useFormData<UserFreeGame>({
    id: undefined,
    uid: undefined,
    triggerSpinType: undefined,
    freeGameConfId: undefined,
    name: undefined,
    gameId: undefined,
    betAmount: undefined,
    base: undefined,
    level: undefined,
    totalSpins: undefined,
    flowMutl: undefined,
    usedSpins: undefined,
    exampleId: undefined,
    expireTime: undefined,
    status: undefined,
    totalWin: undefined,
});

/** 表单验证规则 */
const rules = reactive<FormRules>({
    id: [
        {
            required: true,
            type: 'number',
            message: '请输入id',
            trigger: 'blur'
        }
    ],
    uid: [
        {
            required: true,
            type: 'number',
            message: '请输入uid',
            trigger: 'blur'
        }
    ],
    triggerSpinType: [
        {
            required: true,
            type: 'number',
            message: '请输入触发类型',
            trigger: 'blur'
        }
    ],
    freeGameConfId: [
        {
            required: true,
            type: 'number',
            message: '请输入模板类型',
            trigger: 'blur'
        }
    ],
    name: [
        {
            required: true,
            type: 'number',
            message: '请输入名称',
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
    betAmount: [
        {
            required: true,
            type: 'number',
            message: '请输入下注金额',
            trigger: 'blur'
        }
    ],
    base: [
        {
            required: true,
            type: 'number',
            message: '请输入下注索引',
            trigger: 'blur'
        }
    ],
    level: [
        {
            required: true,
            type: 'number',
            message: '请输入level',
            trigger: 'blur'
        }
    ],
    totalSpins: [
        {
            required: true,
            type: 'number',
            message: '请输入总次数',
            trigger: 'blur'
        }
    ],
    flowMutl: [
        {
            required: true,
            type: 'number',
            message: '请输入流水倍数',
            trigger: 'blur'
        }
    ],
    usedSpins: [
        {
            required: true,
            type: 'number',
            message: '请输入已用已次',
            trigger: 'blur'
        }
    ],
    exampleId: [
        {
            required: true,
            type: 'number',
            message: '请输入钱包模板',
            trigger: 'blur'
        }
    ],
    expireTime: [
        {
            required: true,
            type: 'number',
            message: '请输入有效结束时间',
            trigger: 'blur'
        }
    ],
    status: [
        {
            required: true,
            type: 'number',
            message: '请输入状态pending / in_progress / completed / expired / forfeited',
            trigger: 'blur'
        }
    ],
    totalWin: [
        {
            required: true,
            type: 'number',
            message: '请输入累积赢取',
            trigger: 'blur'
        }
    ]
});

/** 关闭弹窗 */
const handleCancel = () => {
    visible.value = false;
};
const selectRow = (row: any) => {
    form.freeGameConfId = row.id;
};
/** 保存编辑 */
const save = () => {
    formRef.value?.validate?.((valid) => {
        if (!valid) {
            return;
        }
        loading.value = true;
        const saveOrUpdate = isUpdate.value ? updateUserFreeGame : addUserFreeGame;;
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
