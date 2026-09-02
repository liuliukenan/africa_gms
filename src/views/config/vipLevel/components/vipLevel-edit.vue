<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form width="60%" v-model="visible" :title="isUpdate ? '修改Vip等级配置' : '新建Vip等级配置'" @open="handleOpen">
        <el-form ref="formRef" :model="form" :rules="rules" @submit.prevent="">
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                    <el-form-item label="VIP等级" prop="vip">
                        <dict-data code="vipLevel" v-model="form.vip" valueType="number" placeholder="请选择VIP等级" />
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="title">升级到本级需求</div>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                    <el-form-item label="充值金额" prop="amount">
                        <el-input-number clearable v-model="form.amount" placeholder="请输入充值金额"
                        :controls="false" :precision="2" :min="0"  style="width: 100%" />
                    </el-form-item>
                </el-col>
                <el-col :sm="12" :xs="12">
                    <el-form-item label="总流水" prop="flow">
                        <el-input-number clearable v-model="form.flow" placeholder="请输入总流水"
                        :controls="false" :precision="2" :min="0"  style="width: 100%" />
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="title">等级奖励</div>
            <div class="box">
                <!-- 表格 -->
                <el-table :data="form.tableData" border class="table">
                    <el-table-column type="index" label="序号" width="70" align="center" />
                    <el-table-column prop="gameChanel" label="奖励类型">
                        <template #default="{ row, $index }">
                            <el-form-item :prop="'tableData.' + $index + '.gameChanel'">
                                <dict-data v-if="row.isEdit" code="gameChanel" valueType="number" placeholder="请选择奖励类型"
                                    v-model="row.gameChanel" />
                                <span v-else> {{ row.gameChanel }}</span>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column prop="condition" label="奖励条件">
                        <template #default="{ row, $index }">
                            <el-form-item :prop="'tableData.' + $index + '.condition'">
                                <dict-data v-if="row.isEdit" code="awardCondition" valueType="number" placeholder="请选择奖励条件"
                                    v-model="row.condition" />
                                <span v-else> {{ row.condition }}</span>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column prop="conditionNum" label="奖励条件数量">
                        <template #default="{ row, $index }">
                            <el-form-item :prop="'tableData.' + $index + '.conditionNum'" style="margin-bottom: 0">
                                <el-input-number v-if="row.isEdit" clearable v-model="row.conditionNum" placeholder="请输入奖励条件数量"
                                    :controls="false" :precision="2" :min="0"  style="width: 100%" />
                                <div v-else>{{ row.conditionNum }}%</div>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column prop="moneytype" label="奖励类型">
                        <template #default="{ row, $index }">
                            <el-form-item :prop="'tableData.' + $index + '.moneytype'">
                                <dict-data v-if="row.isEdit" code="moneytype" valueType="number" placeholder="请选择奖励类型"
                                    v-model="row.moneytype" />
                                <span v-else> {{ row.moneytype }}</span>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column prop="awardNum" label="奖励数量">
                        <template #default="{ row, $index }">
                            <el-form-item :prop="'tableData.' + $index + '.awardNum'" style="margin-bottom: 0">
                                <el-input-number v-if="row.isEdit" clearable v-model="row.awardNum" placeholder="请输入奖励数量"
                                    :controls="false" :precision="2" :min="0"  style="width: 100%" />
                                <div v-else>{{ row.awardNum }}%</div>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template #default="{ row, $index }">
                            <div style="display: inline; align-items: center">
                                <el-link :type="row.isEdit ? 'success' : 'primary'" :underline="false"
                                    @click="edit(row, $index, i)">{{ row.isEdit ? '完成' : '修改' }}
                                </el-link>
                                <el-divider direction="vertical" style="margin: 0 8px" />
                                <el-button link type="danger" size="small" @click="remove($index, i)">删除</el-button>
                            </div>
                        </template>
                    </el-table-column>

                </el-table>
                <el-button block style="margin-top: 16px; width: 100%" @click="addChannel(i)">
                    <el-icon>
                        <Plus />
                    </el-icon>
                    <span>新增渠道</span>
                </el-button>
            </div>
        </el-form>
        <template #footer>
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" :loading="loading" @click="save"> 保存 </el-button>
        </template>
    </ele-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { EleMessage } from 'ele-admin-plus/es';
