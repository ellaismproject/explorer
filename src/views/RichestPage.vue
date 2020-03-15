<template>
    <div class="page richest-page">
        <b-loading :is-full-page="false" :active.sync="isLoading"/>
        <h1 class="title is-4 is-spaced">{{ $t('page.richest.title') }}</h1>
        <b-table class="is-striped is-hoverable is-fullwidth" :data="addresses" paginated backend-pagination
                 @page-change="onPageChange" :total="total" :per-page="perPage" icon-pack="fas">
            <template slot-scope="props">
                <b-table-column field="rank" label="Rank" numeric>
                    {{ props.row.rank }}
                </b-table-column>
                <b-table-column field="hash" label="Address">
                    <router-link :to="{ name: 'address', params: { hash: props.row.hash }}"
                                 class="is-hash text-truncate">{{ props.row.hash }}
                    </router-link>
                    <div class="address-meta is-hidden-mobile">
                        <small v-if="props.row.name !== null" class="has-text-grey-light">{{ props.row.name }}</small>
                        <b-taglist v-if="props.row.name != null" class="is-inline-block">
                            <b-tag v-for="(tag, index) in props.row.tags" :key="index">{{ tag }}</b-tag>
                        </b-taglist>
                    </div>
                </b-table-column>
                <b-table-column field="balance" label="Balance" numeric>
                    <CurrencyElla :balance="props.row.balance" format="crypto"/>
                </b-table-column>
                <b-table-column field="percent" label="Percent" numeric>
                    <i18n v-if="props.row.percent !== null" path="percent" tag="span">
                        <span class="amount" slot="amount">
                            <i18n-n :value="props.row.percent" format="decimalShort">
                                <template v-slot:decimal="slotProps">
                                    <span class="is-decimal">{{ slotProps.decimal }}</span>
                                </template>
                                <template v-slot:fraction="slotProps">
                                    <span class="is-fraction">{{ slotProps.fraction }}</span>
                                </template>
                            </i18n-n>
                        </span>
                    </i18n>
                    <span v-else>-</span>
                </b-table-column>
                <b-table-column field="balanceHistory" label="7 Day Change" numeric>
                    <BalanceHistory type="7" :balance="props.row.balance" :history="props.row.balanceHistory"/>
                </b-table-column>
                <b-table-column field="balanceHistory" label="30 Day Change" numeric>
                    <BalanceHistory type="30" :balance="props.row.balance" :history="props.row.balanceHistory"/>
                </b-table-column>
            </template>
            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon pack="fas" icon="coins" size="is-large"/>
                        </p>
                        <p>No addresses found.</p>
                    </div>
                </section>
            </template>
        </b-table>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import CinderApiService from '@/services/CinderApiService';
    import Richest from '@/models/Richest';
    import {MetaInfo} from 'vue-meta';
    import CurrencyElla from '@/components/CurrencyElla.vue';
    import BalanceHistory from '@/components/BalanceHistory.vue';

    @Component({
        components: {CurrencyElla, BalanceHistory},
        metaInfo(): MetaInfo {
            return {
                title: this.$t('page.richest.meta_title').toString(),
                titleTemplate: this.$t('page.richest.meta_title_template').toString(),
            };
        },
    })
    export default class RichestPage extends Vue {
        public currentPage: number = 1;
        public perPage: number = 100;
        public total: number = 0;
        public addresses: Richest[] = [];
        public isLoading: boolean = false;
        private api = new CinderApiService();

        public async created() {
            this.isLoading = true;
            await this.getRichest();
            this.isLoading = false;
        }

        public async onPageChange(page: number) {
            this.isLoading = true;
            this.currentPage = page;
            await this.getRichest();
            this.isLoading = false;
        }

        private async getRichest(): Promise<void> {
            try {
                const data = await this.api.getRichest(this.currentPage, this.perPage);
                this.total = data.total;
                this.addresses = data.items;
            } catch (e) {
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import "~bulma/sass/utilities/mixins"

    .address-meta > small
        margin-right: 0.5rem

    +mobile
        .is-hash
            display: inline-block
            max-width: 200px
</style>
