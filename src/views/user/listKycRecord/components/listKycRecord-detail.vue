<!-- KYC详情弹窗 -->
<template>
    <ele-modal :width="880" v-model="visible" title="KYC详情" @open="handleOpen">
        <div v-loading="loading" class="detail-body">
            <el-descriptions v-if="detail" :column="2" border>
                <el-descriptions-item label="审核记录ID" :span="1">
                    {{ detail.id }}
                </el-descriptions-item>
                <el-descriptions-item label="用户ID" :span="1">
                    {{ detail.uid }}
                </el-descriptions-item>
                <el-descriptions-item label="国家" :span="1">
                    {{ countryName }}
                </el-descriptions-item>
                <el-descriptions-item label="真实姓名" :span="1">
                    {{ detail.realName || '-' }}
                </el-descriptions-item>
                <el-descriptions-item label="证件号" :span="2">
                    {{ detail.nationalId || '-' }}
                </el-descriptions-item>
                <el-descriptions-item label="已满18岁" :span="1">
                    <el-tag :type="detail.ageConfirmed ? 'success' : 'info'" size="small">
                        {{ detail.ageConfirmed ? '是' : '否' }}
                    </el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="审核状态" :span="1">
                     <dict-data code="kycStatus" v-model="detail.status" value-type="number" type="tag"/>
                </el-descriptions-item>
                <el-descriptions-item label="审核备注" :span="2">
                    {{ detail.handleRemark || '-' }}
                </el-descriptions-item>
                <el-descriptions-item label="审核人ID" :span="1">
                    {{ detail.handleBy ?? '-' }}
                </el-descriptions-item>
                <el-descriptions-item label="审核时间" :span="1">
                    {{ detail.handleTime ? toDateZone(detail.handleTime, detail.countryCode) : '-' }}
                </el-descriptions-item>
                <el-descriptions-item label="创建时间" :span="1">
                    {{ detail.createTime ? toDateZone(detail.createTime, detail.countryCode) : '-' }}
                </el-descriptions-item>
                <el-descriptions-item label="更新时间" :span="1">
                    {{ detail.updateTime ? toDateZone(detail.updateTime, detail.countryCode) : '-' }}
                </el-descriptions-item>
            </el-descriptions>

            <!-- 证件照片 -->
            <div v-if="detail" class="id-card-section">
                <div class="section-title">证件照片</div>
                <el-row :gutter="12">
                    <el-col :span="8">
                        <div class="id-card-image">
                            <div class="image-label">身份证正面</div>
                            <el-image v-if="images.idCardFront" :src="images.idCardFront"
                                style="width: 100%;"
                                :preview-src-list="[images.idCardFront]"
                                :preview-teleported="true"  />
                            <span v-else class="no-image">暂无</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="id-card-image">
                            <div class="image-label">身份证背面</div>
                            <el-image v-if="images.idCardBack" :src="images.idCardBack"
                                style="width: 100%;"
                                :preview-src-list="[images.idCardBack]"
                                :preview-teleported="true"  />
                            <span v-else class="no-image">暂无</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="id-card-image">
                            <div class="image-label">手持自拍</div>
                            <el-image v-if="images.selfie" :src="images.selfie"
                                style="width: 100%;"
                                :preview-src-list="[images.selfie]"
                                :preview-teleported="true"  />
                            <span v-else class="no-image">暂无</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>

        <template #footer>
            <el-button @click="handleCancel">关闭</el-button>
        </template>
    </ele-modal>
</template>

<script lang="ts" setup>
import { ref, computed, shallowReactive } from 'vue';
import { EleMessage } from 'ele-admin-plus/es';
import { getKycRecordById, getKycImage } from '@/api/user/listKycRecordApi';
import type { ListKycRecordVO } from '@/api/user/model/listKycRecord';
import { toDateZone } from '@/utils/utils';
import { useConfigStore } from '@/store/modules/config';

const props = defineProps<{
    /** 记录ID */
    id?: number | null;
}>();

/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });

const configStore = useConfigStore();

/** 加载状态 */
const loading = ref(false);

/** 详情数据 */
const detail = ref<ListKycRecordVO | null>(null);

/** 证件照片 blob URLs */
const images = shallowReactive<{ idCardFront: string; idCardBack: string; selfie: string }>({
    idCardFront: '',
    idCardBack: '',
    selfie: ''
});

/** 弹窗关闭时清理 blob URLs */
const revokeImages = () => {
    if (images.idCardFront) URL.revokeObjectURL(images.idCardFront);
    if (images.idCardBack) URL.revokeObjectURL(images.idCardBack);
    if (images.selfie) URL.revokeObjectURL(images.selfie);
    images.idCardFront = '';
    images.idCardBack = '';
    images.selfie = '';
};

/** 国家名称 */
const countryName = computed(() => {
    if (!detail.value) return '-';
    return configStore.countryArr?.find(
        (item: { code: number; name: string }) => item.code === detail.value?.countryCode
    )?.name || detail.value.countryCode || '-';
});

/** 弹窗打开时加载详情 */
const handleOpen = () => {
    if (!props.id) return;
    revokeImages();
    loading.value = true;
    getKycRecordById(props.id)
        .then((data) => {
            detail.value = data;
            // 加载三张证件照片
            loadImages();
        })
        .catch((e) => {
            EleMessage.error(e.message);
        })
        .finally(() => {
            loading.value = false;
        });
};

/** 加载证件照片 */
const loadImages = () => {
    if (!props.id) return;
    const fields: ('idCardFront' | 'idCardBack' | 'selfie')[] = ['idCardFront', 'idCardBack', 'selfie'];
    fields.forEach((field) => {
        getKycImage(props.id!, field)
            .then((url) => {
                images[field] = url;
            })
            .catch(() => {
                // 图片加载失败不报错，显示"暂无"
            });
    });
};

/** 关闭弹窗 */
const handleCancel = () => {
    revokeImages();
    visible.value = false;
};

/** 审核状态标签类型 */
const statusTagType = (status?: string): 'success' | 'warning' | 'info' | 'danger' => {
    const map: Record<string, 'success' | 'warning' | 'info' | 'danger'> = {
        '0': 'info',
        '1': 'success',
        '2': 'danger'
    };
    return map[status || ''] || 'info';
};

/** 审核状态文本 */
const statusLabel = (status?: string) => {
    const map: Record<string, string> = {
        '0': '待审核',
        '1': '通过',
        '2': '拒绝'
    };
    return map[status || ''] || status || '-';
};
</script>

<style scoped>
.detail-body {
    min-height: 200px;
}
.id-card-section {
    margin-top: 20px;
}
.section-title {
    font-size: 14px;
    font-weight: 500;
    color: #303133;
    margin-bottom: 12px;
}
.id-card-image {
    text-align: center;
}
.image-label {
    font-size: 12px;
    color: #909399;
    margin-bottom: 4px;
}
.no-image {
    display: inline-block;
    width: 100%;
   ;
    line-height: 140px;
    color: #c0c4cc;
    background: #f5f7fa;
    border-radius: 4px;
    font-size: 13px;
}
</style>
