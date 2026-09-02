<template>
    <ele-page>
        <el-form ref="formRef" :model="form" :rules="rules" label-width="150px">
            <div style="display: flex;justify-content: space-between;">
                <div style="font-weight: bold;font-size: 18px;">礼包基础配置</div>
                <el-popconfirm title="确认发送到服务器吗？" @confirm="sendServer()">
                    <template #reference>
                        <el-button type="danger" class="ele-btn-icon">
                            <span>发送</span>
                        </el-button>
                    </template>
                </el-popconfirm>
            </div>
            <!-- <el-row :gutter="16"> -->
            <!-- <el-row :gutter="16">
                <el-col :md="12" :sm="24" :xs="24">
                    <el-form-item label="活动开启:" prop="open">
                        <el-radio-group v-model="form.open" size="large">
                            <el-radio :value="true">开</el-radio>
                            <el-radio :value="false">关</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row> -->
            <el-col :md="12" :sm="24" :xs="24">
                <el-form-item label="发放金额:" prop="amount">
                    <el-input-number clearable :controls="false" size="large" :min="1" placeholder="请输入发放金额"
                        v-model.trim="form.amount" style="width: 100%" />
                </el-form-item>
            </el-col>
            <el-col :md="12" :sm="24" :xs="24">
                <el-form-item label="流水倍数:" prop="flowMutl">
                    <el-input-number clearable :controls="false" size="large" placeholder="请输入流水倍数"
                        v-model.trim="form.flowMutl" style="width: 100%" />
                </el-form-item>
            </el-col>
            <!-- </el-row> -->

            <el-row style="margin: 20px;">
                <el-button type="primary" :loading="loading" @click="save"> 保存 </el-button>
            </el-row>
        </el-form>


    </ele-page>
</template>

<script setup lang="ts">
import { assignObject, EleMessage } from 'ele-admin-plus';
import { ElForm, FormRules } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import { getUserGift, saveUserGift } from '@/api/welfare/userGiftRecordApi';
import { sendConfServer } from '@/api/conf';
import { UserGift } from '@/api/welfare/model/userGiftRecord';
const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const form = ref<UserGift>({
    jsonType: 'UserGiftConf',
    // open: true,
    amount: 0,
    flowMutl: 0,
});
/** 表单验证规则 */
const rules = reactive<FormRules>({

    amount: [
        {
            required: true,
            type: 'number',
            message: '请输入金额',
            trigger: 'blur'
        }
    ]
});
/** 提交状态 */
const loading = ref(false);
// 获取基础配置信息
const getInfo = () => {
    getUserGift().then((res) => {
        if (res) {
            form.value = assignObject(form.value, res);
            form.value.jsonType = 'UserGiftConf';
        }

    });
};

onMounted(() => {
    getInfo();
});
/** 保存编辑 */
const save = () => {
    formRef.value?.validate?.((valid) => {
        if (!valid) {
            return;
        }
        const loading = EleMessage.loading({
            message: '请求中..',
            plain: true
        });
        saveUserGift(form.value)
            .then((msg) => {
                loading.close();
                EleMessage.success(msg);
                getInfo();
            })
            .catch((e) => {
                loading.close();
                EleMessage.error(e.message);
            });
    });
};
// 发送到服务器
const sendServer = () => {
    const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
    });
    sendConfServer(29)
        .then((msg) => {
            loading.close();
            EleMessage.success(msg);
        })
        .catch((e) => {
            loading.close();
            EleMessage.error(e.message);
        });
};
</script>

<style scoped lang="scss">
::v-deep .tips .el-form-item__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap
}
</style>
