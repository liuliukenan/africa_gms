<template>
    <div>
        <!-- <div style="font-weight: bold;font-size: 18px;">基础配置</div> -->


        <el-form ref="formRef" :model="form" :rules="rules" label-width="150px">
            <!-- <el-descriptions class="margin-top" title="基础配置" :column="4" border direction="vertical"
                style="margin-bottom:20px ;">
                <el-descriptions-item label="充值金额" align="center">2</el-descriptions-item>
                <el-descriptions-item label="充值倍数" align="center">1</el-descriptions-item>
                <el-descriptions-item label="购买次数限制" align="center">1</el-descriptions-item>
                <el-descriptions-item label="流水倍数" align="center">1</el-descriptions-item>
            </el-descriptions> -->
            <div style="display: flex;justify-content: space-between;">
                <div style="font-weight: bold;font-size: 18px;">充值奖金配置</div>
                <el-popconfirm title="确认发送到服务器吗？" @confirm="sendServer()">
                    <template #reference>
                        <el-button type="danger" class="ele-btn-icon">
                            <span>发送</span>
                        </el-button>
                    </template>
                </el-popconfirm>
            </div>
            <el-row :gutter="20">
                <el-col :md="12" :sm="24" :xs="24">
                    <el-form-item label="机器人下次中奖时间:" prop="robotNextTime">
                        <!-- <el-time-picker v-model="form.robotNextTime" format="HH:mm:ss" value-format="HH:mm:ss"
                            placeholder="请选择机器人下次时间" size="large" style="width: 100%" /> -->
                        {{ toDateString(form.robotNextTime) }}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :md="12" :sm="24" :xs="24">
                    <el-form-item label="流水倍数:">
                        <el-input-number clearable :controls="false" size="large" placeholder="请输入流水倍数"
                            v-model.trim="form.waterFlowMult" style="width: 100%" />
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="24">
                    <el-form-item label="机器人频率区间" name="robotFrequenciesStr">
                        <el-input clearable :maxlength="50" v-model="form.robotFrequenciesStr" size="large"
                            placeholder="请输入机器人频率区间" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :md="12" :sm="24" :xs="24">
                    <el-form-item label="购买次数限制:">
                        <el-input-number clearable :controls="false" size="large" placeholder="请输入购买次数限制"
                            v-model.trim="form.buyLimitTimes" style="width: 100%" />
                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="24" :xs="24">
                    <el-form-item label="充值倍数:">
                        <el-input-number clearable :controls="false" size="large" placeholder="请输入充值倍数"
                            v-model.trim="form.payMult" style="width: 100%" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :md="12" :sm="24" :xs="24">
                    <el-form-item label="充值金额（元）:">
                        <el-input-number clearable :controls="false" size="large" placeholder="请输入充值金额"
                            v-model.trim="form.amount" style="width: 100%" /><span></span>
                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="24" :xs="24">
                    <el-form-item label="触发概率:" class="tips">
                        <el-input-number clearable :controls="false" size="large" placeholder="请输入触发概率"
                            v-model.trim="form.rate" style="width:80%" />
                        <span style="color: red;">(万分比)</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :md="6" :sm="6" :xs="24">
                    <el-form-item label="缅甸" prop="mm">
                        <image-upload :limit="1" v-model="form.mm" accept="image/png" :item-style="{
                            width: '120px',
                            height: '120px',
                            background: 'var(--el-fill-color-lighter)',
                            '--ele-upload-list-padding': 0
                        }" :button-style="{ width: '120px', height: '120px' }" category="1" :isOBS="true" />
                    </el-form-item>
                </el-col>
                <el-col :md="6" :sm="6" :xs="24">
                    <el-form-item label="越南" prop="vn">
                        <image-upload :limit="1" v-model="form.vn" accept="image/png" :item-style="{
                            width: '120px',
                            height: '120px',
                            background: 'var(--el-fill-color-lighter)',
                            '--ele-upload-list-padding': 0
                        }" :button-style="{ width: '120px', height: '120px' }" category="1" :isOBS="true" />
                    </el-form-item>
                </el-col>
                <el-col :md="6" :sm="6" :xs="24">
                    <el-form-item label="印尼" prop="indon">
                        <image-upload :limit="1" v-model="form.indon" accept="image/png" :item-style="{
                            width: '120px',
                            height: '120px',
                            background: 'var(--el-fill-color-lighter)',
                            '--ele-upload-list-padding': 0
                        }" :button-style="{ width: '120px', height: '120px' }" category="1" :isOBS="true" />
                    </el-form-item>
                </el-col>
                <el-col :md="6" :sm="6" :xs="24">
                    <el-form-item label="马来" prop="my">
                        <image-upload :limit="1" v-model="form.my" accept="image/png" :item-style="{
                            width: '120px',
                            height: '120px',
                            background: 'var(--el-fill-color-lighter)',
                            '--ele-upload-list-padding': 0
                        }" :button-style="{ width: '120px', height: '120px' }" category="1" :isOBS="true" />
                    </el-form-item>
                </el-col>
                <el-col :md="6" :sm="6" :xs="24">
                    <el-form-item label="泰语" prop="th">
                        <image-upload :limit="1" v-model="form.th" accept="image/png" :item-style="{
                            width: '120px',
                            height: '120px',
                            background: 'var(--el-fill-color-lighter)',
                            '--ele-upload-list-padding': 0
                        }" :button-style="{ width: '120px', height: '120px' }" category="1" :isOBS="true" />
                    </el-form-item>
                </el-col>
                <el-col :md="6" :sm="6" :xs="24">
                    <el-form-item label="繁体中文" prop="uca">
                        <image-upload :limit="1" v-model="form.uca" accept="image/png" :item-style="{
                            width: '120px',
                            height: '120px',
                            background: 'var(--el-fill-color-lighter)',
                            '--ele-upload-list-padding': 0
                        }" :button-style="{ width: '120px', height: '120px' }" category="1" :isOBS="true" />
                    </el-form-item>
                </el-col>
                <el-col :md="6" :sm="6" :xs="24">
                    <el-form-item label="中文" prop="zh">
                        <image-upload :limit="1" v-model="form.zh" accept="image/png" :item-style="{
                            width: '120px',
                            height: '120px',
                            background: 'var(--el-fill-color-lighter)',
                            '--ele-upload-list-padding': 0
                        }" :button-style="{ width: '120px', height: '120px' }" category="1" :isOBS="true" />
                    </el-form-item>
                </el-col>
                <el-col :md="6" :sm="6" :xs="24">
                    <el-form-item label="English" prop="en">
                        <image-upload :limit="1" v-model="form.en" accept="image/png" :item-style="{
                            width: '120px',
                            height: '120px',
                            background: 'var(--el-fill-color-lighter)',
                            '--ele-upload-list-padding': 0
                        }" :button-style="{ width: '120px', height: '120px' }" category="1" :isOBS="true" />
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- <el-row :gutter="20">
                <el-col :md="24" :sm="24" :xs="24">
                    <div style="color: red;margin: 20px 0;">*万分比</div>
                </el-col>
            </el-row> -->
            <!-- <div style="font-weight: bold;font-size: 18px;">机器人配置</div> -->


            <!-- </el-row> -->
            <el-row style="margin: 20px;">
                <el-button type="primary" :loading="loading" @click="save"> 保存 </el-button>
            </el-row>
        </el-form>


    </div>
