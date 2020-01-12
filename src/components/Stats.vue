<template>
    <nav class="level">
        <div class="level-item has-text-centered">
            <div>
                <p class="heading">{{ $t('stats.block_height') }}</p>
                <p class="title">
                    <i18n-n v-if="netInfo !== null" :value="netInfo.bestBlock"/>
                    <span v-else>0</span>
                </p>
            </div>
        </div>
        <div class="level-item has-text-centered">
            <div>
                <p class="heading">{{ $t('stats.block_time') }}</p>
                <p class="title">
                    <i18n-n v-if="netInfo !== null" :value="netInfo.averageBlockTime" format="decimalShort"/>
                    <span v-else>0</span>
                </p>
            </div>
        </div>
        <div class="level-item has-text-centered">
            <div>
                <p class="heading">{{ $t('stats.network_hashrate') }}</p>
                <p class="title">
                    <i18n v-if="netInfo !== null" path="stats.ghs" tag="span">
                    <span class="amount" slot="amount">
                        <i18n-n :value="netInfo.averageNetworkHashRate" format="decimalShort"/>
                    </span>
                    </i18n>
                    <span v-else>0</span>
                </p>
            </div>
        </div>
        <div class="level-item has-text-centered">
            <div>
                <p class="heading">{{ $t('stats.difficulty') }}</p>
                <p class="title">
                    <i18n v-if="netInfo !== null" path="stats.ghs" tag="span">
                    <span class="amount" slot="amount">
                        <i18n-n :value="netInfo.difficulty" format="decimalShort"/>
                    </span>
                    </i18n>
                    <span v-else>0</span>
                </p>
            </div>
        </div>
        <div class="level-item has-text-centered">
            <div>
                <p class="heading">{{ $t('stats.btc_price') }}</p>
                <p class="title">
                    <i18n-n v-if="price !== null" :value="price.btcPrice" format="cryptoFull"/>
                    <span v-else>0</span>
                </p>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import CinderApiService from '@/services/CinderApiService';
    import Block from '@/models/Block';
    import NetInfo from '@/models/NetInfo';
    import Price from '@/models/Price';

    @Component({})
    export default class Stats extends Vue {
        public isLoading: boolean = false;
        public netInfo: NetInfo | null = null;
        public price: Price | null = null;
        private api = new CinderApiService();

        public async created() {
            this.isLoading = true;
            await this.getNetInfo();
            this.isLoading = false;
        }

        private async getNetInfo(): Promise<void> {
            try {
                this.netInfo = await this.api.getNetInfo();
                this.price = await this.api.getPrice();
            } catch (e) {
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import "~bulma/sass/utilities/all"

    .column
        padding-top: 1.75rem
        padding-bottom: 1.75rem

        p.title
            margin-bottom: 0.25rem

        p.content
            color: $grey-light
</style>
