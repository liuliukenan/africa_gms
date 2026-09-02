<template>
    <ele-page>
        <el-card :bordered="false" style="margin: 20px;">
            <template #header>
                <div class="card-header"
                    style="display: flex; width: 100%; justify-content: space-between; align-items: center">
                    <span style="font-weight: bold;font-size: 20px;">短信验证码开关配置</span>
                    <el-popconfirm title="确认发送到服务器吗？" @confirm="sendServer()">
                        <template #reference>
                            <el-button type="danger" class="ele-btn-icon">
                                <span>发送</span>
                            </el-button>
                        </template>
                    </el-popconfirm>
                </div>
            </template>
            <el-form ref="formRef" :model="form" :label-col="{ md: 8, sm: 8, xs: 24 }"
                :wrapper-col="{ md: 16, sm: 16, xs: 24 }">
                <div style="color: red; margin-bottom: 10px">
                    <el-row :gutter="16">
                        <el-col :md="24" :sm="24" :xs="24">
                            <el-form-item label="状态" prop="smsSwitch">
                                <el-switch v-model="form.smsSwitch" :active-value="true" :inactive-value="false"
                                    size="large"></el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div style="text-align: right; margin-top: 16px">
                        <el-button type="primary" @click="save">保存</el-button>
                    </div>
                </div>
            </el-form>
        </el-card>
        <el-card :bordered="false" style="margin: 20px;">
            <template #header>
                <div class="card-header"
                    style="display: flex; width: 100%; justify-content: space-between; align-items: center">
                    <span style="font-weight: bold;font-size: 20px;">服务器开关配置</span>
                    <el-popconfirm title="确认发送到服务器吗？" @confirm="sendServer()">
                        <template #reference>
                            <el-button type="danger" class="ele-btn-icon">
                                <span>发送</span>
                            </el-button>
                        </template>
                    </el-popconfirm>
                </div>
            </template>
            <el-form ref="formRef" :model="formServer" :label-col="{ md: 8, sm: 8, xs: 24 }"
                :wrapper-col="{ md: 16, sm: 16, xs: 24 }">
                <div style="color: red; margin-bottom: 10px">
                    <el-row :gutter="16">
                        <el-col :md="24" :sm="24" :xs="24">
                            <el-form-item label="状态" prop="close">
                                <el-select v-model="formServer.close" style="width: 180px"
                                    @change="onServerCloseChange">
                                    <el-option label="正常" :value="0" />
                                    <el-option label="即将更新" :value="1" />
                                    <el-option label="维护中" :value="2" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
        </el-card>
    
    <!-- 谷歌验证码弹窗 -->
    <el-dialog v-model="totpDialogVisible" title="请输入谷歌验证码" width="400px" :close-on-click-modal="false">
        <el-form @submit.prevent="confirmServerSwitch">
            <el-form-item label="验证码">
                <el-input v-model="totpCode" placeholder="请输入谷歌验证码" clearable
                    @keyup.enter="confirmServerSwitch" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="cancelServerSwitch">取消</el-button>
            <el-button type="primary" :loading="totpLoading" @click="confirmServerSwitch">确认</el-button>
        </template>
    </el-dialog>
    </ele-page>
</template>

<script setup>
import { ref } from 'vue';
import { getSwitchConfApi, saveSwitchConfApi, getServerApi, savServerApi } from '@/api/platform/switchConfigApi';
import { sendConfServer } from '@/api/conf';
import { assignObject } from 'ele-admin-plus';
import { EleMessage } from 'ele-admin-plus/es';

const form = ref({
    jsonType: 'SwitchConf',
    smsSwitch: false,
});
const formServer = ref({
    jsonType: 'OpenSwitchConf',
    close: 0,
    "@class": ''
});

const loadingConf = () => {
    getSwitchConfApi().then((data) => {
        form.value = assignObject(form.value, data);
        form.value.jsonType = 'SwitchConf';
    });
};
const loadingServerConf = () => {
    getServerApi().then((data) => {
        formServer.value = assignObject(formServer.value, data);
        formServer.value.jsonType = 'OpenSwitchConf';
        previousCloseValue = formServer.value.close; // 记录初始值
    });
};
loadingServerConf();
loadingConf();

const save = () => {
    const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
    });
    saveSwitchConfApi({ ...form.value })
        .then((msg) => {
            loading.close()
            EleMessage.success(msg);
            loadingConf();
        })
        .catch((e) => {
            loading.close()
            EleMessage.error(e.message);
        });
};
const saveServer = () => {
    const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
    });
    saveSwitchServerApi({ ...formServer.value })
        .then((msg) => {
            loading.close()
            EleMessage.success(msg);
            loadingServerConf();
        })
        .catch((e) => {
            loading.close()
            EleMessage.error(e.message);
        });
};
// === 服务器开关验证码相关 ===
const totpDialogVisible = ref(false);
const totpCode = ref('');
const totpLoading = ref(false);
let pendingCloseValue = 0;
let previousCloseValue = 0;

const onServerCloseChange = (val) => {
    pendingCloseValue = val;
    totpCode.value = '';
    totpDialogVisible.value = true;
};

const confirmServerSwitch = () => {
    if (!totpCode.value) {
        EleMessage.warning('请输入谷歌验证码');
        return;
    }
    totpLoading.value = true;
    savServerApi(Number(totpCode.value), {
        ...formServer.value,
        close: pendingCloseValue
    })
        .then((msg) => {
            totpLoading.value = false;
            totpDialogVisible.value = false;
            previousCloseValue = pendingCloseValue;
            EleMessage.success(msg);
        })
        .catch((e) => {
            totpLoading.value = false;
            formServer.value.close = previousCloseValue; // 失败回滚
            EleMessage.error(e.message);
        });
};

const cancelServerSwitch = () => {
    formServer.value.close = previousCloseValue; // 取消回滚
    totpDialogVisible.value = false;
};

// 发送到服务器
const sendServer = () => {
    const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
    });
    sendConfServer(2)
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
