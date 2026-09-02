<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="680" v-model="visible" :title="isUpdate ? '修改机器人配置' : '新增机器人配置'" @open="handleOpen">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="175px" @submit.prevent="">
            <el-row :gutter="16">
                <!-- <el-col :sm="24" :xs="24">
                    <el-form-item label="中奖用户数量下限" prop="numDowm">
                        <el-input-number clearable placeholder="请输入中奖用户数量下限" :controls="false" v-model="form.numDowm"
                            style="width: 100%;" />
                    </el-form-item>
                </el-col> -->
                <el-col :sm="24" :xs="24">
                    <el-form-item label="中奖机器范围" prop="personRobotRangeStr">
                        <el-input clearable placeholder="请输入中奖机器范围" v-model="form.personRobotRangeStr" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :xs="24">
                    <el-form-item label="最少中奖人数" prop="minPeron">
                        <el-input-number :controls="false" clearable placeholder="请输入最少中奖人数" :min="0"
                            v-model="form.minPeron" style="width: 100%;" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :xs="24">
                    <el-form-item label="最多中奖人数" prop="maxPerson">
                        <el-input-number :controls="false" clearable placeholder="请输入最多中奖人数" :min="0"
                            v-model="form.maxPerson" style="width: 100%;" />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" :loading="loading" @click="save"> 发送 </el-button>
        </template>
    </ele-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { EleMessage } from 'ele-admin-plus/es';
import { useFormData } from '@/utils/use-form-data';
import { updateRobot, addRobot } from '@/api/welfare/dailyLottery';
import type { Robot, RobotParam } from "@/api/welfare/model/index";
const props = defineProps<{
    /** 修改回显的数据 */
    data?: Robot | null;
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
const [form, resetFields, assignFields] = useFormData<Robot>({
    id: undefined,
    minPeron: undefined,
    maxPerson: undefined,
    // personUserRangeStr: '[]',
    // personUserRange: [],
    personRobotRange: [],
    personRobotRangeStr: '[]',
});
/** 表单验证规则 */
const rules = reactive<FormRules>({
    personUserRange: [
        {
            required: true,
            type: 'string',
            message: '请输入中奖机器范围',
            trigger: 'blur'
        }
    ],
    maxPerson: [
        {
            required: true,
            type: 'number',
            message: '请输入最多中奖人数',
            trigger: 'blur'
        },
        {
            validator: (rule: any, value: number, callback: (error?: string) => void) => {
                const minPeronValue = form.minPeron; // 假设表单数据存储在 form.value 中
                if (minPeronValue && value <= minPeronValue) {
                    callback('最多中奖人数必须大于最少中奖人数');
                } else {
                    callback();
                }
            },
            trigger: 'change'
        }
    ],
    minPeron: [
        {
            required: true,
            type: 'number',
            message: '请输入最少中奖人数',
            trigger: 'blur'
        },
        {
            validator: (rule: any, value: number, callback: (error?: string) => void) => {
                const maxPersonValue = form.maxPerson; // 假设表单数据存储在 form.value 中
                if (maxPersonValue && value >= maxPersonValue) {
                    callback('最少中奖人数必须小于最多中奖人数');
                } else {
                    callback();
                }
            },
            trigger: 'change'
        }
    ],
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
        // form.personUserRange = JSON.parse(form.personUserRangeStr || '[]');
        form.personRobotRange = JSON.parse(form.personRobotRangeStr || '[]');
        loading.value = true;
        const saveOrUpdate = isUpdate.value ? updateRobot : addRobot;
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
        // form.personUserRangeStr = JSON.stringify(props.data.personUserRange);
        form.personRobotRangeStr = JSON.stringify(props.data.personRobotRange);
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