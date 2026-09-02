<template>
  <ele-modal form :width="580" v-model="visible" title="新增玩家绑定" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="110px" @submit.prevent>
      <el-form-item label="玩家UID" prop="uid">
        <div class="uid-row">
          <el-input-number v-model="form.uid" :min="1" :controls="false" style="width: 100%" />
          <el-button :loading="querying" @click="queryUser">查询玩家</el-button>
        </div>
      </el-form-item>
      <el-form-item label="玩家手机号">
        <el-input :model-value="user?.phone || ''" disabled placeholder="请先查询玩家" />
      </el-form-item>
      <el-form-item label="绑定状态">
        <el-tag v-if="user?.bound" type="danger">已绑定，请先解绑</el-tag>
        <el-tag v-else-if="user" type="success">未绑定</el-tag>
        <span v-else class="empty-tip">请先查询玩家</span>
      </el-form-item>
      <el-form-item label="在线客服号" prop="kefuId">
        <el-select v-model="form.kefuId" filterable placeholder="请选择在线客服号" style="width: 100%">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.contact"
            :value="item.id!"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :loading="loading" :disabled="!user || user.bound" @click="save">
        确认绑定
      </el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
  import { nextTick, reactive, ref, watch } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { EleMessage } from 'ele-admin-plus/es';
  import { bindKefuPlayer, getKefuBindUser, getOnlineKefuOptions } from '@/api/config/kefuApi';
  import type { KefuBindParam, KefuBindUser, KefuRecord } from '@/api/model/kefu';

  const emit = defineEmits<{
    (e: 'done'): void;
  }>();

  const visible = defineModel({ type: Boolean });
  const formRef = ref<FormInstance>();
  const loading = ref(false);
  const querying = ref(false);
  const user = ref<KefuBindUser>();
  const options = ref<KefuRecord[]>([]);
  const form = reactive<Partial<KefuBindParam>>({
    uid: undefined,
    kefuId: undefined
  });
  const rules = reactive<FormRules>({
    uid: [{ required: true, message: '请输入玩家UID', trigger: 'blur' }],
    kefuId: [{ required: true, message: '请选择在线客服号', trigger: 'change' }]
  });

  const handleOpen = async () => {
    form.uid = undefined;
    form.kefuId = undefined;
    user.value = undefined;
    nextTick(() => formRef.value?.clearValidate());
    try {
      options.value = await getOnlineKefuOptions();
    } catch (e: any) {
      EleMessage.error(e.message);
    }
  };

  const queryUser = async () => {
    if (!form.uid) {
      EleMessage.warning('请输入玩家UID');
      return;
    }
    const queriedUid = form.uid;
    querying.value = true;
    try {
      const result = await getKefuBindUser(queriedUid);
      if (form.uid === queriedUid) {
        user.value = result;
      }
    } catch (e: any) {
      user.value = undefined;
      EleMessage.error(e.message);
    } finally {
      querying.value = false;
    }
  };

  const save = () => {
    formRef.value?.validate(async (valid) => {
      if (!valid || !user.value || user.value.bound || user.value.uid !== form.uid) return;
      loading.value = true;
      try {
        await bindKefuPlayer(form as KefuBindParam);
        EleMessage.success('绑定成功');
        visible.value = false;
        emit('done');
      } catch (e: any) {
        EleMessage.error(e.message);
      } finally {
        loading.value = false;
      }
    });
  };

  watch(
    () => form.uid,
    () => {
      user.value = undefined;
    }
  );
</script>

<style scoped>
  .uid-row {
    display: flex;
    gap: 8px;
    width: 100%;
  }
  .empty-tip {
    color: var(--el-text-color-secondary);
  }
</style>
