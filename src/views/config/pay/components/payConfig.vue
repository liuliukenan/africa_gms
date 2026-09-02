<template>
    <ele-card :bordered="false" body-class="card" :body-style="{ paddingTop: '0' }">
        <el-form ref="formRef" label-width="130px">
            <!-- 动态渲染多个配置区块 -->
            <div v-for="confKey in props.configKeys" :key="confKey" class="box">
                <div class="sub-title">{{ props.configLabels[confKey] || confKey }}:</div>
                <template v-if="multiConf[confKey]">
                    <el-row :gutter="16">
                        <el-col :md="8" :sm="24" :xs="24">
                            <el-form-item label="同IP限制次数:">
                                <el-input-number clearable :controls="false" placeholder="0=不限" :min="0"
                                    v-model="multiConf[confKey].ipLimit" style="width: 100%"  />
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :sm="24" :xs="24">
                            <el-form-item label="IP限制周期(天):">
                                <el-input-number clearable :controls="false" placeholder="请输入IP限制周期" :min="0"
                                    v-model="multiConf[confKey].ipPeriod" style="width: 100%"  />
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :sm="24" :xs="24">
                            <el-form-item label="同设备限制次数:">
                                <el-input-number clearable :controls="false" placeholder="0=不限" :min="0"
                                    v-model="multiConf[confKey].deviceLimit" style="width: 100%"  />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="16">
                        <el-col :md="8" :sm="24" :xs="24">
                            <el-form-item label="设备限制周期(天):">
                                <el-input-number clearable :controls="false" placeholder="请输入设备限制周期" :min="0"
                                    v-model="multiConf[confKey].devicePeriod" style="width: 100%"  />
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :sm="24" :xs="24">
                            <el-form-item label="奖励限制次数:">
                                <el-input-number clearable :controls="false" placeholder="0=不限" :min="0"
                                    v-model="multiConf[confKey].rewardLimit" style="width: 100%"  />
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <!-- 奖励物品表格 -->
                    <el-row :gutter="16">
                        <el-col :span="24">
                            <ActivityRewardGoods :ref="(el: any) => setActivityRewardGoodsRef(el, confKey)" v-model="multiRewardGoodsList[confKey]" />
                        </el-col>
                    </el-row>
                </template>
            </div>
        </el-form>
        <div style="text-align: left; padding: 20px 0">
            <el-button type="primary" size="large" @click="save">保存</el-button>
            <el-button size="large" @click="handleCancel">取消</el-button>
        </div>
    </ele-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { EleMessage } from 'ele-admin-plus/es';
import { ElForm } from 'element-plus';
import ActivityRewardGoods from '@/components/ActivityRewardGoods/index.vue';
import type { RewardGoods, ActSubConf } from '@/api/welfare/model/registerGive';

const emit = defineEmits<{
    (e: 'close'): void;
}>();

/** 组件 Props */
interface PayConfigProps {
    /** 页面标题 */
    title: string;
    /** 获取配置API */
    getApi: () => Promise<any>;
    /** 保存配置API */
    saveApi: (params: any) => Promise<string | undefined>;
    /** 配置键名数组 */
    configKeys: string[];
    /** 配置标签映射 */
    configLabels: Record<string, string>;
}

const props = defineProps<PayConfigProps>();

const formRef = ref<InstanceType<typeof ElForm> | null>(null);

/** 顶层 id */
const dataId = ref<number>(0);

/** 多配置区块 */
const multiConf = ref<Record<string, ActSubConf>>({});

/** 多奖励物品列表 */
const multiRewardGoodsList = ref<Record<string, RewardGoods[]>>({});

/** 初始化所有配置区块 */
const initMultiConf = () => {
    props.configKeys.forEach(key => {
        multiConf.value[key] = {
            ipLimit: undefined,
            ipPeriod: undefined,
            deviceLimit: undefined,
            devicePeriod: undefined,
            rewardLimit: undefined,
            rewardGoods: []
        };
        multiRewardGoodsList.value[key] = [];
    });
};

// 存储每个配置键对应的 ActivityRewardGoods ref
const rewardGoodsTableRefs = ref<Record<string, InstanceType<typeof ActivityRewardGoods> | null>>({});

// 设置 ActivityRewardGoods ref
const setActivityRewardGoodsRef = (el: any, confKey: string) => {
    if (el) {
        rewardGoodsTableRefs.value[confKey] = el;
    }
};

/** 加载配置 */
const loadConfig = () => {
    props.getApi().then((data) => {
        if (!data) return;
        dataId.value = data.id ?? 0;

        // 填充多个子配置: data.rewardConfig.subActRewardConf
        const rewardConfig = data.rewardConfig;
        if (rewardConfig && rewardConfig.subActRewardConf) {
            props.configKeys.forEach(key => {
                const confData = rewardConfig.subActRewardConf[key];
                if (confData) {
                    multiConf.value[key] = { ...confData };
                    multiRewardGoodsList.value[key] = confData.rewardGoods || [];
                }
            });
        }
    });
};

/** 保存 */
const save = () => {
    // 校验所有配置区块的奖励物品表格
    for (const confKey of props.configKeys) {
        const tableRef = rewardGoodsTableRefs.value[confKey];
        if (tableRef) {
            const validation = tableRef.validate();
            if (!validation.valid) {
                EleMessage.error(`【${props.configLabels[confKey]}】${validation.message}`);
                return;
            }
        }
    }

    const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
    });

    // 组装多个配置区块
    const subActRewardConf: Record<string, any> = {};
    for (const confKey of props.configKeys) {
        subActRewardConf[confKey] = {
            ...multiConf.value[confKey],
            rewardGoods: (multiRewardGoodsList.value[confKey] || []).filter(item => item.goodsId !== undefined)
        };
    }

    // 组装提交参数，结构: { id, rewardConfig: { jsonType, subActRewardConf } }
    const params = {
        id: dataId.value,
        rewardConfig: {
            jsonType: 'ActRewardConf',
            subActRewardConf
        }
    };

    props.saveApi(params)
        .then((msg) => {
            loading.close();
            EleMessage.success(msg);
            emit('close');
        })
        .catch((e) => {
            loading.close();
            EleMessage.error(e.message);
        });
};

/** 取消 */
const handleCancel = () => {
    emit('close');
};

onMounted(() => {
    initMultiConf();
    loadConfig();
});
</script>

<style lang="scss" scoped>
.box {
    padding: 16px;
    box-shadow: 0 5px 5px 0 rgba(34, 34, 34, 0.1);
    margin: 15px 0;
    border-radius: 15px;
}

.sub-title {
    font-size: 20px;
    font-weight: bold;
    margin: 8px 0;
}

.card.ele-card-body {
    padding: 0 !important;
}
</style>
