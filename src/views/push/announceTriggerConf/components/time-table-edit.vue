<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="680" v-model="visible" :title="isUpdate ? '修改' : '新建'" @open="handleOpen">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="150px" @submit.prevent="">
            <el-row :gutter="16">
                <el-col :sm="24" :xs="24">
                    <el-form-item label="名称" prop="name">
                        <el-input style="width: 100%;" clearable v-model="form.name" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :xs="24">
                    <el-form-item label="时间:" prop="timeArr">
                        <el-time-picker v-model="timeArr" is-range value-format="HH:mm:ss" format="HH:mm:ss"
                            range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 100%" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :xs="24">
                    <el-form-item label="间隔最小秒数" prop="minIntervalSeconds">
                        <el-input-number style="width: 100%;" :controls="false" clearable
                            v-model="form.minIntervalSeconds" :min="0" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :xs="24">
                    <el-form-item label="间隔最大秒数" prop="maxIntervalSeconds">
                        <el-input-number style="width: 100%;" :controls="false" clearable
                            v-model="form.maxIntervalSeconds" :min="0" placeholder="请输入" />
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
import { addAnnounceTriggerConf, saveAnnounceSwitchConf, updateAnnounceTriggerConf, } from "@/api/push/announceTriggerConfApi";
import type { AnnounceTriggerConf } from "@/api/push/model/announceTriggerConf";

const props = defineProps<{
    /** 修改回显的数据 */
    data?: any | null;
    /** 父组件完整表单，保存时提交整个 form */
    form?: any;
}>();

const emit = defineEmits<{
    (e: "done"): void;
}>();
// 日期范围
const timeArr = ref<[string, string]>(['', '']);
/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });

/** 是否是修改 */
const isUpdate = ref(false);

/** 提交状态 */
const loading = ref(false);

/** 表单实例 */
const formRef = ref<FormInstance | null>(null);

/** 表单数据 */
const [form, resetFields, assignFields] = useFormData<any>({
    id: undefined,
    name: undefined,
    startTime: undefined,
    endTime: undefined,
    minIntervalSeconds: undefined,
    maxIntervalSeconds: undefined,
});

/** 表单验证规则 */
const rules = reactive<FormRules>({

    triggerType: [
        {
            required: true,
            type: 'number',
            message: '请选择触发类型',
            trigger: 'blur'
        }
    ],
    minMultiplier: [
        {
            required: true,
            type: 'number',
            message: '请输入最低倍数',
            trigger: 'blur'
        }
    ],
    minWinAmount: [
        {
            required: true,
            type: 'number',
            message: '请输入最低赢得金额',
            trigger: 'blur'
        }
    ],
    minAmount: [
        {
            required: true,
            type: 'number',
            message: '请输入最低提款金额',
            trigger: 'blur'
        }
    ],
    minInviteReward: [
        {
            required: true,
            type: 'number',
            message: '请输入单次邀请奖励最低值',
            trigger: 'blur'
        }
    ],
    isRobot: [
        {
            required: true,
            type: 'number',
            message: '请输入是否机器人专属配置',
            trigger: 'blur'
        }
    ],
    maxMultiplier: [
        {
            required: true,
            type: 'number',
            message: '请输入倍数上限',
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
        const [startDate, endDate] = timeArr.value || [];
        loading.value = true;

        form.startTime = startDate;
        form.endTime = endDate;

        // 将当前行编辑数据同步回 props.form.robotTimeSlots
        if (!props.form.robotTimeSlots) {
            props.form.robotTimeSlots = [];
        }
        if (isUpdate.value) {
            // 修改：找到对应项并更新
            const idx = props.form.robotTimeSlots.findIndex((item: any) => item === props.data);
            if (idx !== -1) {
                Object.assign(props.form.robotTimeSlots[idx], { ...form });
            }
        } else {
            // 新建：追加到数组
            props.form.robotTimeSlots.push({ ...form });
        }

        // 提交父组件完整 form
        saveAnnounceSwitchConf(props.form)
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
        // 回填时间段
        timeArr.value = [props.data.startTime || '', props.data.endTime || ''];
    } else {
        resetFields();
        timeArr.value = ['', ''];
        isUpdate.value = false;
    }
    nextTick(() => {
        nextTick(() => {
            formRef.value?.clearValidate?.();
        });
    });
};
</script>
