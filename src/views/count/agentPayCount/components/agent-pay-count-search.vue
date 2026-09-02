<!-- 搜索表单 -->
<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form  @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <!-- <el-col   :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="主键">
                        <el-input  clearable  v-model.trim="form.id"  placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
                <el-col   :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="代理id">
                        <el-input  clearable  v-model.trim="form.ukey"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <!-- <el-col   :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="日期">
                        <el-input  clearable  v-model.trim="form.daykey"  placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="发送类型">
                        <el-input  clearable  v-model.trim="form.fromType"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="接收类型">
                        <el-input  clearable  v-model.trim="form.toType"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <!-- <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="金币金额">
                        <el-input  clearable  v-model.trim="form.goldAmount"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="金币次数">
                        <el-input  clearable  v-model.trim="form.goldTimes"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="钻石金额">
                        <el-input  clearable  v-model.trim="form.diamondAmount"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="钻石次数">
                        <el-input  clearable  v-model.trim="form.diamondTimes"  placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
                <el-col :lg="4" :md="12" :sm="12" :xs="24">
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
    // import { ArrowDown, ArrowUp } from '@/components/icons';
    import { useFormData } from '@/utils/use-form-data';
    import type { AgentPayCountParam } from '@/api/count/model/agentPayCount';

    const emit = defineEmits<{
      (e: 'search', where?: AgentPayCountParam): void;
    }>();
    /** 表单数据 */
    const [form, resetFields] = useFormData<AgentPayCountParam>({
          id:undefined,
        //   ukey:undefined,
        //   daykey:undefined,
        //   fromType:undefined,
        //   toType:undefined,
        //   goldAmount:undefined,
        //   goldTimes:undefined,
        //   diamondAmount:undefined,
        //   diamondTimes:null
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
