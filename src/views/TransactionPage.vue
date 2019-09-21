import {SortType} from "@/models/SortType";
<template>
    <div v-if="isLoading">
        <PageLoader/>
    </div>
    <div v-else-if="transaction !== null" class="transaction-page">
        <h1 class="title is-4 is-spaced">Transaction <small class="has-text-grey">{{transaction.hash}}</small></h1>
        <TransactionDetail :transaction="transaction"/>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import PageLoader from '@/components/PageLoader.vue';
import TransactionDetail from '@/components/TransactionDetail.vue';
import CinderApiService from '@/services/CinderApiService';
import store from '@/Store';
import {mapState} from 'vuex';
import Transaction from '@/models/Transaction';
import {MetaInfo} from 'vue-meta';

@Component<TransactionPage>({
    components: {
        PageLoader,
        TransactionDetail,
    },
    computed: mapState([
        'isLoading',
    ]),
    metaInfo(): MetaInfo {
        return {
            title: this.transaction !== null ? `Ellaism Transaction ${this.transaction.hash}` : undefined,
            titleTemplate: undefined,
        };
    },
})
export default class TransactionPage extends Vue {
    public isLoading!: boolean;
    public transaction: Transaction | null = null;
    private api = new CinderApiService();

    @Watch('$route.params.hash')
    public async pageNavigated(hash: string) {
        await this.getTransaction(hash);
    }

    public async created() {
        await this.getTransaction(this.$route.params.hash);
    }

    private async getTransaction(hash: string): Promise<void> {
        store.commit('toggleLoader', true);
        try {
            this.transaction = await this.api.getTransactionByHash(hash);
        } catch (e) {
            if (e!.response!.status === 204) {
                await this.$router.push('/');
            }
        }
        store.commit('toggleLoader', false);
    }
}
</script>
