<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="1024" v-model="visible" :title="'排行信息'" @open="handleOpen">
        <el-descriptions v-if="form" :border="true" :column="mobile ? 1 : 3" class="detail-table">
            <el-descriptions-item label="用户ID">
                <div>{{ form.uid }}</div>
            </el-descriptions-item>
            <el-descriptions-item label="用户名">
                <div>{{ form.username }}</div>
            </el-descriptions-item>
            <el-descriptions-item label="游戏ID">
                <div>{{ form.gameId }}</div>
            </el-descriptions-item>
            <el-descriptions-item label="游戏名称">
                <div>{{ form.gameName }}</div>
            </el-descriptions-item>
            <el-descriptions-item label="期数">
                <div> {{ form.periods }}</div>
            </el-descriptions-item>
            <el-descriptions-item label="排名">
                <div>{{ form.ranking }}</div>
            </el-descriptions-item>
            <el-descriptions-item label="userFlag">
                <div>{{ form.userFlag?'机器人' : '真人' }}</div>
            </el-descriptions-item>
            <el-descriptions-item label="倍率">
                <div>{{ form.muti }}</div>
            </el-descriptions-item>
            <el-descriptions-item label="下注">
                <div>{{ form.totalBet }}</div>
            </el-descriptions-item>
            <el-descriptions-item label="赢取">
                <div>{{ form.totalWin }}</div>
            </el-descriptions-item>
            <el-descriptions-item label="更新时间">
                <div>{{ form.updateTime }}</div>
            </el-descriptions-item>
        </el-descriptions>

        <template #footer>
            <el-button :loading="loading" @click="handleCancel"> 取消</el-button>
        </template>
    </ele-modal>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { useFormData } from '@/utils/use-form-data';
// import { getUser } from '@/api/user/userApi';
import type { ChampionRecords } from "@/api/welfare/model/index";
import { useMobile } from '@/utils/use-mobile';
// import { EleMessage } from 'ele-admin-plus';

const props = defineProps<{
    /** 修改回显的数据 */
    data: ChampionRecords | null;
}>();

const emit = defineEmits<{
    (e: 'done'): void;
}>();
/** 是否是移动端 */
const { mobile } = useMobile();

/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });

/** 是否是修改 */
const isUpdate = ref(false);

/** 提交状态 */
const loading = ref(false);

/** 表单实例 */
const formRef = ref<FormInstance | null>(null);

/** 表单数据 */
const [form, resetFields, assignFields] = useFormData<ChampionRecords>({
    uid: 0,
    periods: 0,
    username: undefined,
    gameId: 0,
    gameName: undefined,
    ranking: 0,
    userFlag: undefined,
    muti: 0,
    totalBet: undefined,
    totalWin: undefined,
    updateTime: undefined,
});
/** 关闭弹窗 */
const handleCancel = () => {
    visible.value = false;
};

/** 弹窗打开事件 */
const handleOpen = () => {
    if (props.data) {
        // getUser(props.uid)
        //     .then((data) => {
        assignFields(props.data);
        //     })
        //     .catch((e) => {
        //         EleMessage.error(e.message);
        //     });

        // assignFields({ ...props.data });
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
<style lang="scss" scoped>
.detail-table :deep(.el-descriptions__label) {
    width: 120px;
    text-align: right;
    font-weight: normal;
}

.detail-table :deep(.el-descriptions__content > div) {
    max-height: 100%;
}
</style>