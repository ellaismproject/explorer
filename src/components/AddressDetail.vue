<template>
    <div class="table-container">
        <table class="table is-fullwidth">
            <tbody>
            <tr>
                <th width="15%">Balance</th>
                <td>{{`${syncedAddress.balance} ELLA`}}</td>
            </tr>
            <tr v-if="syncedAddress.blocksMined !== null">
                <th width="15%">Blocks Mined</th>
                <td>{{syncedAddress.blocksMined}}</td>
            </tr>
            <tr v-if="syncedAddress.transactionCount !== null">
                <th width="15%">Transaction Count</th>
                <td>{{syncedAddress.transactionCount}}</td>
            </tr>
            <tr >
                <th width="15%">Last Updated</th>
                <td>{{moment.unix(syncedAddress.timestamp).fromNow()}}
                    {{`(${moment.unix(syncedAddress.timestamp).format('llll')})`}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import {Component, PropSync, Vue} from 'vue-property-decorator';
import Address from '@/models/Address';

@Component({})
export default class AddressDetail extends Vue {
    @PropSync('address')
    public readonly syncedAddress!: Address;
}
</script>
