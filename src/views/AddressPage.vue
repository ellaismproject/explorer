<template>
    <div class="page address-page">
        <b-loading :is-full-page="false" :active.sync="isLoading"/>
        <div v-if="address !== null">
            <i18n path="page.address.title" tag="h1" class="title is-4 is-spaced">
                <small slot="hash" class="has-text-grey">{{address.hash}}</small>
            </i18n>
            <AddressDetail :address="address"/>
            <TransactionSummary :transactions="transactions" :total="total" :per-page="size" @page-change="pageChange"/>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import AddressDetail from '@/components/AddressDetail.vue';
    import CinderApiService from '@/services/CinderApiService';
    import Address from '@/models/Address';
    import Transaction from '@/models/Transaction';
    import TransactionSummary from '@/components/TransactionSummary.vue';
    import {MetaInfo} from 'vue-meta';
    import {SortType} from '@/models/SortType';

    @Component<AddressPage>({
        components: {
            TransactionSummary,
            AddressDetail,
        },
        metaInfo(): MetaInfo {
            return {
                title: this.address !== null ? `${this.$t('page.address.meta_title')} ${this.address.hash}` : undefined,
                titleTemplate: undefined,
            };
        },
    })
    export default class AddressPage extends Vue {
        public size: number = 20;
        public total: number = 0;
        public address: Address | null = null;
        public transactions: Transaction[] = [];
        public isLoading: boolean = false;
        private api = new CinderApiService();

        @Watch('$route.params.hash')
        public async pageNavigated(hash: string) {
            this.isLoading = true;
            await this.getAddressAndTransactions(hash);
            this.isLoading = false;
        }

        public async created() {
            this.isLoading = true;
            await this.getAddressAndTransactions(this.$route.params.hash);
            this.isLoading = false;
        }

        public async pageChange(page: number) {
            if (this.address === null || this.address.hash === null) {
                return;
            }

            this.isLoading = true;
            await this.getTransactions(this.address.hash, page, this.size);
            this.isLoading = false;
        }

        private async getAddressAndTransactions(hash: string): Promise<void> {
            await this.getAddress(hash);
            await this.getTransactions(hash, 1, this.size);
        }

        private async getAddress(hash: string): Promise<void> {
            try {
                this.address = await this.api.getAddressByHash(hash);
            } catch (e) {
                if (e!.response!.status === 204) {
                    await this.$router.push('/');
                }
            }
        }

        private async getTransactions(hash: string, page: number, size: number): Promise<void> {
            try {
                const results = await this.api.getTransactionsByAddressHash(hash, page, size, SortType.Descending);
                this.transactions = results.items;
                this.total = results.total;
            } catch (e) {
            }
        }
    }
</script>
