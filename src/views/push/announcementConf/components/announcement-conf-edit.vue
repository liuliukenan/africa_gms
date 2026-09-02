<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="880" v-model="visible" :title="isUpdate ? '修改跑马灯模板' : '新建跑马灯模板'" @open="handleOpen">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="110px" @submit.prevent="">
            <el-row :gutter="16">
                <!-- <el-col :sm="12" :xs="12">
                        <el-form-item label="" prop="id">
                             <el-input-number style="width: 100%;" :controls="false" clearable    v-model="form.id"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col> -->
                <el-col :sm="12" :xs="12">
                    <el-form-item label="keyid" prop="keyId">
                        <el-input-number style="width: 100%;" :controls="false" clearable v-model="form.keyId" :min="0"
                            placeholder="请输入" :disabled="isUpdate" />
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="名称" prop="name">
                        <el-input clearable :maxlength="50" v-model="form.name" placeholder="请输入" />
                    </el-form-item>
                </el-col>

                <el-col :sm="12" :xs="12">
                    <el-form-item label="跑马灯类型" prop="sourceType">
                        <dict-data code="announceType" v-model="form.sourceType" valueType="number"
                            placeholder="请选择跑马灯类型" @change="changeSourceType" style="width: 100%" />
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="随机抽取权重" prop="weight">
                        <el-input-number style="width: 100%;" :controls="false" clearable v-model="form.weight" :min="0"
                            placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12" v-if="![1, 2].includes(form.sourceType as number)">
                    <el-form-item label="跳转类型" prop="jumpType">
                        <dict-data code="actionType2" v-model="form.jumpType" valueType="number" placeholder="请选择跳转类型"
                            @change="changeType" :disabled="jumpTypeDisabled" style="width: 100%" />
                    </el-form-item>
                </el-col>

                <el-col :sm="12" :xs="12" v-if="![1, 2].includes(form.sourceType as number) && form.jumpType != 0">
                    <el-form-item :label="form.jumpType === 2 ? '游戏ID' : '跳转地址'"
                        :rules="form.jumpType === 2 ? [{ required: true, message: '请选择游戏ID', trigger: 'change' }] : [{ required: true, message: '请输入跳转地址', trigger: 'change' }]">
                        <el-input-number v-if="form.jumpType === 2" style="width: 100%;" :controls="false" clearable
                            v-model="form.jumpId" :min="0" placeholder="请输入" :disabled="jumpIdDisabled" />

                        <el-select v-else v-model="form.jumpId" placeholder="请选择" style="width: 100%"
                            :disabled="jumpIdDisabled">
                            <el-option v-for="item in jumpIdArr" :key="item.id" :label="item.jumpName"
                                :value="item.id" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :xs="24">
                    <el-form-item label="跑马灯内容">
                        <el-input clearable type="textarea" :rows="3" v-model="form.announcementContent"
                            placeholder="请输入" />
                    </el-form-item>
                </el-col>

                <el-col :sm="12" :xs="12">
                    <el-form-item label="状态" prop="state">
                        <el-switch v-model="form.state" :active-value="1" :inactive-value="0"
                            :active-text="form.state ? '开启' : '关闭'" />
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
import { ref, reactive, nextTick, computed } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { EleMessage } from "ele-admin-plus/es";
import { useFormData } from "@/utils/use-form-data";
import { addAnnouncementConf, updateAnnouncementConf } from "@/api/push/announcementConfApi";
import type { AnnouncementConf } from "@/api/push/model/announcementConf";
import { byTypeGetList, cascaderFaceShot } from "@/api/platform/faceShotApi";

