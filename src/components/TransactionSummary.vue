<template>
    <div class="transaction-summary">
        <h2 class="title is-4 is-spaced">Transactions</h2>
        <b-table class="is-striped is-hoverable is-fullwidth" :data="syncedTransactions" paginated backend-pagination
                 @page-change="pageChange" :total="syncedTotal" :per-page="syncedPerPage" icon-pack="fas">
            <template slot-scope="props">
                <b-table-column field="hash" label="Hash">
                    <router-link :to="{ name: 'transaction', params: { hash: props.row.hash }}"
                                 class="is-hash text-truncate">{{ props.row.hash }}
                    </router-link>
                </b-table-column>
                <b-table-column field="timestamp" label="Age">
                    <b-tooltip :label="moment.unix(props.row.timestamp).format('llll')" dashed>
                        {{ moment.unix(props.row.timestamp).fromNow() }}
                    </b-tooltip>
                </b-table-column>
                <b-table-column field="addressFrom" label="From">
                    <router-link :to="{ name: 'address', params: { hash: props.row.addressFrom }}"
                                 class="is-hash text-truncate">{{ props.row.addressFrom }}
                    </router-link>
                </b-table-column>
                <b-table-column field="addressTo" label="To">
                    <router-link :to="{ name: 'address', params: { hash: props.row.addressTo }}"
                                 class="is-hash text-truncate">{{ props.row.addressTo }}
                    </router-link>
                </b-table-column>
                <b-table-column field="value" label="Value" numeric>
                    <CurrencyElla :balance="props.row.value" format="cryptoFull"/>
                </b-table-column>
            </template>
            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon pack="fas" icon="coins" size="is-large"/>
                        </p>
                        <p>No transactions found.</p>
                    </div>
                </section>
            </template>
        </b-table>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, PropSync, Vue} from 'vue-property-decorator';
    import Transaction from '@/models/Transaction';
    import CurrencyElla from '@/components/CurrencyElla.vue';

    @Component({
        components: {CurrencyElla},
    })
    export default class TransactionSummary extends Vue {
        @PropSync('transactions')
        public readonly syncedTransactions!: Transaction[];
        @PropSync('total')
        public readonly syncedTotal!: number;
        @PropSync('perPage')
        public readonly syncedPerPage!: number;

        @Emit()
        public async pageChange(page: number) {
            return page;
        }
    }
</script>

<style lang="sass" scoped>
    @import "~bulma/sass/utilities/mixins"

    +mobile
        .is-hash
            display: inline-block
            max-width: 200px

    +from($tablet)
        .is-hash
            display: inline-block
            max-width: 240px
</style>
