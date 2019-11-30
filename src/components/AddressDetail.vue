<template>
    <div class="table-container">
        <table class="table is-fullwidth">
            <tbody>
            <tr>
                <th width="15%">Balance</th>
                <td>
                    {{`${syncedAddress.balance} ELLA`}}
                    <small class="is-block has-text-grey">{{balanceCacheMessage}}</small>
                </td>
            </tr>
            <tr v-if="syncedAddress.blocksMined !== null">
                <th width="15%">Blocks Mined</th>
                <td>{{syncedAddress.blocksMined}}</td>
            </tr>
            <tr v-if="syncedAddress.transactionCount !== null">
                <th width="15%">Transaction Count</th>
                <td>{{syncedAddress.transactionCount}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
    import {Component, PropSync, Vue} from 'vue-property-decorator';
    import Address from '@/models/Address';
    import moment from 'moment';

    @Component({})
    export default class AddressDetail extends Vue {
        @PropSync('address')
        public readonly syncedAddress!: Address;

        get balanceCacheMessage() {
            if (this.syncedAddress.timestamp == null) {
                return 'The displayed balance is cached. It will be updated soon.';
            }

            return `The displayed balanced is cached. It was last updated ${moment.unix(this.syncedAddress.timestamp).fromNow()}.`;
        }
    }
</script>
