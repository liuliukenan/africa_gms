<template>
    <ActivityConfig 
        title="APK登录配置"
        :get-api="() => getActInfo({countryCode: 254, actTypeEnum: 'APK_LOGIN_BONUS'})"
        :save-api="saveActInfo"
        :send-api="sendActInfoServer"
        typeEnum="APK_LOGIN_BONUS"
    />
</template>

<script setup lang="ts">
import ActivityConfig from '@/components/ActivityConfig/index.vue';
// import { getRegisterGive, saveRegisterGive, sendConfServer } from '@/api/welfare/registerGiveApi';
import { getActInfo, saveActInfo, sendActInfoServer } from '@/api/welfare/activitysApi';
</script>
