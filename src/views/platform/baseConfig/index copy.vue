<template>
    <ele-card :bordered="false" style="margin: 20px" body-class="card">
        <template #header>
            <div class="card-header"
                style="display: flex; width: 100%; justify-content: space-between; align-items: center">
                <span style="font-weight: bold; font-size: 20px">基础配置</span>
                <div v-permission="'config:base:send'">
                    <el-popconfirm title="确认发送到服务器吗？" @confirm="sendServer()">
                        <template #reference>
                            <el-button type="danger" class="ele-btn-icon">
                                <span>发送</span>
                            </el-button>
                        </template>
                    </el-popconfirm>
                </div>
            </div>
        </template>
        <el-form ref="formRef" :model="form" label-width="160px">
            <div style="color: red; margin-bottom: 10px">
                <el-row :gutter="16">
                    <el-col :md="8" :sm="24" :xs="24">
                        <el-form-item label="默认国家" prop="defaultCountrtyCode">
                            <el-select v-model="form.defaultCountrtyCode" placeholder="请选择" style="width: 100%;">
                                <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name"
                                    :value="item.code" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="12" :sm="24" :xs="24">
                        <el-form-item label="默认语言" prop="defaultLang">
                            <el-input clearable placeholder="默认语言" v-model.trim="form.defaultLang" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="16" v-for="(v, i) in configStore.countryArr" :key="v.code">
                    <el-col :md="8" :sm="24" :xs="24">
                        <el-form-item :label="'国家' + (Number(i) + 1)" :prop="'additionalProperties' + (Number(i) + 1) + '.code'">
                            <el-select 
                                :model-value="form.itemMap['additionalProperties' + (Number(i) + 1)]?.code"
                                @change="(val) => {
                                    const key = 'additionalProperties' + (Number(i) + 1);
                                    if (!form.itemMap[key]) {
                                        form.itemMap[key] = { registerAmount: 0 };
                                    }
                                    form.itemMap[key].code = val;
                                }"
                                placeholder="请选择"
                                style="width: 100%;">
                                <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name"
                                    :value="item.code" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="12" :sm="24" :xs="24">
                        <el-form-item label="注册奖励" :prop="'additionalProperties' + (Number(i) + 1) + '.registerAmount'">
                            <el-input 
                                clearable 
                                placeholder="请输入"
                                :model-value="form.itemMap['additionalProperties' + (Number(i) + 1)]?.registerAmount"
                                @input="(val) => {
                                    const key = 'additionalProperties' + (Number(i) + 1);
                                    if (!form.itemMap[key]) {
                                        form.itemMap[key] = { registerAmount: 0 };
                                    }
                                    form.itemMap[key].registerAmount = val;
                                }"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </el-form>
        <div style="text-align: right; padding: 20px 0" v-permission="'config:base:add'">
            <el-button type="primary" @click="save">保存</el-button>
        </div>
    </ele-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAppConf, saveAppConf, sendConfServer } from '@/api/conf';
import { assignObject } from 'ele-admin-plus';
import { EleMessage } from 'ele-admin-plus/es';
import { ElForm } from 'element-plus';
import { useConfigStore } from "@/store/modules/config"; // 导入store
// 初始化store
const configStore = useConfigStore();
const form = ref({
    jsonType: 'AppConf',
    defaultCountrtyCode: undefined,
    defaultLang: undefined,
    itemMap: {
        additionalProperties1: {
            code: '',
            registerAmount: 0
        }
    } 
});

// 初始化国家对应的 additionalProperties 对象
const initAdditionalProperties = () => {
    const countryArr = configStore.countryArr;
    if (countryArr.length > 0) {
        countryArr.forEach((_, index) => {
            const key = `additionalProperties${index + 1}`;
            if (!form.value.itemMap[key]) {
                form.value.itemMap[key] = {
                    code: '',
                    registerAmount: 0
                };
            } else if (typeof form.value.itemMap[key] === 'string') {
                // 修复结构不一致的问题
                form.value.itemMap[key] = {
                    code: form.value.itemMap[key],
                    registerAmount: 0
                };
            } else if (!form.value.itemMap[key].code) {
                form.value.itemMap[key].code = '';
            } else if (form.value.itemMap[key].registerAmount === undefined) {
                form.value.itemMap[key].registerAmount = 0;
            }
        });
    }
};
// 组件挂载时获取国家列表并初始化
onMounted(async () => {
    await configStore.getCountryCode();
    initAdditionalProperties();
    loadingAppConf();
});
// 获取基础配置信息
const loadingAppConf = () => {
    getAppConf().then((data) => {
        // 保存当前的 itemMap 结构
        const currentItemMap = { ...form.value.itemMap };
        // 合并数据
        form.value = assignObject(form.value, data);
        form.value.jsonType = 'AppConf';
        // 恢复 itemMap 结构，确保每个 additionalProperties 对象都存在
        form.value.itemMap = { ...currentItemMap, ...form.value.itemMap };
        // 再次初始化，确保所有国家对应的 additionalProperties 对象都存在
        initAdditionalProperties();
    });
};


// 发送到服务器
const sendServer = () => {
    const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
    });
    sendConfServer(8)
        .then((msg) => {
            loading.close();
            EleMessage.success(msg);
        })
        .catch((e) => {
            loading.close();
            EleMessage.error(e.message);
        });
};
const formRef = ref<InstanceType<typeof ElForm> | null>(null);

// 保存
const save = () => {
    formRef.value?.validate?.((valid) => {
        if (valid) {
            // const loading = EleMessage.loading({
            //     message: '请求中..',
            //     plain: true
            // });
          
            console.log(77, form.value);

            // return
            // saveAppConf(form.value)
            //     .then((msg) => {
            //         loading.close();
            //         EleMessage.success(msg);
            //         loadingAppConf();
            //     })
            //     .catch((e) => {
            //         loading.close();
            //         EleMessage.error(e.message);
            //     });
        }
    });
};
</script>
<style lang="scss" scoped>
.form-table .el-form-item {
    margin-bottom: 0 !important;
}
</style>
