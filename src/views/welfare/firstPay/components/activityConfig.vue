<template>
    <ActivityConfig 
        title="首充活动"
        :get-api="() => getActInfo({countryCode: 254, actTypeEnum: 'FIRST_PAY'})"
        :save-api="saveActInfo"
        :send-api="sendActInfoServer"
    />
</template>

<script setup lang="ts">
import ActivityConfig from '@/components/ActivityConfig/index.vue';
// import { getFirstPayGive, saveFirstPayGive, sendConfServer } from '@/api/welfare/firstPayApi';
import { getActInfo, saveActInfo, sendActInfoServer } from '@/api/welfare/activitysApi';
</script>
