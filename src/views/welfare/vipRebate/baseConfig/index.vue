<template>
    <div>
        <!-- <template #header>
                <div class="card-header"
                    style="display: flex; width: 100%; justify-content: space-between; align-items: center">
                    <span style="font-weight: bold; font-size: 20px">流水返利基础配置</span>
                    <el-popconfirm title="确认发送到服务器吗？" @confirm="sendServer()">
                        <template #reference>
                            <el-button type="danger" size="large" class="ele-btn-icon"
                                v-permission="'config:thirdGame:send'">
                                <span>发送</span>
                            </el-button>
                        </template>
</el-popconfirm>
</div>
</template> -->
        <div style="display: flex;justify-content: space-between;">
            <div style="font-weight: bold;font-size: 18px;">基础配置</div>
            <el-popconfirm title="确认发送到服务器吗？" @confirm="sendServer()">
                <template #reference>
                    <el-button type="danger" class="ele-btn-icon">
                        <span>发送服务器</span>
                    </el-button>
                </template>
            </el-popconfirm>
        </div>
        <el-form ref="formRef" :model="form" :rules="rules" label-width="170px">
            <el-row :gutter="16">
                <el-col :md="12" :sm="24" :xs="24">
                    <el-form-item label="活动开启:" prop="open">
                        <el-radio-group v-model="form.open" size="large">
                            <el-radio :value="true">开</el-radio>
                            <el-radio :value="false">关</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :md="12" :sm="24" :xs="24">
                    <el-form-item label="返利流水:" prop="waterFlow">
                        <el-input-number clearable :controls="false" placeholder="请输入返利流水" :min="0"
                            v-model.trim="form.waterFlow" style="width: 100%" size="large" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :md="12" :sm="24" :xs="24">
                    <el-form-item label="上次发送时间:" prop="lastSendTime">
                        <el-input-number clearable :controls="false" placeholder="请输入上次发送时间" :min="0"
                                v-model.trim="form.lastSendTime" style="width: 100%" size="large" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :md="12" :sm="24" :xs="24">
                    <el-form-item label="发送时间:" prop="sendTime">
                        <el-time-picker v-model="form.sendTime" format="HH:mm" value-format="HH:mm:ss"
                            style="width: 100%" placeholder="请选择发送时间" size="large"
                            :disabled-seconds="disabledSeconds" />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div style="text-align: right; padding: 20px 0">
            <el-button type="primary" size="large" @click="save">保存</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { sendConfServer } from '@/api/conf';
import { getVipRebateConf, saveVipRebateConf } from '@/api/welfare/vipRebateApi';
import { assignObject } from 'ele-admin-plus';
import { EleMessage } from 'ele-admin-plus/es';
import { ElForm, FormRules } from 'element-plus';
const disabledSeconds = () => {
    return Array.from({ length: 59 }, (_, i) => i + 1); // 禁用1-59秒
};
const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const form = ref({
    jsonType: 'VipRebateConf',
    open: true,
    waterFlow: 0,
    lastSendTime: 0,
    sendTime: undefined,

});
// 获取基础配置信息
const loadingAppConf = () => {
    getVipRebateConf().then((data) => {
        form.value = assignObject(form.value, data || {});
        form.value.jsonType = 'VipRebateConf'
    });
};

// 发送到服务器
const sendServer = () => {
    const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
    });
    sendConfServer(26)
        .then((msg) => {
            loading.close();
            EleMessage.success(msg);
        })
        .catch((e) => {
            loading.close();
            EleMessage.error(e.message);
        });
};

// 保存
const save = () => {
    const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
    });
    let params = { ...form.value }
    saveVipRebateConf(params)
        .then((msg) => {
            loading.close();
            EleMessage.success(msg);
            loadingAppConf();
        })
        .catch((e) => {
            loading.close();
            EleMessage.error(e.message);
        });
};

loadingAppConf();
/** 表单验证规则 */
const rules = reactive<FormRules>({
    waterFlow: [
        {
            required: true,
            type: 'number',
            message: '请输入返利流水',
            trigger: 'blur'
        }
    ],
    sendTime: [{ required: true, message: '请选择发送时间', trigger: 'change' }],

});
</script>

<style lang="scss" scoped>
::v-deep .el-divider__text {
    font-weight: bold;
    font-size: 20px;
}


.title {
    padding-left: 30px;
    font-weight: bold;
    font-size: 20px;
    margin: 20px 0;
}

.form-table .el-form-item {
    margin-bottom: 0 !important;
}

:deep(.el-form-item__label) {
    font-size: 18px;
}

.tips {
    color: red;
}
</style>