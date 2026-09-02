<template>
    <div class="ele-body ele-body-card" style="width: 1200px">
        <el-card :bordered="false" style="margin: 20px;">
            <template #header>
                <div class="card-header"
                    style="display: flex; width: 100%; justify-content: space-between; align-items: center">
                    <span style="font-weight: bold;font-size: 20px;">服务器状态</span>
                    
                </div>
            </template>
            <el-form ref="formRef" :model="appData" :label-col="{ md: 8, sm: 8, xs: 24 }"
                :wrapper-col="{ md: 16, sm: 16, xs: 24 }">
                <div style="color: red; margin-bottom: 10px">
                    <el-row :gutter="16">
                        <el-col :md="24" :sm="24" :xs="24">
                            <el-form-item label="预开服状态" prop="newHandSpinCnt">
                                <div v-html="serverState" style="width: 100%"></div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div style="text-align: right; margin-top: 16px">
                        <el-button type="danger" @click="open" v-permission="'config:serverState:open'">打开预开服</el-button>
                        <el-button type="primary" @click="close" v-permission="'config:serverState:close'">关闭预开服</el-button>
                    </div>
                </div>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getServerState, openServerState, closeServerState } from '@/api/conf';
import { assignObject } from 'ele-admin-plus';
import { EleMessage } from 'ele-admin-plus/es';

const serverState = ref('');
const appData = ref({});

const loadingConf = () => {
    getServerState().then((data) => {
        console.log(data);
        serverState.value = data;
        // userControlConf.value = assignObject(userControlConf.value, data);
    });
};

loadingConf();

const open = () => {
    const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
    });
    openServerState()
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

const close = () => {
    const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
    });
    closeServerState()
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


</script>