<!-- 搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <!-- <el-col   :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="ID">
                        <el-input  clearable  v-model.trim="form.id"  placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
        <!-- <el-col   :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="配置id">
                        <el-input  clearable  v-model.trim="form.announcementConfId"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col   :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="播放次数">
                        <el-input  clearable  v-model.trim="form.playCnt"  placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
        <!-- <el-col   :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="游戏名称">
                        <el-input  clearable  v-model.trim="form.gameName"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="游戏id">
                        <el-input  clearable  v-model.trim="form.gameId"  placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
        <!-- <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="用户id">
                        <el-input  clearable  v-model.trim="form.uid"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="运营标识名称">
                        <el-input  clearable  v-model.trim="form.title"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="是否启用">
                        <el-input  clearable  v-model.trim="form.state"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="总推送次数，-1 表示不限">
                        <el-input  clearable  v-model.trim="form.totalCount"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="推送间隔（分钟）">
                        <el-input  clearable  v-model.trim="form.timeLen"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="已推送次数">
                        <el-input  clearable  v-model.trim="form.sendCount"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="下次推送时间戳（ms）">
                        <el-input  clearable  v-model.trim="form.nextTime"  placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
        <el-col :lg="6" :md="12" :sm="12" :xs="24">
          <el-form-item label-width="16px">
            <el-button type="primary" @click="search">查询</el-button>
            <el-button @click="reset">重置</el-button>
            <!-- <el-link
                                type="primary"
                                :underline="false"
                                @click="toggleExpand"
                                style="margin-left: 12px"
                        >
                            <template v-if="searchExpand">
                                <span>收起</span>
                                <el-icon style="vertical-align: -1px">
                                    <ArrowUp />
                                </el-icon>
                            </template>
                            <template v-else>
                                <span>展开</span>
                                <el-icon style="vertical-align: -2px">
                                    <ArrowDown />
                                </el-icon>
                            </template>
                        </el-link> -->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </ele-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useFormData } from '@/utils/use-form-data';
  import type { AnnouncementRunParam } from '@/api/push/model/announcementRun';

  const emit = defineEmits<{
    (e: 'search', where?: AnnouncementRunParam): void;
  }>();
  /** 表单数据 */
  const [form, resetFields] = useFormData<AnnouncementRunParam>({
    announcementConfId: undefined,
    title: ''
  });

  /** 搜索 */
  const search = () => {
    emit('search', { ...form });
  };

  /**  重置 */
  const reset = () => {
    resetFields();
    search();
  };
</script>
