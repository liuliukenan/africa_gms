<template>
    <div style="margin-top:20px">
        <BaseEditTable :columns="tableColumns" title="机器人中奖配置" :getListApi="getList" :saveApi="saveList"
            :deleteApi="deleteList" />
    </div>
</template>

<script setup lang="ts">
import BaseEditTable from '@/components/BaseEditTable/index.vue';
import { pageOpenAward, addAward, updateAward, removeAward } from '@/api/welfare/rechargePrize';

// 获取表格tableData的列数据
const tableColumns = [
    { label: '物品名称', prop: 'name', placeholder: '请输入物品名称', type: 'txt' },
    { label: '数量', prop: 'num', placeholder: '请输入数量' },
    { label: '奖励类型', prop: 'type', placeholder: '请输入奖励类型', type: "select", code: "winType" },
    { label: '中奖权重', prop: 'weight', placeholder: '请输入中奖权重' },
    { label: '库存', prop: 'stock', placeholder: '请输入库存' },
]
// 删除表格tableData数据
const deleteList = async (row: any) => {


    try {
        const res = await removeAward(row.id)
            console.log(123, res);
        // return res || '删除成功'
    } catch (error) {
        throw new Error('删除数据失败')
    }
}
// 获取表格tableData数据
const getList = async () => {
    try {
        const res = await pageOpenAward()  // 假设API路径
        return res  // 返回数据中的 表格数据
    } catch (error) {
        return { data: [] }
    }
}
const saveList = async (data: any[]) => {
    console.log(111, data);

    try {
        const res = await addAward(data)  // 假设API路径
        return res || '保存成功'
    } catch (error) {
        throw new Error('保存数据失败')
    }
}
</script>

<style scoped></style>