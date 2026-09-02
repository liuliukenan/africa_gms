<!-- 搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <!-- 常驻字段 -->
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="国家">
            <el-select v-model="form.countryCode" placeholder="请选择" style="width: 100%" @change="search">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code || ''" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="渠道ID">
            <el-input v-model.trim="form.channel" placeholder="请输入渠道ID" clearable />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="渠道名称">
            <el-input v-model.trim="form.channelName" placeholder="请输入渠道名称" clearable />
          </el-form-item>
        </el-col>
        <!-- <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="渠道名称">
            <el-select v-model="form.channelName" placeholder="请选择渠道" style="width: 100%" clearable @change="search" filterable>
              <el-option v-for="item in configStore.ShareChannelArr" :key="item.id" :label="item.channelName" :value="item.channel || 0" />
            </el-select>
          </el-form-item>
        </el-col> -->
        <!-- 展开字段 -->
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="手机号">
            <el-input v-model.trim="form.phone" placeholder="请输入手机号" clearable />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="分享链接">
            <el-input v-model.trim="form.shareUrl" placeholder="请输入分享链接" clearable />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="组别">
            <el-select v-model="form.groupId" placeholder="请选择组别" style="width: 100%" clearable>
              <el-option v-for="item in groupOptions" :key="item.id" :label="item.groupName" :value="item.id ?? ''" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="在职状态">
            <el-select v-model="form.resigned" placeholder="请选择在职状态" style="width: 100%" clearable>
              <el-option label="在职" :value="0" />
              <el-option label="离职" :value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="渠道类型">
            <dict-data code="channelNewType" valueType="number" v-model="form.channelType" />
          </el-form-item>
        </el-col>

        <!-- 操作按钮列 -->
        <el-col :lg="6" :md="12" :sm="12" :xs="24">
          <el-form-item label-width="16px">
            <el-button type="primary" @click="search">查询</el-button>
            <el-button @click="reset">重置</el-button>
            <el-link type="primary" :underline="false" @click="toggleExpand" style="margin-left: 12px">
              <template v-if="searchExpand">
                <span>收起</span>
                <el-icon style="vertical-align: -1px"><ArrowUp /></el-icon>
              </template>
              <template v-else>
                <span>展开</span>
                <el-icon style="vertical-align: -2px"><ArrowDown /></el-icon>
              </template>
            </el-link>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </ele-card>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { ArrowDown, ArrowUp } from '@/components/icons';
  import { useFormData } from '@/utils/use-form-data';
  import type { ShareChannel } from '@/api/platform/model/shareChannel';
  import type { ChannelGroupVO } from '@/api/platform/model/channelGroup';
  import { useConfigStore } from '@/store/modules/config';
  import { getChannelGroupOptions } from '@/api/platform/channelGroupApi';

  const emit = defineEmits<{
    (e: 'search', where?: ShareChannel): void;
  }>();
  const props = defineProps<{
    /** 修改回显的数据 */
    groupOptions: ChannelGroupVO[];
  }>();
  const configStore = useConfigStore();

  const [form, resetFields] = useFormData<ShareChannel>({
    countryCode: configStore.countryArr?.[0]?.code || undefined,
    channel: undefined,
    channelName: undefined,
    channelType: undefined,
    phone: undefined,
    shareUrl: undefined,
    groupId: undefined,
    resigned: undefined
  });

  const searchExpand = ref(false);
  // const groupOptions = ref<ChannelGroupVO[]>([]);

  // onMounted(() => {
  //     getChannelGroupOptions()
  //         .then((data) => {
  //             groupOptions.value = data || [];
  //         })
  //         .catch(() => {});
  // });

  const search = () => {
    emit('search', { ...form });
  };

  const reset = () => {
    resetFields();
    search();
  };

  const toggleExpand = () => {
    searchExpand.value = !searchExpand.value;
  };

  const searchParams = () => {
    return { ...form };
  };

  defineExpose({ searchParams });
</script>
