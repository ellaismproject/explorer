<template>
    <div v-if="isLoading">
        <PageLoader/>
    </div>
    <div v-else-if="block !== null" class="block-page">
        <h1 class="title is-4 is-spaced">Block <small class="has-text-grey">{{`#${block.blockNumber}`}}</small></h1>
        <BlockDetail :block="block" />
        <TransactionSummary :transactions="transactions" />
    </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import BlockDetail from '@/components/BlockDetail.vue';
import TransactionSummary from '@/components/TransactionSummary.vue';
import PageLoader from '@/components/PageLoader.vue';
import Block from '@/models/Block';
import CinderApiService from '@/services/CinderApiService';
import Transaction from '@/models/Transaction';
import store from '@/Store';
import {mapState} from 'vuex';

@Component({
    components: {
        BlockDetail,
        TransactionSummary,
        PageLoader,
    },
    computed: mapState([
        'isLoading',
    ]),
})
export default class BlockPage extends Vue {
    public isLoading!: boolean;
    public block: Block | null = null;
    public transactions: Transaction[] | null = null;
    private api = new CinderApiService();

    @Watch('$route.params.hash')
    public async pageNavigated(hash: string) {
        await this.getBlockAndTransactions(hash);
    }

    public async created() {
        await this.getBlockAndTransactions(this.$route.params.hash);
    }

    private async getBlockAndTransactions(hash: string): Promise<void> {
        store.commit('toggleLoader', true);
        await this.getBlock(hash);
        store.commit('toggleLoader', false);

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
        }  catch (e) {
        }
    }
}
</script>