const props = defineProps<{
    /** 修改回显的数据 */
    data?: AnnouncementConf | null;
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
const [form, resetFields, assignFields] = useFormData<AnnouncementConf>({
    keyId: undefined,
    name: undefined,
    sourceType: undefined,
    jumpType: undefined,
    jumpId: undefined,
    announcementContent: undefined,
    state: undefined,
    weight: undefined,
});

/** 表单验证规则 */
const rules = reactive<FormRules>({
    id: [
        {
            required: true,
            type: 'number',
            message: '请输入',
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
    sourceType: [
        {
            required: true,
            type: 'number',
            message: '请输入跑马灯类型',
            trigger: 'blur'
        }
    ],
    jumpType: [
        {
            required: true,
            type: 'number',
            message: '请输入跳转类型',
            trigger: 'blur'
        }
    ],
    jumpId: [
        {
            required: true,
            type: 'number',
            message: '请输入跳转ID/跳转功能',
            trigger: 'blur'
        }
    ],
    announcementContent: [
        {
            required: true,
            type: 'number',
            message: '请输入多语言跑马灯内容，{"EN":"...","SW":"..."}，支持占位符',
            trigger: 'blur'
        }
    ],
    state: [
        {
            required: true,
            type: 'number',
            message: '请输入状态',
            trigger: 'blur'
        }
    ],
    weight: [
        {
            required: true,
            type: 'number',
            message: '请输入随机抽取权重',
            trigger: 'blur'
        }
    ],
    keyId: [
        {
            required: true,
            type: 'number',
            message: '请输入keyid',
            trigger: 'blur'
        }
    ]
});
const homeUrlOptions = ref<any[]>([]);
const getCascaderData = async () => {
    let res = await cascaderFaceShot();
    if (res) homeUrlOptions.value = res;
};
// 跑马灯类型变更
const changeSourceType = (val: number | string) => {
    const numVal = Number(val);
    if (numVal === 1 || numVal === 2) {
        // 普通中奖/高级中奖 → 隐藏跳转类型和游戏ID
        form.jumpType = undefined;
        form.jumpId = undefined;
    } else if (numVal === 5) {
        // 推广活动 → 可选内部链接(3)或无动作(0)
        form.jumpType = undefined;
        form.jumpId = undefined;
    } else if (numVal === 6) {
        // 推广游戏 → 指定游戏(2)
        form.jumpType = 2;
        form.jumpId = undefined;
    } else {
        form.jumpType = undefined;
        form.jumpId = undefined;
    }
    nextTick(() => formRef.value?.clearValidate?.());
};

/** 跳转类型是否禁用：sourceType 为 1/2/6 时禁用 */
const jumpTypeDisabled = computed(() => {
    return [1, 2, 6].includes(form.sourceType as number);
});

/** jumpId是否禁用：sourceType 为 1/2 时禁用 */
const jumpIdDisabled = computed(() => {
    return [1, 2].includes(form.sourceType as number);
});
// 跳转类型变更
const changeType = (val: number | string) => {
    const numVal = Number(val);
    // 推广活动(5)只允许选内部链接(3)或无动作(0)
    if (form.sourceType === 5 && numVal !== 3 && numVal !== 0) {
        EleMessage.warning('只能选"内部链接"或"无动作"');
        form.jumpType = undefined;
        form.jumpId = undefined;
        return;
    }
    form.jumpId = undefined;
    nextTick(() => formRef.value?.clearValidate?.());
    if (numVal === 3 || numVal === 4) {
        getList(numVal);
    }
};
const jumpIdArr = ref<any[]>([]);
// 根据内联，外联类型获取列表
const getList = (val: any) => {
    byTypeGetList(val).then((res) => {
        console.log(res);
        jumpIdArr.value = res;

    });
};
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
        let params = { ...form, announcementContent: JSON.parse(form.announcementContent as string) } as any;
        const saveOrUpdate = isUpdate.value ? updateAnnouncementConf : addAnnouncementConf;;
        saveOrUpdate(params)
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
        form.announcementContent = JSON.stringify(form.announcementContent)
        isUpdate.value = true;
        // 回显时根据 jumpType 加载跳转地址下拉列表
        if (form.jumpType === 3 || form.jumpType === 4) {
            getList(form.jumpType);
        }
    } else {
        resetFields();
        isUpdate.value = false;
    }
    getCascaderData();
    nextTick(() => {
        nextTick(() => {
            formRef.value?.clearValidate?.();
        });
    });
};
</script>
