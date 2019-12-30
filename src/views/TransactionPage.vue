<template>
    <div class="page transaction-page">
        <b-loading :is-full-page="false" :active.sync="isLoading"/>
        <div v-if="transaction !== null">
            <i18n path="page.transaction.title" tag="h1" class="title is-4 is-spaced">
                <small slot="hash" class="has-text-grey">{{transaction.hash}}</small>
            </i18n>
            <TransactionDetail :transaction="transaction"/>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import TransactionDetail from '@/components/TransactionDetail.vue';
    import CinderApiService from '@/services/CinderApiService';
    import Transaction from '@/models/Transaction';
    import {MetaInfo} from 'vue-meta';

    @Component<TransactionPage>({
        components: {
            TransactionDetail,
        },
        metaInfo(): MetaInfo {
            return {
                title: this.transaction !== null
                    ? `${this.$t('page.transaction.meta_title')} ${this.transaction.hash}`
                    : undefined,
                titleTemplate: undefined,
            };
        },
    })
    export default class TransactionPage extends Vue {
        public transaction: Transaction | null = null;
        public isLoading: boolean = false;
        private api = new CinderApiService();

        @Watch('$route.params.hash')
        public async pageNavigated(hash: string) {
            this.isLoading = true;
            await this.getTransaction(hash);
            this.isLoading = false;
        }

        public async created() {
            this.isLoading = true;
            await this.getTransaction(this.$route.params.hash);
            this.isLoading = false;
        }

        private async getTransaction(hash: string): Promise<void> {
            try {
                this.transaction = await this.api.getTransactionByHash(hash);
            } catch (e) {
                if (e!.response!.status === 204) {
                    await this.$router.push('/');
                }
            }
        }
    }
</script>
