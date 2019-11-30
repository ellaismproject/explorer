<template>
    <div class="table-container">
        <table class="table is-fullwidth">
            <tbody>
            <tr>
                <th width="15%">Height</th>
                <td>{{syncedBlock.blockNumber}}</td>
            </tr>
            <tr>
                <th>Age</th>
                <td>{{moment.unix(syncedBlock.timestamp).fromNow()}}
                    {{`(${moment.unix(syncedBlock.timestamp).format('llll')})`}}
                </td>
            </tr>
            <tr>
                <th>Transactions</th>
                <td>{{syncedBlock.transactionCount}}</td>
            </tr>
            <tr>
                <th>Relayed By</th>
                <td>
                    <router-link :to="{ name: 'address', params: { hash: syncedBlock.miner }}">{{
                        syncedBlock.minerDisplay }}
                    </router-link>
                </td>
            </tr>
            <tr>
                <th>Difficulty</th>
                <td>{{syncedBlock.difficulty}}</td>
            </tr>
            <tr>
                <th>Total Difficulty</th>
                <td>{{syncedBlock.totalDifficulty}}</td>
            </tr>
            <tr>
                <th>Size</th>
                <td>{{syncedBlock.size}}</td>
            </tr>
            <tr>
                <th>Gas Used</th>
                <td>{{syncedBlock.gasUsed}}</td>
            </tr>
            <tr>
                <th>Gas Limit</th>
                <td>{{syncedBlock.gasLimit}}</td>
            </tr>
            <tr>
                <th>Extra Data</th>
                <td>{{syncedBlock.extraData}}</td>
            </tr>
            <tr>
                <th>Hash</th>
                <td>{{syncedBlock.hash}}</td>
            </tr>
            <tr>
                <th>Parent Hash</th>
                <td>
                    <router-link :to="{ name: 'block', params: { hash: syncedBlock.parentHash }}">{{
                        syncedBlock.parentHash }}
                    </router-link>
                </td>
            </tr>
            <tr>
                <th>Sha3Uncles</th>
                <td>{{syncedBlock.sha3Uncles}}</td>
            </tr>
            <tr>
                <th>Nonce</th>
                <td>{{syncedBlock.nonce}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
    import {Component, PropSync, Vue} from 'vue-property-decorator';
    import Block from '@/models/Block';

    @Component({})
    export default class BlockDetail extends Vue {
        @PropSync('block')
        public readonly syncedBlock!: Block;
    }
</script>
