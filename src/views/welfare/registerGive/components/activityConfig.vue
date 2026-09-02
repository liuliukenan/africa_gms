<template>
    <ActivityConfig 
        title="注册赠礼活动"
        :get-api="() => getActInfo({countryCode: 254, actTypeEnum: 'REGISTER_BONUS'})"
        :save-api="saveActInfo"
        :send-api="sendActInfoServer"
    />
</template>

<script setup lang="ts">
import ActivityConfig from '@/components/ActivityConfig/index.vue';
// import { getRegisterGive, saveRegisterGive, sendConfServer } from '@/api/welfare/registerGiveApi';
import { getActInfo, saveActInfo, sendActInfoServer } from '@/api/welfare/activitysApi';
</script>
