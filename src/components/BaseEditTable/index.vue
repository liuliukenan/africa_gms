<template>
    <ele-card :bordered="false" body-class="cards">
        <template #header>
            <div class="card-header" style="display: flex; width: 100%; align-items: center">
                <span style="font-weight: bold; font-size: 20px">{{ title }}</span>
                <el-button type="primary" class="ele-btn-icon" style="margin-left: 20px;" @click="baseAdd">
                    <el-icon>
                        <Plus />
                    </el-icon>新增
                </el-button>
            </div>
        </template>

        <el-form :model="form" :rules="rules" ref="formRef">
            <el-table :data="form.tableData" stripe style="width: 100%; margin-top: 20px" border>
                <el-table-column type="index" label="序号" width="70" />

                <template v-for="(col, idx) in columns" :key="idx">
                    <el-table-column :label="col.label" :prop="col.prop">
                        <template #default="{ row, $index }">
                            <el-form-item :prop="'tableData.' + $index + '.' + col.prop" :rules="rules[col.prop]">
                                <div v-if="row.isEdit" style="width: 100%">
                                    <!-- 输入框 -->
                                    <el-input v-if="col.type == 'txt'" :placeholder="col.placeholder || '请输入内容'"
                                        v-model.trim="row[col.prop]" />
                                    <!-- 下拉框 -->
                                    <dict-data v-else-if="col.type == 'select'" :code="col.code" valueType="number"
                                        v-model="col.prop" style="width: 100%" />
                                    <!-- 数字框 -->
                                    <el-input-number v-else :controls="false" :placeholder="col.placeholder || '请输入内容'"
                                        v-model.trim="row[col.prop]" />


                                </div>
                                <span v-else>{{ row[col.prop] }}</span>
                            </el-form-item>
                        </template>
                    </el-table-column>
                </template>

                <el-table-column label="操作" width="160">
                    <template #default="{ row, $index }">
                        <el-button link type="primary" size="small" @click="handleFinish(row)">
                            {{ row.isEdit ? '完成' : '修改' }}
                        </el-button>
                        <el-popconfirm title="确定要删除此记录吗？" @confirm="baseRemove(row)" width="200px">
                            <template #reference>
                                <el-button link type="danger" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
    </ele-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { EleMessage, uuid } from 'ele-admin-plus/es'
import { Plus } from '@element-plus/icons-vue'
import { ElForm } from 'element-plus'

interface ColumnItem {
    label: string
    prop: string
    placeholder?: string,
    type?: string
    code?: string
}

interface RowItem {
    [key: string]: any
    isEdit?: boolean
    key?: string
}

interface Props {
    title: string
    columns: ColumnItem[]
    getListApi: () => Promise<{ tableData: RowItem[] }>
    saveApi: (data: any) => Promise<string>
    deleteApi?: (data: RowItem[]) => Promise<string | void>
}

const props = defineProps<Props>()

const form = ref({
    tableData: [] as RowItem[]
})
const formRef = ref<InstanceType<typeof ElForm> | null>(null)

const rules: Record<string, any> = {}
props.columns.forEach(col => {
    rules[col.prop] = [{ required: true, message: `请输入${col.label}`, trigger: 'blur' }]
})

const loadData = () => {
    props.getListApi().then((data) => {
        form.value.tableData = data ? data : []
    })
}

onMounted(() => {
    loadData()
})

const handleFinish = (row: RowItem) => {
    if (row.isEdit) {
        formRef.value?.validate((valid) => {
            if (valid) {
                row.isEdit = false
                saveRow(row)  // 每次保存当前行
            }
        })
    } else {
        row.isEdit = true
    }
}

const saveRow = (row: RowItem) => {
    const loading = EleMessage.loading({ message: '请求中..', plain: true })
    props.saveApi(row)
        .then((msg) => {
            loading.close()
            EleMessage.success(msg)
            loadData()
        })
        .catch((e) => {
            loading.close()
            EleMessage.error(e.message)
        })
}

const baseRemove = (row: any) => {
    if (props.deleteApi) {
        props.deleteApi(row).then(() => save())
    } else {
        save()
    }
}

const baseAdd = () => {
    const newItem: RowItem = {
        key: uuid(8),
        isEdit: true
    }
    props.columns.forEach(col => {
        newItem[col.prop] = undefined
    })
    form.value.tableData.push(newItem)
}
</script>

<style scoped lang="scss">
.cards {
    padding: 0;
}

:deep(.el-form-item__error) {
    color: var(--el-color-danger);
    font-size: 12px;
    line-height: 1;
    padding-top: 2px;
    position: absolute;
    top: 28% !important;
    left: 60% !important;
}

.el-form-item {
    margin-bottom: 0 !important;
}
</style>