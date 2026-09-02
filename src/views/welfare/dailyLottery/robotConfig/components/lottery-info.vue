<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="1024" v-model="visible" :title="'用戶信息'" @open="handleOpen">
        <el-descriptions v-if="form" :border="true" :column="mobile ? 2 : 4" class="detail-table">
            <el-descriptions-item label="用户ID">
                <div>{{ form.uid }}</div>
            </el-descriptions-item>
            <el-descriptions-item label="期数">
                <div> {{ form.issue }}</div>
            </el-descriptions-item>
            <el-descriptions-item label="玩法类型">
                <dict-data code="play_type" valueType="string" type="tag" v-model="form.play_type" />
            </el-descriptions-item>

            <el-descriptions-item label="直选号码" :span="2">
                <div>{{ form.hundreds }}-{{ form.tens }}-{{ form.units }}</div>
            </el-descriptions-item>
            <el-descriptions-item label="组选号码">
                <div>{{ form.group_numbers }}</div>
            </el-descriptions-item>
            <el-descriptions-item label="每注金额">
                <div>{{ form.bet_gold }}</div>
            </el-descriptions-item>
            <el-descriptions-item label="注数">
                <div>{{ form.bet_num }}</div>
            </el-descriptions-item>
            <el-descriptions-item label="倍数">
                <div>{{ form.mul }}</div>
            </el-descriptions-item>
            <el-descriptions-item label="状态">
                <div>{{ form.state }}</div>
            </el-descriptions-item>
            <el-descriptions-item label="购买金币">
                <div>{{ form.buy_gold }}</div>
            </el-descriptions-item>
            <el-descriptions-item label="中奖金币">
                <div>{{ form.gold }}</div>
            </el-descriptions-item>
            <el-descriptions-item label="中奖次数">
                <div>{{ form.award_num }}</div>
            </el-descriptions-item>
            <el-descriptions-item label="赔付倍数">
                <div>{{ form.pay_mul }}</div>
            </el-descriptions-item>
            <el-descriptions-item label="创建时间">
                <div>{{ form.create_time }}</div>
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
import type { Lottery } from "@/api/lottery/model/index";
import { useMobile } from '@/utils/use-mobile';
// import { EleMessage } from 'ele-admin-plus';

const props = defineProps<{
    /** 修改回显的数据 */
    data: Lottery | null;
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
const [form, resetFields, assignFields] = useFormData<Lottery>({
    uid: 0,
    play_type: undefined,
    bet_num: undefined,
    gold: undefined,
    award_num: undefined,
    mul: undefined,
    state: undefined,
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