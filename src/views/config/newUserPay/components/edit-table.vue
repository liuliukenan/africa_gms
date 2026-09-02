<template>
    <div>
        <el-form :model="{ localTableData }" :rules="rules" ref="formRef">
            <el-table :data="localTableData" stripe border style="width: 100%; margin-top: 20px">
                <el-table-column type="index" label="序号" width="70" />

                <el-table-column prop="amount" label="金额">
                    <template #default="{ row, $index }">
                        <el-form-item :prop="`localTableData.${$index}.amount`" :rules="rules.amount">
                            <el-input-number v-if="row.isEdit" v-model="row.amount" :controls="false"
                                placeholder="请输入 amount" style="width: 100%" />
                            <span v-else>{{ row.amount }}</span>
                        </el-form-item>
                    </template>
                </el-table-column>

                <el-table-column prop="rate" label="多送比例">
                    <template #default="{ row, $index }">
                        <el-form-item :prop="`localTableData.${$index}.rate`" :rules="rules.rate">
                            <el-input-number v-if="row.isEdit" v-model="row.rate" :controls="false" :min="0"
                                placeholder="请输入 rate" style="width: 100%" />
                            <span v-else>{{ row.rate }}</span>
                        </el-form-item>
                    </template>
                </el-table-column>

                <el-table-column prop="waterMul" label="多送流水倍数要求">
                    <template #default="{ row, $index }">
                        <el-form-item :prop="`localTableData.${$index}.waterMul`" :rules="rules.waterMul">
                            <el-input-number v-if="row.isEdit" v-model="row.waterMul" :controls="false" :min="0"
                                placeholder="请输入 waterMul" style="width: 100%" />
                            <span v-else>{{ row.waterMul }}</span>
                        </el-form-item>
                    </template>
                </el-table-column>

                <el-table-column prop="maxAmount" label="最多赠送">
                    <template #default="{ row, $index }">
                        <el-form-item :prop="`localTableData.${$index}.maxAmount`" :rules="rules.maxAmount">
                            <el-input-number v-if="row.isEdit" v-model="row.maxAmount" :controls="false" :min="0"
                                placeholder="请输入 maxAmount" style="width: 100%" />
                            <span v-else>{{ row.maxAmount }}</span>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="{ row, $index }">
                        <el-button link type="primary" size="small" @click="toggleEdit(row)">
                            {{ row.isEdit ? '保存' : '修改' }}
                        </el-button>
                        <el-button link type="danger" v-if="$index !== 0" size="small" @click="handleDelete($index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button  type="success" size="small" @click="baseAdd()" style="margin-top: 20px;">
                新增
            </el-button>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ElForm } from 'element-plus';
import { ref, watch } from 'vue';

const props = defineProps<{
    tableData: any[];
}>();
const emits = defineEmits<{
    (e: 'update:tableData', data: any[]): void;
}>();

const formRef = ref<InstanceType<typeof ElForm> | null>(null);

// 本地副本，确保不直接修改 props
const localTableData = ref<any[]>([]);

// 初始化副本
watch(
    () => props.tableData,
    (newVal) => {
        localTableData.value = newVal.map(item => ({ ...item })); 
    },
    { immediate: true, deep: true }
);

// 表单校验规则
const rules = {
    amount: [{ required: true, message: '请输入金额', trigger: 'blur' }],
    maxAmount: [{ required: true, message: '请输入最多赠送', trigger: 'blur' }],
    waterMul: [{ required: true, message: '请输入多送流水倍数要求', trigger: 'blur' }],
    rate: [{ required: true, message: '请输入多送比例', trigger: 'blur' }],
};

// 切换编辑状态
const toggleEdit = (row: any) => {
    row.isEdit = !row.isEdit;
    emits('update:tableData', localTableData.value); //  用 localTableData 而不是 props.tableData
};

// 新增一行
const baseAdd = () => {
    localTableData.value.push({
        amount: 0,
        rate: 0,
        waterMul: 0,
        maxAmount: 0,
        isEdit: true,
    });
    emits('update:tableData', localTableData.value); //  emit 本地值
};

// 删除一行
const handleDelete = (index: number) => {
    localTableData.value.splice(index, 1);
    emits('update:tableData', localTableData.value);
};
</script>


<style scoped>
::v-deep .el-form-item {
    margin-bottom: 0;

}
</style>