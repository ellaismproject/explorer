<template>
    <div class="table-container">
        <table class="table is-fullwidth">
            <tbody>
            <tr v-if="syncedAddress.name !== null">
                <th width="15%">Wallet</th>
                <td v-if="syncedAddress.website !== null">
                    <a :href="syncedAddress.website" rel="nofollow">{{syncedAddress.name}}
                        <b-icon pack="fas" icon="external-link-square-alt" size="is-small"/>
                    </a>
                </td>
                <td v-else>{{syncedAddress.name}}</td>
            </tr>
            <tr>
                <th width="15%">Balance</th>
                <td>
                    <CurrencyElla :balance="syncedAddress.balance" format="cryptoFull"/>
                    <small class="is-block has-text-grey">{{balanceCacheMessage}}</small>
                </td>
            </tr>
            <tr v-if="hasTags">
                <th width="15%">Tags</th>
                <td>
                    <b-taglist>
                        <b-tag v-for="(tag, index) in syncedAddress.tags" :key="index">{{ tag }}</b-tag>
                    </b-taglist>
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
    import CurrencyElla from '@/components/CurrencyElla.vue';

    @Component({
        components: {CurrencyElla},
    })
    export default class AddressDetail extends Vue {
        @PropSync('address')
        public readonly syncedAddress!: Address;

        get balanceCacheMessage() {
            if (this.syncedAddress.timestamp == null) {
                return 'The displayed balance is cached. It will be updated soon.';
            }

            return `The displayed balanced is cached. It was last updated ${moment.unix(this.syncedAddress.timestamp).fromNow()}.`;
        }

        get hasTags() {
            return this.syncedAddress.tags != null && this.syncedAddress.tags.length > 0;
        }
    }
</script>
