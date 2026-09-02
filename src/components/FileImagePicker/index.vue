<template>
  <div>
    <ele-upload-list :drag="true" :tools="true" :limit="limit" :multiple="true" v-model="images" :sortable="{ forceFallback: true }" :beforeUploadClick="beforeUploadClick" :beforeItemEdit="beforeItemEdit" @upload="handleUpload" @retry="(item) => handleUpload(item, true)" @remove="handleRemove" />
    <file-picker title="图片选择" :fileLimit="1" accept="image/*" :params="{ contentType: 'image/' }" v-model="showFilePicker" :limit="filePickerLimit" @done="handleFilePickerDone" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { UploadItem } from 'ele-admin-plus/es/ele-upload-list/types';
  import FilePicker from '@/components/FilePicker/index.vue';
  import type { UserFile } from '@/api/model/userFile';

  const props = withDefaults(
    defineProps<{
      /** 绑定值 */
      modelValue?: string;
      limit: number;
      /** 文件大小限制, 单位MB */
      fileLimit?: number;
    }>(),
    {
      fileLimit: 1,
      limit: 1
    }
  );

  // 定义 emits
  const emit = defineEmits(['update:modelValue']);

  /** 已上传数据 */
  const images = ref<UploadItem[]>([
    // 回显已上传的文件数据
    {
      key: '001',
      name: 'c184eef391ae48dba87e3057e70238fb.jpg',
      url: 'https://cdn.eleadmin.com/20200609/8931360b593040238d894a542c9037bc.jpg',
      status: 'done'
    },
    {
      key: '002',
      name: 'WLXm7gp1EbLDtvVQgkeQeyq5OtDm00Jd.jpg',
      url: 'https://cdn.eleadmin.com/20200609/4e60a84551fa48439bf42ecdb9673331.jpg',
      status: 'done'
    },
    {
      key: '003',
      name: 'f6bc05af944a4f738b54128717952107.jpg',
      url: 'https://cdn.eleadmin.com/20200609/d6442cfa99b64b51aabfc470055b05dc.jpg',
      status: 'done'
    }
  ]);

  /** 最大文件数量 */
  const limit = ref(8);

  /** 是否打开文件选择弹窗 */
  const showFilePicker = ref(false);

  /** 文件选择弹窗的最大选择数量 */
  const filePickerLimit = ref(1);

  /** 当前修改的文件项 */
  let currentEditItem: UploadItem | null = null;

  /** 校验选择的文件 */
  const checkFile = (file?: File) => {
    if (!file) {
      return;
    }
    if (!file.type.startsWith('image')) {
      EleMessage.error('只能选择图片');
      return;
    }
    if (file.size / 1024 / 1024 > 2) {
      EleMessage.error('大小不能超过 2MB');
      return;
    }
    return true;
  };

  /** 上传事件 */
  const handleUpload = (data: UploadItem, retry?: boolean) => {
    if (!checkFile(data.file)) {
      return;
    }
    if (!retry) {
      images.value.push({ ...data }); // 上传时添加数据, 失败重试时不添加
    }
    const item = images.value.find((t) => t.key === data.key);
    console.log(JSON.parse(JSON.stringify(item)));
    if (!item) {
      return;
    }
    // 模拟上传
    item.status = 'uploading';
    if (item.progress == null) {
      item.progress = 20;
    }
    const timer = setInterval(() => {
      if (Math.round(Math.random() * 10) < 3) {
        item.status = 'exception';
        EleMessage.error('上传失败, 服务器繁忙');
        clearInterval(timer);
        return;
      }
      if (item.progress == null) {
        item.progress = 20;
      } else {
        item.progress += 20;
      }
      if (item.progress === 100) {
        item.status = 'done';
        clearInterval(timer);
      }
    }, 1000);
  };

  /** 删除事件 */
  const handleRemove = (item: UploadItem) => {
    images.value.splice(images.value.indexOf(item), 1);
  };

  /** 上传按钮点击打开文件选择弹窗 */
  const beforeUploadClick = () => {
    filePickerLimit.value = limit.value - images.value.length;
    showFilePicker.value = true;
    currentEditItem = null;
    return false;
  };

  /** 修改按钮点击打开文件选择弹窗 */
  const beforeItemEdit = (item: UploadItem) => {
    filePickerLimit.value = 1;
    showFilePicker.value = true;
    currentEditItem = item;
    return false;
  };

  /** 文件选择弹窗选择完成事件 */
  const handleFilePickerDone = (files: UserFile[]) => {
    showFilePicker.value = false;
    // 添加
    if (currentEditItem == null) {
      files.forEach((fileItem) => {
        images.value.push({
          key: String(Date.now()) + fileItem.id,
          name: fileItem.name,
          url: fileItem.url,
          status: 'done'
        });
      });
      return;
    }
    // 修改
    const oldItem = images.value.find((t) => t.key === currentEditItem?.key);
    if (oldItem && files.length) {
      const fileItem = files[0];
      oldItem.name = fileItem.name;
      oldItem.url = fileItem.url;
      oldItem.status = 'done';
    }
  };

  const updateModelValue = (value: string) => {
    emit('update:modelValue', value);
  };

  /** 获取上传数据对应的值 */
  const getDataValue = (imagesValue: UploadItem[]) => {
    const urls: string[] = [];
    imagesValue.forEach((item) => {
      if (item.status === 'done' && item.url != null) {
        urls.push(item.url);
      }
    });
    return urls;
  };

  /** 获取值对应的上传数据 */
  const getImagesValue = (dataValue: string | undefined | null, imagesValue: UploadItem[]) => {
    if (!dataValue) {
      return imagesValue.filter((item) => item.status !== 'done');
    }
    const result: UploadItem[] = [];
    if (props.limit === 1) {
      result.push({ key: `0-${dataValue}`, url: dataValue, status: 'done' });
      return result;
    }
    try {
      const urls: string[] = JSON.parse(dataValue);
      imagesValue.forEach((item) => {
        if ((item.url && urls.includes(item.url)) || item.status !== 'done') {
          result.push(item);
        }
      });
      urls.forEach((url: string, index: number) => {
        if (url && !result.some((item) => item.url === url)) {
          const key = `${index}-${url}`;
          const oldIndex = result.findIndex((item) => item.key === key);
          if (oldIndex !== -1) {
            result.splice(oldIndex, 1);
          }
          result.push({ key, url, status: 'done' });
        }
      });
      if (props.limit != null && result.length > props.limit) {
        const temp = result.filter((item) => item.status !== 'done');
        for (const t of temp) {
          const i = result.indexOf(t);
          result.splice(i, 1);
          if (result.length <= props.limit) {
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      imagesValue.forEach((item) => {
        if (item.status !== 'done') {
          result.push(item);
        }
      });
    }
    return result;
  };

  /** 判断上传数据是否改变 */
  const imagesIsChanged = (newImages: UploadItem[], oldImages: UploadItem[]) => {
    if (newImages.length !== oldImages.length) {
      return true;
    }
    for (let i = 0; i < newImages.length; i++) {
      const newItem = newImages[i];
      const oldItem = oldImages[i];
      if (newItem.key !== oldItem.key || newItem.url !== oldItem.url || newItem.status !== oldItem.status) {
        return true;
      }
    }
    return false;
  };

  /** 同步绑定值 */
  watch(
    images,
    (imagesValue) => {
      const dataValue = getDataValue(imagesValue);
      if (props.limit === 1) {
        updateModelValue(dataValue.join());
        return;
      }
      updateModelValue(dataValue.length ? JSON.stringify(dataValue) : '');
    },
    { deep: true }
  );

  watch(
    () => props.modelValue,
    (dataValue) => {
      const imagesValue = getImagesValue(dataValue, images.value);
      if (imagesIsChanged(imagesValue, images.value)) {
        images.value = imagesValue;
      }
    },
    { immediate: true }
  );
</script>
