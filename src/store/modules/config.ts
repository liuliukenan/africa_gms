import { defineStore } from 'pinia';
import { pageCountryCodes } from '@/api/platform/countryCodeApi';
import { CountryCode } from '@/api/platform/model/countryCode';
import { GameGroup } from '@/api/model/gameGroup';
// import { pageGameGroups } from '@/api/config/gameGroupApi';
import { pageShareChannels } from '@/api/platform/shareChannelApi';
import { ShareChannel } from '@/api/platform/model/shareChannel';
export const useConfigStore = defineStore('config', {
    state: (): any => ({
        countryArr: [] as CountryCode[],
        gameGroupArr: [] as GameGroup[],
        ShareChannelArr: [] as ShareChannel[],
    }),

    actions: {
        setGameGroup(gameGroupArr: GameGroup[]) {
            this.gameGroupArr = gameGroupArr;
        },
        setCountryCode(countryArr: CountryCode[]) {
            this.countryArr = countryArr;
        },
        // 获取国家列表
        async getCountryCode() {
            let res = await pageCountryCodes();
            this.countryArr = (res as CountryCode[]) || [];
        },
        // 获取游戏分组列表
        async getGameGroup() {
            // let res = await pageGameGroups({ page: 1, limit: 1000 });
            // this.gameGroupArr = (res || []) as GameGroup[];
        },
        // 获取推广渠道列表
        async getShareChannels() {
            let res = await pageShareChannels({ page: 1, limit: 1000 });

            this.ShareChannelArr = (res?.list || []) as ShareChannel[];
        },
    },
    // 启用持久化存储
    persist: true
})