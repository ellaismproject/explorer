<template>
    <table class="table is-fullwidth">
        <tbody>
        <tr>
            <th width="15%">Block Height</th>
            <td>
                <router-link :to="{ name: 'blockHeight', params: { blockNumber: syncedTransaction.blockNumber }}">{{ syncedTransaction.blockNumber }}</router-link>
            </td>
        </tr>
        <tr>
            <th>Block Hash</th>
            <td>
                <router-link :to="{ name: 'block', params: { hash: syncedTransaction.blockHash }}">{{ syncedTransaction.blockHash }}</router-link>
            </td>
        </tr>
        <tr>
            <th>Age</th>
            <td>{{moment.unix(syncedTransaction.timestamp).fromNow()}} {{`(${moment.unix(syncedTransaction.timestamp).format('llll')})`}}</td>
        </tr>
        <tr>
            <th>From</th>
            <td>
                <router-link :to="{ name: 'address', params: { hash: syncedTransaction.addressFrom }}">{{ syncedTransaction.addressFrom }}</router-link>
            </td>
        </tr>
        <tr>
            <th>To</th>
            <td>
                <router-link :to="{ name: 'address', params: { hash: syncedTransaction.addressTo }}">{{ syncedTransaction.addressTo }}</router-link>
            </td>
        </tr>
        <tr>
            <th>Value</th>
            <td>{{`${syncedTransaction.value} ELLA`}}</td>
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

@Component
export default class TransactionDetail extends Vue {
    @PropSync('transaction', { type: Object as () => Transaction })
    public readonly syncedTransaction!: Transaction;
}
</script>