import { Delete, Plus } from '@element-plus/icons-vue';
import { useFormData } from '@/utils/use-form-data';
import { addVipLevel, updateVipLevel } from '@/api/config/vipLevelApi';
import type { VipLevel, VipLevelParam } from '@/api/model/vipLevel';
const props = defineProps<{
    /** 修改回显的数据 */
    data?: VipLevel | null;
}>();

const emit = defineEmits<{
    (e: 'done'): void;
}>();

/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });

/** 是否是修改 */
const isUpdate = ref(false);

/** 提交状态 */
const loading = ref(false);

/** 表单实例 */
const formRef = ref<FormInstance | null>(null);

/** 表单数据 */
const [form, resetFields, assignFields] = useFormData<VipLevel>({
    amount: undefined,
    vip: undefined,
    flow: undefined,
    tableData: [
        {
            gameChanel: undefined,
            reback: undefined,
            isEdit: true
        }
    ]
       
});

/** 表单验证规则 */
const rules = reactive<FormRules>({
    // vip: [
    //     {
    //         required: true,
    //         type: 'number',
    //         message: '请选择VIP等级',
    //         trigger: 'blur'
    //     }
    // ],
    itemTable: [
        {
            validator: (rule, value, callback) => {
                if (!Array.isArray(value)) {
                    callback(new Error('游戏类型不能为空'));
                    return;
                }

                for (let i = 0; i < value.length; i++) {
                    const item = value[i];
                    if (!item.gameType) {
                        callback(new Error(`第 ${i + 1} 行游戏类型不能为空`));
                        return;
                    }

                    if (!Array.isArray(item.tableData)) {
                        callback(new Error(`第 ${i + 1} 行游戏渠道数据不完整`));
                        return;
                    }

                    for (let j = 0; j < item.tableData.length; j++) {
                        const tableRow = item.tableData[j];
                        if (tableRow.isEdit && (tableRow.gameChanel === undefined || tableRow.reback === undefined)) {
                            callback(new Error(`第 ${i + 1} 行第 ${j + 1} 列数据未填写完整`));
                            return;
                        }
                    }
                }

                callback();
            },
            trigger: 'change'
        }
    ]
});
const addChannel = (index: number) => {
    form.itemTable![index].tableData?.push(
        {
            gameChanel: undefined,
            reback: undefined,
            isEdit: true
        }
    )
};
/** 删除 */
const delType = (index: number) => {
    if (form.itemTable! && form.itemTable.length == 1) return EleMessage.warning('请至少保留一个游戏类型');
    form.itemTable!.splice(index, 1);
};
const remove = (rowIndex: number, itemIndex: number) => {
    if (form.itemTable![itemIndex].tableData && form.itemTable![itemIndex].tableData.length == 1) return EleMessage.warning('请至少保留一个渠道');
    const currentTableData = form.itemTable![itemIndex].tableData || [];
    currentTableData.splice(rowIndex, 1);
};
const edit = (row: VipLevelTableData, rowIndex: number, tableIndex: number) => {

    if (row.isEdit && !row.reback || !row.gameChanel) {
        EleMessage.warning(`第${tableIndex + 1}个游戏类型的第 ${rowIndex + 1} 行的游戏渠道或返利百分比不能为空`);
        return;
    } else {
        row.isEdit = !row.isEdit;
    }

};
/** 关闭弹窗 */
const handleCancel = () => {
    visible.value = false;
};

