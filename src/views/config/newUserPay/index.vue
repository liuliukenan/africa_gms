<template>
    <ele-page>
        <ele-card>
            <el-form :model="form">
                <el-tabs v-model="activeTab" tab-position="left" class="demo-tabs" stretch type="border-card"
                    :before-leave="beforeLeaveTab">
                    <el-tab-pane v-for="(item, index) in form.list" :key="item.times" :label="`第${item.times}次`"
                        :name="index.toString()">
                        <editTable v-model:tableData="item.items" />
                    </el-tab-pane>
                </el-tabs>
                <el-form-item prop="firstDayWaterRepairMul" label="首日流水补偿总倍数" style="margin-top: 20px;">
                    <el-input-number v-model="form.firstDayWaterRepairMul" :controls="false" :min="0"
                        placeholder="请输入 rate" style="width: 100%" />
                </el-form-item>
            </el-form>

            <el-button block @click="getNewTable" type="primary">保存</el-button>
            <el-popconfirm title="确认发送到服务器吗？" @confirm="sendServer()">
                <template #reference>
                    <el-button type="danger" class="ele-btn-icon" v-permission="'config:monthCard:send'">
                        <span>发送服务器</span>
                    </el-button>
                </template>
            </el-popconfirm>
        </ele-card>
    </ele-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import editTable from './components/edit-table.vue';
import { ElMessage } from 'element-plus';
import { pageNewUserPays, saveNewUserPay } from "@/api/config/newUserPayApi";
import { sendConfServer } from '@/api/conf';
import { EleMessage } from 'ele-admin-plus';
const form = ref<any>({
    list: [
        { times: 1, items: [{ isEdit: false }] },
        { times: 2, items: [] },
        { times: 3, items: [] },
        { times: 4, items: [] },
        { times: 5, items: [] },
    ],
    firstDayWaterRepairMul: 0,
    jsonType: 'NewUserPayConf'
});

// 当前激活 tab 的 index（字符串）
const activeTab = ref('0');

// 切换 tab 前检查是否所有数据已保存
const beforeLeaveTab = async (newTabName: string, oldTabName: string) => {
    const currentTabIndex = parseInt(oldTabName);
    const currentItems = form.value.list[currentTabIndex]?.items || [];
    const hasUnsaved = currentItems.some(item => item.isEdit);

    if (hasUnsaved) {
        ElMessage.warning('请先保存当前表格数据');
        return false; // 阻止切换

    }
    return true; // 允许切换
};

const getNewUserPay = async () => {
    const res = await pageNewUserPays();
    if (res) {
        form.value = {
            list: res.list || [],
            firstDayWaterRepairMul: res.firstDayWaterRepairMul,
        };
    }
};

onMounted(() => {
    getNewUserPay();

});
// 保存表格数据
const getNewTable = async () => {
    // 检查所有tab中是否有未保存的数据
    const hasUnsaved = form.value.list.some(item =>
        item.items?.some(row => row.isEdit)
    );

    if (hasUnsaved) {
        ElMessage.warning('请先完成所有表格的编辑');
        return;
    }

    let params = {
        list: form.value.list,
        jsonType: 'NewUserPayConf',
        firstDayWaterRepairMul: form.value.firstDayWaterRepairMul
    };

    try {
        await saveNewUserPay(params);
        ElMessage.success('保存成功');
        getNewUserPay(); // 刷新页面
    } catch (error) {
        ElMessage.error('保存失败');
    }
};
// 发送到服务器
const sendServer = () => {
    const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
    });
    sendConfServer(18)
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
<style scoped>
::v-deep .el-tabs--left{
    height: 500px;
}
::v-deep .el-tabs__nav{
    height: 100%;
}
::v-deep .el-tabs--left .el-tabs__item.is-left{
    flex: 1;
}
</style>