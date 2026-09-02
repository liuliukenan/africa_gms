<template>
  <ele-card :bordered="false" style="margin: 20px" body-class="card">
    <template #header>
      <div class="card-header" style="display: flex; width: 100%; justify-content: space-between; align-items: center">
        <span style="font-weight: bold; font-size: 20px">Bitcom配置</span>
        <el-popconfirm title="确认发送到服务器吗？" @confirm="sendServer()">
          <template #reference>
            <el-button type="danger" class="ele-btn-icon">
              <span>发送</span>
            </el-button>
          </template>
        </el-popconfirm>
      </div>
    </template>
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-table :data="form.bitcomConfList" stripe style="width: 100%; margin-top: 20px">
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column prop="key" label="键名">
          <template #default="{ row, $index }">
            <el-form-item :prop="'bitcomConfList.' + $index + '.key'" :rules="rules.key">
              <el-input v-if="row.isEdit" clearable placeholder="请输入键名" v-model.trim="row.key" style="width: 100%" />
              <span v-else>{{ row.key }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址">
          <template #default="{ row, $index }">
            <el-form-item :prop="'bitcomConfList.' + $index + '.address'" :rules="rules.address">
              <el-input v-if="row.isEdit" clearable placeholder="请输入地址" v-model.trim="row.address" style="width: 100%" />
              <span v-else>{{ row.address }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row, $index }">
            <el-button link type="primary" size="small" @click="handleFinish(row, $index)">
              {{ row.isEdit ? '完成' : '修改' }}
            </el-button>
            <el-popconfirm title="确定要删除此记录吗？" @confirm="baseRemove($index)">
              <template #reference>
                <el-button link type="danger" size="small">删除 </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-button block style="margin-top: 16px; width: 70%" @click="baseAdd">
      <el-icon>
        <Plus />
      </el-icon>
      <span>新增</span>
    </el-button>
  </ele-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getBitcomConf, saveBitcomConf } from '@/api/platform/bitcomConfApi';
import { EleMessage, uuid } from 'ele-admin-plus/es';
import { Plus } from '@element-plus/icons-vue';
import { ElForm } from 'element-plus';
import type { BitcomConf, BitcomConfItem } from '@/api/platform/bitcomConfApi';
import { sendConfServer } from '@/api/conf';

const form = ref<BitcomConf>({
  jsonType: 'BitcomConf',
  bitcomConfList: []
});

const formRef = ref<InstanceType<typeof ElForm> | null>(null);

const rules = {
  key: [{ required: true, message: '请输入键名', trigger: 'blur' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }]
};

// 获取信息
const loadingBitcomConf = () => {
  getBitcomConf().then((data) => {
    form.value.bitcomConfList = data?.bitcomConfList ? [...data?.bitcomConfList] : [];
  });
};

loadingBitcomConf();

// 修改/完成
const handleFinish = (row: BitcomConfItem, index: number) => {
  if (row.isEdit) {
    // 手动触发验证
    formRef.value?.validateField(`bitcomConfList.${index}.key`, async (valid: boolean) => {
      if (!valid) {
        return;
      }

      formRef.value?.validateField(`bitcomConfList.${index}.address`, async (valid: boolean) => {
        if (!valid) {
          return;
        }

        row.isEdit = false;

        // 保存数据
        const loading = EleMessage.loading({ message: '请求中..', plain: true });
        saveBitcomConf(form.value)
          .then((msg) => {
            loading.close();
            EleMessage.success(msg);
            loadingBitcomConf();
          })
          .catch((e) => {
            loading.close();
            EleMessage.error(e.message);
          });
      });
    });
  } else {
    row.isEdit = true;
  }
};

// 发送到服务器
const sendServer = () => {
  const loading = EleMessage.loading({ message: '请求中..', plain: true });
  sendConfServer(4)
    .then((msg) => {
      loading.close();
      EleMessage.success(msg);
      loadingBitcomConf();
    })
    .catch((e) => {
      loading.close();
      EleMessage.error(e.message);
    });
};

// 删除
const baseRemove = (index: number) => {
  form.value.bitcomConfList!.splice(index, 1);
  saveBitcomConf(form.value).then(() => {
    loadingBitcomConf();
  });
};

// 新增
const baseAdd = () => {
  form.value.bitcomConfList!.push({
    key: uuid(8),
    isEdit: true,
    address: undefined
  });
};
</script>
<style lang="scss" scoped>
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

  .tips {
    color: var(--el-color-danger);
  }
</style>
