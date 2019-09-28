import {SortType} from "@/models/SortType";
<template>
    <div v-if="isLoading">
        <PageLoader/>
    </div>
    <div v-else-if="address !== null" class="address-page">
        <i18n path="page.address.title" tag="h1" class="title is-4 is-spaced">
            <small slot="hash" class="has-text-grey">{{address.hash}}</small>
        </i18n>
        <AddressDetail :address="address"/>
        <TransactionSummary :transactions="transactions"/>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import AddressDetail from '@/components/AddressDetail.vue';
import PageLoader from '@/components/PageLoader.vue';
import CinderApiService from '@/services/CinderApiService';
import Address from '@/models/Address';
import store from '@/Store';
import {mapState} from 'vuex';
import Transaction from '@/models/Transaction';
import TransactionSummary from '@/components/TransactionSummary.vue';
import { MetaInfo } from 'vue-meta';

@Component<AddressPage>({
    components: {
        TransactionSummary,
        AddressDetail,
        PageLoader,
    },
    computed: mapState([
        'isLoading',
    ]),
    metaInfo(): MetaInfo {
        return {
            title: this.address !== null ? `${this.$t('page.address.meta_title')} ${this.address.hash}` : undefined,
            titleTemplate: undefined,
        };
    },
})
export default class AddressPage extends Vue {
    public isLoading!: boolean;
    public address: Address | null = null;
    public transactions: Transaction[] | null = null;
    private api = new CinderApiService();

    @Watch('$route.params.hash')
    public async pageNavigated(hash: string) {
        await this.getAddressAndTransactions(hash);
    }

    public async created() {
        await this.getAddressAndTransactions(this.$route.params.hash);
    }

    private async getAddressAndTransactions(hash: string): Promise<void> {
        store.commit('toggleLoader', true);
        await this.getAddress(hash);
        await this.getTransactions(hash);
        store.commit('toggleLoader', false);
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

    private async getTransactions(hash: string): Promise<void> {
        try {
            this.transactions = await this.api.getRecentTransactionsByAddressHash(hash, 20);
        }  catch (e) {
        }
    }
}
</script>
