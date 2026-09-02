<!-- 搜索表单 -->
<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form  @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <el-col   :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="vip等级">
                        <el-input  clearable  v-model.trim="form.vipId"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <!-- <el-col   :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="充值金额">
                        <el-input  clearable  v-model.trim="form.payAmount"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col   :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="升级礼包">
                        <el-input  clearable  v-model.trim="form.upAmount"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="升级所需流水">
                        <el-input  clearable  v-model.trim="form.upWaterFlow"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="每周奖励">
                        <el-input  clearable  v-model.trim="form.weekReward"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="每周奖励所需流水">
                        <el-input  clearable  v-model.trim="form.weekWaterFlow"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="每月奖励">
                        <el-input  clearable  v-model.trim="form.monthReward"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="每月奖励流水">
                        <el-input  clearable  v-model.trim="form.monthWaterFlow"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="抽现手续折扣">
                        <el-input  clearable  v-model.trim="form.withdrawDiscount"  placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
                <el-col :lg="8" :md="12" :sm="12" :xs="24">
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
    import type { VipParam } from '@/api/model/vip';

    const emit = defineEmits<{
      (e: 'search', where?: VipParam): void;
    }>();
    /** 表单数据 */
    const [form, resetFields] = useFormData<VipParam>({
          vipId:undefined,
        //   payAmount:null,
        //   upAmount:null,
        //   upWaterFlow:null,
        //   weekReward:null,
        //   weekWaterFlow:null,
        //   monthReward:null,
        //   monthWaterFlow:null,
        //   withdrawDiscount:null
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
