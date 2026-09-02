<!-- 搜索表单 -->
<template>
    <ele-card :body-style="{ paddingBottom: '2px' }">
        <el-form  @keyup.enter="search" @submit.prevent="">
            <el-row :gutter="8">
                <!-- <el-col   :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="id">
                        <el-input  clearable  v-model.trim="form.id"  placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
                <el-col   :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="sender">
                        <el-input  clearable  v-model.trim="form.sender"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col   :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="名称">
                        <el-input  clearable  v-model.trim="form.name"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="请求地址">
                        <el-input  clearable  v-model.trim="form.url"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="请求apikey">
                        <el-input  clearable  v-model.trim="form.apikey"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="请求密钥">
                        <el-input  clearable  v-model.trim="form.apisecret"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <!-- <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="附加信息">
                        <el-input  clearable  v-model.trim="form.extend"  placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="国家列表">
                        <el-input  clearable  v-model.trim="form.countryCodes"  placeholder="请输入" />
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
    import type { SmsChannelParam } from '@/api/platform/model/smsChannel';

    const emit = defineEmits<{
      (e: 'search', where?: SmsChannelParam): void;
    }>();
    /** 表单数据 */
    const [form, resetFields] = useFormData<SmsChannelParam>({
          id:undefined,
          sender:undefined,
          name:"",
          sortNumber:undefined,
          url:"",
          apikey:"",
          apisecret:"",
          extend:undefined,
          countryCodes:undefined,
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
