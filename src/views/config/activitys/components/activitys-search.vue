<!-- 搜索表单 -->
<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form  @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <el-col   :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="id">
                        <el-input  clearable  v-model.trim="form.id"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col   :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="秒">
                        <el-input  clearable  v-model.trim="form.intervalTime"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col   :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="类型 0跑马灯1弹窗">
                        <el-input  clearable  v-model.trim="form.type"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="code">
                        <el-input  clearable  v-model.trim="form.code"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="下次时间">
                        <el-input  clearable  v-model.trim="form.nextTime"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="总次数">
                        <el-input  clearable  v-model.trim="form.totalCount"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="已发次数">
                        <el-input  clearable  v-model.trim="form.sendCount"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="zh">
                        <el-input  clearable  v-model.trim="form.zh"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="en">
                        <el-input  clearable  v-model.trim="form.en"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="th">
                        <el-input  clearable  v-model.trim="form.th"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="mm">
                        <el-input  clearable  v-model.trim="form.mm"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="my">
                        <el-input  clearable  v-model.trim="form.my"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="vn">
                        <el-input  clearable  v-model.trim="form.vn"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="indon">
                        <el-input  clearable  v-model.trim="form.indon"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="状态">
                        <el-input  clearable  v-model.trim="form.status"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :lg="8" :md="12" :sm="12" :xs="24">
                    <el-form-item label-width="16px">
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button @click="reset">重置</el-button>
                        <el-link
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
                        </el-link>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </ele-card>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { ArrowDown, ArrowUp } from '@/components/icons';
    import { useFormData } from '@/utils/use-form-data';
    import type { AnnouncementParam } from '@/api/model/announcement';

    const emit = defineEmits<{
      (e: 'search', where?: AnnouncementParam): void;
    }>();
    /** 表单数据 */
    const [form, resetFields] = useFormData<AnnouncementParam>({
          id:undefined,
          intervalTime:undefined,
          type:undefined,
          code:undefined,
          nextTime:undefined,
          totalCount:undefined,
          sendCount:undefined,
          zh:"",
          en:"",
          th:"",
          mm:"",
          my:"",
          vn:"",
          indon:"",
          status:undefined
    });


    /** 搜索表单是否展开 */
    const searchExpand = ref(false);

    /** 搜索 */
    const search = () => {
      emit('search', {...form});
    };

    /**  重置 */
    const reset = () => {
      resetFields();
      search();
    };

    /** 搜索展开/收起 */
    const toggleExpand = () => {
      searchExpand.value = !searchExpand.value;
    };
</script>
