<template>
    <div style="height: 100%;">
        <el-card :bordered="false" style="margin: 20px;">
            <template #header>
                <div class="card-header">
                    <span>每日排行榜配置</span>
                </div>
            </template>
            <el-form ref="formRef" :model="form" label-width='160px'>
                <el-row :gutter="16">
                    <el-col :md="8" :sm="12" :xs="24">
                        <el-form-item label="时点: " prop="overHour">
                            <el-select v-model="form.overHour" placeholder="请选择" clearable>
                                <el-option v-for="item in 24" :key="item" :label="item" :value="item" />
                            </el-select>
                            <span style="color: #1677ff; font-size: 12px">排行榜周期,如选择21点,则从今天21到次日21点为一个周期</span>
                        </el-form-item>
                        <el-form-item label="排行榜刷新频率(分钟): " prop="refreshPeriod">
                            <el-input-number :controls="false" clearable :min="1" :max="5" placeholder="排行榜刷新频率"
                                v-model="form.refreshPeriod" style="width: 100%" />
                        </el-form-item>
                        <el-form-item label="水池初始大小: " prop="initPool">
                            <el-input-number :controls="false" clearable :maxlength="20" placeholder="水池初始大小"
                                v-model="form.initPool" style="width: 100%" />
                        </el-form-item>
                        <el-form-item label="水池增加频率(分钟):  " prop="title">
                            <el-input-number :controls="false" clearable :min="1" :max="60" placeholder="间隔分钟"
                                v-model="form.periodMin" style="width: 100%" />
                        </el-form-item>
                        <el-form-item label="每次增加最小值: " prop="randMin">
                            <el-input-number :controls="false" clearable :min="1" placeholder="水池初始大小"
                                v-model="form.randMin" style="width: 100%" />
                        </el-form-item>
                        <el-form-item label="每次增加最小值: " prop="randMax">
                            <el-input-number :controls="false" clearable :min="1" placeholder="水池初始大小"
                                v-model="form.randMax" style="width: 100%" />
                        </el-form-item>
                    </el-col>
                    <el-col :md="12" :sm="12" :xs="24">
                        <el-table size="small" row-key="key" :data="form.awards" border>
                            <el-table-column prop="id" label="排名"  align="center" />
                            <el-table-column prop="rate" label="比例"  align="center">
                                <template #default="{ row, $index }">
                                    <el-form-item :prop="'awards.' + $index + '.rate'" :rules="baseRules.rate"
                                        label-width='0'>
                                        <el-input-number v-if="row.isEdit" v-model="row.rate" placeholder="请输入比例" :min="0" :max="100"  style="width: 100%;"
                                            :controls="false" @blur="caclRate()" />
                                        <span v-else style="margin: auto;">{{ row.rate }}</span>
                                    </el-form-item>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="center">
                                <template #default="{ row, $index }">
                                    <el-button link :type="row.isEdit ? 'success' : 'primary'" size="small" v-permission="'daliy:daliyRankConf:edit'"
                                        @click="handleFinish(row)">{{ row.isEdit
                                            ?
                                            '完成' : '修改'
                                        }}</el-button>
                                    <el-popconfirm title="确定要删除此记录吗？" @confirm="baseRemove(row, $index)"
                                        v-if="$index == form.awards.length - 1">
                                        <template #reference>
                                            <el-button link type="danger" size="small">删除</el-button>
                                        </template>
                                    </el-popconfirm>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-row>
                            <el-col :md="6" :sm="10" :xs="10">
                                <div style="font-size: 16px; padding: 20px 0">当前总量 {{ sumRate }}
                                </div>
                            </el-col>
                            <el-col :md="18" :sm="14" :xs="14">
                                <el-button block  style="margin-top: 16px;width: 100%;" @click="baseAdd">
                                    <template #icon>
                                        <plus-outlined />
                                    </template>
                                    <span>新增</span>
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :md="24" :sm="24" :xs="24" style="text-align: right">
                        <el-button type="primary" class="ele-btn-icon" @click="save()">
                            <span>保存</span>
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { PlusOutlined } from "@/components/icons";
import { getDailyRankConf, saveDailyRankConf, sendConfServer } from '@/api/conf';
import { uuid } from 'ele-admin-plus';
import { useFormData } from '@/utils/use-form-data';
import { EleMessage } from 'ele-admin-plus';

const { form, resetFields, assignFields } = useFormData({
    jsonType: 'DailyRankConf',
    overHour: 0,
    refreshPeriod: 0,
    initPool: 0,
    periodMin: 0,
    randMin: 0,
    randMax: 0,
    notice: '',
    awards: []
});
const sumRate = ref(0);

getDailyRankConf().then((data) => {
    // assignFields({ ...data, jsonType: 'DailyRankConf' });
    data.awards.forEach(v => {
        v.isEdit = false
    })
    form.awards = [...data.awards]
    caclRate();
});
const baseRules = {
    rate: [{ required: true, message: '请输入比例', trigger: 'blur' }],
};
const baseEdit = (_row, index) => {
    form.awards[index].isEdit = true;
};
// 修改/完成
const handleFinish = (row) => {
    if (row.rate == '') {
        EleMessage.warning('请输入比例');
    } else {
        row.isEdit = !row.isEdit;
    }
};
const caclRate = () => {
    sumRate.value = form.awards.reduce((acc, current) => acc + parseInt(current.rate), 0);
};

const baseRemove = (_row, index) => {
    form.awards.splice(index, 1);
    caclRate()
};

const baseAdd = () => {
    var maxId = Math.max(...form.awards.map((item) => item.id));
    if (maxId === -Infinity) {
        maxId = 1;
    } else {
        maxId++;
    }
    form.awards.push({
        key: uuid(8),
        isEdit: true,
        id: maxId,
        rate: 0
    });
};

const sendServer = () => {
    const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
    });
    sendConfServer(6)
        .then((msg) => {
            loading.close()
            EleMessage.success(msg);
        })
        .catch((e) => {
            loading.close()
            EleMessage.error(e.message);
        });
};

const save = () => {
    if (!form.awards.length) return EleMessage.warning('请设置比例');

    let sum = form.awards.reduce((acc, current) => acc + parseInt(current.rate), 0);
    if (parseInt(sum) !== 100) {
        EleMessage.warning('所有比例相加必须等于100');
        return;
    }

    const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
    });
    saveDailyRankConf(form)
        .then((msg) => {
            loading.close()
            EleMessage.success(msg);
        })
        .catch((e) => {
            loading.close()
            EleMessage.error(e.message);
        });
};
</script>
<style scoped lang="scss">
.el-table .el-form-item {
    margin-bottom: 0 !important;
}
</style>