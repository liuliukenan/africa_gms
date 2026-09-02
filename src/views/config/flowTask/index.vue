<template>
    <div class="ele-body ele-body-card" style="width: 80%">
        <el-card :bordered="false" style="margin: 20px;">
            <template #header>
                <div class="card-header"
                    style="display: flex; width: 100%; justify-content: space-between; align-items: center">
                    <span style="font-weight: bold;font-size: 20px;">流水任务关闭阈值</span>
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
                :wrapper-col="{ md: 16, sm: 16, xs: 24 }" label-width="150px">
                <div style="color: red; margin-bottom: 10px">
                    <el-row :gutter="16">
                        <el-col :md="24" :sm="24" :xs="24">
                            <el-form-item label="流水任务清零状开关" prop="smsSwitch">
                                <el-switch v-model="form.smsSwitch" :active-value="true" :inactive-value="false"
                                    size="large"></el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :sm="24" :xs="24">
                            <el-form-item label="余额阈值" prop="num">
                                <el-input-number v-model="form.num" :controls="false" style="width: 100%;"
                                    placeholder="建议范围小于最小下注额" size="large"></el-input-number>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :sm="24" :xs="24">
                            <div style="margin-left: 50px;">
                                说明:
                                <div> 1.当指定游戏账户余额小于该阈值，关闭指定游戏进行中的流水任务;</div>
                                <div> 2.当账户总余额小于该阈值，关闭中心账户进行中的流水任务;</div>
                            </div>

                        </el-col>
                    </el-row>
                    <div style="text-align: right; margin-top: 16px">
                        <el-button type="primary" @click="save">保存</el-button>
                    </div>
                </div>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getSwitchConfApi, saveSwitchConfApi } from '@/api/platform/switchConfigApi';
import { sendConfServer } from '@/api/conf';
import { assignObject } from 'ele-admin-plus';
import { EleMessage } from 'ele-admin-plus/es';

const form = ref({
    // jsonType: 'SwitchConf',
    smsSwitch: false,
    num: undefined,
});

const loadingConf = () => {
    getSwitchConfApi().then((data) => {
        form.value = assignObject(form.value, data);
        form.value.jsonType = 'SwitchConf';
    });
};

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
// 发送到服务器
const sendServer = () => {
    const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
    });
    sendConfServer(17)
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