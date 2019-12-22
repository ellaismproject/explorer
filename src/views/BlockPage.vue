<template>
    <div class="block-page">
        <b-loading :is-full-page="false" :active.sync="isLoading"/>
        <div v-if="block !== null">
            <i18n path="page.block.title" tag="h1" class="title is-4 is-spaced">
                <small slot="blockNumber" class="has-text-grey">{{`#${block.blockNumber}`}}</small>
            </i18n>
            <BlockDetail :block="block"/>
            <TransactionSummary :transactions="transactions"/>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import BlockDetail from '@/components/BlockDetail.vue';
    import TransactionSummary from '@/components/TransactionSummary.vue';
    import Block from '@/models/Block';
    import CinderApiService from '@/services/CinderApiService';
    import Transaction from '@/models/Transaction';
    import {MetaInfo} from 'vue-meta';

    @Component<BlockPage>({
        components: {
            BlockDetail,
            TransactionSummary,
        },
        metaInfo(): MetaInfo {
            return {
                title: this.block !== null ? `${this.$t('page.block.meta_title')} #${this.block.blockNumber}` : undefined,
                titleTemplate: undefined,
            };
        },
    })
    export default class BlockPage extends Vue {
        public block: Block | null = null;
        public transactions: Transaction[] | null = null;
        public isLoading: boolean = false;
        private api = new CinderApiService();

        @Watch('$route.params.hash')
        public async pageNavigated(hash: string) {
            await this.getBlockAndTransactions(hash);
        }

        public async created() {
            this.isLoading = true;
            await this.getBlockAndTransactions(this.$route.params.hash);
            this.isLoading = false;
        }

        private async getBlockAndTransactions(hash: string): Promise<void> {
            await this.getBlock(hash);
            if (this.block != null && this.block.transactionCount > 0) {
                await this.getTransactions(hash);
            }
        }

        private async getBlock(hash: string): Promise<void> {
            try {
                this.block = await this.api.getBlockByHash(hash);
            } catch (e) {
                if (e!.response!.status === 204) {
                    await this.$router.push('/');
                }
            }
        }

        private async getTransactions(hash: string): Promise<void> {
            try {
                this.transactions = await this.api.getTransactionsByBlockHash(hash);
            } catch (e) {
            }
        }
    }
</script>
