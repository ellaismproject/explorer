<template>
    <table class="table is-fullwidth">
        <tbody>
        <tr>
            <th width="15%">Block Height</th>
            <td>
                <router-link :to="{ name: 'blockHeight', params: { blockNumber: syncedTransaction.blockNumber }}">{{
                    syncedTransaction.blockNumber }}
                </router-link>
            </td>
        </tr>
        <tr>
            <th>Block Hash</th>
            <td>
                <router-link :to="{ name: 'block', params: { hash: syncedTransaction.blockHash }}"
                             class="is-hash text-truncate">{{ syncedTransaction.blockHash }}</router-link>
            </td>
        </tr>
        <tr>
            <th>Age</th>
            <td>{{moment.unix(syncedTransaction.timestamp).fromNow()}}
                {{`(${moment.unix(syncedTransaction.timestamp).format('llll')})`}}
            </td>
        </tr>
        <tr>
            <th>From</th>
            <td>
                <router-link :to="{ name: 'address', params: { hash: syncedTransaction.addressFrom }}"
                             class="is-hash text-truncate">{{ syncedTransaction.addressFrom }}</router-link>
            </td>
        </tr>
        <tr>
            <th>To</th>
            <td>
                <router-link :to="{ name: 'address', params: { hash: syncedTransaction.addressTo }}"
                             class="is-hash text-truncate">{{ syncedTransaction.addressTo }}</router-link>
            </td>
        </tr>
        <tr>
            <th>Value</th>
            <td><CurrencyElla :balance="syncedTransaction.value" format="cryptoFull" /></td>
        </tr>
        <tr>
            <th>Gas Used</th>
            <td>{{syncedTransaction.gasUsed}}</td>
        </tr>
        <tr>
            <th>Gas Provided</th>
            <td>{{syncedTransaction.gas}}</td>
        </tr>
        <tr>
            <th>Gas Price</th>
            <td>{{syncedTransaction.gasPrice}}</td>
        </tr>
        <tr>
            <th>Nonce</th>
            <td>{{syncedTransaction.nonce}}</td>
        </tr>
        <tr>
            <th>Input Data</th>
            <td style="word-break: break-all;">
                {{syncedTransaction.input}}
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import {Component, PropSync, Vue} from 'vue-property-decorator';
import Transaction from '@/models/Transaction';
import CurrencyElla from '@/components/CurrencyElla.vue';

@Component({
    components: {CurrencyElla},
})
export default class TransactionDetail extends Vue {
    @PropSync('transaction')
    public readonly syncedTransaction!: Transaction;
}
</script>

<style lang="sass" scoped>
    @import "~bulma/sass/utilities/mixins"

    +mobile
        .is-hash
            display: inline-block
            max-width: 200px
</style>
