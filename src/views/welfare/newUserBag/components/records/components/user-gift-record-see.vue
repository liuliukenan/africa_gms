<template>
  <ele-modal :width="680" v-model="visible" title="查看" @open="handleOpen">
    <div class="gift-box">
      <img ref="giftImage" src="@/assets/senGiftBag.png" alt="" class="gift">
      <div class="text-box">
        <span class="text">{{ data?.nickname }}</span>
        <span class="text"> (ID: <span >{{ data?.uid }}</span>)</span>
      </div>
      <canvas ref="canvas" style="display: none;"></canvas>
    </div>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save">
        复制
      </el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
import { ref, nextTick } from "vue";
import { ElMessage } from "element-plus";
import type { UserGiftRecord } from "@/api/welfare/model/userGiftRecord";

const props = defineProps<{
  /** 修改回显的数据 */
  data?: UserGiftRecord|null;
}>();

const emit = defineEmits<{
  (e: "done"): void;
}>();

/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });

/** 是否是修改 */
const isUpdate = ref(false);

/** 提交状态 */
const loading = ref(false);

/** 图片和canvas引用 */
const giftImage = ref<HTMLImageElement>();
const canvas = ref<HTMLCanvasElement>();

/** 关闭弹窗 */
const handleCancel = () => {
  visible.value = false;
};

/** 绘制图片到canvas并复制 */
const save = async () => {
  loading.value = true;
  try {
    await nextTick();
    if (!giftImage.value || !canvas.value || !props.data) {
      throw new Error('无法获取必要的元素');
    }

    // 设置canvas尺寸
    const image = giftImage.value;
    const ctx = canvas.value.getContext('2d');
    
    if (!ctx) {
      throw new Error('无法创建Canvas上下文');
    }

    // 调整canvas大小以匹配图片
    canvas.value.width = image.offsetWidth;
    canvas.value.height = image.offsetHeight;

    // 将图片绘制到canvas上
    ctx.drawImage(image, 0, 0, canvas.value.width, canvas.value.height);

    // 设置字体样式
    ctx.font = 'bold 22px sans-serif';
    ctx.fillStyle = '#404040';
    
    // 计算文本位置（基于CSS中的位置）
    const nicknameX = 140; // 从CSS中获取的left值 238
    const nicknameY = 164; // 从CSS中获取的top值 + 字体高度 160
    
    // 绘制昵称
    ctx.fillText(props.data?.nickname || '', nicknameX, nicknameY);
    
    // 绘制ID
    const idText = `(ID: ${props.data?.uid || ''})`;
    const nicknameWidth = ctx.measureText(props.data?.nickname || '').width;
    ctx.fillText(idText, nicknameX + nicknameWidth + 10, nicknameY);

    // 复制图片到剪贴板
    canvas.value.toBlob(async (blob) => {
      if (blob) {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob
            })
          ]);
          ElMessage.success('图片已复制到剪贴板');
        } catch (err) {
          console.error('复制失败:', err);
          ElMessage.error('复制失败，请重试');
        } finally {
          loading.value = false;
        }
      }
    });
  } catch (error) {
    console.error('保存失败:', error);
    ElMessage.error('操作失败，请重试');
    loading.value = false;
  }
};

/** 弹窗打开事件 */
const handleOpen = () => {
  if (props.data) {
    isUpdate.value = true;
  } else {
    isUpdate.value = false;
  }
  nextTick(() => {
    nextTick(() => {
      // 可以在这里添加额外的初始化逻辑
    });
  });
};
</script>
<style lang="scss" scoped>
.gift-box {
  position: relative;
  width: 100%;
  margin: 0 auto;
  text-align: center;
}

.gift {
  width: 70%;
}

.text-box {
  position: absolute;
  top: 140px;
  left: 238px;
  .text{
    font-size: 22px;
    font-weight: bold;
    color: #404040;
    display: inline-block;
    margin-right: 10px;
  }
}
</style>