/** 保存编辑 */
const save = () => {
    formRef.value?.validate?.((valid) => {
        if (!valid) return;
        if (!Array.isArray(form.itemTable)) return;
        for (let i = 0; i < form.itemTable.length; i++) {
            const tableData = form.itemTable[i].tableData || [];
            for (let j = 0; j < tableData.length; j++) {
                if (tableData[j].gameChanel === undefined) {
                    EleMessage.warning(`第${i + 1}个游戏类型的第 ${j + 1} 行 游戏渠道不能为空`);
                    return;
                }
                const rebackValue = tableData[j].reback;
                if (!rebackValue) {
                    EleMessage.warning(`第${i + 1}个游戏类型的第 ${j + 1} 行 返利百分比 不能为空`);
                    return;
                }
                if ((rebackValue < 0 || rebackValue > 1)) {
                    EleMessage.warning(`第${i + 1}个游戏类型的第 ${j + 1} 行 返利百分比 不能小于0或大于1`);
                    return;
                }
            }

        }
        // console.log(1111);
        // return
        loading.value = true;
        const saveOrUpdate = isUpdate.value ? updateVipLevel : addVipLevel;
        saveOrUpdate(form)
            .then((msg) => {
                loading.value = false;
                EleMessage.success(msg);
                handleCancel();
                emit('done');
            })
            .catch((e) => {
                loading.value = false;
                EleMessage.error(e.message);
            });
    });
};
const originAwards = ref<VipLevelTableData[]>([]);
/** 弹窗打开事件 */
const handleOpen = () => {
    if (props.data) {
        let obj = JSON.parse(JSON.stringify(props.data));
        assignFields({ ...obj });
        // originAwards.value = form.awards!;
        isUpdate.value = true;
    } else {
        resetFields();
        isUpdate.value = false;
    }
    nextTick(() => {
        nextTick(() => {
            formRef.value?.clearValidate?.();
        });
    });
};
</script>
<style lang="scss" scoped>
.box {
    border: 2px solid #eee;
    padding: 10px;
    margin-bottom: 10px;
}

::v-deep .table .el-form-item {
    margin-bottom: 0;
}

.awards {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 30px;
    margin-bottom: 20px;

    .title {
        font-weight: bold;
        font-size: 17px;
    }
}

.editable-table :deep(.editable-table-cell) {
    position: static;

    &>.cell {
        overflow: visible;
    }
}

.editable-cell-text {
    width: 100%;
    min-height: 32px;
    box-sizing: border-box;
}

.form-error-popper.is-error .editable-cell-text {
    // border: 1px dashed var(--el-color-danger);
    border-radius: var(--el-border-radius-base);
}

/* 表单验证气泡形式 */
.form-error-popper.el-form-item> :deep(.el-form-item__content) {
    &>.el-form-item__error {
        position: absolute;
        left: 0;
        top: auto;
        bottom: calc(100% + 6px);
        width: max-content;
        color: #fff;
        font-size: 12px;
        background: var(--el-color-danger);
        transition: all 0.2s;
        padding: 10px;
        border-radius: 4px;
        z-index: 999;
        transform: none;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;

        &:after {
            content: '';
            border: 6px solid transparent;
            border-top-color: var(--el-color-danger);
            position: absolute;
            left: 12px;
            bottom: -11px;
        }
    }

    &:hover>.el-form-item__error {
        opacity: 1;
        visibility: visible;
        pointer-events: all;
    }
}

/* 第一行气泡显示在下 */
.editable-table :deep(tbody > tr:first-child) {
    .el-form-item>.el-form-item__content>.el-form-item__error {
        bottom: auto;
        top: calc(100% + 6px);

        &:after {
            top: -11px;
            bottom: auto;
            border-bottom-color: var(--el-color-danger);
            border-top-color: transparent;
        }
    }

    /* 只有一行时气泡显示在右 */
    &:last-child {
        .el-form-item>.el-form-item__content>.el-form-item__error {
            top: 50%;
            right: auto;
            left: calc(100% + 6px);
            transform: translateY(-50%);

            &:after {
                top: auto;
                left: -11px;
                border-bottom-color: transparent;
                border-right-color: var(--el-color-danger);
            }
        }

        /* 最后一个单元格气泡显示在左 */
        &>td:last-child {
            .el-form-item>.el-form-item__content>.el-form-item__error {
                left: auto;
                right: calc(100% + 6px);

                &:after {
                    left: auto;
                    right: -11px;
                    border-right-color: transparent;
                    border-left-color: var(--el-color-danger);
                }
            }
        }
    }
}
</style>