</template>

<script setup lang="ts">
import { assignObject, EleMessage } from 'ele-admin-plus';
import { ElForm, FormRules } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import { getTenTimes, saveTenTimes } from '@/api/welfare/tenTimes';
import { sendConfServer } from '@/api/conf';
import ImageUpload from '@/components/ImageUpload/index.vue';
import { TenTimesParam } from '@/api/welfare/model';
import {toDateString} from '@/utils/utils';
const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const form = ref<TenTimesParam>({
    jsonType: 'Pay10Conf',
    payMult: 0,
    amount: 0,
    rate: 0,
    buyLimitTimes: 0,
    waterFlowMult: 0,
    robotNextTime: '',
    robotFrequencies: [],
    robotFrequenciesStr: '[]',
    zh: '',
    en: '',
    uca: '',
    th: '',
    mm: '',
    my: '',
    vn: '',
    indon: ''
});
/** 表单验证规则 */
const rules = reactive<FormRules>({

    robotFrequencies: [
        {
            required: true,
            type: 'string',
            message: '请输入基础人数区间',
            trigger: 'blur'
        }
    ]
});
/** 提交状态 */
const loading = ref(false);
// 获取基础配置信息
const getInfo = () => {
    getTenTimes().then((res) => {
        if (res) {
            form.value = assignObject(form.value, res);
            form.value.jsonType = 'Pay10Conf';
            form.value.robotFrequenciesStr = JSON.stringify(res.robotFrequencies);
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
        form.value.robotFrequencies = JSON.parse(form.value.robotFrequenciesStr || '[]');
        saveTenTimes(form.value)
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
    sendConfServer(23)
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
