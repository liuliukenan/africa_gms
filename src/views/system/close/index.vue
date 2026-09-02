<template>
  <el-card :body-style="{ padding: '70px' }" style="padding: 5px; width: 100%; ">
    <template #header>关服</template>
    <el-form ref="formRef" :model="form">
      <el-form-item label="指令" prop="code">
        <el-input v-model="form.code" placeholder="请输入指令" style="width: 40%;" />
      </el-form-item>
      <div style="width: 100%; text-align: left; margin-top: 40px">
        <el-button type="primary" @click="save()" size="large">确认</el-button>
      </div>
    </el-form>
    <div v-if="messages&&messages.length">
      <el-divider></el-divider>
      <div>消息列表：</div>
      <div style="margin: 5px 10px" v-for="(item, index) in messages" :key="index">
        {{ item }}
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue';
import { serverClose } from '@/api/system/close/index';
import { EleMessage } from 'ele-admin-plus/es';
let form = ref({
  code: undefined
});

const loading = ref(false);
loading.value = true;
const messages = ref([]);

const save = () => {
  if (!form.value.code) {
    EleMessage.error('请输入关服指令');
    return;
  }
  loading.value = true;
  serverClose(form.value)
    .then((data) => {
      loading.value = false;
      if (data.length > 10) {
        data.slice(0, 10);
      }

      messages.value = data.slice(-10);
      setTimeout(function () {
        save();
      }, 3000);
    })
    .catch((e) => {
      loading.value = false;
      if (messages.value.length > 0) {
        messages.value.push('所有服务已关闭,可以更新服务了!');
      } else {
        EleMessage.error(e.message);
      }
    });
};
</script>


<style lang="scss" scoped></style>