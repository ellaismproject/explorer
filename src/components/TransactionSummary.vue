<template>
    <div v-if="syncedTransactions !== null && syncedTransactions.length > 0" class="transaction-summary">
        <h2 class="title is-4 is-spaced">Transactions</h2>
        <div class="table-container">
            <b-table class="is-striped is-hoverable is-fullwidth" :data="syncedTransactions">
                <template slot-scope="props">
                    <b-table-column field="hash" label="Transaction Hash">
                        <router-link :to="{ name: 'transaction', params: { hash: props.row.hash }}"
                                     class="is-large-hash text-truncate">{{ props.row.hash }}
                        </router-link>
                    </b-table-column>
                    <b-table-column field="timestamp" label="Age">
                        <b-tooltip :label="moment.unix(props.row.timestamp).format('llll')" dashed>
                            {{ moment.unix(props.row.timestamp).fromNow() }}
                        </b-tooltip>
                    </b-table-column>
                    <b-table-column field="addressFrom" label="From">
                        <router-link :to="{ name: 'address', params: { hash: props.row.addressFrom }}"
                                     class="is-medium-hash text-truncate">{{ props.row.addressFrom }}
                        </router-link>
                    </b-table-column>
                    <b-table-column field="addressTo" label="To">
                        <router-link :to="{ name: 'address', params: { hash: props.row.addressTo }}"
                                     class="is-medium-hash text-truncate">{{ props.row.addressTo }}
                        </router-link>
                    </b-table-column>
                    <b-table-column field="value" label="Value" numeric>
                        <CurrencyElla :balance="props.row.value" format="cryptoFull"/>
                    </b-table-column>
                </template>
            </b-table>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, PropSync, Vue} from 'vue-property-decorator';
import Transaction from '@/models/Transaction';
import CurrencyElla from '@/components/CurrencyElla.vue';

@Component({
    components: {CurrencyElla},
})
export default class TransactionSummary extends Vue {
    @PropSync('transactions')
    public readonly syncedTransactions?: Transaction[];
}
</script>
